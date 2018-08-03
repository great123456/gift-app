import md5 from 'js-md5'
const appid = 'wx59e86e594123f552'
const appSecret = 'bce38bd8c953ffd6f94c4a96b252accb'

export default async(url, params, method) => {
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method || 'POST',
      data: params,
      header: {
        'Content-Type': 'application/json'
      },
      success: (response) => {
        resolve(response.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

function getToken(){
  
}