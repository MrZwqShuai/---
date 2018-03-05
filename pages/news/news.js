// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showReceive: false,
    showWarning: false,
    toView: 'red',
    i: 0,
    idx: 0,
    hasRead: true,
    news: [{
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: true
    }, {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: false
    }, {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: false
    }, {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: false
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: false
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: false
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: false
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true,
      hasReceive: false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setNavigationBar();
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
    this.navigateBack();
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
  setNavigationBar() {
    wx.setNavigationBarTitle({
      title: '消息中心'
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#c68f1b',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      },
    })
  },
  // 删除消息
  deleteNews: function (event) {
    let dataset = event.currentTarget.dataset;
    let idx = this.idx = dataset.deleteidx;
    let receivestatus = dataset.receivestatus;
    if (this.hasReceive(receivestatus)) {
      this.deleteSure()
    } else {
      this.setData({
        showReceive: false,
        showWarning: true
      })
    }
  },
  /**
   * 判断是否有未领取的奖品
   */
  hasReceive: function (receivestatus) {
    return receivestatus;
  },
  closeWaring: function () {
    this.setData({
      showWarning: false
    });
  },
  deleteSure: function () {
    this.data.news[this.idx].hasRead = false;
    this.setData({
      news: this.data.news
    });
    this.closeWaring();
    wx.showToast({
      title: '删除成功',
    });
  },
  readNews: function(event) {
    this.setData({
      showReceive: true
    });
    let dataset = event.currentTarget.dataset;
    let idx = this.idx = dataset.idx;
  },
  closeReward: function() {
    this.setData({
      showReceive: false
    });
  },
  clickReceive: function() {
    this.showLoading('加载中');
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '领取成功',
      })
      this.setData({
        showReceive: false
      });
    }, 500);
  },
  showLoading: function(title) {
    wx.showLoading({
      title: title,
    })
  }
  // 请求loading

  // 返回上一页
  // navigateBack: function() {
  //   wx.navigateBack({
  //     delta: 3,
  //   })
  // } 
})