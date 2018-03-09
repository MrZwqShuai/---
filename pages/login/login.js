import util from '../../utils/util.js'
const app = getApp();
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginValidate: {},
    countdown: '我要获取',
    validMessage: '请输入正确的手机号',
    times: 59,
    isCountDown: false,
    // 发送验证码禁用点击
    isNeedDsiable: false
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
    console.log(999);
    this.setData({
      isCountDown: true
    });
    this.countDown();
  },
  countDown: function () {
    this.hideSendCodeBtn();
    let timer = setInterval(() => {
      this.data.times--;
      this.setData({
        times: this.data.times
      });
      console.log(this.data.times);
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
  /**
   * 登录
   */
  login: function (phoneNum) {
    if (!this.loginValidate.isValid(phoneNum)) {
      wx.showLoading({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
    }
    // 登录跳转
    wx.navigateTo({
      url: '../index/index',
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