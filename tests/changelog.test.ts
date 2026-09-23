import { describe, it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import * as path from 'node:path';
import { changelogData } from '../src/data/changelogData';

const REPO = path.resolve(import.meta.dirname!, '..');

/**
 * Caminhos cuja alteração é uma "atualização do site" e por isso exige entrada no changelog.
 * Ficam de fora os arquivos do próprio repositório (testes, docs de agente, tooling): mexer
 * neles não é atualização do site.
 */
const SITE_PATHS = [
  'src/pages/',
  'src/components/',
  'src/layouts/',
  'src/styles/',
  'src/data/',
  'src/content/',
  'src/utils/',
  'public/',
  'scripts/',
  'astro.config.mjs',
];

const NOT_SITE = ['src/data/changelogData.ts', 'agent_docs/', 'tests/', 'README.md', 'AGENTS.md', 'TODO.md'];

/** "DD/MM/AAAA" -> Date, ou null se o formato nao casar ou o dia nao existir. */
function parseDate(value: string): Date | null {
  const partes = value.split('/');
  if (partes.length !== 3) return null;
  const numeros = partes.map((p) => Number(p));
  if (partes.some((p, i) => p.length === 0 || !Number.isInteger(numeros[i]))) return null;
  if (partes[0].length !== 2 || partes[1].length !== 2 || partes[2].length !== 4) return null;
  const [dd, mm, aaaa] = numeros;
  const date = new Date(aaaa, mm - 1, dd);
  const valido = date.getFullYear() === aaaa && date.getMonth() === mm - 1 && date.getDate() === dd;
  return valido ? date : null;
}

/** "vX.Y.Z" com partes numericas. */
function versaoValida(version: string): boolean {
  if (!version.startsWith('v')) return false;
  const partes = version.slice(1).split('.');
  return partes.length === 3 && partes.every((p) => p.length > 0 && Number.isInteger(Number(p)));
}

const lista = (itens: string[]) => itens.map((i) => '  ' + i).join(' | ');

describe('Changelog - formato e ordem', () => {
  it('existe pelo menos uma entrada', () => {
    expect(changelogData.length).toBeGreaterThan(0);
  });

  it('toda entrada tem date no formato DD/MM/AAAA, em dia real do calendario', () => {
    const invalidas = changelogData.filter((e) => parseDate(e.date) === null).map((e) => e.version + ' -> ' + e.date);
    expect(invalidas, 'Datas invalidas: ' + lista(invalidas)).toEqual([]);
  });

  it('toda entrada tem version no padrao vX.Y.Z', () => {
    const invalidas = changelogData.filter((e) => !versaoValida(e.version)).map((e) => e.version);
    expect(invalidas, 'Versoes fora do padrao vX.Y.Z: ' + lista(invalidas)).toEqual([]);
  });

  it('nao repete versao', () => {
    const vistas = new Set<string>();
    const repetidas: string[] = [];
    for (const e of changelogData) {
      if (vistas.has(e.version)) repetidas.push(e.version);
      vistas.add(e.version);
    }
    expect(repetidas, 'Versoes repetidas: ' + lista(repetidas)).toEqual([]);
  });

  it('toda entrada tem title, description e ao menos uma mudanca', () => {
    const incompletas = changelogData
      .filter((e) => !e.title?.trim() || !e.description?.trim() || !e.changes?.length || e.changes.some((c) => !c?.trim()))
      .map((e) => e.version);
    expect(incompletas, 'Entradas incompletas: ' + lista(incompletas)).toEqual([]);
  });

  it('esta em ordem decrescente de data (a mais nova primeiro, como a pagina renderiza)', () => {
    const datas = changelogData.map((e) => parseDate(e.date)!.getTime());
    const fora: string[] = [];
    for (let i = 1; i < datas.length; i++) {
      if (datas[i - 1] < datas[i]) {
        fora.push(changelogData[i].version + ' (' + changelogData[i].date + ') depois de ' + changelogData[i - 1].version);
      }
    }
    expect(fora, 'Entradas fora de ordem, a nova vai primeiro: ' + lista(fora)).toEqual([]);
  });
});

describe('Changelog - atualizacao pendente', () => {
  it('alteracao de site nao commitada vem acompanhada da entrada no changelog', () => {
    // Escape consciente para quando a alteracao e a entrada nao andam juntas:
    // SKIP_CHANGELOG_GATE=1 pnpm test
    if (process.env.SKIP_CHANGELOG_GATE) return;

    const git = spawnSync('git', ['status', '--porcelain'], { cwd: REPO, encoding: 'utf-8' });
    if (git.status !== 0) return; // sem git no ambiente: nao bloqueia

    const alterados = git.stdout
      .split('\n')
      .map((linha) => linha.slice(3).trim().replace(/^"|"$/g, ''))
      .filter(Boolean);

    const doSite = alterados.filter(
      (arquivo) => !NOT_SITE.includes(arquivo) && SITE_PATHS.some((prefixo) => arquivo.startsWith(prefixo)),
    );

    if (doSite.length === 0) return; // nada de site pendente: a regra nao se aplica

    const aviso =
      'Ha alteracao de site sem entrada no changelog: ' +
      lista(doSite) +
      '. Adicione a entrada no topo de src/data/changelogData.ts (formato em agent_docs/conteudo-e-metadados.md),' +
      ' ou rode SKIP_CHANGELOG_GATE=1 pnpm test se a alteracao nao for atualizacao do site.';

    expect(alterados.includes('src/data/changelogData.ts'), aviso).toBe(true);
  });
});
