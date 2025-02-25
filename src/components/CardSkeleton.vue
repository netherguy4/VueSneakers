<script setup>
import { SkeletonBlock } from 'skeleton-elements/vue'
import 'skeleton-elements/css'
</script>

<template>
	<li class="item">
		<div class="item__container">
			<div class="item__image">
				<!-- <img class="item__image-img" :src="'/img' + imageUrl" :alt="title"> -->
				<skeleton-block class="item__image-img" effect="wave" />
			</div>
			<SkeletonBlock class="item__title" effect="wave" />
			<SkeletonBlock class="item__subtitle" effect="wave" />
			<div class="item__price">
				<SkeletonBlock effect="wave" class="item__price-block" />
				<SkeletonBlock effect="wave" class="buy-wrapper" />
			</div>
		</div>
	</li>
</template>

<style lang="scss" scoped>
* {
	--skeleton-color: rgba(246, 246, 246, 1);
}
.item {
	width: 100%;
	&__container {
		position: relative;
		padding: 35px 30px;
		border-radius: 40px;
		border: 1px solid #f3f3f3;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	&__image {
		user-select: none;
		position: relative;
		padding: 0 0 calc(91 / 150 * 100%);
		margin: 0 0 16px;
	}
	&-img {
		border-radius: 10px;
		@include image-fit;
		object-fit: contain;
	}
	&__title {
		height: 15px;
		border-radius: 3px;
		margin: 0 0 4px;
	}
	&__subtitle {
		height: 15px;
		max-width: 60%;
		border-radius: 3px;
		margin: 0 0 14px;
	}
	&__price {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}
	&-block {
		width: 80px;
		height: 24px;
		border-radius: 8px;
	}
	&__add-button {
		background: transparent;
		z-index: 2;
	}
	.buy {
		&-wrapper {
			width: 32px;
			height: 32px;
			position: relative;
			background: url(/img/plus.svg) center;
			border-radius: 8px;
		}
	}
}
</style>
