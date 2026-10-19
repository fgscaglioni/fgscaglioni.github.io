import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const FILE = path.resolve(import.meta.dirname!, '../src/components/DataFigure.astro');
const content = fs.readFileSync(FILE, 'utf-8');

describe('DataFigure', () => {
  it('usa figure e figcaption semanticos', () => {
    expect(content).toContain('<figure');
    expect(content).toContain('<figcaption');
  });

  it('oferece tabela de dados em details', () => {
    expect(content).toContain('<details');
    expect(content).toContain('<table');
  });

  it('nao usa cor fora do sistema', () => {
    expect(content).not.toMatch(/series-\d.*#[0-9A-Fa-f]{6}/);
    expect(content).toContain('border-rule');
  });

  it('a decisao esta documentada', () => {
    const doc = path.resolve(import.meta.dirname!, '../agent_docs/graficos.md');
    expect(fs.existsSync(doc)).toBe(true);
    expect(fs.readFileSync(doc, 'utf-8')).toContain('máximo **4 séries**');
  });
});
