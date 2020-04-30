// console.log(window.localStorage.getItem('alarmTypeRealtime'))
export const option = {
  title: {
    text: '实有预警感知系统统计',
    textStyle: {
      color: '#fff',
      fontSize: '110%'
    },
    left: '3%',
    top: '6%'
  },
  grid: {
    left: '5%',
    right: '10%',
    bottom: '8%',
    top: '25%',
    containLabel: true
  },
  tooltip: {
    show: 'true',
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  xAxis: {
    type: 'value',
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#fff'
      }
    },
    splitLine: {
      show: false
    }
  },
  yAxis: [{
    type: 'category',
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#fff'
      }
    },
    data: ['出水告警', '井盖告警', '水位异常', '消防报警', '电弧告警']
  },
  {
    type: 'category',
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      show: false
    },
    splitArea: {
      show: false
    },
    splitLine: {
      show: false
    },
    data: ['出水告警', '井盖告警', '水位异常', '消防报警', '电弧告警']
  }
  ],
  series: [{
    name: '当月报警数量',
    type: 'bar',
    yAxisIndex: 1,

    itemStyle: {
      normal: {
        show: true,
        color: '#277ace',
        barBorderRadius: 50,
        borderWidth: 0,
        borderColor: '#333'
      }
    },
    barGap: '0%',
    barCategoryGap: '50%',
    data: [120, 132, 101, 134, 90]
  },
  {
    name: '当日报警数量',
    type: 'bar',
    itemStyle: {
      normal: {
        show: true,
        color: '#5de3e1',
        barBorderRadius: 50,
        borderWidth: 0,
        borderColor: '#333'
      }
    },
    barGap: '0%',
    barCategoryGap: '50%',
    data: [32, 52, 41, 64, 15]
  }
  ]
}
