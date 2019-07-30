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
      url: "https://view.inews.qq.com/g2/getRecommendList?from=wxapp&reqType=2&forward=2&openid=oalP50PruT1V9QdTBoQDa5WY5N4Y&ukey=9a108d93-c362-476a-8b81-76c93550524a&unionid=onCs1uBzpp8H7FNErcge1m1IC9xY&cmnid=oDOGxv8aEZhnoQM706Ik3q6TGx2k&network=wifi&latitude=&longitude=&user_city=&last_time=1548731987&app_version=1701&language=zh_CN&wifiEnabled=true&bluetoothEnabled=false&deviceOrientation=portrait&locationAuthorized=true&notificationSoundAuthorized=true&screenHeight=896&windowHeight=726&system=iOS%2012.1.3&version=7.0.3&fontSizeSetting=17&notificationAuthorized=true&statusBarHeight=44&windowWidth=414&pixelRatio=3&notificationBadgeAuthorized=true&errMsg=getSystemInfo%3Aok&model=iPhoneXSMaxChina-exclusive_iPhone116&batteryLevel=58&screenWidth=414&locationEnabled=true&microphoneAuthorized=true&cameraAuthorized=true&albumAuthorized=true&notificationAlertAuthorized=true&brand=iPhone&platform=ios&SDKVersion=2.5.2&code=0238yQec2TaXBN05ANcc2LNwec28yQeG&news_token=4e4f6c8b2f66804a51841d196a0069fd&rawData=%7B%22nickName%22%3A%22Code%20Geass%22%2C%22gender%22%3A1%2C%22language%22%3A%22zh_CN%22%2C%22city%22%3A%22%22%2C%22province%22%3A%22%E7%BB%B4%E4%B9%9F%E7%BA%B3%22%2C%22country%22%3A%22%E5%A5%A5%E5%9C%B0%E5%88%A9%22%2C%22avatarUrl%22%3A%22https%3A%2F%2Fwx.qlogo.cn%2Fmmopen%2Fvi_32%2FrURvBicplInVvvMU3Q6iawEEc6CGib5WDwWR0ZzsblrqIlGGuv8gicTSRX21JeP9fSCNZ0NRRAzw5oeExzaMNciboxw%2F132%22%7D",
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data)
        let array = []
        if (isPullDown) {
          pageIndex = 2
          array = res.data.newslist
        } else {
          pageIndex++
          array = this.data.videoList.concat(res.data.newslist)
        }
        // console.log(array)
        this.setData({
          videoList: array,
          // url: decodeURIComponent(array[0].video_info.playurl),
          loadMoreState: res.data.newslist.length > 0 ? 0 : 2
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