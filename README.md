# fgscaglioni.dev.br

Site pessoal de Fabrício Scaglioni — portfólio, blog e notas de pesquisa.

## Stack

- **Framework:** [Astro](https://astro.build) 7 (static site generator)
- **Estilo:** Tailwind CSS 4 + [@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)
- **Ícones:** FontAwesome 7
- **Testes:** [Vitest](https://vitest.dev)
- **Deploy:** GitHub Pages via GitHub Actions

## Estrutura

```
src/
├── components/    # Componentes reutilizáveis (PaperCard, Navbar, TagFilter, etc.)
├── content/blog/  # Posts do blog em Markdown
├── data/          # Dados estruturados (stack, publicações, changelog, etc.)
├── layouts/       # Layout base (BaseLayout)
├── pages/         # Páginas do site (home, research, blog, etc.)
├── styles/        # Estilos globais (global.css)
├── utils/         # Funções utilitárias (tags.ts)
tests/             # Testes Vitest
```

## Comandos

```bash
pnpm dev       # Servidor de desenvolvimento
pnpm build     # Build de produção
pnpm preview   # Preview do build
pnpm test      # Rodar testes
```

## Blog

Os posts ficam em `src/content/blog/` como arquivos `.md` com frontmatter YAML. Novos posts são automaticamente descobertos pelo Astro Content Collections.

```yaml
---
title: "Título do Post"
pubDate: 2026-06-24
description: "Descrição curta para listagens e SEO."
tags: ["tag1", "tag2"]
updated: 2026-06-24  # opcional
draft: false
---
```

Feito com [Astro](https://astro.build).
