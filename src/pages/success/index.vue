<!-- 立乐礼 -->
<template>
  <div class="container">
    <view class='head_text'>Fun享卡准备好了，送给ta吧</view>
    <view class='ka'>
        <view class='head_text_a'>{{userName}} <text style='color: #fda929'>送出一份立乐礼包</text></view>
        <image :src="img" class='ka_tu' mode="widthFix"></image>
            <text class='shici'>{{zhufu}}</text>
        <button open-type="share" class='fa'>点击直接送给好友</button>
        <div class='sheng' @click="generateBtnClick">生成海报送给好友</div>
    </view>

    <div class="out-box" id="outBox">
      <div id="canvas" v-show="showCanvasBox">
        <image src="/static/image/hb_bg.png" class="canvas-bac"></image>
        <image :src="userImg" class="avatar-img"></image>
        <div class="canvas-content">
          <p class="user-name">{{userName}}</p>
          <p class="canvas-btn">送你一份立乐礼包</p>
          <image src="/static/image/code.jpg" class="canvas-code"></image>
          <p class="canvas-hint">长按小程序码领取立乐礼包</p>
        </div>
      </div>
    </div>
    
    <canvas style="width: 375px; height: 600px;" canvas-id="myCanvas" class="canvas-img" v-show="showCanvas"></canvas>
    
    <div class="canvas-image" v-show="showCanvasImage">
      <image :src="canvasImage"></image>
    </div>

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiCodeImage,apiSearchOrderDetail,apiUserBindNumber } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      zhufu: '',
      img: '/static/image/banner.png',
      userImg: '',
      userName: '',
      showCanvasBox: false,
      showCanvas: false,
      showCanvasImage: false,
      orderId: '',
      orderObj: {},
      canvasImage: ''
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
    this.showCanvas = false
    this.showCanvasImage = false
    this.orderId = this.$mp.query.orderId
    this.userImg = wx.getStorageSync('userInfo').avatarUrl
    this.userName = wx.getStorageSync('userInfo').nickName
    console.log('uer-img',wx.getStorageSync('userInfo').avatarUrl)
    //this.generateBtnClick()
    this.getOrderDetail()
    this.getQrcode()
    this.bindUserNumber()
  },
  onShareAppMessage(){
    return {
      title: wx.getStorageSync('userInfo').nickName + '送你1份礼物,赶快领取',
      path: '/pages/receive-ling/main?orderId='+this.orderId,
      imageUrl: this.img,
      success () {
        wx.showToast({
          title: '发送成功!',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },
  methods: {
    getQrcode(){
      apiCodeImage({
        page: '/pages/receive-ling/main?orderId='+ this.orderId,
        scene: ''
      })
      .then((res)=>{
        console.log('qrcode',res)
      })
    },
    bindUserNumber(){
      apiUserBindNumber({
        mobile: wx.getStorageSync('phone')
      })
      .then((res)=>{
        console.log('bind',res)
      })
    },
    getOrderDetail(){
      wx.showLoading({
        title: '加载中',
      })
      apiSearchOrderDetail({
        orderid: this.orderId
      })
      .then((res)=>{
        if(res.code == 200){
          wx.hideLoading()
          console.log('order-detail',res)
          this.orderObj = res.data
          this.zhufu = res.data.bless
          this.img = 'https://giftcard.hm.liby.com.cn/lilejia/upload/cover/' + res.data.giftsCoverImg
        }
      })
    },
    generateBtnClick(){
      wx.showLoading({
        title: '海报生成中',
      })
      // this.showCanvas = true
      const ctx = wx.createCanvasContext('myCanvas')
      this.drawCanvasBac(ctx)
    },
    drawCanvasBac(ctx){
      let img = '/static/image/hb_bg.png'
      ctx.drawImage(img, 0, 0, 375, 600)
      this.drawUserAvatar(ctx)
    },
    drawUserAvatar(ctx){
      const self = this
      wx.downloadFile({
        url: self.userImg,
        success: function (res) {
          ctx.save()
          ctx.beginPath()
          ctx.arc(187, 130, 50, 0, 2*Math.PI)
          ctx.clip()
          ctx.drawImage(res.tempFilePath, 137, 80, 100, 100)
          ctx.restore()
          self.drawUserName(ctx)
        },
        fail:function(err){
      
        }
      })
    },
    drawUserName(ctx){
      ctx.setTextAlign('center')
      ctx.setFillStyle('#2c2d2f')
      ctx.setFontSize(18)
      ctx.fillText(this.userName, 187, 203)
      this.drawGiftBac(ctx)
    },
    drawGiftBac(ctx){
      let img = '/static/image/giftbac.png'
      ctx.drawImage(img, 85, 220, 220, 39)
      ctx.setTextAlign('center')
      ctx.setFillStyle('#ffffff')
      ctx.setFontSize(18)
      ctx.fillText('送你1张Fun享卡', 187, 246)
      this.drawCodeImg(ctx)
    },
    drawCodeImg(ctx){
      let img = '/static/image/code.jpg'
      ctx.drawImage(img, 105, 310, 165, 165)
      let iconUrl = '/static/image/hb_jtou_icon.png'
      ctx.drawImage(iconUrl, 177, 500, 20, 22)
      ctx.setTextAlign('center')
      ctx.setFillStyle('#2c2d2f')
      ctx.setFontSize(16)
      ctx.fillText('长按小程序码领取立乐礼包', 187, 550)
      ctx.draw()
      this.saveImage()
    },
    saveImage(){
      const self = this
      //this.showCanvas = true 
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 375,
        height: 600,
        destWidth: 375*2,
        destHeight: 600*2,
        canvasId: 'myCanvas',
        success: function(res) {
          wx.hideLoading()
          // self.showCanvas = false
          console.log('res',res.tempFilePath)
          self.canvasImage = res.tempFilePath
          self.showCanvasImage = true
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(res) {
                    wx.showToast({
                      title: '海报已保存至相册',
                      icon: 'success',
                      duration: 2000
                    })
                  },
                  fail(err){
                    wx.showToast({
                      title: err.errMsg,
                      icon: 'none',
                      duration: 2000
                    })
                  }
              })
            }
          })
        },
        fail(err){
          console.log('err',err)
        } 
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 1px;
  box-sizing: border-box;
  background: #ffe9cf;
}
.head_text{
  color:#FB9801;
  text-align:center;
  margin:70rpx 0;
  font-size:44rpx;
  font-weight:bold;
}
.ka{
  background-color: white;
  border-radius: 20rpx;
  width: 574rpx;
  padding:30rpx 50rpx;
  margin:0 auto;
  height:888rpx;
  display:inherit;

}
.head_text_a{
  text-align: center;
  margin: 30rpx 0;
  margin-bottom:50rpx;
  font-size: 30rpx;
}
.ka_tu{
  border-radius:30rpx;
  width:545rpx;
  margin:0 auto;
  display: block;
}
.shici{
  font-size:30rpx;
  text-align:center;
  width:100%;
  display:inline-block;
  height:120rpx;
  margin:30rpx 0;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  overflow:hidden;

}
.fa{
  background-color: #fba83b;
  color: #ffffff;
  font-size: 33rpx;
  border-radius: 50rpx;
  height: 88rpx;
  line-height: 88rpx;
  border: none;
}
.sheng{
  color: #fda929;
  background-color: white;
  font-size: 33rpx;
  border: 1px solid #fda929;
  border-radius: 50rpx;
  margin-top: 30rpx;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
}
#canvas{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  .avatar-img{
    width: 200rpx;
    height: 200rpx;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 160rpx;
    transform: translateX(-50%);
  }
}
.canvas-bac{
  width: 100%;
  height: 100%;
}
.canvas-content{
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0px;
  top: 360rpx;
  text-align: center;
  .user-name{
    font-size: 36rpx;
    color: #2c2d2f;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }
  .canvas-btn{
    width: 370rpx;
    height: 70rpx;
    border-radius: 50rpx;
    color: #ffffff;
    line-height: 70rpx;
    font-size: 36rpx;
    background: #fcca33;
    margin-left: auto;
    margin-right: auto;
  }
  .canvas-code{
    width: 360rpx;
    height: 360rpx;
    margin-top: 60rpx;
  }
  .canvas-hint{
    font-size: 36rpx;
    margin-top: 50rpx;
  }
}
.canvas-img{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
}

.canvas-image{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 9999;
  image{
    width: 100%;
    height: 100%;
  }
}
button::after{
  border:none;
}
</style>
