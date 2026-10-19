/**
 * Valida a paleta de src/styles/tokens.css.
 *
 * Fonte unica dos numeros: o teste (tests/tokens.test.ts) importa daqui, o CLI
 * (`node scripts/check-tokens.mjs`) imprime a tabela. Nenhum hex e duplicado.
 *
 * Daltonismo: matrizes de Machado, Oliveira & Fernandes (2009), severidade 1.0,
 * aplicadas em sRGB linear. Cobre protanopia, deuteranopia e tritanopia.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const AA_NORMAL = 4.5;
export const SERIES_MIN_DELTA_E = 15;

const SIMS = {
  normal: null,
  protanopia: [0.152286, 1.052583, -0.204868, 0.114503, 0.786281, 0.099216, -0.003882, -0.048116, 1.051998],
  deuteranopia: [0.367322, 0.860646, -0.227968, 0.280085, 0.672501, 0.047413, -0.01182, 0.04294, 0.968881],
  tritanopia: [1.255528, -0.076749, -0.178779, -0.078411, 0.930809, 0.147602, 0.004733, 0.691367, 0.3039],
};

const toLinear = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};
const fromLinear = (v) => {
  const c = Math.min(1, Math.max(0, v));
  return c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
};
const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
const luminance = (rgb) => {
  const [r, g, b] = rgb.map(toLinear);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export function contrast(a, b) {
  const la = luminance(hexToRgb(a));
  const lb = luminance(hexToRgb(b));
  const hi = Math.max(la, lb);
  const lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

export function simulateCvd(hex, kind) {
  const m = SIMS[kind];
  if (!m) return hex;
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  const out = [
    m[0] * r + m[1] * g + m[2] * b,
    m[3] * r + m[4] * g + m[5] * b,
    m[6] * r + m[7] * g + m[8] * b,
  ];
  const to255 = (v) => Math.round(fromLinear(v) * 255);
  return '#' + out.map(to255).map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function toLab(hex) {
  const [r, g, b] = hexToRgb(hex).map(toLinear);
  const X = 0.4124 * r + 0.3576 * g + 0.1805 * b;
  const Y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const Z = 0.0193 * r + 0.1192 * g + 0.9505 * b;
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const [fx, fy, fz] = [f(X / 0.95047), f(Y / 1), f(Z / 1.08883)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

export function deltaE(a, b) {
  const la = toLab(a);
  const lb = toLab(b);
  return Math.hypot(la[0] - lb[0], la[1] - lb[1], la[2] - lb[2]);
}

/** Extrai os tokens de um bloco `selector { ... }` do CSS. */
function parseBlock(css, selector) {
  const start = css.indexOf(selector + ' {');
  if (start === -1) throw new Error(`Bloco "${selector}" nao encontrado em tokens.css`);
  const end = css.indexOf('}', start);
  const body = css.slice(start, end);
  const tokens = {};
  for (const m of body.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})/g)) {
    tokens[m[1]] = m[2].toUpperCase();
  }
  return tokens;
}

export function readTokens(file = path.join(ROOT, 'src/styles/tokens.css')) {
  const css = readFileSync(file, 'utf-8');
  return { light: parseBlock(css, ':root'), dark: parseBlock(css, '.dark') };
}

const TEXT = ['ink', 'ink-2', 'ink-3', 'accent'];
const SURFACE = ['paper', 'paper-2', 'paper-3'];
const SERIES = ['series-1', 'series-2', 'series-3', 'series-4'];

export function auditPalette({ light, dark }) {
  const results = [];
  for (const [theme, tokens] of [['claro', light], ['escuro', dark]]) {
    for (const fg of TEXT) {
      for (const bg of SURFACE) {
        if (!tokens[fg] || !tokens[bg]) continue;
        results.push({ theme, kind: 'contrast', a: fg, b: bg, ratio: contrast(tokens[fg], tokens[bg]) });
      }
    }
    for (const sim of Object.keys(SIMS)) {
      const simulated = simulateCvd(tokens.accent, sim);
      results.push({
        theme, kind: 'cvd', a: 'accent', b: 'paper', sim,
        ratio: contrast(simulated, tokens.paper),
      });
    }
    for (let i = 0; i < SERIES.length; i++) {
      const a = tokens[SERIES[i]];
      if (!a) continue;
      // Contraste de cada serie contra o papel: objeto grafico precisa de 3:1.
      results.push({ theme, kind: 'series-contrast', a: SERIES[i], b: 'paper', ratio: contrast(a, tokens.paper) });
      for (let j = i + 1; j < SERIES.length; j++) {
        const b = tokens[SERIES[j]];
        if (!b) continue;
        // Distinguibilidade entre series: delta E sob as quatro simulacoes.
        for (const sim of Object.keys(SIMS)) {
          results.push({
            theme, kind: 'series-delta', a: SERIES[i], b: SERIES[j], sim,
            ratio: deltaE(simulateCvd(a, sim), simulateCvd(b, sim)),
          });
        }
      }
    }
  }
  return results;
}

// CLI
if (process.argv[1] && process.argv[1].endsWith('check-tokens.mjs')) {
  const tokens = readTokens();
  const results = auditPalette(tokens);
  const contrasts = results.filter((r) => r.kind === 'contrast');
  const cvd = results.filter((r) => r.kind === 'cvd');
  const seriesDelta = results.filter((r) => r.kind === 'series-delta');
  const seriesContrast = results.filter((r) => r.kind === 'series-contrast');
  const falhas = [
    ...contrasts.filter((r) => r.ratio < AA_NORMAL),
    ...cvd.filter((r) => r.ratio < AA_NORMAL),
    ...seriesDelta.filter((r) => r.ratio < SERIES_MIN_DELTA_E),
    ...seriesContrast.filter((r) => r.ratio < 3),
  ];

  console.log(`Pares de contraste: ${contrasts.length} | pior ${Math.min(...contrasts.map((r) => r.ratio)).toFixed(2)}:1`);
  console.log(`Acento sob daltonismo: pior ${Math.min(...cvd.map((r) => r.ratio)).toFixed(2)}:1`);
  for (const theme of ['claro', 'escuro']) {
    // O minimo considera as quatro simulacoes, inclusive a normal: e o pior caso real.
    const doTema = seriesDelta.filter((r) => r.theme === theme);
    console.log(`Series (${theme}): menor dE entre pares = ${Math.min(...doTema.map((r) => r.ratio)).toFixed(1)}`);
  }
  if (falhas.length) {
    for (const f of falhas) {
      console.error(`FALHA ${f.theme} ${f.kind} ${f.a}/${f.b}${f.sim ? ' ' + f.sim : ''} = ${f.ratio.toFixed(2)}`);
    }
    process.exit(1);
  }
  console.log('OK: paleta aprovada.');
}
