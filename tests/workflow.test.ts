import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname!, '..');
const WORKFLOW = path.join(ROOT, '.github/workflows/deploy.yml');

/**
 * O YAML tem comentários que explicam por que as versões estão travadas, e esses
 * comentários citam justamente `ubuntu-latest` e `pnpm@latest`. Sem remover os
 * comentários antes de casar, o teste reprova a própria documentação da regra.
 */
function semComentarios(yaml: string): string {
  return yaml
    .split('\n')
    .map((l) => l.replace(/(^|\s)#.*$/, ''))
    .join('\n');
}

const bruto = fs.readFileSync(WORKFLOW, 'utf-8');
const yaml = semComentarios(bruto);
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));

describe('workflow de deploy', () => {
  it('nao usa runner com ponteiro movel', () => {
    expect(yaml).not.toMatch(/runs-on:\s*ubuntu-latest/);
  });

  it('trava o runner numa versao explicita do Ubuntu', () => {
    const runners = [...yaml.matchAll(/runs-on:\s*(\S+)/g)].map((m) => m[1]);
    expect(runners.length).toBe(2);
    for (const r of runners) {
      expect(r, `runner "${r}" nao tem versao explicita`).toMatch(/^ubuntu-\d{2}\.\d{2}$/);
    }
  });

  it('nao usa gerenciador de pacotes @latest', () => {
    expect(yaml).not.toMatch(/package-manager:\s*\S*@latest/);
  });

  it('a versao do pnpm no workflow bate com o packageManager do package.json', () => {
    const noWorkflow = yaml.match(/package-manager:\s*pnpm@(\S+)/)?.[1];
    const noPacote = pkg.packageManager?.replace(/^pnpm@/, '');
    expect(noWorkflow, 'workflow sem versao de pnpm explicita').toBeTruthy();
    expect(noWorkflow).toBe(noPacote);
  });

  it('documenta o motivo do travamento no proprio arquivo', () => {
    expect(bruto).toMatch(/versões travadas/i);
  });
});
