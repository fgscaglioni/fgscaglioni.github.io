#!/usr/bin/env node
/**
 * Gera os cards Open Graph (1200x630) em public/og/.
 *
 * Por que existe: BaseLayout referencia /og/<slug>.png em og:image. Enquanto nada gerava
 * esses arquivos, todo post anunciava uma imagem 404 e ficava sem preview ao ser compartilhado.
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
    tags: tagsRaw.split(',').map((t) => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean),
  };
}

const escapeHtml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cardHtml({ title, tags = [], date = '', kicker = 'Journal de Pesquisa' }) {
  const font = (name) => `file://${path.join(FONTS_DIR, name)}`;
  const tagChips = tags
    .slice(0, 4)
    .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
    .join('');
  const dateLabel = date
    ? new Date(`${date}T12:00:00Z`).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Instrument Serif'; font-style: italic; font-weight: 400; src: url('${font('instrument-serif-400-italic-latin.woff2')}') format('woff2'); }
  @font-face { font-family: 'Manrope'; font-style: normal; font-weight: 400; src: url('${font('manrope-400-latin.woff2')}') format('woff2'); }
  @font-face { font-family: 'Manrope'; font-style: normal; font-weight: 700; src: url('${font('manrope-700-latin.woff2')}') format('woff2'); }
  @font-face { font-family: 'JetBrains Mono'; font-style: normal; font-weight: 400; src: url('${font('jetbrains-mono-400-latin.woff2')}') format('woff2'); }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; display: flex; align-items: center; justify-content: center;
    background-color: #F5F2ED;
    background-image: radial-gradient(at 50% 0%, rgba(13,148,136,0.10) 0px, transparent 60%);
    font-family: 'Manrope', system-ui, sans-serif;
  }
  .card {
    width: 1060px; background: #fff; border: 1px solid rgba(0,0,0,0.05); border-radius: 28px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.06); padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between;
    height: 470px;
  }
  .kicker { font-family: 'JetBrains Mono', monospace; font-size: 15px; letter-spacing: 0.22em; text-transform: uppercase; color: #0D9488; font-weight: 700; }
  h1 { font-family: 'Instrument Serif', serif; font-style: italic; font-weight: 400; color: #111827; font-size: 58px; line-height: 1.12; margin-top: 20px; }
  .meta { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-top: 26px; }
  .tag { font-family: 'JetBrains Mono', monospace; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #4B5563; background: #F3F4F6; border-radius: 999px; padding: 5px 12px; }
  .foot { display: flex; align-items: center; justify-content: space-between; margin-top: 30px; }
  .who { font-size: 19px; color: #374151; font-weight: 700; }
  .site { font-family: 'JetBrains Mono', monospace; font-size: 15px; color: #6B7280; }
  .dot { width: 9px; height: 9px; border-radius: 50%; background: #0D9488; display: inline-block; margin-right: 10px; }
</style></head>
<body><div class="card">
  <div>
    <div class="kicker">${escapeHtml(kicker)}</div>
    <h1>${escapeHtml(title)}</h1>
    <div class="meta">${tagChips}${dateLabel ? `<span class="tag">${escapeHtml(dateLabel)}</span>` : ''}</div>
  </div>
  <div class="foot">
    <div class="who"><span class="dot"></span>${escapeHtml(AUTHOR)}</div>
    <div class="site">${escapeHtml(SITE)}</div>
  </div>
</div></body></html>`;
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
  const { title, tags, date } = parseFrontmatter(file);
  const slug = file.replace(/\.md$/, '');
  shoot(chrome, cardHtml({ title, tags, date }), path.join(OUT_DIR, `${slug}.png`));
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
