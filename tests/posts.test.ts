import { describe, it, expect } from 'vitest';
import { publishedPosts, sortPostsDesc } from '../src/utils/posts';
import type { BlogPost } from '../src/utils/posts';

function post(slug: string, overrides: Partial<BlogPost['data']> = {}): BlogPost {
  return {
    id: slug,
    data: {
      title: slug,
      description: slug,
      pubDate: new Date('2026-01-01T00:00:00Z'),
      tags: [],
      draft: false,
      noindex: false,
      ...overrides,
    },
  } as BlogPost;
}

describe('publishedPosts', () => {
  it('exclui drafts', () => {
    const posts = [post('a'), post('b', { draft: true })];
    expect(publishedPosts(posts).map((p) => p.id)).toEqual(['a']);
  });

  it('mantém noindex por padrão e exclui com indexableOnly', () => {
    const posts = [post('a'), post('b', { noindex: true })];
    expect(publishedPosts(posts).map((p) => p.id)).toEqual(['a', 'b']);
    expect(publishedPosts(posts, { indexableOnly: true }).map((p) => p.id)).toEqual(['a']);
  });

  it('ordena do mais recente ao mais antigo', () => {
    const posts = [
      post('old', { pubDate: new Date('2025-01-01T00:00:00Z') }),
      post('new', { pubDate: new Date('2026-06-01T00:00:00Z') }),
    ];
    expect(publishedPosts(posts).map((p) => p.id)).toEqual(['new', 'old']);
  });
});

describe('sortPostsDesc', () => {
  it('ordena sem alterar o array original', () => {
    const posts = [
      post('old', { pubDate: new Date('2025-01-01T00:00:00Z') }),
      post('new', { pubDate: new Date('2026-06-01T00:00:00Z') }),
    ];
    expect(sortPostsDesc(posts).map((p) => p.id)).toEqual(['new', 'old']);
    expect(posts.map((p) => p.id)).toEqual(['old', 'new']);
  });
});
