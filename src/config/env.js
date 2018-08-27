/**
 * 公共配置变量
 * API_PATH 接口URL
 * PRICE_RANGE 匹配价格区间
 */
var API_PATH = 'https://giftcard.hm.liby.com.cn'

var API_PATH2 = 'https://clubwxuat.hm.liby.com.cn'

const isDEV = process.env.NODE_ENV === 'development'

export {
  API_PATH,
  API_PATH2,
  isDEV
}
