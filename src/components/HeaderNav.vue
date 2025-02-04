<script setup>
import { inject } from 'vue';
  const drawerOpened = inject('drawerOpened')
</script>

<template>
	<nav class="nav">
		<ul class="nav__list">
			<li class="nav__element">
				<button @click="console.log(drawerOpened = true)" class="nav__element-button"><img src="/img/cart.svg" alt="" /><span class="nav__element-span">1205 руб.</span></button>
			</li>
			<li class="nav__element">
				<router-link to="/favorites" class="nav__element-button"><img src="/img/heart.svg" alt="" /><span class="nav__element-span">Закладки</span></router-link>
			</li>
			<li class="nav__element">
				<router-link to="/orders" class="nav__element-button"><img src="/img/profile.svg" alt="" /><span class="nav__element-span">Профиль</span></router-link>
			</li>
		</ul>
	</nav>
</template>

<style lang="sass" scoped>
.nav
  &__list
    display: flex
    gap: 30px
  &__element
    font-family: Inter
    display: flex
    &:first-child
      .nav__element-button
        font-weight: 600
    &-button
      background: transparent
      color: #5C5C5C
      font-weight: 400
      font-size: 14px
      gap: 10px
      margin: -7px
      padding: 7px
      border-radius: 15px
      border: 1px solid #fff
      transition: $tr-time
      scale: 1
      @include centered
      flex-direction: column
      @include hover
        border: 1px solid rgba(92, 92, 92, 0.5)
        box-shadow: 0 0 2px 0 #5c5c5c
        background: rgba(92, 92, 92, 0.1)
      @media (min-width: toem(768))
        flex-direction: row
        margin: -10px
        padding: 10px
        border-radius: 25px
    &-span
      @media (min-width: toem(768))
        display: inline
</style>
