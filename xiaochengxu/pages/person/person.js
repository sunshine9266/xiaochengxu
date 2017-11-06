Page({
  data: {
    userInfo:{},
    wxUser:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo:res.userInfo
        })
      }
    });
     //根据键名称获取数据
    var value = wx.getStorageSync('wxUser');    
    if (value) {
      that.setData({
        wxUser: value
      })
    } 
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // 将数据存储在本地缓存中
    wx.setStorage({
      key: "wxUser", //键
      data: e.detail.value, //值
      success:function(){
        wx.showToast({
          title: '保存成功',
        })
      }
    })

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})