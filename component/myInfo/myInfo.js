// component/myInfo/myInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userInfo: {
      type: 'object',
      value: '222'
    },
    hasUserInfo: Boolean,
    canIUse: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready: function() {
    console.log('加载子组件...');
    console.log(this.data.userInfo, '----');
  }
})
