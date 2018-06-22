<template>
	<div>
		<bookinfo :book="book" :tags="tags" :summary="summary" :avatarUrl="avatarUrl"/>
		<comment-list :comments="comments"></comment-list>
		<div class="comment" v-if="showAdd">
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
			<button class="btn" @click="addComment">评论</button>
		</div>
		<div v-else class="text-footer">
			未登录或者已经评论过了
		</div>
		<button class="btn" open-type="share">转发给好友</button>
	</div>
</template>

<script>
	import {get,post,showSuccess,showModal} from '@/util'
	import BookInfo from '@/components/BookInfo.vue'
	import CommentList from '@/components/CommentList.vue'

	export default{
		data(){
			return {
				bookid : '',
				book : {},
				comment : '',
				phone : '',
				location : '',
				tags : [],
				summary : '',
				userInfo : '',
				comments : [],
				avatarUrl : ''
			}
		},
		methods : {
			async addComment(){
				if(!this.comment){
					return ;
				}
				//请求后台接口，保存评论信息
				let data = {
					openid : this.userInfo.openId,
					bookid : this.bookid,
					comment : this.comment,
					phone : this.phone,
					location : this.location
				};

				let result = await post('/weapp/addcomment',{data});

				if(result.code == 0){
					this.comment = '';
					showSuccess('评论图书成功');
					this.getComments();
				}else{
					showModal('错误','评论图书失败');
				}
				
			},
			async getBookDetail(id){	//根据图书id，获取图书详情信息
				let book = await get('/weapp/bookdetail?bookid=' + id);
				this.book = book;
				this.avatarUrl = book.user_info.image;
				this.tags = book.tags;
				this.summary = book.summary;
				
				//设置详情页面标题
				wx.setNavigationBarTitle({
					title : this.book.title
				});
			},
			getGeo(e){
				let ak = 'GRGZOo9rmYVSzG8HU8SIsMEo9BZV2Y2y';
				let url = 'http://api.map.baidu.com/geocoder/v2/';

				if(e.target.value){
					wx.getLocation({
						success : (geo)=>{
							wx.request({
								url,
								data : {
									ak,
									location : `${geo.latitude},${geo.longitude}`,
									output : 'json'
								},
								success : (res)=>{
									if(res.data.status == 0){
										this.location = res.data.result.addressComponent.city;
									}
								}
							});
						}
					});
				}else{
					this.location = '';
				}
			},
			getPhone(e){
				if(e.target.value){	//选中状态
					let phoneInfo = wx.getSystemInfoSync();
					this.phone = phoneInfo.model;
				}else{	//未选中
					this.phone = '';
				}
			},
			async getComments(){	//获取这本书的所有评论
				let comments = await get('/weapp/bookcomment?bookid='+this.bookid);
				this.comments = comments;
			}
		},
		mounted(){
			//获取上一页面传递到该页面的id值
			this.bookid = this.$root.$mp.query.id;
			this.getBookDetail(this.bookid);
			this.getComments();
			this.phone = '';
			this.location = '';
			let user = wx.getStorageSync('userinfo');
			if(user){
				this.userInfo = user;
			}
		},
		components : {
			'bookinfo' : BookInfo,
			'comment-list' : CommentList
		},
		computed:{
			showAdd(){
				//没有登录
				if(!this.userInfo.openId){
					return false;
				}
				//当前用户已经评价过此书
				if(this.comments.filter(v=>v.openid === this.userInfo.openId).length){
					return false;
				}
				return true;
			}
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
	.btn{
		color:#fff;
		background:#EA5A49;
		margin-bottom:10rpx;
	}
	.text-footer{
		text-align:center;
		font-size:24rpx;
		margin-bottom:20rpx;
	}
</style>