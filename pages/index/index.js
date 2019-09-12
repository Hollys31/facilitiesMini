//index.js
//获取应用实例
const app = getApp()
const API = require('../../utils/api.js')
const device = require('../../model/device.js')
Page({
  data: {
    name: '',//搜索条件
    deviceList: [],
    page: {},
    currPage: 1,
    ondata: false,
    showModal:false
  },

  onLoad: function () {
    wx.hideTabBar();
    wx.showLoading({
      title: '加载中',
    })
    this.data.currPage=1;
    this.data.name="";
    this.data.deviceList= [];
    this.data.page= { };
    if(app.globalData.openId){
      this.getHomeList();
    }else{
      this.initgetHomeList();
    }
    
  },

  /*
  获取首页设备列表
  */
  getHomeRequest() {
    const _this = this;
    const currPage = _this.data.currPage;
    const name = _this.data.name;//搜索条件
    API.getHome({
      openId: app.globalData.openId,
      name: name,
      currentPage: currPage,
      pageSize: 3
    }).then(res => {
      let deviceList = res.data.deviceDatas;
      if (res.data.deviceDatas && res.data.deviceDatas.length > 0) {
        deviceList = _this.data.deviceList.concat(res.data.deviceDatas);
        _this.setData({
          ondata: false
        })
      } else {
        deviceList = _this.data.deviceList;
        _this.setData({
          ondata: true
        })
      }
      _this.setData({
        deviceList: deviceList,
        page: res.data.page,
      })
    })
  },
  initgetHomeList() {
    const _this = this;
    app.getOpenId().then(res => {
      app.globalData.openId = res
      _this.getHomeRequest();
    })
  },
  getHomeList() {
    this.getHomeRequest();
  },
  searchFocus(e) {//搜索框聚焦
  },
  searchBlur(e) {//移出搜索框
    const val = e.detail.value;
    console.log(e.detail.value);
    this.setData({
      name: val
    })
  },
  searchDevice() {//搜索设备
    const _this = this;
    _this.setData({//数据初始化
      currPage: 1,
      deviceList: []
    })
    _this.getHomeList()
  },
  addEquiement(){//添加设备
   
      device.addEquiement();

  },
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    this.data.currPage = this.data.currPage + 1;
    this.getHomeList();
  },
})
