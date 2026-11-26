import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publishedPosts } from '../utils/posts';

export async function GET(context) {
  const posts = publishedPosts(await getCollection('blog'));

  return rss({
    title: 'Fabrício Scaglioni — Blog',
    description: 'Portfólio, blog e notas de pesquisa de Fabrício Scaglioni.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id.replace(/\.[^/]+$/, '')}/`,
      categories: post.data.tags,
    })),
    customData: `<language>pt-br</language>`,
  });
}
