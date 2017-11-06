//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://gsruiying.com.cn/coupon/news',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          banner: res.data.top_stories,
          list: [{ header: '今日热闻' }].concat(res.data.stories)
        })
      }
    })
    this.index = 1
  },
  
  //扫码
  scanCode: function () {
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var data = "扫码的结果是：" + res.result;
        data += "扫码的类型是：" + res.scanType;
        wx.showModal({
          title: '扫码成功',
          content: res.result
        });
      }
    });
  }
})
