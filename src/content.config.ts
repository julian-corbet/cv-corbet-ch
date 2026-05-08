// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* Shared section schema for markdown content collections */
const sectionSchema = z.object({
  id: z.string().optional(),
  id_label: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  date: z.coerce.string().optional(),
  timeframe: z.coerce.string().optional(),
  location: z.string().optional(),
  tags: z.array(z.string()).optional(),
  title_url: z.string().optional(),
  link_url: z.string().optional(),
  link_label: z.string().optional(),
  order: z.coerce.number().optional(),
  hidden: z.boolean().optional(),
});

const makeContent = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: "*.md", base: `./src/content/${folder}` }),
    schema: sectionSchema,
  });

/* config/headers.yaml */
const headersSchema = z.object({
  sections: z.array(z.object({
    folder: z.string(),
    title: z.string(),
    icon: z.string(),
  })),
  special: z.object({
    downloads: z.object({
      title: z.string(),
      icon: z.string(),
    }).optional(),
  }).optional(),
});

/* config/contacts.yaml */
const contactsSchema = z.object({
  header: z.object({
    phone: z.string(),
    email: z.email(),
    location: z.string(),
  }),
  social: z.object({
    calendar: z.url().optional(),
    signal: z.url().optional(),
    whatsapp: z.url().optional(),
    telegram: z.url().optional(),
    linkedin: z.url().optional(),
    threema: z.url().optional(),
    x: z.url().optional(),
    matrix: z.url().optional(),
  }),
});

/* config/downloads.yaml */
const fileItem = z.object({
  title: z.string(),
  description: z.string().optional(),
  button: z.string().optional(),
  filename: z.string(),
});
const folderItem = z.object({
  type: z.literal("folder"),
  title: z.string(),
  description: z.string().optional(),
  children: z.array(fileItem),
});
const downloadsSchema = z.object({
  downloads: z.array(z.union([fileItem, folderItem])),
});

/* config/metadata.yaml */
const metadataSchema = z.object({
  page: z.object({
    page_title: z.string(),
    page_subtitle: z.string().optional(),
    page_description: z.string().optional(),
    page_lang: z.string().default("en"),
  }).optional(),

  seo: z.object({
    seo_title: z.string(),
    seo_description: z.string(),
    seo_canonical_url: z.url(),
    seo_keywords: z.array(z.string()).min(3),
    seo_author: z.string(),
    seo_site_name: z.string(),
    seo_noindex: z.boolean().default(false),
  }),

  og: z.object({
    og_type: z.enum(["website", "profile"]).default("website"),
    og_title: z.string(),
    og_description: z.string(),
    og_url: z.url(),
    og_site_name: z.string(),
    og_locale: z.string().default("en_US"),

    og_images: z.array(z.object({
      path: z.string(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      alt: z.string().optional(),
    })).optional(),

    og_image_path: z.string().optional(),
    og_image_width: z.number().int().positive().optional(),
    og_image_height: z.number().int().positive().optional(),

    profile_first_name: z.string().optional(),
    profile_last_name: z.string().optional(),
    profile_username: z.string().optional(),
    profile_gender: z.string().optional(),
  }),

  twitter: z.object({
    twitter_card: z.string().default("summary_large_image"),
    twitter_title: z.string(),
    twitter_description: z.string(),
    twitter_site: z.string().optional(),
    twitter_creator: z.string().optional(),
    twitter_image_path: z.string(),
  }),

  person: z.object({
    name: z.string(),
    alternateName: z.array(z.string()).optional(),
    jobTitle: z.string(),
    description: z.string(),
    image: z.url(),
    url: z.url(),
    sameAs: z.array(z.url()).optional(),
    knowsAbout: z.array(z.string()).optional(),

    hasOccupation: z.object({
      name: z.string(),
      occupationLocation: z.object({
        "@type": z.literal("Country"),
        name: z.string(),
        addressCountry: z.string().optional(),
      }),
    }),

    contactPoint: z.object({
      "@type": z.literal("ContactPoint"),
      telephone: z.string().optional(),
      email: z.email().optional(),
      contactType: z.string().optional(),
      areaServed: z.string().optional(),
      availableLanguage: z.union([z.string(), z.array(z.string())]).optional(),
    }),
  }),
});

/* Unified data schema for config/*.yaml — Astro picks one based on content shape */
const configUnionSchema = z.union([headersSchema, contactsSchema, downloadsSchema, metadataSchema]);

export const collections = {
  "executive-summary": makeContent("executive-summary"),
  values: makeContent("values"),
  "skills-finance": makeContent("skills-finance"),
  "skills-strategy": makeContent("skills-strategy"),
  "skills-cloud-ai": makeContent("skills-cloud-ai"),
  thoughts: makeContent("thoughts"),
  projects: makeContent("projects"),
  jobs: makeContent("jobs"),
  education: makeContent("education"),
  social: makeContent("social"),
  references: makeContent("references"),
  config: defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/config" }),
    schema: configUnionSchema,
  }),
};
