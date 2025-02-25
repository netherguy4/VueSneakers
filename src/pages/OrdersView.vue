<script setup>
import axios from 'axios'
import { ref, onBeforeMount, inject } from 'vue'
import { HollowDotsSpinner } from 'epic-spinners'

import InfoBlock from '@/components/InfoBlock.vue'
import OrdersList from '@/components/OrdersList.vue'

const state = inject('state')
const toast = inject('toast')

const orders = ref([])
const showMoreOrders = ref(false)

const fetchOrders = async () => {
	try {
		state.loadingOrders = true
		const response = await axios.get('https://9b4770c990fe3bae.mokky.dev/orders?sortBy=-date')
		orders.value = response.data
	} catch (err) {
		toast.error(err.message + ", can't load orders!")
	} finally {
		state.loadingOrders = false
	}
}

onBeforeMount(fetchOrders)
</script>

<template>
	<section class="orders" v-auto-animate>
		<div class="orders__container" v-if="orders.length > 0 || state.loadingOrders === true">
			<h2 class="orders__title">
				<router-link to="/" class="orders__back-button">
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
				Мои покупки
			</h2>
			<div class="orders__message _loading" v-if="state.loadingOrders">
				<hollow-dots-spinner
					style="margin: 5% auto 30%"
					:animation-duration="1000"
					:dot-size="20"
					:dots-num="3"
					color="#8BB43C"
				/>
			</div>
			<OrdersList :orders="showMoreOrders ? orders : orders.slice(0, 5)" class="orders__list" />
		</div>
		<InfoBlock
			v-else
			:img-url="'./img/emoji-2.png'"
			:img-emoji="true"
			:title="'У вас нет заказов'"
			:subtitle="'Вы нищеброд? \n Оформите хотя бы один заказ.'"
			:link="true"
			class="orders__info"
		/>
		<Transition>
			<button
				v-show="!showMoreOrders & (orders.length > 5)"
				@click="showMoreOrders = true"
				class="orders__show-more-button"
			>
				Показать все
			</button>
		</Transition>
	</section>
</template>

<style lang="sass" scoped>
.orders
  display: flex
  flex-direction: column
  flex: 1 1 auto
  &__container
    padding: calc( 45/1080*100% ) calc( 60/1080*100% )
    display: flex
    flex-direction: column
    gap: calc( 40/1080*100vw )
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
  &__message
    width: 100%
  &__list
    padding: 0 0 25px
  &__info
    flex: 1 1 auto
    // max-width: 200px
    // margin: 0 auto
  &__show-more-button
    align-self: center
    padding: 20px 40px
    border-radius: 1.5625em
    background: #A5D364
    transition: $tr-time
    color: #FFF
    text-align: center
    font-family: Inter
    font-size: 16px
    font-weight: 700
    text-transform: uppercase
    margin: 0 0 calc( 45/1080*100% )
    @include hover
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3)
</style>
