import {
  getFontSize
} from '../../Utils/Common'
// import {
//   colorList
// } from '../config'
export const option = {
  color: ['#04b5f2', '#40E0D0', '#9370DB', '#04b5f2', '#40E0D0', '#9370DB', '#04b5f2', '#40E0D0', '#9370DB'],
  tooltip: {
    trigger: 'item',
    formatter: '<p style="background-color:rgba(0,20,72,.4);color:#fff;padding:0 5px;"><strong style="font-weight:bloder;">{a}</strong></p> <p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">{b}: {c} </p><p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">占比: {d}%</p>'
  },
  legend: {
    orient: 'vertical',
    left: '60%',
    top: '12%',
    itemGap: 12,
    itemWidth: 20,
    itemHeight: 10,
    padding: [0, 5, 0, 5],
    textStyle: {
      color: '#fff',
      fontSize: getFontSize()
    },
    data: []
  },
  series: [{
    name: '通行人数',
    type: 'pie',
    offset: 0,
    selectedOffset: 0, // 选中是扇区偏移量
    selectedMode: 'single',
    radius: [0, '40%'],
    center: ['40%', '57%'],
    minAngle: 15,
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
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      value: 0,
      name: '本小区通行人数',
      selected: true
      // itemStyle: {
      //   normal: {
      //     color: 'rgba(133,182,178,.8)'
      //   }
      // }
    },
    {
      value: 0,
      name: '陌生人通行人数'
      // itemStyle: {
      //   normal: {
      //     color: 'rgba(109,79,141,.8)'
      //   }
      // }
    },
    {
      value: 0,
      name: '重点关注通行人数'
      // itemStyle: {
      //   normal: {
      //     color: 'rgba(205,94,126,.8)'
      //   }
      // }
    }
    ]
  },
  {
    name: '通行人次',
    type: 'pie',
    radius: ['52%', '75%'],
    center: ['40%', '57%'],
    minAngle: 10,
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      normal: {
        label: {
          show: false,
          position: 'inner',
          formatter: '{d}%'
        },
        labelLine: {
          show: false
        }
      }
    },
    labelLine: {
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
    data: [{
      value: 0,
      name: '本小区通行人次'
      // itemStyle: {
      //   normal: {
      //     color: 'rgba(148,217,108,.8)'
      //   }
      // }
    },
    {
      value: 0,
      name: '陌生人通行人次'
      // itemStyle: {
      //   normal: {
      //     color: 'rgba(11,188,183,.8)'
      //   }
      // }
    },
    {
      value: 0,
      name: '重点关注通行人次'
      // itemStyle: {
      //   normal: {
      //     color: 'rgba(26,155,252,.8)'
      //   }
      // }
    }
    ]
  }
  ]
}
