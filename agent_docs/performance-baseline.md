# Baseline de performance — Lighthouse mobile

Medição de referência para comparar depois de mudanças (T-11 do conselho de 2026-11-27). Método:

- Servidor: `astro preview` local (build de produção), sem cache de borda.
- Lighthouse 12.8.2, Chrome headless, `form-factor=mobile`, `screenEmulation.mobile=true`.
- Categorias: performance e accessibility.

## Números (2026-11-27)

| Página | Performance | Accessibility | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| Home (`/`) | **64** | 100 | 1,2s | 3,2s | 2.310ms | 0 |
| Post (`/blog/transformers/`) | **97** | 100 | 1,1s | 1,5s | 180ms | 0 |

## O que pesa

- **Google Analytics (gtag.js): 179 KB transferidos na home**, 349ms de scripting; "third-party code blocked the main thread for 290ms". É o maior contribuinte do TBT baixo na pontuação — e a razão de a home pontuar 64 contra 97 do post com os mesmos assets próprios.
- "Unused JavaScript": economia estimada de 75 KiB (o maior item é justamente o gtag).
- Style & Layout: 5.102ms no breakdown da home (recalculação na troca de fonte/tema na primeira pintura).
- Render-blocking: 0ms. Compressão de texto: sem achado. Fontes: 3 woff2 com preload (~77KB).

## Notas

- Desde a T-07, o GA só carrega sem `Do Not Track`; em Lighthouse (que não envia DNT) ele continua entrando. Medir com DNT ligado aproxima o cenário de quem opta por sair.
- Para repetir: `pnpm build`, sirva `pnpm preview` e rode o Lighthouse mobile na mesma URL interna. Guardar o JSON junto desta nota quando houver comparação.
