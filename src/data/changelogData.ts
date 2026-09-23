export interface ChangeLogEntry {
  date: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
}

export const changelogData: ChangeLogEntry[] = [
  {
    date: "23/09/2026",
    version: "v2.5.0",
    title: "Auditoria de Design: Dark Mode, Acessibilidade & Contraste",
    description: "Correção dos defeitos encontrados na auditoria visual e de acessibilidade: dark mode controlado pelo toggle, código legível no escuro, busca do journal funcionando após navegação, contraste conforme WCAG 2.2 AA e limpeza de dependências mortas.",
    changes: [
      "Dark mode corrigido: os utilitários dark: eram compilados para @media (prefers-color-scheme) e ignoravam o botão do site — com o sistema em escuro e o site em claro, títulos ficavam em 1,24:1. Agora seguem a classe .dark do <html>, e os degraus gray-300/600/800 que faltavam na paleta escura foram definidos (links de formação estavam em 1,21:1).",
      "Código legível no tema escuro: o tema único do Shiki pintava o código #24292E sobre fundo escuro (1,18:1). Passa a usar tema duplo (github-light no claro, github-dark no escuro).",
      "Busca do journal volta a funcionar ao navegar pelo menu: o listener estava preso ao DOMContentLoaded e o ClientRouter não o dispara de novo (13/13 artigos chegavam pelo menu contra 1/13 em carga direta). Recebeu contagem de resultados, estado vazio, rótulo acessível e placeholder com contraste.",
      "Correção de dois defeitos de renderização: classes escritas com entidade HTML literal (class=&quot;...) nunca aplicavam o estilo, e um trecho em **negrito** aparecia como texto literal na página de pesquisa.",
      "Contraste conforme WCAG 2.2 AA: text-gray-400 (2,33:1 a 2,60:1) virou gray-600 e todo text-gray-500 (4,41:1, logo abaixo do mínimo de 4,5:1) virou gray-600 em 57 pontos; estados ativos, pílulas de tag e skip link passaram de teal-600 (3,66:1) para teal-700 (5,5:1); anel de foco padronizado em teal-700, com teal-300 no tema escuro.",
      "Tamanhos de texto: 33 usos entre 8px e 10px subiram para 10px e 11px.",
      "Alvos de toque: botões da navbar, tema e marca com 44px e menu mobile com 8 links de 44px; links de texto autônomos (rodapé, DOI, 'Ver todos', 'Voltar ao Journal', empresas) receberam área de toque de 24px. Não havia falha da WCAG 2.5.8, mas o alvo de 16px era desconfortável no dedo.",
      "Marcadores da Formação Acadêmica unificados em `circle-dot` (os dois registros da UniSenac estavam com `square`, sem relação com o nível do curso) e removidas as classes de tamanho de fonte aplicadas a ícones, que não tinham efeito: o componente fixa o SVG em 16px, e o tamanho de fonte não encolhe SVG com dimensão explícita. Efeito visual apenas nos marcadores, que agora são todos iguais.",
      "Rodapé com links (RSS e Modificações) e chamada 'Acessar repositório' da página de downloads sempre visível, em vez de só no hover.",
      "Fontes: 18 arquivos para 8 conteúdos distintos — Manrope e JetBrains Mono são variáveis e agora são declaradas por faixa de peso, eliminando ~74 KB redundantes por página.",
      "Ícones de ResearchGate e Medium com marcas próprias (antes um quadrado vazio e um globo).",
      "Higiene: dependências sem uso (@fortawesome/fontawesome-free, swiper) e assets legados (public/data.js, public/stack.json) removidos; utilitários prose-code/prose-ul que não compilavam no Tailwind 4 substituídos por CSS explícito.",
    ]
  },
  {
    date: "23/09/2026",
    version: "v2.4.0",
    title: "Auditoria Técnica: Canonical, Metadados & Performance",
    description: "Correção de canonical e dados estruturados, cards Open Graph por artigo, metadados únicos e ativos servidos localmente em vez de CDNs de terceiros.",
    changes: [
      "Canonical, og:url e twitter:url agora são auto-referentes em todas as páginas — 7 páginas de topo e 27 de tag apontavam para a home, fundindo-as no índice de busca.",
      "Dados estruturados: WebSite e Person (com Scholar, ORCID, Lattes, ResearchGate, Semantic Scholar, GitHub, LinkedIn e Medium) em todas as páginas; BlogPosting e BreadcrumbList nos artigos.",
      "Cards Open Graph 1200x630 gerados por artigo (pnpm og): o og:image de cada post respondia 404.",
      "Fontes, avatar e ícones da stack passam a ser servidos localmente — Google Fonts, Gravatar e CDNs de terceiros saíram do caminho crítico.",
      "Metadados únicos por página e título/descrição dentro do limite de exibição da busca; título editorial longo é preservado no texto visível via campo seoTitle.",
      "URLs de tag normalizadas (educação e educacao eram duas páginas para o mesmo assunto), com noindex, canonical e H1 próprios.",
      "Sitemap com lastmod real por artigo, em vez da data do build carimbada em todas as URLs.",
      "Prefetch restrito aos links de navegação: o prefetch global custava uma long task de ~1,1s no carregamento.",
      "Correção de dois PDFs de publicação que respondiam 404 na página de downloads.",
      "Página 404 personalizada e transições respeitando prefers-reduced-motion.",
      "Publicação do artigo sobre o levantamento de GPUs na pesquisa acadêmica brasileira (RNP).",
    ]
  },
  {
    date: "29/07/2026",
    version: "v2.3.0",
    title: "Unificação de Ícones, View Transitions & Pesquisa",
    description: "Remoção completa do FontAwesome CDN, navegação SPA-like com transições, correção e expansão da página de publicações acadêmicas.",
    changes: [
      "Substituição do FontAwesome 6.7 (CDN blocking) por Lucide Icons nativos — migração de 7 páginas e 2 arquivos de dados, 0 referências residuais.",
      "Adição de mapeamentos de ícones faltantes no componente Icon.svelte (user, code, book, award, certificate, clock-rotate-left, magnifying-glass-chart) + SVG inline da Google.",
      "Navegação SPA-like com Astro ClientRouter e fallback animate.",
      "Link skip-to-content para navegação por teclado (acessibilidade).",
      "Texto 'fgscaglioni' na navbar sincronizado com o breakpoint do menu desktop (lg:inline).",
      "Correção da página de pesquisa: venue movido para linha própria entre ano e título.",
      "Publicações acadêmicas revisadas: títulos corrigidos conforme DOI, autorias verificadas (BJPT, LACLO, Trials), publicações removidas/adicionadas, ordenação decrescente por ano.",
      "Remoção de dependência externa (CDN FontAwesome) — ~40KB economizados no carregamento crítico.",
    ]
  },
  {
    date: "26/06/2026",
    version: "v2.2.0",
    title: "Navbar Expandida & Container Mais Largo",
    description: "Navbar agora exibe todos os 8 links de navegação, container ampliado e componente extraído para eliminar duplicação.",
    changes: [
      "Navbar expandida de 6 para 8 links — Social e Changelog agora visíveis no menu.",
      "Criação do componente NavLink, eliminando duplicação da lógica de link ativo entre desktop e mobile.",
      "Container principal aumentado de max-w-3xl para max-w-4xl (768px → 896px).",
      "Fonte dos links da navbar aumentada de text-xs para text-sm.",
      "Breakpoint do menu ajustado de sm (640px) para lg (1024px) para acomodar os 8 itens."
    ]
  },
  {
    date: "25/06/2026",
    version: "v2.1.1",
    title: "Blog Engine, Testes Automatizados & Dark Mode",
    description: "Suite de testes com Vitest, novos posts, dark mode toggle, otimizações de performance e dark theme.",
    changes: [
      "Suite de testes automatizados com Vitest — 5 suites, 77 testes, incluindo teste de build.",
      "Implementação do Dark Mode Toggle com persistência em localStorage e fallback para preferência do sistema.",
      "Navbar responsiva para mobile com menu hamburger.",
      "Novos posts: Falácias Lógicas, Perceptron, Transformers (Attention Is All You Need).",
      "Campo updated opcional no frontmatter dos posts + tags exibidas no topo dos artigos.",
      "Campo ogImage opcional para personalizar Open Graph por post.",
      "Otimizações de performance: prefetch (hover), preconnect de CDNs, preload de fontes.",
      "Refatoração: PageHeader e dados extraídos em componentes, limpeza de assets mortos.",
      "Correção: navbar destaca Journal como ativo em sub-rotas do blog.",
      "Correção: formação i9 atualizada para 2024-2026 (concluída).",
      "CI/CD: atualização das GitHub Actions e fix da versão do Node para pnpm 11."
    ]
  },
  {
    date: "26/05/2026",
    version: "v2.1.0",
    title: "Ajuste na Formação & Limpeza de Hovers",
    description: "Inclusão da titulação em Direito Público e simplificação da responsividade de interações.",
    changes: [
      "Adição da Pós-Graduação em Direito Público pela i9 (2024) no fluxo de formação acadêmica.",
      "Remoção completa de transições tridimensionais (translateY) e efeitos hover ativos para garantir um design 100% minimalista e estático."
    ]
  },
  {
    date: "26/05/2026",
    version: "v2.0.0",
    title: "Redesign Dark Glassmorphism & Novo Blog Engine",
    description: "Transição completa do layout brutalista para uma experiência premium de coluna única focada em mobile-first.",
    changes: [
      "Substituição do antigo menu lateral por uma Navbar flutuante superior no topo da página.",
      "Implementação do Blog/Journal Engine integrado ao Content Layer (Astro v5+ Collections) com carregador de arquivos markdown globais.",
      "Criação da nova seção de Pesquisa Acadêmica (/research) com indexação de artigos publicados (BJPT, CBIE).",
      "Ocultação seletiva de proficiências linguísticas (Chinês) no ambiente público em aderência com o currículo privado do Obsidian."
    ]
  },
  {
    date: "25/05/2026",
    version: "v1.2.0",
    title: "Seção de Downloads & Repositório de Artigos",
    description: "Criação da página dedicada a disponibilização de PDFs científicos e dissertações.",
    changes: [
      "Criação da rota `/downloads` para centralizar materiais e PDFs.",
      "Correção de links quebrados integrados à base de dados do PubMed."
    ]
  },
  {
    date: "24/05/2026",
    version: "v1.1.0",
    title: "Portfólio & Estilização Inicial",
    description: "Lançamento da primeira versão do portfólio interativo de projetos mobile e web.",
    changes: [
      "Criação da estrutura de dados de projetos (Lookpest, My Safe Back).",
      "Padronização visual e estilização de badges de tecnologias e stacks."
    ]
  }
];
