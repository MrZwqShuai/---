
// pages/member/member.js

//获取应用实例
const app = getApp()
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
      value: 'trueName',
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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.getPoint();
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
      url: 'https://www.youmahui.net/ezShop/services/user/updateUserXcxInfo?userId=32792&trueName=%E7%9C%9F%E5%AE%9E%E5%A7%93%E5%90%8D&sex=1&birthday=1996-01-05%2010:48:21&baby_birthday=2019-12-05%2010:48:21&expected_date=2019-12-05%2010:48:21&often_store_id=2&address=xx',
      method: 'GET',
      data: {
        userId: app.globalData.userInfo.userId,
      },
      success: ({data}) => {
        if (data.stateCode === '0000') {
          wx.showToast({
            title: '修改成功~',
            duration: 1000
          });
          setTimeout(() => {
            wx.navigateTo({
              url: '../index/index',
            });
          }, 1000)
        } else {
          console.log(data.errMsg);
        }
      },
      fail: (error) => {
        console.log(error.message);
      }
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
  },
  // 获取用户在贯日积分活动中的信息
  getPoint: function () {
    this.data.userInfo.rank = '';
    this.data.userInfo.fragment = '';
    this.data.userInfo.points = '';
    this.setData({
      'userInfo.rank': '100',
      'userInfo.fragment': '100',
      'userInfo.points': '10'
    });
  },
  // 输入的信息存储
  memberChange: function(e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    let value = detail.value;
  }
})