// pages/album/album.js
const app = getApp();
const API = require('../../utils/api.js')
import { formatTime,getDay } from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    devId: app.globalData.devId,//设备id
    days: [],//七天日期信息
    photos: [],//相册列表
    currentPage: 1,
    currDay: formatTime(new Date()),
    currDayInd: 6,
    total:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const today = formatTime(new Date());
    this.getPhotoList(today)
    this.lastestSevenDay();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  lastestSevenDay: function () {//获取最近7天日期
    let day = 7;//最近7天的日期 星期
    let days = getDay(day);
    this.setData({
      days
    })
  },
  getPhotoList(day) {//获取相册列表
    const _this = this;
    API.photoList({
      time: day,
      devId: app.globalData.devId,
      currentPage: _this.data.currentPage,
      pageSize: 4
    }).then(res => {
      let photoList = _this.data.photos;
      if (res.data.photos && res.data.photos.length > 0) {
        photoList = photoList.concat(res.data.photos);
      }
      _this.setData({
        photos: photoList,
        total: res.data.page.totalCounts
      })
    })
  },
  getpanoVideo(day){
    API.panoVideo({
      time: day,
      devId: app.globalData.devId,
    }).then(res=>{
      console.log(res);
    })
  },
  changeDays(e) {//切换日期
    const day = e.currentTarget.dataset.val;
    const ind = e.currentTarget.dataset.index;
    this.data.currDay=day;
    this.data.currentPage=1;
    this.setData({
      currDayInd:ind,
      photos:[]
    })
    this.getPhotoList(day);
    this.getpanoVideo(day);
  },
  playVideo(){
    
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
    this.data.currentPage = this.data.currentPage + 1;
    this.getPhotoList(this.data.currDay);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})