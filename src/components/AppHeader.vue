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
			<HeaderNav />
		</div>
	</header>
</template>

<style scoped lang="sass">
.header
  border-bottom: 1px solid #EAEAEA
  &__content
    display: flex
    align-items: center
    justify-content: center
    height: 130px
    padding: 0 10px
    flex-wrap: wrap
    column-gap: 50px
    @media (min-width: toem(768))
      padding: 0 60px 0 45px
  &__logo
    display: flex
    align-items: center
    gap: 15px
    position: relative
    margin: 0 auto 0 0
    &-link
      @include absolute-link
  &__logo-img
    width: 40px
    height: 40px
  &__logo-text
    font-family: Inter
  &__title
    color: #000
    font-size: 20px
    font-weight: 700
    text-transform: uppercase
  &__subtitle
    color: #9D9D9D
    font-size: 14px
    font-weight: 400
</style>
