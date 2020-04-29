import echarts from 'echarts'
import { getFontSize } from '../../Utils/Common'
import { barColor } from '../config'
let colorList1 = [
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    {
      offset: 0,
      color: barColor[1].to
    },
    {
      offset: 1,
      color: barColor[1].from
    }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    {
      offset: 0,
      color: barColor[2].to
    },
    {
      offset: 1,
      color: barColor[2].from
    }
  ])
]
let labelOption = {
  normal: {
    show: false,
    formatter: '{c} ',
    fontSize: 10,
    rich: {
      name: {
        textBorderColor: '#fff'
      }
    }
  }
}
export const option = {
  color: colorList1,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '8%',
    right: '4%',
    bottom: '15%',
    top: '20%',
    containLabel: true
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      // axisTick: { show: false },
      data: ['门未关', '电磁', '井盖'],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: getFontSize(),
          color: '#fff'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: getFontSize(),
          color: '#fff'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          width: 0
        }
      }
    }
  ],
  series: [
    {
      name: '设备报警类型数量',
      type: 'bar',
      barGap: 0,
      barWidth: '20%',
      label: labelOption,
      data: [307, 443, 349]
    },
    {
      name: '设备报警已处置',
      type: 'bar',
      barWidth: '20%',
      label: labelOption,
      data: [103, 160, 242]
    }
  ]
}
// // import echarts from 'echarts'
// import {getFontSize} from '../../Utils/Common'

// export const option = {
//   color: ['#3398DB'],
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: { // 坐标轴指示器，坐标轴触发有效
//       type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
//     }
//   },
//   grid: {
//     left: '8%',
//     right: '4%',
//     bottom: '15%',
//     top: '20%',
//     containLabel: true
//   },
//   xAxis: [
//     {
//       type: 'category',
//       data: [],
//       axisTick: {
//         alignWithLabel: true
//       },
//       axisLabel: {
//         show: true,
//         textStyle: {
//           fontSize: getFontSize(),
//           color: '#fff'
//         }
//       }
//     }
//   ],
//   yAxis: [
//     {
//       type: 'value',
//       axisLabel: {
//         show: true,
//         textStyle: {
//           fontSize: getFontSize(),
//           color: '#fff'
//         }
//       },
//       splitLine: {
//         show: false,
//         lineStyle: {
//           width: 0
//         }
//       }
//     }
//   ],
//   series: [
//     {
//       name: '报警',
//       type: 'bar',
//       barWidth: '20%',
//       data: []
//     }
//   ]
// }
