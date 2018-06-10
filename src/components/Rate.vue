<template>
	<div class="rate">
		<span>☆☆☆☆☆</span>
		<div class="hollow" :style="style">★★★★★</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		props : ['score'],
		computed : {
			style(){
				return `width:${this.score/2}em`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rate{
		position:relative;
		display:inline-block;
		.hollow{
			position:absolute;
			display:inline-block;
			left:0;
			top:0;
			width:0;
			overflow:hidden;
		}
	}
</style>






