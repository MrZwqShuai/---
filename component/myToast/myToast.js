// component/myToast/myToast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    error: {
      type: Object,
      value: {}
    }
  },

  ready: function () {
    setTimeout(() => {
      this.setData({
        'error.show': false
      });
      this.triggerEvent('hide', false);
    }, this.data.error.duration);
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

  }
})
