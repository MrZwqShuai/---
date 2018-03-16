// pages/goods-details/goods-details.js
const API = require("../../utils/api.js").url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    integration: 99,
    goodsId: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goodsId = options.goodsId;
    this.getIntegralGoodsById(this.data.goodsId);
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
  exchangeGoods() {
    wx.request({
      url: API + '/ezShop/services/integral/exchangeGoods?',
      data: {
        id: this.data.goodsId,
        // 暂时写死
        userId: 1
      },
      success: ({ data }) => {
        if (data.stateCode == '0000') {
          console.log(data);
          let goodsDetail = data.datas[0];
          wx.hideLoading();
        } else {
          wx.showToast({
            title: data.errMsg,
          });
        }
      },
      error: function (e) {
        console.log('数据读取失败' + e.message);
        wx.hideLoading();
      }
    });
  },
  convert() {
    wx.showLoading({
      title: '加载中',
    });
    this.exchangeGoods();
  },
  getIntegralGoodsById(goodsId) {
    wx.request({
      url: API + '/ezShop/services/integral/getIntegralGoodsById',
      data: {
        id: goodsId
      },
      success: ({ data }) => {
        if (data.stateCode == '0000') {
          let goodsDetail = data.datas[0];
          this.setData({
            integration: goodsDetail.ig_goods_integral
          });
        }
      },
      error: function (e) {
        console.log('数据读取失败' + e.message);
      }
    });
  }
})