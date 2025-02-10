<script setup>
import { inject } from 'vue'
import { useMediaQuery } from '@vueuse/core'
const isTablet = useMediaQuery('(max-width: 48em)')

import HeroSlider from '../components/HeroSlider.vue'
import CardList from '../components/CardList.vue';

const filter = inject('filter')

const preventDefault = (event) => event.preventDefault()
</script>

<template>
	<main class="main">
    <HeroSlider v-if="!isTablet" />
		<div class="main__container">
      <h2 class="main__title" :style="isTablet ? 'margin-top:4.17%' : ''">Все кроссовки</h2>
      <form action="#" id="search-form" @submit="preventDefault">
        <select v-model="filter.sortBy" name="sortBy" id="sortBy">
          <option value="">Не сортировать</option>
          <option value="title">Название (а-я)</option>
          <option value="-title">Название (я-а)</option>
          <option value="-price">Цена (от дорогих)</option>
          <option value="price">Цена (от дешевых)</option>
        </select>
        <input v-model="filter.search" type="text" name="search" placeholder="Поиск..." id="search-input">
      </form>
			<CardList cards="items" class="main__shop"/>
		</div>
	</main>
</template>

<style scoped lang="sass">
.main
  &__container
    padding: 0 calc( 60/1080*100% )
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    align-items: center
    gap: calc( 40/1080*100vw )
  &__title
    color: #000
    font-family: Inter
    font-size: 32px
    font-weight: 700
  &__shop
    padding: 0 0 25px
#search-form
  font-family: Inter
  display: flex
  position: relative
  flex-wrap: wrap-reverse
  justify-content: stretch
  gap: 20px
  max-width: 100%
#sortBy
  // margin: 0 auto
  flex: 1 1 auto
  border-radius: 10px
  border: 1px solid #F3F3F3
  color: rgba(0, 0, 0, 0.5)
  font-size: 14px
  font-weight: 400
  padding: 15px 10px
  transition: $tr-time
  &:focus
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3)
    color: rgba(0, 0, 0, 0.8)
#search-input
  flex: 1 1 auto
  border-radius: 10px
  border: 1px solid #F3F3F3
  color: rgba(0, 0, 0, 0.5)
  font-size: 14px
  font-weight: 400
  padding: 15px 45px
  transition: $tr-time
  position: relative
  background: url(img/search.svg) 15px center no-repeat
  max-width: 100%
  &:focus
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3)
    color: rgba(0, 0, 0, 0.8)
  &::placeholder
    color: #C4C4C4
    opacity: 1
</style>
