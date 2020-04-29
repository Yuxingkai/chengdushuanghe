import {
  getFontSize
} from '../../Utils/Common'
import echarts from 'echarts'
import {
  barColor
} from '../config'
let so = '本周'
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (datas) {
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">' + so + '&nbsp;' + datas[0].name + '&nbsp;状况</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5p' +
          'x;font-weight:none;">设备' + datas[i].seriesName + '：' + val + '</p >'
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
    itemGap: 30,
    orient: 'horizontal',
    data: [
      '离线', '正常', '异常', '总量'
    ],
    textStyle: {
      fontSize: getFontSize(),
      color: '#fff'
    }
  },
  grid: {
    left: '12%',
    right: '8%',
    bottom: '13%',
    top: '30%',
    containLabel: false
  },
  xAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff'
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
    data: [
      '设备', '设备', '设备', '设备', '设备'
    ],
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
        color: 'rgba(39,207,178,.6)'
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
    // barMinHeight: 5,
    barWidth: 15,
    stack: '总量',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      normal: {
        color: 'rgba(204,204,204,.8)'
      }
    },
    data: 0
  }, {
    name: '正常',
    type: 'bar',
    // barMinHeight: 5,
    stack: '总量',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
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
    data: 0
  }, {
    name: '异常',
    type: 'bar',
    stack: '总量',
    // barMinHeight: 5,
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      normal: {
        color: 'rgba(255,0,0,.8)'
      }
    },
    data: 0
  }
    // , {
    //   name: '总量',
    //   type: 'bar',
    //   // barMinHeight: 5,
    //   stack: '总量',
    //   label: {
    //     normal: {
    //       show: false,
    //       position: 'insideRight'
    //     }
    //   },
    //   itemStyle: {
    //     normal: {
    //       color: 'rgba(26,155,252,.8)'
    //     }
    //   },
    //   data: 0
    // }
  ]
}
