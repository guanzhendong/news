// pages/videos/videos.js

let pageIndex = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    loadMoreState: 0,
    url: ''
  },

  cellTap: (event) => {
    wx.navigateTo({
      url: '../videoInfo/videoInfo?link=' + event.currentTarget.dataset.id
    })
  },

  fetchData(isPullDown, isReachBottom) {
    wx.showNavigationBarLoading()
    if (isReachBottom) {
      const that = this
      setTimeout(function () {
        that.startRequest(isPullDown)
      }, 1000)
    } else {
      this.startRequest(isPullDown)
    }
  },

  startRequest(isPullDown) {
    const page = isPullDown ? 1 : pageIndex
    wx.request({
      url: "https://c.m.163.com/recommend/getChanListNews?channel=T1457068979049&subtab=Video_Recom&size=10&offset=0&devId=MTcyODU0NTQ2MTI3NzAuMjg3MDU3NzYxNjQ1NTI5NDM=",
      success: res => {
        // console.log(res.data)
        let array = []
        if (isPullDown) {
          pageIndex = 2
          array = res.data.视频
        } else {
          pageIndex++
          array = this.data.videoList.concat(res.data.视频)
        }
        // console.log(array)
        this.setData({
          videoList: array,
          // url: decodeURIComponent(array[0].video_info.playurl),
          loadMoreState: res.data.视频.length > 0 ? 0 : 2
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
    this.fetchData(false, true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})