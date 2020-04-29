import echarts from 'echarts'
let allData = [
  { name: '男', value: 126 },
  { name: '女', value: 120 },
  { name: '小孩', value: 49 }
]
let colorList = ['rgb(79,189,131)', 'rgb(27,129,216)', 'rgb(208,12,141)', 'rgb(34,181,240)']
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
    right: 20,
    top: 55,
    itemHeight: 5,
    itemWidth: 0,
    textStyle: {
      color: '#fff',
      // color: colorList,
      fontSize: 12,
      align: 'left',
      padding: [5, 10]
    },
    formatter: function (name) {
      // var allData = option.series[0].data
      // var num = allData[0].value + allData[1].value + allData[2].value + allData[3].value
      for (let i = 0; i < allData.length; i++) {
        if (name === allData[i].name) {
          return (
            ' ' + allData[i].value + '     ' + name
          )
        }
      }
    }
  },
  title: [
    {
      left: '12%',
      top: '6%',
      text: '开门方式',
      textAlign: 'center',
      textBaseline: 'middle',
      textStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    {
      text: 327,
      left: '25%',
      top: '54%',
      textAlign: 'center',
      textBaseline: 'middle',
      textStyle: {
        color: '#92a3d0',
        fontWeight: 'normal',
        fontSize: 32
      }
    }
  ],
  series: [
    {
      hoverAnimation: true, // 设置饼图默认的展开样式
      radius: ['60%', '70%'],
      name: 'pie',
      center: ['27%', '57%'],
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
