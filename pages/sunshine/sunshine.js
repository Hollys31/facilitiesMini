// pages/chart/chart.js
const app = getApp();
import { doHandleMonth,formatTime, getMonth } from '../../utils/util.js'
const API = require('../../utils/api.js')
import { chartInit } from '../../model/chartset.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    devId: '',
    tabDate:[],
    currSortInd: 0,
    latestEnvDatas: [],
    currMonth: new Date().getFullYear() + "/" + doHandleMonth(new Date().getMonth()+1),
    hasChartData:true,
    totalSunTime:{},
    opts:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChartData()//图表数据
    this.setData({
      tabDate: getMonth()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeTabSort: function (e) {//图表切换
    const currMonth = e.currentTarget.dataset.val;
    const indx = e.currentTarget.dataset.indx;
    this.setData({
      currSortInd: indx,
      currMonth :currMonth
    })
    this.getChartData()
  },
  getChartData: function () {//获取光照图表数据
    const _this = this;
    API.sunshineChart({
      time: _this.data.currMonth,
      devId: app.globalData.devId
    }).then(res => {
      if (res.data.sunDatas.length>0){
        _this.setData({
          hasChartData:true,
          totalSunTime: res.data.totalSunTime
        })
        _this.chartComponent = _this.selectComponent('#chart');
        _this.chartComponent.init((canvas, width, height) => {
          chartInit(canvas, width, height, res.data.sunDatas, {
            'color': '#1adee2',
            'propertX': 'updateTime',
            'propertY': 'totalData'
          }, 'h')
        })
      }else{
        _this.setData({
          totalSunTime:{},
          hasChartData: false
        })
      }
     
    })
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