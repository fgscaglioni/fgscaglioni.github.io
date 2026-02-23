var projects = [
    {
        name: "Plague Buster",
        owner: "Partamon",
        stack: ['Laravel', 'Ionic', 'Postgre']
    },
    {
        name: "Cobalto",
        owner: "UFPel",
        database: 'postgre',
        stack: ['Codeigniter 3.4','PHP','JavaScript','CSS']
    }
];

/*
#### Linguagens
[![java](https://blog.geekhunter.com.br/wp-content/uploads/2020/07/pngwing.com_.png ':size=60')](https://www.java.com/)
![visualbasic](https://cursosbig.com.br/wp-content/uploads/2019/03/logo-visual-basic-net-vb.png ':size=60')
[![php](https://e7.pngegg.com/pngimages/185/655/png-clipart-logo-php-computer-icons-symbol-miscellaneous-emblem-thumbnail.png ':size=60')](https://www.php.net/)
![javascript](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHnJDLOcdm_0b6N6kNj-1OvO9KhKYgqIy0w&s ':size=60')
[![typescript](https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png ':size=60')](https://www.typescriptlang.org/)
[![python](https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/python/logo.png ':size=60')](https://www.python.org/)

#### Bancos de dados
[![mysql](https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2021-09/ECX-1909_Hero_MySQL_600x400%402x-1_0.png ':size=60')](https://www.mysql.com/)
[![oracle](https://www.nrb.be/sites/default/files/oracle.png ':size=60')](https://www.oracle.com/database/)
[![db2](https://db2tutorial.com/wp-content/uploads/2019/03/db2-tutorial.png ':size=60')](https://www.ibm.com/products/db2)
[![postgre](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png ':size=60')](https://www.postgresql.org/)
[![mongodb](https://osbsoftware.com.br/upload/produto/mongodb.png ':size=60')](https://www.mongodb.com/)
[![firestore](https://emendes.com/wp-content/uploads/2019/11/Cloud-Firestore-3-Vertical-Lockup-Light.png ':size=60')](https://firebase.google.com/docs/firestore)
[![redis](https://blog.patrickbrandao.com/wp-content/uploads/2024/11/redis-logo-512.png ':size=60')](https://redis.io/)

#### Frameworks
[![codeigniter](https://packagecontrol.io/readmes/img/dfb5fec47c7a7e44d09fb1631dfe0f41806bce27.png ':size=60')](https://www.codeigniter.com/)
[![laravel](https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/800px-Laravel.svg.png ':size=60')](https://laravel.com/)
[![ionic](https://www.wonderpush.com/wp-content/uploads/2019/09/ionic.png ':size=60')](https://ionicframework.com/)
[![angular](https://yt3.googleusercontent.com/L7fPOHO5TwVC_qz78Yo8P0MuJAB8I4FdQmOY2HSW7Z4_AFJZgAHzJCKQXo7ek1sy0pj0dIzM2Xg=s900-c-k-c0x00ffffff-no-rj ':size=60')](https://angular.dev/)
[![nestjs](https://i.namu.wiki/i/X7RPRZJiL_bDk-b5yfaeCqEaINp3iwm7ngVhzN9LDg4hNjz0Bs3QTo7pgbCfGW3xp_sQZxMGUfnxBAXGNFwGKw.svg ':size=60')](https://nestjs.com/)
[![adonisjs](https://avatars.githubusercontent.com/u/13810373?s=280&v=4 ':size=60')](https://adonisjs.com/)
[![svelte](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz1RzTzQFA_9h3qbValKOs0mjsATDkHwMOTA&s ':size=60')](https://svelte.dev/)
[![unsloth](https://avatars.githubusercontent.com/u/150920049?s=280&v=4 ':size=60')](https://unsloth.ai/)

#### Outras
[![react](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png ':size=60')](https://react.dev/)
![html](https://bognarjunior.wordpress.com/wp-content/uploads/2014/12/1417589451_html-256.png ':size=60')
![css](https://ralfvanveen.com/wp-content/uploads/2021/06/CSS-_-Begrippenlijst.svg ':size=60')
[![jquery](https://miro.medium.com/v2/resize:fit:860/0*eFomJUFua8tuqe8g.png ':size=60')](https://jquery.com/)
[![jqueryui](https://blog.dankicode.com/wp-content/uploads/2019/12/jquery-ui-650x400.png ':size=60')](https://jqueryui.com/)
*/
// #52E0D0 #ED1D7A #282A3E #FF7033 #ADFFAD
var my_stack = {
    languages: {
        color: '#52E0D0',
        title: 'Linguagens',
        data: [
            {name: 'Java', image: 'https://blog.geekhunter.com.br/wp-content/uploads/2020/07/pngwing.com_.png', url: 'https://www.java.com/'},
            {name: 'Visual Basic', image: 'https://cursosbig.com.br/wp-content/uploads/2019/03/logo-visual-basic-net-vb.png', url: ''},
            {name: 'PHP', image: 'https://e7.pngegg.com/pngimages/185/655/png-clipart-logo-php-computer-icons-symbol-miscellaneous-emblem-thumbnail.png', url: 'https://www.php.net/'},
            {name: 'JavaScript', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHnJDLOcdm_0b6N6kNj-1OvO9KhKYgqIy0w&s', url: ''},
            {name: 'TypeScript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png', url: 'https://www.typescriptlang.org/'},
            {name: 'Python', image: 'https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/python/logo.png', url: 'https://www.python.org/'}
        ]   
    },
    databases: {
        color: '#ED1D7A',
        title: 'Bancos de Dados',
        data: [
            {name: 'PostgreSQL', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png', url: 'https://www.postgresql.org/'},
            {name: 'MySQL', image: 'https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2021-09/ECX-1909_Hero_MySQL_600x400%402x-1_0.png', url: 'https://www.mysql.com/'},
            {name: 'SQLite', image: 'https://www.sqlite.org/images/sqlite370_banner.gif', url: 'https://www.sqlite.org/'},
            {name: 'MongoDB', image: 'https://osbsoftware.com.br/upload/produto/mongodb.png', url: 'https://www.mongodb.com/'},
            {name: 'Redis', image: 'https://blog.patrickbrandao.com/wp-content/uploads/2024/11/redis-logo-512.png', url: 'https://redis.io/'},
            {name: 'Firestore', image: 'https://emendes.com/wp-content/uploads/2019/11/Cloud-Firestore-3-Vertical-Lockup-Light.png', url: 'https://firebase.google.com/docs/firestore'},
            {name: 'Oracle', image: 'https://www.nrb.be/sites/default/files/oracle.png', url: 'https://www.oracle.com/database/'},
            {name: 'DB2', image: 'https://db2tutorial.com/wp-content/uploads/2019/03/db2-tutorial.png', url: 'https://www.ibm.com/products/db2'},
            {name: 'CouchDB', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3k_HM83Nitkf5EU-Weks9s0i29-prBQTC8Q&s', url: 'https://couchdb.apache.org/'},
        ]
    },
    frameworks: {
        color: '#282A3E',
        title: 'Frameworks',
        data: [
            {name: 'Laravel', image: 'https://laravel.com/img/logotype.min.svg', url: 'https://laravel.com/'},
            {name: 'CodeIgniter', image: 'https://packagecontrol.io/readmes/img/dfb5fec47c7a7e44d09fb1631dfe0f41806bce27.png', url: 'https://www.codeigniter.com/'},
            {name: 'Ionic', image: 'https://www.wonderpush.com/wp-content/uploads/2019/09/ionic.png', url: 'https://ionicframework.com/'},
            {name: 'Angular', image: 'https://angular.io/assets/images/logos/angular/angular.svg', url: 'https://angular.dev/'},
            {name: 'NestJS', image: 'https://nestjs.com/img/logo-small.svg', url: 'https://nestjs.com/'},
            {name: 'AdonisJS', image: 'https://avatars.githubusercontent.com/u/13810373?s=280&v=4', url: 'https://adonisjs.com/'},
            {name: 'Svelte', image: 'https://svelte.dev/svelte-logo-horizontal.svg', url: 'https://svelte.dev/'},
            {name: 'Unsloth', image: 'https://avatars.githubusercontent.com/u/150920049?s=280&v=4', url: 'https://unsloth.ai/'}
        ]
    },
    others: {
        color: '#FF7033',
        title: 'Outras Tecnologias',
        data: [
            {name: 'React', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png', url: 'https://react.dev/'},
            {name: 'HTML', image: 'https://bognarjunior.wordpress.com/wp-content/uploads/2014/12/1417589451_html-256.png', url: ''},
            {name: 'CSS', image: 'https://ralfvanveen.com/wp-content/uploads/2021/06/CSS-_-Begrippenlijst.svg', url: ''},
            {name: 'jQuery', image: 'https://miro.medium.com/v2/resize:fit:860/0*eFomJUFua8tuqe8g.png', url: 'https://jquery.com/'},
            {name: 'jQuery UI', image: 'https://blog.dankicode.com/wp-content/uploads/2019/12/jquery-ui-650x400.png', url: 'https://jqueryui.com/'},
            {name: 'Apache Cordova', image: 'https://cordova.apache.org/static/img/cordova_bot.png', url: 'https://cordova.apache.org/'},
            {name: 'Android', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDHvnyoyWI-FlgTfOWRoJjazD3ke1Q6hOgfQ&s', url: 'https://www.android.com/intl/pt_br/'},
            {name: 'n8n', image: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/n8n-color.png', url: 'https://n8n.io/'},
            {name: 'Coolify', image: 'https://docs.hetzner.com/static/1dbc8e5220638f7193ef9f5a24c2eb5b/0b533/coolify-logo.png', url: 'https://coolify.io/'},
            {name: 'Easypanel', image: 'https://avatars.githubusercontent.com/u/97469292?s=200&v=4', url: 'https://easypanel.io/'},
            {name: 'Firebase', image: 'https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png?hl=pt-br', url: 'https://firebase.google.com/'},
            {name: 'Docker', image: 'https://raw.githubusercontent.com/collabnix/dockerlabs/master/beginners/docker/images/docker_facebook_share.png', url: 'https://www.docker.com/'},
            {name: 'Docsify', image: 'https://images.opencollective.com/docsify/5916949/logo/256.png', url: 'https://docsify.js.org/'},
            // {name: '', image: '', url: ''},
        ]
    },
    methodologies: {
        color: '#02040F',
        title: 'Metodologias',
        data: [
            {name: 'Scrum', image: 'https://www.scrum.org/sites/default/files/scrum-org-logo.png', url: 'https://www.scrum.org/'},
            {name: 'Kanban', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kanban_logo.svg/1200px-Kanban_logo.svg.png', url: 'https://kanbanize.com/kanban-resources/getting-started/what-is-kanban/'},
            {name: 'Lean', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lean_Enterprise_Institute_logo.svg/1200px-Lean_Enterprise_Institute_logo.svg.png', url: 'https://www.lean.org/'}
        ]
    },
    version_controllers: {
        color: '#ADFFAD',
        title: 'Controle de Versão',
        data: [
            {name: 'Github', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/250px-GitHub_Invertocat_Logo.svg.png', url: 'https://github.com/'},
            {name: 'Gitlab', image: 'https://yt3.googleusercontent.com/Zfx2OSI5XWKhnove-HwdTokQUmCB7cfpX0uGbqxMeQVNMzVPrvgMadFHpbfYoy04NrjFEBk_3A=s900-c-k-c0x00ffffff-no-rj', url: 'https://about.gitlab.com/'},
            {name: 'Bitbucket', image: 'https://images.prismic.io/guardrails-01/c7345dce-8605-4c3e-81e8-30a711d17e89_bitbucket.png?auto=compress,format', url: 'https://bitbucket.org/product/'},
        ]
    }
}

// var my_stack = {
//   "technologies": [
//     {
//       "type": "Language",
//       "color": "#52E0D0",
//       "items": [
//         {"name": "Java", "url": "https://www.java.com/", "image": "https://blog.geekhunter.com.br/wp-content/uploads/2020/07/pngwing.com_.png"},
//         {"name": "Visual Basic", "url": null, "image": "https://cursosbig.com.br/wp-content/uploads/2019/03/logo-visual-basic-net-vb.png"},
//         {"name": "PHP", "url": "https://www.php.net/", "image": "https://e7.pngegg.com/pngimages/185/655/png-clipart-logo-php-computer-icons-symbol-miscellaneous-emblem-thumbnail.png"},
//         {"name": "JavaScript", "url": null, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHnJDLOcdm_0b6N6kNj-1OvO9KhKYgqIy0w&s"},
//         {"name": "TypeScript", "url": "https://www.typescriptlang.org/", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1200px-Typescript.svg.png"},
//         {"name": "Python", "url": "https://www.python.org/", "image": "https://raw.githubusercontent.com/docker-library/docs/01c12653951b2fe592c1f93a13b4e289ada0e3a1/python/logo.png"},
//         {"name": "HTML", "url": null, "image": "https://bognarjunior.wordpress.com/wp-content/uploads/2014/12/1417589451_html-256.png"},
//         {"name": "CSS", "url": null, "image": "https://ralfvanveen.com/wp-content/uploads/2021/06/CSS-_-Begrippenlijst.svg"}
//       ]
//     },
//     {
//       "type": "Database",
//       "color": "#ED1D7A",
//       "items": [
//         {"name": "PostgreSQL", "url": "https://www.postgresql.org/", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png"},
//         {"name": "MySQL", "url": "https://www.mysql.com/", "image": "https://www.ovhcloud.com/sites/default/files/styles/large_screens_1x/public/2021-09/ECX-1909_Hero_MySQL_600x400%402x-1_0.png"},
//         {"name": "SQLite", "url": "https://www.sqlite.org/", "image": "https://www.sqlite.org/images/sqlite370_banner.gif"},
//         {"name": "MongoDB", "url": "https://www.mongodb.com/", "image": "https://osbsoftware.com.br/upload/produto/mongodb.png"},
//         {"name": "Redis", "url": "https://redis.io/", "image": "https://blog.patrickbrandao.com/wp-content/uploads/2024/11/redis-logo-512.png"},
//         {"name": "Firestore", "url": "https://firebase.google.com/docs/firestore", "image": "https://emendes.com/wp-content/uploads/2019/11/Cloud-Firestore-3-Vertical-Lockup-Light.png"},
//         {"name": "Oracle", "url": "https://www.oracle.com/database/", "image": "https://www.nrb.be/sites/default/files/oracle.png"},
//         {"name": "DB2", "url": "https://www.ibm.com/products/db2", "image": "https://db2tutorial.com/wp-content/uploads/2019/03/db2-tutorial.png"},
//         {"name": "CouchDB", "url": "https://couchdb.apache.org/", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3k_HM83Nitkf5EU-Weks9s0i29-prBQTC8Q&s"}
//       ]
//     },
//     {
//       "type": "Framework",
//       "color": "#282A3E",
//       "items": [
//         {"name": "Laravel", "url": "https://laravel.com/", "image": "https://laravel.com/img/logotype.min.svg"},
//         {"name": "CodeIgniter", "url": "https://www.codeigniter.com/", "image": "https://packagecontrol.io/readmes/img/dfb5fec47c7a7e44d09fb1631dfe0f41806bce27.png"},
//         {"name": "Ionic", "url": "https://ionicframework.com/", "image": "https://www.wonderpush.com/wp-content/uploads/2019/09/ionic.png"},
//         {"name": "Angular", "url": "https://angular.dev/", "image": "https://angular.io/assets/images/logos/angular/angular.svg"},
//         {"name": "NestJS", "url": "https://nestjs.com/", "image": "https://nestjs.com/img/logo-small.svg"},
//         {"name": "AdonisJS", "url": "https://adonisjs.com/", "image": "https://avatars.githubusercontent.com/u/13810373?s=280&v=4"},
//         {"name": "Svelte", "url": "https://svelte.dev/", "image": "https://svelte.dev/svelte-logo-horizontal.svg"},
//         {"name": "Unsloth", "url": "https://unsloth.ai/", "image": "https://avatars.githubusercontent.com/u/150920049?s=280&v=4"}
//       ]
//     },
//     {
//       "type": "Frontend Libraries",
//       "color": "#4285F4",
//       "items": [
//         {"name": "React", "url": "https://react.dev/", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/640px-React-icon.svg.png"},
//         {"name": "jQuery", "url": "https://jquery.com/", "image": "https://miro.medium.com/v2/resize:fit:860/0*eFomJUFua8tuqe8g.png"},
//         {"name": "jQuery UI", "url": "https://jqueryui.com/", "image": "https://blog.dankicode.com/wp-content/uploads/2019/12/jquery-ui-650x400.png"}
//       ]
//     },
//     {
//       "type": "Mobile/Web Hybrid Frameworks",
//       "color": "#FFAA99",
//       "items": [
//         {"name": "Apache Cordova", "url": "https://cordova.apache.org/", "image": "https://cordova.apache.org/static/img/cordova_bot.png"},
//         {"name": "Android", "url": "https://www.android.com/intl/pt_br/", "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDHvnyoyWI-FlgTfOWRoJjazD3ke1Q6hOgfQ&s"}
//       ]
//     },
//     {
//       "type": "DevOps",
//       "color": "#FF7033",
//       "items": [
//         {"name": "Docker", "url": "https://www.docker.com/", "image": "https://raw.githubusercontent.com/collabnix/dockerlabs/master/beginners/docker/images/docker_facebook_share.png"},
//         {"name": "Coolify", "url": "https://coolify.io/", "image": "https://docs.hetzner.com/static/1dbc8e5220638f7193ef9f5a24c2eb5b/0b533/coolify-logo.png"},
//         {"name": "Easypanel", "url": "https://easypanel.io/", "image": "https://avatars.githubusercontent.com/u/97469292?s=200&v=4"}
//       ]
//     },
//     {
//       "type": "Automation",
//       "color": "#00C897",
//       "items": [
//         {"name": "n8n", "url": "https://n8n.io/", "image": "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/n8n-color.png"}
//       ]
//     },
//     {
//       "type": "Documentation",
//       "color": "#A889FF",
//       "items": [
//         {"name": "Docsify", "url": "https://docsify.js.org/", "image": "https://images.opencollective.com/docsify/5916949/logo/256.png"}
//       ]
//     },
//     {
//       "type": "Platform (BaaS)",
//       "color": "#FBC02D",
//       "items": [
//         {"name": "Firebase", "url": "https://firebase.google.com/", "image": "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png?hl=pt-br"}
//       ]
//     },
//     {
//       "type": "Version Control",
//       "color": "#ADFFAD",
//       "items": [
//         {"name": "Github", "url": "https://github.com/", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/250px-GitHub_Invertocat_Logo.svg.png"},
//         {"name": "Gitlab", "url": "https://about.gitlab.com/", "image": "https://yt3.googleusercontent.com/Zfx2OSI5XWKhnove-HwdTokQUmCB7cfpX0uGbqxMeQVNMzVPrvgMadFHpbfYoy04NrjFEBk_3A=s900-c-k-c0x00ffffff-no-rj"},
//         {"name": "Bitbucket", "url": "https://bitbucket.org/product/", "image": "https://images.prismic.io/guardrails-01/c7345dce-8605-4c3e-81e8-30a711d17e89_bitbucket.png?auto=compress,format"}
//       ]
//     },
//     {
//       "type": "Methodology",
//       "color": "#02040F",
//       "items": [
//         {"name": "Scrum", "url": "https://www.scrum.org/", "image": "https://www.scrum.org/sites/default/files/scrum-org-logo.png"},
//         {"name": "Kanban", "url": "https://kanbanize.com/kanban-resources/getting-started/what-is-kanban/", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Kanban_logo.svg/1200px-Kanban_logo.svg.png"},
//         {"name": "Lean", "url": "https://www.lean.org/", "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lean_Enterprise_Institute_logo.svg/1200px-Lean_Enterprise_Institute_logo.svg.png"}
//       ]
//     }
//   ]
// }