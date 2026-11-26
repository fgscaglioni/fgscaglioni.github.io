// Stack como dado puro: o site renderiza nome e link. Logo de tecnologia
// envelhece em dois anos e nao carrega informacao que o nome nao carregue.
export const my_stack = [
    { name: 'Python', url: 'https://www.python.org/' },
    { name: 'PHP', url: 'https://www.php.net/' },
    { name: 'TypeScript', url: 'https://www.typescriptlang.org/' },
    { name: 'PostgreSQL', url: 'https://www.postgresql.org/' },
    { name: 'Laravel', url: 'https://laravel.com/' },
    { name: 'NestJS', url: 'https://nestjs.com/' },
    { name: 'Svelte', url: 'https://svelte.dev/' },
    { name: 'Docker', url: 'https://www.docker.com/' },
];

export const siteLinks = {
    main: [
        { href: "/", label: "Início", icon: "house" },
        { href: "/research", label: "Pesquisa", icon: "microscope" },
        { href: "/blog", label: "Journal", icon: "feather" },
        { href: "/experience", label: "Experiência", icon: "briefcase" },
        { href: "/portfolio", label: "Portfólio", icon: "folder-open" },
        { href: "/social", label: "Social", icon: "hash" },
    ],
    external: [
        { href: "https://medium.com/@fgscaglioni", label: "Posts", icon: "medium", newTab: true }
    ]
};

/**
 * Perfis sociais e acadêmicos: fonte única. A página /social renderiza estes
 * arrays e o JSON-LD (sameAs) do BaseLayout deriva as URLs daqui — antes cada
 * URL vivia digitada em dois lugares e divergia em silêncio.
 */
export const socialLinks = [
    { name: "GitHub", url: "https://github.com/fgscaglioni/", icon: "github" },
    { name: "Medium", url: "https://medium.com/@fgscaglioni", icon: "medium" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/fgscaglioni/", icon: "linkedin" },
    { name: "X (Twitter)", url: "https://x.com/fgscaglioni", icon: "x-twitter" },
    { name: "Instagram", url: "https://www.instagram.com/fgscaglioni", icon: "instagram" },
];

export const academicLinks = [
    { name: "Google Scholar", url: "https://scholar.google.com/citations?user=fZEKGvUAAAAJ", icon: "google", desc: "Publicações e citações acadêmicas" },
    { name: "Lattes", url: "https://lattes.cnpq.br/0870115674210417", icon: "id-card", desc: "Currículo Lattes CNPq" },
    { name: "Orcid", url: "https://orcid.org/0000-0002-9749-2077", icon: "id-badge", desc: "Identificador de pesquisador" },
    { name: "Kaggle", url: "https://www.kaggle.com/fgscaglioni", icon: "k", desc: "Competições e notebooks de ML" },
    { name: "ResearchGate", url: "https://www.researchgate.net/profile/Fabricio-Scaglioni", icon: "r", desc: "Rede de colaboração científica" },
    { name: "Parsifal", url: "https://parsif.al/fgscaglioni/", icon: "magnifying-glass-chart", desc: "Revisões sistemáticas da literatura" },
    { name: "Semantic Scholar", url: "https://www.semanticscholar.org/author/2202206947", icon: "graduation-cap", desc: "Pesquisa acadêmica com IA" },
    { name: "ResearchId", url: "https://researchid.co/fgscaglioni", icon: "fingerprint", desc: "Perfil unificado de pesquisador" },
];
