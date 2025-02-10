<script setup>
  import OrdersListOrder from './OrdersListOrder.vue';

  const props = defineProps({
    orders: Array,
  })
</script>

<template>
  <ul class="orders__list" v-auto-animate>
    <OrdersListOrder class="orders__order" v-for="order in props.orders" :key="order.id" :id="order.id" :total-price="order.totalPrice" :orderDate="order.date" :items="order.items" />
  </ul>
</template>

<style lang="sass" scoped>
.orders
  &__list
    display: flex
    flex-direction: column
    justify-content: stretch
    gap: 20px
    position: relative
    z-index: 2
  &__order
    padding: 20px
</style>