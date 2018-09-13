<script>
import { apiUserCodeLogin,apiGetShareConfig } from '@/service/index'
import { API_PATH } from '@/config/env'

export default {
  created () {
    wx.login({
        success: (res) => {
          console.log('login-code',res)
          apiUserCodeLogin({
            code: res.code
          })
          .then((res)=>{
             console.log('login',res)
             wx.setStorageSync('openid', res.openid)
             wx.setStorageSync('session_key', res.session_key)
             wx.setStorageSync('unionid', res.unionid)
          })
        }
    })

    apiGetShareConfig()
    .then((res)=>{
      console.log('share',res)
      if(res.code == 200){
        console.log('share-aaa')
        let coverImg = API_PATH + '/lilejia/upload/cover/' + res.res.cover
        let title = res.res.title
        wx.setStorageSync('shareImg',coverImg)
        wx.setStorageSync('shareTitle',title)
      }else{
        console.log('share-bbb')
        let coverImg = '/static/image/banner.png'
        let title = '送你一个礼品卡'
        wx.setStorageSync('shareImg',coverImg)
        wx.setStorageSync('shareTitle',title)
      }
    })
  },
  onShow(){
  	
  }
}
</script>

<style lang="scss">
@import "./styles/config.scss";
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
