import echarts from 'echarts'
export const option = {
  // title: {
  //   text: '高峰时间段楼栋进出统计',
  //   textStyle: {
  //     color: '#fff',
  //     fontSize: 16
  //   },
  //   left: '3%',
  //   top: '6%'
  // },
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
  legend: {
    top: '20%',
    right: '5%',
    show: true,
    itemHeight: 6,
    itemWidth: 6,
    orient: 'horizontal',
    data: [
      {
        name: '进入',
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff'
        },
        icon: 'stack'
      },
      {
        name: '离开',
        textStyle: {
          fontSize: 14,
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
    bottom: '2%',
    top: '36%',
    containLabel: true
  },
  xAxis: {
    show: true,
    type: 'category',
    // rotate: -90,
    // interval: 0,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: 14
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
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24'
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
      name: '进入',
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
      name: '离开',
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
