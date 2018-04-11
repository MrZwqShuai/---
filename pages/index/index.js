//index.js
//获取应用实例
const app = getApp();
var api = require('../../utils/api.js');
Page({
  data: {
    userInfo: {},
    // 首页导航
    navs: [],
    rewards: [],
  },
  onLoad: function () {
    //判断用户是否授权，并且获取用户信息
    var that = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.loginByCode();
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.loginByCode();
            }
          })
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  //获取用户信息赋值到页面
  getAppUserInfo: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  // 获取首页展示的积分商品
  getIntegralGoods: function () {
    var that = this;
    wx.request({
      url: api.url + '/ezShop/services/index/integralGoods',
      method: 'POST',
      header: {
        'content-type': 'application/json'
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
    wx.showLoading({
      title: '加载中',
    })
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
        });
        wx.hideLoading();
      }
    })
  },
  /**
   * 获取推广消息
   */
  getExtensionNews: function () {
    wx.request({
      url: api.url + '/ezShop/services/index/getExtensionNews',
      method: 'POST',
      success: (res) => {
        console.log(res);
      },
      fail: (e) => {
        app.showErrorToast(this, '数据读取错误(getExtensionNews)', 1000);
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
    //设置只能访问现在开放的连接地址
    console.log(pageUrl);
    if (pageUrl != '../backpack/backpack' && pageUrl != '../sign2/sign2') {
      // return;
    }
    wx.navigateTo({
      url: pageUrl,
      complete: function () {
      }
    })
  },
  getWxUserInfo: function () {
    if (app.globalData.userInfo) {
      return;
    }
    var that = this;
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
      }
    })
  },
  loginSetUserInfo: function (data) {
    app.globalData.userInfo.points = data.datas.integral
    app.globalData.userInfo.rank = data.datas.rank
    app.globalData.userInfo.fragment = data.datas.fragment
    app.globalData.userInfo.userId = data.datas.userId
    //获取用户信息
    this.getAppUserInfo();
    //获取首页展示的积分商品
    this.getIntegralGoods();
    //获取首页导航
    this.getNavs();
    //获取推广消息
    this.getExtensionNews();
  },
  loginByCode: function () {
    //获取微信的用户信息
    this.getWxUserInfo();
    var that = this;
    // 登录
    wx.showLoading({
      title: '加载中',
    });
    wx.login({
      success: res => {
        wx.request({
          url: api.url + '/ezShop/services/login/loginByCode?wxCode=' + res.code,
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: ({ data }) => {
            if (data.stateCode == '0000') {
              wx.hideLoading();
              if (!data.datas.isFirstLogin) {
                that.loginSetUserInfo(data);
              } else {
                wx.redirectTo({ url: '../login/login', })
              }
            } else {
              wx.hideLoading();
              app.showErrorToast(this, data.errMsg, 1000);
            }
            wx.setStorageSync('J_SESSID', data.datas.J_SESSID);
          }
        })
      }
    })
  },
  //点击头像事件
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})
