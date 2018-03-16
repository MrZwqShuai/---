var api = require('/utils/api.js');
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          that.getWxUserInfo();
        } else {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.getWxUserInfo();
            }
          })
        }
      }
    });
  },
  getWxUserInfo: function () {
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              this.loginByCode();
            }
          })
  },
  loginByCode: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: api.url + '/ezShop/services/login/loginByCode?wxCode=' + res.code,
          method: 'GET',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (!res.data.datas.isFirstLogin) {
              if (!that.globalData.userInfo) {
                setTimeout(function () {
                  // 跳转到首页
                  that.loginSetUserInfo(res);
                  wx.redirectTo({ url: '../index/index', })
                }, 1000);
              } else {
                that.loginSetUserInfo(res);
                wx.redirectTo({ url: '../index/index', })
              }
            }
            wx.setStorageSync('J_SESSID', res.data.datas.J_SESSID)
          }
        })
      }
    })
  },
  loginSetUserInfo: function (res) {
    this.globalData.userInfo.points = res.data.datas.integral
    this.globalData.userInfo.rank = res.data.datas.rank
    this.globalData.userInfo.fragment = res.data.datas.fragment
    this.globalData.userInfo.userId = res.data.datas.userId
  },
  globalData: {
    userInfo: null
  }
})