// pages/chart/chart.js
const app = getApp();
const API = require('../../utils/api.js')
/* import { chartOption } from '../../model/chartset.js' */

Page({

  /**s
   * 页面的初始数据
   */
  data: {
    params: {
      eqType: 'temp',
      data: [],

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    const _this = this;
    API.chartAllData({
      eqType: 'temp',
      timeType: '3',
      devId: 'YF000100001'
    }).then(res => {
      wx.showToast({
        title: "11"
      })

    }) 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getChartData: (eqType, timeType) => {//获取图表数据
    const _this = this;
    
   
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