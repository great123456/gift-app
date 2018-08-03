import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/gift-record/main',
      'pages/details/main',
      'pages/receive-m/main',
      'pages/receive-ling/main',
      'pages/receive-m/main',
      'pages/receive-s/main',
      'pages/receive-t/main',
      'pages/receive-yi/main',
      'pages/success/main'                 
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '立乐礼',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#2c2d2f',
      selectedColor: '#F8D347',
      backgroundColor: '#ffffff',
      borderStyle: 'white',
      list: [{
        pagePath: "pages/index/main",
        iconPath: '/static/image/bottom_a.png',
        selectedIconPath: '/static/image/bottom_a_hover.png',
        text: "我要赠送"
      },{
        pagePath: "pages/gift-record/main",
        iconPath: '/static/image/bottom_b.png',
        selectedIconPath: '/static/image/bottom_b_hover.png',
        text: "礼物记录"
      },{
        pagePath: "pages/gift-record/main",
        iconPath: '/static/image/bottom_c.png',
        selectedIconPath: '/static/image/bottom_c_hover.png',
        text: "联系客服"
      }]
    }
  }
}
