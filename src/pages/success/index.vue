<!-- 立乐礼 -->
<template>
  <div class="container">
    <view class='head_text'>礼品卡准备好了，送给ta吧</view>
    <view class='ka'>
        <view class='head_text_a'>37度大气芳 <text style='color: #fd9827'>送出一份立乐礼包</text></view>
        <image :src="img" class='ka_tu'></image>
            <text class='shici'>{{zhufu}}</text>
        <button open-type="share" class='fa'>发送给好友</button>
        <button class='sheng' @click="generateBtnClick">生成海报去分享</button>
    </view>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {
      zhufu: '',
      img: ''
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
    generateBtnClick(){

    }
  }
}
</script>

<style lang="scss" scoped>
.head_text{
  color:#FB9801;
  text-align:center;
  margin:70rpx 0;
  font-size:40rpx;
  font-weight:bold;
  
}
.ka{
  background-color: white;
  border-radius: 20rpx;
  width: 574rpx;
  padding:30rpx 50rpx;
  margin:0 auto;
  height:888rpx;
  display:inherit;

}
.head_text_a{
  text-align: center;
  margin: 30rpx 0;
  margin-bottom: 1rem;
  font-size: 30rpx;
}
.ka_tu{
  border-radius:30rpx;
  width:545rpx;
  height:323rpx;
  margin:0 auto;
  display: block;
}
.shici{
  font-size:30rpx;
  text-align:center;
  width:100%;
  display:inline-block;
  height:125rpx;
  margin:30rpx 0;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  overflow:hidden;

}
.fa{
  background-color: #fe8907;
  color: white;
  font-size: 35rpx;
  border-radius: 50rpx;
}
.sheng{
  color: #fe8907;
  background-color: white;
  font-size: 35rpx;
  border: 1px solid #fe8907;
  border-radius: 50rpx;
  margin-top: 30rpx;
}
</style>
