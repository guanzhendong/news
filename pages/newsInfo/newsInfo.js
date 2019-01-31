// pages/newsInfo/newsInfo.js

const WxParse = require('../../wxParse/wxParse');
import moment from '../../utils/moment'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: Object,
    pubDate: ''
  },

  fetchData(newsId) {
    const that = this
    wx.showNavigationBarLoading()
    wx.request({
      url: 'https://interface.sina.cn/wx_api/wx_app_article_info.d.json',
      data: {
        'newsId': newsId
      },
      success: function(res) {
        const data = res.data.data
        const date = moment(data.pubDate).format('MM月DD日 hh:mm')
        that.setData({
          info: data,
          pubDate: date
        })

        const pics = data.pics
        let content = data.content
        content = content.replace(/}--><br\/>/g, '}-->')// 去掉图片后面的换行
        const imgFlg = "<!--{IMG_"
        const imgCount = (content.split(imgFlg)).length - 1
        if (imgCount > 0) {
          for (let i = 0; i < imgCount; i++) {
            const imgStr = "<!--{IMG_" + (i+1) + "}-->"
            const imgSrc = "\"" + pics[i].data.pic + "\""
            const imgHTML = "<div> <img style=\"width:100%\" src=" + imgSrc + "> </div>"
            content = content.replace(imgStr, imgHTML)
          }
        }
        WxParse.wxParse('article', 'html', content, that, 5)
      },
      fail: function(res) {},
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
    this.fetchData(options.newsId)
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const that = this
    return {
      title: that.data.info.shareInfo.title,
      success: function (res) {
        wx.showToast({
          title: '已转发'
        })
      }
    }
  }
})