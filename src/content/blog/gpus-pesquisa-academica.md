---
title: "GPUs na Pesquisa Acadêmica Brasileira: o Levantamento da RNP"
pubDate: 2026-08-14
description: "O que o levantamento da RNP (43º SBRC 2025) revela sobre o perfil de uso de GPUs nas IES brasileiras - modelos por faixa de VRAM, economia do hardware e as 35 instituições representadas."
seoDescription: "Panorama do uso de GPUs na pesquisa acadêmica brasileira a partir do levantamento da RNP: perfil dos grupos, faixas de VRAM e infraestrutura disponível."
tags: ["gpu", "hpc", "pesquisa", "rnp", "educacao"]
draft: false
updated: 2026-08-14
---

A RNP conduziu um levantamento sobre o interesse e o perfil de uso de GPUs por pesquisadores brasileiros, aplicado durante o 43º SBRC (Natal/RN, 2025), o WRNP 2025 e a lista Resd-l da SBC. Resultado: **57 respondentes de 35 instituições**, cobrindo todas as regiões do país. Os dados foram apresentados por Gustavo Neves Dias (RNP) na sessão "Mais GPUs, mais ciência".

## O perfil de uso revelado pela pesquisa

- **Memória por GPU**: 50,9% usam entre 24 e 48 GB de VRAM; 77,2% até 128 GB.
- **Quantidade**: 70,2% usam 1 a 4 GPUs; 87,7% até 10 GPUs.
- **Workload**: 91,2% treinam modelos de IA/ML; 82,5% trabalham com datasets menores que 1 TB; 75,4% executam jobs de até 4 semanas.
- **Stack**: TensorFlow, PyTorch, CUDA, RAPIDS, OpenACC e LLaMA - tudo no ecossistema NVIDIA.

O artigo não enumera modelos específicos (a única GPU citada é a H200, como referência de comparação), mas o perfil de VRAM permite inferência sólida.

## Modelos de GPU por faixa de memória

| Faixa | Modelos compatíveis | Contexto de uso |
| :--- | :--- | :--- |
| 24 GB | RTX 3090, RTX 4090 (RTX 5090 a partir de 2025) | Padrão de facto em laboratórios acadêmicos brasileiros |
| 48 GB | RTX A6000, RTX 6000 Ada, L40S, A40, A100-40GB | Servidores pequenos e workstations |
| 80-141 GB | A100-80GB, H100, H200 | Infraestrutura compartilhada (nuvens de GPU, CENAPADs, LNCC) |
| 16-32 GB | V100, T4 | Legado e inferência |

A combinação 1-4 GPUs + 24-48 GB + datasets < 1 TB + jobs curtos indica estações de trabalho com 1-2 GeForce RTX 30/40 series ou servidores pequenos com A6000/L40S - não clusters de datacenter.

## Por que a GeForce vence no Brasil

A economia do hardware explica a faixa modal:

- RTX 3090 usada (2026): US$ 850-1.050 - o caminho mais barato para 24 GB de VRAM no mercado.
- RTX 4090: US$ 2.400-2.800 (throughput de treino ~2-2,5x a 3090).
- A5000 (24 GB): US$ 3.100 - mesmo VRAM, desempenho inferior à 4090.
- A100: US$ 10-15k+; H100: US$ 25-40k.

No Brasil a conta fecha ainda mais rápido: 1 A100 importada custa R$ 60-100k com impostos, enquanto 2-4 RTX 4090 a R$ 10-15k cada é o teto realista de um edital CAPES/CNPq/FAP. A RTX 3090 inundou o mercado de usados (ciclo de mineração + upgrade), permitindo montar laboratório com 2-4 placas por R$ 4-7k cada.

Não há barreira de software: PyTorch, TensorFlow, CUDA e NCCL rodam idênticos na GeForce. As limitações (sem NVLink, sem ECC, sem MIG) só importam em escala de datacenter - irrelevantes para 1-4 GPUs numa estação. E como RAPIDS é NVIDIA-only, a amostra é majoritariamente NVIDIA por construção.

## As 35 instituições representadas

| Respondentes | Instituições |
| :--- | :--- |
| 7 | UFBA |
| 5 | UFJF |
| 3 | UFF, UFMG, UFV |
| 2 | RNP, UECE, UFPA, UFRGS, UnB, Unioeste |
| 1 | CESAR, IFBA, IFES, IFPB, IFPE, Inatel, JambuLabs, PAX\|RN, UERJ, UFC, Ufes, UFG, UFMT, UFPB, UFPI, UFPR, UFRJ, UFRN, UFSCAR, UFU, Unicamp, Unisinos |

Composição: **21 universidades federais, 4 estaduais** (UERJ, UECE, Unicamp, Unioeste), **4 institutos federais** (IFBA, IFES, IFPB, IFPE) e entidades não-IES (RNP, CESAR, Inatel, JambuLabs, PAX\|RN).

## Ressalva metodológica importante

O gráfico mostra a IES de **vínculo** dos respondentes, não quem necessariamente possui infraestrutura de GPU. Como 94,7% são pesquisadores/docentes/estudantes e um dos achados centrais é a **demanda reprimida** por acesso a GPUs, esta é a lista de IES interessadas/usuárias - não de proprietárias de parques de GPU.

## A resposta da RNP: infraestrutura federada

A estratégia da RNP para democratizar o acesso segue o modelo em camadas:

- **Tier 1** - LNCC (supercomputadores): grandes modelos, treinamento em larga escala.
- **Tier 2** - CENAPADs: modelos médios, treinamento intermediário.
- **Tier 3** - Nuvem de GPUs da RNP: modelos pequenos, inferência e edge.

Em 2026 o embrião da Infraestrutura Federada de HPC/IA está sendo implantado no Centro Nacional de Dados da RNP (CND-DF), incluindo o HPC do Projeto Brasil 6G. O projeto LibrasNET (parceria com o Instituto Eldorado) já está em aquisição de servidor com 8x GPU B200 (180 GB cada), 2x CPU de 56 núcleos, 2 TB RAM e 30 TB SSD.

## Fontes

- Artigo LinkedIn Pulse da RNP (RNP Tech News, 10/11/2025): "Levantamento identifica o interesse e perfil de uso de GPUs por pesquisadores"
- Apresentação "Mais GPUs, mais ciência" - Gustavo Neves Dias (RNP), Indico: https://indico.rnp.br/event/155/contributions/1263/attachments/552/844/14.25-14.50_-_Mais_GPUs_mais_ciencia.pdf
