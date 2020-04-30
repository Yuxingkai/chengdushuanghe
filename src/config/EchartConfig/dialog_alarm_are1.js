import echarts from 'echarts'

let data = [
  ['001', 23],
  ['002', 44],
  ['003', 36],
  ['004', 88],
  ['005', 76],
  ['006', 55],
  ['007', 49]
]
let data2 = [
  ['001', 123],
  ['002', 64],
  ['003', 56],
  ['004', 48],
  ['005', 36],
  ['006', 35],
  ['007', 49]
]
let data3 = [
  ['001', 43],
  ['002', 54],
  ['003', 76],
  ['004', 28],
  ['005', 56],
  ['006', 65],
  ['007', 49]
]
let dateList = data.map(function (item) {
  return item[0]
})
let valueList = data.map(function (item) {
  return item[1]
})
let valueList2 = data2.map(function (item) {
  return item[1]
})
let valueList3 = data3.map(function (item) {
  return item[1]
})
export const option = {
  title: {
    show: true,
    text: '预警通知',
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    left: '3%',
    top: '6%'
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '-10%',
    right: '2%',
    bottom: '6%',
    top: '20%',
    containLabel: true
  },
  visualMap: [{
    show: false,
    type: 'continuous',
    seriesIndex: 0,
    min: 0,
    max: 400
  }],
  xAxis: [{
    show: false,
    interval: 0,
    data: dateList,
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false,
      textStyle: {
        fontSize: '0.39rem',
        color: '#fff'
      }
    }
  }],
  // color: ['red', 'yellow', 'gray'],
  legend: {
    top: '20%',
    right: '5%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    // orient: 'horizontal',
    data: [
      {
        name: '', // 电压
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff'
        },
        icon: 'stack'
      },
      {
        name: '', // 水位
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff'
        },
        icon: 'stack'
      },
      {
        name: '', // 开启
        textStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff'
        },
        icon: 'stack'
      }
    ]
  },
  yAxis: [{
    show: false,
    splitLine: {
      show: false
    }
  }],
  series: [{
    name: '', // 电压
    type: 'line',
    showSymbol: 1,
    data: valueList,
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(87,75,170,.6)'
            },
            {
              offset: 1,
              color: 'rgba(111,80,188,.6)'
            }
          ]
        )
      }
    },
    itemStyle: {
      normal: {
        color: '#574baa',
        lineStyle: {
          color: 'transparent'
        }
      }
    }
  }, {
    name: '', // 水位
    type: 'line',
    showSymbol: 1,
    data: valueList2,
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(18,58,116,.6)'
            },
            {
              offset: 1,
              color: 'rgba(13,66,128,.6)'
            }
          ]
        )
      }
    },
    itemStyle: {
      normal: {
        color: '#123a74',
        lineStyle: {
          color: 'transparent'
        }
      }
    }
  }, {
    name: '', // 开启
    type: 'line',
    showSymbol: 1,
    data: valueList3,
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(36,88,112,.6)'
            },
            {
              offset: 1,
              color: 'rgba(0,212,189,.6)'
            }
          ]
        )
      }
    },
    itemStyle: {
      normal: {
        color: '#245870',
        lineStyle: {
          color: 'transparent'
        }
      }
    }
  }]
}
