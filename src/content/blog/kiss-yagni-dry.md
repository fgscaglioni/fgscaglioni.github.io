---
title: "KISS, YAGNI, DRY"
pubDate: 2024-01-01
description: "Três princípios simples que melhoram qualquer código. E como aplicar eles sem dogmatismo."
tags: ["engenharia", "boas práticas"]
draft: false
updated: 2026-06-24
---

Três acrônimos que aparecem em toda entrevista técnica mas pouca gente aplica de verdade. Vou direto ao ponto.

### KISS — Keep It Simple, Stupid

Solução mais simples é quase sempre a melhor. Não é sobre ser preguiçoso — é sobre não inventar complexidade onde não precisa.

Exemplo: filtrar números pares de uma lista.

Versão complicada que ninguém merece:
```javascript
function numerosPares(lista) {
  let resultado = [];
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] % 2 === 0) {
      resultado.push(lista[i]);
    }
  }
  return resultado;
}
```

Versão KISS:
```javascript
function numerosPares(lista) {
  return lista.filter(num => num % 2 === 0);
}
```

Código simples é mais fácil de ler, dar manutenção e debugar. Se você precisa ler um comentário pra entender o que sua própria função faz, tem algo errado.

### YAGNI — You Aren't Gonna Need It

Não escreva código pra um futuro que você não tem certeza que vai chegar. Aquela autenticação biométrica, o suporte a 5 providers de email, o cache distribuído — implementa QUANDO precisar, não ANTES.

```javascript
function autenticarUsuario(email, senha) {
  if (verificarCredenciais(email, senha)) {
    return "Usuário autenticado";
  }
  return "Falha na autenticação";
}

function verificarCredenciais(email, senha) {
  const usuarios = [
    { email: 'teste@exemplo.com', senha: '123456' }
  ];
  return usuarios.some(u => u.email === email && u.senha === senha);
}
```

A feature extra que você planejou hoje provavelmente vai mudar até você precisar de verdade. Código não escrito é código sem bugs.

### DRY — Don't Repeat Yourself

Código duplicado é inimigo da manutenção. Se você copiou e colou a mesma lógica três vezes, já devia ter extraído pra uma função.

```javascript
function calcularDesconto(preco, percentual) {
  return preco - (preco * (percentual / 100));
}

function descontoClienteRegular(preco) {
  return calcularDesconto(preco, 10);
}

function descontoClientePremium(preco) {
  return calcularDesconto(preco, 20);
}
```

Mudou a regra de desconto? Altera num lugar só.

Mas cuidado: DRY levado ao extremo vira acoplamento desnecessário. Se duas funções têm código parecido mas conceitos diferentes, deixar elas separadas é melhor que criar uma abstração forçada.

### No fim

KISS, YAGNI e DRY são ferramentas, não mandamentos. Use o bom senso: simplicidade sempre que possível, abstraia quando a duplicação doer, e não implemente o que você não precisa hoje.
