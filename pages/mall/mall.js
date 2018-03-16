const API = require('../../utils/api.js').url;
const imgUrl = require('../../utils/api.js').imgUrl;
const app = getApp()
var api = require('../../utils/api.js');
// pages/mall/mall.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageNum: 1,
    pageSize: 4,
    isHavaPage: true,
    coupons: [{
      cash: 10,
      couponScore: 1000
    }, {
      cash: 50,
      couponScore: 5000
    }, {
      cash: 100,
      couponScore: 10000
    }],
    goods: [],
    imgUrl: imgUrl,
    scrollLimit: true
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
    this.setData({
      pageNum: 1
    })
    this.getIntegralGoods(this.data.pageNum);
  },

  // 获取首页展示的积分商品
  getIntegralGoods: function (pageNum) {
    this.data.scrollLimit = false
    wx.showLoading({
      title: '加载中',
    })
    console.log(888)
    wx.request({
      url: API + '/ezShop/services/integral/integralGoods?pageNum=' + pageNum + '&pageSize=' + this.data.pageSize, //仅为示例，并非真实的接口地址
      //data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res) => {
        // if (res.data.datas == null) {
        //   this.setData({
        //     isHavaPage: false
        //   })
        //   this.toTostIsNull();
        //   return;
        // }
        //给页面的积分商品赋值
        if (res.data.stateCode == '0000') {
          wx.hideLoading();
          let addGoods = this.data.goods.concat(res.data.datas);
          this.setData({
            goods: addGoods
          });
          this.data.pageNum++;
          this.data.scrollLimit = true
        } else if (res.data.stateCode == '409') {
          // 数据加载完成
          wx.showToast({
            title: res.data.errMsg,
          });
        } else {
          wx.hideLoading();
          wx.showLoading({
            title: res.data.errMsg
          });
        }
      },
      fail: (e) => {
        wx.hideLoading();
        console.log('读取接口失败' + e.message);
      }
    })
  },
  loadmore() {
    if (this.data.scrollLimit) {
      this.getIntegralGoods(this.data.pageNum);
    }
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
  // onPullDownRefresh: function () {
  //   this.setData({
  //     pageNum: 1,
  //     goods:[]
  //   })
  //   this.getIntegralGoods();
  //   wx.stopPullDownRefresh();
  // },

  // toTostIsNull:function(){
  //   wx.showLoading({
  //     title: '已经到底了',
  //     icon: 'none',
  //     duration: 1000,
  //   })
  // },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  //   if (!this.data.isHavaPage){
  //     this.toTostIsNull();
  //     return ;
  //   }
  //   var num = this.data.pageNum + 1;
  //   this.setData({
  //     pageNum: num
  //   })
  //   this.getIntegralGoods();
  // },
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})