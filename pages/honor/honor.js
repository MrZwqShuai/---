// pages/honor/honor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    process: '60%',
    // 成就列表
    rewardTask: [{
      fragment: 50,
      img: '/images/progress-img01.png',
      goods: {
        name: '麦卡米卡',
        num: 10
      },
      percent: '50%',
      isRwdComplete: true
    }, {
        fragment: 50,
        img: '/images/progress-img02.png',
      goods: {
        name: '麦卡米卡',
        num: 10
      },
      percent: '30%',
      isRwdComplete: true
    }, {
        fragment: 50,
        img: '/images/progress-img03.png',
      goods: {
        name: '麦卡米卡',
        num: 10
      },
      percent: '50%',
      isRwdComplete: true
    }, {
        fragment: 50,
        img: '/images/progress-img04.png',
      goods: {
        name: '麦卡米卡',
        num: 10
      },
      percent: '20%',
      isRwdComplete: true
    }, {
        fragment: 50,
        img: '/images/progress-img05.png',
      goods: {
        name: '麦卡米卡',
        num: 10
      },
      percent: '95%',
      isRwdComplete: false
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

  }
})