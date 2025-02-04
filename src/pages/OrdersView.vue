<script setup>
import CardList from '../components/CardList.vue'
</script>

<template>
  <section class="orders">
    <div class="orders__container">
      <h2 class="orders__title">
        <router-link to="/" class="orders__back-button">
          <svg class="_absolute" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
            <path d="M19 22L14 17L19 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
        Мои покупки
      </h2>
      <CardList class="orders__cards" cards="orders"/>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.orders
  &__container
    padding: calc( 45/1080*100% ) calc( 60/1080*100% )
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    align-items: center
    gap: calc( 40/1080*100vw )
  &__title
    display: flex
    gap: 20px
    color: #000
    font-family: Inter
    font-size: 32px
    font-weight: 700
    align-items: center
  &__back-button
    position: relative
    flex-shrink: 0
    height: 35px
    width: 35px
    border-radius: 7.5px
    border: 1px solid #F2F2F2
    transition: $tr-time
    color: #C8C8C8
    @include hover
      border: 1px solid rgba(92, 92, 92, 0.5)
      // box-shadow: 0 0 2px 0 #5c5c5c
      background: rgba(92, 92, 92, 0.1)
      color: rgba(92, 92, 92, 0.8)
  &__cards
    padding: 0 0 25px
</style>