<script setup>
import { onMounted, ref, reactive, watch, provide, computed} from 'vue'
import axios from 'axios'
import AppHeader from './components/AppHeader.vue'

const items = ref([])
const favorites = ref([])
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

provide('likedIds', likedIds)
provide('filter', filter)
provide('favorites', favorites)
provide('items', items)
provide('state', state)

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
      return { ...obj.item}
    })
  } catch(err) {
    console.log(err)
  }
}

onMounted(fetchItems)
onMounted(fetchFavorites)
watch (filter, fetchItems)
</script>

<template>
	<div id="wrapper">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style lang="sass" scoped>
#wrapper
  background: #fff
  display: flex
  flex-direction: column
  min-height: calc(100vh - (85 / 1250 * 100vw))
  border-radius: 20px 20px 0 0
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.04)
</style>