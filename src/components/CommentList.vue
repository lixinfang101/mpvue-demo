<template>
	<div class="comment-list">
		<div class="page-title" v-if="comments.length">评论</div>
		<div class="comment" v-for="item in comments" :key="item.id" @click="handleClick(item)">
			<div class="user">
				<div class="inline">
					<img :src="item.image" class="avatar" mode="aspectFit">
					{{item.title}}
				</div>
				<div class="right">
					{{item.location || '未知地点'}}
					<span class="text-primary">--</span>
					{{item.phone || '未知型号'}}
				</div>
			</div>
			<div class="comment">{{item.comment}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		props : ['comments','type'],
		methods : {
			handleClick(item){
				if(this.type === 'user'){
					wx.navigateTo({
						url : '/pages/detail/main?id=' + item.bookid
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.comment-list{
	background : #eee;
	font-size:28rpx;
	.page-title{
		padding-left:30rpx;
	}
	.comment{
		background:#fff;
		margin-bottom:20rpx;
		padding:10rpx 40rpx;
		.content{
			margin:20rpx 0;
		}
		.user{
			.inline{
				display:inline;
				.avatar{
					width:40rpx;
					height:40rpx;
					border-radius:50%;
					vertical-align:middle;
				}
			}
		}
	}
}
</style>