//index.js
//获取应用实例
const app = getApp()
const API = require('../../utils/api.js')
Page({
  data: {
    name: '',//搜索条件
    deviceList: [],
    page: {},
    currPage: 1
  },

  onLoad: function () {

  },
  /*
  获取首页设备列表
  */
  getHomeList() {
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
        deviceList = _this.data.deviceList.concat(res.data.deviceDatas)
      } else {
        deviceList = _this.data.deviceList
      }
      _this.setData({
        deviceList: deviceList,
        page: res.data.page
      })
    })
  },
  searchFocus(e) {//搜索框聚焦
  },
  searchBlur(e) {//移出搜索框
    const val = e.detail.value;
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
  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    this.data.currPage = this.data.currPage + 1;
    this.getHomeList();
  },
})
