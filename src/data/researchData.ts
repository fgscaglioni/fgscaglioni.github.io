export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  doi?: string;
  pdfUrl?: string;
  abstract: string;
}

export const publications: Publication[] = [
  {
    title: "My Safe Back: A Mobile Health Intervention for Chronic Low Back Pain in Public Safety Workers",
    authors: "Scaglioni, F. G., et al.",
    venue: "Brazilian Journal of Physical Therapy (BJPT)",
    year: "2025",
    doi: "https://doi.org/10.1016/j.bjpt.2025.101232",
    abstract: "Investiga a eficácia de uma intervenção de saúde móvel (m-health) no tratamento de trabalhadores da segurança pública com dor lombar crônica. O aplicativo desenvolvido (My Safe Back) serviu como suporte clínico para o protocolo de exercícios e educação em dor estruturado."
  },
  {
    title: "Sistemas Inteligentes de Recomendação na Educação: Uma Revisão Sistemática",
    authors: "Scaglioni, F. G., et al.",
    venue: "Congresso Brasileiro de Informática na Educação (CBIE)",
    year: "2021",
    doi: "https://doi.org/10.5753/cbie.sbc.2021",
    abstract: "Revisão sistemática de literatura abordando o estado da arte das técnicas de filtragem colaborativa, baseada em conteúdo e inteligência artificial aplicadas à recomendação personalizada de objetos de aprendizagem no ensino superior."
  }
];
