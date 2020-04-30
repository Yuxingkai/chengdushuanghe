import { getFontSize } from '../../Utils/Common'
import { colorList } from '../config'
// var colorList = ['#e32f46', '#94d96c', '#0bbcb7', '#1a9bfc', '#7049f0', 'rgb(130,185,64)', '#fb734e']
export const option = {
  color: colorList,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
      show: false
    },
    formatter: function (datas) {
      console.log(datas)
      let res = ''
      res =
        '<h4 style="color:#fff;background-color:rgba(0,20,72,.4);padding:0 5px;">&nbsp;预警情况</h4>'
      let val = ''
      for (let i = 0; i < datas.length; i++) {
        val = datas[i].value
        res +=
          '<p style="background-color:rgba(0,20,72,.4);color:rgba(0,210,255,1);padding:0 5px;font-weight:none;">' +
          datas[i].seriesName +
          '：' +
          val +
          ' 次</p >'
      }
      return res
    }
  },
  grid: {
    left: '6%',
    right: '10%',
    bottom: '5%',
    top: '35%',
    containLabel: true
  },
  legend: {
    icon: 'stack',
    left: '3.5%',
    top: '17%',
    itemGap: 15,
    itemHeight: 10,
    itemWidth: 10,
    textStyle: {
      fontSize: getFontSize(),
      // fontWeight: 'bold',
      color: '#00BEFF'
    },
    data: 0
  },
  xAxis: {
    show: true,
    type: 'category',
    minInterval: 1,
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: {
      lineStyle: {
        color: '#00BEFF'
      }
    },
    axisLabel: {
      interval: 0,
      rotate: 0,
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    axisTick: {
      inside: true
    }
  },
  yAxis: {
    type: 'value',
    // interval: 10,
    minInterval: 1,
    axisLabel: {
      show: true,
      formatter: '{value}',
      textStyle: {
        fontSize: getFontSize(),
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: 'rgb(39,207,178,.6)'
      }
    },
    axisTick: {
      show: false,
      inside: true
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    }
  },
  series: [
    // {
    //   name: '一',
    //   type: 'line',
    //   symbol: 'none',
    //   smooth: true,
    //   symbolSize: 1,
    //   data: [11, 11, 15, 13, 12, 13, 10]
    // },
    // {
    //   name: '二',
    //   type: 'line',
    //   symbolSize: 1,
    //   symbol: 'none',
    //   smooth: true,
    //   data: [2, 5, 11, 3, 15, 20, 8]
    // },
    // {
    //   name: '三',
    //   type: 'line',
    //   symbol: 'none',
    //   smooth: true,
    //   symbolSize: 1,
    //   data: [8, 22, 15, 8, 16, 11, 20]
    // }
  ]
}
