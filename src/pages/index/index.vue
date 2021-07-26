<template>
  <view class="index">
    <text>{{ msg }}</text>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'
import Taro from '@tarojs/taro'
import {login,getUserInfo} from '../../services/user'
export default {
  setup () {
    const msg = ref('Hello world')
    return {
      msg
    }
  },
  onReady(){
    Taro.checkSession({
      success: function () {
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      },
      fail: function () {
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      }
    })
  }
}
</script>
