import echarts from 'echarts'
export const option = {
  title: {
    show: false,
    text: '其他感知报警次数排行',
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    left: '3%',
    top: '10%'
  },
  tooltip: {
    trigger: 'axis',
    // position: function (point, params, dom, rect, size) {
    //   console.log(dom.clientWidth)
    // },
    axisPointer: {
      type: 'shadow',
      show: false
    }
  },
  grid: {
    left: '10%',
    right: '8%',
    bottom: '6%',
    top: '30%',
    containLabel: true
  },
  xAxis: {
    show: true,
    type: 'category',
    rotate: -90,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: 20
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgb(39,207,178)'
      }
    },
    axisTick: {
      inside: true
    },
    boundaryGap: false,
    data: [
      '001',
      '002',
      '003',
      '004',
      '005',
      '006',
      '007',
      '008'
    ]
  },
  yAxis: {
    show: true,
    type: 'value',
    axisLabel: {
      show: false,
      textStyle: {
        color: '#fff'
      }
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
  series: [
    {
      name: '烟感',
      type: 'line',
      symbolSize: 1,
      // color: 'rgb(11,53,185)',
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgb(132,60,207)'
        },
        {
          offset: 1,
          color: 'rgb(248, 132, 92)'
        }
      ]),
      data: [
        11,
        31,
        15,
        43,
        12,
        13,
        10,
        11
      ]
    },
    {
      show: true,
      type: 'bar',
      barGap: '-100%',
      barWidth: 15,
      interval: 4,
      itemStyle: {
        normal: {
          barBorderRadius: [0, 0, 0, 0],
          color: 'rgba(255,255,255,.2)'
        }
      },
      z: 1,
      data: [43, 43, 43, 43, 43, 43, 43, 43]
    }
  ]
}
