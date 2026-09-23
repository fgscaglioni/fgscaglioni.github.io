# AGENTS.md — fgscaglioni.dev.br

## Visão geral

Site pessoal de Fabrício Scaglioni: portfólio, blog e notas de pesquisa. Astro 7 em modo
estático, Tailwind 4, Svelte 5 nos componentes interativos, Vitest nos testes, publicação no
GitHub Pages em https://fgscaglioni.dev.br.

- `src/pages/` — rotas, uma por arquivo; `blog/[slug].astro` e `blog/tag/[tag].astro` são dinâmicas.
- `src/content/blog/` — posts em Markdown; o frontmatter é validado por `src/content.config.ts`.
- `src/data/*.ts` — conteúdo de portfólio, pesquisa, experiência, downloads e changelog. O site é data-driven: mudar conteúdo é editar TypeScript, não HTML.
- `src/layouts/BaseLayout.astro` — head, canonical, JSON-LD e og/twitter de todas as páginas.
- `public/` — servido na raiz: `fonts/`, `logos/`, `og/`, `papers/`, `robots.txt`, `CNAME`.
- `scripts/generate-og.mjs` — gera os cards Open Graph.
- `tests/` — Vitest sobre `dist/` e sobre o frontmatter dos posts.
- `dist/` e `.astro/` são saída de build, não versionados: nunca editar.
- `README.md` — narrativa para humanos. `agent_docs/` — detalhe lido sob demanda.

## Git: commit e push só sob ordem explícita

- Editar, criar e apagar arquivos do repositório é livre e é o esperado para concluir a tarefa.
- `git add`, `git commit`, `git push`, `gh pr create` e qualquer escrita no remoto acontecem **somente quando o autor pedir**. Entregar a tarefa com as mudanças no working tree é o resultado correto — não commitar não é pendência a resolver.
- `push` para `main` é deploy em produção: `.github/workflows/deploy.yml` publica no push para `main`/`master`. Nunca presumir autorização de push; confirmar antes.
- Sem ordem explícita, não reescrever histórico: nada de `--amend`, `rebase`, `reset` sobre commits existentes ou `push --force`.
- Commit autorizado é commit específico: não incluir mudanças que não foram pedidas.
- Se um commit ou push já tiver saído por engano, avisar o autor e aguardar decisão; não corrigir o histórico por conta própria.
- Mensagem de commit no padrão do histórico: prefixo `feat:` / `fix:` / `refactor:`, texto em português.

## Build, teste e verificação

```bash
pnpm install     # pnpm é o gerenciador (pnpm-lock.yaml); não usar npm/yarn
pnpm dev         # servidor de desenvolvimento em http://localhost:4321
pnpm build       # build de produção em dist/
pnpm test        # Vitest (lê dist/ e o frontmatter)
pnpm og          # regenera public/og/*.png a partir do frontmatter
```

Portão antes de dar a tarefa por concluída, na raiz do repositório:

```bash
pnpm build && pnpm test      # os dois precisam sair 0, sem erro no build
```

`pnpm test` lê `dist/`: se mexeu em `src/`, rode `pnpm build` antes. Para conferir metadados de
uma página sem abrir o navegador:

```bash
grep -o '<link rel="canonical" href="[^"]*"' dist/<pagina>/index.html
```

## Convenções

- Toda página passa `title` e `description` para o `BaseLayout`; canonical, `og:url`, `twitter:url` e JSON-LD são derivados dele. Não declarar esses metadados manualmente na página.
- Texto visível e comentários em português; nomes de arquivos, componentes, funções e tipos em inglês.
- Título de página até ~60 caracteres, descrição até ~160: nada falha no build, mas o excesso é truncado no resultado de busca.
- Link de tag sempre por `slugifyTag()` (`src/utils/tags.ts`): a URL é o slug, nunca o rótulo com espaço ou acento.
- Asset novo vai para `public/` (servido na raiz) ou `src/assets/` (processado pelo Astro). Não hotlinkar CDN de terceiro: fontes, avatar e logos são locais por decisão.

### Changelog

- **Toda atualização do site entra no changelog, na mesma alteração.** Acrescente a entrada no **topo** de `src/data/changelogData.ts` (`date` em `DD/MM/AAAA`, `version`, `title`, `description`, `changes[]`) e suba a versão no padrão `vX.Y.Z` do histórico: o array é renderizado na ordem em que está, então a entrada nova vai primeiro.
- Nada falha se isso for esquecido no build: `pnpm build` não cobre o changelog. Quem cobre é `tests/changelog.test.ts`, que valida formato, ordem e a presença da entrada quando há alteração de site não commitada. Escape consciente para quando as duas coisas não andarem juntas: `SKIP_CHANGELOG_GATE=1 pnpm test`. Formato e exemplo em `agent_docs/conteudo-e-metadados.md`.

## Pitfalls e proibições

- **Nunca** commitar `dist/` ou `.astro/` (já estão no `.gitignore`).
- **Nunca** linkar `/public/...`: em Astro o `public/` é a raiz do site (`/papers/x.pdf`).
- **Nunca** usar entidade HTML em prop de componente (`title="A &amp; B"`): o Astro não decodifica atributo estático e a página renderiza `A &amp; B` literal. Escrever `&`.
- Post novo, renomeado ou com título/tags alterados exige `pnpm og` **antes** do build: o `og:image` de cada post aponta para `/og/<slug>.png`, e sem o arquivo o card responde 404.
- Post que não deve aparecer na busca leva `noindex: true` no frontmatter. `draft: true` é outra coisa: tira o post do site inteiro.
- Não criar tag nova por variação de grafia (`educação` + `educacao`): gera duas páginas para o mesmo assunto. Use o rótulo já existente.
- Não corrigir nada no HTML de `dist/`: a correção é na fonte, e o build é descartável.

## Detalhe sob demanda

- `agent_docs/conteudo-e-metadados.md` — contrato do frontmatter, regras de tag/canonical/OG/sitemap e quais testes guardam cada regra.
