// import echarts from 'echarts'
// import echarts from 'echarts'
export const option = {
  title: {
    show: false,
    text: '小区感知报警排行',
    textStyle: {
      color: '#fff',
      fontSize: 22
    },
    left: '3%',
    top: '-3%'
  },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '5%',
    right: '8%',
    bottom: '0%',
    top: '15%',
    containLabel: true
  },
  yAxis: {
    name: '设备',
    interval: 0,
    type: 'category',
    data: [
      '007',
      '006',
      '005',
      '004',
      '003',
      '002',
      '001'
    ],
    // y轴的字体样式
    axisLabel: {
      show: true,
      textStyle: {
        fontSize: 16,
        color: '#fff'
      }
    },
    axisLine: {
      show: false
    }
  },
  xAxis: [
    {
      ttype: 'category',
      show: false,
      align: 'left'
    }
  ],
  series: [
    {
      type: 'bar',
      barGap: '-100%',
      barWidth: 8,
      itemStyle: {
        normal: {
          color: function (params) {
            // console.log(params)
            let colorList = ['#00d4bd', '#934ee9', '#00d4bd', '#00d4bd', '#00d4bd', '#00d4bd', '#00d4bd']
            return colorList[params.dataIndex]
          },
          barBorderRadius: 10
        }
      },
      z: 999,
      data: [100, 200, 70, 50, 60, 20, 55]
    },
    {
      show: true,
      type: 'bar',
      barGap: '-100%',
      barWidth: '4',
      itemStyle: {
        normal: {
          barBorderRadius: 15,
          color: 'rgba(255,255,255,.2)'
        }
      },
      z: 1,
      data: [200, 200, 200, 200, 200, 200, 200]
    }
  ]
}
