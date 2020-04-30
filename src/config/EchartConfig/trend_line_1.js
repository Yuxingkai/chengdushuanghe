import { getFontSize } from '../../Utils/Common'
import { colorList } from '../config'
// let nums = parseInt(getCookie('peopleSum'))
export const option = {
  color: colorList,
  tooltip: {
    trigger: 'item',
    formatter:
      '<p style="background-color:rgba(0,20,72,.4);color:#fff;padding:0 5px;"><strong style="font-weight:bloder;">{a}</strong></p> <p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">{b}: {c} 户</p><p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;">占比: {d}%</p>'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    left: '70%',
    top: '26%',
    pageButtonItemGap: 8,
    // pageButtonPosition: 'start',
    pageButtonGap: 20,
    pageIconColor: '#fff',
    pageIconInactiveColor: '#ccc',
    pageIconSize: [10, 10],
    pageTextStyle: {
      color: '#fff'
    },
    animation: true,
    itemGap: 15,
    itemWidth: 20,
    itemHeight: 10,
    padding: [0, 4, 0, 4],
    textStyle: {
      color: '#fff',
      fontSize: getFontSize()
    },
    // , '外来人员居住', '外来人员租赁', '户籍人员自住', '外来人员自购', '户籍人员未居住', '户籍人员人在户不在', '境外人员', '临时人员', '其他'
    data: [],
    formatter: function (name) {
      // var allData = option.series[0].data
      // var num = allData[0].value + allData[1].value + allData[2].value + allData[3].value
      let data = option.series[0].data
      for (let i = 0; i < data.length; i++) {
        if (name === data[i].name) {
          return data[i].name + '   ' + data[i].value + '户'
        }
      }
    }
  },
  calculable: false,
  series: [
    {
      name: '人口分布',
      type: 'pie',
      // selectedMode: 'single',
      radius: [0, '80%'],
      center: ['35%', '56%'],
      // funnelAlign: 'right',,
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
      data: [
      ]
    }
  ]
}
