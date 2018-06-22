<template>
  <div class="container">
    <comment-list type="user" :comments="comments" v-if="userinfo.openId"></comment-list>
    <div v-if="userinfo.openId">
    	<div class="page-title">我的图书</div>
    	<Card v-for="book in books" :key="book.id" :book="book"></Card>
    	<div v-if="!books.length">暂时还没添加过书，快去添加几本书</div>
    </div>
  </div>
</template>

<script>
	
	import {get} from '@/util'
	import CommentList from '@/components/CommentList'
	import Card from '@/components/Card'

    export default{
        data(){
            return {
            	comments : [],
            	books : [],
            	userinfo : {}
            }
        },
        components : {
        	'comment-list' : CommentList,
        	Card
        },
        methods : {
        	init(){
        		wx.showNavigationBarLoading();
        		this.getComments();
        		this.getBooks();
        		wx.hideNavigationBarLoading();
        	},
        	async getComments(){
        		let comments = await get('/weapp/bookcomment?openid=' + this.userinfo.openId);
        		this.comments = comments;
        	},
        	async getBooks(){
        		let books = await get('/weapp/booklist?openid=' + this.userinfo.openId);
        		this.books = books.data;
        	}
        },
        onPullDownRefresh(){
        	this.init();
        	wx.stopPullDownRefresh();
        },
        onShow(){

        	if(!this.userinfo.openId){
        		let userinfo = wx.getStorageSync('userinfo');
        		if(userinfo){
        			this.userinfo = userinfo;
        			this.init();
        		}
        	}
        }
    }
</script>

<style scoped lang="scss">
	.page-title{
		font-size:30rpx;
		padding-left:30rpx;
	}
</style>
