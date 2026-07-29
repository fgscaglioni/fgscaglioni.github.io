export const my_stack = [
    { name: 'Python', image: 'https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/python/logo.png', url: 'https://www.python.org/' },
    { name: 'PHP', image: 'https://e7.pngegg.com/pngimages/185/655/png-clipart-logo-php-computer-icons-symbol-miscellaneous-emblem-thumbnail.png', url: 'https://www.php.net/' },
    { name: 'TypeScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', url: 'https://www.typescriptlang.org/' },
    { name: 'PostgreSQL', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', url: 'https://www.postgresql.org/' },
    { name: 'Laravel', image: 'https://laravel.com/img/logotype.min.svg', url: 'https://laravel.com/' },
    { name: 'NestJS', image: 'https://nestjs.com/img/logo-small.svg', url: 'https://nestjs.com/' },
    { name: 'Svelte', image: 'https://svelte.dev/svelte-logo-horizontal.svg', url: 'https://svelte.dev/' },
    { name: 'Docker', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', url: 'https://www.docker.com/' },
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
