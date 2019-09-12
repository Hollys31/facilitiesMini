const API = require('../utils/api.js')
const app = getApp();
const device = {
  addEquiement() {//添加设备
    let currentPages = getCurrentPages();
    let nowpage = currentPages[currentPages.length - 1];
    wx.scanCode({
      success(res) {
        API.addEquiement({
          openId: app.globalData.openId,
          qrCode: res.result
        }).then(res => {
          if (res.status == 200) {
            wx.switchTab({
              url: '/pages/index/index',
              success: function (e) {
                let pages = getCurrentPages();
                let currPage = pages[pages.length - 1]; //当前页面
                currPage.onLoad();
              }
            })
          } else {
            nowpage.setData({
              showModal: true
            })
          }
        })
      }
    })
  },
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
    const that = this;
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
      openId: app.globalData.openId,
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