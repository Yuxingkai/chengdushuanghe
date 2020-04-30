// 颜色
let lightBlue = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: 'rgba(0, 192, 255, 1)' // 0% 处的颜色
  }, {
    offset: 1,
    color: 'rgba(0, 192, 255, 0.1)' // 100% 处的颜色
  }],
  globalCoord: false // 缺省为 false
}
let darkBlue = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: 'rgba(1,198,253, 1)' // 0% 处的颜色
  }, {
    offset: 1,
    color: 'rgba(1,198,253, 0.1)' // 100% 处的颜色
  }],
  globalCoord: false // 缺省为 false
}
function randomData () {
  let value = Math.random() * 50
  return {
    value: Math.round(value)
  }
}
// 时间设置
function checkTime (i) {
  if (i < 10) {
    i = '0' + i
  }
  return i
}
function timeSet () {
  let newTime = new Date()
  let m = newTime.getMinutes()
  let s = newTime.getSeconds()
  m = checkTime(m)
  s = checkTime(s)
  return [m, s].join(':')
}
let data = []
let timeData = []
for (let i = 0; i < 9; i++) {
  timeData.unshift(timeSet())
  data.unshift(randomData())
}
// 指定图表的配置项和数据
export const option = {
  tooltip: {
    show: false
  },
  grid: {
    left: '-1%',
    right: '8%',
    bottom: '6%',
    top: '30%',
    containLabel: true
  },
  xAxis: {
    interval: 0,
    // show: false,
    type: 'category',
    boundaryGap: false,
    // boundaryGap: 100,
    min: -1,
    max: 9,
    axisLine: {
      lineStyle: {
        color: '#4bbbf8',
        shadowColor: 'rgba(75, 211, 255, 0.5)',
        shadowBlur: 5
      }
    },
    axisTick: {
      inside: true,
      show: false,
      interval: (index) => {
        if (index === -1 || index === 9) {
          return false
        } else {
          return true
        }
      }
    },
    axisLabel: {
      // rotate: -30,
      // interval: 0,
      color: 'rgb(49,241,254)',
      fontSize: 20
    },
    splitLine: {
      show: false
    },
    data: timeData
  },
  yAxis: [{
    show: false,
    max: 50,
    min: 0,
    axisLine: {
      lineStyle: {
        color: '#4bbbf8',
        shadowColor: 'rgba(75, 211, 255, 0.5)',
        shadowBlur: 5
      }
    },
    axisLabel: {
      color: '#fff',
      fontSize: 12
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(75, 211, 255, 0.2)',
        type: 'dashed'
      }
    }
  }],
  series: [{
    name: '数量',
    type: 'pictorialBar',
    barCategoryGap: '-30%',
    symbol: 'path://d="M150 0 L75 200 L225 200 Z"',
    label: {
      show: true,
      position: 'top',
      color: 'rgb(49,241,254)',
      fontSize: '0.28rem'
    },
    itemStyle: {
      color: function (params) {
        return params.dataIndex % 2 ? darkBlue : lightBlue
      }
    },
    data: data
  }]
}
// var key = 0
// setInterval(function () {

//   timeData.shift()
//   timeData.push(timeSet())

//   data.shift()
//   data.push(randomData())

//   // 颜色控制
//   key = (key === 1) ? 0 : 1

//   myChart.setOption({
//     xAxis: {
//       data: timeData
//     },
//     series: [{
//       itemStyle: {
//         normal: {
//           color: function (params) {
//             return (params.dataIndex + key) % 2 ? darkBlue : lightBlue
//           }
//         }
//       },
//       data: data
//     }]
//   })
// }, 1000)
