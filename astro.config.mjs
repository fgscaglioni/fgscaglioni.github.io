// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://fgscaglioni.dev.br',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/blog/tag/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
