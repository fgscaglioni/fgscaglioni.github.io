/**
 * Parser de frontmatter dos posts — fonte única.
 *
 * Antes existiam quatro parsers por regex (astro.config.mjs, generate-og.mjs,
 * tests/routes.test.ts, tests/frontmatter.test.ts), cada um entendendo um
 * subconjunto diferente de YAML: `tags:` em bloco, descrição com `:` ou
 * aspas, escalar dobrado/literal e `---` no corpo quebravam em silêncio.
 *
 * Este parser cobre o subconjunto que o frontmatter do site usa:
 *   chave: valor            (aspas simples/duplas opcionais, comentário # fora de aspas)
 *   chave: [a, b]           (lista em fluxo)
 *   chave:                  (lista em bloco, itens com "  - ")
 *     - item
 *   chave: >  /  chave: |   (escalar dobrado / literal, linhas indentadas)
 * Valores voltam como string (ou string[]); quem precisa de boolean/data
 * compara a string ("true", "2026-01-01"). Sem bloco `---` no topo, devolve null.
 */

function stripQuotes(value) {
  const v = value.trim();
  if (v.length >= 2 && ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))) {
    return v.slice(1, -1);
  }
  return v;
}

function stripInlineComment(value) {
  // Comentário só quando # vem precedido de espaço e fora de aspas.
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < value.length; i++) {
    const c = value[i];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === '#' && !inSingle && !inDouble && (i === 0 || value[i - 1] === ' ')) {
      return value.slice(0, i).trimEnd();
    }
  }
  return value;
}

function parseFlowList(value) {
  const inner = value.replace(/^\[/, '').replace(/\]$/, '').trim();
  if (!inner) return [];
  return inner.split(',').map((item) => stripQuotes(item.trim())).filter(Boolean);
}

/**
 * @typedef {Record<string, string | string[]>} FrontmatterData
 * @typedef {{ data: FrontmatterData, body: string } | null} ParsedFrontmatter
 */

/**
 * @param {string} raw
 * @returns {ParsedFrontmatter}
 */
export function parseFrontmatter(raw) {
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return null;
  const block = raw.slice(3, end);
  /** @type {FrontmatterData} */
  const data = {};

  const lines = block.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!match) { i++; continue; }
    const key = match[1];
    let value = stripInlineComment(match[2]).trim();

    if (value === '>' || value === '|' || value === '>-' || value === '|-' || value === '>+' || value === '|+') {
      const folded = value[0] === '>';
      const collected = [];
      i++;
      while (i < lines.length && (/^\s+\S/.test(lines[i]) || lines[i].trim() === '')) {
        collected.push(lines[i].replace(/^\s+/, ''));
        i++;
      }
      const text = folded ? collected.join(' ').replace(/\s+/g, ' ').trim() : collected.join('\n').trim();
      data[key] = text;
      continue;
    }

    if (value === '') {
      // Possível lista em bloco.
      const items = [];
      let j = i + 1;
      while (j < lines.length && /^\s+-\s+/.test(lines[j])) {
        items.push(stripQuotes(lines[j].replace(/^\s+-\s+/, '').trim()));
        j++;
      }
      if (items.length > 0) {
        data[key] = items;
        i = j;
        continue;
      }
      data[key] = '';
      i++;
      continue;
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = parseFlowList(value);
    } else {
      data[key] = stripQuotes(value);
    }
    i++;
  }

  return { data, body: raw.slice(end + 4) };
}
