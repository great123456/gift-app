<!-- 礼品详情 -->
<template>
  <div class="container">
    <view class='heads'>
        <image src='/static/image/xqy_kmian_icon.png' class='ka'></image>
        选择卡面
      </view>
      <view>
        <scroll-view class="scroll-view_H" scroll-x >
            <block v-for="(item,index) in cardImgs" :key="index">
            <view @click="choseGift" :data-index="index" class="scroll-view-item_H" :class="current == index ? 'active' : ''" >
              <image v-if="current == index" src="/static/image/xqy_gou.png" class="gou"></image>
              <image :src="imageUrl+item" class="tu"></image>
            </view>
            </block>
        </scroll-view>
    </view>
    
    <view class='heads'>
        <image src='/static/image/xqy_xy_icon.png' class='ka'></image>
         <text>传达心意，我想对TA说</text>
          <button class='bang' @click="submit"> <image src='/static/image/xqy_bwx_btn.png' class='ka_a'></image> 帮我写</button>
    </view>
      <textarea placeholder="默认显示第一条预置的祝福语" :value="zhufu" class='zhufu'></textarea>

    <view class='heads' style='margin-bottom:0;'>
        <image src='/static/image/xqy_xqing_icon.png' class='ka'></image>
        详情
    </view>
    <view class='xq'>
        <text>
        一.礼品卡说明\nGap礼品卡在任何节日、特别的日子里为您提供时尚、便捷的送礼新选择。亦是员工福利的明智之选。\nGap礼品卡封套图案有多重精美设计，将随机发送。\nGap礼品卡系列单独配送，不随订单商品配送。\n购买Gap礼品卡不参与Gap中国官网VIP消费金额累计。\n购买Gap礼品卡不享受积分。\n顾客凭此卡可在gap.cn网上购买商品（礼品卡不能用来购买礼品卡）。结算时将直接扣除卡背余额至零为止。超出卡内金额部分需补充余款。\n如需退款还使用本卡购买的商品，退款将直接存入卡内，恕不退还现金。

        </text>
    </view>
    
    <!-- 弹窗模块 -->
    <view class="mask" catchtouchmove="preventTouchMove" v-if="showModal"></view>
    <view class="modalDlg" v-if="showModal">
        <scroll-view scroll-y style="height: 814rpx;z-index:9999;background-color: white;border-radius:20rpx;" >
          <block v-for="(item,index) in cardTexts" :key="index">
              <view @click='choseTxte' :data-index="index" class="scroll-view-item"     :class="actives == index ? 'actives' : ''"> <text>{{item}}</text> </view>
          </block>
        </scroll-view>
        <image src='/static/image/xqy_gb_icon.png' class='tan' @click="go" style='top:851rpx;position: absolute;'></image>
    </view>

    <view v-if="detailInfo.status == 0" class='jiage'>
      <label class='xinyi'>心意价</label>
      <view class='jiage_a'>
        <text class='dous'>¥{{detailInfo.price}}</text>
        <text class='dou'>¥{{detailInfo.linePrice}}</text>
      </view>
      <navigator url="" class='szj_a'>
        <button class='szj'>送自己</button>
      </navigator>
      <navigator url="" class='shy_a'>
        <button class='shy' @click="send">送好友</button>
      </navigator>
    </view>
    
    <view v-if="detailInfo.status == 1" class='jiageer'>
      <text>已下架</text>
    </view>

    <view v-if="detailInfo.status == 3" class='jiageer'>
      <text>暂无存库</text>
    </view>

    <image src='/static/image/xqy_kefu_btn.png' class='kf'></image>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {
      isChecked: false,
      showModal: false,
      current: 0, 
      lists: [],
      lists01:[],
      zhufu: "",
      imageUrl: '',//imgUrl = 'http:/adbe699a.ngrok.io/lilejia/upload/cover/'定义的图片链接
      // state: 0,  // 0 有礼品， 1已经下架， 2没库存
      giftId: '',  //礼品id
      detailInfo: {},  //礼品详情信息
      cardImgs: [],  //卡片
      cardTexts:[], //祝福语
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
.heads{
  font-size:30rpx;
  padding:30rpx 0 0 50rpx;
  display:flex;
  align-items:center;
  color: #666666;
}
.active {
  border: 4px solid #fe6c4f;
  border-radius:38rpx;

}

.scroll-view_H{
  width: 100%;
  white-space: nowrap;
  height:100%;
  display: inline-flex;
  align-items: flex-end;
}
.scroll-view-item_H{
  margin-top: 20rpx;
  height:335rpx;
  display:inline-block;
  margin-left:48rpx;
  position: relative;

}
.gou{
  display:inline-block;
  position:absolute;
  right:-25rpx;
  width:50rpx;
  height:50rpx;
  top:-25rpx;
  z-index:1;


}
.tu{
  border-radius:30rpx;
  width:550rpx;
  height:335rpx;
  display: inline-block;
}
.service_selection .is_checked{
  border:2px solid;
  color: #FE0002 ;
  background: #fff;
}
.service_selection .normal{
  border: none;
  color: #333;
  background: #F0F1EC;
}
.zhufu{
  resize:none;
  background-color:white;
  font-size:30rpx;
  position: relative;
  left:50%;
  transform: translateX(-50%);
  border-radius: 30rpx;
  padding:30rpx;
  min-height:150rpx;
  display: block;
  box-shadow:0px 0px 10px rgba(0,0,0,0.2);
  width: 600rpx;
  margin-top:30rpx;

}
.bang{
  display:flex;
  font-size:27rpx;
  height:50rpx;
  border-radius:35rpx;
  color:#fda929;
  border:1px solid #fda929;
  width:180rpx;
  align-items: center;
}
.xq{
  color:#999999;
  font-size:25rpx;
  padding:0 51rpx;
  line-height:40rpx;
  margin-bottom:200rpx;
  display: inline-block;
}
.jiage{
    background-color: white;
    height: 150rpx;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: block;
    width: 100%;
}
.jiage_a{
  display: inline-block;
  position: absolute;
  top:75rpx;
  left:50rpx;

}
.xinyi{
  display: inline-block;
  color: #fe8907;
  border: 1px solid #fe8907;
  border-radius: 35rpx;
  font-size:23rpx;
  font-weight:bold;
  padding:5rpx;
  width:80rpx;
  text-align:center;
  position: absolute;
  top:20rpx;
  left:50rpx;

}
.dous{
  color:#fe8907;
  font-size:50rpx;

}
.dou{
  text-decoration:line-through;
  margin-left:20rpx;
  font-size:22rpx;
  color: #999999;

}
.szj{
  display: inline-block;
  color: #fe8907;
  background-color: white;
  border: 1px solid #fe8907;
  font-size:35rpx;
  box-sizing: border-box;
  width:200rpx;
  height:100rpx;
  line-height:100rpx;

}
.shy{
  display: inline-block;
  color: white;
  background-color: #fe8907;
  font-size:35rpx;
  width:200rpx;
  height:101rpx;
  line-height:101rpx;

}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    z-index: 9000;
    opacity: 0.7;
}

.modalDlg{
    width: 580rpx;
    height: 620rpx;
    position: fixed;
    top: 45%;
    left: 0;
    z-index: 9999;
    margin: -370rpx 85rpx;
    background-color: #fff;
    border-radius: 36rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    
}
.scroll-view-item{
  display:inline-flex;
  min-height:150rpx;
  font-size:26rpx;
  width:100%;
  border-bottom:1px solid #e5e5e5;
  color:#666666;
  align-items: center;
  justify-content: center;
}
.scroll-view-item text{
  text-align: center;
  display: inline-block;
  padding: 0 15rpx;
}
.ka{
  width:35rpx;
  height:35rpx;
  display:inline-block;
  margin-right: 15rpx;
}
.ka_a{
  width:30rpx;
  height:30rpx;
  display:inline-block;
  margin-right: 10rpx;
}
.tan{
  width:70rpx;
  height:70rpx;
  display:inline-block;
}
.shy_a{
  position: absolute;
  right: 30rpx;
  top: 28rpx;

}
.szj_a{
  position: absolute;
  right: 256rpx;
  top: 28rpx;

}
.kf{
  position: fixed;
  right: 50rpx;
  bottom: 200rpx;
  display: inline-block;
  width:135rpx;
  height:135rpx;

}
.jiageer{
    background-color: #efeeee;
    height: 100rpx;
    color: #707070;
    text-align: center;
    line-height: 100rpx;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: block;
    width: 100%;
    font-size:35rpx;

}
</style>
