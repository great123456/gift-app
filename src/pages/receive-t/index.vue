<!-- 收货地址 -->
<template>
  <div class="container">

    <div class="fen" style="margin-top: 50rpx;">
        <span class="fen_a">收货人：</span>
        <input type="text" class="fen_b" @input="getInputValue"></input>
    </div>

    <div class="fen">
        <span class="fen_a">手机号码：</span>
        <!-- <input type="number" confirm-type="done" class='fen_b' style='width:63%;' 
        @input="getPhoneNumber"></input> -->
        <input type="text"  class="fen_b" v-model="userNumber" style="position: relative;top: 10rpx;">
        <image src='/static/image/cha.png' class='cha' @click.stop="clearInput" v-if="userNumber.length>0"></image>
    </div>

    <view class='region'>
        <text class='fen_a'>收货地址：</text>
        <!-- <picker class='fen_b' mode="region" @change="bindRegionChange" style="width: 500rpx;">
          <view class="picker" style="font-size: 33rpx;">
            {{region[0]}} {{region[1]}} {{region[2]}}
          </view>
        </picker> -->
        <picker class='fen_b' mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" range-key="areaName" :value="multiIndex" :range="objectMultiArray" style="width: 500rpx;">
          <view class="picker" style="font-size: 33rpx;">
           {{region[0]}} {{region[1]}} {{region[2]}}
          </view>
        </picker>
    </view>

    <view class="fen-textarea">
        <span class="address_title">详细地址：</span>
         <textarea placeholder="请输入详细地址和街道" class="address_text" @input="getAddressValue"></textarea>
    </view>
 
<!--     <input type="text" style="border:1px solid #333;width: 200px;height: 30px;" v-model="userNumber"> -->

    <button class='ti' @click="submitSite">提交</button>

    
    <!-- <view class="section">
      <picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" range-key="areaName" :value="multiIndex" :range="objectMultiArray">
        <view class="picker">
          当前选择:{{region[0]}} {{region[1]}} {{region[2]}}
        </view>
      </picker>
    </view> -->

  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
import { apiReceiveSite,apiGetCRMList } from '@/service/index'
export default {
  mixins: [wxShare],
  data () {
    return {
      region: [],
      regionValue: '广东省 广州市 天河区',
      customItem: '全部',
      userName: '',
      userNumber: '',
      address: '',
      orderId: '',
      crmList: '',
      areaCode: '',
      onOff: true,
      pickerList: [],
      objectMultiArray: [],
      multiIndex: [0, 0, 0]
    }
  },
  components: {

  },
  created () {
    if(wx.getStorageSync('phone')){
      this.userNumber = wx.getStorageSync('phone')
    }
    if(wx.getStorageSync('crmList')){
      this.getPickerList()
    }else{
      this.getCRMList()
    }
  },
  onUnload(){
    
  },
  computed: {
    
  },
  onShow(){
    this.orderId = this.$mp.query.orderId
  },
  methods: {
    bindMultiPickerChange(e){
      let multiIndex = e.mp.detail.value
      this.areaCode = this.objectMultiArray[2][multiIndex[2]].id
      this.region = []
      this.region.push(this.objectMultiArray[0][multiIndex[0]].areaName)
      this.region.push(this.objectMultiArray[1][multiIndex[1]].areaName)
      this.region.push(this.objectMultiArray[2][multiIndex[2]].areaName)
      console.log('areaCode',this.areaCode)
      console.log('region',this.region)
    },
    bindMultiPickerColumnChange(e) {
      console.log('e',e)
      let row = e.mp.detail.column
      let column = e.mp.detail.value
      if(row == 0){
        let columnId = this.objectMultiArray[row][column].id
        let columnList = this.getColumnList(columnId)
        let objectMultiArray = []
        objectMultiArray.push(this.pickerList)
        objectMultiArray.push(columnList)
        let optionList = this.getColumnList(columnList[0].id)
        objectMultiArray.push(optionList)
        this.objectMultiArray = objectMultiArray
        this.multiIndex = [column,0,0]
      }
      if(row == 1){
        let columnId = this.objectMultiArray[row][column].id
        let optionList = this.getColumnList(columnId)
        let objectMultiArray = []
        objectMultiArray.push(this.objectMultiArray[0])
        objectMultiArray.push(this.objectMultiArray[1])
        objectMultiArray.push(optionList)
        this.objectMultiArray = objectMultiArray
        let multiIndex = [...this.multiIndex]
        this.multiIndex = [multiIndex[0],column,0]
      }
    },
    bindRegionChange(e){
      console.log('e',e)
      this.region = e.mp.detail.value
      console.log('region',this.region)
      this.getCRMId(this.region)
    },
    getPickerList(){
      let crmList = wx.getStorageSync('crmList')
      let pickerList = crmList.filter(function(item){
        return item.level == 0
      })
      this.pickerList = pickerList
      this.objectMultiArray = []
      this.objectMultiArray.push(pickerList)
      let columnList = this.getColumnList(pickerList[0].id)
      this.objectMultiArray.push(columnList)
      let optionList = this.getColumnList(columnList[0].id)
      this.objectMultiArray.push(optionList)
      this.areaCode = this.objectMultiArray[2][this.multiIndex[2]].id
      this.region = []
      this.region.push(this.objectMultiArray[0][this.multiIndex[0]].areaName)
      this.region.push(this.objectMultiArray[1][this.multiIndex[1]].areaName)
      this.region.push(this.objectMultiArray[2][this.multiIndex[2]].areaName)
      console.log('areaCode',this.areaCode)
    },
    getColumnList(id){
      let crmList = wx.getStorageSync('crmList')
      let columnList = crmList.filter(function(item){
        return (item.parentId == id && item.id != item.parentId)
      })
      return columnList
      console.log('columnList',columnList)
    },
    getAddressValue(e){
      this.address = e.mp.detail.value
    },
    getPhoneNumber(e){
      this.userNumber = e.mp.detail.value
    },
    getInputValue(e){
      this.userName = e.mp.detail.value
    },
    clearInput(){
      this.userNumber = ''
    },
    getCRMList(){
      wx.showLoading({
        title: '加载中',
      })
      apiGetCRMList()
      .then((res)=>{
        wx.hideLoading()
        this.crmList = res.areaInfo
        wx.setStorageSync('crmList', res.areaInfo)
        this.getPickerList()
      })
    },
    getCRMId(region){
      let crmList = wx.getStorageSync('crmList')
      if(this.crmList){
        crmList = this.crmList
      }else{
        crmList = wx.getStorageSync('crmList')
      }
      if(region[2] == '增城区'){
        region[2] = '增城市'
      }
      let arr = crmList.filter(function(item){
        return item.areaName == region[2]
      })
      console.log('arr',arr)
      if(arr.length > 1){
        this.areaCode = this.checkCity(crmList,arr)
      }else{
        this.areaCode = arr[0].id
      }
      console.log('areaCode',this.areaCode)
      // for(let i = 0;i<crmList.length;i++){
      //   if(crmList[i].areaName == region[2]){
      //     console.log('index',crmList[i]) 
      //     this.areaCode = crmList[i].id
      //   }
      // }
    },
    checkCity(crmList,arr){
      let cityArr = []
      for(let i = 0; i< arr.length; i++){
        let cityName = crmList.filter(function(item){
          return arr[i].parentId == item.id
        })
        cityArr.push(cityName)
      }
      const self = this
      let cityArray = cityArr.filter(function(item){
        return item[0].areaName == self.region[1]
      })
      let cityCode = cityArray[0][0].id
      let cityIndex = arr.filter(function(item){
        return item.parentId == cityCode
      })
      let arrIndex = cityIndex[0].id
      return arrIndex
    },
    submitSite(){
      console.log('areaCode',this.areaCode)
      if(this.userName == ''|| this.userNumber == '' || this.address == ''){
        wx.showToast({
          title: '请先完善信息再提交',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if(!this.onOff){
        return
      }
      this.onOff = false
      wx.showLoading({
        title: '地址提交中',
      })
      apiReceiveSite({
        orderid: this.orderId,
        userName: this.userName,
        mobile: this.userNumber,
        area: this.region.join(','),
        address: this.address,
        areaCode: this.areaCode
      })
      .then((res)=>{
        wx.hideLoading()
        this.onOff = true
        if(res.code == 200){
          wx.showToast({
            title: '收货地址提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
             wx.setStorageSync('record',true)
             wx.switchTab({
               url: '/pages/gift-record/main'
             })
          },1000)
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
  padding-top: 1px;
}
.fen{
  width: 100%;
  border-top: 1px solid #dcdcdc;
  padding: 25rpx 0rpx;
  background-color: #fdfdfd;
  box-sizing: border-box;
  position: relative;
}
.region{
  width: 100%;
  border-top: 1px solid #dcdcdc;
  padding: 25rpx 0;
  background-color: #fdfdfd;
  box-sizing: border-box;
}
.fen-textarea{
  width: 100%;
  border-top: 1px solid #dcdcdc;
  padding: 25rpx 0;
  background-color: #fdfdfd;
  box-sizing: border-box;
  font-size: 34rpx;
  color: #666666;
  position: relative;
  height: 260rpx;
}
.fen_a{
  width: 210rpx;
  text-align: right;
  font-size: 35rpx;
  display: inline-block;
  box-sizing: border-box;
}
.fen_b{
  font-size: 34rpx;
  color: #666666;
  display: inline-block;
  box-sizing: border-box;
}
.address_title{
  width: 29%;
  text-align: right;
  font-size: 35rpx;
  display: inline-block;
  box-sizing: border-box;
}
.address_text{
  font-size: 34rpx;
  position: absolute;
  top: 0px;
  left: 30%;
  width: 70%;
  height: 260rpx;
  padding-top: 10rpx;
  padding-right: 20rpx;
  box-sizing: border-box;
}
.ti{
  width: 85%;
  background-color:#fda929;
  color:white;
  height: 88rpx;
  line-height: 88rpx;
  font-size:35rpx;
  border-radius:50rpx;
  margin-top: 50rpx;
  box-sizing:  border-box;
}
.cha{
  display: inline-block;
  width:30rpx;
  height:30rpx;
  margin-top:10rpx;
  margin-right:20rpx;
  position: absolute;
  right: 25rpx;
  top: 26rpx;
}
</style>
