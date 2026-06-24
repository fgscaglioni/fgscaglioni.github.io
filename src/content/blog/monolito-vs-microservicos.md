---
title: "Monolito vs Microsserviços"
pubDate: 2024-01-01
description: "Monolito ou microsserviços? Depende. Um guia prático sobre quando usar cada arquitetura."
tags: ["arquitetura", "backend"]
draft: false
---

A escolha entre monolito e microsserviços é menos sobre tecnologia e mais sobre contexto do projeto. Cada um resolve problemas diferentes.

### Monolito

Tudo num bloco só. Código, banco, deploy — uma única aplicação.

**Vantagens:**
- Simples de desenvolver, testar e fazer deploy
- Latência baixa (chamadas são locais)
- Ótimo pra começar: startup, MVP, projeto pequeno

**Problemas:**
- Escalar um componente específico? Tem que escalar tudo
- Qualquer alteração pode quebrar o sistema inteiro
- Cada deploy é o sistema completo de novo

### Microsserviços

Cada funcionalidade vira um serviço independente. Cada um com seu banco, seu deploy, seu time.

**Vantagens:**
- Escala só o que precisa
- Atualiza um serviço sem derrubar os outros
- Se um quebra, o resto continua funcionando

**Problemas:**
- Comunicação entre serviços vira um problema (REST, filas, gRPC)
- Precisa de infraestrutura adicional: Docker, Kubernetes, service mesh
- Setup inicial é mais lento e complexo

### Quando usar cada um

**Monolito** é a resposta certa na maioria das vezes. Se o projeto cabe num time pequeno, o domínio não é gigante e você não tem problema de escala horizontal seletiva, vai de monolito. O Instagram, o Shopify e o GitHub começaram como monolitos.

**Microsserviços** faz sentido quando o sistema cresceu a ponto de times diferentes precisarem deployar independentemente, ou quando partes do sistema têm requisitos de escala muito diferentes.

A regra é simples: comece monolítico, extraia microsserviços quando a dor aparecer. Não antecipe problemas que você não tem.
