import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(4),
    // Título/descrição só para <title>/meta description, quando o título editorial é longo
    // e truncaria no SERP. Não altera o H1 nem o texto visível.
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    pubDate: z.coerce.date(),
    description: z.string().min(10).max(300),
    updated: z.coerce.date().optional(),
    ogImage: z.string().optional(),
    tags: z
      .array(z.string().min(1))
      .refine((tags) => new Set(tags).size === tags.length, { message: 'tags duplicadas' })
      .optional()
      .default([]),
    draft: z.boolean().optional().default(false),
    // Páginas de conteúdo fino/placeholder: continuam publicadas, mas fora do índice.
    noindex: z.boolean().optional().default(false),
  }),
});

export const collections = {
  blog: blogCollection,
};
