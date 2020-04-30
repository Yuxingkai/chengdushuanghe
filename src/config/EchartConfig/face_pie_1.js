import {
  getFontSize
} from '../../Utils/Common'
import echarts from 'echarts'
import {
  barColor
} from '../config'
let colorList1 = [new echarts
  .graphic
  .LinearGradient(0, 0, 1, 0, [{
    offset: 0,
    color: barColor[1].to
  }, {
    offset: 1,
    color: barColor[1].from
  }]), new echarts
  .graphic
  .LinearGradient(0, 0, 1, 0, [{
    offset: 0,
    color: barColor[2].to
  }, {
    offset: 1,
    color: barColor[2].from
  }])
]
export const option = {
  color: colorList1,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (datas) {
      let res = '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">' + datas[0].name + '</h4>'
      let val = ''
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].seriesName + '：' + val + '&nbsp;</p >'
      }
      return res
    }
  },
  legend: {
    top: '15%',
    left: '3.5%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    itemGap: 10,
    orient: 'horizontal',
    data: ['抓拍次数', '陌生人数'],
    textStyle: {
      fontSize: getFontSize(),
      color: '#fff'
    }
  },
  grid: {
    left: '25%',
    right: '8%',
    bottom: '14%',
    top: '28%',
    containLabel: false
  },
  xAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: {
      show: true,
      rotate: 15,
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
        color: 'rgb(39,207,178,.6)'
      }
    },
    axisTick: {
      inside: true
    }
  },
  yAxis: {
    type: 'category',
    data: ['东大门', '西大门', '3栋大门', '7栋大门'],
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
        color: 'rgb(39,207,178,.6)'
      }
    },
    axisTick: {
      show: false,
      inside: true
    }
  },
  series: [{
    name: '抓拍次数',
    type: 'bar',
    stack: '抓拍',
    barWidth: 15,
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
      // normal: {
      //   color: 'rgba(11,188,183,.8)'
      // }
    },
    data: [20, 30, 19, 28]
  }, {
    name: '陌生人数',
    type: 'bar',
    stack: '抓拍',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
      // normal: {
      //   color: 'rgba(26,155,252,.8)'
      // }
    },
    data: [22, 35, 22, 30]
  }]
}
