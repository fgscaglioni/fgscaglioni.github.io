import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'Fabrício Scaglioni — Blog',
    description: 'Portfólio, blog e notas de pesquisa de Fabrício Scaglioni.',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id.replace(/\.[^/]+$/, '')}/`,
      categories: post.data.tags,
    })),
    customData: `<language>pt-br</language>`,
  });
}
