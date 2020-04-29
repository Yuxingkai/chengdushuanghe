import {
  getFontSize
} from '../../Utils/Common'
export const option = {
  tooltip: {
    trigger: 'item',
    formatter: function (datas) {
      console.log(datas)
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">设备报警次数</h4>'
      let val = ''
      for (let i = 0, length = datas.name.length; i < length; i++) {
        val = datas.value[i]
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas.name[i] + '：' + val + '&nbsp;次</p >'
      }
      return res
    }
  },
  radar: [{
    indicator: [],
    textStyle: {
      color: 'red'
    },
    center: ['48%', '60%'],
    radius: '55%',
    startAngle: 90,
    splitNumber: 4,
    // shape: 'circle',
    name: {
      formatter: '{value}',
      textStyle: {
        fontSize: getFontSize(),
        color: '#ffffff'
      }
    },
    splitArea: {
      areaStyle: {
        color: ['transparent',
          'transparent)', 'rgba(114, 172, 209, 0)',
          'transparent', 'rgba(114, 172, 209, 0)'
        ]
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(255,255,255,.6)'
      }
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(255,255,255,.6)'
      }
    }
  }],
  series: [{
    type: 'radar',
    itemStyle: {
      normal: {
        borderColor: 'rgba(0,210,255, 1)',
        borderWidth: 2.5
      }
    },
    areaStyle: {
      normal: {
        color: 'rgba(0,210,255, 0.8)'
      }
    },
    data: []
  }]
}
