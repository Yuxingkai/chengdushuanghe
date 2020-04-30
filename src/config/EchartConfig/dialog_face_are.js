import echarts from 'echarts'
let base = +new Date(2018, 5, 1)
let oneDay = 24 * 3600 * 1000
let date = []
let data = [Math.random() * 31]
for (let i = 1; i < 31; i++) {
  let now = new Date((base += oneDay))
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'))
  data.push(Math.round(Math.random() * 20 + data[i - 1]))
}
export const option = {
  tooltip: {
    trigger: 'axis',
    position: function (pt) {
      return [pt[0], '10%']
    }
  },
  // title: {
  //   left: '5%',
  //   top: '3%',
  //   text: '高峰时间进出流量统计',
  //   // textBaseline: 'middle',
  //   textStyle: {
  //     color: '#fff',
  //     fontWeight: 'normal',
  //     fontSize: 16
  //   }
  // },
  grid: {
    left: '-10%',
    right: '5%',
    bottom: '-10%',
    top: '20%',
    containLabel: true,
    y2: 140
  },
  lenged: {
    show: false
  },
  toolbox: {
    feature: {
      // dataZoom: {
      //   yAxisIndex: 'none'
      // }
    }
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
    // boundaryGap: [0, '100%'],
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: '人数',
      type: 'line',
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
              {
                offset: 0,
                color: 'rgba(80, 56, 130, 1)'
              },
              {
                offset: 1,
                color: 'rgba(12, 49, 104, 1)'
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
      },
      data: data
    }
  ]
}
