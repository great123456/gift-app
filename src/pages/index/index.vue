<!-- 首页 -->
<template>
  <div class="container">
    <swiper :indicator-dots="indicatorDots"
    :autoplay="autoplay" :interval="interval" :duration="duration" indicator-active-color="#fd9827"indicator-color="#fae3e8" style="height: 220px;">
      <block v-for="(item,index) in imgUrls" :key="index">
        <navigator url="/pages/logs/main">
        <swiper-item>
          <image :src="item" class="slide-image"  />
        </swiper-item>
        </navigator>
      </block>
    </swiper>

    <view class='family'>
     <view class='familys'>给家人的温暖</view>
      <block v-for="(item,index) in listLabel" :key="index">
        <view class='main'>
          <image :src="item.pic" class="picB">
          </image>
          <view class="main_p">{{item.name}}</view>
        </view>
      </block>
    </view>

    <view class='family'>
     <view class='familys'>为朋友点赞</view>
      <block v-for="(item,index) in lists" :key="index">
        <view class='main'>
          <image :src="item.pic" class="picB">
          </image>
          <view class="main_p">{{item.name}}</view>
        </view>
      </block>
    </view>

    <view class='family'>
     <view class='familys'>致尊敬的前辈</view>
     <block v-for="(item,index) in listser" :key="index">
     <navigator url="/pages/logs/logs?id=item.id">
      <view class='main'>
        <image :src="item.pic" class="picB">
        </image>
        <view class="main_p">{{item.name}}</view>
      </view>
      </navigator>
      </block>
    </view>


    <view class='userProtocol'>
      <button class='userProtocolBook' bindtap=''> <image src='/static/image/sy_yhxy.png' class='tan'></image> 用户协议</button>
    </view>


      <!-- <open-data type="userAvatarUrl"></open-data> 
      <open-data type="userNickName"></open-data> -->
      <!-- 需要使用 button 来授权登录 -->

   <!--  <button v-if="canIUse" open-type="getUserInfo" bindgetuserinfo="bindGetUserInfo">授权登录</button>
    <view v-else>请升级微信版本</view> -->

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { allCardList } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      imgUrls: [],
      listLabel: [],
      lists: [],
      listser: [],
      autoplay: true,
      indicatorDots: true,
      interval: 3000,
      duration: 1000,
      channel: 'scrabbleProgram',
      appsecret: '03ee84c357544f0db35bfa742ac73ac0',
      appid: 'wxd15ba91ad629ea69',
      advertisingChannel: 'TR',
      projectUrl: 'http://bcd9d1c9.ngrok.io/lilejia/upload/cover/',
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      labellist:[],
      labels:{},
      num: 0,
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
    this.getCardList()
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          // console.log('login',res)
          weixinLogin({
            accessCode: res.code
          })
          .then((res)=>{
            // console.log('res',res)
          })
          // wx.getUserInfo({
          //   success: (res) => {
          //     console.log('res',res)
          //     this.userInfo = res.userInfo
          //     wx.setStorageSync('userInfo', res.userInfo)
          //   },
          //   fail: (err)=>{
          //     console.log('err',err)
          //   }
          // })
        }
      })
    },
    getCardList(){
      this.listLabel = []
      this.lists = []
      this.listser = []
      const self = this
      allCardList()
      .then((res)=>{
        console.log('res', res.length)
        res.forEach(function(item){
          console.log('item', item)
           // item.cover = 'http://120.25.89.85:8084/lilejia/upload/cover/' + item.cover
        })
        console.log('item', this.listser)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
  height:30rpx;
  font-size:26rpx;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  text-align:center;
  background-color:white;
  box-sizing: border-box;
  color: #eb6100;
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
</style>
