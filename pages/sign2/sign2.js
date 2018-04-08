// pages/sign2/sign2.js
const app = getApp();
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
    }]
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
   * 签到
   */
  sign: function () {
    if (!this.hasSign()) {
      this.setData({
        signSuccess: true,
        signStatus: true
      });
    } else {
      this.setData({
        signSuccess: false
      });
    }
  },
  /**
   * 通过接口请求是否已签到
   */
  hasSign: function () {
    if (this.data.signStatus) {
      return true;
    }
    return false
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