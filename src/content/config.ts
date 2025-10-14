// src/content/config.ts
import { defineCollection, z } from "astro:content";

const sectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  name: z.string().optional(),
  designation: z.string().optional(),
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
    matrix: z.string().optional(),
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

/* unified data schema for config/*.yaml */
const configUnionSchema = z.union([headersSchema, contactsSchema, downloadsSchema]);

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
  // references: makeContent(), // <— keep commented until you’re ready
  config: defineCollection({ type: "data", schema: configUnionSchema }),
};