<template>
	<div class="swiper">
		<swiper :indicator-dots='true' indicator-color='#EA5A49' :autoplay='true' 
		:interval='6000' :duration='1000' :circular='true'>
			<div v-for="(top,imgindex) in imgUrls" :key="imgindex">
				<swiper-item>
					<img class="slide-image" mode='aspectFit' v-for="img in top" :key="img.id" :src="img.image" @click='showBookDetail(img)'>
				</swiper-item>
			</div>
		</swiper>
	</div>
</template>

<script>
	export default{
		data(){
			return {

			}
		},
		props : ['tops'],
		methods : {
			showBookDetail(img){
				//页面跳转
				wx.navigateTo({
					url : '/pages/detail/main?id=' + img.id
				});
			}
		},
		computed : {
			imgUrls(){
				let res = this.tops;
				return [res.slice(0,3),res.slice(3,6),res.slice(6)];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper{
		margin-top:10rpx;
		.slide-image{
			width:33%;
			height:250rpx;
		}
	}
</style>