// components/headHUD/headHUD.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'i love you'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: () => {
      const that = this
      that.setData({
        title: title,
        isShow: false
      })
      setTimeout(() => {
        this.setData({
          isShow: !this.data.isShow
        })
      }, 1000)
    }
  }
  
})
