import type { CollectionEntry } from "astro:content";

/**
 * Filtragem e ordenação de posts para as páginas que listam a coleção.
 * Funções puras sobre o array já carregado: o `getCollection` fica na página
 * e a regra (sem draft, mais recentes primeiro) vive num lugar só. Antes,
 * cada página repetia o mesmo filter+sort com variações silenciosas.
 */

export type BlogPost = CollectionEntry<"blog">;

/** Publicados: sem draft. `indexableOnly` exclui também os `noindex` (home). */
export function publishedPosts(posts: BlogPost[], options?: { indexableOnly?: boolean }): BlogPost[] {
  return posts
    .filter((post) => !post.data.draft && (!options?.indexableOnly || !post.data.noindex))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Posts ordenados do mais recente ao mais antigo (não altera o original). */
export function sortPostsDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
