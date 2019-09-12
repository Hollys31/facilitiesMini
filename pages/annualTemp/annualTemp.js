// pages/annualTemp/annualTemp.js
const app = getApp();
const API = require('../../utils/api.js')
import { chartInit } from '../../model/chartset.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devId: '',
    hasChartData: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChartData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getChartData: function () {//获取年积温图表数据
    const _this = this;
    API.annualTempChart({
      devId: app.globalData.devId
    }).then(res => {
      if (res.data.tempData.length > 0) {
        _this.setData({
          hasChartData: true
        })
        _this.chartComponent = _this.selectComponent('#chart');
        _this.chartComponent.init((canvas, width, height) => {
          chartInit(canvas, width, height, res.data.tempData, {
            'color': '#1adee2',
            'propertX': 'updateTime',
            'propertY': 'totalTemp'
          }, 'h')
        })
      } else {
        _this.setData({
          hasChartData: false
        })
      }

    })
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