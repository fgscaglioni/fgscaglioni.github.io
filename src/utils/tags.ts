export function sortTagsByFrequency(allTags: string[], posts: { data: { tags?: string[] } }[]): string[] {
  const count = (tag: string) =>
    posts.filter((p) => (p.data.tags || []).includes(tag)).length;
  return [...allTags].sort((a, b) => {
    const diff = count(b) - count(a);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}

/**
 * Slug estável para URLs de tag.
 * Evita URLs com espaço/acento e duplicatas do tipo `/blog/tag/educação` vs `/blog/tag/educacao`.
 * Ex.: "Boas práticas" -> "boas-praticas"; "educação" -> "educacao".
 */
export function slugifyTag(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Mapa slug -> rótulo legível (primeiro rótulo encontrado vence). */
export function tagSlugMap(tags: string[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const tag of tags) {
    const slug = slugifyTag(tag);
    if (slug && !map.has(slug)) map.set(slug, tag);
  }
  return map;
}
