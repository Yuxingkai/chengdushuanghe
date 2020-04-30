import {
  getFontSize
} from '../../Utils/Common'
import echarts from 'echarts'
export const option = {
  // title: {
  //   text: '车辆数据分析',
  //   textStyle: {
  //     color: '#fff',
  //     fontSize: getFontSize()
  //   },
  //   left: '3%',
  //   top: '6%'
  // },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      show: false
    },
    formatter: function (datas) {
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">车辆实时进出</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].seriesName + ': ' + val + ' 辆</p >'
      }
      return res
    }
  },
  legend: {
    top: '10%',
    right: '3.8%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    itemGap: 10,
    orient: 'horizontal',
    data: [{
      name: '驶入',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      icon: 'stack'
    }, {
      name: '驶出',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      icon: 'stack'
    }]
  },
  grid: {
    left: '12%',
    right: '8%',
    bottom: '16%',
    top: '25%',
    containLabel: false
  },
  xAxis: {
    show: true,
    type: 'category',
    // rotate: -90,
    interval: 1,
    minInterval: 1,
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
    boundaryGap: false,
    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  },
  yAxis: {
    show: true,
    type: 'value',
    minInterval: 1,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: getFontSize()
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(39,207,178,.6)'
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
    name: '驶入',
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
    data: 0
  },
  {
    name: '驶出',
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
    data: 0
  }
  ]
}
