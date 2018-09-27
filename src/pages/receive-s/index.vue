<!-- 礼物记录 -->
<template>
  <div class="container">
    <view class='success'>
        <image src='/static/image/ling_cgong.png' class='cheng'></image>
        <view class='success_a'>成功领取！</view>
        <view class='success_b'>恭喜您成功领取"Fun享礼",请点击前往使用</view>
        <!-- <view class='success_b'>若未关注公众号请按一下指引操作</view> -->
      </view>

      <view class='btn'>
        <button class='qian' @click="addressPage">
          <image src='/static/image/tk_wenhao_icon.png' class='wen'></image>
          <span class="btn-text">前往使用</span>
        </button>
        <div class='song' @click='indexPage'>我也要送</div>
      </view>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiCheckCode } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      orderId: '',
      code: ''
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
    this.code = ''
    this.orderId = this.$mp.query.orderId
    this.checkUserCode()
  },
  methods: {
    indexPage(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    checkUserCode(){
      apiCheckCode({
        unionId: wx.getStorageSync('unionid')
      })
      .then((res)=>{
        console.log('user-code',res)
        this.code = res.attstate
      })
    },
    addressPage(){
      if(this.code == '-10113'){
        wx.navigateTo({
          url: '/pages/receive-t/main?orderId='+this.orderId
        })
      }else{
        // wx.navigateTo({
        //   url: '/pages/attention/main'
        // })
        wx.navigateTo({
          url: '/pages/receive-t/main?orderId='+this.orderId
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 1px;
  box-sizing: border-box;
}
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
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}
.btn .song{
  color:#fda929;
  background-color:#ffffff;
  font-size:35rpx;
  border:1px solid #fda929;
  border-radius:50rpx;
  margin-top:50rpx;
  height: 86rpx;
  line-height: 86rpx;
  text-align: center;
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
  margin-right: 10rpx;
}
.btn-text{
  margin-left: 10rpx;
}
</style>
