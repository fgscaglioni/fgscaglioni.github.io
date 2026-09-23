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
