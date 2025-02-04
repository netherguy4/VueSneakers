<script setup>
import { inject } from 'vue';

const drawerOpened =  inject('drawerOpened') 
</script>

<template>
  <div class="drawer">
    <div class="drawer__container">
      <h2 class="drawer__title">
        <button @click="drawerOpened = false" class="drawer__back-button">
          <svg class="_absolute" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
            <path d="M19 22L14 17L19 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        Корзина
      </h2>
      <CartList class="drawer__items" />
      <p class="drawer__summ summ">
        <span class="summ__position">Итого:</span>
        <span class="summ__divider"></span>
        <span class="summ__price">21 498 руб.</span>
      </p>
      <p class="drawer__summ summ">
        <span class="summ__position">Налог 5%:</span>
        <span class="summ__divider"></span>
        <span class="summ__price">1074 руб</span>
      </p>
      <button class="drawer__order-button">
        Оформить заказ 
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H14.7143" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.drawer
  position: fixed
  right: 0
  top: 0
  bottom: 0
  z-index: 21
  &__container
    width: 385px
    height: 100%
    background: #fff
    position: relative
    padding: 30px
    display: flex
    flex-direction: column
    gap: 25px
  &__title
    display: flex
    gap: 20px
    color: #000
    font-family: Inter
    font-size: 32px
    font-weight: 700
    align-items: center
    margin: 0 0 5px
  &__back-button
    position: relative
    flex-shrink: 0
    height: 35px
    width: 35px
    border-radius: 7.5px
    border: 1px solid #F2F2F2
    transition: $tr-time
    color: #C8C8C8
    background: transparent
    @include hover
      border: 1px solid rgba(92, 92, 92, 0.5)
      background: rgba(92, 92, 92, 0.1)
      color: rgba(92, 92, 92, 0.8)
  &__items
    flex: 1 1 auto
  &__order-button
    border-radius: 18px
    background: #9DD458
    height: 55px
    display: flex
    align-items: center
    justify-content: center
    color: #FFF
    font-family: Inter
    font-size: 16px
    font-weight: 600
    transition: $tr-time
    &:hover
      box-shadow: 0 0 5px #9DD458
    &:disabled,&:active
      background: gray
      cursor: default
      box-shadow: none
.summ
  color: #000
  font-family: Inter
  font-size: 16px
  font-weight: 400
  display: flex
  gap: 8px
  align-items: baseline
  &__position
  &__divider
    flex: 1 1 auto
    border-bottom: 1px dashed #DFDFDF
  &__price
    font-weight: 600
.animate__animated
  --animate-duration: 0.3s
</style>