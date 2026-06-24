import { describe, it, expect } from 'vitest';
import { sortTagsByFrequency } from '../src/utils/tags';

describe('sortTagsByFrequency', () => {
  const mkposts = (tagLists: string[][]) =>
    tagLists.map((tags) => ({ data: { tags } }));

  it('ordena tags por frequência decrescente', () => {
    const posts = mkposts([['ia', 'python'], ['ia'], ['python', 'js'], ['ia']]);
    const result = sortTagsByFrequency(['ia', 'python', 'js', 'rust'], posts);
    expect(result[0]).toBe('ia');
    expect(result[1]).toBe('python');
  });

  it('top 5 retorna as 5 mais frequentes', () => {
    const posts = mkposts([['a'], ['b'], ['c'], ['d'], ['e'], ['f']]);
    const allTags = ['a', 'b', 'c', 'd', 'e', 'f'];
    const top5 = sortTagsByFrequency(allTags, posts).slice(0, 5);
    expect(top5).toHaveLength(5);
    expect(top5).not.toContain('f');
  });

  it('tags sem posts vão para o final', () => {
    const posts = mkposts([['a']]);
    const result = sortTagsByFrequency(['a', 'b', 'c'], posts);
    expect(result[0]).toBe('a');
    expect(result[result.length - 1]).toBe('c');
  });

  it('tags com mesma frequência mantêm ordem alfabética', () => {
    const posts = mkposts([['z', 'a'], ['z', 'a']]);
    const result = sortTagsByFrequency(['z', 'a'], posts);
    expect(result).toEqual(['a', 'z']);
  });

  it('não quebra com menos de 5 tags', () => {
    const posts = mkposts([['a']]);
    expect(sortTagsByFrequency(['a'], posts)).toEqual(['a']);
  });

  it('tags vazias não quebram contagem', () => {
    const posts = mkposts([[], ['a']]);
    const result = sortTagsByFrequency(['a', 'b'], posts);
    expect(result[0]).toBe('a');
    expect(result[1]).toBe('b');
  });

  it('retorna array vazio para lista vazia', () => {
    expect(sortTagsByFrequency([], [])).toEqual([]);
  });
});
