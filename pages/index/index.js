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
    percent: '0%',
    members: [{
      url: '/images/diamonds-1.png',
      durl: '/images/diamonds-5.png',
    }, {
      url: '/images/diamonds-2.png',
      durl: '/images/diamonds-6.png',
    }, {
      url: '/images/diamonds-3.png',
      durl: '/images/diamonds-7.png',
    }, {  
      url: '/images/diamonds-4.png',
      durl: '/images/diamonds-8.png',
    },]
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
      this.getUserIFR(app.globalData.userInfo.userId);
    }
  },
  // 查询用户积分，碎片，排名信息--用来刷新页面
  getUserIFR: function (userId) {
    var that = this;
    wx.request({
      url: api.url + '/ezShop/services/user/getUserIntegralAndFragment?userId=' + userId,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //用户积分，碎片，排名信息赋值
        app.globalData.userInfo.points = res.data.datas.integral
        app.globalData.userInfo.rank = res.data.datas.rank
        app.globalData.userInfo.fragment = res.data.datas.fragment
        that.setData({
          userInfo: app.globalData.userInfo
        })
      }
    })
  },
  // 查询用户等级
  getUserLevel: function () {
    wx.request({
      url: api.url + '/ezShop/services/user/getUserLevel',
      method: 'GET',
      data: {
        userId: app.globalData.userInfo.userId
      },
      success: ({ data }) => {
        console.log(data);
        if (data.stateCode == '0000') {
          let experience = (data.datas.experience / 2000) * 100 + '%';
          experience = experience = 100 ? 100 : experience;
          this.setData({
            percent: experience
          });
        } else {
          app.showErrorToast(this, data.errMsg, 1000);
        }
      },
      fail: (error) => {
        app.showErrorToast(this, error.message, 1000);
      }
    })
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
    if (pageUrl != '../backpack/backpack' && pageUrl != '../sign2/sign2') {
      return;
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
    //加载用户排名积分
    this.getUserIFR(data.datas.userId);
    //获取用户信息
    this.getAppUserInfo();
    //获取首页展示的积分商品
    this.getIntegralGoods();
    //获取首页导航
    this.getNavs();
    //获取推广消息
    this.getExtensionNews();
    // 获取用户等级
    this.getUserLevel();
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
