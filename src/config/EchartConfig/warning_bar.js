import {
  getFontSize
} from '../../Utils/Common'
import {
  colorList
} from '../config'
// var colorList = ['rgba(205,94,126,.8)', 'rgba(148,217,108,.8)', 'rgba(11,188,183,.8)', 'rgba(26,155,252,.8)', 'rgba(247,219,136,.8)', 'rgba(148,217,108,.8)', 'rgba(98,209,222,.8)', 'rgba(166,219,105,.8)']
export const option = {
  color: colorList,
  tooltip: {
    trigger: 'item',
    formatter: '<p style="background-color:rgba(0,20,72,.4);color:#fff;padding:0 5px;"><strong style="font-weight:bloder;">{a}</strong></p> <p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">{b}: {c} 个</p><p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">占比: {d}%</p>',
    position: [-10, -10]
  },
  series: [{
    name: '报警',
    type: 'pie',
    minAngle: 10,
    radius: '60%',
    center: ['50%', '50%'],
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
// legend: {
//   orient: 'vertical',
//   left: '65%',
//   top: '32%',
//   itemGap: 15,
//   itemWidth: 20,
//   itemHeight: 10,
//   padding: [0, 5, 0, 5],
//   textStyle: {
//     color: '#fff',
//     fontSize: getFontSize()
//   },
//   data: ['井盖报警', '门未关', '电弧警报', '地磁报警', '消防报警']
// },
// series: [{
//   name: '报警数量',
//   type: 'pie',
//   offset: 0,
//   selectedOffset: 0, // 选中是扇区偏移量
//   selectedMode: 'single',
//   radius: [0, '43%'],
//   center: ['33%', '55%'],
//   label: {
//     normal: {
//       // 数据内不显示
//       position: 'inner',
//       show: false,
//       formatter: '{d}%',
//       textStyle: {
//         color: '#fff',
//         fontSize: 12
//       }
//     },
//     emphasis: {
//       show: true,
//       textStyle: {}
//     }
//   },
//   labelLine: {
//     show: true,
//     normal: {
//       lineStyle: {
//         color: 'rgba(255,255,255,.7)'
//       }
//     }
//   },
//   data: [{
//     value: 335,
//     name: '井盖报警'
//   },
//   {
//     value: 679,
//     name: '门未关'
//   },
//   {
//     value: 1548,
//     name: '电弧警报'
//   }, {
//     value: 200,
//     name: '地磁报警'
//   }, {
//     value: 600,
//     name: '消防报警'
//   }
//   ]
// }
// {
//   name: '已处理数量',
//   type: 'pie',
//   radius: ['32%', '55%'],
//   center: ['33%', '55%'],
//   labelLine: {
//     normal: {
//       show: false,
//       lineStyle: {
//         color: 'rgba(255,255,255,.7)'
//       }
//     }
//   },
//   label: {
//     normal: {
//       show: false,
//       textStyle: {
//         color: '#fff'
//       }
//     }
//   },
//   data: [{
//     value: 300,
//     name: '井盖报警'
//   },
//   {
//     value: 600,
//     name: '门未关'
//   },
//   {
//     value: 1500,
//     name: '电弧警报'
//   }, {
//     value: 199,
//     name: '地磁报警'
//   }, {
//     value: 588,
//     name: '消防报警'
//   }
//   ]
// }
// ]
// }
