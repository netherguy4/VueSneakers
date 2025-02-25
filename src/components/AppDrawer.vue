<script setup>
import { inject, ref, watch } from 'vue'
import { TransitionPresets, useTransition } from '@vueuse/core'
import axios from 'axios'
import { SemipolarSpinner } from 'epic-spinners'

import CartList from './CartList.vue'
import InfoBlock from './InfoBlock.vue'

const orderSent = ref(false)
const orderSending = ref(null)
const orderNum = ref(0)
const toast = inject('toast')

const makeOrder = async () => {
	const response = ref(null)
	try {
		orderSending.value = true
		response.value = await axios.post('https://9b4770c990fe3bae.mokky.dev/orders', {
			items: cart.value,
			totalPrice: summ.value,
			date: Date.now(),
		})
	} catch (err) {
		toast.error(err.message + ", can't send order!")
	} finally {
		if (response.value) {
			cart.value = []
			orderNum.value = response.value.data.id
			orderSent.value = true
			orderSending.value = false
		} else {
			// cart.value = []
			// orderNum.value = orderSent.value.data.id
			orderSent.value = false
			orderSending.value = false
		}
	}
}

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const cart = inject('cart')
const drawerOpened = inject('drawerOpened')
const summ = inject('summ')
const summAnimated = useTransition(summ, {
	duration: 300,
	transition: TransitionPresets.easeInOutCubic,
})

watch(drawerOpened, () => {
	if (!drawerOpened.value) {
		orderSent.value = false
	}
})
</script>

<template>
	<div class="drawer">
		<div class="drawer__container" v-auto-animate>
			<h2 class="drawer__title" v-auto-animate>
				<button v-if="cart.length > 0" @click="drawerOpened = false" class="drawer__back-button">
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
				</button>
				<span>Корзина</span>
			</h2>
			<div
				v-show="(cart.length > 0) & !orderSent"
				class="drawer__items"
				:style="orderSending ? 'overflow:hidden' : 'overflow:auto'"
				v-auto-animate
			>
				<CartList />
				<div class="drawer__spinner animate__animated animate__fadeIn" v-show="orderSending">
					<semipolar-spinner :animation-duration="2000" :size="100" color="#8BB43C" />
				</div>
			</div>
			<p v-if="cart.length > 0" class="drawer__summ summ">
				<span class="summ__position">Итого:</span>
				<span class="summ__divider"></span>
				<span class="summ__price">{{ numberWithSpaces(parseInt(summAnimated)) }} грн.</span>
			</p>
			<p v-if="cart.length > 0" class="drawer__summ summ">
				<span class="summ__position">Налог 5%:</span>
				<span class="summ__divider"></span>
				<span class="summ__price">{{ numberWithSpaces(parseInt(summAnimated * 0.05)) }} грн</span>
			</p>
			<button
				v-if="cart.length > 0"
				@click="makeOrder"
				:disabled="orderSending"
				class="drawer__order-button"
			>
				Оформить заказ
				<svg
					class="drawer__order-button-arrow"
					width="16"
					height="14"
					viewBox="0 0 16 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 7H14.7143"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8.71436 1L14.7144 7L8.71436 13"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<InfoBlock
				:img-url="'./img/package-icon.png'"
				:title="'Корзина пустая'"
				:subtitle="'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'"
				class="drawer__info"
				v-if="(cart.length == 0) & !orderSent"
			/>
			<InfoBlock
				:img-url="'./img/order-success-icon.png'"
				:title="'Заказ оформлен!'"
				:green-title="true"
				:subtitle="`Ваш заказ #${orderNum} скоро будет передан курьерской доставке`"
				class="drawer__info _order"
				v-else-if="(cart.length == 0) & orderSent"
			/>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use 'animate.css';
.drawer {
	position: fixed;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 21;
	max-width: 100vw;
	width: 385px;
	&__container {
		height: 100%;
		background: #fff;
		box-shadow: -10px 4px 24px 0px rgba(0, 0, 0, 0.1);
		position: relative;
		padding: 30px;
		display: flex;
		flex-direction: column;
		gap: 25px;
	}
	&__title {
		display: flex;
		gap: 20px;
		color: #000;
		font-family: Inter;
		font-size: 32px;
		font-weight: 700;
		align-items: center;
		margin: 0 0 5px;
	}
	&__back-button {
		position: relative;
		flex-shrink: 0;
		height: 35px;
		width: 35px;
		border-radius: 7.5px;
		border: 1px solid #f2f2f2;
		transition: $tr-time;
		color: #c8c8c8;
		background: transparent;
		@include hover {
			border: 1px solid rgba(92, 92, 92, 0.5);
			background: rgba(92, 92, 92, 0.1);
			color: rgba(92, 92, 92, 0.8);
		}
	}
	&__items {
		flex: 1 1 auto;
		// overflow: auto
		margin: 0 -10px 0;
		padding: 0 10px 0;
		position: relative;
	}
	&__spinner {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		@include centered;
		backdrop-filter: blur(2px);
	}
	&__order-button {
		border-radius: 18px;
		background: #9dd458;
		height: 55px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-family: Inter;
		font-size: 16px;
		font-weight: 600;
		transition: $tr-time;
		flex-shrink: 0;
		@include hover {
			box-shadow: 0 0 5px #9dd458;
		}
		&:disabled,
		&:active {
			transition: $tr-time;
			background: gray;
			box-shadow: none;
		}
		&:disabled {
			cursor: default;
		}
		&-arrow {
			position: absolute;
			top: 50%;
			right: 0;
			translate: -200% -50%;
		}
	}
	&__info {
		margin: auto 50px;
		&._order {
			margin: auto 20px;
		}
	}
}
.summ {
	color: #000;
	font-family: Inter;
	font-size: 16px;
	font-weight: 400;
	display: flex;
	gap: 8px;
	align-items: baseline;
	// &__position
	&__divider {
		flex: 1 1 auto;
		border-bottom: 1px dashed #dfdfdf;
	}
	&__price {
		font-weight: 600;
	}
}
.animate__animated {
	--animate-duration: 0.3s;
}
</style>
