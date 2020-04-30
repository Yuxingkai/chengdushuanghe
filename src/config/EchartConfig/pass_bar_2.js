// import echarts from 'echarts'
// import echarts from 'echarts'
export const option = {
  // title: {
  //   text: '通行楼栋统计',
  //   textStyle: {
  //     color: '#fff',
  //     fontSize: 22
  //   },
  //   left: '3%',
  //   top: '5%'
  // },
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '6%',
    right: '8%',
    bottom: '-8%',
    top: '20%',
    containLabel: true
  },
  yAxis: {
    type: 'category',
    data: [
      '24栋',
      '18栋',
      '37栋',
      '4栋',
      '12栋'
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
            let colorList = ['rgba(54,223,252)', 'rgba(70,255,110)', 'rgba(54,223,252)', 'rgba(54,223,252)', 'rgba(54,223,252)']
            return colorList[params.dataIndex]
          },
          barBorderRadius: 10
        }
      },
      z: 999,
      data: [100, 200, 70, 50, 60]
    },
    {
      show: true,
      type: 'bar',
      barGap: '-100%',
      barWidth: '8',
      itemStyle: {
        normal: {
          barBorderRadius: 15,
          color: '#fff'
        }
      },
      z: 1,
      data: [200, 200, 200, 200, 200]
    }
  ]
}
