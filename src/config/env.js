/**
 * 公共配置变量
 * API_PATH 接口URL
 * PRICE_RANGE 匹配价格区间
 */
var API_PATH = 'http://120.25.89.85:8084'


const isDEV = process.env.NODE_ENV === 'development'

export {
  API_PATH,
  isDEV
}
