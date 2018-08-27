<!-- 登录 -->
<template>
  <div class="container">
    <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录</button>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiSearchUserInfo } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      iv: '',
      encryptedData: ''
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
    getPhoneNumber(e){
      console.log(e)
      this.iv = e.mp.detail.iv
      this.encryptedData = e.mp.detail.encryptedData
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
           wx.setStorageSync('phone', res.phoneNumber)
           wx.showToast({
             title: '登录成功',
             icon: 'success',
             duration: 2000
           })
           wx.setStorageSync('login',true)
           setTimeout(function(){
             wx.switchTab({
               url: '/pages/index/main'
             })
           },1000)
        
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
}
</style>
