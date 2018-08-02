<!-- 礼物记录 -->
<template>
  <div class="container">
    <view class='success'>
        <image src='/static/image/ling_cgong.png' class='cheng'></image>
        <view class='success_a'>成功领取！</view>
        <view class='success_b'>立乐礼包劵已通过公众号给您</view>
        <view class='success_b'>若未关注公众号请按一下指引操作</view>
      </view>

      <view class='btn'>
        <button class='qian'>
          <image src='/static/image/tk_wenhao_icon.png' class='wen'></image>
          前往使用
        </button>
        <button class='song' @click='hui9'>我也要送</button>
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
.success{
  display: block;
  text-align: center;
  margin-top: 200rpx;

}
.success .success_a{
  display: block;
  font-size: 50rpx;
  margin-top: 30rpx;
  margin-bottom: 20rpx;
}
.success .success_b{
  font-size: 30rpx;
  color: #666666;
}
.btn{
  width: 65%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 120rpx;

}
.btn .qian{
  background-color:#fda929;
  color:white;
  font-size:35rpx;
  border-radius:50rpx;
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.btn .song{
  color:#fda929;
  background-color:white;
  font-size:35rpx;
  border:1px solid #fda929;
  border-radius:50rpx;
  margin-top:50rpx;

}
.cheng{
  display: inline-block;
  width:110rpx;
  height:110rpx;
}
.wen{
  display: inline-block;
  width:35rpx;
  height:35rpx;
}
</style>
