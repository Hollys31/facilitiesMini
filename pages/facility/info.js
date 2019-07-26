// pages/facility/info.js
const device = require('../../model/device.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'YF2',
    device:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type){//设备类型
     this.setData({
       type: options.type
     })
    }
    if (options.devId) {//设备id
      const devid = options.devId;
      app.globalData.devId = devid;
      this.deviceRequest(devid);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  deviceRequest: function (devid) {//设备数据信息请求
    const _this = this;
    device.deviceRequest(devid,'YF2');
    
  },
  deleteDevice:function(){//删除设备
    device.deleteConfirm();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})