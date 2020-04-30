import echarts from 'echarts'
let saleDate = [
  { title: '报警总次数', num: 104 },
  { title: '今日报警数', num: 44 }
]
let sortedObjKeys = saleDate.sort(function (a, b) {
  return a.num > b.num
})
let datale = []
let datale2 = []
for (let i = 0; i < sortedObjKeys.length; i++) {
  datale.push(sortedObjKeys[i].title)
  datale2.push(sortedObjKeys[i].num)
}
let data3 = []
let data1Max = Math.max.apply(Math, datale2)
for (let i = 0; i < datale2.length; i++) {
  data3.push(data1Max)
}
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    }
  },
  grid: {
    left: '-23%',
    right: '8%',
    bottom: '-12%',
    top: '12%',
    containLabel: true
  },
  yAxis: {
    // type: 'category',
    data: datale,
    axisLabel: {
      color: '#fff',
      align: 'left',
      padding: [0, 0, 18, 8],
      textStyle: {
        fontSize: 14,
        color: '#fff'
      }
    },
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLine: {
      show: false
    }
  },
  xAxis: [
    {
      type: 'value',
      show: false
    }
  ],
  series: [
    {
      type: 'bar',
      // barGap: '-100%',
      barWidth: 9,
      itemStyle: {
        normal: {
          color: function (params) {
            let colorList = [new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgb(32, 107, 200)'
              },
              {
                offset: 1,
                color: 'rgb(69, 67, 147)'
              }
            ]), new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: 'rgb(70,177,114)'
              },
              {
                offset: 1,
                color: 'rgb(48,118,78)'
              }
            ])]
            return colorList[params.dataIndex]
          },
          barBorderRadius: 6
        }
      },
      z: 999,
      data: datale2
    },
    {
      type: 'bar',
      barGap: '-230%',
      barWidth: 9,
      itemStyle: {
        normal: {
          color: 'transparent',
          borderColor: 'transparent',
          shadowBlur: 10,
          barBorderRadius: 12
        }
      },
      label: {
        normal: {
          show: true,
          position: 'right',
          fontSize: 14,
          color: '#fff',
          align: 'right',
          // offset: [-35, -4],
          offset: [25, -1],
          formatter: function (params) {
            return datale2[params.dataIndex] === 0
              ? '-'
              : datale2[params.dataIndex]
          }
        }
      },
      z: -12,
      data: data3
    }
  ]
}
