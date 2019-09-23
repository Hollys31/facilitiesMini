// pages/address/address.js
const app = getApp();
const API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device: {},
    markers:[],
    type:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type){
      this.data.type = options.type;
      this.getDeviceAddress()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getDeviceAddress() {//设备位置信息
    const _this = this;
    API.deviceAddress({
      devId: app.globalData.devId,
      type: _this.data.type
    }).then(res => {
      let iconPath=null;
      if (this.data.type==='YF1'){
        iconPath='/resources/images/local1.png'
      }else{
        iconPath = '/resources/images/local2.png'
      }
      _this.setData({
        device: res.data,
        markers:  [{
        iconPath: iconPath,
        id: 0,
        longitude: res.data.longitude,
        latitude: res.data.latitude,
        width: 49,
        height: 71
      }]
      })
    })
  },
  regionchange(e){

  },
  markertap(e){

  },
  controltap(e){

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