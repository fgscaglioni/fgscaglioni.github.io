import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { parseFrontmatter } from '../scripts/frontmatter.mjs';

const ROOT = path.resolve(import.meta.dirname!, '..');
const SCRIPT = path.join(ROOT, 'scripts/generate-og.mjs');
const FONTS = path.join(ROOT, 'public/fonts');
const BLOG_DIR = path.join(ROOT, 'src/content/blog');
const OG_DIR = path.join(ROOT, 'public/og');

const source = fs.readFileSync(SCRIPT, 'utf-8');

describe('cards Open Graph', () => {
  it('so referencia arquivos de fonte que existem em public/fonts', () => {
    const referenciados = [...source.matchAll(/font\('([^']+)'\)/g)].map((m) => m[1]);
    expect(referenciados.length).toBeGreaterThan(0);
    const faltando = referenciados.filter((f) => !fs.existsSync(path.join(FONTS, f)));
    expect(faltando, 'Fontes citadas que nao existem: ' + faltando.join(', ')).toEqual([]);
  });

  it('segue a doutrina visual: sem raio, sem sombra, sem gradiente', () => {
    expect(source).not.toMatch(/border-radius/);
    expect(source).not.toMatch(/box-shadow/);
    expect(source).not.toMatch(/radial-gradient|linear-gradient/);
  });

  it('usa os tokens do site, nao hex avulsos', () => {
    // Os hex saem de src/styles/tokens.css via readTokens (check-tokens.mjs):
    // copiar hex à mão aqui e no script era a deriva que este teste impedia.
    expect(source).toContain('readTokens');
    expect(source).not.toMatch(/#[0-9A-Fa-f]{6}/);
    // o acento antigo do site nao pode voltar
    expect(source).not.toContain('#0D9488');
  });

  it('titulo em serifa romana, nunca italica', () => {
    const h1 = source.match(/h1\s*\{[^}]*\}/s)?.[0] ?? '';
    expect(h1).toContain('Instrument Serif');
    expect(h1).not.toContain('italic');
  });

  it('todo post publicado tem o card public/og/<slug>.png', () => {
    const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
    const missing: string[] = [];
    for (const file of files) {
      const data = parseFrontmatter(fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8'))?.data ?? {};
      if (data.draft === 'true') continue;
      const slug = file.replace(/\.md$/, '');
      if (!fs.existsSync(path.join(OG_DIR, `${slug}.png`))) missing.push(slug);
    }
    expect(missing, `Posts sem card de OG (rode pnpm og): ${missing.join(', ')}`).toEqual([]);
  });
});
