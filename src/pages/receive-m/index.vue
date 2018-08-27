<!-- 立乐礼 -->
<template>
  <div class="container">
    <view class='yihan'>
        <image src='/static/image/ling_shibai.png' class='cheng'></image>
        <view class='yihan_a'>真遗憾没有抢到~</view>
        <button class='song' @click='indexPage'>我也要送</button>
    </view>
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
    
  },
  methods: {
    indexPage(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.yihan{
  position: relative;
  top: 350rpx;

}
.yihan .yihan_a{
  text-align: center;
  font-size: 50rpx;

}
.song{
  width: 65%;
  background-color:#fda929;
  color:white;
  font-size:35rpx;
  border-radius:50rpx;
  margin-top: 100rpx;
}
.cheng{
  display: inline-block;
  width:110rpx;
  height:110rpx;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top:-138rpx;

}

</style>
