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
<script>
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