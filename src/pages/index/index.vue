<!-- 首页 -->
<template>
  <div class="container">
    <div class="swiper-content">
      <swiper :indicator-dots="indicatorDots"
      :autoplay="autoplay" :interval="interval" @change="currentChange" :circular="circular" :duration="duration" indicator-active-color="#fda929"indicator-color="#ffffff" style="height:440rpx;">
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item.fileURL" class="slide-image" @click="bannerDetail(item.outURL)" />
          </swiper-item>
        </block>
      </swiper>
      <div class="dot-list">
        <div class="dot" v-for="(dot,dex) in imgUrls" :key="dex" :class="currentIndex == dex?'active':''"></div>
      </div>
    </div>

    <view class='family' v-for="(label,dex) in listLabel" :key="dex">
     <view class='familys'>{{label.label}}</view>
      <block v-for="(item,index) in label.data" :key="index">
        <view class='main' @click="detailPage(item.id)">
          <image :src="item.cover" class="picB">
          </image>
          <view class="main_p">{{item.NAME}}</view>
        </view>
      </block>
    </view>

    <!-- <view class='family'>
     <view class='familys'>为朋友点赞</view>
      <block v-for="(item,index) in lists" :key="index">
        <view class='main' @click="detailPage(item.id)">
          <image :src="item.cover" class="picB">
          </image>
          <view class="main_p">{{item.name}}</view>
        </view>
      </block>
    </view>

    <view class='family'>
     <view class='familys'>致尊敬的前辈</view>
      <block v-for="(item,index) in listser" :key="index" @click="detailPage(item.id)">
        <view class='main' @click="detailPage(item.id)">
          <image :src="item.cover" class="picB">
          </image>
          <view class="main_p">{{item.name}}</view>
        </view>
      </block>
    </view> -->


    <view class='userProtocol'>
      <button class='userProtocolBook' @click="agreementPage"> <image src='/static/image/sy_yhxy.png' class='tan'></image> 用户协议</button>
    </view>


      <!-- <open-data type="userAvatarUrl"></open-data> 
      <open-data type="userNickName"></open-data> -->
      <!-- 需要使用 button 来授权登录 -->

    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="user-btn" v-show="showInfoBtn"></button>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { allCardList,apiUserCodeLogin,apiIndexBanner } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      imgUrls: [],
      listLabel: [],
      lists: [],
      listser: [],
      autoplay: true,
      circular: true,
      indicatorDots: false,
      currentIndex: 0,
      interval: 3000,
      duration: 1000,
      channel: 'scrabbleProgram',
      appsecret: 'bce38bd8c953ffd6f94c4a96b252accb',
      appid: 'wx59e86e594123f552',
      advertisingChannel: 'TR',
      baseUrl: 'https://giftcard.hm.liby.com.cn/lilejia/upload/cover/',
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      labellist:[],
      labels:{},
      num: 0,
      code: '',
      showInfoBtn: false
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
      this.showInfoBtn = true
    }
    //this.getUserInfo()
    this.getCardList()
    this.getBannerList()
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          apiUserCodeLogin({
            code: res.code
          })
          .then((res)=>{
             console.log('login',res)
             wx.setStorageSync('openid', res.openid)
             wx.setStorageSync('session_key', res.session_key)
          })
        }
      })
    },
    currentChange(e){
      // console.log('current',e)
      this.currentIndex = e.mp.detail.current
    },
    getCardList(){
      // this.listLabel = []
      // this.lists = []
      // this.listser = []
      const self = this
      allCardList()
      .then((res)=>{
        wx.hideLoading()
        if(res.code == '200'){
          let list = res.res
          for(let i = 0;i<list.length;i++){
            for(let j = 0;j<list[i].data.length;j++){
              list[i].data[j].cover = this.baseUrl + list[i].data[j].cover.split(',')[0]
            }
          }
          console.log('list',list)
          self.listLabel = list
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    bindGetUserInfo(e){
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      this.showInfoBtn = false
    },
    getBannerList(){
      apiIndexBanner()
      .then((res)=>{
        console.log('banner',res)
        this.imgUrls = res.data.advertisingInfo
      })
    },
    bannerDetail(url){
      console.log('url',url)
      if(url == ''){
        wx.showToast({
          title: '无礼品卡ID',
          icon: 'none',
          duration: 2000
        })
        return
      }
      let id = url.split('=')[1]
      console.log('id',id)
      this.detailPage(id)
    },
    detailPage(id){
      // wx.navigateTo({
      //   url: '/pages/receive-t/main'
      // })
      // return
      wx.navigateTo({
        url: '/pages/details/main?id='+id
      })
    },
    agreementPage(){
      wx.navigateTo({
        url: '/pages/agreement/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-content{
  position: relative;
}
.dot-list{
  position: absolute;
  bottom: 26rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  div{
    width: 25rpx;
    height: 25rpx;
    border-radius: 100%;
    background: #ffffff;
    margin-left: 10rpx;
    margin-right: 10rpx;
  }
}
.active{
  width: 35rpx !important;
  height: 22rpx !important;
  border-radius: 20rpx !important;
  background: #fda929 !important;
}
.slide-image{
  width: 100%;
  height: 100%;
}
.family{
  margin-top:60rpx;
  padding-left:0rpx;
  width: 100%;
  height: 100%;
  clear:both;
  display: inline-block;
}
.familys{
  color:#333333;
  font-size:30rpx;
  margin-left:50rpx;
}
.main{
  width:300rpx;
  height:257rpx;
  float:left;
  margin-left:50rpx;
  background-color:white;
  border-radius:20rpx;
  box-shadow:0px 0px 8rpx rgba(0,0,0,0.1);
  margin-top:35rpx;

}
.picB{
  width:300rpx;
  height: 200rpx;
  border-radius:20rpx;

}
.main_p{
  width:300rpx;
  height:35rpx;
  font-size:26rpx;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  text-align:center;
  background-color:white;
  box-sizing: border-box;
  color: #fd9c2f;
  line-height: 35rpx;
  position: relative;
  top: 10rpx;
}
.userProtocol{
  text-align:center;
  margin-top:60rpx;

}
.userProtocolBook{
  display:inline-flex;
  color:#999999;
  font-size:28rpx;
  border-radius:40rpx;
  background-color:white;
  border:0;
  box-shadow:0px 0px 8rpx rgba(0,0,0,0.2);
  width:220rpx;
  margin-bottom:60rpx;
  align-items: center;
}
.tan{
  width:30rpx;
  height:30rpx;
  display:inline-block;
  margin-right: 10rpx;
}
.user-btn{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  box-sizing: border-box;
  z-index: 9999;
  opacity: 0;
}
</style>
