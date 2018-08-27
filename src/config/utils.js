// 基础库版本比较
// 如果v2 > v1，则返回1，v1传兼容的版本，v2 传用户的版本
export const compareVersion = (v1, v2) => {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

// js获取当前时间前后N天前后日期的方法
export const getDateStr = (AddDayCount) => {
  let dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

  let y = dd.getFullYear()
  let m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1) // 获取当前月份的日期，不足10补0
  let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
  return y + '-' + m + '-' + d
}

export const toCanvas = async(pageEl, pageE2, canvasWidth, canvasHeight) => {
  const html2canvas = import('html2canvas')
  console.log('html-canvas',pageEl)
  //  获取想要转换的DOM节点
  let box = pageEl
  let outBox = pageE2
  // DOM 节点计算后宽高
  let width = box.getBoundingClientRect().width
  let height = box.getBoundingClientRect().height
  let scaleBy = 2   // 此处原为DPR()计算出的像素比，为了清晰改了2倍；
  // 创建自定义 canvas 元素
  let canvas = document.createElement('canvas')
  // 可设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比或固定宽高
  canvas.width = canvasWidth || width * scaleBy
  canvas.height = canvasHeight || height * scaleBy
  // 获取画笔
  let context = canvas.getContext('2d')
  // 将所有绘制内容放大像素比倍
  context.scale(scaleBy, scaleBy)
  // 将自定义 canvas 作为配置项传入，开始绘制

  console.log('to-canvas',context)
  return new Promise((resolve) => {
    html2canvas(box).then(canvas => {
      outBox.innerHTML = ''
      let dataUrl = canvas.toDataURL('image/jpeg')
      let newImg = document.createElement('img')
      newImg.classList.add('full-img')
      newImg.src = dataUrl
      newImg.addEventListener('click', (e) => {
        let event = e || window.event
        event.preventDefault()
      }, false)
      outBox.appendChild(newImg)
      resolve(dataUrl)
    })
  })
}

