// components/loadMore/loadMore.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 0 隐藏，1 正在加载，2 没有数据了
    state: {
      type: Number,
      value: 0
    },
    loadingTitle: {
      type: String,
      value: '加载中...'
    },
    noMoreDataTitle: {
      type: String,
      value: '没有数据了，休息一会儿'
    },
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

  }
})
