// Ícones servidos localmente (antes: hotlink para laravel.com/nestjs.com/pngegg/jsdelivr/raw.githubusercontent,
// que custava DNS/TLS de terceiros e trazia cookie __cf_bm do laravel.com).
export const my_stack = [
    { name: 'Python', image: '/logos/python.svg', url: 'https://www.python.org/' },
    { name: 'PHP', image: '/logos/php.svg', url: 'https://www.php.net/' },
    { name: 'TypeScript', image: '/logos/typescript.svg', url: 'https://www.typescriptlang.org/' },
    { name: 'PostgreSQL', image: '/logos/postgresql.svg', url: 'https://www.postgresql.org/' },
    { name: 'Laravel', image: '/logos/laravel.svg', url: 'https://laravel.com/' },
    { name: 'NestJS', image: '/logos/nestjs.svg', url: 'https://nestjs.com/' },
    { name: 'Svelte', image: '/logos/svelte.svg', url: 'https://svelte.dev/' },
    { name: 'Docker', image: '/logos/docker.svg', url: 'https://www.docker.com/' },
];

export const siteLinks = {
    main: [
        { href: "/", label: "Início", icon: "house" },
        { href: "/research", label: "Pesquisa", icon: "microscope" },
        { href: "/blog", label: "Journal", icon: "feather" },
        { href: "/downloads", label: "Downloads", icon: "download", newTab: false },
        { href: "/experience", label: "Experiência", icon: "briefcase" },
        { href: "/portfolio", label: "Portfólio", icon: "folder-open" },
        { href: "/changelog", label: "Modificações", icon: "history" },
        { href: "/social", label: "Social", icon: "hash" },
    ],
    external: [
        { href: "https://medium.com/@fgscaglioni", label: "Posts", icon: "medium", newTab: true }
    ]
};
