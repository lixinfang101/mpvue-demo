<template>
	<div>
		<bookinfo :book="book" :tags="tags" :summary="summary"/>
		<div class="comment">
			<textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书短评"></textarea>
			<div class="location">
				地理位置：
				<switch color="#EA5A49" @change="getGeo"></switch>
				<span class="text-primary">{{location}}</span>
			</div>
			<div class="phone">
				手机型号：
				<switch color="#EA5A49" @change="getPhone"></switch>
				<span class="text-primary">{{phone}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {get} from '@/util'
	import BookInfo from '@/components/BookInfo.vue'

	export default{
		data(){
			return {
				bookid : '',
				book : {},
				comment : '',
				phone : '',
				tags : [],
				summary : ''
			}
		},
		methods : {
			async getBookDetail(id){
				let book = await get('/weapp/bookdetail?bookid=' + id);
				this.book = book;
				this.tags = book.tags.split(',');
				this.summary = book.summary;
			},
			getGeo(e){

			},
			getPhone(e){
				if(e.target.value){	//选中状态
					let phoneInfo = wx.getSystemInfoSync();
					this.phone = phoneInfo.model;
				}else{	//未选中
					this.phone = '';
				}
			}
		},
		mounted(){
			//获取上一页面传递到该页面的id值
			this.bookid = this.$root.$mp.query.id;
			this.getBookDetail(this.bookid);
			//设置页面标题

		},
		components : {
			bookinfo : BookInfo
		}
	}
</script>

<style lang="scss" scoped>
	.text-primary{
		color:#EA5A49;
	}
	.comment{
		font-size:32rpx;
		margin-top:20rpx;
		.textarea{
			width:730rpx;
			height:200rpx;
			background:#eee;
			padding:10rpx;
		}
		.phone{
			margin-top:20rpx;
			padding:10rpx 20rpx;
		}
		.location{
			margin-top:20rpx;
			padding:10rpx 20rpx;
		}
	}
</style>