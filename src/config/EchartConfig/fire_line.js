import {
  getFontSize
} from '../../Utils/Common'
import {
  colorList
} from '../config'
// var colorList = ['rgba(247,219,136,.8)', 'rgba(148,217,108,.8)', 'rgba(11,188,183,.8)', 'rgba(26,155,252,.9)']
export const option = {
  color: colorList,
  tooltip: {
    trigger: 'item',
    formatter: '<p style="background-color:rgba(0,20,72,.4);color:#fff;padding:0 5px;"><strong style="font-weight:bloder;">{a}</strong></p> <p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">{b}: {c} 个</p><p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">占比: {d}%</p>'
  },
  legend: {
    orient: 'horizontal',
    x: 'center',
    y: '83%',
    itemWidth: 10,
    itemHeight: 10,
    data: [],
    textStyle: {
      fontSize: getFontSize(),
      color: '#fff'
    }
  },
  series: [{
    name: '报警次数',
    type: 'pie',
    minAngle: 15,
    selectedOffset: 0,
    selectedMode: 'single',
    radius: [0, '35%'],
    center: ['50%', '47%'],
    label: {
      normal: {
        // 数据内不显示
        position: 'inner',
        show: false,
        formatter: '{d}%',
        textStyle: {
          color: '#fff',
          fontSize: 12
        }
      },
      // 添加选中状态时候阴影
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    labelLine: {
      show: false,
      normal: {
        show: false
      }
    },
    data: []
  },
  {
    name: '总消防感知',
    type: 'pie',
    minAngle: 10,
    selectedOffset: 0,
    radius: ['50%', '65%'],
    center: ['50%', '47%'],
    labelLine: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      normal: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,.7)'
        }
      }
    },
    label: {
      normal: {
        show: false,
        textStyle: {
          color: '#fff'
        }
      }
    },
    data: []
  }
  ]
}
