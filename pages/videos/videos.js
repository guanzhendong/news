// pages/videos/videos.js

let pageIndex = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    loadMoreState: 0,
    url: 'http://ugcydzd.qq.com/uwMRJfz-r5jAYaQXGdGnC2_ppdhgmrDlPaRvaV7F2Ic/q08321n7pqo.mp4?vkey=23C8014962FEAE088258683A3B5DFE03A8A72C7FE48D3B5ECBCD7B6966BD8CC9DC6B416B7D8CFF2EC2094971A66033BBEBBE3E3EE3696A3BE847D0D53AEDC06F4A6B7F07F6E1856429C63F6937F058496EC974B24F52F1A9B652C6FE7D27BC16F448BC6805F9BAECB66E3B34FFEE9113D608AE67A3FFB0B4&br=73&platform=2&fmt=auto&level=0&sdtfrom=v1010&guid=b10417f97553ca82b4beb44108839780'
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