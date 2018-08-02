<!-- 礼物记录 -->
<template>
  <div class="container">
    <view class='mask'></view>
      <view class='modalDlg' style='height:900rpx;'>
        <view class='bg'>
          <image src='/static/image/tk_top_bg.png' style='height:100%;width:100%;'></image>
        </view>
        <view class="tou">
          <image src='/static/image/touxiang_da.png' class='tou_da'></image>
          <text class="nema">小黄</text>
        </view>
        <view class='song'>送你一份立乐礼包，点击领取</view>
        <view class='success'>
          <view class='ninyi'>您已成功领取！</view>
          <view class='success_b'>立乐礼包劵已通过公众号给您</view>
          <view class='success_b'>若未关注公众号请按一下指引操作</view>
        </view>
        <view class='btn_a'>
          <button class='qian_a'>
            <image src='/static/image/tk_wenhao_icon.png' class='wen'></image>
            前往使用
          </button>
          <button class='song_a'>我也要送</button>
        </view>
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
.ninyi{
  display: block;
  font-size: 36rpx;
  margin: 15rpx 0;
}
.btn_a{
  width: 70%;
  margin-top: 30rpx;
}
.qian_a{
  color: white;
  background-color: #FDA929;
  border-radius: 50rpx;
  
}
.song_a{
  background-color: white;
  border-radius: 50rpx;
  color: #FDA929;
  border: 1px solid #FDA929;
  margin-top: 30rpx;
}
</style>
