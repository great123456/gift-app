export default {
  data: {
    shareParams: {
      title: wx.getStorageSync('shareTitle'),
      path: '/pages/index/main',
      imageUrl: wx.getStorageSync('shareImg'),
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
