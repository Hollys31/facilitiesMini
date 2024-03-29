// components/invalide/invalide.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    callModal: {
      type: Boolean,
      value: false
    },
    btnTxt:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handelCloseModal() {//关闭模态框
      this.setData({
        callModal: false
      })
    },
    catchModal() {

    },
    makephoneCall() {
      this.setData({
        callModal: false
      })
      this.triggerEvent('modalEvent')
    }
  }
})
