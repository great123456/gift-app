<!-- 礼物记录 -->
<template>
  <div class="container">
    <view class='list_header'>
        <view class="list_title" :class="activeIndex == 0?'default':'selsect'" @click="tabClick(0)" >
            <view style='color:#666666'>{{dc}}</view>
              <view class='list_border' style="background-color:#fda929;" v-show='activeIndex == 0'><view>{{dc}}</view></view>
            </view>
            <view class="list_title" :class="activeIndex == 1?'default':'selsect'" @click="tabClick(1)">
              <view style='color:#666666'>{{wm}}</view>
              <view class='list_border' style="background-color:#fda929;" v-show='activeIndex == 1'><view>{{wm}}</view></view>
            </view>
    </view>

    <!-- 我收到的 -->
      <view v-show="activeIndex == 1" style='margin-top:100rpx;'>

          <block v-for="(item,index) in lister" :key="index">
          <view class="list" @click="detailPage(item.cardId)">
            <view class="list_imgbk2">
                <image :src="item.giftsCoverImg" class='li_tu'></image>
                <view class='list_biao'>
                  <view class='list_biao_haed'>{{item.cardName}}</view>
                  <text class='ling' style='color:#b5b6b7' v-show="item.address == null">未填写地址</text>
                  <text class='ling_a' v-show="item.address && item.orderStatus == '100'">已支付</text>
                  <text class='ling_a' v-show="item.address && item.orderStatus == '20'">待发货</text>
                  <text class='ling_a' v-show="item.address && item.orderStatus == '30'">已发货</text>
                  <text class='ling_a' v-show="item.address && item.orderStatus == '40'">已签收</text>
                  <text class='ling_a' v-show="item.address && item.orderStatus == '99'">待支付</text>
                  <text class='ling_a' v-show="item.address && item.orderStatus == '0'">审核不通过</text>
                  <text class='ling_a' v-show="item.address && item.orderStatus == '15'">待审核</text>
                </view>
                <view class='ding'>订单号:{{item.orderId}}</view>
                <view class='time'>{{item.createTime}}</view>

                <div v-if="item.address == null" style="padding-bottom: 30rpx;">
                  <button class='shou' @click.stop="addressPage(item)"> <text class='jia'>+</text><text>填写收货地址</text></button>
                </div>

                <view class='lq' v-show="item.address">
                  <view class='lr'>
                    <text>收货人</text>
                    <view style='display:inline-flex'>
                      <!-- <image :src='/static/image/touxiang_xiao.png' class='tou_x'></image> -->
                      <text>{{item.userName}} {{item.mobile}}</text>
                    </view>
                  </view>
                  <view class='ls'>
                    <text>收货地址</text>
                    <text>{{item.area}}{{item.address}}</text>
                    <!-- <p></p> -->
                  </view>
                  <!-- <view class='lu'>
                    <text>路居路2号人</text>
                  </view> -->
                </view>

            </view>
          </view>
          </block>
          <!-- 当lister为空数据的时候 -->
        <view class='wu' v-if="lister == ''">
            <image src='/static/image/lejl_nothing.png' class='kong'></image>
            <view class='haimei'>
              您还没有收到过礼品～
            </view>
        </view>
        </view>

      <!-- 我送出的 -->

        <view v-show="activeIndex == 0" style='margin-top:100rpx;'>
        <block v-for="(item,index) in list" :key="index">
          <view class="list" @click="successPage(item)">
            <view class="list_imgbk2">
                <image :src="item.giftsCoverImg" class='li_tu'></image>
                <view class='list_biao'>
                  <view class='list_biao_haed'>{{item.cardName}}</view>
                  <text class='ling' v-show="item.getState != 0">已领取</text>
                  <text class='ling_a' v-show="item.getState == 0 ">未领取</text>
                </view>
                <view class='ding'>订单号:{{item.orderId}}</view>
                <view class='time'>{{item.createTime}}</view>

                <view class='lq' v-if="item.getState !=0 ">
                  <view class='lr'>
                    <text>领取人</text>
                    <view style='display:inline-flex'>
                       <image :src="item.getHeadImg" class='tou_x'></image>
                      <text>{{item.getNickName}}</text>
                    </view>
                  </view>
                  <view class='ls'>
                    <text>领取时间</text>
                    <text>{{item.getTime}}</text>
                  </view>
                </view>

            </view>
          </view>
        </block>

        <!-- 当list为空数据的时候 -->
        <view class='wu' v-if="list == ''">
            <image src='/static/image/lejl_nothing.png' class='kong'></image>
            <view class='haimei'>
              您还没有送过礼品～
            </view>
            <view class='kuaiqu'>
              快去送礼品，表达你的心意吧！
            </view>
        </view>

      </view>


  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiGiftRecordList,apiCheckCode } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      tabs: ['我收到的', '我送出的'],
          wm: '我收到的',
          dc: '我送出的',
          baseUrl: 'https://giftcard.hm.liby.com.cn/lilejia/upload/cover/',
          activeIndex: 0,
          dndd: [],
          wmdd: [],
          color: '#fe8907',
          backgroundColor: '#fe8907',
          list: [],  //我送出的
          lister: [], //我领取的
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
    this.getGiftList(0)
    this.checkUserCode()
  },
  methods: {
    tabClick(num) {
      this.activeIndex = num
      this.getGiftList(num)
    },
    addressPage(item){
      if(item.orderStatus == '99'){
        wx.showToast({
          title: '订单未支付,请先完成支付',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if(this.code == '-10113'){
        wx.navigateTo({
          url: '/pages/receive-t/main?orderId='+item.orderId
        })
      }else{
        wx.navigateTo({
          url: '/pages/attention/main'
        })
      }
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
    successPage(item){
      if(item.getState == 0){
        wx.navigateTo({
          url: '/pages/success/main?orderId='+item.orderId
        })
      }else{
        wx.navigateTo({
          url: '/pages/details/main?id='+item.cardId
        })
      }
      
    },
    detailPage(id){
      wx.navigateTo({
        url: '/pages/details/main?id='+id
      })
    },
    getGiftList(num){
      apiGiftRecordList({
        openid: wx.getStorageSync('openid'),
        flag: num
      })
      .then((res)=>{
        if(res.code == 200){
          console.log('res',res)
          for(let i = 0;i<res.data.length;i++){
            res.data[i].giftsCoverImg = this.baseUrl + res.data[i].giftsCoverImg
          }
          if(num == 0){
            this.list = res.data
          }else{
            this.lister = res.data
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list_header{
  display: flex;
  font-size: 32rpx;
  height: 80rpx;
  background-color: white;
  line-height: 80rpx;
  position: fixed;
  width: 100%;
  z-index: 9999;
  top:0;

}
.list_title{
  width: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-top:1px solid #efefef;
}

.list_border{
  width: 100%;
  height: 100%;
  margin-top: -81rpx;
  color: white;
  
}
.list{
  display: flex;
  justify-content: center;
}
.list_imgbk2{
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
  border-radius: 25rpx;
  width: 600rpx;
  padding:30rpx 30rpx;
  padding-bottom: 6rpx;
  margin:20rpx 0;
  display: inline-block;
}
.li_tu{
  border-radius: 25rpx;
  width:44%;
  height: 170rpx;
  float: left;

}
.list_biao{
  display: inline-block;
  overflow: hidden;
  width:51%;
  height:150rpx;
  margin-left:30rpx;
  padding-top:20rpx;


}
.list_biao .list_biao_haed{
  font-size:32rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height:85rpx;
}
.list_biao .ling{
  font-size:25rpx;
  color: #0570fc;
}
.ling{
  color: #999999 !important;
}
.ding{
  font-size:26rpx;
  margin-top: 20rpx;
  color: #666666;
}
.time{
  font-size:26rpx;
  margin-top: 10rpx;
  color: #666666;
  margin-bottom: 25rpx;
}
.list_biao .ling_a{
  font-size:25rpx;
  color: #999999;
}
.ling_a{
  color: #fda929 !important;
}
.lq{
  border-top: 1px solid #dcdcdc;
  padding-top: 25rpx;
  padding-bottom: 30rpx;
}
.lq .lr{
  color: #666666;
  font-size:26rpx;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
.lq .ls{
  color: #666666;
  font-size:26rpx;
  margin-top: 15rpx;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
}
.shou{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50rpx;
  font-size: 30rpx;
  width: 385rpx;
  height: 89rpx;
  border: 1px solid #fda929;
  color: #fda929;
  background-color: white;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  
}
.shou .jia{
  color: #fda929;
  font-size:49rpx;
  height: 130rpx;
  display: inline-block;
  margin-right:15rpx;

}
.lq .lu{
  color: #666666;
  font-size:26rpx;
  display: inline-flex;
  justify-content: flex-end;
  width: 100%;
}
.tou_x{
  width:40rpx;
  height:40rpx;
  display:inline-block;
  margin-right: 15rpx;
  border-radius: 100%;
}
.wu{
  display:inline-block;
  width:100%;
  height:500rpx;
  text-align:center;
  margin-top:170rpx;

}
.kong{
  display: inline-block;
  width: 200rpx;
  height: 160rpx;
}
.haimei{
  font-size: 28rpx;
  color: #333333;
  margin-top: 40rpx;
}
.kuaiqu{
  font-size: 28rpx;
  color: #999999;
  margin-top: 10rpx;
}
</style>
