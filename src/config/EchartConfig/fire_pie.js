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
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">' + datas[0].name + '&nbsp;' + '报警数量</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].seriesName + '：' + val + '&nbsp;个</p >'
      }
      return res
    }
  },
  // legend: {
  //   top: '17%',
  //   left: '3.5%',
  //   show: true,
  //   itemHeight: 10,
  //   itemWidth: 10,
  //   itemGap: 30,
  //   orient: 'horizontal',
  //   data: ['离线', '正常', '异常', '总量'],
  //   textStyle: {
  //     fontSize: getFontSize(),
  //     color: '#fff'
  //   }
  // },
  grid: {
    left: '12%',
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
        fontSize: getFontSize(),
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
      show: true,
      inside: true
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      show: true,
      interval: 0,
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      },
      formatter: function (params) {
        let newParamsName = '' // 最终拼接成的字符串
        let paramsNameNumber = params.length // 实际标签的个数
        let provideNumber = 4 // 每行能显示的字的个数
        let rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
        /**
         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
         */
        // 条件等同于rowNumber>1
        if (paramsNameNumber > provideNumber) {
          /** 循环每一行,p表示行 */
          for (let p = 0; p < rowNumber; p++) {
            let tempStr = '' // 表示每一次截取的字符串
            let start = p * provideNumber // 开始截取的位置
            let end = start + provideNumber // 结束截取的位置
            // 此处特殊处理最后一行的索引值
            if (p === rowNumber - 1) {
              // 最后一次不换行
              tempStr = params.substring(start, paramsNameNumber)
            } else {
              // 每一次拼接字符串并换行
              tempStr = params.substring(start, end) + '\n'
            }
            newParamsName += tempStr // 最终拼成的字符串
          }
        } else {
          // 将旧标签的值赋给新标签
          newParamsName = params
        }
        // 将最终的字符串返回
        return newParamsName
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
    name: '烟感',
    type: 'bar',
    barWidth: 15,
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
  }]
}
