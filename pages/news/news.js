// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    toView: 'red',
    i: 0,
    hasRead: true,
    news: [{
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
    }, {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
    }, {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
    }, {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
    }, , {
      title: 'title',
      content: '内容内容内容内容',
      createDate: '1',
      hasRead: true
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
    let idx = event.currentTarget.dataset.deleteidx
    console.log(event.currentTarget.dataset.deleteidx);
    this.data.news[idx].hasRead = false;
    this.setData({
      news: this.data.news
    });
    wx.showToast({
      title: '删除成功',
    })
  },
  // 请求loading
  
  // 返回上一页
  // navigateBack: function() {
  //   wx.navigateBack({
  //     delta: 3,
  //   })
  // } 
})