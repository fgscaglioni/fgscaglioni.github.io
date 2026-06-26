export interface ChangeLogEntry {
  date: string;
  version: string;
  title: string;
  description: string;
  changes: string[];
}

export const changelogData: ChangeLogEntry[] = [
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
