<!-- 礼品详情 -->
<template>
  <div class="container">
    
    <div class="content">
      <div class="main-img">
        <image :src="orderDetail.giftsCoverImg"></image>
      </div>
      
      <div class="main-text">
        <div>
          <image :src="orderDetail.getHeadImg" class="avatar-img"></image>
          <span class="user-name">{{orderDetail.getNickName}}</span>
        </div>
        <div class="text">{{orderDetail.bless}}</div>
      </div>

      <view class='heads'>
          <image src='/static/image/xqy_xqing_icon.png' class='ka'></image>
          <span>详情</span>
      </view>
      <div class="description" v-show="orderDetail.description">{{orderDetail.description}}</div>
    </div>
    <view class='xq' v-for="(item,index) in detailsList" :key="index">
        <image :src="item" mode="widthFix"></image>
    </view>
    
    <div class="bottom-btn">
      <span @click="indexPage">我也要送</span>
    </div>

    <div class="contact">
      <image src='/static/image/xqy_kefu_btn.png' class='kf'></image>
      <button open-type="contact" class="contact-btn" :session-from="sessionForm"></button>
    </div>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiGiftDetail,apiSearchOrderDetail } from '@/service/index'
import { API_PATH } from '@/config/env'
export default {
  mixins: [wxShare],
  data () {
    return {
      imageUrl: '',
      giftId: '',      //礼品id
      detailInfo: {},  //礼品详情信息
      orderId: '',
      coverList: [],
      coverUrl: '',
      detailsList: [],
      presetGreet: '',
      userInfoName: '',
      userInfoAvatar: '',
      sessionForm: '',
      orderDetail: {}
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
    wx.removeStorageSync('record')
    if(this.$mp.query.id){
      this.giftId = this.$mp.query.id
    }
    if(this.$mp.query.orderId){
      this.orderId = this.$mp.query.orderId
    }
    this.getGiftDetail()
    this.getOrderDetail()
    this.userInfoName = wx.getStorageSync('userInfo').nickName
    this.userInfoAvatar = wx.getStorageSync('userInfo').avatarUrl
    var note_info = {
        "title": "业务记录标题",
        "custom_fields": {
            "TextField_1": "普通文本内容",
        }
    }
    let note_info_str = JSON.stringify(note_info)
    var customer_info = {
        "email": "test@udesk.cn", //邮箱
        "ip": "192.168.1.1", //IP
        "description": "描述",
        "organization_id": 1, //所属公司ID
        "tags": "标签1,标签2", //标签 已英文号分割
        "owner_id": 1, //客户负责人ID
        "owner_group_id": 1, //客户负责组ID
        "level": "normal", // 等级
        "cellphones": [["", "13100000002"]], //数组 [[电话ID, 电话文本]]
        "other_emails": [["", "13100000002@udesk.cn"]], //数组 [[邮箱ID, 邮箱]]
        "custom_fields": {
            "TextField_1": "普通文本内容",
        }
    }
    let customer_info_str = JSON.stringify(customer_info)
    this.sessionForm = "udesk|"+ this.userInfoName +"|"+this.userInfoAvatar +"|customer^"+customer_info_str+"|note^"+note_info_str
  },
  methods: {
    getGiftDetail(){
      apiGiftDetail({
        id: this.giftId
      })
      .then((res)=>{
        wx.hideLoading()
        if(res.code == '200'){
          console.log('gift-detail',res)
          this.detailsList = res.data.detail.split(',')
          if(this.detailsList.length){
            for(let i = 0;i<this.detailsList.length;i++){
              this.detailsList[i] = API_PATH + '/lilejia/upload/cover/' + this.detailsList[i]
            }
          }
        }
      })
    },
    getOrderDetail(){
      apiSearchOrderDetail({
        orderid: this.orderId
      })
      .then((res)=>{
        console.log('order-detail',res)
        if(res.code == 200){
           this.orderDetail = res.data
           this.orderDetail.giftsCoverImg = API_PATH+'/lilejia/upload/cover/' + res.data.giftsCoverImg
        }else{
           wx.showToast({
             title: res.msg,
             icon: 'none',
             duration: 2000
           })
        }
      })
    },
    indexPage(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 160rpx;
  padding-top: 54rpx;
}
.content{
  padding: 0rpx 60rpx;
}
.heads{
  font-size:30rpx;
  margin-top: 50rpx;
  display:flex;
  align-items:center;
  justify-content: flex-start;
  margin-bottom: 30rpx;
  color: #666666;
}
.main-img{
  width: 100%;
  image{
    width: 100%;
    height: 370rpx;
    border-radius: 22rpx;
  }
}
.main-text{
  margin-top: 60rpx;
  .avatar-img{
    width: 60rpx;
    height: 60rpx;
  }
  .user-name{
    font-size: 26rpx;
    color: #333333;
    margin-left: 20rpx;
  }
  .text{
    margin-top: 30rpx;
    line-height: 40rpx;
    color: #666666;
  }
}
.description{
  margin-top: 30rpx;
  font-size: 26rpx;
  line-height: 40rpx;
  color: #666666;
}
.xq{
  color:#999999;
  font-size:25rpx;
  line-height:40rpx;
  display: inline-block;
  box-sizing: border-box;
  margin-top: 30rpx;
  width: 100%;
  image{
    width: 100%;
  }
}
.ka{
  width:35rpx;
  height:35rpx;
  display:inline-block;
  margin-right: 15rpx;
}
.bottom-btn{
  width: 100%;
  height: 100rpx;
  position: fixed;
  left: 0px;
  bottom: 0px;
  background: #ffffff;
  text-align: center;
  span{
    display: inline-block;
    width: 326rpx;
    height: 74rpx;
    line-height: 74rpx;
    border-radius: 30rpx;
    color: #ffffff;
    font-size: 32rpx;
    background: #fda929;
    margin-top: 13rpx;
  }
}
.kf{
  width:135rpx;
  height:135rpx;
}
.contact{
  position: fixed;
  right: 16rpx;
  bottom: 160rpx;
  width:135rpx;
  height:135rpx;
  .contact-btn{
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    border: none;
    opacity: 0;
  }
}
</style>
