<script setup>
import { inject } from 'vue';
import CardItem from './CardItem.vue'

const items = inject('items')
</script>

<template>
  <div class="card-list" v-auto-animate>
    <CardItem class="card-list__item" v-for="item in items" :key="item.id" :title="item.title" :price="item.price" :image-url="item.imageUrl"/>
  </div>
</template>

<style lang="sass" scoped>
.card-list
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr))
  grid-auto-rows: 1fr
  gap: 40px
  &__item
    margin: 0 auto
    max-width: 270px
</style>