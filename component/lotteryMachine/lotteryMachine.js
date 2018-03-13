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
    lotteryStruct: [0, 1, 2, 5, 8, 7, 6, 3, 0]
  },
  ready() {
    // this._lotterymainFn();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _lotterymainFn() {
      let timer = this._lotteryTimer(100)
      let clearTimer = setTimeout(() => {
        this._clearTimer(timer);
        clearTimeout(clearTimer);
        console.log(this.data.selectedIdx);
        this._lotteryTimer(500)
      }, this._randomTime());
    },
    _lotteryTimer(speed, lotteryIdx) {
      let i = 0;
      let timer = setInterval(() => {
        this.setData({
          selectedIdx: this.data.lotteryStruct[i]
        });
        i++
        if (i >= 9) {
          i = 1;
        }
      }, speed);
      return timer;
    },
    _play(event) {
      let playIdx = event.currentTarget.dataset.playidx;
      if (playIdx === 4) {
        this._lotterymainFn();
      }
    },
    _clearTimer(timer) {
      clearInterval(timer);
    },
    _randomTime() {
      return Math.floor(Math.random() * 1000) + 2000
    }
  },
})
