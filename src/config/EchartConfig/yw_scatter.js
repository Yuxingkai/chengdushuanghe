// import echarts from 'echarts'
let plantCap = [{
  name: '摄像机',
  value: '213'
}, {
  name: '门禁',
  value: '85'
}, {
  name: '井盖',
  value: '99'
}, {
  name: '消防栓',
  value: '1'
}, {
  name: '电弧',
  value: '3'
}, {
  name: '烟感',
  value: '171'
}, {
  name: '电表',
  value: '28'
}]
// var colorList = [
//   "new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgb(126, 230, 234)'},offset: 1,color: 'rgb(39, 44, 62)'}])",
//   "new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgb(126, 230, 234)'},offset: 1,color: 'rgb(39, 44, 62)'}])",
//   "new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgb(126, 230, 234)'},offset: 1,color: 'rgb(39, 44, 62)'}])",
//   "new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgb(126, 230, 234)'},offset: 1,color: 'rgb(39, 44, 62)'}])",
//   "new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgb(126, 230, 234)'},offset: 1,color: 'rgb(39, 44, 62)'}])",
//   "new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgb(126, 230, 234)'},offset: 1,color: 'rgb(39, 44, 62)'}])",
//   "new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0,color: 'rgb(126, 230, 234)'},offset: 1,color: 'rgb(39, 44, 62)'}])",
// ]
let datalist = [{
  offset: ['45', '10'],
  symbolSize: 96,
  opacity: 0.72,
  color: '#f467ce'
}, {
  offset: [37, 23],
  symbolSize: 79,
  opacity: 0.88,
  color: '#7aabe2'
}, {
  offset: [30, 16],
  symbolSize: 77,
  opacity: 0.8,
  color: '#ff7123'
}, {
  offset: [50, 28],
  symbolSize: 68,
  opacity: 0.86,
  color: '#ffc400'
}, {
  offset: [58, 22],
  symbolSize: 90,
  opacity: 0.66,
  color: '#5e333f'
}, {
  offset: [64, 10],
  symbolSize: 68,
  opacity: 0.72,
  color: '#6b3442'
}, {
  offset: [70, 23],
  symbolSize: 70,
  opacity: 0.68,
  color: '#8a3647'
}]
let datas = []
for (let i = 0; i < plantCap.length; i++) {
  let item = plantCap[i]
  let itemToStyle = datalist[i]
  datas.push({
    name: item.value + '\n' + item.name,
    value: itemToStyle.offset,
    symbolSize: itemToStyle.symbolSize,
    label: {
      normal: {
        textStyle: {
          fontSize: 20
        }
      }
    },
    itemStyle: {
      normal: {
        color: itemToStyle.color,
        opacity: itemToStyle.opacity
      }
    }
  })
}
export const option = {
  // title: {
  //   text: '所有预警总体比例',
  //   textStyle: {
  //     color: '#fff',
  //     fontSize: 22
  //   },
  //   left: '3%',
  //   top: '3%'
  // },
  grid: {
    show: false,
    left: '-30%',
    right: '20%',
    top: '17%',
    bottom: '0%'
  },
  xAxis: [{
    gridIndex: 0,
    type: 'value',
    show: false,
    splitLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    }
  }],
  yAxis: [{
    show: false,
    // 是否显示网格
    splitLine: {
      show: false,
      lineStyle: {
        color: 'rgba(255,255,255,.2)'
      }
    }
  }],
  series: [{
    type: 'scatter',
    symbol: 'circle',
    symbolSize: 10,
    label: {
      normal: {
        show: true,
        formatter: function (value) {
          return value.name
        },
        color: '#fff',
        textStyle: {
          fontSize: '20'
        }
      }
    },
    itemStyle: {
      normal: {
        color: '#00acea'
      }
    },
    data: datas
  }]
}
