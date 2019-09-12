// components/myselect/myselect.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dateTypes:Array,
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    showItem: false,
    currname:'昨日'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleSelect(){
      this.setData({
        showItem: !this.data.showItem
      })
    },
    getSelectVal(e){
      const val = e.currentTarget.dataset.val;
      const name = e.currentTarget.dataset.name;
      this.setData({
        showItem:false,
        currname:name
      })
      let currentPages = getCurrentPages();
      let _that = currentPages[currentPages.length - 1];
      _that.setData({
        currDateType:val
      })
      this.triggerEvent('getTimeType',this)
    }
  }
})
