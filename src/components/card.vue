<template>
  	<a :href="detailUrl">
	  <div class="book-card">
	    <div class="thumb">
	    	<img :src="book.image" class="img" mode="aspectFit">
	    </div>
	    <div class="detail">
	    	<div class="row">
	    		<div class="row-title text-color">{{book.title}}</div>
	    		<div class="row-rate right text-color">{{book.rate}}<v-rate :score="book.rate"/></v-rate></div>
	    	</div>
	    	<div class="row">
	    		<div class="left" style="width:135px;">{{book.author}}</div>
	    		<div class="right text-color">浏览量：{{book.count}}</div>
	    	</div>
	    	<div class="row">
	    		<div class="left">{{book.publisher}}</div>
	    		<div class="right">{{book.user_info.nickName}}</div>
	    	</div>
	    </div>
	  </div>
  	</a>
</template>

<script>
import Rate from '@/components/Rate.vue';

export default {
  props: ['book'],
  components : {
  	'v-rate' : Rate
  },
  computed : {
  	detailUrl(){
  		return '/pages/detail/main?id=' + this.book.id
  	}
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>
.book-card{
    padding:10rpx;
    overflow:hidden;
    margin-top:10rpx;
    margin-bottom:10rpx;
    .text-color{
    	color:#EA5149;
    }
    .thumb{
        width:180rpx;
        height:180rpx;
        float:left;
        margin:0 auto;
        overflow:hidden;
        .img{
            max-height:100%;
            max-width:100%;
        }
    }
    .detail{
    	margin-left:200rpx;
    	font-size:28rpx;
    	.row{
    		line-height:40rpx;
    		margin-bottom:6rpx;
    		.left{
    			float:left;
	    		margin-right:130rpx;
	    	}
    		.right{
	    		float:right;
	    	}
	    	.row-title{
	    		width:60%;
	    		float:left;
	    	}
	    	.row-rate{
	    		width:40%;
	    		text-align:right;
	    	}
    	}
    }
}
</style>
