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
    text: '沪牌和非沪牌统计',
    left: '28%',
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
    left: '-10%',
    right: '4%',
    bottom: '-10%',
    top: '16%',
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
      // ['rgb(165,91,251)', 'rgb(130,185,64)', 'rgb(34,181,240)', 'rgba(54,223,252)', 'rgb(253,225,64)']
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(54,223,252)'
            },
            {
              offset: 1,
              color: 'rgb(130,185,64)'
            }
          ])
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
