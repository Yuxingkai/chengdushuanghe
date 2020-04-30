import $ from 'jquery'
export default {
  mounted: function () {
    $('.happy-scroll_1').css({
      'height': $(window).height() - 140
    })
  },
  // 给数字添加分割逗号
  filters: {
    numSp: function (val) {
      return val > 1000 ? val.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,') : val
    }
  },
  activated () {
    var timer = setTimeout(() => {
      this.raiseSroll()
      clearTimeout(timer)
    }, 400)
    $(window).bind('resize', this.resizeB)
  },
  deactivated () {
    $(window).unbind('resize', this.resizeB)
    this.raiseSroll(false)
  },
  methods: {
    resizeB: function () {
      var timer1 = setTimeout(() => {
        this.raiseSroll()
        clearTimeout(timer1)
      }, 400)
    },
    raiseSroll: function () {
      $('.happy-scroll_1').css({
        'height': $(window).height() - 140
      })
    }
  }
}
