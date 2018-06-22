<template>
	<div class="bookinfo">
		<div class="thumb">
			<img :src="book.image" class="back"/>
			<img :src="book.image" class="img" mode="aspectFit"/>
			<div class="info">
				<div class="title">{{book.title}}</div>
				<div class="author">{{book.author}}</div>
			</div>
		</div>
		<div class="detail">
			<img :src="avatarUrl" class="avatar" mode="aspectFit">
			小木吒
			<div class="right text-primary">
				{{book.rate}}分
				<v-rate :score="book.rate"></v-rate>
			</div>
		</div>
		<div class="detail">
			出版社：{{book.publisher}}
			<div class="right">{{book.price}}</div>
		</div>
		<div class="tags">
			<div class="badge" v-for="tag in tags" :key="tag">{{tag}}</div>
		</div>
		<div class="summary">
			<p v-for="(item,xh) in summary" :key="xh">{{item}}</p>
		</div>
	</div>
</template>

<script>
	import Rate from '@/components/Rate.vue'

	export default{
		data(){
			return {

			}
		},
		props : ['book','tags','summary','avatarUrl'],
		components : {
			'v-rate' : Rate
		}
	}
</script>

<style lang="scss" scoped>
	.bookinfo{
		font-size:28rpx;
		.text-primary{
			color:#EA5A49;
		}
		.thumb{
			width:750rpx;
			height:500rpx;
			overflow:hidden;
			position:releative;
			.back{
				filter : blur(15px);
				width:100%;
			}
			.img{
				position:absolute;
				width:100%;
				height:300rpx;
				left:0;
				top:30rpx;
			}
			.info{
				color:#fff;
				position:absolute;
				width:100%;
				left:0;
				top:330rpx;
				text-align:center;
				.title{
					font-size:40rpx;
				}
				.author{
					font-size:28rpx;
				}
			}
		}
		.badge{
			display:inline-block;
			margin:10rpx;
			padding:10rpx;
			border-radius:20rpx;
			border:1px solid #EA5A49;
			color:#EA5A49;
		}
		.summary{
			padding:0 30rpx;
			margin-top:20rpx;
			p{
				text-indent:2em;
				font-size:28rpx;
			}
		}
		.right{
			float:right;
		}
		.detail{
			padding:10rpx 20rpx;
			.avatar{
				width:40rpx;
				height:40rpx;
				border-radius:50%;
				vertical-align:middle;
			}
		}
	}
</style>
