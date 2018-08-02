<!-- 礼物记录 -->
<template>
  <div class="container">
    <view class='list_header'>
        <view class="list_title" :class="activeIndex == 0?'default':'selsect'" @click="tabClick(1)" >
            <view style='color:#666666'>{{dc}}</view>
              <view class='list_border' style="background-color:#fe8907;" v-show='activeIndex == 1'><view>{{dc}}</view></view>
            </view>
            <view class="list_title" :class="activeIndex == 1?'default':'selsect'" @click="tabClick(0)">
              <view style='color:#666666'>{{wm}}</view>
              <view class='list_border' style="background-color:#fe8907;" v-show='activeIndex == 0'><view>{{wm}}</view></view>
            </view>
    </view>

    <!-- 我收到的 -->
      <view v-show="activeIndex == 0" style='margin-top:100rpx;'>

          <block v-for="(item,index) in lister" :key="index">
          <view class="list">
            <view class="list_imgbk2">
                <image :src="item.li_tu" class='li_tu'></image>
                <view class='list_biao'>
                  <view class='list_biao_haed'>{{item.list_biao_haed}}</view>
                  <text class='ling' style='color:#9aca27' v-show="item.ling != '未填写地址'">{{item.ling}}</text>
                  <text class='ling_a' v-show="item.ling != '配送中'">{{item.ling}}</text>
                </view>
                <view class='ding'>{{item.ding}}</view>
                <view class='time'>{{item.time}}</view>

                <navigator url="/pages/receive-t/main" v-if="item.ling == '未填写地址'">
                  <button class='shou'> <text class='jia'>+</text><text>填写收货地址</text></button>
                </navigator>

                <view class='lq' v-if="item.ling == '配送中'">
                  <view class='lr'>
                    <text>收货人</text>
                    <view style='display:inline-flex'>
                      <image src='/static/image/touxiang_xiao.png' class='tou_x'></image>
                      <text>戴惠民 1360000000</text>
                    </view>
                  </view>
                  <view class='ls'>
                    <text>收货地址</text>
                    <text>广东 广州市 天河区</text>
                  </view>
                  <view class='lu'>
                    <text>路居路2号人</text>
                  </view>
                </view>

            </view>
          </view>
          </block>
          <!-- 当lister为空数据的时候 -->
        <view class='wu' v-if="lister == ''">
            <image src='/static/image/lejl_nothing.png' class='kong'></image>
            <view class='haimei'>
              您还没有送过礼品～
            </view>
        </view>
        </view>

      <!-- 我送出的 -->

        <view v-show="activeIndex == 1" style='margin-top:100rpx;'>
        <block v-for="(item,index) in list" :key="index">
          <view class="list">
            <view class="list_imgbk2">
                <image :src="item.li_tu" class='li_tu'></image>
                <view class='list_biao'>
                  <view class='list_biao_haed'>{{item.list_biao_haed}}</view>
                  <text class='ling' v-show="item.ling != '已领取'">{{item.ling}}</text>
                  <text class='ling_a' v-show="item.ling != '未领取'">{{item.ling}}</text>
                </view>
                <view class='ding'>{{item.ding}}</view>
                <view class='time'>{{item.time}}</view>

                <view class='lq' v-if="item.ling =='已领取'">
                  <view class='lr'>
                    <text>领取人</text>
                    <view style='display:inline-flex'>
                       <image src='/static/image/touxiang_xiao.png' class='tou_x'></image>
                      <text>37度大气芳</text>
                    </view>
                  </view>
                  <view class='ls'>
                    <text>领取时间</text>
                    <text>2018-12-12 13:02</text>
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
export default {
  mixins: [wxShare],
  data () {
    return {
      tabs: ['我收到的', '我送出的'],
          wm: '我收到的',
          dc: '我送出的',
          activeIndex: 1,
          dndd: [],
          wmdd: [],
          color: '#fe8907',
          backgroundColor: '#fe8907',
          list: [
            {
              id: 1,
              li_tu : '/static/image/list01.jpg',
              list_biao_haed:"你陪我长大，我伴你变老我伴你变老我伴你变老我伴你变老我伴你变老",
              ling:"未领取",
              ding:"订单号 GUWJDJ201712120001",
              time:"2018-12-12 13:02",
            },
            {
              id: 2,
              li_tu: '/static/image/list01.jpg',
              list_biao_haed: "你陪我长大，我伴你",
              ling: "已领取",
              ding: "订单号 GUWJDJ201712120001",
              time: "2018-12-12 13:02",
            },
            {
              id: 3,
              li_tu: '/static/image/list01.jpg',
              list_biao_haed: "你陪我长大，我伴你变老我伴你变老我伴你变老我伴你变老我伴你变老",
              ling: "已领取",
              ding: "订单号 GUWJDJ201712120001",
              time: "2018-12-12 13:02",
            },
          ],
          lister: [
            {
              id: 1,
              li_tu: '/static/image/list01.jpg',
              list_biao_haed: "你陪我长大，我伴你变老我伴你变老我伴你变老我伴你变老我伴你变老",
              ling: "未填写地址",
              ding: "订单号 GUWJDJ201712120001",
              time: "2018-12-12 13:02",
            },
            {
              id: 2,
              li_tu: '/static/image/list01.jpg',
              list_biao_haed: "你陪我长大，我伴你",
              ling: "配送中",
              ding: "订单号 GUWJDJ201712120001",
              time: "2018-12-12 13:02",
            },
            {
              id: 3,
              li_tu: '/static/image/list01.jpg',
              list_biao_haed: "你陪我长大，我伴你变老我伴你变老我伴你变老我伴你变老我伴你变老",
              ling: "配送中",
              ding: "订单号 GUWJDJ201712120001",
              time: "2018-12-12 13:02",
            },
          ],
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
    tabClick(id) {
      this.activeIndex = id
    },
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
  padding:30rpx 35rpx;
  margin:15px 0;
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
.lq{
  border-top: 1px solid #dcdcdc;
  padding-top: 25rpx;

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
  border: 1px solid #fe8907;
  color: #fe8907;
  background-color: white;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  
}
.shou .jia{
  color: #fe8907;
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
