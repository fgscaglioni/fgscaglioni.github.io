export interface Project {
  year: string;
  client: string;
  name: string;
  url: string | null;
  stack: string[];
  summary: string;
  bullets: string[];
}

export const projects: Project[] = [
  {
    year: "2026",
    client: "Projeto pessoal",
    name: "Teleprompter",
    url: null,
    stack: ["Svelte", "TypeScript", "Vite", "Firebase Hosting"],
    summary:
      "Teleprompter gratuito no navegador: roteiros salvos localmente, leitura com rolagem automática e gravação com a câmera. Publicado com Firebase Hosting, sem cadastro e sem retenção de dados.",
    bullets: [
      "Roteiros em localStorage, com exportação e importação em JSON e JSONL",
      "Rolagem automática com velocidade e tamanho de fonte ajustáveis, modo espelho e cronômetro",
      "Gravação com MediaRecorder (MP4 quando o navegador suporta, WebM como alternativa) e download do vídeo",
      "CTA de doação via Ko-fi ao concluir uma leitura ou uma gravação, uma vez por sessão",
      "Analytics GA4 opcional (gtag) com eventos de tela, leitura, gravação e tempo de tela",
    ],
  },
  {
    year: "2018",
    client: "Partamon",
    name: "Lookpest",
    url: null,
    stack: ["Ionic", "Angular", "TypeScript", "Apache Cordova"],
    summary:
      "App mobile para agrônomos e técnicos de campo: monitoramento de pragas, coleta de dados de lavoura e consulta climática — tudo funcionando offline.",
    bullets: [
      "Banco de imagens offline para comparação de condições de campo sem internet",
      "Dados meteorológicos em tempo real para apoiar decisões de plantio, irrigação e aplicação de defensivos",
      "Coleta estruturada de dados: estágio das plantas, presença de pragas e doenças",
      "Pluviômetro integrado para registrar precipitação por área",
      "Cadastro de profissionais e equipes com controle de acesso",
      "Geração de relatórios detalhados por período e cultura",
    ],
  },
  {
    year: "2022",
    client: "Pesquisa UFPel",
    name: "My Safe Back",
    url: "https://www.youtube.com/watch?v=Cq1upMVIt3g",
    stack: ["Ionic", "Angular", "TypeScript"],
    summary:
      "Aplicativo de saúde para trabalhadores da segurança pública com dor lombar crônica, desenvolvido como suporte a um ensaio clínico randomizado publicado em revista indexada.",
    bullets: [
      "Protocolo de exercícios para fortalecimento e flexibilidade lombar — guiado por vídeo",
      "Cartilha educacional sobre postura e hábitos saudáveis para a coluna",
      "Seção informativa sobre tipos de dor lombar, causas e cuidados específicos",
      "Integrado a um RCT (Randomized Controlled Trial) publicado em periódico internacional",
    ],
  },
  {
    year: "2023",
    client: "Daily Travelling News",
    name: "Daily Travelling News",
    url: "https://dailyweb.com.ar/",
    stack: ["PHP", "WordPress", "JavaScript"],
    summary:
      "Melhorias pontuais no site de notícias de viagens argentino: correções de bugs, ajustes de performance e implementação de códigos de rastreamento.",
    bullets: [
      "Implementação de pixels de tracking e Google Tag Manager",
      "Correções de bugs e inconsistências visuais no frontend",
      "Ajustes de performance e carregamento de página",
    ],
  },
];
