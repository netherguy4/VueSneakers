<script setup>
import HeaderNav from './HeaderNav.vue'
</script>

<template>
	<header class="header">
		<div class="header__content">
			<div class="header__logo">
				<router-link to="/" class="header__logo-link"></router-link>
				<img src="/img/logo.png" alt="" class="header__logo-img" />
				<div class="header__logo-text">
					<h1 class="header__title">Vue Sneakers</h1>
					<h4 class="header__subtitle">Магазин лучших кроссовок</h4>
				</div>
			</div>
			<HeaderNav class="header__nav" />
		</div>
	</header>
</template>

<style scoped lang="sass">
.header
  border-bottom: 1px solid #EAEAEA
  &__content
    position: relative
    display: flex
    align-items: center
    // justify-content: space-between
    height: 130px
    padding: 0 60px 0 45px
    flex-wrap: wrap
    column-gap: 50px
  &__logo
    display: flex
    align-items: center
    gap: 15px
    position: relative
    @media (max-width: $S)
      position: absolute
      top: 20px
      left: 20px
    &-link
      @include absolute-link
  &__logo-img
    width: 40px
    height: 40px
  &__logo-text
    flex-shrink: 0
    font-family: Inter
    @media (max-width: $S)
      display: none
  &__title
    color: #000
    font-size: 20px
    font-weight: 700
    text-transform: uppercase
  &__subtitle
    color: #9D9D9D
    font-size: 14px
    font-weight: 400
  &__nav
    margin: 0 0 0 auto
</style>
