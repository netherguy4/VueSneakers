<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import SliderSlide from './SliderSlide.vue'

const modules = [Navigation]
</script>
<template>
	<div class="hero">
		<swiper
			:modules="modules"
			:slides-per-view="1"
			:navigation="{
				prevEl: '.hero__button-prev',
				nextEl: '.hero__button-next',
			}"
		>
			<swiper-slide>
				<SliderSlide />
			</swiper-slide>
			<swiper-slide>
				<SliderSlide />
			</swiper-slide>
			<swiper-slide>
				<SliderSlide />
			</swiper-slide>
		</swiper>
		<button class="swiper-button-prev hero__button-prev"></button>
		<button class="swiper-button-next hero__button-next"></button>
	</div>
</template>
<style lang="sass">
@use 'swiper/scss'
@use 'swiper/scss/navigation'
.hero
  position: relative
  &__button-next, &__button-prev
    transition: $tr-time
    height: 35px
    width: 35px
    border-radius: 50%
    background: #FFF
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04)
    &::after
      color: #C8C8C8
      font-size: 14px
      font-weight: 600
    @include hover
      scale: 1.1
      box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.1)
    &:active
      transition: 0.1s
      scale: 0.95
      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04)
  &__button-next
    right: calc( (60/1080*100%) - 17.5px )
  &__button-prev
    left: calc( (60/1080*100%) - 17.5px )
  .swiper-button-disabled
    opacity: 0
</style>
