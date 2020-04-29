<template>
  <div class="fire">
    <transition name="transtion_globle">
      <div
        class="left_globle"
        v-if="lefthideorshow">
        <span class="left_globle_span" />
        <div
          class="cheliang"
          style="">
          <!-- <h3 style="color:red;">cheliang</h3> -->
          <Box1
            title="住户人员"
            css="padding:10px 0;width:100%;margin-top: -1px;">
            <InfoGroup
              type='1'
              css=""
              columns="3"
              column-gap="0">
              <InfoGroupCopy
                v-for='(item,index) in items'
                :key="index"
                :title="item.title"
                :num="item['num']"
                type='5'/>
            </InfoGroup>
          </Box1>
          <div style="display:grid;grid-template-rows:1fr 1fr 1fr;margin-top:10px;">
            <!-- echarts图标消防设备统计 -->
            <div
              type="1"
              style="padding-top: 10px;box-sizing: border-box; width:100%;position: relative;">
              <div
                class="echartTitle_t echartTitle_t2"
                style="">
                <p class="echartTitle sliderTilSmall">消防设备异常感知</p>
                <RadioGroup css="position: absolute;top:0;right:0.1rem;z-index:999;"/>
              </div>
              <echart
                config="fire_bar"
                ref="fire_bar1"
                v-show="deviceInfo1"/>
              <p
                class="noInfo sliderTilSmall"
                v-show="deviceInfo2">暂无数据</p>
            </div>
            <!-- 设备数量占比 -->
            <div
              type="1"
              style="padding-top:10px;box-sizing: border-box;position: relative;">
              <div
                class="echartTitle_t echartTitle_t2"
                style="">
                <p class="echartTitle sliderTilSmall">烟感报警感知</p>
                <RadioGroup
                  items="近7天,近30天"
                  @on-index-changed="alarmSmoke"
                  css="position: absolute;bottom:0rem;right:0.1rem;z-index:999;"/>
              </div>
              <echart
                config="fire_pie"
                ref="fire_pie"
                v-show="fireSmoke"/>
              <p
                class="noInfo sliderTilSmall"
                v-show="fireSum">暂无数据</p>
            </div>
            <!-- 小区报警排行 -->
            <div
              type="1"
              style="padding-top:10px;position: relative;box-sizing: border-box;">
              <div
                class="echartTitle_t echartTitle_t2"
                style="">
                <p class="echartTitle sliderTilSmall">报警次数和总消防感知</p>
                <RadioGroup
                  items="近7天,近30天"
                  @on-index-changed="alarmNum"
                  css="position: absolute;bottom:0rem;right:0.1rem;z-index:999;"/>
              </div>
              <echart
                config="fire_line"
                ref="fire_line"
                v-show="alarmInfo1"/>
              <p
                class="noInfo sliderTilSmall"
                v-show="alarmInfo2">暂无数据</p>
            </div>
            <!-- 消防感知报警排行 -->
            <!-- <Box3 type="1"
                  css="padding-top:10px;position: relative;box-sizing: border-box;">
            <p class="echartTitle sliderTilSmall">消防感知</p>
              <RadioGroup items="当日,本周,本月"
                          @on-index-changed="zdy"
                          css="position: absolute;top:0;right:0.1rem;z-index:999;"></RadioGroup>
              <echart config="fire_line_bottom"></echart>
            </Box3> -->
          </div>
        </div>
      </div>
    </transition>
    <div
      v-if="false"
      @click="hideorshow"
      :class="btnClickBefore ? (btnPosition ? 'btnPositionClassl_globle': 'btnPositionClass_globle') : 'initClass_globle'"/>
    <div class="center_globle">
      <div style="color:#fff;grid-column:2;margin-left:0px;height: 100%;box-sizing: border-box;padding-bottom: 1.08rem;">
        <Map/>
      </div>
    </div>
    <transition name="transtionright_globle">
      <div
        v-if="righthideorshow"
        class="right_globle">
        <span class="right_globle_span" />
        <div style="color:#fff;grid-column:3;position:relative;overflow: hidden;height: 98%;">
          <list
            :filter="fil"
            :types="alarmType"
            :is-process="isProcess"
            :is-model-ids="isModelIDs"/>
        </div>
      </div>
    </transition>
    <div
      v-if="false"
      @click="hideorshowright"
      :class="rightbtnClickBefore ? (rightbtnPosition ? 'rightBtnPositionClassl_globle': 'rightBtnPositionClass_globle') : 'rightInitClass_globle'"/>
  </div>
</template>

<script>
import Title from '../../public/boxTitle'
import list from '../../public/alarmList'
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post} from '../../../../Utils/Http'
import InfoGroupCopy from '../../../UIKit/InfoLabelCopy'
let _ = require('lodash')

export default {
  name: 'Xiaofang',
  data () {
    return {
      isProcess: 2,
      fil: ['fire'],
      alarmType: ['fire'],
      fireSum: false,
      info: [{ 'waring': '陌生人预警', 'time': '10:22:38', 'figureImg': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529598461947&di=ddfcad478564e9fbd07cb26de3c0c711&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-01-20%2F080149541.jpg', 'add': 'xx小区', 'addDetail': '东大门', 'num': '今日进出5次，累积进出' }],
      items: [
        { 'title': '总住户', 'num': '0' },
        { 'title': '总人数', 'num': '0' },
        { 'title': '老人数', 'num': '0' },
        { 'title': '儿童数', 'num': '0' },
        { 'title': '关爱数', 'num': '0' },
        { 'title': '关注数', 'num': '0' }
      ],
      type: 'fire',
      fireSmoke: true,
      alarmInfo1: true,
      alarmInfo2: false,
      deviceInfo1: true,
      deviceInfo2: false,
      chart2: [],
      chart31: [],
      chart32: [],
      chart41: [],
      chart42: [],
      timer: '',
      isModelIDs: 0,
      allPostTypeFire1: true,
      allPostTypeFire2: true,
      allPostTypeFire3: true,
      pageInfoType: true,
      btnPosition: true,
      rightbtnPosition: true,
      btnClickBefore: false,
      rightbtnClickBefore: false,
      lefthideorshow: true,
      righthideorshow: true
    }
  },
  components: {
    list,
    Title,
    InfoGroupCopy
  },
  mounted: function () {
    this.$bus.emit('mapBtnPosition', this.btnPosition)
    this.$bus.emit('/event/alarmTypeList', this.fil)
    this.allPostNormal()
    this.allPostNuml()
    this.allPostAllNum()
    this.household()
    let that = this
    that.timer = setInterval(function () {
      console.log('开始执行fire')
      if (that.allPostTypeFire1 === true) {
        that.allPostNormal()
      }
      if (that.allPostTypeFire2 === true) {
        that.allPostNuml()
      }
      if (that.allPostTypeFire3 === true) {
        that.allPostAllNum()
      }
    }, 30000)
  },
  methods: {
    hideorshow () {
      this.btnClickBefore = true
      this.lefthideorshow = !this.lefthideorshow
      this.btnPosition = !this.btnPosition
      this.$bus.emit('mapBtnPosition', this.btnPosition)
    },
    hideorshowright () {
      this.rightbtnClickBefore = true
      this.righthideorshow = !this.righthideorshow
      this.rightbtnPosition = !this.rightbtnPosition
    },
    zdy: function (msg) {
      console.log(msg[1])
    },
    allPostNormal: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      let allPaths = ['消防设备异常感知']
      reqParam.paths = allPaths
      let that = this
      that.allPostTypeFire1 = false
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.allPostTypeFire1 = true
          if (data.datas) {
            let arr = data.datas
            that.chart2 = arr.filter(item => item.path === '消防设备异常感知')
            that.alarmDevice()
          }
        },
        error: function (err) {
          that.allPostTypeFire1 = true
          console.log(err)
        }
      })
    },
    allPostNuml: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      let allPaths = ['烟感报警感知本周统计', '烟感报警感知本月统计']
      reqParam.paths = allPaths
      let that = this
      that.allPostTypeFire2 = false
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.allPostTypeFire2 = true
          if (data.datas) {
            let arr = data.datas
            that.chart31 = arr.filter(item => item.path === '烟感报警感知本周统计')
            that.chart32 = arr.filter(item => item.path === '烟感报警感知本月统计')
            that.alarmSmoke()
          }
        },
        error: function (err) {
          that.allPostTypeFire2 = true
          console.log(err)
        }
      })
    },
    allPostAllNum: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      let allPaths = ['报警次数和总消防感知本周', '报警次数和总消防感知本月']
      reqParam.paths = allPaths
      let that = this
      that.allPostTypeFire3 = false
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.allPostTypeFire3 = true
          if (data.datas) {
            let arr = data.datas
            that.chart41 = arr.filter(item => item.path === '报警次数和总消防感知本周')
            that.chart42 = arr.filter(item => item.path === '报警次数和总消防感知本月')
            that.alarmNum()
          }
        },
        error: function (err) {
          that.allPostTypeFire3 = true
          console.log(err)
        }
      })
    },
    upDataChoose: function (dataID) {
      this.fil = dataID
    },
    alarmDevice: function () {
      let that = this
      let dataSum = JSON.parse(that.chart2[0].data)
      if (dataSum.length > 0) {
        that.deviceInfo1 = true
        that.deviceInfo2 = false
        let allArr = []
        for (let i = 0; i < dataSum.length; i++) {
          let flag = true
          for (let j = 0; j < allArr.length; j++) {
            if (dataSum[i].typeName === allArr[j].typeName) {
              flag = false
            }
          }
          if (flag) {
            allArr.push(dataSum[i])
          }
        }
        let allArr1 = []
        for (let i = 0; i < allArr.length; i++) {
          let obj = {
            typeName: allArr[i].typeName,
            stateData: [{
              state: 0,
              count: (dataSum.filter(item => item.state === 0 && item.typeName === allArr[i].typeName)[0] ? dataSum.filter(item => item.state === 0 && item.typeName === allArr[i].typeName)[0].count : 0)
            }, {
              state: 1,
              count: (dataSum.filter(item => item.state === 1 && item.typeName === allArr[i].typeName)[0] ? dataSum.filter(item => item.state === 1 && item.typeName === allArr[i].typeName)[0].count : 0)
            }, {
              state: 2,
              count: (dataSum.filter(item => item.state === 2 && item.typeName === allArr[i].typeName)[0] ? dataSum.filter(item => item.state === 2 && item.typeName === allArr[i].typeName)[0].count : 0)
            }]
          }
          allArr1.push(obj)
        }
        let dataY = []
        let ser0 = []
        let ser1 = []
        let ser2 = []
        let serall = []
        for (let i = 0; i < allArr1.length; i++) {
          dataY.push(allArr1[i].typeName)
          ser0.push(allArr1[i].stateData[0].count)
          ser1.push(allArr1[i].stateData[1].count)
          ser2.push(allArr1[i].stateData[2].count)
          serall.push(ser0[i] + ser1[i] + ser2[i])
        }

        let op2 = that.$refs.fire_bar1
        if (that.pageInfoType === true) {
          op2.option.yAxis.data = dataY
          op2.option.series[0].data = ser0
          op2.option.series[1].data = ser1
          op2.option.series[2].data = ser2
          op2.option.series[3].data = serall
          op2.refresh()
        }
      } else {
        that.deviceInfo2 = true
        that.deviceInfo1 = false
      }
    },
    alarmSmoke: function (msg) {
      let num = 0
      if (!msg) {
        num = 0
      } else {
        num = msg[1]
      }
      let that = this
      let alarmSmoke = [that.chart31, that.chart32]
      let arr = JSON.parse(alarmSmoke[num][0].data)
      let dataSum = arr.filter(item => item.buildingNo !== null)
      if (dataSum.length > 0) {
        that.fireSum = false
        that.fireSmoke = true
        dataSum = dataSum.sort(function (a, b) {
          return b.count - a.count
        })
        dataSum = _.chunk(dataSum, 5)[0]
        dataSum = dataSum.sort(function (a, b) {
          return a.count - b.count
        })
        let dataX = []
        let ser = []
        for (let i = 0; i < dataSum.length; i++) {
          dataSum[i].typeName = dataSum[i].buildingNo + '栋' + dataSum[i].houseNo + '号'
          dataX.push(dataSum[i].typeName)
          ser.push(dataSum[i].count)
        }
        let op3 = that.$refs.fire_pie
        if (that.pageInfoType === true) {
          op3.option.yAxis.data = dataX
          op3.option.series[0].data = ser
          op3.refresh()
        }
      } else {
        that.fireSmoke = false
        that.fireSum = true
      }
    },
    alarmNum: function (msg) {
      let num = 0
      if (!msg) {
        num = 0
      } else {
        num = msg[1]
      }
      let that = this
      let alarmNum = [that.chart41, that.chart42]
      let dataSum = JSON.parse(alarmNum[num][0].data)
      let dataDevice = dataSum.device
      let dataAlarm = dataSum.alarm
      if (dataDevice.length > 0 || dataAlarm.length > 0) {
        that.alarmInfo1 = true
        that.alarmInfo2 = false
        let deviceAlarm = []
        for (let i = 0; i < dataDevice.length; i++) {
          let obj = {
            typeName: dataDevice[i].typeName,
            count: dataAlarm.filter(item => item.typeName === dataDevice[i].typeName)[0] ? dataAlarm.filter(item => item.typeName === dataDevice[i].typeName)[0].count : 0
          }
          deviceAlarm.push(obj)
        }
        let ser0 = []
        let ser1 = []
        let ser2 = []
        for (let i = 0; i < dataDevice.length; i++) {
          ser0.push(dataDevice[i].typeName)
          ser2.push({
            value: dataDevice[i].count,
            name: dataDevice[i].typeName
          })
        }
        for (let i = 0; i < deviceAlarm.length; i++) {
          ser1.push({
            value: deviceAlarm[i].count,
            name: deviceAlarm[i].typeName
          })
        }
        let op4 = that.$refs.fire_line
        if (that.pageInfoType === true) {
          op4.option.legend.data = ser0
          op4.option.series[0].data = ser1
          op4.option.series[1].data = ser2
          op4.refresh()
        }
      } else {
        that.alarmInfo2 = true
        that.alarmInfo1 = false
      }
    },
    household: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      reqParam.paths = ['小区总住户', '小区总人数', '小区老人数量', '小区儿童数量', '小区关爱数量', '小区重点人员数量']
      let that = this
      // 获取门禁信息
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.datas) {
            let dataNum = data.datas
            if (dataNum.filter(item => item.path === '小区总住户')) {
              that.items[0].num = dataNum.filter(item => item.path === '小区总住户')[0].data
            } else {
              that.items[0].num = 0
            }
            if (dataNum.filter(item => item.path === '小区总人数')) {
              that.items[1].num = dataNum.filter(item => item.path === '小区总人数')[0].data
            } else {
              that.items[1].num = 0
            }
            if (dataNum.filter(item => item.path === '小区老人数量')) {
              that.items[2].num = dataNum.filter(item => item.path === '小区老人数量')[0].data
            } else {
              that.items[2].num = 0
            }
            if (dataNum.filter(item => item.path === '小区儿童数量')) {
              that.items[3].num = dataNum.filter(item => item.path === '小区儿童数量')[0].data
            } else {
              that.items[3].num = 0
            }
            if (dataNum.filter(item => item.path === '小区关爱数量')) {
              that.items[4].num = dataNum.filter(item => item.path === '小区关爱数量')[0].data
              // that.items[4].num = 1904
            } else {
              that.items[4].num = 0
            }
            if (dataNum.filter(item => item.path === '小区重点人员数量')) {
              that.items[5].num = dataNum.filter(item => item.path === '小区重点人员数量')[0].data
              // that.items[5].num = 6
            } else {
              that.items[5].num = 0
            }
          }
        },
        error: function (err) {
          console.log(err)
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    console.log('销毁fire')
    this.pageInfoType = false
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped>
  .noInfo {color:#fff; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) }
  .cheliang {float: left; box-sizing: border-box; background-clip: content-box; width: 6.3rem; height: 100%; display: grid; grid-template-rows: 200px 1fr; grid-row-gap: 10px; padding-bottom: 10px; }
  .cheliang{width:100%;height:100%;display:grid;grid-template-rows:4.2rem 1fr;padding-bottom:4px;box-sizing:border-box;}
  .fire {
    position: relative;
    height: 100%;
  }
  .content {display: grid; grid-template-columns: 7rem 1fr 7rem; padding: 0 5px; box-sizing: border-box; grid-column-gap: 10px; } /* .happy-scroll_1 {width: 6.3rem; height: auto; border-top: 3px solid rgba(49, 241, 254, 0.8); box-sizing: border-box; } */
  @media screen and (min-width: 1900px) and (max-width: 3000px){.content {grid-template-columns: 7.8rem 1fr 8.3rem; } }
  @media screen and (min-width: 3001px) {
    .content {grid-template-columns: 14.6rem 1fr 14.6rem; }
    .happy-scroll_1 {width: 14.6rem; }
    .cheliang {width: 14.6rem; }
  }
  @media screen and (min-width: 6001px) {
    .content {grid-template-columns: 20.6rem 1fr 20.6rem; }
    .happy-scroll_1 {width: 20.6rem; }
    .cheliang {width: 20.6rem; grid-template-rows: 6.5rem 1fr; }
    .echartTitle_t2{
      top: 1rem;}
  }
</style>
