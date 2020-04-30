import echarts from 'echarts'
import {
  getFontSize, getMarginNum
} from '../../Utils/Common'
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
      // console.log(datas)
      for (let i = 0, length = datas.length; i < length; i++) {
        val = datas[i].value
        res += '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' + datas[i].seriesName + '：' + val + '&nbsp;</p >'
      }
      return res
    }
  },
  legend: {
    top: '13%',
    right: '4%',
    show: true,
    itemHeight: 10,
    itemWidth: 10,
    itemGap: 10,
    orient: 'horizontal',
    data: ['通行次数', '通行人员'],
    textStyle: {
      fontSize: getFontSize(),
      color: '#fff'
    }
  },
  grid: {
    left: '20%',
    right: '8%',
    bottom: '15%',
    top: '25%',
    containLabel: false
  },
  xAxis: {
    type: 'value',
    minInterval: 1,
    axisLabel: {
      show: true,
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
    data: 0,
    axisLabel: {
      show: true,
      interval: 0,
      margin: getMarginNum(),
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff',
        align: 'left',
        baseline: 'middle'
      }
    },
    x: 50,
    y: 20,
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
    name: '通行次数',
    type: 'bar',
    barWidth: 15,
    stack: '人数',
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
    data: 0
  }, {
    name: '通行人员',
    type: 'bar',
    barWidth: 15,
    stack: '人数',
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
    data: 0
  }]
}
