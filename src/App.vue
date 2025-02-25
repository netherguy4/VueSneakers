<script setup>
import { onMounted, ref, reactive, watch, provide, computed } from 'vue'
import axios from 'axios'
import { useStorage } from '@vueuse/core'
import { useToast } from 'vue-toastification'

import AppHeader from './components/AppHeader.vue'
import AppDrawer from './components/AppDrawer.vue'

const drawerOpened = ref(false)
const items = ref([])
const favorites = ref([])
const cart = useStorage('cart', [])
const state = reactive({
	loadingItems: null,
	loadedImages: false,
	loadingOrders: null,
})
const filter = reactive({
	sortBy: '',
	search: null,
})
const likedIds = computed(() => {
	return new Set(favorites.value.map((item) => item.id))
})
const cartIds = computed(() => {
	return new Set(cart.value.map((item) => item.id))
})
const summ = computed(() => {
	return cart.value.reduce((acc, value) => acc + value.price, 0)
})
const toast = useToast()

provide('toast', toast)
provide('likedIds', likedIds)
provide('cartIds', cartIds)
provide('filter', filter)
provide('favorites', favorites)
provide('cart', cart)
provide('items', items)
provide('state', state)
provide('summ', summ)
provide('drawerOpened', drawerOpened)

const fetchItems = async () => {
	let loadingItems
	let response
	try {
		const params = {
			sortBy: filter.sortBy,
		}
		if (filter.search) params.title = `*${filter.search}*`
		if (items.value == 0) state.loadingItems = true
		else {
			loadingItems = setTimeout(() => {
				state.loadingItems = true
				items.value = []
			}, '1000')
		}
		response = await axios.get('https://9b4770c990fe3bae.mokky.dev/items', { params })
		items.value = response.data
		if (!state.loadedImages) {
			await preloadImages(items.value)
			state.loadedImages = true
		}
	} catch (err) {
		toast.error(err.message + ", can't load items!")
	} finally {
		if (response) {
			state.loadingItems = false
			clearTimeout(loadingItems)
		}
	}
}
const fetchFavorites = async () => {
	try {
		const { data } = await axios.get(
			'https://9b4770c990fe3bae.mokky.dev/favorites?_relations=items',
		)
		favorites.value = data.map((obj) => {
			return { fav_id: obj.id, ...obj.item }
		})
	} catch (err) {
		toast.error(err.message + ", can't load favorites!")
	}
}
function preloadImages(items) {
	// console.log(items)
	if (items != []) {
		const imageUrls = new Array(items.map((item) => item.imageUrl))
		// console.log(imageUrls[0])
		return Promise.all(
			imageUrls[0].map((url) => {
				return new Promise((resolve, reject) => {
					const img = new Image()
					img.src = './img' + url
					img.onload = resolve
					img.onerror = reject
				})
			}),
		)
	}
}

onMounted(fetchItems)
onMounted(fetchFavorites)
watch(filter, fetchItems)
watch(drawerOpened, () => {
	document.body.style.overflow = drawerOpened.value ? 'hidden' : 'auto'
})
</script>

<template>
	<Transition name="fade">
		<div v-if="drawerOpened" @click="drawerOpened = false" id="fullscreen-block"></div>
	</Transition>
	<Transition
		enter-active-class="animate__animated animate__fadeInRight"
		leave-active-class="animate__animated animate__fadeOutRight"
	>
		<AppDrawer v-show="drawerOpened" />
	</Transition>
	<div id="wrapper">
		<AppHeader />
		<router-view v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</div>
</template>

<style lang="scss">
@use 'animate.css';
#fullscreen-block {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	z-index: 20;
	transition: $tr-time;
}
#wrapper {
	max-width: 1700px;
	margin: 0 auto;
	background: #fff;
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - (40 / 1250 * 100vw));
	border-radius: 20px 20px 0 0;
	box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.04);
}
.fade-enter-active {
	transition: opacity 0.25s ease-in-out;
}
.fade-leave-active {
	transition: opacity 0.1s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
