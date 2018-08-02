import md5 from 'js-md5'

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

