<script setup>
import OrdersListItem from './OrdersListItem.vue'

const props = defineProps({
	id: Number,
	totalPrice: Number,
	orderDate: Number,
	items: Array,
})

const date = new Date(props.orderDate)
const dateOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
}

function numberWithSpaces(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>

<template>
	<li class="order">
		<div class="order__info">
			<h6 class="order__title">Заказ #{{ id }}</h6>
			<time class="order__time" :datetime="date">{{ date.toLocaleString('ru', dateOptions) }}</time>
		</div>
		<ul class="order__container">
			<OrdersListItem
				class="order__item"
				v-for="item in props.items"
				:key="item.id"
				:id="item.id"
				:title="item.title"
				:price="item.price"
				:image-url="item.imageUrl"
			/>
		</ul>
		<div class="order__total">
			Всего: <b>{{ numberWithSpaces(totalPrice) }}</b> грн.
		</div>
	</li>
</template>

<style lang="scss" scoped>
.order {
	border-radius: 20px;
	border: 1px solid #f3f3f3;
	&__container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
		grid-auto-rows: minmax(150px, 200px);
		gap: 20px;
		padding: 0 20px 10px;
		margin: 0 -20px -10px;
	}
	&__info {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 20px 0 20px 20px;
		color: #000;
		font-family: Inter;
		font-size: 16px;
		font-weight: 400;
		line-height: 150%;
	}
	&__title {
		font-size: 20px;
		font-weight: 600;
	}
	&__time {
		opacity: 0.4;
	}
	&__total {
		color: #000;
		font-family: Inter;
		font-size: 18px;
		font-weight: 500;
		line-height: 150%;
		padding: 20px 0 0;
		text-align: right;
		opacity: 0.7;
	}
}
</style>
