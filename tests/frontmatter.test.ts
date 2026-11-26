import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { parseFrontmatter } from '../scripts/frontmatter.mjs';

const BLOG_DIR = path.resolve(import.meta.dirname!, '../src/content/blog');

function readData(filePath: string) {
  const parsed = parseFrontmatter(fs.readFileSync(filePath, 'utf-8'));
  return parsed?.data ?? null;
}

describe('Frontmatter dos posts', () => {
  const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md'));

  it('existe pelo menos um post', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    describe(file, () => {
      const fm = readData(path.join(BLOG_DIR, file));

      it('tem frontmatter', () => {
        expect(fm).not.toBeNull();
      });

      if (!fm) return;

      it('tem title', () => {
        expect(fm.title?.length).toBeGreaterThan(3);
      });

      it('tem pubDate em formato ISO (YYYY-MM-DD)', () => {
        expect(fm.pubDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      });

      it('tem description entre 10 e 300 chars', () => {
        expect(fm.description?.length).toBeGreaterThanOrEqual(10);
        expect(fm.description?.length).toBeLessThanOrEqual(300);
      });

      it('draft é true ou false quando presente', () => {
        if (fm.draft !== undefined) {
          expect(['true', 'false']).toContain(fm.draft);
        }
      });
    });
  }
});
