//app.js
const API = require('/utils/api.js');
App({
  onLaunch: function () {
    wx.hideTabBar();
    this.getSystemInfo();
  },
  globalData: {
    openId: null,
    userInfo: null,
    isIphoneX: false,
    devId: '',//当前查看设备id
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
  wxLogin: new Promise(function (resolve, reject) {//微信登录
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject();
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }),
  getOpenId: function () {//获取openId
    const _this = this;
    return new Promise(function (resolve, reject) {
      _this.wxLogin.then(code => {
        API.getOpenId({ code: code }).then(res => {
         // _this.globalData.openId = res.data.openid;
          resolve(res.data.openid);
          return res.data.openid
        })
      })
    })
  },
})