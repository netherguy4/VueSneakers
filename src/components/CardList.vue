<script setup>
import { HollowDotsSpinner } from 'epic-spinners'
import { inject } from 'vue';
import CardItem from './CardItem.vue'

const props = defineProps({
  cards: String,
})

const items = inject(`${props.cards}`)
const state = inject('state')
</script>

<template>
  <ul class="card-list" v-auto-animate>
    <li class="card-list__message _loading" v-if="state.loading">
      <hollow-dots-spinner style="margin: 5% auto;"
        :animation-duration="1000"
        :dot-size="20"
        :dots-num="3"
        color="#8BB43C"
      />
    </li>
    <li class="card-list__message _error" v-else-if="state.error">{{ state.error }}</li>
    <CardItem class="card-list__item" v-for="item in items" :key="item.id" :id="item.id" :title="item.title" :price="item.price" :image-url="item.imageUrl"/>
  </ul>
</template>

<style lang="sass" scoped>
.card-list
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr))
  grid-auto-rows: 1fr
  gap: 40px
  &__item
    // margin: 0 auto
    max-width: 270px
  &__message
    width: 100%
    font-family: Inter
    font-size: 30px
    grid-column: span 4
    &._error
      color: red
</style>