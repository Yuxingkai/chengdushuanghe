import echarts from 'echarts'
let base = +new Date(2018, 5, 1)
let oneDay = 24 * 3600 * 1000
let date = []
let data = [Math.random() * 31]
for (let i = 1; i < 31; i++) {
  let now = new Date((base += oneDay))
  date.push(
    [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
  )
  data.push(Math.round(Math.random() * 20 + data[i - 1]))
}
export const option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%']
    }
  },
  title: {
    text: '今日进出统计',
    left: '21%',
    top: '5%',
    textAlign: 'center',
    textBaseline: 'middle',
    textStyle: {
      color: '#fff',
      fontWeight: 'normal',
      fontSize: 14
    }
  },
  grid: {
    left: '-4%',
    right: '4%',
    bottom: '-10%',
    top: '26%',
    containLabel: true
  },
  lenged: {
    show: false
  },
  xAxis: {
    show: false,
    type: 'category',
    boundaryGap: false,
    data: date,
    scale: true,
    splitLine: {
      show: false
    }
  },
  yAxis: {
    show: false,
    type: 'value',
    scale: true,
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: '进入',
      type: 'line',
      smooth: true,
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(137, 189, 27, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(137, 189, 27, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(137,189,27)'
        }
      },
      data: [96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7, 96.3, 96.4, 97.5, 95.6, 98.1, 94.8, 89.6, 94.1, 80.1, 52.4, 75.8, 94.7, 96.3, 96.4, 97.5, 95.6, 98.1, 94.8]
    },
    {
      name: '出去',
      type: 'line',
      smooth: true,
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0, 136, 212, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(0, 136, 212, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(0,136,212)'
        }
      },
      data: [97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9, 97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9, 97.3, 99.2, 99.3, 100.0, 99.6, 90.6]
    }
  ]
}
