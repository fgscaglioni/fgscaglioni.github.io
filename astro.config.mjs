// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';
import fs from 'node:fs';
import path from 'node:path';

/**
 * lastmod real por post (updated || pubDate).
 * Antes o sitemap usava `lastmod: new Date()`, carimbando a data do build em todas as URLs.
 * Um lastmod sempre "agora" é ruído e tende a ser descartado pelo Google.
 */
function buildLastmodMap() {
  /** @type {Record<string, string>} */
  const map = {};
  const dir = './src/content/blog';
  if (!fs.existsSync(dir)) return map;
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const frontmatter = fs.readFileSync(path.join(dir, file), 'utf-8').split('---')[1] ?? '';
    const updated = frontmatter.match(/^updated:\s*([\d-]{10})/m)?.[1];
    const pubDate = frontmatter.match(/^pubDate:\s*([\d-]{10})/m)?.[1];
    const date = updated || pubDate;
    if (date) map[`/blog/${file.replace(/\.md$/, '')}/`] = date;
  }
  return map;
}

const lastmodMap = buildLastmodMap();

// https://astro.build/config
export default defineConfig({
  site: 'https://fgscaglioni.dev.br',
  prefetch: {
    // prefetchAll varria todos os âncoras no load (com ClientRouter isso aparecia como
    // long task de ~1,1s no desktop). Agora só links com data-astro-prefetch são pré-carregados.
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  markdown: {
    shikiConfig: {
      // Tema duplo com defaultColor:false — o Shiki emite as variáveis --shiki-light/--shiki-dark
      // por token e a cor é aplicada pelo CSS em global.css; assim os dois temas do site usam o
      // mesmo HTML. Os temas -high-contrast foram testados e descartados: não pintam token nenhum
      // (o código fica monocromático). Os tokens que ficam abaixo de AA nos temas padrão são
      // corrigidos por sobrescrita pontual das variáveis em global.css.
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      wrap: true,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/blog/tag/'),
      serialize: (item) => {
        const pathname = new URL(item.url).pathname;
        const lastmod = lastmodMap[pathname];
        if (lastmod) {
          item.lastmod = new Date(`${lastmod}T00:00:00Z`).toISOString();
        } else {
          // Sem data confiável: omite em vez de inventar.
          delete item.lastmod;
        }
        return item;
      },
    }),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
