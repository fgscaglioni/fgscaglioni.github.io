# @fgscaglioni

> Olá, meu nome é **Fabrício Scaglioni**. Vamos conversar?

[<i class="fa-brands fa-github"></i> Github](http://github.com/fgscaglioni/) · [<i class="fa-brands fa-medium"></i> Medium](https://medium.com/@fgscaglioni) · [<i class="fa-brands fa-linkedin"></i> Linkedin](https://www.linkedin.com/in/fgscaglioni/) · [<i class="fa-brands fa-x"></i> (Antigo Twitter)](https://x.com/fgscaglioni) · [<i class="fa-brands fa-instagram"></i> Instagram](https://www.instagram.com/fgscaglioni)


## O que eu faço?

Sou desenvolvedor de sistemas desde 2007, já tenho bastante experiencia na área. Gsoto de novos desafios, atualmente estou cursando o **Doutorado em Computação** na Universidade Federal de Pelotas (UFPel), trabalhando com automações e **Inteligencia Artificial**.

### Alguns jobs em que trabalhei


<!-- Slider main container -->
<div id="swiper" class="swiper" style="width: 600px; height: 600px;">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
    <!-- Slides -->
    <div class="swiper-slide">
		<h4>Adesão Faz Bem</h4>
		<img src="https://hox-site-files.s3.sa-east-1.amazonaws.com/Frame_342_a6179de646.png" width="600" />
		<p>Neste projeto o trabalho foi realizar a criação de novas features, além de corrigir alguns problemas e instabilidades do App.</p>
	</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <!-- <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div> -->

  <!-- If we need scrollbar -->
  <!-- <div class="swiper-scrollbar"></div> -->
</div>



## Como faço?

Ao longo do tempo, trabalhei com diferentes tecnologias no desenvolvimento de aplicações. A seguir, relaciono as que me recordo ter usado — seja em projetos passados ou ainda em andamento.

<div id="proglang" style="display: flex; flex-direction: row; flex-wrap: wrap; ">
	<div v-for="item in myStack" :style="{ backgroundColor: item.color }" :key="item.name" style="padding:6px; display:flex; justify-content: center; align-items: center;">
		<a :href="item.url"><image :src="item.image" width="60"></a>
	</div>
</div>
<script>
	new Vue({
		el: '#proglang',
		data: () => ({
			myStack: []
		}),
		mounted() {
			const shuffle = (array) => {
				let currentIndex = array.length;
				while (currentIndex != 0) {
					let randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex--;
					[array[currentIndex], array[randomIndex]] = [
					array[randomIndex], array[currentIndex]];
				}
			}
			const myStack = [
				...my_stack.languages.data.map(item => { return {...item, color: my_stack.languages.color}}),
				...my_stack.databases.data.map(item => { return {...item, color: my_stack.databases.color}}),
				...my_stack.frameworks.data.map(item => { return {...item, color: my_stack.frameworks.color}}),
				...my_stack.others.data.map(item => { return {...item, color: my_stack.others.color}}),
				...my_stack.version_controllers.data.map(item => { return {...item, color: my_stack.version_controllers.color}}),
			];
			// shuffle(myStack);
			this.myStack = myStack
		}
	})
	new Vue({
		el: '#swiper',
		data: () => ({
			projects: []
		}),
		mounted() {
			this.projects = projects
			const swiper = new Swiper('.swiper', {
				autoplay: {
					delay: 5000,
					pauseOnMouseEnter: true,
				},
				// Optional parameters
				direction: 'horizontal',
				loop: true,
				// If we need pagination
				pagination: {
					el: '.swiper-pagination',
				},
				// Navigation arrows
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				// And if we need scrollbar
				scrollbar: {
					el: '.swiper-scrollbar',
				},
			});
		}
	})
</script>


## Experiência
- **Analista de TI** - [Universidade Federal de Pelotas](https://ufpel.edu.br/) (11/2008 - Atualmente)
	- *Skills*: CodeIgniter, CSS, DB2, Docker, Gitlab, HTML, JavaScript, Laravel, MongoDB, NestJS, PHP, PostgreSQL, Redis, UML
- **CTO/Software Engenir/DevOps** - [Vasquez Advogados](https://vasquezadvogados.com.br/) (2022 - Atualmente)
	- Skills: n8n, Groq, Easypanel
- **Backend Developer** - [HOX](https://hox.rs/) (Mai/2022 - Abr/2023)
	- *Skills*: Laravel, PostgreSQL, React, Gitlab, Docker
- **App Developer** - [Partamon](https://partamon.com/) (Dez/2014 - Dez/2019)
	- *Skills*: Laravel, PHP, Android, Ionic, Gitlab, Docker
- **Backend Developer** - [Santa Transmedia](https://santatransmedia.com/) (Fev/2015 - Nov/2017)
	- *Skills*: Gitlab, Docker
- **Desenvolvedor** - [VOIZA](https://www.voiza.com.br/) (Jul/2006 - Nov/2008)
	- *Skills*: Visual Basic, Oracle, PostgreSQL, UML, Subversion SVN

## Formação acadêmica
- **[UFPel](https://institucional.ufpel.edu.br/cursos/cod/8102)** - Doutorado em Ciência da Computação (2024-Cursando)
- **[UFPel](https://institucional.ufpel.edu.br/cursos/cod/7057)** - Mestrado em Ciência da Computação (2019-2021)
- **[UniSenac](https://www.senacrs.com.br/unidade/78)** - Especialização em Gerenciamento de Projetos (2009-2010)
- **[UniSenac](https://www.senacrs.com.br/unidade/78)** - Tecnólogo em Analise e desenvolvimento de Sistemas (2005-2007)

## Idiomas
- **Português** - Nativo
- **Inglês** - Intermediário
- **Espanhol** - Intermediário
- **Francês** - Básico





