<!-- 立乐礼 -->
<template>
  <div class="container" v-if="getState<=2">
    <view class='mask'></view>
      <view class='modalDlg'>
        <view class='bg'>
          <image src='/static/image/tk_top_bg.png' style='height:100%;width:100%;'></image>
        </view>
        <view class="tou">
          <image :src="orderObj.wxHeadImg" class='tou_da'></image>
          <text class="nema">{{orderObj.wxNickName}}</text>
        </view>

        <div v-show="getState == 0" style="width: 100%;padding:0rpx 50rpx;box-sizing: border-box;">
          <view class='song'>送你一份Fun享礼，点击领取</view>
          <text class='shici'>{{orderObj.bless}}</text>
          <!-- <image src="/static/image/btn.png" class="ling" @click='getSuccessPage'></image> -->
          
          <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="receive-btn" v-if="showUserInfo">领</button>
          <button class="receive-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="showPhoneNumber">领</button>
          
          <form @submit="submitInfo" report-submit='true' >
            <button form-type="submit" class="receive-btn" v-if="showReceiveBtn">领</button>
          </form>
        </div>
        
        <div v-show="getState == 1 || getState == 2">
          <view class='song'>Fun享礼已被ta领取</view>
          <div class="user-content">
            <image :src="orderObj.getHeadImg" class="get-image"></image>
            <div class="get-userInfo">
              <p class="getUserName">{{orderObj.getNickName}}</p>
              <p>已领取礼包</p>
            </div>
          </div>
          <div class="send-btn" @click="indexPage">我也要送</div>
        </div>

        <image src='/static/image/tk_guanbi_icon.png' class='cha' @click="indexPage"></image>
    </view>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiSearchOrderDetail,apiReceiveOrderResult,apiSearchUserInfo } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      orderId: '',
      orderObj: {},
      iv: '',
      encryptedData: '',
      showUserInfo: false,
      showPhoneNumber: false,
      showReceiveBtn: false,
      getState: 3,
      formId: ''
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
    wx.showLoading({
      title: '加载中',
    })
    if(!wx.getStorageSync('userInfo')){
      wx.authorize({
        scope: 'scope.userInfo',
        success() {
          wx.getUserInfo({
             success: function(res) {
               console.log('userinfo',res.userInfo)
               wx.setStorageSync('userInfo', res.userInfo)
             }
          })
        }
      })
    }
    if(!wx.getStorageSync('login')){
       this.getUserLogin()
    }
    this.judgeUserStatus()
    console.log('query',this.$mp.query)
    if(this.$mp.query.orderId){
      this.orderId = this.$mp.query.orderId
    }
    if(this.$mp.query.scene){
      this.orderId = this.$mp.query.scene
    }
    console.log('ling-orderId',this.orderId)
    this.getOrderDetail()
  },
  methods: {
    judgeUserStatus(){
      if(!wx.getStorageSync('userInfo')){
        this.showUserInfo = true
        this.showPhoneNumber = false
        this.showReceiveBtn = false
      }else if(!wx.getStorageSync('phone')){
        this.showUserInfo = false
        this.showPhoneNumber = true
        this.showReceiveBtn = false
      }else{
        this.showUserInfo = false
        this.showPhoneNumber = false
        this.showReceiveBtn = true
      }
    },
    getUserLogin () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          apiUserCodeLogin({
            code: res.code
          })
          .then((res)=>{
             console.log('ling-login',res)
             wx.setStorageSync('login', true)
             wx.setStorageSync('openid', res.openid)
             wx.setStorageSync('session_key', res.session_key)
             wx.setStorageSync('unionid', res.unionid)
          })
        }
      })
    },
    submitInfo(e) {
      console.log('formId',e.mp.detail.formId)
      this.receiveGift(e.mp.detail.formId)
    },
    indexPage(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    getSuccessPage(){
      wx.reLaunch({
        url: '/pages/receive-s/main?orderId='+this.orderId
      })
    },
    sitePage(){
      wx.reLaunch({
        url: '/pages/receive-t/main'
      })
    },
    receiveFailPage(){
      wx.reLaunch({
        url: '/pages/receive-m/main'
      })
    },
    bindGetUserInfo(e){
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      this.judgeUserStatus()
      if(!wx.getStorageSync('login')){
         this.getUserLogin()
      }
    },
    getPhoneNumber(e){
      this.iv = e.mp.detail.iv
      this.encryptedData = e.mp.detail.encryptedData
      if(!wx.getStorageSync('login')){
         this.getUserLogin()
      }
      this.getUserPhoneNumber()
    },
    getUserPhoneNumber(){
      apiSearchUserInfo({
        encryptedData: this.encryptedData,
        iv: this.iv,
        session_key: wx.getStorageSync('session_key')
      })
      .then((res)=>{
         if(res.phoneNumber){
           wx.setStorageSync('phone', res.phoneNumber)
           this.judgeUserStatus()
           wx.showToast({
             title: '授权成功',
             icon: 'success',
             duration: 2000
           })
         }
      })
    },
    receiveGift(formid){
      const self  = this
      if(this.getState != 0){
        this.receiveFailPage()
        return
      }
      apiReceiveOrderResult({
        orderid: this.orderId,
        getOpenId: wx.getStorageSync('openid'),
        getNickName: wx.getStorageSync('userInfo').nickName,
        getHeadImg: wx.getStorageSync('userInfo').avatarUrl,
        getMobile: wx.getStorageSync('phone'),
        getFormId: formid
      })
      .then((res)=>{
         console.log('receive',res)
         if(res.code == 200){
           wx.showToast({
             title: '领取成功',
             icon: 'success',
             duration: 2000
           })
           setTimeout(function(item){
             self.getSuccessPage()
           },1000)
         }else{
           wx.showToast({
             title: res.msg,
             icon: 'none',
             duration: 2000
           })
           self.receiveFailPage()
         }
      })
    },
    getOrderDetail(){
      apiSearchOrderDetail({
        orderid: this.orderId
      })
      .then((res)=>{
        if(res.code == 200){
          wx.hideLoading()
          console.log('order-detail',res)
          let userName = ''
          if(wx.getStorageSync('userInfo').nickName){
            userName = wx.getStorageSync('userInfo').nickName
          }
          if(res.data.getState ==1 && res.data.getNickName == userName){
            this.getSuccessPage()
            return
          }
          this.orderObj = res.data
          this.getState = res.data.getState
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  text-align: center;
}
.mask{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  background:#000;
  z-index:9000;
  opacity:0.4;
  text-align: center;
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
  text-align: center;
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
  width: 100%;
  height: 300rpx;
  position: absolute;
  top: 130rpx;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  padding: 0rpx 50rpx;
  box-sizing: border-box;
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
  text-align: center;
}
.song{
  font-size: 30rpx;
  color: #FEB21E;
  text-align: center;
  margin-top: 180rpx;
}
.shici {
  font-size:30rpx;
  text-align:center;
  width:100%;
  display:inline-block;
  height:125rpx;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  overflow:hidden;
  margin-top: 20rpx;
  color: #666666;
}
.ling{
  display: inline-block;
  width: 181rpx;
  height: 181rpx;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.receive-btn{
  display: inline-block;
  width: 181rpx;
  height: 181rpx;
  text-align: center;
  font-size: 100rpx;
  color: #ffffff;
  line-height: 181rpx;
  background:  #FEB21E;
  border-radius: 100%;
  margin-left: auto;
  margin-right: auto;
}
.cha{
  display:inline-block;
  width:61rpx;
  height:61rpx;
  position:absolute;
  top:-15rpx;
  right:-15rpx;
  text-align: center;
}
.send-btn{
  width: 370rpx;
  height: 88rpx;
  border-radius: 60rpx;
  text-align: center;
  line-height: 88rpx;
  font-size: 36rpx;
  color: #ffffff;
  background:  #FEB21E;
  margin-top: 60rpx;
  margin-left: auto;
  margin-right: auto;
}
.user-content{
  margin-top: 30rpx;
}
.get-image{
  width: 100rpx;
  height: 100rpx;
  border-radius: 100%;
  margin-left: 0rpx;
  display: inline-block;
}
.getUserName{
  font-size: 36rpx;
  color: #2c2d2f;
  margin-bottom: 10rpx;
}
.get-userInfo{
  display: inline-block;
  font-size: 32rpx;
  color: #b5b6b7;
  text-align: left;
  margin-left: 20rpx;
}
</style>
