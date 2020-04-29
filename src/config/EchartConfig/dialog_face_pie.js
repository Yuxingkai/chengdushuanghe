import echarts from 'echarts'
let allData = [
  { name: '居民', value: 126 },
  { name: '陌生人', value: 120 },
  { name: '未知', value: 49 }
]
let colorList = ['rgb(165,91,251)', 'rgb(253,225,64)', 'rgb(130,185,64)', 'rgb(34,181,240)']
this.colorList = colorList
echarts.util.each(allData, function (item, index) {
  item.itemStyle = {
    normal: {
      color: colorList[index]
    }
  }
})
export const option = {
  label: {
    normal: {
      textStyle: {
        color: 'rgba(255, 255, 255, 0.3)'
      },
      position: 'center'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}:{c}人</br>({d}%)'
  },
  legend: {
    orient: 'vertical',
    right: 5,
    top: 65,
    itemHeight: 5,
    itemWidth: 5,
    textStyle: {
      color: '#fff',
      // color: colorList,
      fontSize: 14
    },
    formatter: function (name) {
      // var allData = option.series[0].data
      // var num = allData[0].value + allData[1].value + allData[2].value + allData[3].value
      for (let i = 0; i < allData.length; i++) {
        if (name === allData[i].name) {
          return (
            allData[i].value + '   ' + name
          )
        }
      }
    }
  },
  title: [
    // {
    //   left: '3%',
    //   top: '8%',
    //   text: '楼栋开门方式统计',
    //   textBaseline: 'middle',
    //   textStyle: {
    //     color: '#fff',
    //     fontWeight: 'normal',
    //     fontSize: 16
    //   }
    // },
    {
      text: 327 + '人',
      left: '29%',
      top: '64%',
      textAlign: 'center',
      textBaseline: 'middle',
      textStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 14
      }
    }
  ],
  series: [
    {
      hoverAnimation: true, // 设置饼图默认的展开样式
      radius: ['50%', '60%'],
      name: 'pie',
      center: ['30%', '65%'],
      type: 'pie',
      selectedMode: 'single',
      selectedOffset: 5, // 选中是扇区偏移量
      clockwise: true,
      startAngle: 90,
      label: {
        normal: {
          // 显示扇形文字
          show: false,
          position: 'inner',
          formatter: '{b}',
          textStyle: {
            color: '#fff',
            fontWeight: 'none',
            fontSize: 12
          }
        }
      },
      normal: {
        borderWidth: 4,
        borderColor: '#ffffff'
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          borderWidth: 7
        },
        emphasis: {
          borderWidth: 0,
          shadowBlur: 5,
          shadowOffsetX: 3,
          shadowColor: 'rgba(0, 0, 0, 0.2)'
        }
      },
      data: allData
    }
  ]
}
