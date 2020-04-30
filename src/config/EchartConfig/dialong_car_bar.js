import echarts from 'echarts'
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'none'
    }
  },
  grid: {
    left: '-37%',
    right: '8%',
    bottom: '-20%',
    top: '9%',
    containLabel: true
  },
  yAxis: [{
    type: 'category',
    data: 0,
    axisLabel: {
      color: '#fff',
      align: 'left',
      padding: [0, 0, 20, 8],
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
  }],
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
      data: 0
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
            let oa = option.series[0].data
            console.log(oa)
            return oa[params.dataIndex] === 0
              ? '-'
              : oa[params.dataIndex]
          }
        }
      },
      z: -12,
      data: 0
    }
  ]
}
