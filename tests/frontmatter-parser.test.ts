import { describe, it, expect } from 'vitest';
import { parseFrontmatter } from '../scripts/frontmatter.mjs';

function mustParse(raw: string) {
  const parsed = parseFrontmatter(raw);
  if (!parsed) throw new Error('frontmatter esperado, null recebido');
  return parsed;
}

describe('parseFrontmatter', () => {
  it('retorna null sem bloco no topo', () => {
    expect(parseFrontmatter('# título\n\ncorpo')).toBeNull();
  });

  it('lê escalares e remove aspas', () => {
    const { data } = mustParse('---\ntitle: "Com: dois pontos"\npubDate: 2026-01-01\ndraft: true\n---\ncorpo');
    expect(data.title).toBe('Com: dois pontos');
    expect(data.pubDate).toBe('2026-01-01');
    expect(data.draft).toBe('true');
  });

  it('lê lista em fluxo e em bloco', () => {
    expect(mustParse('---\ntags: [IA, "Soft Skills"]\n---\n').data.tags).toEqual(['IA', 'Soft Skills']);
    expect(mustParse('---\ntags:\n  - IA\n  - Educação\n---\n').data.tags).toEqual(['IA', 'Educação']);
  });

  it('lê escalar dobrado sem cortar no meio da palavra', () => {
    const { data } = mustParse('---\ndescription: >\n  primeira linha\n  segunda linha\n---\n');
    expect(data.description).toBe('primeira linha segunda linha');
  });

  it('ignora --- dentro do corpo', () => {
    const { data, body } = mustParse('---\ntitle: X\n---\nantes\n\n---\ndepois');
    expect(data.title).toBe('X');
    expect(body).toContain('depois');
  });

  it('remove comentário inline fora de aspas', () => {
    const { data } = mustParse('---\ntitle: X # comentário\n---\n');
    expect(data.title).toBe('X');
  });
});
