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
    left: '5%',
    right: '8%',
    bottom: '6%',
    top: '36%',
    containLabel: true
  },
  'legend': {
    'textStyle': {
      'color': '#fff',
      fontSize: getFontSize()
    },
    'icon': 'circle',
    'data': ['通行次数', '停留时间'],
    'top': '10%'
    // 'right': '3%'
  },
  'xAxis': [{
    // rotate: 40,
    'type': 'category',
    'data': [],
    'axisPointer': {
      'type': 'shadow'
    },
    axisTick: {
      // show: false,
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
      // formatter: function (value, index) {
      //   if (index % 2 !== 0) {
      //     return '\n\n' + value
      //   } else {
      //     return value
      //   }
      // }
    }
  }],
  'yAxis': [{
    'type': 'value',
    'name': '通行次数',
    'nameTextStyle': {
      'color': '#fff',
      'padding': [0, 0, 0, 30],
      fontSize: getFontSize()
    },
    minInterval: 1,
    'axisLabel': {
      'show': true,
      'textStyle': {
        'color': '#fff',
        fontSize: getFontSize()
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
    'name': '停留时间/时',
    'nameTextStyle': {
      'color': '#fff',
      'align': 'center',
      'padding': [0, 25, 0, 0],
      fontSize: getFontSize()
    },
    'show': true,
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
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
    'data': [],
    barWidth: 15
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
    'name': '停留时间',
    'type': 'bar',
    'data': [],
    barWidth: 15,
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
