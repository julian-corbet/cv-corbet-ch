// src/content/config.ts
import { defineCollection, z } from "astro:content";

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

const makeContent = () => defineCollection({ type: "content", schema: sectionSchema });

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
    email: z.string().email(),
    location: z.string(),
  }),
  social: z.object({
    calendar: z.string().url().optional(),
    signal: z.string().url().optional(),
    whatsapp: z.string().url().optional(),
    telegram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    threema: z.string().url().optional(),
    x: z.string().url().optional(),
    matrix: z.string().url().optional(),
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
    seo_canonical_url: z.string().url(),
    seo_keywords: z.array(z.string()).min(3),
    seo_author: z.string(),
    seo_site_name: z.string(),
    seo_noindex: z.boolean().default(false),
  }),

  og: z.object({
    og_type: z.enum([
      "website",
      "profile",
    ]).default("website"),
    og_title: z.string(),
    og_description: z.string(),
    og_url: z.string().url(),
    og_site_name: z.string(),
    og_locale: z.string().default("en_US"),

    // EITHER multiple images...
    og_images: z.array(z.object({
      path: z.string(),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      alt: z.string().optional(),
    })).optional(),

    // ...OR a single image (back-compat)
    og_image_path: z.string().optional(),
    og_image_width: z.number().int().positive().optional(),
    og_image_height: z.number().int().positive().optional(),

    // Open Graph profile properties (used when og_type = "profile")
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
    image: z.string().url(),
    url: z.string().url(),
    sameAs: z.array(z.string().url()).optional(),
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
      email: z.string().email().optional(),
      contactType: z.string().optional(),
      areaServed: z.string().optional(),
      availableLanguage: z.union([z.string(), z.array(z.string())]).optional(),
    }),
  }),
});

/* Unified data schema for config/*.yaml */
const configUnionSchema = z.union([headersSchema, contactsSchema, downloadsSchema, metadataSchema]);

export const collections = {
  "executive-summary": makeContent(),
  values: makeContent(),
  "skills-finance": makeContent(),
  "skills-strategy": makeContent(),
  "skills-cloud-ai": makeContent(),
  thoughts: makeContent(),
  projects: makeContent(),
  jobs: makeContent(),
  education: makeContent(),
  social: makeContent(),
  references: makeContent(),
  config: defineCollection({ type: "data", schema: configUnionSchema }),
};