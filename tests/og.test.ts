import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname!, '..');
const SCRIPT = path.join(ROOT, 'scripts/generate-og.mjs');
const FONTS = path.join(ROOT, 'public/fonts');

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
    // papel, tinta e acento oxblood
    expect(source).toContain('#F5F2ED');
    expect(source).toContain('#1B1815');
    expect(source).toContain('#9C3A1E');
    // o acento antigo do site nao pode voltar
    expect(source).not.toContain('#0D9488');
  });

  it('titulo em serifa romana, nunca italica', () => {
    const h1 = source.match(/h1\s*\{[^}]*\}/s)?.[0] ?? '';
    expect(h1).toContain('Instrument Serif');
    expect(h1).not.toContain('italic');
  });
});
