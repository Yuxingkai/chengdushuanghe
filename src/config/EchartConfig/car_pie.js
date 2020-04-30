import echarts from 'echarts'
import {
  getFontSize
} from '../../Utils/Common'
import {
  barColor
} from '../config'
let colorList1 = [new echarts
  .graphic
  .LinearGradient(0, 1, 0, 0, [{
    offset: 0,
    color: barColor[1].to
  }, {
    offset: 1,
    color: barColor[1].from
  }]), new echarts
  .graphic
  .LinearGradient(0, 1, 0, 0, [{
    offset: 0,
    color: barColor[2].to
  }, {
    offset: 1,
    color: barColor[2].from
  }])
]
// rgba(0,51,102,.8)
export const option = {
  color: colorList1,
  'tooltip': {
    'trigger': 'axis',
    'axisPointer': {
      'type': 'cross',
      'crossStyle': {
        'color': '#384757'
      }
    },
    formatter: function (datas) {
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">车辆进出</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].seriesName + ': ' + val + '</p >'
      }
      return res
    }
  },
  grid: {
    left: '10%',
    // right: '10%',
    bottom: '5%',
    top: '36%',
    containLabel: true
  },
  'legend': {
    'textStyle': {
      'color': '#fff',
      fontSize: getFontSize()
    },
    'icon': 'circle',
    'data': ['通行次数', '车数'],
    'top': '12%'
    // 'right': '3%'
  },
  'xAxis': [{
    'type': 'category',
    'data': [
      '周一',
      '周二',
      '周三',
      '周四',
      '周五',
      '周六',
      '周日'
    ],
    'axisPointer': {
      'type': 'shadow'
    },
    axisTick: {
      show: true,
      inside: 'inside'
    },
    'axisLine': {
      'show': true,
      lineStyle: {
        color: 'rgba(39,207,178,.6)'
      }
    },
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#fff',
        fontSize: getFontSize()
      }
    }
  }],
  'yAxis': [{
    'type': 'value',
    minInterval: 1,
    'name': '通行次数',
    'nameTextStyle': {
      'color': '#fff',
      'fontSize': getFontSize()
    },
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#fff',
        'fontSize': getFontSize()
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    axisTick: {
      show: false,
      inside: true
    },
    'axisLine': {
      'show': true,
      lineStyle: {
        color: 'rgba(39,207,178,.6)'
      }
    }
  },
  {
    'type': 'value',
    'name': '车数',
    minInterval: 1,
    'nameTextStyle': {
      'color': '#fff',
      fontSize: getFontSize()
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#fff',
        fontSize: getFontSize()
      }
    },
    axisTick: {
      show: false,
      inside: true
    },
    'axisLine': {
      'show': true,
      lineStyle: {
        color: 'rgba(39,207,178,.6)'
      }
    }
  }
  ],
  'series': [{
    'name': '通行次数',
    'type': 'bar',
    // barWidth: 15,
    'data': 0,
    'barWidth': 'auto'
    // 'itemStyle': {
    //   'normal': {
    //     'color': {
    //       'type': 'linear',
    //       'x': 0,
    //       'y': 0,
    //       'x2': 0,
    //       'y2': 1,
    //       'colorStops': [{
    //         'offset': 0,
    //         'color': 'rgba(0,102,153,1)'
    //       },
    //       {
    //         'offset': 0.5,
    //         'color': 'rgba(0,133,245,0.7)'
    //       },
    //       {
    //         'offset': 1,
    //         'color': 'rgba(0,133,245,0.3)'
    //       }
    //       ],
    //       'globalCoord': false
    //     }
    //   }
    // }
  },
  {
    'name': '车数',
    'type': 'bar',
    'data': 0,
    // barWidth: 15,
    'barWidth': 'auto',
    // 'itemStyle': {
    //   'normal': {
    //     'color': {
    //       'type': 'linear',
    //       'x': 0,
    //       'y': 0,
    //       'x2': 0,
    //       'y2': 1,
    //       'colorStops': [{
    //         'offset': 0,
    //         'color': 'rgba(0,102,153,1)'
    //       },
    //       {
    //         'offset': 0.5,
    //         'color': 'rgba(0,255,252,0.7)'
    //       },
    //       {
    //         'offset': 1,
    //         'color': 'rgba(0,255,252,0.3)'
    //       }
    //       ],
    //       'globalCoord': false
    //     }
    //   }
    // },
    'barGap': '0'
  }
  ]
}
