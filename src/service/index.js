// 首页
import wxRequest from '@/config/wxRequest'
import { API_PATH } from '@/config/env'

// 首页获取所有礼品卡展示
export const allCardList = (ajaxParams) => wxRequest(API_PATH + '/lilejia/appCardController.do?getAllCard', ajaxParams, 'GET')

//获取礼品卡详情页
export const apiGiftDetail = (ajaxParams) => wxRequest(API_PATH + '/lilejia/appCardController.do?getCardDetail', ajaxParams, 'GET')

//授权登录
export const apiUserCodeLogin = (ajaxParams) => wxRequest(API_PATH + '/lilejia/WebService.do?decodeUserInfo', ajaxParams, 'GET')

//发起支付
export const apiUserWeixinPay = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?returnparam', ajaxParams, 'GET')

//首页轮播
export const apiIndexBanner = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?getTr', ajaxParams, 'GET')

//获取收到或是送出的卡片
export const apiGetGiftList = (ajaxParams) => wxRequest(API_PATH + '/lilejia/userCardController.do?getMyCardList', ajaxParams, 'GET')

//查询用户信息、微信绑定手机
export const apiSearchUserInfo = (ajaxParams) => wxRequest(API_PATH + '/lilejia/WebService.do?decodeUserInfoM', ajaxParams, 'GET')

//获取订单详情
export const apiSearchOrderDetail = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?query', ajaxParams, 'GET')

//同步支付订单
export const apiSynOrderResult = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?wxAppPayCallback', ajaxParams, 'GET')

//领取礼品卡订单
export const apiReceiveOrderResult = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?get', ajaxParams, 'GET')

//填写收货地址
export const apiReceiveSite = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?set', ajaxParams, 'GET')

//获取二维码
export const apiCodeImage = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?getImg', ajaxParams, 'GET')

//礼物记录
export const apiGiftRecordList = (ajaxParams) => wxRequest(API_PATH + '/lilejia/order.do?all', ajaxParams, 'GET')

//强制注册与绑定手机
export const apiUserBindNumber = (ajaxParams) => wxRequest(API_PATH + '/lilejia/WebService.do?crmRegister', ajaxParams, 'GET')

// 检查公众号关注状态
export const apiCheckCode = (ajaxParams) => wxRequest(API_PATH + '/lilejia/WebService.do?checkAttentionState', ajaxParams, 'GET')

// 获取CRM地区数据
export const apiGetCRMList = (ajaxParams) => wxRequest(API_PATH + '/lilejia/WebService.do?getAreaInfo', ajaxParams, 'GET')

//获取分享文案配置
export const apiGetShareConfig = (ajaxParams) => wxRequest(API_PATH + '/lilejia/appShareConfigController.do?query', ajaxParams, 'GET')

