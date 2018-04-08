var api = require('../../utils/api.js');
var app = getApp();
// pages/sign/sign.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeCount: 0
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
    this.getPrizeCount();
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
  
  },
  /**
   * 用户签到
   */
  sign: function() {
    wx.request({
      url: api.url + '/ezShop/services/user/sign',
      data: {
        userId: app.globalData.userInfo.userId
      },
      success: ({data}) => {
        if (data.stateCode == '0000') {
          wx.showToast({
            title: '签到成功~',
          });
        } else {
          app.showErrorToast(this, data.errMsg, 1000);
        }
      }
    })
  },
  /**
   * 获取用户抽奖次数
   */
  getPrizeCount: function() {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.url + '/ezShop/services/user/getPrizeCount',
      data: {
        userId: app.globalData.userInfo.userId
      },
      success: ({data}) => {
        this.setData({
          prizeCount: data.datas.count
        });
        wx.hideLoading();
      },
      fail: (res) => {
        app.showErrorToast(this, '数据读取错误(getPrizeCount)', 1000);
      }
    })
  }
})