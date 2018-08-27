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
      'pages/success/main',
      'pages/contact/main',
      'pages/login/main',
      'pages/agreement/main',
      'pages/attention/main'                 
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: '立乐礼',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#fda929',
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
      }]
    }
  }
}
