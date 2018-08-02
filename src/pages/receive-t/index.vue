<!-- 收货地址 -->
<template>
  <div class="container">
    <view class='fen' style='margin-top: 50rpx;'>
        <text class='fen_a'>收货人：</text>
        <input type="text" class='fen_b'></input>
    </view>
    <view class='fen'>
        <text class='fen_a'>手机号码：</text>
        <input type="number" confirm-type="done" class='fen_b' style='width:63%;'></input>
        <image src='/static/image/cha.png' class='cha' @click="clearInput"></image>
    </view>
    <view class='fen'>
        <text class='fen_a'>收货地址：</text>
        <picker class='fen_b' mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <view class="picker">
            {{region[0]}} {{region[1]}} {{region[2]}}
          </view>
        </picker>
    </view>
    <view class='fen'>
        <text class='fen_a'>详细地址：</text>
        <textarea placeholder="请输入详细地址和街道" class='fen_b'></textarea>
    </view>
      
    <button class='ti'>提交</button>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {
      region: ['广东省', '广州市', '天河区'],
      customItem: '全部',
      userInput: '',
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
    bindRegionChange(e){

    }
  }
}
</script>

<style lang="scss" scoped>
.fen{
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #dcdcdc;
  padding: 25rpx 0;
  background-color: #fdfdfd;
}
.fen .fen_a{
  width: 29%;
  text-align: end;
  font-size: 35rpx;
}
.fen .fen_b{
  width: 70%;
  font-size: 35rpx;
}
.ti{
  width: 85%;
  background-color:#fda929;
  color:white;
  font-size:35rpx;
  border-radius:50rpx;
  margin-top: 50rpx;
}
.cha{
  display: inline-block;
  width:30rpx;
  height:30rpx;
  margin-top:10rpx;
  margin-right:20rpx;

}
</style>
