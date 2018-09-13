<!-- 关注公众号 -->
<template>
  <div class="container">
     <!-- <div class="code-container">
        <p class="code-title">关注[立乐家]公众号</p>
        <p>① 点击右上角[...] ”关注立乐家Fun享卡“</p>
        <p>② 点击”相关公众号“ 关注立乐家微服务</p>
     </div> -->
     <div class="code-image">
       <image src="/static/image/ydy.png" mode="widthFix"></image>
     </div>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {
      
    }
  },
  components: {

  },
  created () {
    
  },
  onUnload(){
    
  },
  computed: {
    
  },
  onShow(){
    wx.removeStorageSync('record')
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 1px;
  box-sizing: border-box;
  background: #999999;
}
.code-container{
  width: 600rpx;
  padding: 0rpx 30rpx;
  box-sizing: border-box;
  background: #ffffff;
  position: fixed;
  top: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  line-height: 65rpx;
  font-size: 32rpx;
  text-align: center;
  p{
    border-bottom: 1px solid #f5f5f5;
  }
}
.code-title{
  font-size: 36rpx;
  line-height: 70rpx;
}
.code-image{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  padding-left: 10rpx;
  padding-right: 10rpx;
  box-sizing: border-box;
  image{
    width: 100%;
  }
}
</style>
