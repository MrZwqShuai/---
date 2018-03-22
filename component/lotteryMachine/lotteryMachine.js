// component/lotteryMachine/lotteryMachine.js
const app = getApp()
var api = require('../../utils/api.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    prizeCount: {
      type: Number,
      value: 0
    }    
  },

  /**
   * 组件的初始数据
   */
  data: {
    IMGURL: api.imgUrl,
    lottery: [],
    selectedIdx: null,
    lotteryStruct: [0, 1, 2, 5, 8, 7, 6, 3, 0],
    chance: 1
  },
  ready() {
    this.getPrizes();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _lotterymainFn() {
      let timer = this._lotteryTimer(90, 0)
      let clearTimer = setTimeout(() => {
        this._clearTimer(timer);
        clearTimeout(clearTimer);
        let selectedIdx = this.data.lotteryStruct.indexOf(this.data.selectedIdx)
        if (selectedIdx !== -1) {
          let clearTimer2 = this._lotteryTimer(400, selectedIdx);
          setTimeout(() => {
            clearTimeout(clearTimer2);
            this._pause();
          }, 2000);
        }
      }, this._randomTime());
    },
    _lotteryTimer(speed, lotteryIdx) {
      lotteryIdx = lotteryIdx + 1;
      let timer = setInterval(() => {
        this.setData({
          selectedIdx: this.data.lotteryStruct[lotteryIdx]
        });
        lotteryIdx++
        if (lotteryIdx >= 9) {
          lotteryIdx = 1;
        }
      }, speed);
      return timer;
    },
    _play(event) {
      let playIdx = event.currentTarget.dataset.playidx;
      if (playIdx === 4) {
        if (this.hasChance()) {
          this._lotterymainFn();
        } else {
          app.showErrorToast(this, '抽奖次数已用完', 1000);
        }
      }
    },
    _pause() {
      this.data.chance = 0;
    },
    hasChance() {
      return this.data.chance;
    },
    _clearTimer(timer) {
      clearInterval(timer);
    },
    _randomTime() {
      return Math.floor(Math.random() * 1000) + 3000
    },
    /**
     * 获取抽奖奖品信息
     */
    getPrizes() {
      wx.request({
        url: api.url + '/ezShop/services/prizes/getPrizes',
        success: ({data}) => {
          console.log(data, '---');
          if (data.stateCode == '0000') {
            this.setData({
              lottery: data.datas
            });
          } else {
            app.showErrorToast(this, data.errMsg, 1000);
          }
        },
        fail: (res) => {
          app.showErrorToast(this, '数据读取错误(getExtensionNews)', 1000);
        }
      });
    }
  },
})
