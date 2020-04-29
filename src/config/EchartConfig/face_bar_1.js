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
    formatter: '<p style="background-color:rgba(0,20,72,.4);color:#fff;padding:0 5px;"><strong style="font-weight:bloder;">{a}</strong></p> <p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">{b}: {c} 人</p><p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">占比: {d}%</p>'
  },
  series: [{
    name: '人员类型',
    type: 'pie',
    radius: '60%',
    minAngle: 10,
    center: ['45%', '50%'],
    startAngle: 45,
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
    data: [{
      value: 831,
      name: '陌生人'
    }, {
      value: 12,
      name: '路人'
    }
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
}
