//index.js
//获取应用实例
const app = getApp()
var api = require('../../utils/api.js');
Page({
  data: {
    baseUrl: app.url,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 首页导航
    navs: [],
    rewards: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onReady: function () {
    this.getUserInfo();
    this.getIntegralGoods();
    this.getNavs();
  },
  getUserInfo: function (e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    // 获取用户在贯日积分中的个人信息
    //this.getPoint();
  },
  // 获取用户在贯日积分活动中的信息
  getPoint: function () {
    this.data.userInfo.rank = '';
    this.data.userInfo.fragment = '';
    this.data.userInfo.points = '';
    this.setData({
      'userInfo.rank': '100',
      'userInfo.fragment': '100',
      'userInfo.points': '10'
    });
  },
  // 获取首页展示的积分商品
  getIntegralGoods: function () {
    var that = this;
    wx.request({
      url: api.url + '/ezShop/services/index/integralGoods', //仅为示例，并非真实的接口地址
      //data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        for (var index in res.data.datas) {
          res.data.datas[index].imgUrl = api.imgUrl + res.data.datas[index].imgUrl;
        }
        //给页面的积分商品赋值
        that.setData({
          rewards: res.data.datas
        })
      }
    })
  },
  // 获取首页导航
  getNavs: function () {
    var that = this;
    wx.request({
      url: api.url + '/ezShop/services/index/getNavs',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //给页面的积分商品赋值
        that.setData({
          navs: res.data.datas
        })
      }
    })
  },
  /**
   * 兑换礼品
   */
  exchange: function () {
    wx.navigateTo({
      url: '../mall/mall'
    })
  },
  /**
    * 转到详情
    */
  goToDetails: function (e) {
    var id = e.currentTarget.id;
    var goods_integral = e.currentTarget.dataset.integral;
    var points = app.globalData.userInfo.points;
    wx.navigateTo({
      url: '../goods-details/goods-details?id=' + id + '&points=' + points + '&goods_integral=' + goods_integral
    });
  },
  // 导航
  navigate(event) {
    let pageUrl = event.currentTarget.dataset.page;
    wx.navigateTo({
      url: pageUrl,
      complete: function () {
      }
    })
  },
})
