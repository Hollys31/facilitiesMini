const HTTP = require('./http.js');
const API_BASE_URL = "https://device.yufengtek.com/equipment/api/vi"
module.exports = {
  getOpenId: (params = {}) => {//获取openid
    return HTTP({
      url: API_BASE_URL + '/login/openid/' + params.code,
      method: 'GET',
      data: {}
    })
  },
  addEquiement: (params = {}) => {//添加设备
    return HTTP({
      url: API_BASE_URL + '/home/addEquiement',
      method: 'POST',
      data: params
    })
  },
  getHome: (params = {}) => {//首页列表
    return HTTP({
      url: API_BASE_URL + '/home',
      method: 'POST',
      data: params
    })
  },
  getDeviceInfo: (params = {}) => {//设备详情
    return HTTP({
      url: API_BASE_URL + '/home/equiementDetail',
      method: 'POST',
      data: params
    })
  },
  deleteDevice: (params = {}) => {//删除设备
    return HTTP({
      url: API_BASE_URL + '/home/delete',
      method: 'POST',
      data: params
    })
  },
  photoList: (params = {}) => {//相册列表
    return HTTP({
      url: API_BASE_URL + '/home/photos',
      method: 'POST',
      data: params
    })
  },
  panoVideo: (params = {}) => {//全景视频
    return HTTP({
      url: API_BASE_URL + '/home/fullDayReality',
      method: 'POST',
      data: params
    })
  },
  deviceAddress: (params = {}) => {//设备地址信息
    return HTTP({
      url: API_BASE_URL + '/home/address',
      method: 'POST',
      data: params
    })
  },
  chartAllData: (params = {}) => {//图标
    return HTTP({
      url: API_BASE_URL + '/home/chart',
      method: 'POST',
      data: params
    })
  },
  chartOtherData: (params = {}) => {//日照时长 年积温数据
    return HTTP({
      url: API_BASE_URL + '/home/chartSunYearTemp',
      method: 'POST',
      data: params
    })
  },
  chartSunYearTemp: (params = {}) => {//年积温光照
    return HTTP({
      url: API_BASE_URL + '/home/chartSunYearTemp',
      method: 'POST',
      data: params
    })
  },
  sunshineChart: (params = {}) => {//光照图表
    return HTTP({
      url: API_BASE_URL + '/home/sunTime',
      method: 'POST',
      data: params
    })
  },
  annualTempChart: (params = {}) => {//年积温图表
    return HTTP({
      url: API_BASE_URL + '/home/yearTemp',
      method: 'POST',
      data: params
    })
  },
}
