<script setup>
import { inject } from 'vue';
import { TransitionPresets, useTransition } from '@vueuse/core'

const drawerOpened = inject('drawerOpened')
const summ = inject('summ')
const summAnimated = useTransition(summ, {
  duration: 300,
  transition: TransitionPresets.easeInOutCubic,
})
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
</script>

<template>
	<nav class="nav">
    <button @click="drawerOpened = true" class="nav__button"><img class="nav__img" src="/img/cart.svg" alt="" /><span class="nav__price">{{numberWithSpaces(parseInt(summAnimated))}} грн.</span></button>
    <router-link to="/favorites" class="nav__button"><img class="nav__img" src="/img/heart.svg" alt="" />Закладки</router-link>
    <router-link to="/orders" class="nav__button"><img class="nav__img" src="/img/profile.svg" alt="" />Профиль</router-link>
	</nav>
</template>

<style lang="sass" scoped>
.nav
  display: flex
  flex: 0 1 400px
  column-gap: 5px
  row-gap: 15px
  flex-wrap: wrap-reverse
  justify-content: flex-end
  &__button
    // flex: 0 0 30%
    width: 120px
    display: flex
    background: transparent
    color: #5C5C5C
    font-weight: 400
    font-size: 14px
    font-family: Inter
    padding: 7px
    margin: -7px 0
    border-radius: 15px
    border: 1px solid #fff
    transition: $tr-time
    align-items: center
    justify-content: space-between
    @include hover
      border: 1px solid rgba(92, 92, 92, 0.5)
      box-shadow: 0 0 2px 0 #5c5c5c
      background: rgba(92, 92, 92, 0.1)
  &__price
    font-weight: 600
    flex-shrink: 0
  &__img
</style>
