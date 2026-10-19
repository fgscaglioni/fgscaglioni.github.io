# Gráficos

## Decisão

Gráfico de dados no site é **SVG escrito à mão**, dentro de `src/components/DataFigure.astro`,
com tabela de dados embutida. Nenhuma biblioteca de gráficos é instalada agora.

## Por que não uma biblioteca

| Opção | Renderiza | Impressão | Acessibilidade | No-JS | Peso | Veredito |
|---|---|---|---|---|---|---|
| Chart.js | canvas | ruim (bitmap) | ruim | não | 70 KB | rejeitada |
| ECharts | canvas (SVG opcional) | ruim por padrão | parcial | não | ~1 MB | rejeitada |
| uPlot | canvas | ruim | ruim | não | 45 KB | rejeitada |
| Observable Plot | SVG | boa | parcial | não (precisa de DOM) | ~90 KB + linkedom no build | escape hatch |
| D3 | SVG | boa | depende do autor | sim | 250 KB | grande demais para 5 gráficos |
| SVG à mão | SVG | ótima | ótima (autor controla) | sim | 0 | **escolhida** |

Uma dependência que não está instalada não apodrece. O site tem, no máximo, um gráfico por página.

## Regras de uso

1. O gráfico usa no máximo **4 séries**. Acima disso, use múltiplos pequenos (small multiples).
2. Toda série tem **segunda marca além da cor**: traço tracejado distinto, marcador distinto
   (círculo, quadrado, triângulo, losango) ou rótulo direto no fim da linha. Cor nunca é o
   único canal — ver `tests/tokens.test.ts`.
3. Todo gráfico tem `<figcaption>` com o que está sendo mostrado, e `<details>` com a
   tabela de dados.
4. O `<svg>` recebe `role="img"` e um `<title>` com o resumo em uma frase.
5. Eixos em `--ink-3`, grade em `--rule`, séries em `--series-1..4`. Não existe utility de
   série no Tailwind: quem desenha aplica `style="stroke: var(--series-1)"` (ou `fill:`) no
   próprio SVG. O `DataFigure` não fixa cor de série — ele recebe o SVG pronto.
6. Nada de animação de entrada.

## Quando adotar Observable Plot

Só se aparecer um gráfico com interação real (brush, zoom, tooltip por ponto). Nesse caso
ele é uma ilha cliente (`client:only`), isolada, carregada só naquela página — e o fallback
estático continua existindo.
