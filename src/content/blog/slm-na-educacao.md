---
title: "Inteligência Artificial na Educação: O papel dos Small Language Models (SLMs)"
pubDate: 2026-05-26
description: "Uma análise sobre a viabilidade e os benefícios de executar modelos de linguagem enxutos localmente em infraestrutura universitária para apoiar o aprendizado."
draft: false
---

# Inteligência Artificial na Educação: O papel dos SLMs

Nos últimos anos, o debate sobre IA generativa na educação tem sido dominado por grandes modelos proprietários hospedados em nuvem. No entanto, no ecossistema das instituições públicas de ensino superior, enfrentamos barreiras claras de privacidade de dados dos estudantes, custos e latência de rede.

Neste cenário, os **Small Language Models (SLMs)**, como os da família Llama-3 (8B) ou Phi-3, surgem como uma alternativa viável para execução local e privada.

## Por que Local e Privado?

1. **Adequação à LGPD:** Dados de desempenho escolar, dúvidas e interações do estudante não saem do ambiente institucional.
2. **Custo de Escala:** Substituir chamadas a APIs pagas por servidores próprios rodando instâncias quantizadas via Ollama/vLLM.
3. **Personalização:** Possibilidade de realizar fine-tuning do modelo com ementas e materiais específicos de disciplinas da própria universidade.

## Testando Modelos Locais

Um pipeline simples de execução local e quantização pode ser feito em poucos comandos:

```bash
# Executando um modelo de 8B parâmetros localmente
ollama run llama3.1:8b-instruct-q4_K_M
```

No Doutorado em Ciência da Computação, investigamos como essas interações podem ser modeladas para prever e recomendar caminhos de aprendizagem sob medida, sem expor a identidade dos alunos a terceiros.
