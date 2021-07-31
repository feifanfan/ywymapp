<template>
  <view>
    <button open-type="getUserInfo" @getuserinfo="getUserInfoAction">授权登录</button>
    <button open-type="getPhoneNumber" @bindgetphonenumber="getPhoneNumber">获取手机号</button>

  </view>
</template>

<script>

import {login,setUserInfo} from "../../services/user";
import Taro from '@tarojs/taro'
import {defineComponent} from "vue";

export default defineComponent({
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
    },
    //TODO 测试是否可用
    getPhoneNumber(e){
      console.log(e)
    }
  }
})
</script>

<style>

</style>
