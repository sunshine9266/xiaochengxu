// 引入SDK核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    tempData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '66CBZ-YJ464-3XZU5-XPLNL-F7QH7-XNFJL'
    });

    var that = this;
    wx.request({
      url: 'https://gsruiying.com.cn/shop/getAll ',
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          listData: res.data,
          tempData:res.data
        });
      },
      fail: function () {
        console.log("请求失败");
      }
    })    
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },
  
  openLocation: function (e) {
    //获取点击的地址参数
    var shopaddress = e.currentTarget.dataset.shopaddress;
    // 调用接口 
    qqmapsdk.geocoder({
      address: shopaddress,  // 根据地址调用
      success: function (res) {
        console.log(res);
        //在小程序在中打开腾讯地图
        wx.openLocation({
          latitude: res.result.location.lat, // 获取返回的经纬度
          longitude: res.result.location.lng,
          address: shopaddress,
          scale:18  //地图的缩放比例
        });
      },
      fail: function (res) {
        wx.showToast({
          title: "获取店铺位置失败",
          icon: 'error',
        })
      }
    });
  },
  
  //页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    var that = this;
    //在标题栏中显示加载
    wx.showNavigationBarLoading();
    //加载数据
    wx.request({
      url: 'https://gsruiying.com.cn/shop/getAll ',
      method: "GET", 
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //将获取的结果放在临时数组中
        for (var item in res.data){
          that.data.tempData.push(res.data[item]);
        }
        that.setData({
          listData: that.data.tempData
        });
        //完成停止加载
        wx.hideNavigationBarLoading();
         //停止下拉刷新
        wx.stopPullDownRefresh();
      },
      fail: function () {
        console.log("请求失败");
      }
    });
  },

})