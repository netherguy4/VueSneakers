<script setup>
import { inject } from 'vue';

const props = defineProps({
  imgUrl: String,
  title: String,
  subtitle: String,
  greenTitle: Boolean,
  imgEmoji: Boolean,
  link: Boolean,
})

const drawerOpened =  inject('drawerOpened')
</script>

<template>
  <div class="info">
    <div :class="imgEmoji ? 'info__img-wrapper _emoji _relative' : 'info__img-wrapper _relative'">
      <img :src="props.imgUrl" class="info__img _absolute _contain">
    </div>
    <h4 :class="greenTitle ? 'info__title _green' : 'info__title'">{{ title }}</h4>
    <p class="info__subtitle">{{ subtitle }}</p>
    <router-link to="/" v-if="link" class="info__button">
      <svg class="info__button-arrow"  width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Вернуться назад
    </router-link>
    <button v-else @click="drawerOpened = false" class="info__button">
      <svg class="info__button-arrow"  width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Вернуться назад
    </button>
  </div>
</template>

<style lang="sass" scoped>
.info
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  &__img-wrapper
    width: 120px
    height: 120px
    margin: 0 0 20px
    &._emoji
      width: 70px
      height: 70px
  &__title
    color: #000
    font-family: Inter
    font-size: 22px
    font-weight: 600
    margin: 0 0 10px
    &._green
      color: #87C20A
  &__subtitle
    white-space: pre-wrap
    color: #000
    text-align: center
    font-family: Inter
    font-size: 16px
    font-weight: 400
    line-height: 150%
    margin: 0 0 40px
    opacity: 0.4
  &__button
    position: relative
    border-radius: 18px
    background: #9DD458
    width: 245px
    height: 55px
    flex-shrink: 0
    display: flex
    align-items: center
    justify-content: center
    color: #FFF
    text-align: center
    font-family: Inter
    font-size: 16px
    font-weight: 600
    &-arrow
      position: absolute
      top: 50%
      left: 0
      translate: 150% -50%
      scale: -1 1
    @include hover
      box-shadow: 0 0 5px #9DD458
    &:active
      box-shadow: none
</style>