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
        { href: "/downloads", label: "Downloads", icon: "download", newTab: false },
        { href: "/experience", label: "Experiência", icon: "briefcase" },
        { href: "/portfolio", label: "Portfólio", icon: "folder-open" },
        { href: "/social", label: "Social", icon: "hash" },
    ],
    external: [
        { href: "https://medium.com/@fgscaglioni", label: "Posts", icon: "medium", newTab: true }
    ]
};
