<script setup>
import { inject } from 'vue'
import CardList from '../components/CardList.vue'
import InfoBlock from '@/components/InfoBlock.vue'

const favorites = inject('favorites')
</script>

<template>
	<section class="favorites" v-auto-animate>
		<div v-if="favorites.length > 0" class="favorites__container">
			<h2 class="favorites__title">
				<router-link to="/" class="favorites__back-button">
					<svg
						class="_absolute"
						xmlns="http://www.w3.org/2000/svg"
						width="35"
						height="35"
						viewBox="0 0 35 35"
						fill="none"
					>
						<path
							d="M19 22L14 17L19 12"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</router-link>
				Мои закладки
			</h2>
			<CardList class="favorites__cards" cards="favorites" />
		</div>
		<InfoBlock
			v-else
			:img-url="'./img/emoji-1.png'"
			:img-emoji="true"
			:title="'Закладок нет :('"
			:subtitle="'Вы ничего не добавляли в закладки'"
			:link="true"
			class="favorites__info"
		/>
	</section>
</template>

<style lang="sass" scoped>
.favorites
  flex: 1 1 auto
  display: flex
  flex-direction: column
  &__container
    padding: calc( 45/1080*100% ) calc( 60/1080*100% )
    display: flex
    flex-direction: column
    align-items: stretch
    gap: calc( 40/1080*100vw )
    flex: 1 1 auto
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
      background: rgba(92, 92, 92, 0.1)
      color: rgba(92, 92, 92, 0.8)
  &__cards
    padding: 0 0 25px
  &__info
    flex: 1 1 auto
</style>
