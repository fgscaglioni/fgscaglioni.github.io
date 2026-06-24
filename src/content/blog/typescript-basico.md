---
title: "TypeScript Básico"
pubDate: 2024-01-01
description: "TypeScript adiciona tipagem estática ao JavaScript. Um guia rápido para começar."
tags: ["typescript", "javascript", "fundamentos"]
draft: false
updated: 2026-06-24
---

Se você já escreveu JavaScript por um tempo, sabe como é fácil um `undefined is not a function` aparecer em produção. TypeScript resolve isso — adiciona tipos ao JS e pega erros antes do código rodar.

### O que muda com TypeScript

TypeScript é JavaScript com tipagem estática. Você declara o tipo de cada variável, parâmetro e retorno de função. O compilador verifica se tudo bate antes de gerar o JS final.

```typescript
const nome: string = "João";
```

Interface para estruturar objetos:

```typescript
interface Pessoa {
  nome: string;
  idade: number;
}

const joao: Pessoa = {
  nome: "João",
  idade: 42
};
```

### Por que usar

- **Menos bugs em produção.** O compilador pega erros de tipo que passariam batido no JS puro.
- **Código mais fácil de ler.** Os tipos funcionam como documentação viva.
- **IntelliSense.** Sua IDE entende o formato dos dados e completa código de verdade.
- **Time colabora melhor.** Sem adivinhar o que uma função espera ou retorna.

### Como começar

```bash
npm install -g typescript
tsc --init
```

Mude a extensão de `.js` pra `.ts` e vá adicionando tipos gradualmente. TypeScript é superset de JavaScript — código JS válido é TS válido. Dá pra migrar aos poucos.

O importante é começar. Depois que você se acostuma com tipos, volta pro JS puro e sente falta.
