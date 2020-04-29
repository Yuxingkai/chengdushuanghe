import echarts from 'echarts'
export const option = {
  title: {
    text: '其他感知报警次数排行',
    textStyle: {
      color: '#fff',
      fontSize: 22
    },
    left: '3%',
    top: '10%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      show: false
    }
  },
  legend: {
    top: '10%',
    right: '5%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    orient: 'horizontal',
    data: [
      {
        name: '烟感',
        width: 10,
        height: 10,
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff'
        },
        icon: 'stack'
      },
      {
        name: '电弧',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff'
        },
        icon: 'stack'
      }
    ]
  },
  grid: {
    left: '10%',
    right: '8%',
    bottom: '10%',
    top: '18%',
    containLabel: true
  },
  xAxis: {
    show: true,
    type: 'category',
    rotate: -90,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff'
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
    data: 0
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
        11,
        11,
        15,
        13,
        12,
        13,
        10,
        11,
        11,
        15,
        13,
        12,
        13,
        10,
        55,
        23,
        45
      ]
    },
    {
      name: '电弧',
      type: 'line',
      symbolSize: 1,
      // color: 'rgb(32,153,202)',
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgb(32,153,202)'
        },
        {
          offset: 1,
          color: 'rgb(33, 170, 149)'
        }
      ]),
      data: [
        11,
        33,
        35,
        33,
        32,
        33,
        30,
        33,
        33,
        35,
        33,
        32,
        33,
        30,
        33,
        33,
        35,
        13,
        22,
        33,
        40,
        35,
        13,
        25
      ]
    }
  ]
}
