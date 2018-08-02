// 首页
import wxRequest from '@/config/wxRequest'
import { API_PATH } from '@/config/env'

// 首页获取所有礼品卡展示
export const allCardList = (ajaxParams) => wxRequest(API_PATH + '/lilejia/appCardController.do?getAllCard', ajaxParams, 'GET')

//授权微信账户登录
export const weixinLogin = (ajaxParams) => wxRequest(API_PATH + '/user/authWechatLogin.do', ajaxParams, 'POST')

//根据楼宇动态获取首页布局信息
export const indexInfo = (ajaxParams) => wxRequest(API_PATH + '/index.do', ajaxParams, 'POST')

//用户手机号密码登录
export const normalLogin = (ajaxParams) => wxRequest(API_PATH + '/user/normalLogin.do', ajaxParams, 'POST')

//用户手机号密码登录
export const UserPhoneLogin = (ajaxParams) => wxRequest(API_PATH + '/user/normalLogin.do', ajaxParams, 'POST')

//发送验证码
export const apiSendCode = (ajaxParams) => wxRequest(API_PATH + '/sms/sendVerify.do', ajaxParams, 'POST')

//校验验证码
export const apiVerifyCode = (ajaxParams) => wxRequest(API_PATH + '/sms/checkVerify.do', ajaxParams, 'POST')

//手机短信验证码登录
export const apiUserPhoneLogin = (ajaxParams) => wxRequest(API_PATH + '/user/fastLoginIncludeRegi.do', ajaxParams, 'POST')

//授权微信小程序账户登录
export const apiUserCodeLogin = (ajaxParams) => wxRequest(API_PATH + '/user/authMiniappLogin.do', ajaxParams, 'POST')

//绑定微信小程序和登录
export const apiUserBindCodeLogin = (ajaxParams) => wxRequest(API_PATH + '/user/bindWechatAndLogin.do', ajaxParams, 'POST')


