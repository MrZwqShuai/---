const app = getApp();
import util from '../../utils/util.js';
var api = require('../../utils/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    vCode: '',
    loginValidate: {},
    countdown: '我要获取',
    validMessage: '请输入正确的手机号',
    times: 59,
    isCountDown: false,
    // 发送验证码禁用点击
    isNeedDsiable: false,
  },
  phoneBlur: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  vcodeBlur: function (e) {
    this.setData({
      vCode: e.detail.value
    })
  },
  // 显示发送验证码控件
  showSendCodeBtn() {
    this.setData({
      isNeedDsiable: false
    });
  },
  // 隐藏发送验证码控件
  hideSendCodeBtn() {
    this.setData({
      isNeedDsiable: true
    });
  },
  sendCode: function () {
    if (!this.loginValidate.isValid(this.data.phoneNum)) {
      app.showErrorToast(this, '请输入正确的手机号', 1000);
    } else {
      this.sendVCode();
      this.setData({
        isCountDown: true
      });
      this.countDown();
    }
  },
  countDown: function () {
    this.hideSendCodeBtn();
    let timer = setInterval(() => {
      this.data.times--;
      this.setData({
        times: this.data.times
      });
      if (this.data.times <= 0) {
        clearInterval(timer);
        this.setData({
          isCountDown: false
        });
        this.data.times = 59;
        this.showSendCodeBtn();
      }
    }, 1000);
  },
  sendVCode: function () {
    var session_id = wx.getStorageSync('J_SESSID');//本地取存储的sessionID
    wx.request({
      url: api.url + '/ezShop/services/login/sendVCode?mobile=' + this.data.phoneNum,
      method: 'GET',
      header: {
        'content-type': 'application/json', // 默认值
        'Cookie': 'JSESSIONID=' + session_id
      },
      success: (res) => {
        if (res.data.stateCode == '0000') {
          app.showErrorToast(this, '发送成功', 1000);
        } else {
          app.showErrorToast(this, res.data.errMsg, 1000);
        }
      },
      fail: function (e) {
        app.showErrorToast(this, '数据读取错误(sendVCode)', 1000);
      }
    })
  },
  /**
   * 登录
   */
  login: function () {
    if (!this.loginValidate.isValid(this.data.phoneNum)) {
      app.showErrorToast(this, '请输入正确的手机号', 1000);
    } else if ('' == this.data.vCode) {
      app.showErrorToast(this, '请输入手机验证码', 1000);
    } else {
      this.loginByMobile(this.data.phoneNum, this.data.vCode);
    }
  },
  loginByMobile: function (mobile, vCode) {
    var that = this;
    var session_id = wx.getStorageSync('J_SESSID');
    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: api.url + '/ezShop/services/login/loginByMobile?wxCode=' + res.code + '&mobile=' + mobile + '&vCode=' + vCode,
          method: 'GET',
          header: {
            'content-type': 'application/json', // 默认值
            'Cookie': 'JSESSIONID=' + session_id
          },
          success: (res) => {
            if (res.data.stateCode == '0000') {
              that.setData({
                isCountDown: false,
                times: 0
              });
              that.showSendCodeBtn();
              if (!app.globalData.userInfo) {
                app.globalData.userInfo.points = res.data.datas.integral
                app.globalData.userInfo.rank = res.data.datas.rank
                app.globalData.userInfo.fragment = res.data.datas.fragment
                app.globalData.userInfo.userId = res.data.datas.userId
                // 跳转到首页
                wx.redirectTo({ url: '../index/index', })
              } else {
                setTimeout(function () {
                  app.globalData.userInfo.points = res.data.datas.integral
                  app.globalData.userInfo.rank = res.data.datas.rank
                  app.globalData.userInfo.fragment = res.data.datas.fragment
                  app.globalData.userInfo.userId = res.data.datas.userId
                  // 跳转到首页
                  wx.redirectTo({ url: '../index/index', })
                }, 1000);
              }
            } else {
              app.showErrorToast(this, res.data.errMsg, 1000);
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.loginValidate = new util.LoginValidate();
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

  }
})