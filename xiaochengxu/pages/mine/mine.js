Page({

  data: {
    userInfo:{}
  },

  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        });
      }
    })
  },

  gotoPage:function(){
    wx.navigateTo({
      url: '/pages/person/person',
    })
  },

  //清除缓存的数据
  clearData:function(){
    // 清除缓存的数据
    wx.clearStorage();
    wx.showToast({
      title: '清除成功',
    })
  }

})