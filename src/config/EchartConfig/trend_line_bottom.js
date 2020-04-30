import {
  getFontSize
} from '../../Utils/Common'
import {
  lineColor
} from '../config'
import echarts from 'echarts'
export const option = {
  // title: {   text: '车辆数据分析',   textStyle: {     color: '#fff',     fontSize:
  // getFontSize()   },   left: '3%',   top: '6%' },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      show: false
    },
    formatter: function (datas) {
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">车辆进出</h4' +
        '>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5p' +
          'x;font-weight:none;">' + datas[i].seriesName + ': ' + val + ' 辆</p >'
      }
      return res
    }
  },
  legend: {
    top: '17%',
    left: '3.8%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    itemGap: 40,
    orient: 'horizontal',
    data: [{
      name: '驶入',
      icon: 'stack',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    }, {
      name: '驶出',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      icon: 'stack'
    }, {
      name: '本小区车辆',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      icon: 'stack'
    }, {
      name: '外来车辆',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      icon: 'stack'
    }]
  },
  grid: {
    left: '9%',
    right: '8%',
    bottom: '12%',
    top: '36%',
    containLabel: false
  },
  xAxis: {
    show: true,
    type: 'category',
    boundaryGap: true,
    // rotate: -90,
    interval: 1,
    axisLabel: {
      show: true,
      interval: 1,
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(39,207,178,.6)'
      }
    },
    axisTick: {
      inside: true
    },
    data: 0
  },
  yAxis: {
    show: true,
    type: 'value',
    minInterval: 1,
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    axisTick: {
      show: false,
      inside: true
    },
    axisLine: {
      lineStyle: {
        color: 'rgb(39,207,178,.6)'
      }
    },
    // 动态调整 interval: 50,
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    }
  },
  series: [{
    name: '驶入',
    type: 'line',
    symbolSize: 1,
    // color: 'rgb(11,53,185)',
    color: new echarts
      .graphic
      .LinearGradient(0, 0, 1, 0, [{
        offset: 0,
        color: lineColor[0].from
      }, {
        offset: 1,
        color: lineColor[0].to
      }]),
    data: 0
  }, {
    name: '驶出',
    type: 'line',
    symbolSize: 1,
    // color: 'rgb(32,153,202)',
    color: new echarts
      .graphic
      .LinearGradient(0, 0, 1, 0, [{
        offset: 0,
        color: lineColor[1].from
      }, {
        offset: 1,
        color: lineColor[1].to
      }]),
    data: 0
  }, {
    name: '本小区车辆',
    type: 'bar',
    barWidth: '4',
    symbolSize: 1,
    stack: 'group',
    // color: 'rgb(32,153,202)', color: 'rgb(0,172,238)',
    color: new echarts
      .graphic
      .LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: lineColor[2].from
      }, {
        offset: 1,
        color: lineColor[2].to
      }]),
    data: 0
  }, {
    name: '外来车辆',
    barWidth: '8',
    type: 'bar',
    symbolSize: 1,
    stack: 'group',
    // color: 'rgb(167,231,255)',
    color: new echarts
      .graphic
      .LinearGradient(0, 1, 0, 0, [{
        offset: 0,
        color: lineColor[3].from
      }, {
        offset: 1,
        color: lineColor[3].to
      }]),
    data: 0
  }]
}
