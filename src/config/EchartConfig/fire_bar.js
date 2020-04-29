import {
  getFontSize
} from '../../Utils/Common'
import echarts from 'echarts'
import {
  barColor
} from '../config'
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (datas) {
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">' + datas[0].name + '&nbsp;' + '设备状况</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].seriesName + '：' + val + '&nbsp;个</p >'
      }
      return res
    }
  },
  legend: {
    top: '17%',
    left: '3.5%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    itemGap: 15,
    orient: 'horizontal',
    data: ['离线', '正常', '异常', '总量'],
    textStyle: {
      fontSize: getFontSize(),
      color: '#fff'
    }
  },
  grid: {
    left: '16%',
    right: '8%',
    bottom: '14%',
    top: '30%',
    containLabel: false
  },
  xAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: getFontSize()
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgb(39,207,178,.6)'
      }
    },
    axisTick: {
      inside: true
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgb(39,207,178,.6)'
      }
    },
    axisTick: {
      show: false,
      inside: true
    }
  },
  series: [{
    name: '离线',
    type: 'bar',
    barWidth: 15,
    stack: '总量',
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      normal: {
        color: 'rgba(204,204,204,.8)'
      }
    },
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    data: []
  }, {
    name: '正常',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      normal: {
        color: new echarts
          .graphic
          .LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: barColor[2].to
          }, {
            offset: 1,
            color: barColor[2].from
          }])
      }
    },
    data: []
  }, {
    name: '异常',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      normal: {
        color: 'rgba(255,0,0,.8)'
      }
    },
    data: []
  }, {
    name: '总量',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      normal: {
        color: new echarts
          .graphic
          .LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: barColor[1].to
          }, {
            offset: 1,
            color: barColor[1].from
          }])
      }
    },
    data: []
  }]
}
