<!-- 收货地址 -->
<template>
  <div class="container">
    <view class='fen' style='margin-top: 50rpx;'>
        <text class='fen_a'>收货人：</text>
        <input type="text" class='fen_b' v-model="userName"></input>
    </view>
    <view class='fen'>
        <text class='fen_a'>手机号码：</text>
        <input type="number" confirm-type="done" class='fen_b' style='width:63%;' v-model="userNumber"></input>
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
        <textarea placeholder="请输入详细地址和街道" class='fen_b' v-model="address"></textarea>
    </view>
      
    <button class='ti' @click="submitSite">提交</button>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiReceiveSite,apiGetCRMList } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      region: ['广东省', '广州市', '天河区'],
      customItem: '全部',
      userName: '',
      userNumber: '',
      address: '',
      orderId: '',
      crmList: '',
      areaCode: ''
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
    this.orderId = this.$mp.query.orderId
    if(wx.getStorageSync('phone')){
      this.userNumber = wx.getStorageSync('phone')
    }
    this.getCRMList()
  },
  methods: {
    bindRegionChange(e){
      console.log('e',e)
      this.region = e.mp.detail.value
      let str = this.region[2]
      this.getCRMId(str)
    },
    getCRMList(){
      wx.showLoading({
        title: '加载中',
      })
      apiGetCRMList()
      .then((res)=>{
        wx.hideLoading()
        this.crmList = res.areaInfo
        this.getCRMId('天河区')
      })
    },
    getCRMId(str){
      for(let i = 0;i<this.crmList.length;i++){
        if(this.crmList[i].areaName == str){
          console.log('index',this.crmList[i]) 
          this.areaCode = this.crmList[i].id
        }
      }
    },
    submitSite(){
      console.log('areaCode',this.areaCode)
      if(this.userName == ''|| this.userNumber == '' || this.address == ''){
        wx.showToast({
          title: '请先完善信息再提交',
          icon: 'none',
          duration: 2000
        })
        return
      }
      apiReceiveSite({
        orderid: this.orderId,
        userName: this.userName,
        mobile: this.userNumber,
        area: this.region.join(','),
        address: this.address,
        areaCode: this.areaCode
      })
      .then((res)=>{
        if(res.code == 200){
          wx.showToast({
            title: '收货地址提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
             wx.switchTab({
               url: '/pages/index/main'
             })
          },1000)
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
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
  height: 88rpx;
  line-height: 88rpx;
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
