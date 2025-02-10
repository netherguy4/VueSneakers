<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';

const cart = inject('cart')
</script>

<template>
  <ul class="card__list" v-auto-animate>
    <CartItem v-for="item in cart" :key="item.id" :id="item.id" :title="item.title" :price="item.price" :image-url="item.imageUrl"/>
  </ul>
</template>

<style lang="sass" scoped>
.card
  &__list
    display: flex
    flex-direction: column
    justify-content: stretch
    gap: 20px
</style>