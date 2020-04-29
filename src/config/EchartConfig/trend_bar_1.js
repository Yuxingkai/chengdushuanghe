import echarts from 'echarts'
import { getFontSize } from '../../Utils/Common'
import { barColor } from '../config'
// let nums = getCookie('houseSum')
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
export const option = {
  color: colorList1,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (datas) {
      let res =
        '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">' +
        datas[0].name +
        '&nbsp;' +
        '</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res +=
          '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' +
          datas[i].seriesName +
          '人员:' +
          val +
          '&nbsp;人</p >'
      }
      return res
    }
  },
  grid: {
    left: '12%',
    right: '8%',
    bottom: '12%',
    top: '22%',
    containLabel: false
  },
  xAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: getFontSize()
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(39,207,178,.6)'
      }
    },
    axisTick: {
      // show: false,
      inside: true
    }
  },
  yAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(39,207,178,.6)'
      }
    },
    axisTick: {
      show: false,
      inside: true
    }
  },
  legend: {
    top: '17%',
    left: '3.5%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    itemGap: 40,
    data: [],
    textStyle: {
      fontSize: getFontSize(),
      color: '#fff'
    }
  },
  calculable: true,
  series: [
    {
      name: '', // 本市
      type: 'bar',
      stack: '总量',
      barWidth: 15,
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'insideRight'
          }
        }
      },
      data: [
        // {
        //   name: '自住',
        //   value: Math.floor(nums * 0.76)
        // },
        // {
        //   name: '出租',
        //   value: Math.floor(nums * 0.2)
        // },
        // {
        //   name: '空置',
        //   value: nums - Math.floor(nums * 0.76) - Math.floor(nums * 0.2)
        // }
      ]
    }
    // {
    //   name: '来沪',
    //   type: 'bar',
    //   barWidth: 15,
    //   stack: '总量',
    //   itemStyle: {
    //     color: 'rgba(26,155,252,.8)',
    //     normal: {
    //       label: {
    //         show: false,
    //         position: 'insideRight'
    //       }
    //     }
    //   },
    //   data: [
    //   //   {
    //   //   name: '自住',
    //   //   value: 132
    //   // }, {
    //   //   name: '出租',
    //   //   value: 130
    //   // }, {
    //   //   name: '空置',
    //   //   value: 120
    //   // }
    //   ]
    // }
  ]
}
