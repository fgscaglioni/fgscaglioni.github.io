import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { spawnSync } from 'node:child_process';

const BLOG_DIR = path.resolve(import.meta.dirname!, '../src/content/blog');
const DIST_DIR = path.resolve(import.meta.dirname!, '../dist');
const ROOT_DIR = path.resolve(import.meta.dirname!, '..');

describe('Rotas estáticas do blog', () => {
  it('astro build completa sem erros', () => {
    const result = spawnSync('pnpm', ['build'], {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      timeout: 60_000,
    });

    if (result.error) throw result.error;
    if (result.status !== 0) {
      console.error(result.stdout);
      console.error(result.stderr);
    }
    expect(result.status).toBe(0);
  });

  it('todo post publicado gera uma página HTML', () => {
    const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md'));
    expect(files.length).toBeGreaterThan(0);

    const missing: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const isDraft = /^draft:\s*true$/m.test(content);
      if (isDraft) continue;

      const slug = file.replace(/\.md$/, '');
      const htmlPath = path.join(DIST_DIR, 'blog', slug, 'index.html');

      if (!fs.existsSync(htmlPath)) {
        missing.push(`${file} → /blog/${slug}/index.html`);
      }
    }

    expect(missing, `Posts sem página gerada:\n${missing.join('\n')}`).toEqual([]);
  });

  it('cada tag existente gera página de filtro', () => {
    const files = fs.readdirSync(BLOG_DIR).filter((f: string) => f.endsWith('.md'));
    const tags = new Set<string>();

    for (const file of files) {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
      const fm = content.match(/^---\n([\s\S]*?)\n---/);
      if (!fm) continue;

      const tagMatch = fm[1].match(/tags:\s*\[(.*)\]/);
      if (tagMatch) {
        for (const raw of tagMatch[1].split(',')) {
          const t = raw.trim().replace(/["']/g, '');
          if (t) tags.add(t);
        }
      }
    }

    const missing: string[] = [];
    for (const tag of tags) {
      const htmlPath = path.join(DIST_DIR, 'blog', 'tag', tag, 'index.html');
      if (!fs.existsSync(htmlPath)) {
        missing.push(`tag "${tag}" → /blog/tag/${tag}/index.html`);
      }
    }

    expect(missing, `Páginas de tag não geradas:\n${missing.join('\n')}`).toEqual([]);
  });
});
