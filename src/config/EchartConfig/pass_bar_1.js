import echarts from 'echarts'
import {
  getFontSize
} from '../../Utils/Common'
import {
  barColor
} from '../config'
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      show: false
    },
    formatter: function (datas) {
      let res = ''
      let val = ''
      res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">通行统计</h4>'
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].axisValue + ': ' + val + ' 个</p >'
      }
      return res
    }
  },
  yAxis: [{
    type: 'category',
    data: 0,
    axisLabel: {
      color: '#fff',
      align: 'left',
      padding: [0, 0, 20, 8],
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    max: '20',
    axisTick: {
      show: false,
      alignWithLabel: true
    },
    axisLine: {
      show: false
    }
  }],
  xAxis: [{
    type: 'value',
    show: false
  }],
  grid: {
    left: '-10%',
    right: '10',
    bottom: '-5%',
    top: '5%',
    containLabel: true
  },
  series: [{
    name: '数量',
    type: 'bar',
    barWidth: 15,
    barMinHeight: 40,
    barGap: '200%',
    // barCategoryGap: '200%',
    itemStyle: {
      normal: {
        color: function (params) {
          let colorList = [new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: barColor[1].to
          },
          {
            offset: 1,
            color: barColor[1].from
          }
          ]), new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: barColor[2].to
          },
          {
            offset: 1,
            color: barColor[2].from
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
    name: '通行',
    type: 'bar',
    barGap: '-300%',
    barWidth: 15,
    barMinHeight: 40,
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
        fontSize: getFontSize(),
        color: '#fff',
        align: 'right',
        offset: [-10, 8],
        formatter: function (params) {
          let oa = option.series[0].data
          // console.log(oa)
          return oa[params.dataIndex] === 0 ? '-' : oa[params.dataIndex]
        }
      }
    },
    z: -12,
    data: 0
  }
  ]
}
