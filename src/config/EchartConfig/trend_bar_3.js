import echarts from 'echarts'

export const option = {
  title: {
    text: '一周感知数量统计',
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    left: '3%',
    top: '2%'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '25%',
    containLabel: true
  },
  xAxis: [{
    show: true,
    interval: 0,
    type: 'category',
    // data: ['烟感', '消防栓', '门禁', '电弧', '摄像头', '地磁'],
    data: 0,
    axisLabel: {
      show: true,
      interval: 0,
      textStyle: {
        color: '#ccc'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgb(39,207,178)'
      }
    },
    axisTick: {
      show: false
    }
  }],
  yAxis: [{
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    // 此处需要动态数据调试
    interval: 50,
    axisLabel: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  series: [{
    name: '报警数量',
    type: 'bar',
    data: 0,
    barWidth: 10, // 柱子宽度
    barGap: 1, // 柱子之间间距
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#008cff'
        }, {
          offset: 1,
          color: '#005193'
        }]),
        opacity: 1
      }
    }
  }, {
    name: '已处理',
    type: 'bar',
    data: 0,
    barWidth: 10,
    barGap: 1,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#00da9c'
        }, {
          offset: 1,
          color: '#007a55'
        }]),
        opacity: 1
      }
    }
  }, {
    name: '未处理',
    type: 'bar',
    data: 0,
    barWidth: 10,
    barGap: 1,
    itemStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#c4e300'
        }, {
          offset: 1,
          color: '#728400'
        }]),
        opacity: 1
      }
    }
  }]
}
