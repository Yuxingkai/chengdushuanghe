// import echarts from 'echarts'
export const option = {
  // title: {
  //   text: '楼栋开门方式统计',
  //   textStyle: {
  //     color: '#fff',
  //     fontSize: 16
  //   },
  //   left: '3%',
  //   top: '6%'
  // },
  color: ['rgb(165,91,251)', 'rgb(253,225,64)', 'rgb(130,185,64)', 'rgb(34,181,240)'],
  legend: {
    orient: 'vertical',
    right: 10,
    top: 40,
    itemHeight: 15,
    itemWidth: 15,
    data: ['人脸', '手机', '刷卡', '密码'],
    // borderWidth: 4,
    itemGap: 4,
    textStyle: {
      color: '#fff',
      fontSize: '0.24rem'
    }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0,0,0,0.5)',
    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
    formatter: '{c}辆 ({d}%)'
  },
  series: [
    {
      hoverAnimation: true, // 设置饼图默认的展开样式
      name: 'pie',
      type: 'pie',
      center: ['28%', '56%'],
      radius: ['14%', '53%'],
      selectedMode: 'single',
      selectedOffset: 5, // 选中是扇区偏移量
      clockwise: true,
      startAngle: 90,
      // avoidLabelOverlap: true,
      data: [
        {
          name: '人脸',
          value: '20'
        },
        {
          name: '手机',
          value: '60'
        },
        {
          name: '刷卡',
          value: '40'
        },
        {
          name: '密码',
          value: '40'
        }
      ],
      itemStyle: {
        normal: {
          borderColor: '#FFFFFF',
          borderWidth: 0
        }
      },
      label: {
        normal: {
          position: 'inner',
          show: true,
          formatter: '{d}%',
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        emphasis: {
          show: true,
          textStyle: {}
        }
      },
      labelLine: {
        normal: {
          show: true
        }
      }
    }
  ]
}
