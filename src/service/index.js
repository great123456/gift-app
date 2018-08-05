// 首页
import wxRequest from '@/config/wxRequest'
import { API_PATH } from '@/config/env'

// 首页获取所有礼品卡展示
export const allCardList = (ajaxParams) => wxRequest(API_PATH + '/lilejia/appCardController.do?getAllCard', ajaxParams, 'GET')

//获取礼品卡详情页
export const apiGiftDetail = (ajaxParams) => wxRequest(API_PATH + '/lilejia/appCardController.do?getCardDetail', ajaxParams, 'GET')

//授权登录
export const apiUserCodeLogin = (ajaxParams) => wxRequest(API_PATH + '/liejia/WebService.do?decodeUserInfo', ajaxParams, 'GET')

