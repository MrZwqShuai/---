const API = require('../../utils/api.js').url;
// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    goods: [{
      img: '/images/nav01.png',
      name: '贯日湿巾80片',
      fragment: 900
    }, {
      img: '/images/nav02.png',
      name: '麦卡纸抽',
      fragment: 1600
      }, {
        img: '/images/nav03.png',
        name: '麦卡纸抽',
        fragment: 1000
    }, {
      img: '/images/nav04.png',
      name: '麦卡纸尿裤',
      fragment: 1500
      }, {
        img: '/images/nav01.png',
        name: '贯日湿巾80片',
        fragment: 900
      }, {
        img: '/images/nav02.png',
        name: '麦卡纸抽',
        fragment: 1600
      }, {
        img: '/images/nav03.png',
        name: '麦卡纸抽',
        fragment: 1000
      }, {
        img: '/images/nav04.png',
        name: '麦卡纸尿裤',
        fragment: 1500
      }]
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
  // 加载更多商品
  loadmore: function() {
    this.showLoading();
    wx.request({
      url: API + '/loadMore',
      success: ({data}) => {
        this.data.goods = this.data.goods.concat(data.data.goods);
        this.setData({
          goods: this.data.goods
        });
        wx.hideLoading();
      },
      fail: (error) => {
        console.log(error.data.goods);
        wx.hideLoading();
        wx.showToast({
          title: '数据加载错误(findUser)',
          icon: "none",
          duration: 2000
        })
      }
    })
  },
  showLoading() {
    wx.showLoading({
      title: '加载中',
    })
  }
})