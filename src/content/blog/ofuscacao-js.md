---
title: "Ofuscação de JavaScript"
pubDate: 2024-01-01
description: "Proteja seu código JS contra engenharia reversa. Passo a passo para ofuscar uma aplicação Angular com webpack-obfuscator."
tags: ["javascript", "segurança"]
draft: false
---

Ofuscação de JavaScript transforma seu código legível em algo que um ser humano não consegue entender, mas o navegador executa do mesmo jeito. Não é segurança de verdade — se alguém quiser muito reverter, consegue — mas já barra 99% dos curiosos.

Aqui vai o passo a passo pra configurar num projeto Angular.

### 1 — Instalar os pacotes

```bash
npm install --save-dev javascript-obfuscator webpack-obfuscator
```

### 2 — Adicionar o custom webpack builder

Precisa de um builder que integre o Webpack no Angular. A versão do builder precisa bater com a do Angular:

Angular 17:
```bash
npm install --save-dev @angular-builders/custom-webpack@17
```

Angular 18+:
```bash
npm install --save-dev @angular-builders/custom-webpack
```

### 3 — Configurar o Webpack

Cria `webpack.config.js` na raiz:

```javascript
var WebpackObfuscator = require('webpack-obfuscator');

module.exports = {
  plugins: [
    new WebpackObfuscator({
      debugProtection: true,
    }, ['vendor.js'])
  ]
}
```

O segundo argumento (`['vendor.js']`) são os arquivos que você NÃO quer ofuscar. Útil se alguma lib externa quebrar com a ofuscação.

### 4 — Atualizar o angular.json

Troca o builder padrão pelo custom:

```json
{
  ...
  "architect": {
    "build": {
      "builder": "@angular-builders/custom-webpack:browser",
      "options": {
        "customWebpackConfig": {
          "path": "./webpack.config.js",
          "mergeStrategies": {
            "module.rules": "prepend"
          }
        },
        "outputPath": "dist",
        ...
      }
    }
  }
  ...
}
```

### Pronto

Roda `npm run build`. Os arquivos na pasta `dist` vão sair ofuscados. Publica sem medo de alguém copiar seu código e entender de primeira o que ele faz.

Lembrando: ofuscação não substitui autenticação, CORS bem configurado ou validação no backend. É uma camada extra, não a única.
