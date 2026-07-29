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
    title: "Effectiveness of an app-delivered, self-management exercise program in public safety workers with chronic low back pain: a randomized controlled trial",
    authors: "Marins, E. F., Primo, T. T., Vasconcelos, B. B., Carvalho, M. T. X., Oppelt, L. L., Pinheiro, V. H. G., Scaglioni, F. G., et al.",
    venue: "Brazilian Journal of Physical Therapy (BJPT)",
    year: "2025",
    doi: "https://doi.org/10.1016/j.bjpt.2025.101232",
    abstract: "Investiga a eficácia de uma intervenção de saúde móvel (m-health) no tratamento de trabalhadores da segurança pública com dor lombar crônica. O aplicativo desenvolvido (My Safe Back) serviu como suporte clínico para o protocolo de exercícios e educação em dor estruturado."
  },
  {
    title: "Enrollment Recommendation System based on Student Profile and Progress",
    authors: "Scaglioni, F., Aguiar, M., and Mattos, J. C. B.",
    venue: "2022 XVII Latin American Conference on Learning Technologies (LACLO)",
    year: "2023",
    doi: "https://doi.org/10.1109/LACLO56648.2022.10013424",
    abstract: "Sistema de recomendação de matrículas baseado no perfil e progresso do estudante, utilizando técnicas de inteligência artificial para sugerir disciplinas alinhadas ao histórico acadêmico, ritmo de aprendizado e trajetória curricular no contexto de Campus Inteligente."
  },
  {
    title: "Effectiveness of m-health-based core strengthening exercise and health education for public safety workers with chronic non-specific low back pain: study protocol for a superiority randomized controlled trial (SAFEBACK)",
    authors: "Marins, E. F., Caputo, E. L., Krüger, V. L., Junior, D. M., Scaglioni, F. G., Del Vecchio, F. B., Primo, T. T., and Alberton, C. L.",
    venue: "Trials",
    year: "2023",
    doi: "https://doi.org/10.1186/s13063-023-07833-9",
    abstract: "Protocolo de ensaio clínico randomizado controlado que investiga a efetividade de um programa de exercícios de fortalecimento do core baseado em m-health combinado com educação em saúde, comparado à educação em saúde isolada, em trabalhadores da segurança pública com dor lombar crônica inespecífica."
  },
  {
    title: "Plataforma de Interação Digital no Contexto de Campus Inteligente",
    authors: "Scaglioni, F. G., Aguiar, M., and Mattos, J. C. B.",
    venue: "Anais do XXII Encontro de Pós-Graduação (ENPOS)",
    year: "2020",
    doi: "https://anais-siiepe.ufpel.edu.br/2020/CE_03692.pdf",
    abstract: "Este trabalho propõe uma plataforma de interação digital baseada no conceito de Campus Inteligente para otimizar o atendimento à comunidade acadêmica da UFPel. A solução utiliza recursos de Inteligência Artificial e Processamento de Linguagem Natural (PLN), como chatbots e assistentes virtuais, para fornecer serviços escaláveis e modulares, incluindo recomendações de matrícula e consultas frequentes (FAQ), visando melhorar a eficiência dos processos acadêmicos e a experiência do usuário institucional."
  },
  // {
  //   title: "Evaluating SLMs for Predicting Tabular Data: An Essay on Higher Education Dropout",
  //   authors: "N. F., Fabrício, et al.",
  //   venue: "XXXVII Simpósio Brasileiro de Informática na Educação (SBIE 2026)",
  //   year: "2026",
  //   doi: "https://jems3.sbc.org.br/submissions/27434",
  //   abstract: "Avaliação de Small Language Models (SLMs) na predição de dados tabulares aplicados à evasão no ensino superior. O ensaio investiga a eficácia de modelos de linguagem compactos como alternativa a abordagens clássicas de ML em cenários educacionais com recursos computacionais limitados."
  // },
];
