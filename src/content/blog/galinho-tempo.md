---
title: "Ionic + Angular + OpenWeather = Galinho do Tempo"
pubDate: 2024-01-01
description: "Uma recriação virtual do clássico Galinho do Tempo que muda de cor conforme o clima. Código no GitHub, demo ao vivo."
tags: ["mobile", "ionic", "angular"]
draft: false
---

Lembra do Galinho do Tempo? Aquele souvenir de vidro que mudava de cor prevendo o tempo? Resolvi recriar virtualmente com Ionic + Angular + API do OpenWeather.

O projeto tá no [GitHub](https://github.com/fgscaglioni/weathercock) e a demo ao vivo [aqui](https://galinho-do-tempo.web.app/).

### Como funciona

O app pega temperatura e umidade da localização do usuário via OpenWeather API, e com base nisso escolhe a cor do galinho.

### Setup

```bash
# Cria o app Ionic Angular
npx @ionic/cli start weathercock blank --type=angular --no-deps --no-git
cd weathercock

# Gera o serviço de API
npx @ionic/cli g service services/openWeatherApi
```

### Chave da API

Cadastra em [openweathermap.org/api](https://openweathermap.org/api), gera a chave em [home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys), coloca no `environment.ts`.

### Serviço

```typescript
async getWeather(lat: number, lon: number) {
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
  const paramsObj = {
    lat: String(lat),
    lon: String(lon),
    appid: environment.openWeatherApiKey,
    units: 'metric',
    lang: 'pt_br'
  };
  const searchParams = new URLSearchParams(paramsObj);
  let response: OpenWeatherWeatherResponseInterface;
  if (environment.production) {
    response = await firstValueFrom(
      this.http.get(`${baseUrl}?${searchParams.toString()}`)
    )
  } else {
    response = exampleResponse  // mock pra desenvolvimento
  }
  return response
}
```

### Lógica das cores

Seguindo o manual original do Galinho do Tempo:

| Condição | Cor |
|---|---|
| < 15°C e 100% de umidade (frio + chuva) | Rosa claro |
| 17°C a 26°C | Branco |
| >= 27°C (seco) | Azul |

### Código que escolhe a imagem

```typescript
getRooster(humidity: number, temperature: number) {
  const randomNumber = Math.floor(Math.random() * 4) + 1;
  let color = 'white'
  if (temperature < 17 && humidity > 95) {
    color = 'pink'
  } else if ((temperature >= 17 && temperature < 27) || temperature < 17) {
    color = 'white'
  } else if (temperature >= 27) {
    color = 'blue'
  }
  return `assets/img/${color}${randomNumber}.jpg`;
}
```

Cada cor tem 4 variações de imagem (geradas com Microsoft Copilot), sorteadas aleatoriamente pra dar variedade visual.

### Resultado

O app é simples: pega localização, consulta clima, exibe o galinho na cor certa. Código limpo, sem firula. Quiser incrementar, dá pra adicionar animação de transição entre cores, suporte a mais cidades, ou notificação quando o tempo mudar.
