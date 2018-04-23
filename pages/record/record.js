var api = require('../../utils/api.js');
var app = getApp();
// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recordHistory: [],
    keyword: '',
    pageNum: 1
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
    this.getConsRecordsByUserId();
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
  },
  loadmore: function () {
    this.showLoading();
    this.getConsRecordsByUserId();
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
  getConsRecordsByUserId: function (e) {
    if (e) {
      this.data.pageNum = 0;
    }
    wx.request({
      url: api.url + '/ezShop/services/integral/getConsRecordsByUserId',
      data: {
        userId: 32807,
        // userId: app.globalData.userInfo.userId,
        keyword: this.data.keyword,
        pageNum: this.data.pageNum,
        pageSize: 10
      },
      success: ({ data }) => {
        console.log(data);
        if (data.stateCode == '0000') {
          if (data.datas) {
            wx.hideLoading();
            this.data.recordHistory = this.data.recordHistory.concat(data.datas);
            this.setData({
              recordHistory: this.data.recordHistory
            });
            this.data.pageNum++;
          } else {
            wx.showToast({
              title: '已经没有更多记录了~',
              duration: 1000
            });
          }
        } else {
          wx.hideLoading();
          app.showErrorToast(this, data.errMsg, 1000);
        }
      },
      fail: (err) => {
        wx.hideLoading();
        app.showErrorToast(this, '数据读取错误(getConsRecordsByUserId)', 1000);
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