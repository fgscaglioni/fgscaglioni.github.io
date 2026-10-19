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
 * Remove comentarios antes de casar as regras, mantendo a contagem de linhas.
 *
 * Um comentario que cita `animate-ping` para explicar por que ele saiu nao e
 * ofensa: o teste mede o que e servido, nao o que a documentacao menciona.
 */
function stripComments(text: string): string[] {
  const out: string[] = [];
  let inBlock = false;
  let inHtmlComment = false;

  for (const raw of text.split('\n')) {
    let line = raw;

    if (inHtmlComment) {
      const end = line.indexOf('-->');
      if (end === -1) { out.push(''); continue; }
      line = line.slice(end + 3);
      inHtmlComment = false;
    }
    const htmlStart = line.indexOf('<!--');
    if (htmlStart !== -1) {
      const htmlEnd = line.indexOf('-->', htmlStart + 4);
      if (htmlEnd === -1) { inHtmlComment = true; line = line.slice(0, htmlStart); }
      else line = line.slice(0, htmlStart) + line.slice(htmlEnd + 3);
    }

    if (inBlock) {
      const end = line.indexOf('*/');
      if (end === -1) { out.push(''); continue; }
      line = line.slice(end + 2);
      inBlock = false;
    }
    const start = line.indexOf('/*');
    if (start !== -1) {
      const end = line.indexOf('*/', start + 2);
      if (end === -1) { inBlock = true; line = line.slice(0, start); }
      else line = line.slice(0, start) + line.slice(end + 2);
    }

    if (/^\s*\/\//.test(line)) { out.push(''); continue; }
    out.push(line);
  }
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
  {
    name: 'cor fora do sistema',
    pattern: /\b(text|bg|border|ring|from|to|via|decoration|outline)-(teal|rose|emerald|indigo|slate|cyan|violet|purple|pink|fuchsia|amber|orange|lime|green|sky|blue|yellow|zinc|neutral|stone)-\d{2,3}/,
    why: 'um acento so; o resto e tinta',
  },
];

describe('doutrina visual do site', () => {
  const sources = readSources().map(({ file, text }) => ({ file, lines: stripComments(text) }));

  for (const rule of RULES) {
    it(`nao usa ${rule.name} (${rule.why})`, () => {
      const ofensas: string[] = [];
      for (const { file, lines } of sources) {
        lines.forEach((line, i) => {
          if (rule.pattern.test(line)) ofensas.push(`${file}:${i + 1} ${line.trim().slice(0, 80)}`);
        });
      }
      expect(ofensas, 'Ocorrencias: ' + ofensas.join(' | ')).toEqual([]);
    });
  }

  it('nao tem !important fora do Shiki e do bloco de movimento reduzido', () => {
    const ofensas: string[] = [];
    for (const { file, lines } of sources) {
      lines.forEach((line, i) => {
        if (!line.includes('!important')) return;
        if (/shiki/.test(line)) return;
        // Os !important de prefers-reduced-motion sao necessarios: precisam
        // vencer qualquer animacao declarada por utilitario.
        const janela = lines.slice(Math.max(0, i - 8), i + 1).join('\n');
        if (janela.includes('prefers-reduced-motion')) return;
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
    expect(css).not.toContain('radial-gradient');
  });

  it('o tema escuro so declara cores do Shiki', () => {
    const css = fs.readFileSync(path.join(SRC, 'styles/global.css'), 'utf-8');
    const blocos = css.match(/^\.dark[^{]*\{[^}]*\}/gm) ?? [];
    const foraDoShiki = blocos.filter((b) => !/shiki/.test(b));
    expect(foraDoShiki, 'Blocos .dark que nao sao do Shiki: ' + foraDoShiki.join(' | ')).toEqual([]);
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
