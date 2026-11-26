import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname!, '..');
const CI = path.join(ROOT, '.github/workflows/ci.yml');
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));

describe('workflow de CI', () => {
  it('existe e roda build, testes, tipos e paleta', () => {
    expect(fs.existsSync(CI)).toBe(true);
    const yaml = fs.readFileSync(CI, 'utf-8');
    expect(yaml).toContain('pnpm build');
    expect(yaml).toContain('pnpm test');
    expect(yaml).toContain('pnpm check');
    expect(yaml).toContain('check-tokens.mjs');
  });

  it('roda em push para dev e em pull request', () => {
    const yaml = fs.readFileSync(CI, 'utf-8');
    expect(yaml).toMatch(/branches:\s*\[\s*dev\s*\]/);
    expect(yaml).toMatch(/pull_request:/);
  });

  it('nao usa runner com ponteiro movel', () => {
    const yaml = fs.readFileSync(CI, 'utf-8');
    expect(yaml).not.toMatch(/runs-on:\s*ubuntu-latest/);
    expect(yaml).toContain('ubuntu-24.04');
  });

  it('usa a mesma versao de pnpm declarada no package.json', () => {
    const yaml = fs.readFileSync(CI, 'utf-8');
    const versao = pkg.packageManager?.replace(/^pnpm@/, '');
    expect(versao).toBeTruthy();
    expect(yaml).toContain(`pnpm@${versao}`);
  });

  it('package.json tem script check (astro check)', () => {
    expect(pkg.scripts.check).toContain('astro check');
  });
});
