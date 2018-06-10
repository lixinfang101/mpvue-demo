<template>
  <div>
    <topSwiper :tops="tops"></topSwiper>
    <card v-for="book in booklist" :key="book.id" :book="book"/>
    <p v-if="!more" class="text-footer">没有更多数据</p>
  </div>
</template>

<script>
    import {get} from '@/util'
    import Card from '@/components/Card.vue'
    import TopSwiper from '@/components/TopSwiper.vue'

    export default{
        data(){
            return {
                booklist : [],
                more : true,
                page : 0,
                tops : []
            }
        },
        methods : {
        	async getBookList(init){

                if(init){
                    //首次获取数据
                    this.page = 0;
                    this.more = true;
                }

                //当前页面显示导航条加载动画
                wx.showNavigationBarLoading();
                let books = await get('/weapp/booklist?page='+this.page);
                
                //判断获取到的是否是最后的数据
                if(books.data.length < 10 && this.page > 0){
                    this.more = false;
                }

                if(init){
                    this.booklist = books.data;
                    //停止当前页面下拉刷新
                    wx.stopPullDownRefresh();
                }else{
                    this.booklist = this.booklist.concat(books.data);
                }

                //当前页面隐藏导航条加载动画
                wx.hideNavigationBarLoading();
            },
            async getBookTop(){
                let bookTops = await get('/weapp/booktop');
                this.tops = bookTops;
            }
        },
        onPullDownRefresh(){    //下拉刷新
            this.getBookList(true);
        },
        onReachBottom(){
            if(!this.more){
                //没有更多数据了
                return false;
            }else{
                this.page = this.page + 1;
                this.getBookList();
            }
        },
        mounted(){
            this.getBookList(true);
            this.getBookTop();
        },
        components : {
            card : Card,
            topSwiper : TopSwiper
        }
    }
</script>

<style scoped lang="scss" scoped>
    .text-footer{
        text-align:center;
        font-size:24rpx;
        margin-bottom:20rpx;
    }
</style>
