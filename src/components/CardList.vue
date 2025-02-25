<script setup>
// import { HollowDotsSpinner } from 'epic-spinners'
import { inject } from 'vue'
import CardItem from './CardItem.vue'
import CardSkeleton from './CardSkeleton.vue'

const props = defineProps({
	cards: String,
})

const items = inject(`${props.cards}`)
const state = inject('state')
</script>

<template>
	<ul v-if="state.loadingItems" class="card-list" v-auto-animate>
		<CardSkeleton v-for="n in 12" :key="n" />
	</ul>
	<ul v-else class="card-list" v-auto-animate>
		<CardItem
			class="card-list__item"
			v-for="item in items"
			:key="item.id"
			:id="item.id"
			:title="item.title"
			:price="item.price"
			:image-url="'.' + item.imageUrl"
		/>
	</ul>
</template>

<style lang="scss" scoped>
.card-list {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
	grid-auto-rows: 1fr;
	gap: 40px;
	// align-items: center;
	justify-items: center;
	&__item {
		max-width: 270px;
		// margin: 0 auto;
	}
	&__message {
		width: 100%;
		font-family: Inter;
		font-size: 30px;
		grid-column: span 4;
	}
}
</style>
