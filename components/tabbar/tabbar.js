// components/tabbar/tabbar.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      this.editTabbar();
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    isIphoneX: app.globalData.isIphoneX,
    tabBar: {
      "color": "#333",
      "selectedColor": "#00BADB",
      "borderStyle": "white",
      "list": [
        {
          "selectedIconPath": "/resources/images/index1.png",
          "iconPath": "/resources/images/index.png",
          "pagePath": "/pages/index/index",
          "text": "首页"
        },
        {
          "selectedIconPath": "/resources/images/mine1.png",
          "iconPath": "/resources/images/mine.png",
          "pagePath": "/pages/mine/mine",
          "text": "我的"
        }

      ]
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handelTopage(e) {//跳转页面
      const url = e.currentTarget.dataset.url;
      wx.switchTab({
        url: url,
      })
    },
    editTabbar: function (tabbar) { //底部自定义tabbar
      let currentPages = getCurrentPages();
      let _this = currentPages[currentPages.length - 1];
      let pagePath = _this.route;
      (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
      let tabBar=this.data.tabBar;
      for (let i in  tabBar.list) {
        tabBar.list[i].selected = false;
        (tabBar.list[i].pagePath == pagePath) && (tabBar.list[i].selected = true);
      }
      this.setData({
        tabBar: tabBar
      })
    },
  }
})
