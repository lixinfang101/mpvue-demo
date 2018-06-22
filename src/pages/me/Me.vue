<template>
  <div class="container">
    
    <div class="userinfo" @click="login" v-if="isLogin">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>

    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="login" class="btn marginTop" v-if="!isLogin">登录</button>

    <year-progress></year-progress>

    <button class="btn" @click="scanBook" v-if="isLogin">添加图书</button>
  </div>
</template>

<script>
    import qcloud from 'wafer2-client-sdk'  //微信小程序客户端腾讯云增强SDK，为小程序客户端开发提供SDK支持会话服务和信道服务
    
    import YearProgress from '../../components/YearProgress.vue'
    import {get , post , showSuccess , showModal} from '@/util'
    import config from '@/config'

    export default{
        data(){
            return {
              userinfo : {
                avatarUrl : '../../../static/img/unlogin.png',
                nickName : '点击登录',
                openId : ''
              },
              isLogin : false
            }
        },
        components : {
          'year-progress' : YearProgress
        },
        methods : {
            login(e){
              let self = this;
              let user = wx.getStorageSync('userinfo');
              if(!user){
                qcloud.setLoginUrl(config.loginUrl);
                qcloud.login({
                  success : userinfo=>{
                    qcloud.request({
                      url : config.userUrl,
                      login : true,
                      success(userRes){
                        showSuccess('登录成功');
                        self.isLogin = true;
                        self.userinfo = {
                          avatarUrl : userinfo.avatarUrl,
                          nickName : userinfo.nickName,
                          openId : userinfo.openId
                        };
                        wx.setStorageSync('userinfo',self.userinfo);
                      },
                      fail : (e)=>{
                        showModal('错误','登录失败');
                      }
                    });
                  },
                  fail : (err)=>{
                    showModal('错误','登录失败');
                  }
                });
              }

            },
            scanBook(){
              //只允许从照相机扫码
              wx.scanCode({
                onlyFromCamera: true,
                success: (res) => {
                  if(res.result){
                    this.addBook(res.result);
                  }
                }
              });

              /*
                9787111562108
                9787111460787
                9787115335500
                9787801830340
                9787111514428
                9787111514435
                9787111435938
                9787115275790
              */
              //this.addBook("9787111435938");
            },
            async addBook(isbn){
              let res = await post('/weapp/addbook',{isbn,openid : this.userinfo.openId});

              if(res.code === 0){
                showModal('添加成功',res.data.title);
              }else if(res.code === 1){
                showModal('添加失败',res.data.msg);
              }else if(res.code === -1){
                showModal('添加失败',res.data.msg);
              }
            }
        },
        mounted(){
          let userinfo = wx.getStorageSync('userinfo');
          if(userinfo){
            this.isLogin = true;
            this.userinfo = {
              avatarUrl : userinfo.avatarUrl,
              nickName : userinfo.nickName,
              openId : userinfo.openId
            };
          }
        }
    }
</script>

<style lang="scss">
  .container{
    padding : 0 30rpx;
    .userinfo{
      margin-top : 100rpx;
      text-align:center;
      img{
        width:150rpx;
        height:150rpx;
        margin:20rpx;
        border-radius:50%;
      }
    }
    .marginTop{
      margin-top:240rpx;
    }
    .btn{
      color:#fff;
      background:#EA5A49;
      margin-bottom:10rpx;
    }
  }
</style>
