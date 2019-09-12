// components/pagination/pagination.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    currPage: {/* 当前页 */
      type: Number,
      value:0,
      observer: '_loadMoreData'
    },
    initImmediately: {
      type: Boolean,
      value: true,
      observer: function (val) {
        if (val && !this.data.initState) {
          this.initData()
        }
      }
    },
    size: {//页数
      type: Number,
      value: 3
    },
    ondata:{
      type:Boolean,
      value:false
    },
    total: Number,/* 列表条数 */
    list: {
      type: Array,
      observer: '_endState'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    initState: false, // 是否已经加载过
    loading: false,
    ended: false,
    
  },
  lifetimes: {
    attached: function () {
     
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    initData() {
      this._loadMoreData()
      this.setData({
        initState: true
      })
    },
    _loadMoreData() {//加载数据
      const { loading, ended, size } = this.data
      if (loading) return
      if (ended) return
      this.setData({
        loading: true,
      })
      this.triggerEvent('getList', {
        size
      })
    },
    _endState(val, oldVal) {
      if (!this.data.initState) return
      const { total, list } = this.properties
      let ended = false
      if (list.length >= total) {
        ended = true
      }
      this.setData({
        loading: false,
        ended
      })
    },
  }
})
