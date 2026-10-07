export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: string;
  doi?: string;
  /** Link de acesso alternativo: repositório institucional, anais. Aparece também quando há DOI. */
  url?: string;
  /** Rótulo do link de `url`. Padrão: "Acessar Publicação no Repositório". */
  urlLabel?: string;
  pdfUrl?: string;
  abstract: string;
}

export const publications: Publication[] = [
  {
    title: "Evaluating SLMs for Predicting Tabular Data: An Essay on Higher Education Dropout",
    authors: "Scaglioni, F. G., Aguiar, M., and Mattos, J. C. B.",
    venue: "XXXVII Simpósio Brasileiro de Informática na Educação (SBIE 2026)",
    year: "2026",
    doi: "https://doi.org/10.5753/sbie.2026.27434",
    url: "https://sol.sbc.org.br/index.php/sbie/article/view/45670",
    urlLabel: "Acessar nos Anais da SBC (SOL)",
    abstract: "Avalia Small Language Models (SLMs) de 7 a 14 bilhões de parâmetros, ajustados por Parameter-Efficient Fine-Tuning (PEFT), na predição de evasão no ensino superior, em comparação com modelos especializados em dados tabulares. Com um conjunto de 6.011 registros da UFPel, foram testadas três representações dos dados (numérica, discretizada e narrativa) inferidas pelos modelos Phi-4, Qwen2.5-7B e Mitra. O modelo tabular especializado superou os modelos de linguagem (80,30% de acurácia e F1 de 0,8203, contra 72,07% e 0,7176 do melhor SLM), e as representações narrativas não trouxeram ganho preditivo: sob restrição computacional, classificadores baseados em árvores e modelos tabulares seguem sendo a arquitetura mais eficaz."
  },
  {
    title: "Commit2GemPress: Automatização da Comunicação de Engenharia de Software para a Comunidade Acadêmica via Large Language Models",
    authors: "Scaglioni, F. G., Noguez, J. H. S., Ávila, C. M. O., and Roque, P. T. N. M.",
    venue: "Workshop de Tecnologia de Informação e Comunicação das Instituições Federais de Ensino Superior do Brasil (WTICIFES 2026)",
    year: "2026",
    url: "https://repositorio.wticifes.com.br/items/f099b0be-692d-47b3-bc04-78604818dda7",
    abstract: "Apresenta o Commit2GemPress, ferramenta que integra a API do GitLab, o modelo Gemini 2.0 Flash e o WordPress para converter mensagens de commits em publicações acessíveis a públicos não-técnicos. O estudo de caso indica que o uso de LLMs reduz silos de comunicação e amplia a transparência institucional sem onerar o fluxo de trabalho dos desenvolvedores."
  },
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
];
