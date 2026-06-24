import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const BLOG_DIR = path.resolve(import.meta.dirname!, '../src/content/blog');

function parseFrontmatter(filePath: string): Record<string, string> | null {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fm: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (kv) {
      fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return fm;
}

describe('Frontmatter dos posts', () => {
  const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md'));

  it('existe pelo menos um post', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    describe(file, () => {
      const fm = parseFrontmatter(path.join(BLOG_DIR, file));

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
