// pages/ranks/ranks.js

let pageIndex = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: [],
    loadMoreState: 0
  },

  cellTap: (event) => {
    wx.navigateTo({
      url: '../newsInfo/newsInfo?newsId=' + event.currentTarget.dataset.id
    })
  },

  fetchData(isPullDown) {
    wx.showNavigationBarLoading()
    const page = isPullDown ? 1 : pageIndex
    wx.request({
      url: "https://interface.sina.cn/wx_api/rank.d.html",
      data: {
        page: page
      },
      success: res => {
        // console.log(res.data)
        let array = []
        if (isPullDown) {
          pageIndex = 2
          array = res.data.list
        } else {
          pageIndex++
          array = this.data.rankList.concat(res.data.list)
        }
        // console.log(array)
        this.setData({
          rankList: array,
          loadMoreState: res.data.list.length > 0 ? 0 : 2
        })
      },
      complete: res => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchData(false)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.fetchData(true)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      loadMoreState: 1
    });
    this.fetchData(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})