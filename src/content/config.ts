import { defineCollection, z } from "astro:content";

const sectionSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  order: z.number().optional(),
  hidden: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  timeframe: z.string().optional(),
  location: z.string().optional(),
  url: z.string().optional(),
  header_url: z.string().optional(),
  title_url: z.string().optional(),
  link: z.string().optional(),
  cta_label: z.string().optional(),
  url_label: z.string().optional(),
  org: z.string().optional(),
});

export const collections = {
  "executive-summary": defineCollection({ schema: sectionSchema }),
  "values": defineCollection({ schema: sectionSchema }),
  "skills-finance": defineCollection({ schema: sectionSchema }),
  "skills-strategy": defineCollection({ schema: sectionSchema }),
  "skills-cloud-ai": defineCollection({ schema: sectionSchema }),
  "thoughts": defineCollection({ schema: sectionSchema }),
  "projects": defineCollection({ schema: sectionSchema }),
  "jobs": defineCollection({ schema: sectionSchema }),
  "education": defineCollection({ schema: sectionSchema }),
  "social": defineCollection({ schema: sectionSchema }),
  // Optional: "downloads": defineCollection({ schema: sectionSchema }),
};
