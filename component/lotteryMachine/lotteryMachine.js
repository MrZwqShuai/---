// component/lotteryMachine/lotteryMachine.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    lottery: [{
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }, {
      rewardName: '小米MAX',
      rewardImg: ''
    }],
    selectedIdx: null,
    lotteryStruct: [0, 1, 2, 5, 8, 7, 6, 3, 0],
    chance: 1
  },
  ready() {
    // this._lotterymainFn();
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
          wx.showToast({
            title: '今日抽奖次数已用完',
          })
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
    }
  },
})
