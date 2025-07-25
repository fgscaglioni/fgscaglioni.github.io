<div id="stack">
	<div class="flex flex-wrap flex-row justify-start rounded-[10px] overflow-hidden">
		<template v-for="tech in myStack.technologies">
			<template v-for="item in tech.items">
				<div :style="{ backgroundColor: tech.color }" class="flex items-center p-2 w-1/4 sm:w-1/6 md:w-1/8 lg:w-1/12">
					<a :href="item.url"><image :src="item.image" width="60" /></a>
				</div>
			</template>
		</template>
	</div>
	<div class="rounded-[10px] overflow-hidden mt-4 text-white">
		<span v-for="item in myStack.technologies" :key="item.name" :style="{ backgroundColor: item.color }" class="p-1 text-xs grow">
			{{item.type}}
		</span>
	</div>
</div>
<script>
	new Vue({
		el: '#stack',
		data: () => ({
			myStack: []
		}),
		async mounted() {
			console.log('Mounted stack component');
			try {
				const response = await fetch('assets/stack.json');
				if (!response.ok) {
					throw new Error(`Erro HTTP: ${response.status}`);
				}
				const data = await response.json();
				
				console.log(data);
				this.myStack = data;
			} catch (error) {
				console.error('Erro ao carregar o JSON:', error);
			}
		}
	})
</script>