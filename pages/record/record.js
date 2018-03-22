var api = require('../../utils/api.js');
var app = getApp();
// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordHistory: [],
    keyword: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mockRecord(8);
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
   * mock 数据
   */
  mockRecord: function (frequency) {
    let i = 0;
    let increment = [{
      content: '内容内容内容内容内容内容',
      date: '2018年2月24'
    }];
    while (i < frequency) {
      this.data.recordHistory = this.data.recordHistory.concat(increment);
      i++;
    }
    this.setData({
      recordHistory: this.data.recordHistory
    });
  },
  loadmore: function () {
    this.showLoading();
    let increment = [{
      content: '内容内容内容内容内容内容',
      date: '2018年2月24'
    }];
    this.data.recordHistory = this.data.recordHistory.concat(increment);
    this.setData({
      recordHistory: this.data.recordHistory
    });
    setTimeout(() => {
      wx.hideLoading();
    }, 500);
  },
  showLoading: function () {
    wx.showLoading({
      title: '加载中',
    })
  },
  /**
   * 获取消费记录
   */
  getConsRecordsByUserId: function () {
    wx.request({
      url: api.url + '/ezShop/services/integral/getConsRecordsByUserId',
      data: {
        userId: app.globalData.userInfo.userId,
        keyword: this.data.keyword
      },
      success: ({ data }) => {
        console.log(data);
      }
    })
  },
  /**
   * 搜索
   */
  searchBlur: function (event) {
    this.data.keyword = event.detail.value;
  }
})