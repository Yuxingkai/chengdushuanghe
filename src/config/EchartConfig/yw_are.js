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
let dateList = data.map(function (item) {
  return item[0]
})
let valueList = data.map(function (item) {
  return item[1]
})
export const option = {
  title: {
    show: false,
    text: '小区感知报警排行',
    textStyle: {
      color: '#fff',
      fontSize: 22
    },
    left: '3%',
    top: '-3%'
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '-7%',
    right: '2%',
    bottom: '6%',
    top: '1%',
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
    show: true,
    interval: 0,
    data: dateList,
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 20,
        color: '#fff'
      }
    }
  }],
  yAxis: [{
    show: false,
    splitLine: {
      show: false
    }
  }],
  series: [{
    type: 'line',
    showSymbol: false,
    data: valueList,
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            {
              offset: 0,
              color: '#01c6fd'
            },
            {
              offset: 1,
              color: '#00d4bd'
            }
          ],
          false
        )
      }
    },
    itemStyle: {
      normal: {
        color: 'yellow',
        lineStyle: {
          color: 'transparent'
        }
      }
    }
  }]
}
