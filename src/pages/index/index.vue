<template>
  <view class="index">
    <AtGrid :data="
      [
        {
          image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
          value: '领取中心',
          url:'/pages/login/index'
        },
        {
          image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
          value: '找折扣',
          url:'/pages/login/index'
        },
        {
          image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
          value: '领会员',
          url:'/pages/login/index'
        },
      ]"
      @click="handleClick"
    />
    <panel
      title="表单提交与重置"
      no-padding
    >
      <at-grid :data="codeList" :column-num="3"/>
    </panel>
  </view>
</template>

<script>
import './index.scss'
import Taro from '@tarojs/taro'
import {defineComponent,reactive,toRefs,onMounted,onBeforeMount} from 'vue'
import {getUserCode} from "../../services/code";

export default defineComponent({
  name:"index",
  setup () {
    const state = reactive({
      title:"1",
      codeList:[
        {
          image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
          value: '找折扣',
          url:'/pages/login/index'
        },
        {
          image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
          value: '领会员',
          url:'/pages/login/index'
        },
      ],
    })
    function handleClick(value, index) {
      Taro.switchTab({
        url:value.url
      })
    }
    onBeforeMount( ()=> {
      checkSession()
    })
    onMounted(async ()=>{
      await getCodeList()
    })

    function checkSession(){
      Taro.checkSession({
        success: function (res) {
          // Taro.redirectTo({
          //   url: '/pages/login/index'
          // })
        },
        fail: function () {
          Taro.redirectTo({
            url: '/pages/login/index'
          })
        }
      })
    }
    function getCodeList(){
      console.log("获取用户使用过的二维码")
      console.log(getUserCode())
      getUserCode().then((res)=>{
        const data = res.data.data
        state.codeList  = data.list.map(item =>{
          //TODO 接口改
          return {
            image:"",
            value:item.codeId
          }
        })
      })
    }
    return {
      ...toRefs(state),
      handleClick
    }
  },
  onLoad(query){
   //TODO 这里可以做跳转，获取到二维码的参数值
  }
})
</script>
