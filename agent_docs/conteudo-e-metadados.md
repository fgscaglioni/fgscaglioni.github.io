# Conteúdo e metadados

Detalhe para tarefas que mexem em posts, tags, canonical, Open Graph ou sitemap.

## Frontmatter dos posts

`src/content/blog/*.md`, validado por `src/content.config.ts`:

| Campo | Obrigatório | Efeito |
|---|---|---|
| `title` | sim | H1 da página e `<title>` quando não há `seoTitle` |
| `seoTitle` | não | só `<title>` / `og:title`; usar quando o título editorial passa de ~60 caracteres (o H1 continua sendo `title`) |
| `pubDate` | sim | data de publicação; vira `lastmod` no sitemap quando não há `updated` |
| `description` | sim | listagem do blog, meta description e `og:description` |
| `seoDescription` | não | só meta/`og:description`, quando a descrição editorial passa de ~160 |
| `updated` | não | se presente, é o `lastmod` do post no sitemap |
| `tags` | não (default `[]`) | rótulos legíveis; a URL de cada tag é `slugifyTag(tag)` |
| `draft` | não (default `false`) | `true` remove o post do site inteiro |
| `noindex` | não (default `false`) | post publicado e fora do índice; também não entra em "Últimos Artigos" na home |
| `ogImage` | não | sobrepõe o card gerado (`/og/<slug>.png`) |

Arquivo começando com `_` é ignorado pelo loader.

## Onde cada metadado é decidido

- `src/layouts/BaseLayout.astro` — `canonical`, `og:url` e `twitter:url` são calculados de `Astro.url.pathname` (auto-referentes em toda página, inclusive nas de topo e nas de tag). Emite `WebSite` + `Person` (com `sameAs` para Scholar, ORCID, Lattes, ResearchGate, Semantic Scholar, GitHub, LinkedIn, Medium) em todas as páginas, e `BlogPosting` + `BreadcrumbList` apenas em post, recebendo `slug`, `pubDate` e `updated`.
- `src/pages/blog/tag/[tag].astro` — `noindex, follow`, canonical próprio e H1 `Posts com a tag "<rótulo>"`, para não duplicar o H1/listagem do `/blog/`.
- `astro.config.mjs` — o sitemap exclui `/blog/tag/` e usa `lastmod` real por post; URL sem data confiável sai sem `lastmod`, em vez de carimbar a data do build.
- `public/robots.txt` — só `Allow: /` e o sitemap. O `Disallow: /blog/tag/` foi removido de propósito: sem ele o Google lê o `noindex` das tags.

## Regras de tag

- `slugifyTag` (`src/utils/tags.ts`) normaliza NFD, remove acentos, minúsculas, troca o resto por `-`: `"Boas práticas"` → `boas-praticas`.
- `tagSlugMap` resolve slug → rótulo legível; o primeiro rótulo encontrado vence, então duas grafias do mesmo slug caem na mesma página.
- `sortTagsByFrequency` ordena o filtro por número de posts.

## Changelog

`src/data/changelogData.ts` alimenta a página `/changelog`; toda atualização do site ganha uma
entrada, e o array é renderizado na ordem em que está — **a entrada mais nova vai primeiro**.

```ts
{
  date: "23/09/2026",            // DD/MM/AAAA, data da alteração
  version: "v2.4.0",             // padrão vX.Y.Z do histórico
  title: "Título curto da mudança",
  description: "Uma frase sobre o que mudou e por quê.",
  changes: [
    "Um item por mudança concreta, no mesmo tom das entradas anteriores.",
  ],
}
```

- Versão no mesmo esquema `vX.Y.Z` das entradas existentes; não há regra estrita de quando subir
  minor ou patch, siga o histórico.
- O formato, a ordem e a presença da entrada são cobertos por `tests/changelog.test.ts`: alteração de site não commitada sem `src/data/changelogData.ts` modificado faz a suíte falhar (escape: `SKIP_CHANGELOG_GATE=1 pnpm test`).
- Entrada descreve a alteração para quem lê o site, não o processo interno (sem número de PR,
  sem nome de branch).

## Cards Open Graph

- `scripts/generate-og.mjs` (via `pnpm og`) renderiza `public/og/<slug>.png` (1200x630) por post, mais `public/og/default.png` para as páginas sem slug, usando as fontes de `public/fonts`.
- Rodar antes do build: o `BaseLayout` referencia `${siteUrl}/og/${slug ? slug + ".png" : "default.png"}`.
- Slug novo, título novo ou tag nova não muda o nome do arquivo, mas o card precisa ser regenerado para o texto sair atualizado.

## Testes que guardam essas regras (`tests/`)

- `frontmatter.test.ts` — presença e formato dos campos obrigatórios; `description` entre 10 e 300 caracteres.
- `routes.test.ts` — roda `astro build`, confere que todo post publicado gera HTML, que toda tag gera página com **slug normalizado** e que nenhum diretório de tag tem espaço ou acento.
- `tag-filter.test.ts` — `sortTagsByFrequency`.
- `date-format.test.ts` — `pubDate` em ISO e datas de calendário válidas.
- `papercard.test.ts` — props do componente de card.

Limites de tamanho de metadado (60/160 caracteres) não são testados: são conferidos lendo o HTML
gerado, como no comando de verificação do `AGENTS.md`.
