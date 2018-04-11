// pages/awards-record/awards-record.js
const app = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordHistory: [],
    pageNum: 0,
    noAwardsRecords: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initPrizeRecords()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
   * 抽奖记录init
   */
  initPrizeRecords: function() {
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: api.url + '/ezShop/services/prizes/getPrizeRecords',
      method: 'GET',
      data: {
        userId: app.globalData.userInfo.userId,
        // userId: 32807,
        pageNum: this.data.pageNum,
        pageSize: 20
      },
      success: ({data}) => {
        if (data.stateCode == '0000') {
          wx.hideLoading();
          console.log(data.datas);
          if(!data.datas) {
            wx.showToast({
              title: '没有更多记录了~',
              duration: 1000
            });
            this.data.noAwardsRecords = true;
          }
          this.data.recordHistory = this.data.recordHistory.concat(data.datas);
          this.setData({
            recordHistory: this.data.recordHistory
          });
        } else {
          wx.hideLoading();
          app.showErrorToast(this, data.errMsg, 1000);
        }
      },
      fail: (e) => {
        wx.hideLoading();
      }
    })
  },
  /**
   * 上拉加载
   */
  loadmore: function () {
    if (this.hasNoAwardsRecords()) {
      return;
    } else {
      this.data.pageNum++;
      wx.showLoading({
        title: '加载中',
      });
      this.initPrizeRecords();
    }
  },
  /**
   * 没有更多商品了
   */
  hasNoAwardsRecords: function() {
    return this.data.noAwardsRecords
  }
})