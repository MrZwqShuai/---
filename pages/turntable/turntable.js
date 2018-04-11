// pages/sign2/sign2.js
const app = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drawAnimation: {},
    integralGoods: [],
    points: 0,
    rotateN: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData, 999)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getPrizes();
    console.log('app.globalData.userInfo.points', app.globalData.userInfo.points);
    this.setData({
      points: app.globalData.userInfo.fragment
    })
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
   * 开始转盘
   */
  startPlay: function () {
    this.prize();
  },
  /**
   * 获取奖品
   */
  getPrizes: function () {
    wx.request({
      url: api.url + '/ezShop/services/prizes/getPrizes',
      method: 'GET',
      success: ({ data }) => {
        console.log(data)
        if (data.stateCode == '0000') {
          this.setData({
            integralGoods: data.datas
          });
        } else {
          app.showErrorToast(this, data.errMsg, 1000);
        }
      }
    })
  },
  /**
   * 抽奖
   */
  prize: function () {
    wx.showLoading({
      title: '抽奖启动中',
    });
    wx.request({
      url: api.url + '/ezShop/services/prizes/prize',
      method: 'GET',
      data: {
        userId: app.globalData.userInfo.userId
        // userId: 32807
      },
      success: ({ data }) => {
        console.log(data);
        if (data.stateCode == '0000') {
          this.refreshUserInfo();
          wx.hideLoading();
          let id = data.datas.id
          this.playing(id);
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
  playing: function (awardId) {
      let animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
      console.log(awardId)
      this.animation = animation;
      animation.rotate(1440*this.data.rotateN-(awardId-1)*60).step();
      this.data.rotateN ++;
      this.setData({
        drawAnimation: animation.export()
      });
  },
  /**
   * 刷新个人信息
   */
  refreshUserInfo: function() {
    wx.request({
      url: api.url + '/ezShop/services/user/getUserIFR',
      method: 'GET',
      data: {
        userId: app.globalData.userInfo.userId
        // userId: 32807
      },
      success: ({data}) => {
        if (data.stateCode == "0000") {
          console.log(data, 999)
          this.setData({
            points: data.datas.fragment
          });
        } else {
          app.showErrorToast(this, data.errMsg, 1000);
        }
      }
    })
  },
  goMallPage: function () {
    wx.navigateTo({
      url: '../mall/mall',
    });
  },
  goAwardsRecordPage: function() {
    wx.navigateTo({
      url: '../awards-record/awards-record',
    })
  }
})