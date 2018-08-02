export default {
  data: {
    shareParams: {
      title: '送你一个礼品卡',
      path: '/pages/index/main',
      imageUrl: '/static/image/share.png',
      success () {
        wx.showToast({
          title: '转发成功！',
          icon: 'none'
        })
      }
    }
  },
  onShareAppMessage () {
    return this.shareParams
  },
  methods: {
    checkNetworkInfo(){
      wx.getNetworkType({
        success: function(res) {
          if(res.networkType == 'none'){
            console.log('none-network')
            
          }
        }
      })
    }
  }
}
