<template>
  <view>
    <button open-type="getUserInfo" @getuserinfo="getUserInfoAction">授权登录</button>
    <button open-type="getPhoneNumber"></button>
    <uni-popup ref="popup" type="message">
      <uni-popup-message type="center" message="登陆成功" :duration="2000"></uni-popup-message>
    </uni-popup>
  </view>
</template>

<script>

import {login,setUserInfo} from "../../services/user";
import Taro from '@tarojs/taro'

export default {
  onReady(){
    console.log("登录开始")
    Taro.login({
      success:function (code){
        login(code.code).then(res=>{
          console.log(res.data.data.token)
          Taro.setStorage({
            key:"token",
            data:res.data.data.tokenHead+res.data.data.token
          })
        })
      }
    })
  },
  methods:{
    getUserInfoAction (e) {
      console.log(e.detail.userInfo);
      this.reg(e.detail.userInfo);
    },
    reg(userinfo){
      setUserInfo(userinfo)
    }
  }
}
</script>

<style>

</style>
