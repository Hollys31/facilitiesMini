//app.js
App({
  onLaunch: function () {
    wx.hideTabBar();
    this.getSystemInfo();
  },
  globalData: {
    openId: 'jfjdxd12365874258',
    userInfo: null,
    isIphoneX: false,
    devId:'',//当前查看设备id
  },
  getSystemInfo: function () { //获取设备信息
    let t = this;
    wx.getSystemInfo({
      success: function (res) {
        //console.log(res);
        t.globalData.isIphoneX = res.model.indexOf("iPhone X") > -1 ? true : false;
      }
    });
  },
})