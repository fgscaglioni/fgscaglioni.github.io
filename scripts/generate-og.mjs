#!/usr/bin/env node
/**
 * Gera os cards Open Graph (1200x630) em public/og/.
 *
 * Por que existe: BaseLayout referencia /og/<slug>.png em og:image. Enquanto nada gerava
 * esses arquivos, todo post anunciava uma imagem 404 e ficava sem preview ao ser compartilhado.
 *
 * Identidade: o card segue a mesma doutrina do site (papel, tinta e fio). Sem raio, sem
 * sombra, sem gradiente. Serie romana no titulo, mono em caixa alta nos rotulos, fio duplo
 * de masthead e um unico acento oxblood.
 *
 * Fontes: usa os arquivos variaveis de public/fonts. Os antigos manrope-400/700 e
 * jetbrains-mono-400 nao existem mais desde a consolidacao das fontes, e o card vinha
 * caindo na fonte do sistema sem avisar. tests/og.test.ts guarda essa regra.
 *
 * Uso:  node scripts/generate-og.mjs        (ou: pnpm og)
 * Requisitos: Google Chrome/Chromium instalado. Defina CHROME_PATH se não estiver em
 * /usr/bin/google-chrome, /usr/bin/chromium ou no PATH.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const BLOG_DIR = path.join(ROOT, 'src/content/blog');
const OUT_DIR = path.join(ROOT, 'public/og');
const FONTS_DIR = path.join(ROOT, 'public/fonts');

const SITE = 'fgscaglioni.dev.br';
const AUTHOR = 'Fabrício Scaglioni';

// Tokens do site (src/styles/tokens.css), repetidos aqui porque o card e um HTML
// autonomo renderizado fora do build do Astro.
const PAPER = '#F5F2ED';
const INK = '#1B1815';
const INK_2 = '#4A443C';
const INK_3 = '#6E675C';
const RULE = '#DED8C9';
const ACCENT = '#9C3A1E';

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ].filter(Boolean);
  for (const c of candidates) if (c && fs.existsSync(c)) return c;
  try {
    return execFileSync('which', ['google-chrome'], { encoding: 'utf8' }).trim();
  } catch {
    throw new Error('Chrome/Chromium não encontrado. Defina CHROME_PATH.');
  }
}

function parseFrontmatter(file) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8');
  const fm = raw.split('---')[1] ?? '';
  const pick = (key) => fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');
  const tagsRaw = fm.match(/^tags:\s*\[(.*?)\]/m)?.[1] ?? '';
  return {
    title: pick('title') ?? file,
    date: pick('pubDate') ?? '',
    description: pick('description') ?? '',
    tags: tagsRaw.split(',').map((t) => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean),
  };
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cardHtml({ title, tags = [], date = '', description = '', kicker = 'Journal de Pesquisa' }) {
  const font = (name) => `file://${path.join(FONTS_DIR, name)}`;

  const itens = [
    ...tags.slice(0, 3).map(escapeHtml),
    ...(date
      ? [new Date(`${date}T12:00:00Z`).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })]
      : []),
  ];
  const metaHtml = itens
    .map((t, i) => (i === 0 ? t : `<span class="sep">·</span>${t}`))
    .join('');

  // Titulo longo precisa de corpo menor: 62px quando cabe em duas linhas,
  // 52px quando aperta e 44px para os titulos de artigo que ocupam tres.
  const size = title.length > 110 ? 44 : title.length > 76 ? 52 : 62;

  // A descricao preenche o miolo do card e diz do que o post trata antes do
  // clique. Cortada em ~150 caracteres para caber em tres linhas.
  const lede = description.length > 150 ? description.slice(0, 147).trimEnd() + '...' : description;

  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Instrument Serif'; font-style: normal; font-weight: 400; src: url('${font('instrument-serif-400-latin.woff2')}') format('woff2'); }
  @font-face { font-family: 'Manrope'; font-style: normal; font-weight: 200 800; src: url('${font('manrope-var-latin.woff2')}') format('woff2-variations'); }
  @font-face { font-family: 'JetBrains Mono'; font-style: normal; font-weight: 400 800; src: url('${font('jetbrains-mono-var-latin.woff2')}') format('woff2-variations'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; padding: 0 72px;
    background: ${PAPER}; color: ${INK_2};
    font-family: 'Manrope', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }
  /* Fio duplo de masthead: 4px em cima, 1px embaixo. */
  .masthead { border-top: 4px solid ${INK}; border-bottom: 1px solid ${INK}; height: 0; margin-top: 42px; }
  .card { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 46px 0 38px; overflow: hidden; }
  .kicker {
    font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 500;
    letter-spacing: 0.18em; text-transform: uppercase; color: ${ACCENT};
  }
  h1 {
    font-family: 'Instrument Serif', serif; font-style: normal; font-weight: 400;
    color: ${INK}; font-size: ${size}px; line-height: 1.1; letter-spacing: -0.01em; margin-top: 18px;
  }
  .lede {
    margin-top: 22px; font-size: 23px; line-height: 1.5; color: ${INK_2};
    max-width: 940px;
  }
  .meta {
    margin-top: 26px; font-family: 'JetBrains Mono', monospace; font-size: 14px;
    letter-spacing: 0.12em; text-transform: uppercase; color: ${INK_3};
  }
  .meta .sep { color: ${RULE}; margin: 0 10px; }
  .foot {
    display: flex; align-items: baseline; justify-content: space-between;
    border-top: 1px solid ${RULE}; padding-top: 22px;
  }
  .who { font-size: 19px; font-weight: 700; color: ${INK}; }
  .square { width: 8px; height: 8px; background: ${ACCENT}; display: inline-block; margin-right: 10px; }
  .site { font-family: 'JetBrains Mono', monospace; font-size: 14px; letter-spacing: 0.08em; color: ${INK_3}; }
</style></head>
<body>
  <div class="masthead"></div>
  <div class="card">
    <div>
      <div class="kicker">${escapeHtml(kicker)}</div>
      <h1>${escapeHtml(title)}</h1>
      ${lede ? `<p class="lede">${escapeHtml(lede)}</p>` : ''}
      <div class="meta">${metaHtml}</div>
    </div>
    <div class="foot">
      <div class="who"><span class="square"></span>${escapeHtml(AUTHOR)}</div>
      <div class="site">${escapeHtml(SITE)}</div>
    </div>
  </div>
</body></html>`;
}

function shoot(chrome, html, outFile) {
  const tmp = path.join(os.tmpdir(), `og-${path.basename(outFile, '.png')}.html`);
  fs.writeFileSync(tmp, html);
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--no-sandbox',
      '--disable-gpu',
      '--hide-scrollbars',
      '--allow-file-access-from-files',
      '--force-device-scale-factor=1',
      '--window-size=1200,630',
      '--virtual-time-budget=3000',
      `--screenshot=${outFile}`,
      `file://${tmp}`,
    ],
    { stdio: 'ignore' }
  );
  fs.unlinkSync(tmp);
}

const chrome = findChrome();
fs.mkdirSync(OUT_DIR, { recursive: true });

const posts = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
let count = 0;
for (const file of posts) {
  const { title, tags, date, description } = parseFrontmatter(file);
  const slug = file.replace(/\.md$/, '');
  shoot(chrome, cardHtml({ title, tags, date, description }), path.join(OUT_DIR, `${slug}.png`));
  count++;
}

shoot(
  chrome,
  cardHtml({
    title: 'Engenharia de software, pesquisa em IA e educação',
    tags: ['Inteligência Artificial', 'Educação', 'Engenharia de Software'],
    kicker: 'Portfólio e Journal',
  }),
  path.join(OUT_DIR, 'default.png')
);

console.log(`OK: ${count} cards de post + default.png em public/og/ (Chrome: ${chrome})`);
