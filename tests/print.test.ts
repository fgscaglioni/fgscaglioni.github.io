import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname!, '..');

describe('folha de impressao', () => {
  it('print.css existe e cobre o essencial', () => {
    const css = fs.readFileSync(path.join(ROOT, 'src/styles/print.css'), 'utf-8');
    expect(css).toContain('@media print');
    expect(css).toContain('@page');
    expect(css).toContain('data-site-header');
    expect(css).toContain('break-inside');
  });

  it('global.css importa print.css', () => {
    const css = fs.readFileSync(path.join(ROOT, 'src/styles/global.css'), 'utf-8');
    expect(css).toContain('@import "./print.css"');
  });

  it('o CSS construido contem a media query de impressao', () => {
    const dir = path.join(ROOT, 'dist/_astro');
    const found = fs.readdirSync(dir)
      .filter((f) => f.endsWith('.css'))
      .some((f) => fs.readFileSync(path.join(dir, f), 'utf-8').includes('@media print'));
    expect(found, 'nenhum arquivo em dist/_astro contem @media print').toBe(true);
  });
});
