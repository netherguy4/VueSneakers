<script setup>
import { inject } from 'vue'

const props = defineProps({
	id: Number,
	title: String,
	price: Number,
	imageUrl: String,
})

const cart = inject('cart')

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const onClickDelete = (e) => {
	e.preventDefault()
	const index = cart.value.findIndex((n) => n.id === props.id)
	if (index !== -1) {
		try {
			cart.value.splice(index, 1)
		} catch (err) {
			console.log(err)
		}
	}
}
</script>

<template>
	<li class="item">
		<div class="item__container _relative">
			<div class="item__img-wrapper _relative">
				<img :src="'./img' + imageUrl" :alt="title" class="item__img _absolute _contain" />
			</div>
			<ul class="item__list">
				<li class="item__title">{{ title }}</li>
				<li class="item__price">{{ numberWithSpaces(price) }} грн.</li>
			</ul>
			<button class="item__remove-button" @click="onClickDelete">
				<svg
					class="item__remove-button-img"
					viewBox="0 0 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
						fill="currentColor"
					/>
				</svg>
			</button>
		</div>
	</li>
</template>

<style lang="scss" scoped>
.item {
	&__container {
		padding: 20px 20px 30px;
		display: flex;
		gap: 20px;
		align-items: center;
		border-radius: 20px;
		border: 1px solid #f3f3f3;
		background: #fff;
		transition: cubic-bezier(0.68, -0.55, 0.265, 1.55) $tr-time;
		@include hover {
			border: 1px solid #f8f8f8;
			box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.05);
		}
	}
	&__img-wrapper {
		width: 70px;
		height: 70px;
		flex-shrink: 0;
	}
	&__list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		color: #000;
		font-family: Inter;
		font-size: 14px;
		font-weight: 400;
	}
	&__title {
		max-width: 150px;
	}
	&__price {
		font-weight: 700;
	}
	&__remove-button {
		position: absolute;
		right: 20px;
		bottom: 20px;
		width: 32px;
		height: 32px;
		border-radius: 7.5px;
		border: 1px solid #dbdbdb;
		background: transparent;
		color: #b5b5b5;
		transition: $tr-time;
		@include hover {
			border: 1px solid #fff;
			background: rgba(255, 0, 0, 0.77);
			color: #fff;
		}
	}
}
</style>
