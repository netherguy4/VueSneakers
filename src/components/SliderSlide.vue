<template>
	<div class="slide">
		<div class="slide__container">
      <h3 class="slide__title">
        <span class="slide__title-span">Stan Smith</span>, Forever!
        <button class="slide__button">Купить</button>
      </h3>
    </div>
	</div>
</template>
<style lang="sass" scoped>
.slide
  &__container
    overflow: hidden
    margin: calc( 45/1080*100% ) calc( 60/1080*100% )
    border-radius: 20px
    background-color: #F4EFE9
    background-image: url("/img/sponsor-logo.png"), url("/img/hero-image.jpg")
    background-repeat: no-repeat, no-repeat
    background-position: 20px 10px, 102% top
    background-size: auto percent(40, 300), contain
    position: relative
    @include mediaQ($L)
      border-radius: tovw(23, 1440)
      // border-radius: 100%
  &__title
    font-size: tovw(38, 1100)
    padding: em(90,38) 0px em(60,38) em(50, 38)
    color: #000
    font-family: Inter
    font-weight: 700
    max-width: em(280, 38)
    line-height: 130%
    @include mediaQ($L)
      font-size: 38px
  &__title-span
    color: #8BB43C
  &__button
    border-radius: toem(25)
    background: #A5D364
    width: toem(177)
    height: toem(47)
    margin: toem(15) 0 0
    transition: $tr-time
    color: #FFF
    text-align: center
    font-family: Inter
    font-size: tovw(16, 1100)
    font-weight: 700
    text-transform: uppercase
    @include mediaQ($L)
      font-size: 16px
    @include hover
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
    &:active
      transition: .1s
      box-shadow: none
      background: rgba(255, 255, 255, 0.7)
      color: #A5D364
</style>
