// import echarts from 'echarts'
import {
  getFontSize
} from '../../Utils/Common'
import {
  colorList
} from '../config'
export const option = {
  color: colorList,
  tooltip: {
    trigger: 'item',
    formatter: '<p style="background-color:rgba(0,20,72,.4);color:#fff;padding:0 5px;"><strong style="font-weight:bloder;">{a}</strong></p> <p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">{b}: {c} 个</p><p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">占比: {d}%</p>'
  },
  legend: {
    orient: 'vertical',
    left: '65%',
    top: '17%',
    itemGap: 15,
    itemWidth: 20,
    itemHeight: 10,
    padding: [0, 5, 0, 5],
    textStyle: {
      color: '#fff',
      fontSize: getFontSize()
    },
    x: 'left',
    data: []
  },
  series: [{
    name: '已处理',
    type: 'pie',
    radius: ['0%', '70%'],
    center: ['34%', '55%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: false,
        position: 'center'
      },
      emphasis: {
        show: false,
        textStyle: {
          fontSize: '30',
          fontWeight: 'bold'
        }
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: []
  }]
}
