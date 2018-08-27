<!-- 联系客服 -->
<template>
  <div class="container">
    <button open-type="contact">联系客服</button>
  </div>
</template>

<script>
import wxShare from '@/mixins/wx-share'
export default {
  mixins: [wxShare],
  data () {
    return {
      
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
.container{
  padding-top: 1px;
  box-sizing: border-box;
}
.head_text{
  color:#FB9801;
  text-align:center;
  margin:70rpx 0;
  font-size:40rpx;
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
  margin-bottom: 1rem;
  font-size: 30rpx;
}
.ka_tu{
  border-radius:30rpx;
  width:545rpx;
  height:323rpx;
  margin:0 auto;
  display: block;
}
.shici{
  font-size:30rpx;
  text-align:center;
  width:100%;
  display:inline-block;
  height:125rpx;
  margin:30rpx 0;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:3;
  overflow:hidden;

}
.fa{
  background-color: #fe8907;
  color: white;
  font-size: 35rpx;
  border-radius: 50rpx;
}
.sheng{
  color: #fe8907;
  background-color: white;
  font-size: 35rpx;
  border: 1px solid #fe8907;
  border-radius: 50rpx;
  margin-top: 30rpx;
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
</style>
