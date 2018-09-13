<!-- 收货地址 -->
<template>
  <div class="container">
    <view class='fen' style='margin-top: 50rpx;'>
        <text class='fen_a'>收货人：</text>
        <input type="text" class='fen_b' @input="getInputValue"></input>
    </view>
    <view class='fen'>
        <text class='fen_a'>手机号码：</text>
        <!-- <input type="number" confirm-type="done" class='fen_b' style='width:63%;' 
        @input="getPhoneNumber"></input> -->
        <input type="number" class='fen_b' style='width:63%;' 
        @input="getPhoneNumber"></input>
        <image src='/static/image/cha.png' class='cha' @click="clearInput"></image>
    </view>
    <view class='fen'>
        <text class='fen_a'>收货地址：</text>
        <picker class='fen_b' mode="region" @change="bindRegionChange">
          <view class="picker" style="font-size: 33rpx;">
            {{region[0]}} {{region[1]}} {{region[2]}}
          </view>
        </picker>
    </view>

    <view class='fen-textarea'>
        <span class="address_title">详细地址：</span>
         <textarea placeholder="请输入详细地址和街道" class="address_text" @input="getAddressValue"></textarea>
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
      regionValue: '广东省 广州市 天河区',
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
    this.region = ['广东省', '广州市', '天河区']
    this.orderId = this.$mp.query.orderId
    if(wx.getStorageSync('phone')){
      this.userNumber = wx.getStorageSync('phone')
    }
    if(wx.getStorageSync('crmList')){
      this.crmList = wx.getStorageSync('crmList')
      this.getCRMId('天河区')
    }else{
      this.getCRMList()
    }
    
  },
  methods: {
    bindRegionChange(e){
      console.log('e',e)
      this.region = e.mp.detail.value
      console.log('region',this.region)
      let str = this.region[2]
      this.getCRMId(str)
    },
    getAddressValue(e){
      this.address = e.mp.detail.value
    },
    getPhoneNumber(e){
      this.userNumber = e.mp.detail.value
    },
    getInputValue(e){
      this.userName = e.mp.detail.value
    },
    clearInput(){
      this.userNumber = ''
    },
    getCRMList(){
      wx.showLoading({
        title: '加载中',
      })
      apiGetCRMList()
      .then((res)=>{
        wx.hideLoading()
        this.crmList = res.areaInfo
        wx.setStorageSync('crmList', res.areaInfo)
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
      wx.showLoading({
        title: '地址提交中',
      })
      apiReceiveSite({
        orderid: this.orderId,
        userName: this.userName,
        mobile: this.userNumber,
        area: this.region.join(','),
        address: this.address,
        areaCode: this.areaCode
      })
      .then((res)=>{
        wx.hideLoading()
        if(res.code == 200){
          wx.showToast({
            title: '收货地址提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
             wx.setStorageSync('record',true)
             wx.switchTab({
               url: '/pages/gift-record/main'
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #dcdcdc;
  padding: 25rpx 0;
  background-color: #fdfdfd;
  align-items: center;
}
.fen-textarea{
  width: 100%;
  border-top: 1px solid #dcdcdc;
  padding: 25rpx 0;
  background-color: #fdfdfd;
  box-sizing: border-box;
  font-size: 34rpx;
  color: #666666;
  position: relative;
  height: 260rpx;
}
.fen_a{
  width: 29%;
  text-align: end;
  font-size: 35rpx;
}
.fen_b{
  width: 70%;
  font-size: 34rpx;
  color: #666666;
}
.address_title{
  width: 29%;
  text-align: right;
  font-size: 35rpx;
  display: inline-block;
}
.address_text{
  font-size: 34rpx;
  position: absolute;
  top: 0px;
  left: 30%;
  width: 70%;
  height: 260rpx;
  padding-top: 10rpx;
  padding-right: 20rpx;
  box-sizing: border-box;
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
