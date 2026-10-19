import { describe, it, expect } from 'vitest';
import { readTokens, auditPalette, AA_NORMAL, SERIES_MIN_DELTA_E } from '../scripts/check-tokens.mjs';

const { light, dark } = readTokens();

describe('tokens.css - presenca e contraste', () => {
  it('define todos os tokens obrigatorios nos dois temas', () => {
    const required = [
      'paper', 'paper-2', 'paper-3', 'rule', 'rule-strong',
      'ink', 'ink-2', 'ink-3', 'accent',
      'series-1', 'series-2', 'series-3', 'series-4',
    ];
    for (const tema of [light, dark]) {
      const faltando = required.filter((t) => !(t in tema));
      expect(faltando, 'Tokens ausentes: ' + faltando.join(', ')).toEqual([]);
    }
  });

  it('nenhum par texto x superficie fica abaixo de AA (4.5:1)', () => {
    const falhas = auditPalette({ light, dark }).filter((r) => r.kind === 'contrast' && r.ratio < AA_NORMAL);
    const msg = falhas.map((f) => `${f.theme}: ${f.a} sobre ${f.b} = ${f.ratio.toFixed(2)}:1`).join(' | ');
    expect(falhas, msg).toEqual([]);
  });

  it('o acento continua distinguivel do papel sob daltonismo', () => {
    const falhas = auditPalette({ light, dark }).filter((r) => r.kind === 'cvd' && r.ratio < AA_NORMAL);
    expect(falhas, JSON.stringify(falhas)).toEqual([]);
  });

  it('series de dados tem delta E minimo entre si sob daltonismo', () => {
    const piores = auditPalette({ light, dark }).filter((r) => r.kind === 'series-delta' && r.ratio < SERIES_MIN_DELTA_E);
    const msg = piores.map((f) => `${f.theme}: ${f.a} x ${f.b} sob ${f.sim} = dE ${f.ratio.toFixed(1)}`).join(' | ');
    expect(piores, msg).toEqual([]);
  });

  it('cada serie tem 3:1 contra o papel (objeto grafico)', () => {
    const fracas = auditPalette({ light, dark }).filter((r) => r.kind === 'series-contrast' && r.ratio < 3);
    const msg = fracas.map((f) => `${f.theme}: ${f.a} = ${f.ratio.toFixed(2)}:1`).join(' | ');
    expect(fracas, msg).toEqual([]);
  });
});
