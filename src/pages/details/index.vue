<!-- 礼品详情 -->
<template>
  <div class="container">
    <view class='heads heads-mark'>
        <image src='/static/image/xqy_kmian_icon.png' class='ka'></image>
        选择卡面
    </view>
    <view>
        <scroll-view class="scroll-view_H" scroll-x >
            <block v-for="(item,index) in cardImgs" :key="index">
            <view @click="choseGift(index)" class="scroll-view-item_H" :class="current == index ? 'active' : ''">
              <image v-if="current == index" src="/static/image/xqy_gou.png" class="gou"></image>
              <image :src="imageUrl+item" class="tu"></image>
            </view>
            </block>
        </scroll-view>
    </view>
    
    <view class='heads'>
      <div>
        <image src='/static/image/xqy_xy_icon.png' class='ka'></image>
         <text>传达心意，我想对TA说</text>
      </div>
      <div class='bang' @click="showModalContent"> <image src='/static/image/xqy_bwx_btn.png' class='ka_a'></image> 帮我写</div>
    </view>
    
    <div class="text-box" v-show="showTextArea">
      <textarea placeholder="设置祝福语" maxlength="35" v-model="presetGreet" @input="bindInputChange" style="height: 230rpx"></textarea>
    </div>

    <!-- <textarea placeholder="默认显示第一条预置的祝福语" v-model="detailObj.presetGreet" class='zhufu'></textarea> -->

    <view class='heads heads-mark' style='margin-bottom:30rpx;'>
        <image src='/static/image/xqy_xqing_icon.png' class='ka'></image>
        详情
    </view>
    <div class="description" v-show="detailObj.description">{{detailObj.description}}</div>

    <view class='xq' v-for="(item,index) in detailsList" :key="index">
        <image :src="item" mode="widthFix"></image>
    </view>
    
    <!-- 弹窗模块 -->
    <view class="mask" catchtouchmove="preventTouchMove" v-if="showModal" @click.prevent="closeModaContent"></view>
    <view class="modalDlg" v-if="showModal">
        <scroll-view scroll-y style="max-height: 800rpx;border-radius:20rpx;" >
          <block v-for="(item,index) in cardTexts" :key="index">
              <view @click="selectMotalText(item)" class="scroll-view-item"     :class="actives == index ? 'actives' : ''"> <text>{{item}}</text> </view>
          </block>
        </scroll-view>
        <image src='/static/image/xqy_gb_icon.png' class='tan close-modal' @click="closeModaContent"></image>
    </view>

    <view v-if="detailObj.status == 0" class='jiage'>
      <label class='xinyi'>心意价</label>
      <view class='jiage_a'>
        <text class='dous'>¥{{detailObj.price}}</text>
        <text class='dou'>¥{{detailObj.linePrice}}</text>
      </view>
      <div url="" class='szj_a'>
        <button class='szj' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="showPhoneBtn">送自己</button>
        <div v-else class='szj' @click="successReceivePage">送自己</div>
      </div>
      <div url="" class='shy_a'>
        <button class='shy' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if="showPhoneBtn">送好友</button>
        <button v-else class='shy' @click="sendGifts">送好友</button>
      </div>
    </view>
    
    <view v-if="detailObj.status == 1" class='jiageer'>
      <text>已下架</text>
    </view>

    <view v-if="detailObj.status == 2" class='jiageer'>
      <text>商品待售</text>
    </view>

    
    <div class="contact">
      <image src='/static/image/xqy_kefu_btn.png' class='kf'></image>
      <button open-type="contact" class="contact-btn" :session-from="sessionForm"></button>
    </div>
    <!-- <div class="detail-bottom">
      <div class="price">￥{{detailObj.linePrice}}</div>
      <button open-type="share" class="detail-btn">送好友</button>
    </div> -->

    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" class="user-btn" v-show="showInfoBtn"></button>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiGiftDetail,apiUserWeixinPay,apiSearchUserInfo,apiSynOrderResult } from '@/service/index'
import { API_PATH } from '@/config/env'
export default {
  mixins: [wxShare],
  data () {
    return {
      isChecked: false,
      showModal: false,
      current: 0, 
      lists: [],
      lists01:[],
      imageUrl: '',//imgUrl = 'http:/adbe699a.ngrok.io/lilejia/upload/cover/'定义的图片链接
      // state: 0,  // 0 有礼品， 1已经下架， 2没库存
      giftId: '',  //礼品id
      detailInfo: {},  //礼品详情信息
      cardImgs: [],  //卡片
      cardTexts:[],   //祝福语
      detailObj: {},
      showTextArea: true,
      iv: '',
      encryptedData: '',
      showInfoBtn:false,
      showPhoneBtn: false,
      orderId: '',
      coverList: [],
      coverUrl: '',
      detailsList: [],
      presetGreet: '',
      userInfoName: '',
      userInfoAvatar: '',
      sessionForm: ''
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
    this.showModal = false
    this.showTextArea = true
    const self = this
    if(!wx.getStorageSync('userInfo')){
      wx.authorize({
        scope: 'scope.userInfo',
        success() {
          wx.getUserInfo({
             success: function(res) {
               console.log('userinfo',res.userInfo)
               wx.setStorageSync('userInfo', res.userInfo)
               self.showInfoBtn = false
             }
          })
        }
      })
    }
    if(!wx.getStorageSync('userInfo')){
      this.showInfoBtn = true
    }
    wx.removeStorageSync('record')
    if(!wx.getStorageSync('phone')){
      this.showPhoneBtn = true
    }
    if(!wx.getStorageSync('login')){
      this.userLogin()
    }
    this.giftId = this.$mp.query.id
    this.getGiftDetail()
    this.current = 0
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
    console.log('session-form',this.sessionForm)
  },
  methods: {
    getGiftDetail(){
      apiGiftDetail({
        id: this.giftId
      })
      .then((res)=>{
        wx.hideLoading()
        if(res.code == '200'){
          this.detailObj = res.data
          this.cardImgs = res.data.cover.split(',')
          this.coverList = res.data.cover.split(',')
          this.coverUrl = this.coverList[0]
          this.detailsList = res.data.detail.split(',')
          let presetGreet = this.foo(res.data.presetGreet)
          this.cardTexts = presetGreet
          this.presetGreet = presetGreet[0]
          if(this.detailsList.length){
            for(let i = 0;i<this.detailsList.length;i++){
              this.detailsList[i] = API_PATH+'/lilejia/upload/cover/' + this.detailsList[i]
            }
          }
          for(let i = 0;i<this.cardImgs.length;i++){
            this.cardImgs[i] = API_PATH+'/lilejia/upload/cover/' + this.cardImgs[i]
          }
        }
      })
    },
    userLogin(){
      wx.login({
          success: (res) => {
            console.log('detail-code',res)
            apiUserCodeLogin({
              code: res.code
            })
            .then((res)=>{
               console.log('login',res)
               wx.setStorageSync('login', true)
               wx.setStorageSync('openid', res.openid)
               wx.setStorageSync('session_key', res.session_key)
               wx.setStorageSync('unionid', res.unionid)
            })
          }
      })
    },
    bindInputChange(e){
      if(e.mp.detail.value.length>=35){
        wx.showToast({
           title: '祝福语过长',
           icon: 'none',
           duration: 2000
         })
      }
    },
    foo(str){
      var temp = str.split(/[\n,]/g);
          for(var i =0;i<temp.length;i++){
          if(temp[i] == ""){
            temp.splice(i, 1)
            i--;
          }
        }
      return temp
    },
    bindGetUserInfo(e){
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      this.showInfoBtn = false
    },
    getPhoneNumber(e){
      console.log(e)
      this.iv = e.mp.detail.iv
      this.encryptedData = e.mp.detail.encryptedData
      if(!wx.getStorageSync('login')){
        this.userLogin()
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
           console.log('key',res)
           this.showPhoneBtn = false
           wx.setStorageSync('phone', res.phoneNumber)
           wx.showToast({
             title: '授权成功',
             icon: 'success',
             duration: 2000
           })
         }
      })
    },
    selectMotalText(text){
      this.presetGreet = text
      this.closeModaContent()
    },
    choseGift(index){
      this.current = index
      this.coverUrl = this.coverList[index]
    },
    closeModaContent(){
      this.showModal = false
      this.showTextArea = true
    },
    showModalContent(){
      this.showModal = true
      this.showTextArea = false
    },
    successReceivePage(){
       const self = this
       if(this.presetGreet == ''){
         wx.showToast({
           title: '祝福语不能为空',
           icon: 'none',
           duration: 2000
         })
         return
       }
       if(this.presetGreet.length>35){
         wx.showToast({
           title: '祝福语过长',
           icon: 'none',
           duration: 2000
         })
         return
       }
       apiUserWeixinPay({
        openid: wx.getStorageSync('openid'),
        wxNickName: wx.getStorageSync('userInfo').nickName,
        wxMobile: wx.getStorageSync('phone'),
        wxHeadImg: wx.getStorageSync('userInfo').avatarUrl,
        giftsCoverImg: this.coverUrl,
        bless: this.presetGreet,
        cardid: this.detailObj.id,
        isMe: 0
      })
      .then((res)=>{
        console.log('pay-res',res)
        if(res.code == '200'){
          self.orderId = res.data.out_trade_no
          wx.requestPayment({
             'timeStamp': res.data.timeStamp,
             'nonceStr': res.data.nonceStr,
             'package': res.data.package,
             'signType': 'MD5',
             'paySign': res.data.paySign,
             'success':function(res){
                self.synOrderResult('success')
                wx.navigateTo({
                  url: '/pages/receive-s/main?orderId='+self.orderId
                })
             },
             'fail':function(err){
                self.synOrderResult('fail')
                console.log('err',err)
             }
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    synOrderResult(str){        //同步订单支付结果
      apiSynOrderResult({
        orderid: this.orderId,
        payResult: str
      })
      .then((res)=>{

      })
    },
    sendGifts(){
      const self = this
      if(this.presetGreet == ''){
         wx.showToast({
           title: '祝福语不能为空',
           icon: 'none',
           duration: 2000
         })
         return
       }
       if(this.presetGreet.length>35){
         wx.showToast({
           title: '祝福语过长',
           icon: 'none',
           duration: 2000
         })
         return
       }
      apiUserWeixinPay({
        openid: wx.getStorageSync('openid'),
        wxNickName: wx.getStorageSync('userInfo').nickName,
        wxMobile: wx.getStorageSync('phone'),
        wxHeadImg: wx.getStorageSync('userInfo').avatarUrl,
        giftsCoverImg: this.coverUrl,
        bless: this.presetGreet,
        cardid: this.detailObj.id,
        isMe: 1
      })
      .then((res)=>{
        if(res.code == '200'){
          console.log('pay-res',res)
          self.orderId = res.data.out_trade_no
          wx.requestPayment({
             'timeStamp': res.data.timeStamp,
             'nonceStr': res.data.nonceStr,
             'package': res.data.package,
             'signType': 'MD5',
             'paySign': res.data.paySign,
             'success':function(res){
                self.synOrderResult('success')
                wx.navigateTo({
                  url: '/pages/success/main?orderId='+self.orderId
                })
             },
             'fail':function(err){
                self.synOrderResult('fail')
                console.log('err',err)
             }
          })
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
.container{
  padding-bottom: 160rpx;
}
.heads{
  font-size:30rpx;
  padding:50rpx 50rpx 0 50rpx;
  display:flex;
  align-items:center;
  justify-content: space-between;
  color: #666666;
}
.heads-mark{
  justify-content: flex-start;
}
.description{
  margin-top: 30rpx;
  padding: 0rpx 50rpx;
  font-size: 26rpx;
  line-height: 40rpx;
  color: #666666;
  margin-bottom: 30rpx;
}
.active {
  background: -webkit-linear-gradient(right top,#fda929, #fe6951);
  background: linear-gradient(to bottom left, #fda929 , #fe6951); /* 标准的语法 */
}
/* .active::after {                 
  position: absolute;               
  content: '';
  background: linear-gradient(#fda929, #fe6951);    
  bottom: -10rpx; 
  right: -10rpx;
  left: -10rpx;
  top: -10rpx;                              
  z-index: -1;             
  border-radius: 30rpx;                
} */
.scroll-view_H{
  width: 100%;
  white-space: nowrap;
  height:100%;
  display: inline-flex;
  align-items: flex-end;
}
.scroll-view-item_H{
  margin-top: 30rpx;
  height:336rpx;
  width: 496rpx;
  display:inline-block;
  margin-left:48rpx;
  position: relative;
  border-radius: 32rpx;
}
.gou{
  display:inline-block;
  position:absolute;
  right:-18rpx;
  width:50rpx;
  height:50rpx;
  top:-18rpx;
  z-index:2;
}
.tu{
  border-radius:26rpx;
  width:480rpx;
  height:320rpx;
  display: inline-block;
  position: absolute;
  left: 8rpx;
  top: 8rpx;
  z-index: 1;
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
  background-color:#ffffff;
  font-size:30rpx;
  transform: translateX(-50%);
  border-radius: 30rpx;
  padding:30rpx;
  min-height:150rpx;
  display: block;
  box-shadow:0px 0px 10px rgba(0,0,0,0.2);
  width: 600rpx;
  margin:30rpx auto;
  margin-bottom: 0rpx;
}
.bang{
  display:flex;
  font-size:26rpx;
  height:50rpx;
  border-radius:35rpx;
  color:#fda929;
  border:1px solid #fda929;
  width:160rpx;
  align-items: center;
  margin-left: 20rpx;
  padding-left: 20rpx;
  box-sizing: border-box;
}
.xq{
  color:#999999;
  font-size:25rpx;
  padding:0 0rpx;
  line-height:40rpx;
  margin-top:0rpx;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  image{
    width: 100%;
  }
}
.jiage{
    background-color: white;
    height: 139rpx;
    position: fixed;
    bottom: 0;
    z-index: 999;
    display: block;
    width: 100%;
}
.jiage_a{
  display: inline-block;
  position: absolute;
  top:70rpx;
  left:50rpx;

}
.xinyi{
  display: inline-block;
  color: #fda929;
  border: 1px solid #fda929;
  border-radius: 35rpx;
  font-size:23rpx;
  font-weight:bold;
  padding:3rpx 5rpx;
  width:80rpx;
  text-align:center;
  position: absolute;
  top:30rpx;
  left:50rpx;

}
.dous{
  color:#f1ad49;
  font-size:43rpx;

}
.dou{
  text-decoration:line-through;
  margin-left:20rpx;
  font-size:24rpx;
  color: #999999;
  position: relative;
  top: -2rpx;
}
.szj{
  display: inline-block;
  color: #fda929;
  background-color: white;
  border: 1px solid #fda929;
  font-size:35rpx;
  box-sizing: border-box;
  width:200rpx;
  height:95rpx;
  line-height:90rpx;
  text-align: center;
  border-radius: 12rpx;
}
.shy{
  display: inline-block;
  color: white;
  background-color: #fda929;
  font-size:35rpx;
  width:200rpx;
  height:95rpx;
  line-height:95rpx;

}
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9000;
}

.modalDlg{
    width: 580rpx;
    position: fixed;
    top: 20%;
    left: 85rpx;
    z-index: 9999 !important;
    background: #ffffff;
    border-radius: 36rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: 1;
}
.close-modal{
  position: absolute;
  left: 50%;
  bottom: -100rpx;
  transform: translateX(-50%);
}
.scroll-view-item{
  display:inline-flex;
  min-height:100rpx;
  font-size:26rpx;
  width:100%;
  border-top:1px solid #e5e5e5;
  color:#666666;
  align-items: center;
  justify-content: center;
}
.modalDlg{
  .scroll-view-item:nth-of-type(1){
    border-top: none;
  }
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
.detail-bottom{
  position: fixed;
  width: 100%;
  left: 0px;
  bottom: 0px;
  background: #ffffff;
  height: 160rpx;
  padding: 0rpx 46rpx;
  box-sizing: border-box;
  .price{
    font-size: 43rpx;
    color: #fda929;
    position: absolute;
    left: 46rpx;
    bottom: 43rpx;
  }
  .detail-btn{
    width: 200rpx;
    height: 95rpx;
    background: #fda929;
    color: #ffffff;
    text-align: center;
    line-height: 95rpx;
    font-size: 36rpx;
    position: absolute;
    bottom: 43rpx;
    right: 43rpx;
    border-radius: 10rpx;
  }
}
.text-box{
  width: 100%;
  margin-top: 30rpx;
  padding: 0rpx 50rpx;
  box-sizing: border-box;
  textarea{
    width: 100%;
    min-height: 130rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 20rpx 30rpx;
    box-sizing: border-box;
    font-size: 30rpx;
    line-height: 35rpx;
  }
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
