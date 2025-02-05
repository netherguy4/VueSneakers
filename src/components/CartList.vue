<script setup>
// import { inject } from 'vue';
import CartItem from './CartItem.vue';

// const cart = inject('cart')
</script>

<template>
  <ul class="card__list" v-auto-animate>
    <CartItem class="card__item" />
    <CartItem class="card__item" />
  </ul>
</template>

<style lang="sass" scoped>
.card
  &__list
    display: flex
    flex-direction: column
    justify-content: stretch
    gap: 20px
  &__item
</style>