---
title: "Sistema de Recomendação de Matrículas para Campi Inteligentes"
pubDate: 2024-01-01
description: "Minha dissertação de mestrado na UFPel: um sistema que recomenda disciplina para alunos de Ciência da Computação baseado no perfil acadêmico."
tags: ["educação", "ia", "pesquisa"]
draft: false
updated: 2026-06-24
---

Na minha pesquisa de mestrado na UFPel, desenvolvi um sistema de recomendação de matrículas para alunos de Ciência da Computação. A ideia é usar dados do histórico acadêmico pra sugerir disciplinas que façam sentido pro aluno — em vez de cada um montar a grade no chute.

### O problema

Aluno escolhe disciplina baseado em horário, fama do professor ou dica de colega. Dificilmente olha pra própria trajetória — o que já cursou, quais pré-requisitos faltam, quanto falta pra formar. Resultado: matrícula subótima, semestre perdido, formatura atrasada.

### O que o sistema faz

Pega o histórico do aluno (disciplinas cursadas, notas, pré-requisitos) e cruza com a base de dados do curso. Usa três algoritmos:

- **Fatoração de matriz** — técnica de machine learning que identifica padrões escondidos nas relações aluno-disciplina
- **Co-clustering** — agrupa alunos e disciplinas simultaneamente pra achar correlações complexas
- **Slope One** — algoritmo simples e eficiente baseado em diferenças de preferência entre itens

### O diferencial: booster

Uma feature que ajusta a prioridade das recomendações. Se o aluno está perto de formar, o sistema prioriza disciplinas obrigatórias que ainda não foram cursadas. Se falta pouca coisa, não faz sentido recomendar eletivas aleatórias.

### Validação

Testei com dados históricos reais do curso de Ciência da Computação da UFPel. Gerei recomendações pro primeiro semestre de 2019 e comparei com as disciplinas que os alunos realmente cursaram e foram aprovados. O resultado mostrou que o sistema consegue sugerir trajetórias mais eficientes que a escolha manual.

### Onde pode chegar

O sistema foi pensado como peça de um campus inteligente — integrado com IoT, análise de dados e sensores. Dá pra expandir pra orientação de carreira, sugestão de trilhas de aprendizagem, até recomendação de estágios.

---

A dissertação completa está disponível no [Guaiaca Repository da UFPel](https://guaiaca.ufpel.edu.br/handle/prefix/12891).
