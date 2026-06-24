export function sortTagsByFrequency(allTags: string[], posts: { data: { tags?: string[] } }[]): string[] {
  const count = (tag: string) =>
    posts.filter((p) => (p.data.tags || []).includes(tag)).length;
  return [...allTags].sort((a, b) => {
    const diff = count(b) - count(a);
    return diff !== 0 ? diff : a.localeCompare(b);
  });
}
