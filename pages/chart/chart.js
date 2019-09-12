// pages/chart/chart.js
const app = getApp();
import { formatTime, getDay } from '../../utils/util.js'
const API = require('../../utils/api.js')
import { chartInit } from '../../model/chartset.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    opts: {},
    hasChartData: true,
    devId: '',
    tabSorts: [{ id: '1', name: '湿度', eqType: 'humid', unit: '%' }, { id: '2', name: '温度', eqType: 'temp', unit: '°C' }, { id: '3', name: '气压', eqType: 'pa', unit: 'Pa' }, { id: '4', name: '光照', eqType: 'sunlux', unit: 'Lux' }, { id: '5', name: '风速', eqType: 'speed', unit: 'm/s' }, { id: '6', name: '雨量', eqType: 'rain', unit: 'mm' }],
    dateTypes: [{ 'name': '昨日', 'value': '1' }, { 'name': '今日', 'value': '2' }, { 'name': '近一月', 'value': '3' }, { 'name': '近半年', 'value': '4' }, { 'name': '近一年', 'value': '5' }],
    currSortInd: 1,
    currUnit: '%',
    eqType: 'temp',
    currDateType: '1',//1：昨日 2：今日 3：近一个月  4：近半年 5：近一年
    latestEnvDatas: [],
    currDay: formatTime(new Date(), '/'),
    otherData: {}//日照 年积温等数据信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    this.getChartData('temp', this.data.currDateType)
    this.getChartOtherData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeTabSort: function (e) {//图表切换
    const eqType = e.currentTarget.dataset.eqtype;
    const indx = e.currentTarget.dataset.indx;
    const unit = e.currentTarget.dataset.unit;
    this.setData({
      currSortInd: indx,
      currUnit: unit,
      eqType: eqType
    })
    this.getChartData()
  },
  getChartData: function (eqType, timeType) {//获取图表数据
    const _this = this;
    API.chartAllData({
      eqType: _this.data.eqType,
      timeType: _this.data.currDateType,
      devId: app.globalData.devId
    }).then(res => {
      _this.setData({
        latestEnvDatas: res.data.latestEnvDatas
      })
      if (res.data.envDatas && res.data.envDatas.length > 0) {
        _this.setData({
          hasChartData: true
        })
        _this.chartComponent = _this.selectComponent('#chart');
        _this.chartComponent.init((canvas, width, height) => {
          chartInit(canvas, width, height, res.data.envDatas, {
            'color': '#1adee2',
            'propertX': 'month',
            'propertY': 'avgData'
          }, _this.data.currUnit)
        })
      } else {
        _this.setData({
          hasChartData: false
        })
      }

    })
  },
  getChartOtherData: function (devId) {//日照 年积温数据
    const _this = this;
    API.chartOtherData({
      devId: app.globalData.devId
    }).then(res => {
      _this.setData({
        otherData: res.data
      })
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