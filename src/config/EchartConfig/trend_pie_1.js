let colorList = ['rgb(165,91,251)', 'rgb(253,225,64)', 'rgb(130,185,64)', 'rgb(34,181,240)']
export const option = {
  color: colorList,
  title: {
    text: '今日感知增量',
    textStyle: {
      color: '#fff',
      fontSize: 14
    },
    left: '3%',
    top: '2%'
  },
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
    right: 40,
    top: 50,
    padding: 0,
    icon: 'pie',
    itemHeight: 5,
    itemWidth: 5,
    formatter: function (name) {
      let oa = option.series[0].data
      // console.log(oa)
      for (let i = 0; i < oa.length; i++) {
        if (name === oa[i].name) {
          return (
            '  ' + oa[i].value + '    ' + name
          )
        }
      }
    },
    textStyle: {
      color: colorList,
      fontSize: 14
    }
  },
  series: [{
    hoverAnimation: true, // 设置饼图默认的展开样式
    radius: ['45%', '66%'],
    name: 'pie',
    center: ['22%', '60%'],
    type: 'pie',
    // selectedMode: 'single',
    selectedOffset: 2, // 选中是扇区偏移量
    clockwise: true,
    startAngle: 90,
    label: {
      normal: {
        // 显示扇形文字
        show: false,
        position: 'inner',
        formatter: '{d}',
        textStyle: {
          color: '#fff',
          fontWeight: 'none',
          fontSize: 10
        }
      }
    },
    normal: {
      borderWidth: 4,
      borderColor: '#fff'
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
    data: 0
  }]
}
