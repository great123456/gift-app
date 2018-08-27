<script>
import { apiUserCodeLogin } from '@/service/index'
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
