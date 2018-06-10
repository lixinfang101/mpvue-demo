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
    import {get , post , showSuccess , showModal} from '@/util'
    import config from '@/config'

    export default{
        data(){
            return {
              userinfo : {
                avatarUrl : '../../../static/img/unlogin.png',
                nickName : '点击登录',
                openId : '123'
              }
            }
        },
        components : {
          'year-progress' : YearProgress
        },
        methods : {
            login(e){
              let that = this;

              console.log(e.mp.detail.userInfo);

              let user = wx.getStorageSync('userinfo');

              if(!user){
                qcloud.setLoginUrl(config.loginUrl);
                qcloud.login({
                  success : userinfo=>{
                    qcloud.request({
                      url : config.userUrl,
                      login : true,
                      success(userRes){
                        console.log('登录成功',userinfo);
                        showSuccess('登录成功');
                        wx.setStorageSync('userinfo',userinfo);
                        self.userinfo = userRes.data.data;
                      },
                      fail : ()=>{
                        console.log('登录失败');
                      }
                    });
                  },
                  fail : (err)=>{
                    console.log("<<<<<<<<error========",err);
                  }
                });
              }

              //qcloud.setLoginUrl(config.loginUrl);
              // wx.login({
              //   success : function(loginResult){
              //     let loginParams = {
              //       code : loginResult.code,
              //       encryptedData : e.mp.detail.encryptedData,
              //       iv : e.mp.detail.iv
              //     };

              //     //qcloud.setLoginUrl(config.loginUrl);

              //     qcloud.requestLogin({
              //       loginParams,
              //       success(){
              //         showSuccess('登录成功');
              //        // that.setStorageSync('userinfo',);
              //       },
              //       fail(error){
              //         console.log('登录失败-inner',error);
              //       }
              //     });
              //   },
              //   fail : function(loginError){
              //     console.log('登录失败-outer',loginError);
              //   }
              // });
            },
            scanBook(){
              //只允许从照相机扫码
              // wx.scanCode({
              //   onlyFromCamera: true,
              //   success: (res) => {
              //     if(res.result){
              //       this.addBook(res.result);
              //     }
              //   }
              // });
              this.addBook("9787115275790");
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
