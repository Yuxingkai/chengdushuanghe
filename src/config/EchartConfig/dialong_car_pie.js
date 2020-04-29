import echarts from 'echarts'
let allData = [
  { name: '外来', value: 100 },
  { name: '进入', value: 88 },
  { name: '常驻', value: 74 }
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
    // trigger: 'item'
    // formatter: '{b}:{c}人</br>({d}%)'
  },
  legend: {
    show: 'false',
    orient: 'vertical',
    right: 0,
    top: 50,
    itemHeight: 5,
    itemWidth: 5,
    textStyle: {
      color: '#fff',
      fontSize: 10
    },
    formatter: function (name) {
      // var allData = option.series[0].data
      // var num = allData[0].value + allData[1].value + allData[2].value + allData[3].value
      for (let i = 0; i < allData.length; i++) {
        if (name === allData[i].name) {
          return (
            allData[i].value + ' ' + name
          )
        }
      }
    }
  },
  title: [
    {
      text: '常驻和外来车辆统计',
      left: '32%',
      top: '10%',
      textAlign: 'center',
      textBaseline: 'middle',
      textStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: 14
      }
    },
    {
      text: 243 + '人',
      left: '28%',
      top: '55%',
      textAlign: 'center',
      textBaseline: 'middle',
      textStyle: {
        color: '#fff',
        fontWeight: 'normal',
        fontSize: '0.36rem'
      }
    }
  ],
  series: [
    {
      // hoverAnimation: true, // 设置饼图默认的展开样式
      radius: ['50%', '60%'],
      name: 'pie',
      center: ['30%', '60%'],
      type: 'pie',
      selectedMode: 'single',
      selectedOffset: '1', // 选中是扇区偏移量
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
        borderWidth: '0.8rem',
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
