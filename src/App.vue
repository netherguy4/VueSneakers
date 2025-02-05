<script setup>
import { onMounted, ref, reactive, watch, provide, computed} from 'vue'
import axios from 'axios'

import AppHeader from './components/AppHeader.vue'
import AppDrawer from './components/AppDrawer.vue'

const drawerOpened = ref(false)
const items = ref([])
const favorites = ref([])
const cart = ref([])
const state = reactive({
  loading: null,
  error: null,
})
const filter = reactive({
  sortBy: '',
  search: null,
})
const likedIds = computed(()=>{
  return new Set(favorites.value.map(item => item.id))
})
const cartIds = computed(()=>{
  return new Set(cart.value.map(item => item.id))
})
const summ = computed(()=>{
  return cart.value.reduce((acc, value) => acc + value.price, 0)
})

provide('likedIds', likedIds)
provide('cartIds', cartIds)
provide('filter', filter)
provide('favorites', favorites)
provide('cart', cart)
provide('items', items)
provide('state', state)
provide('summ', summ)
provide('drawerOpened', drawerOpened)

const fetchItems = async ()=>{
  let loading
  try{
    const params = {
      sortBy: filter.sortBy
    }
    if (filter.search) params.title = `*${filter.search}*`
    if(items.value == 0) state.loading = true
    else {
      loading = setTimeout(()=>{
        state.loading = true
        items.value = []
      }, '500')
    }
    const response = await axios.get('https://9b4770c990fe3bae.mokky.dev/items',{params})
    items.value = response.data
  } catch(err) {
    // state.error = err
    console.log(err)
  } finally {
    state.loading = false;
    clearTimeout(loading)
  }
}
const fetchFavorites = async ()=>{
  try{
    const {data} = await axios.get('https://9b4770c990fe3bae.mokky.dev/favorites?_relations=items')
    favorites.value = data.map((obj) => {
      return {fav_id: obj.id, ...obj.item}
    })
  } catch(err) {
    console.log(err)
  }
}

onMounted(fetchItems)
onMounted(fetchFavorites)
watch (filter, fetchItems)
watch (drawerOpened, () => {document.body.style.overflow = drawerOpened.value ? "hidden" : "auto"})
</script>

<template>
  <Transition name="fade">
    <div v-if="drawerOpened" @click="drawerOpened=false" id="fullscreen-block"></div>
  </Transition>
  <Transition
    enter-active-class="animate__animated animate__fadeInRight"
    leave-active-class="animate__animated animate__fadeOutRight">
    <AppDrawer v-if="drawerOpened" />
  </Transition>
	<div id="wrapper">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style lang="sass">
@use 'animate.css'
#fullscreen-block
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0, 0, 0, 0.5)
  z-index: 20
  transition: $tr-time
#wrapper
  background: #fff
  display: flex
  flex-direction: column
  min-height: calc(100vh - (85 / 1250 * 100vw))
  border-radius: 20px 20px 0 0
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.04)
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease
.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>