// pages/sign2/sign2.js
const app = getApp();
var api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign: '点击签到',
    signSuccess: false,
    signStatus: false,
    signIntegral: 50,
    signRewardTxt: '优妈慧积分',
    signRwdCondition: '5天',
    signRwds: [{
      signIntegral: 100,
      signRewardTxt: '优妈慧积分',
      signRwdCondition: '10天',
      isSignReceived: true,
      isAccord: true
    }, {
      signIntegral: 100,
      signRewardTxt: '优妈慧积分',
      signRwdCondition: '5天',
      // 是否领取
      isSignReceived: false,
      // 是否达标
      isAccord: true
    }, {
      signIntegral: 200,
      signRewardTxt: '优妈慧积分',
      signRwdCondition: '15天',
      isSignReceived: false,
      isAccord: false
    }],
    myChoosedIdList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isSign();
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
   * 用户签到的日期
   */
  isSign: function() {
    wx.request({
      url: api.url + '/ezShop/services/user/isSign',
      method: 'GET',
      data: {
         userId: app.globalData.userInfo.userId
      },
      success: ({ data }) => {
        this.setData({
          myChoosedIdList: data.datas
        });
        // 触发日期组件里面的签到
        this.selectComponent("#calendar").initSignDays()
        if (data.stateCode == '0000') {
          wx.hideLoading();
          this.setData({
            signSuccess: false,
            signStatus: false
          });
        } else if (data.stateCode == '0001') {
          wx.hideLoading();
          this.setData({
            signStatus: true
          });
        } else {
          wx.hideLoading();
          this.setData({
            signSuccess: false,
            signStatus: false
          });
        }
      }
    })
  },
  /**
   * 签到
   */
  sign: function () {
    if (!this.hasSign()) {
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: api.url + '/ezShop/services/user/sign',
        method: 'GET',
        data: {
           userId: app.globalData.userInfo.userId
        },
        success: ({ data }) => {
          if (data.stateCode == '0000') {
            wx.hideLoading();
            this.setData({
              signSuccess: true,
              signStatus: true
            });
            this.isSign();
          } else if (data.stateCode == '0002') {
            wx.hideLoading();
            this.setData({
              signSuccess: false,
              signStatus: true
            });
          } else {
            wx.hideLoading();
            this.setData({
              signSuccess: false,
              signStatus: false
            });
          }
        }
      });
    }
  },
  /**
   * 是否已签到
   */
  hasSign: function () {
    return this.data.signStatus
  },
  close: function () {
    this.setData({
      signSuccess: false
    })
  },
  /**
   * 领取奖励
   */
  receive: function (e) {
    if (this.canReceive(e)) {
      wx.showLoading({
        title: '加载中',
        duration: 1000
      });
      setTimeout(() => {
        let index = e.currentTarget.dataset.index;
        wx.hideLoading();
        wx.showToast({
          title: '领取成功',
        });
        this.getReceive(index);
        this.setData({
          signRwds: this.data.signRwds
        });
      }, 1000)
    }
  },
  canReceive: function (e) {
    let receiveinfo = e.currentTarget.dataset.receiveinfo;
    if (receiveinfo.isAccord && !receiveinfo.isSignReceived) {
      return true;
    }
    return false;
  },
  getReceive: function (index) {
    this.data.signRwds[index].isSignReceived = true;
  }
})