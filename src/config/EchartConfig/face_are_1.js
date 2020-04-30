import {
  getFontSize
} from '../../Utils/Common'
import echarts from 'echarts'
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      show: false
    },
    formatter: function (datas) {
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">人员进出</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].seriesName + ': ' + val + ' </p >'
      }
      return res
    }
  },
  legend: {
    top: '15%',
    right: '3.8%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    itemGap: 10,
    orient: 'horizontal',
    data: [{
      name: '人数',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      icon: 'stack'
    }, {
      name: '人次',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      icon: 'stack'
    }]
  },
  grid: {
    left: '14%',
    right: '8%',
    bottom: '15%',
    top: '30%',
    containLabel: false
  },
  xAxis: {
    show: true,
    type: 'category',
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
        color: 'rgb(39,207,178,.6)'
      }
    },
    axisTick: {
      inside: true
    },
    boundaryGap: false,
    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  },
  yAxis: {
    show: true,
    minInterval: 1,
    type: 'value',
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgb(39,207,178,.6)'
      }
    },
    axisTick: {
      show: false,
      inside: true
    },
    // 动态调整
    // interval: 50,
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    }
  },
  series: [{
    name: '人数',
    type: 'line',
    symbolSize: 1,
    // color: 'rgb(11,53,185)',
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: 'rgb(132,60,207)'
    },
    {
      offset: 1,
      color: 'rgb(248, 132, 92)'
    }
    ]),
    data: [22, 33, 44, 11, 23, 24, 56, 73, 77, 90, 12, 2, 4, 55, 67, 12, 54, 13, 74, 90, 23, 43, 54, 10]
  },
  {
    name: '人次',
    type: 'line',
    symbolSize: 1,
    // color: 'rgb(32,153,202)',
    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
      offset: 0,
      color: 'rgb(32,153,202)'
    },
    {
      offset: 1,
      color: 'rgb(33, 170, 149)'
    }
    ]),
    data: [12, 43, 14, 111, 123, 124, 156, 53, 37, 12, 90, 20, 41, 5, 6, 18, 34, 32, 45, 60, 11, 24, 18, 30]
  }
  ]
}
