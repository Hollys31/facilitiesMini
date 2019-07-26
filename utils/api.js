const HTTP = require('./http.js');
const API_BASE_URL = "http://192.168.2.169:8080/applet/api/vi"
module.exports = {
  getHome: (params={}) => {//首页列表
    return HTTP({
      url: API_BASE_URL+ '/home',
      method:'POST',
      data: params
    })
  },
  getDeviceInfo:(params={})=>{//设备详情
    return HTTP({
      url: API_BASE_URL + '/home/equiementDetail',
      method: 'POST',
      data: params
    })
  },
  deleteDevice: (params = {})=>{//删除设备
    return HTTP({
      url: API_BASE_URL + '/home/delete',
      method: 'POST',
      data: params
    })
  },
  photoList:(params={})=>{//相册列表
  return HTTP({
    url: API_BASE_URL + '/home/photos',
    method: 'POST',
    data: params
  })
  },
  deviceAddress:(params={})=>{//设备地址信息
    return HTTP({
      url: API_BASE_URL + '/home/address',
      method: 'POST',
      data: params
    })
  },
  chartAllData:(params={})=>{
    return HTTP({
      url: API_BASE_URL + '/home/chart',
      method: 'POST',
      data: params
    })
  }
}
