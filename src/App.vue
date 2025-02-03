<script setup>
import { onMounted, ref, reactive, watch, provide} from 'vue'
import axios from 'axios'
import AppHeader from './components/AppHeader.vue'

const items = ref([])
const state = reactive({
  loading: null,
  error: null,
})
const filter = reactive({
  sortBy: '',
  search: null,
})

provide('filter', filter)
provide('items', items)
provide('state', state)

const fetchItems = async ()=>{
  try{
    const params = {
      sortBy: filter.sortBy
    }
    if (filter.search) params.title = `*${filter.search}*`
    if(items.value == 0) state.loading = true
    const response = await axios.get('https://9b4770c990fe3bae.mokky.dev/items',{params})
    items.value = response.data
  } catch(err) {
    state.error = err
  } finally {
    state.loading = false;
  }
}

onMounted(fetchItems) 
watch (filter, fetchItems)
</script>

<template>
	<AppHeader />
	<RouterView/>
</template>