import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const BLOG_DIR = path.resolve(import.meta.dirname!, '../src/content/blog');

describe('Formatação de data dos posts', () => {
  const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md'));

  it('todas as pubDate estão em formato ISO', () => {
    for (const file of files) {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const match = content.match(/^pubDate:\s*(.+)$/m);
      expect(match, `${file}: pubDate ausente`).not.toBeNull();
      expect(match![1].trim(), `${file}: formato inválido`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('datas são dias reais do calendário', () => {
    for (const file of files) {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const match = content.match(/^pubDate:\s*(.+)$/m);
      if (!match) continue;
      const d = new Date(match[1].trim());
      expect(d.toString(), `${file}: data inválida`).not.toBe('Invalid Date');
    }
  });
});
