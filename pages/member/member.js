// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      rank : '',
      fragment : '',
      points : ''
    },
    members: [{
      icon: '/images/member01.png',
      iconDesc: '姓  名',
      value: '',
    }, {
        icon: '/images/member09.png',
      iconDesc: '手机号码',
      value: '',
      }, {
        icon: '/images/member02.png',
        iconDesc: '性  别',
        value: '',
    }, {
      icon: '/images/member03.png',
      iconDesc: '出生年月',
      value: '',
      }, {
        icon: '/images/member04.png',
        iconDesc: '预产期 ',
        value: '',
    }, {
      icon: '/images/member05.png',
      iconDesc: '宝宝生日',
      value: '',
      }, {
        icon: '/images/member06.png',
        iconDesc: '街道地址',
        value: '',
    }, {
      icon: '/images/member07.png',
      iconDesc: '常去门店',
      value: '',
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
  submit() {
    wx.showModal({
      // title: '确认提交吗',
      content: '确认提交吗',
      success: (res) => {
        if (res.confirm) {
          this.submitData();
        } else if(res.cancel) {
          wx.showToast({
            title: '取消成功',
            duration: 1000
          });
        }
      }
    });
  },
  submitData() {
    wx.request({
      url: '',
    })
  },
  logout() {
    wx.showLoading({
      title: '加载'
    })
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '退出成功',
      });
    }, 500);
  }
})