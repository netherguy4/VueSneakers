<script setup>
import { HollowDotsSpinner } from 'epic-spinners'
import { inject } from 'vue';

import HeroSlider from '../components/HeroSlider.vue'
import CardList from '../components/CardList.vue';

const state = inject('state')
const filter = inject('filter')

const preventDefault = (event) => event.preventDefault()
</script>

<template>
	<main class="main" v-auto-animate>
    <HeroSlider />
		<div class="main__container">
      <h2 class="main__title">Все кроссовки</h2>
      <form action="#" id="search-form" @submit="preventDefault">
        <select v-model="filter.sortBy" name="sortBy" id="sortBy">
          <option value="">Не сортировать</option>
          <option value="title">Название (а-я)</option>
          <option value="-title">Название (я-а)</option>
          <option value="-price">Цена (от дорогих)</option>
          <option value="price">Цена (от дешевых)</option>
        </select>
        <button type="button" id="search-button">
          <svg id="search-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
        <input v-model="filter.search" type="text" name="search" placeholder="Поиск..." id="search-input">
      </form>
      <p class="main__message _loading" v-if="state.loading">
        <hollow-dots-spinner style="margin: 5% auto;"
          :animation-duration="1000"
          :dot-size="20"
          :dots-num="3"
          color="#8BB43C"
        />
      </p>
      <p class="main__message _error" v-else-if="state.error">{{ state.error }}</p>
			<CardList v-else class="main__shop"/>
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
    gap: 35px
  &__title
    color: #000
    font-family: Inter
    font-size: 32px
    font-weight: 700
  &__shop
    padding: 0 0 25px
  &__message
    width: 100%
    font-family: Inter
    font-size: 30px
    &._error
      color: red
#search-form
  font-family: Inter
  display: flex
  position: relative
#sortBy
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
#search-button
  background: transparent
  pointer-events: none
#search-img
  translate: 200% 0%
#search-input
  border-radius: 10px
  border: 1px solid #F3F3F3
  color: rgba(0, 0, 0, 0.5)
  font-size: 14px
  font-weight: 400
  padding: 15px 45px
  transition: $tr-time
  &:focus
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3)
    color: rgba(0, 0, 0, 0.8)
  &::placeholder
    color: #C4C4C4
    opacity: 1
</style>
