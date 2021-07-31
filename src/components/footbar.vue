<template>
  <view>
    <AtTabBar
      fixed
      :tabList="list"
      @click="handlerSearch"
      :current="currentPage"
    />
  </view>
</template>

<script>
import Taro from "@tarojs/taro"
export default {
  name: "FootBar",
  data(){
    return {
      list:[
        { title: '首页', iconType: 'home'},
        { title: '拍照', iconType: 'add' },
        { title: '我的', iconType: 'user' }
      ],
      currentPage:0
    }
  },
  methods:{
    handlerSearch(value){
      this.currentPage = value
      if (value==0){
        Taro.redirectTo({url:"/pages/login/index"})
      }else if (value==1){

      }else if (value==2){

      }
    }
  }
}
</script>

<style scoped>

</style>
