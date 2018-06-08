<template>
	<div class="progressbar">
		<progress percent="60" activeColor="#EA5A49" />
		<p>{{year}}年已经过去了{{days}}天，{{percent}}%，多看看书吧！</p>
	</div>
</template>

<script>
	export default{
		data(){
			return {};
		},
		computed : {
			year(){
				return new Date().getFullYear();
			},
			days(){
				//设置第一天
				let start = new Date();
				start.setMonth(0);
				start.setDate(1);

				let offset = new Date().getTime() - start.getTime();
				return parseInt(offset/1000/60/60/24) +1;
			},
			percent(){
				return (this.days * 100 / this.getDayOfYear()).toFixed(1);
			}
		},
		methods : {
			isLeapYear(){	//判断是否为闰年
				let year = new Date().getFullYear();
				if(year % 400 === 0){
					return ture;
				}else if(year % 4 === 0 && year % 100 !==0){
					return ture;
				}else{
					return false;
				}
			},
			getDayOfYear(){
				return this.isLeapYear() ? 366 : 365;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.progressbar{
		text-align:center;
		margin-top:10px;
		margin-bottom : 40px;
		width:100%;
		progress{
			margin-bottom:10px;
		}
		p{
			font-size:30rpx;
		}
	}
</style>