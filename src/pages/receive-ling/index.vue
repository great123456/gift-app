<!-- 立乐礼 -->
<template>
  <div class="container">
    <view class='mask'>a</view>
      <view class='modalDlg'>
        <view class='bg'>
          <image src='/static/image/tk_top_bg.png' style='height:100%;width:100%;'></image>
        </view>
        <view class="tou">
          <image src='/static/image/touxiang_da.png' class='tou_da'></image>
          <text class="nema">小黄</text>
        </view>
        <view class='song'>送你一份立乐礼包，点击领取</view>
        <text class='shici'>啊啊阿啊阿啊阿啊阿啊阿啊阿啊啊啊啊阿啊阿啊阿啊啊啊阿啊阿啊阿啊阿啊阿啊阿啊哈哈哈哈哈哈哈哈哈啊阿啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈</text>
        <image src="/static/image/btn.png" class="ling" @click='receive'></image>
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
.mask{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  background:#000;
  z-index:9000;
  opacity:0.4;

}
.modalDlg {
  height:840rpx;
  position:fixed;
  top:14%;
  left:50%;
  transform:translateX(-50%);
  z-index:9999;
  background-color:#fff;
  border-radius:20rpx;
  display:flex;
  flex-direction:column;
  align-items:center;
  width:615rpx;

}
.bg{
  border-top-right-radius:36rpx;
  border-top-left-radius: 36rpx;
  display: inline-block;
  width: 100%;
  height: 234rpx;
  background-size: 100%;
}
.tou{
  display: inline-block;
  width: 200rpx;
  height: 300rpx;
  position: absolute;
  top: 130rpx;

}
.nema{
  width: 100%;
  text-align: center;
  display: inline-block;
  font-size: 35rpx;
}
.tou_da{
  display: inline-block;
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
}
.song{
  font-size: 30rpx;
  color: #FEB21E;
  position: absolute;
  top: 400rpx;
}
.shici {
  font-size:30rpx;
  text-align:center;
  width:80%;
  display:inline-block;
  height:125rpx;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  overflow:hidden;
  position: absolute;
  top: 450rpx;
}
.ling{
  display: inline-block;
  width: 181rpx;
  height: 181rpx;
  position: absolute;
  top: 600rpx;
}
.cha{
  display:inline-block;
  width:61rpx;
  height:61rpx;
  position:absolute;
  top:-15rpx;
  right:-15rpx;

}

</style>
