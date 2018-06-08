<template>
  <div>
    我是图书页面。
    <button open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo">获取用户信息</button>
  </div>
</template>

<script>
    export default{
        data(){
            return {}
        },
        methods : {
        	onGotUserInfo(e){
        		console.log(e.detail.errMsg)
    		  console.log(e.detail.userInfo)
    		  console.log(e.detail.rawData)
        	}
        }
    }
</script>

<style scoped>

</style>
