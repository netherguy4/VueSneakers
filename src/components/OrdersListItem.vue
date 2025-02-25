<script setup>
const props = defineProps({
	id: Number,
	title: String,
	price: Number,
	imageUrl: String,
})
</script>

<template>
	<li class="item">
		<div class="item__container">
			<div class="item__image-wrapper _relative">
				<img :src="'/img' + props.imageUrl" class="item__image _absolute _contain" />
			</div>
			<div class="item__caption">
				<div class="item__title">{{ title }}</div>
				<div class="item__price">{{ price }} грн.</div>
			</div>
		</div>
	</li>
</template>

<style lang="scss" scoped>
.item {
	border: 1px solid #f3f3f3;
	transition: $tr-time;
	border-radius: 20px;
	height: 100%;
	cursor: pointer;
	@include hover {
		background: #fff;
		border: 1px solid #f8f8f8;
		box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.075);
		height: 130%;
		z-index: 2;
		translate: 0 -10px;
		.item__caption {
			opacity: 1;
		}
	}
	&__container {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr 0.5fr;
		overflow: hidden;
	}
	&__image-wrapper {
		padding: 0 20px 20px;
		height: 100%;
		aspect-ratio: 1;
	}
	&__image {
		position: relative;
		z-index: -1;
	}
	&__caption {
		position: relative;
		z-index: 2;
		color: #000;
		font-family: Inter;
		font-size: 14px;
		font-weight: 400;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 0 20px;
		gap: 10px;
		aspect-ratio: 2/1;
		opacity: 0;
		transition: $tr-time;
		translate: 0 -40px;
	}
	&__price {
		font-weight: 700;
	}
}
</style>
