<template>
  <div :style="{width: width,height:height}">
    <div
      v-show="!hasError"
      class="echarts"
      :id="domID"
      :style="{width: width,height:height}"/>
    <div v-show="hasError">{{ err }}</div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { guid } from '../../Utils/Common'
import $ from 'jquery'
export default {
  data () {
    return {
      hasError: false,
      err: '',
      domID: 'd_' + guid(),
      option: null,
      chart: null
    }
  },
  props: {
    width: {
      default: '100%',
      type: String
    },
    height: {
      default: '100%',
      type: String
    },
    config: {
      default: '',
      type: String
    }
  },
  created: function () {
    this.option = require('../../config/EchartConfig/' + this.config).option
  },
  mounted: function () {
    try {
      if (this.option == null) {
        this.err = '找不到配置信息'
        this.hasError = true
      } else {
        this.chart = echarts.init(document.getElementById(this.domID))
        document.getElementById(this.domID).style.height = '100%'
        this.chart.setOption(this.option)
      }
    } catch (e) {
      this.err = e.message
      this.hasError = true
    }
  },
  activated () {
    let timer = setTimeout(() => {
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
    refresh: function () {
      this.chart.setOption(this.option)
    },
    resizeB: function () {
      let timer1 = setTimeout(() => {
        this.chart.resize()
        // console.log('调用了改变echart自适应')
        this.refresh()
        clearTimeout(timer1)
      }, 400)
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'tslfont';
  src: url('../../../static/font/hanti.ttf');
  src: url('../../../static/font/hanti.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
.echarts {
  height: 100% !important;
}
.echarts div {
  height: 100% !important;
}
</style>
