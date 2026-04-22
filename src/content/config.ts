import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tag: z.string(),
    summary: z.string(),
    readTime: z.string(),
  }),
});

const research = defineCollection({
  type: 'content',
  schema: z.object({
    year: z.string(),
    title: z.string(),
    venue: z.string(),
    tags: z.array(z.string()),
    url: z.string().optional().default('#'),
  }),
});

const datasets = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    size: z.string(),
    files: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, research, datasets };
