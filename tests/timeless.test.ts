import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const SRC = path.resolve(import.meta.dirname!, '../src');

/** Le todos os .astro/.svelte/.css do src, com caminho relativo. */
function readSources(): { file: string; text: string }[] {
  const out: { file: string; text: string }[] = [];
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(astro|svelte|css)$/.test(entry.name)) {
        out.push({ file: path.relative(SRC, full), text: fs.readFileSync(full, 'utf-8') });
      }
    }
  };
  walk(SRC);
  return out;
}

/**
 * A doutrina do site, em forma de teste. Cada regra abaixo e uma decisao de
 * design que nao pode voltar sem alguem apagar a linha de proposito.
 */
const RULES: { name: string; pattern: RegExp; why: string }[] = [
  { name: 'sombra', pattern: /\bshadow-(sm|md|lg|xl|2xl|inner)\b/, why: 'hierarquia vem de fio, nao de sombra' },
  { name: 'blur decorativo', pattern: /\b(backdrop-blur|blur-(sm|md|lg|xl|2xl|3xl))\b/, why: 'blur e o token que mais data' },
  { name: 'gradiente', pattern: /(bg-gradient-to-|linear-gradient|radial-gradient|conic-gradient)/, why: 'cor chapada; gradiente nao sobrevive a troca de tema' },
  { name: 'animacao infinita', pattern: /\banimate-(ping|bounce|pulse|spin)\b/, why: 'movimento compete com a leitura' },
  { name: 'raio grande', pattern: /\brounded-(full|3xl|2xl|xl)\b/, why: 'raio 0 ou 2px; pill data em 3 anos' },
  { name: 'transicao pesada', pattern: /\b(transition-all|duration-(300|500|700|1000))\b/, why: 'so cor, ate 150ms' },
  { name: 'cor fora do sistema', pattern: /\b(text|bg|border|ring|from|to|via|decoration|outline)-(teal|rose|emerald|indigo|slate|cyan|violet|purple|pink|fuchsia|amber|orange|lime|green|sky|blue|yellow|zinc|neutral|stone)-\d{2,3}/, why: 'um acento so; o resto e tinta' },
];

describe('doutrina visual do site', () => {
  const sources = readSources();

  for (const rule of RULES) {
    it(`nao usa ${rule.name} (${rule.why})`, () => {
      const ofensas: string[] = [];
      for (const { file, text } of sources) {
        text.split('\n').forEach((line, i) => {
          if (rule.pattern.test(line)) ofensas.push(`${file}:${i + 1} ${line.trim().slice(0, 80)}`);
        });
      }
      expect(ofensas, 'Ocorrencias: ' + ofensas.join(' | ')).toEqual([]);
    });
  }

  it('nao tem !important fora do Shiki', () => {
    const ofensas: string[] = [];
    for (const { file, text } of sources) {
      text.split('\n').forEach((line, i) => {
        if (!line.includes('!important')) return;
        if (/shiki|code:not\(pre code\)/.test(line)) return;
        ofensas.push(`${file}:${i + 1} ${line.trim().slice(0, 80)}`);
      });
    }
    expect(ofensas, 'Ocorrencias: ' + ofensas.join(' | ')).toEqual([]);
  });

  it('nao reescreve a escala gray dentro de .dark', () => {
    const css = fs.readFileSync(path.join(SRC, 'styles/global.css'), 'utf-8');
    expect(css).not.toContain('.dark .bg-white');
    expect(css).not.toContain('.dark .paper-card');
    expect(css).not.toContain('.dark .tag-popover');
  });

  it('toda familia de fonte declara fallback de sistema', () => {
    const css = fs.readFileSync(path.join(SRC, 'styles/global.css'), 'utf-8');
    const stacks = [...css.matchAll(/--font-(display|body|mono):\s*([^;]+);/g)];
    expect(stacks.length).toBe(3);
    for (const [, nome, stack] of stacks) {
      expect(stack, `--font-${nome} sem fallback generico`).toMatch(/\b(serif|sans-serif|monospace)\b/);
    }
  });
});
