<script setup>
import { ref, computed, inject } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  imageUrl: String,
})
const likedIds = inject('likedIds')
const favorites = inject('favorites')
const added = ref(props.isAdded)

const isLiked = computed(()=>{
  if (likedIds.value.has(props.id)) {return true} else {return false} 
})

const onClickFavoriteHandler = (e) => {
  e.preventDefault()
  if (!isLiked.value) {
    const item = ref(props)
    if (item.value){
      favorites.value.push(item.value)
    }
  } else if (isLiked.value){
    const index = favorites.value.findIndex(n => n.id === props.id);
    if (index !== -1) {
      favorites.value.splice(index, 1);
    }
  } else console.lor('error while adding to vavorites')
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
</script>

<template>
  <div class="item">
    <div class="item__container">
      <button class="item__add-button _absolute" @click="added=!added"></button>
      <label :class="(isLiked)?'like-wrapper _checked':'like-wrapper'">
        <input type="checkbox" v-model="isLiked" @click="onClickFavoriteHandler" name="liked" class="like _absolute">
      </label>
      <div class="item__image">
        <img class="item__image-img" :src="'/img' + imageUrl" :alt="title">
      </div>
      <div class="item__title">{{title}}</div>
      <div class="item__price">
        {{numberWithSpaces(price)}} руб.
        <label :class="(added)? 'buy-wrapper _active':'buy-wrapper'">
          <input type="checkbox" class="buy _absolute" v-model="added">
        </label>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.item
  &__container
    position: relative
    padding: 20px 30px 35px
    border-radius: 40px
    border: 1px solid #F3F3F3
    display: flex
    flex-direction: column
    height: 100%
    gap: 14px
    transition: cubic-bezier(0.68, -0.55, 0.265, 1.55) $tr-time
    &:hover
      border: 1px solid #F8F8F8
      box-shadow: 0px 14px 30px 0px rgba(0, 0, 0, 0.05)
      translate: 0 -10px
  &__image
    user-select: none
    position: relative
    padding: 0 0 calc(112 / 133 * 100%)
    margin: 0 10px 0 0
    &-img
      @include image-fit
      object-fit: contain
  &__title
    color: #000
    font-family: Inter
    font-size: 14px
    font-weight: 400
    flex: 1 1 auto
  &__price
    position: relative
    display: flex
    justify-content: space-between
    align-items: flex-end
    color: #000
    font-family: Inter
    font-size: 14px
    font-weight: 700
    user-select: none
    &::before
      content: 'Цена:'
      text-transform: uppercase
      position: absolute
      color: #BDBDBD
      font-size: 11px
      font-weight: 500
      padding: 0 0 2px
      top: 0
      left: 0
  &__add-button
    background: transparent
    z-index: 2
.like
  opacity: 0
  z-index: 3
  cursor: pointer
  &-wrapper
    position: absolute
    top: 30px
    left: 30px
    z-index: 3
    background-image: url(/img/like-1.svg)
    border-radius: 7px
    outline: 1px solid #F8F8F8
    height: 32px
    width: 32px
    transition: background-color $tr-time, outline $tr-time
    &:hover
      outline: 1px solid rgba(0, 0, 0, 0.25)
    &::after
      content: ''
      @extend ._absolute
      pointer-events: none
      scale: 0
      transition: scale cubic-bezier(0.68, -0.55, 0.265, 1.55) $tr-time
      background-image: url(/img/like-2.svg)
    &._checked
      background-color: #FEF0F0
      &::after
        scale: 1.1
.buy
  pointer-events: none
  opacity: 0
  &-wrapper
    width: 32px
    height: 32px
    position: relative
    background: url(/img/plus.svg) center
    border-radius: 8px
    outline: 1px solid #F8F8F8
    &::before
      content: ''
      position: absolute
      top: -1px
      bottom: -1px
      left: -1px
      right: -1px
      border-radius: 8px
      background: linear-gradient(180deg, #89F09C 0%, #3CC755 100%)
      opacity: 0
      scale: 0
      transition: opacity $tr-time, scale 0s $tr-time
    &::after
      content: ''
      opacity: 0
      rotate: -90deg
      scale: 0
      @extend ._absolute
      background: url(/img/checked.svg) center
      transition: opacity $tr-time, rotate cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s $tr-time, scale cubic-bezier(0.68, -0.55, 0.265, 1.55) $tr-time
    &._active
      &::before
        transition: opacity .1s, scale .1s
        opacity: 1
        scale: 1
      &::after
        transition: opacity .1s .1s, rotate cubic-bezier(0.68, -0.55, 0.265, 1.55) $tr-time .1s, scale cubic-bezier(0.68, -0.55, 0.265, 1.55) $tr-time .1s
        scale: 1
        rotate: 0deg
        opacity: 1
</style>