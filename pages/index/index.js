//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 首页导航
    navs: [{
      page: '../news/news',
      url: '/images/nav01.png',
      title: '段位说明'
    }, {
        page: '../member/member',
      url: '/images/nav02.png',
      title: '我的背包'
    }, {
        page: '../record/record',
      url: '/images/nav03.png',
      title: '消费记录'
    }, {
      page: '../sign/sign',
      url: '/images/nav04.png',
      title: '每日签到'
    }, {
      page: '../honor/honor',
      url: '/images/nav05.png',
      title: '每日任务'
    }, {
        page: '../news/news',
      url: '/images/nav06.png',
      title: '会员消息'
    }, {
      page: '../honor/honor',
      url: '/images/nav07.png',
      title: '异业推介'
    }, {
      page: '../mall/mall',
      url: '/images/nav08.png',
      title: '优妈商城'
    }],
    rewards: [{
      img: '/images/nav01.png',
      explain: '立即兑换'
    }, {
      img: '/images/nav01.png',
      explain: '立即兑换'
    }, {
      img: '/images/nav01.png',
      explain: '立即兑换'
    }, {
      img: '/images/nav01.png',
      explain: '立即兑换'
    },]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
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
  },
  onReady: function () {
    this.getUserInfo();
  },
  getUserInfo: function (e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    // 获取用户在贯日积分中的个人信息
    this.getPoint();
  },
  // 获取用户在贯日积分活动中的信息
  getPoint: function () {
    console.log(this.data.userInfo);
    this.data.userInfo.rank = '';
    this.data.userInfo.fragment = '';
    this.data.userInfo.points = '';
    this.setData({
      'userInfo.rank': '100',
      'userInfo.fragment': '100',
      'userInfo.points': '10'
    });
  },
  /**
   * 兑换礼品
   */
  exchange: function () {
    console.log('兑换礼品');
  },
  // 导航
  navigate(event) {
    let pageUrl = event.currentTarget.dataset.page;
    wx.navigateTo({
      url: pageUrl,
      complete: function () {
      }
    })
  },
})
