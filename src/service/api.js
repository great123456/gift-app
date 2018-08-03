// 首页
import wxRequest from '@/config/wxRequest2'
import { API_PATH2 } from '@/config/env'

// 首页轮播
export const apiIndexBanner = (ajaxParams) => wxRequest(API_PATH2 + '/openapi/getAdvertisingByChannel.htm', ajaxParams, 'GET')