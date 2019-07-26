const API = require('../utils/api.js')
const app = getApp();
const device = {
  deviceRequest: function (devid, type) {//设备数据信息请求
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    API.getDeviceInfo({
      devId: devid,
      type: type
    }).then((res) => {
      _this.setData({
        device: res.data
      })
    })
  },
  deleteConfirm: function () {//是否删除设备
  const that=this;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    wx.showModal({
      title: '提示',
      content: '确定是否删除设备',
      cancelColor: '#ccc',
      confirmColor: '#00badb',
      success(res) {
        if (res.confirm) {
          that.deleteDevice()
        }
      }
    })
  },
  deleteDevice: function () {//设备删除
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    API.deleteDevice({
      openId:app.globalData.openId,
      devId: app.globalData.devId
    }).then((res) => {
      wx.showToast({
        title: '设备已删除',
      })
      _this.data.timer = setTimeout(function () {
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }, 1500)
    })
  },
}
module.exports = device