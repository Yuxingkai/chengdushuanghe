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
    formatter: '<p style="background-color:rgba(0,20,72,.4);color:#fff;padding:0 5px;z-index:999;"><strong style="font-weight:bloder;">{a}</strong></p> <p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">{b}: {c} 个</p><p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">占比: {d}%</p>'
  },
  series: [{
    name: '开门方式',
    minAngle: 15,
    type: 'pie',
    radius: '60%',
    center: ['50%', '64%'],
    labelLine: {
      normal: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,.7)'
        }
      }
    },
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: getFontSize()
        }
      }
    },
    data: 0,
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}
