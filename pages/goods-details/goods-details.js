// pages/goods-details/goods-details.js
const app = getApp()
var api = require('../../utils/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    integration: '',
    goodsId: '',
    infoImgUrl: '',
    goods_integral: '',
    errorToast: {
      show: false,
      title: '',
      duration: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      points: options.points,
      goodsId: options.id,
      goods_integral: options.goods_integral
    })
    this.getIntegralGoodsById(options.id);
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
    this.setData({
      points: app.globalData.userInfo.points
    })
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
  convert() {
    var that = this;
    //获取到商品id
    var id = this.data.goodsId;
    //获取用户id
    var userId = app.globalData.userInfo.userId;
    wx.request({
      url: api.url + '/ezShop/services/integral/exchangeGoods?id=' + id + '&userId=' + userId,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        if (res.data.stateCode == '0000') {
          app.showErrorToast(this, '兑换成功', 1000)
          app.globalData.userInfo.points = app.globalData.userInfo.points - that.data.goods_integral
          setTimeout(function () {
            wx.navigateTo({
              url: '../backpack/backpack'
            });
          }, 1000);
        } else {
          app.showErrorToast(this, res.data.errMsg, 1000);
        }
      }
    })
  },
  getIntegralGoodsById(goodsId) {
    wx.request({
      url: api.url + '/ezShop/services/integral/getIntegralGoodsById',
      data: {
        id: goodsId
      },
      success: ({ data }) => {
        if (data.stateCode == '0000') {
          let goodsDetail = data.datas[0];
          this.setData({
            'infoImgUrl': api.imgUrl+goodsDetail.infoImgUrl
          });
        }
      },
      error: function (e) {
        console.log('数据读取失败' + e.message);
      }
    });
  }
})