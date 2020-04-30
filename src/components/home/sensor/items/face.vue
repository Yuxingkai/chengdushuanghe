<template>
  <div class="face">
    <transition name="transtion_globle">
      <div
        class="left_globle"
        v-if="lefthideorshow">
        <span class="left_globle_span" />
        <div style="height: 100%">
          <div
            class="cheliang"
            style="">
            <Box1
              title="进出人员感知"
              css='padding-top:10px;margin-top:-1px;width:100%;'>
              <InfoGroup
                columns="3"
                column-gap="0"
                css="">
                <InfoGroupCopy
                  title="单元"
                  :num="floorNumInfo"
                  type='5'/>
                <InfoGroupCopy
                  title="户数"
                  :num="houseNumInfo"
                  type='5'/>
                <InfoGroupCopy
                  title="人口"
                  :num="peopleNumInfo"
                  type='5'/>
                <InfoGroupCopy
                  title="进入"
                  :num="inNumInfoChange"
                  type='5'
                  :type-info="inInfotype"/>
                <InfoGroupCopy
                  title="离开"
                  :num="outNumInfoChange"
                  type='5'
                  :type-info="outInfotype"/>
                <InfoGroupCopy
                  title="驻留"
                  :num="stayNumInfoChange"
                  type='5'
                  :type-info="stayInfotype"/>
              </InfoGroup>
            </Box1>
            <div style="display:grid;grid-template-rows:1fr 1fr 1fr 6px;box-sizing:border-box;margin-top:10px;">
              <!-- 小区感知数据统计 -->
              <div
                type="1"
                style="padding-top: 10px;box-sizing: border-box; width:100%;">
                <div
                  class="echartTitle_t echartTitle_t2"
                  style="">
                  <p class="echartTitle sliderTilSmall">抓拍人数类型感知</p>
                  <RadioGroup
                    items="当日,近7天"
                    css="position: absolute;right:0.1rem;bottom:0rem;z-index:1;"
                    @on-index-changed="catchPeopleNum"/>
                </div>
                <echart
                  config='face_bar_1'
                  ref="face_bar_1"/>
              </div>
              <!-- 陌生人分布 -->
              <div
                type="1"
                style="padding-top: 10px;box-sizing: border-box; width:100%;">
                <div
                  class="echartTitle_t echartTitle_t2"
                  style="">
                  <p class="echartTitle sliderTilSmall">抓拍次数及陌生人感知</p>
                  <RadioGroup
                    items="当日,近7天"
                    @on-index-changed="catchStranger"
                    css="position: absolute;right:0.1rem;bottom:0rem;z-index:1;"/>
                </div>
                <!-- <p class="strange">陌生人分布</p> -->
                <echart
                  config='face_pie_1'
                  ref="face_pie_1"
                  v-show="info_catch1"/>
                <p
                  class="noInfo sliderTilSmall"
                  v-show="info_catch2">暂无数据</p>
              </div>
              <!-- 本月趋势 -->
              <div
                type="1"
                style="padding-top: 10px;box-sizing: border-box; width:100%;">
                <div
                  class="echartTitle_t echartTitle_t2"
                  style="">
                  <p class="echartTitle sliderTilSmall">实时进出感知</p>
                </div>
                <!-- <p class="strange">本月趋势</p> -->
                <echart
                  config='face_are_1'
                  ref="face_are_1"
                  v-show="info_inOut1"/>
                <p
                  class="noInfo sliderTilSmall"
                  v-show="info_inOut2">暂无数据</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div
      v-if="false"
      @click="hideorshow"
      :class="btnClickBefore ? (btnPosition ? 'btnPositionClassl_globle': 'btnPositionClass_globle') : 'initClass_globle'"/>
    <div class="center_globle">
      <div style="color:#fff;grid-column:2;height: 100%;box-sizing: border-box;padding-bottom: 1.08rem;">
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
import { TweenLite } from 'gsap/TweenMax'
let _ = require('lodash')

export default {
  name: 'Face',
  data () {
    return {
      isProcess: 2,
      fil: ['face'],
      alarmType: ['face'],
      num1: 999,
      itemsAll: '{"allPeo":[{"name":"老人","value":100},{"name":"妇女","value":88},{"name":"儿童","value":74},{"name":"nv","value":74}]}',
      items: [
        { 'title': '楼栋', 'num': '0' },
        { 'title': '户数', 'num': '0' },
        { 'title': '人口', 'num': '0' },
        { 'title': '进入', 'num': '0' },
        { 'title': '离开', 'num': '0' },
        { 'title': '驻留', 'num': '0' }
      ],
      info_inOut1: true,
      info_inOut2: false,
      info_catch1: true,
      info_catch2: false,
      chart31: [],
      chart32: [],
      chart4: [],
      timer: '',
      isModelIDs: 0,
      allPostType1: true,
      allPostType2: true,
      householdType: true,
      inOutPeopleType: true,
      pageInfoType: true,
      floorNumInfo: 0, // 楼栋数
      houseNumInfo: 0, // 户数数
      peopleNumInfo: 0, // 人口数
      inNumInfo: 0, // 进入数
      tweenedNumberIn: 0,
      inInfotype: false,
      outNumInfo: 0, // 离开数
      tweenedNumberOut: 0,
      outInfotype: false,
      stayNumInfo: 0, // 驻留数
      tweenedNumberStay: 0,
      stayInfotype: false,
      timeType1: '',
      timeType2: '',
      timeType3: '',
      btnPosition: true,
      rightbtnPosition: true,
      btnClickBefore: false,
      rightbtnClickBefore: false,
      lefthideorshow: true,
      righthideorshow: true,
      peopleTypeNumday: [],
      peopleTypeNumweek: []
    }
  },
  components: {
    Title,
    list,
    InfoGroupCopy
  },
  mounted: function () {
    this.$bus.emit('mapBtnPosition', this.btnPosition)
    this.$bus.emit('/event/alarmTypeList', this.fil)
    this.allPostStrange()
    this.allPostNum()
    this.household()
    this.inOutPeople()
    this.getPeopleType()
    let that = this
    that.timer = setInterval(function () {
      console.log('开始执行face')
      if (that.householdType === true) {
        that.household()
      }
      if (that.inOutPeopleType === true) {
        that.inOutPeople()
      }
    }, 5000)
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
    getPeopleType () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      let allPaths = ['抓拍人数类型感知当日', '抓拍人数类型感知近7天']
      reqParam.paths = allPaths
      let that = this
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.datas) {
            let arr = data.datas
            that.peopleTypeNumday = JSON.parse(arr.filter(item => item.path === '抓拍人数类型感知当日')[0].data)
            that.peopleTypeNumweek = JSON.parse(arr.filter(item => item.path === '抓拍人数类型感知近7天')[0].data)
            that.catchPeopleNum()
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + '抓拍人数类型感知当日,抓拍人数类型感知近7天')
        }
      })
    },
    catchPeopleNum: function (msg) {
      let that = this
      let num = 0
      if (!msg) {
        num = 0
      } else {
        num = msg[1]
      }
      let data1 = [{value: this.peopleTypeNumday.strangerCount, name: '陌生人'}, {value: this.peopleTypeNumday.passerCount, name: '路人'}]
      let data2 = [{value: this.peopleTypeNumweek.strangerCount, name: '陌生人'}, {value: this.peopleTypeNumweek.passerCount, name: '路人'}]
      let op2 = that.$refs.face_bar_1
      if (that.pageInfoType === true) {
        if (num === 0) {
          op2.option.series[0].data = data1
        } else {
          op2.option.series[0].data = data2
        }
        op2.refresh()
      }
    },
    replacek: function (srt) {
      /* eslint-disable */
      let reg = /[\（]/g
      let reg2 = /[\）]/g
      return srt.replace(reg, '(').replace(reg2, ')')
    },
    allPostStrange: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      let allPaths = ['抓拍次数及陌生人感知当日', '抓拍次数及陌生人感知本周']
      reqParam.paths = allPaths
      let that = this
      that.allPostType1 = false
      console.log(JSON.stringify(reqParam), '404')
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.allPostType1 = true
          if (data.datas) {
            let arr = data.datas
            that.chart31 = arr.filter(item => item.path === '抓拍次数及陌生人感知当日')
            that.chart32 = arr.filter(item => item.path === '抓拍次数及陌生人感知本周')
            that.catchStranger()
          }
        },
        error: function (err) {
          that.allPostType1 = true
          console.log(JSON.stringify(err) + '抓拍次数及陌生人感知当日,抓拍次数及陌生人感知本周, 实时进出感知')
        }
      })
    },
    allPostNum: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      let allPaths = ['实时进出感知']
      reqParam.paths = allPaths
      let that = this
      that.allPostType2 = false
      console.log(JSON.stringify(reqParam), '404')
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.allPostType2 = true
          if (data.datas) {
            let arr = data.datas
            that.chart4 = arr.filter(item => item.path === '实时进出感知')
            that.getInout()
          }
        },
        error: function (err) {
          that.allPostType2 = true
          console.log(JSON.stringify(err) + '抓拍次数及陌生人感知当日,抓拍次数及陌生人感知本周, 实时进出感知')
        }
      })
    },
    open: function () {
      this.isym = true
    },
    close: function () {
      this.isym = false
    },
    upDataChoose: function (dataID) {
      this.fil = dataID
    },
    catchStranger: function (msg) {
      let num = 0
      if (!msg) {
        num = 0
      } else {
        num = msg[1]
      }
      let that = this
      var catchStrange = [that.chart31, that.chart32]
      let dataSum = JSON.parse(catchStrange[num][0].data)
      // 抓拍次数
      let dataCount = dataSum.count
      // 陌生人次数
      let datatSranger = dataSum.strangerCount
      if (dataCount.length > 0 || datatSranger.length > 0) {
        that.info_catch2 = false
        that.info_catch1 = true
        dataCount = dataCount.sort(function (a, b) {
          return b.count - a.count
        })
        dataCount = _.chunk(dataCount, 5)[0]
        var strangerCount = []
        for (let i = 0; i < dataCount.length; i++) {
          for (let j = 0; j < datatSranger.length; j++) {
            if (dataCount[i].name === datatSranger[j].name) {
              strangerCount.push(datatSranger[j])
            }
          }
        }
        var dataY = []
        var ser0 = []
        var ser1 = []
        for (let i = 0; i < dataCount.length; i++) {
          dataY.push(that.replacek(dataCount[i].name))
          ser0.push(dataCount[i].count)
          ser1.push(strangerCount[i].count)
        }
        var op3 = that.$refs.face_pie_1
        if (that.pageInfoType === true) {
          op3.option.yAxis.data = dataY
          op3.option.series[0].data = ser0
          op3.option.series[1].data = ser1
          op3.refresh()
        }
      }
      // } else {
      //   that.info_catch1 = false
      //   that.info_catch2 = true
      // }
    },
    getInout: function () {
      let that = this
      let getInout = that.chart4
      let dataSum = JSON.parse(getInout[0].data)
      let time = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']
      // 通过人数
      let passCount = dataSum.passCount
      let passSum = []
      // 通过人次
      let passPeopleCount = dataSum.passPeopleCount
      let peopleSum = []
      if (passCount.length > 0 || passPeopleCount.length > 0) {
        that.info_inOut2 = false
        that.info_inOut1 = true
        var myDate = new Date()
        let myHours = myDate.getHours()
        for (let i = 0; i <= myHours; i++) {
          let obj = {
            faceCaptureHour: time[i],
            count: passCount.filter(item => item.faceCaptureHour === time[i])[0] ? passCount.filter(item => item.faceCaptureHour === time[i])[0].count : 0
          }
          passSum.push(obj)
        }
        for (let i = 0; i < time.length; i++) {
          let obj = {
            faceCaptureHour: time[i],
            count: passPeopleCount.filter(item => item.faceCaptureHour === time[i])[0] ? passPeopleCount.filter(item => item.faceCaptureHour === time[i])[0].count : 0
          }
          peopleSum.push(obj)
        }
        let ser0 = []
        let ser1 = []
        for (let i = 0; i < passSum.length; i++) {
          ser0.push(passSum[i].count)
          ser1.push(peopleSum[i].count)
        }
        var op4 = that.$refs.face_are_1
        if (that.pageInfoType === true) {
          op4.option.series[0].data = ser0
          op4.option.series[1].data = ser1
          op4.refresh()
        }
      }
      // } else {
      //   that.info_inOut1 = false
      //   that.info_inOut2 = true
      // }
    },
    household: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      reqParam.paths = ['小区总楼数', '小区总住户', '小区总人数']
      let that = this
      that.householdType = false
      // 获取门禁信息
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.householdType = true
          if (data.datas) {
            let dataNum = data.datas
            if (dataNum.filter(item => item.path === '小区总楼数')) {
              that.floorNumInfo = dataNum.filter(item => item.path === '小区总楼数')[0].data - 1
            } else {
              that.floorNumInfo = 0
            }
            if (dataNum.filter(item => item.path === '小区总住户')) {
              that.houseNumInfo = dataNum.filter(item => item.path === '小区总住户')[0].data
            } else {
              that.houseNumInfo = 0
            }
            if (dataNum.filter(item => item.path === '小区总人数')) {
              that.peopleNumInfo = dataNum.filter(item => item.path === '小区总人数')[0].data
            } else {
              that.peopleNumInfo = 0
            }
          }
        },
        error: function (err) {
          that.householdType = true
          console.log(err)
        }
      })
    },
    inOutPeople: function () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      reqParam.paths = ['小区进入人数', '小区离开人数', '小区驻留人数']
      let that = this
      that.inOutPeopleType = false
      // 获取门禁信息
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.inOutPeopleType = true
          if (data.datas) {
            let dataNum = data.datas
            if (dataNum.filter(item => item.path === '小区进入人数')) {
              that.inNumInfo = dataNum.filter(item => item.path === '小区进入人数')[0].data
            } else {
              that.inNumInfo = 0
            }
            if (dataNum.filter(item => item.path === '小区离开人数')) {
              that.outNumInfo = dataNum.filter(item => item.path === '小区离开人数')[0].data
            } else {
              that.outNumInfo = 0
            }
            if (dataNum.filter(item => item.path === '小区驻留人数')) {
              that.stayNumInfo = dataNum.filter(item => item.path === '小区驻留人数')[0].data
            } else {
              that.stayNumInfo = 0
            }
          }
        },
        error: function (err) {
          that.inOutPeopleType = true
          console.log(JSON.stringify(err) + '小区进入人数, 小区离开人数, 小区驻留人数')
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    console.log('销毁item/face')
    this.pageInfoType = false
    clearInterval(this.timer)
    next()
  },
  computed: {
    inNumInfoChange: function () {
      return this.tweenedNumberIn ? this.tweenedNumberIn.toFixed(0) : 0
    },
    outNumInfoChange: function () {
      return this.tweenedNumberOut ? this.tweenedNumberOut.toFixed(0) : 0
    },
    stayNumInfoChange: function () {
      return this.tweenedNumberStay ? this.tweenedNumberStay.toFixed(0) : 0
    }
  },
  watch: {
    inNumInfo: function (newValue, oldValue)  {
      this.inInfotype = true
      clearTimeout(this.timeType1)
      TweenLite.from(this.$data, 1, { tweenedNumberIn: Math.ceil(oldValue) })
      TweenLite.to(this.$data, 2, { tweenedNumberIn: newValue })
      this.timeType1 = setTimeout(() => {
          this.inInfotype = false
      }, 30000)
    },
    outNumInfo: function (newValue, oldValue)  {
      this.outInfotype = true
      clearTimeout(this.timeType2)
      TweenLite.from(this.$data, 1, { tweenedNumberOut: Math.ceil(oldValue) })
      TweenLite.to(this.$data, 2, { tweenedNumberOut: newValue })
      this.timeType2 = setTimeout(() => {
        this.outInfotype = false
      }, 30000)
    },
    stayNumInfo: function (newValue, oldValue)  {
      this.stayInfotype = true
      clearTimeout(this.timeType3)
      TweenLite.from(this.$data, 1, { tweenedNumberStay: Math.ceil(oldValue) })
      TweenLite.to(this.$data, 2, { tweenedNumberStay: newValue })
      this.timeType3 = setTimeout(() => {
        this.stayInfotype = false
      }, 30000)
    }
  }
}
</script>

<style scoped>
  .face {position: relative;height: 100%;}
  .content {display: grid; grid-template-columns: 7rem 1fr 7rem; padding: 0 5px; box-sizing: border-box; grid-column-gap: 10px; }
  /*.happy-scroll_1 {border-top: 3px solid rgba(49, 241, 254, 0.8); box-sizing: border-box; }*/
  .cheliang {height: 100%; display: grid; grid-template-rows: 200px 1fr; grid-row-gap: 20px; }
  .strange {height: 30px; font-size: 16px; position: absolute; left: 0; padding: 10px 0 0 10px; font-weight: 100; top: 0; color: #fff; }
  .noInfo {color:#fff; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) }
  .animate-enter {transition: all 0.3s ease; }
  .animate-enter, .animate-leave-active {opacity: 0; }
  .animate-enter {transform: translateX(-500px); }
  .animate-leave-active {transform: translateX(500px); }
  @media screen and (min-width: 1900px) and (max-width: 3000px){.content {grid-template-columns: 7.8rem 1fr 8.3rem; } }
  @media screen and (min-width: 3001px) {
    .content {grid-template-columns: 14.6rem 1fr 14.6rem; }
    .cheliang {width: 14.6rem; }
    .happy-scroll_1 {width: 14.6rem; }
  }
  @media screen and (min-width: 6001px) {
    .content {grid-template-columns: 20.6rem 1fr 20.6rem; }
    .cheliang {width: 20.6rem; grid-template-rows: 6.5rem 1fr; }
    .happy-scroll_1 {width: 20.6rem; }
    .echartTitle_t2{
      top: 1rem;
    }
  }
</style>
