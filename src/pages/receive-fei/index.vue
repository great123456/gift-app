<!-- 立乐礼 -->
<template>
  <div class="container">
    <view class='mask'></view>
      <view class='modalDlg' style='height:800rpx;'>
        <view class='bg'>
          <image src='/static/image/tk_top_bg.png' style='height:100%;width:100%;'></image>
        </view>
        <view class="tou">
          <image src='/static/image/touxiang_da.png' class='tou_da'></image>
          <text class="nema">小黄</text>
        </view>
        <view class='song'>送你1份立乐礼包，已被ta领取</view>
        <view class='tou-zu'>
          <image src='/static/image/touxiang_xiao.png' class='tou_xiao'></image>
          <view class='tou_text'>
            <text class='tou_text_a'>37度大气疯\n</text>
            <text class='tou_text_b'>已领取礼包</text>
          </view>
        </view>
        <button class='song_a' @click='hui9'>我也要送</button>
        <image src='/static/image/tk_guanbi_icon.png' class='cha'></image>
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
    
  }
}
</script>

<style lang="scss" scoped>
.tou-zu{
  display: inline-block;
  position: absolute;
  top: 465rpx;

}
.tou_xiao{
  display: inline-block;
  width: 100rpx;
  height: 100rpx;
  float: left;
  margin-right: 25rpx;
}
.tou_text{
  overflow: hidden;
}
.tou_text .tou_text_a{
  font-size: 35rpx;
}
.tou_text .tou_text_b{
  font-size: 28rpx;
  color: #666666;

}
.song_a{
  background-color: #FDA929;
  border-radius: 50rpx;
  color:white;
  margin-top: 30rpx;
  position: absolute;
  top: 580rpx;
  width: 60%;
}
</style>
