import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const PAPERCARD_PATH = path.resolve(import.meta.dirname!, '../src/components/PaperCard.astro');

describe('PaperCard', () => {
  const content = fs.readFileSync(PAPERCARD_PATH, 'utf-8');

  it('declara prop class como opcional', () => {
    expect(content).toContain('class?: string');
  });

  it('usa className no template', () => {
    expect(content).toContain('className');
  });

  it('contem classe CSS paper-card', () => {
    expect(content).toContain('paper-card');
  });

  it('contem slot para conteúdo', () => {
    expect(content).toContain('<slot');
  });
});
