//引入WxParse模块   
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    art: {},
    inputValue: '',
    src: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载提示
    wx.showLoading({
      title: '加载中',
    });
    //接受参数id
    var id = options.id;
    var that = this
    wx.request({
      url: 'https://gsruiying.com.cn/coupon/newsById/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
          
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */        
        setTimeout(function () {
          //隐藏加载提示并渲染数据
          that.setData({
            art: res.data,
            isShow:true
          });
          wx.hideLoading();
          WxParse.wxParse('article', 'html', res.data.body, that, 5);   
        }, 500);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  //获取文本的值
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },

  //发送弹幕
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: this.getRandomColor()
    })
  },

  getRandomColor: function() {
      let rgb = []
      for (let i = 0; i < 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  }
})