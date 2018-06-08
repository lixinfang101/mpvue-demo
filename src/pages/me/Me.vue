<template>
  <div class="container">
    <!-- <div class="userinfo" @click="login">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div> -->

    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">登录</button>

    <year-progress></year-progress>

    <button class="btn" @click="scanBook">添加图书</button>
  </div>
</template>

<script>
    import qcloud from 'wafer2-client-sdk'  //微信小程序客户端腾讯云增强SDK，为小程序客户端开发提供SDK支持会话服务和信道服务
    
    import YearProgress from '../../components/YearProgress.vue'
    import {get,showSuccess} from '@/util'
    import config from '@/config'

    export default{
        data(){
            return {
              userinfo : {
                avatarUrl : '../../../static/img/unlogin.png',
                nickName : '点击登录'
              }
            }
        },
        components : {
          'year-progress' : YearProgress
        },
        methods : {
            login(e){
              let that = this;
              //qcloud.setLoginUrl(config.loginUrl);
              wx.login({
                success : function(loginResult){
                  let loginParams = {
                    code : loginResult.code,
                    encryptedData : e.mp.detail.encryptedData,
                    iv : e.mp.detail.iv
                  };

                  //qcloud.setLoginUrl(config.loginUrl);

                  qcloud.requestLogin({
                    loginParams,
                    success(){
                      showSuccess('登录成功');
                     // that.setStorageSync('userinfo',);
                    },
                    fail(error){
                      console.log('登录失败-inner',error);
                    }
                  });
                },
                fail : function(loginError){
                  console.log('登录失败-outer',loginError);
                }
              });
            },
            scanBook(){
              wx.scanCode({
                onlyFromCamera: true,
                success: (res) => {
                  console.log("res=============",res);
                }
              });
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
  }
</style>
