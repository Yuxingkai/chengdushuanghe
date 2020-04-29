<template>
  <div class="car">
    <transition name="transtion_globle">
      <div
        class="left_globle"
        v-if="lefthideorshow">
        <span class="left_globle_span" />
        <div
          class="cheliang"
          style="">
          <Box1
            title="停车场信息"
            css="padding-top: 10px;margin-top:-1px;box-sizing:border-box">
            <InfoGroup
              css=""
              columns="3"
              column-gap="0">
              <InfoGroupCopy
                title="车位总数"
                :num="carAllNumChange"
                type='5'
                :type-info="carAllNumotype"/>
              <InfoGroupCopy
                title="驶入登记"
                :num="carInregisterChange"
                type='5'
                :type-info="carInregistertype"/>
              <InfoGroupCopy
                title="驶入外来"
                :num="carInforeignChange"
                type='5'
                :type-info="carInforeigntype"/>
              <InfoGroupCopy
                title="驻留"
                :num="carstayChange"
                type='5'
                :type-info="carstaytype"/>
              <InfoGroupCopy
                title="驶出登记"
                :num="carOutregisterChange"
                type='5'
                :type-info="carOutregistertype"/>
              <InfoGroupCopy
                title="驶出外来"
                :num="carOutforeignChange"
                type='5'
                :type-info="carOutforeigntype"/>
            </InfoGroup>
          </Box1>
          <div style="display:grid;grid-template-rows:1fr 1fr 1fr;box-sizing:border-box;margin-top:10px;width:100%;">
            <!-- <Box3 type="1" css="padding-top: 10px;box-sizing: border-box;">
              <p class="echartTitle sliderTilSmall">进出小区排行榜</p>
              <echart config="car_bar" height="100%"></echart>
            </Box3> -->
            <!-- <Box3 type="1" css="padding-top:10px;margin-top:0px;position: relative;box-sizing: border-box;">
              <RadioGroup items="当日,本周,本月" @on-index-changed="zdy" css="position: absolute;top:0;right:0.1rem;z-index:999;"></RadioGroup>
              <p class="echartTitle sliderTilSmall">车辆进出统计</p>
              <echart config="car_line_bottom"  height="100%" ref='fire'></echart>
            </Box3> -->
            <div
              type="1"
              style="padding-top:10px;margin-top:0px;box-sizing: border-box;position: relative;">
              <div
                class="echartTitle_t echartTitle_t2"
                style="">
                <p class="echartTitle sliderTilSmall">常驻和外来车辆出行感知</p>
                <RadioGroup
                  items="近7天,近30天"
                  @on-index-changed="getSenseCars"
                  css="position: absolute;bottom:0rem;right:0.1rem;z-index:999;"/>
              </div>
              <echart
                config="car_pie"
                ref="car_pie"
                height="100%"/>
            </div>
            <div
              type="1"
              style="padding-top:10px;margin-top:0px;box-sizing: border-box;position: relative;">
              <div
                class="echartTitle_t echartTitle_t2"
                style=""><p class="echartTitle sliderTilSmall">0 ~ 24小时车辆通行感知</p></div>
              <echart
                config="car_line"
                ref="car_line"
                height="100%"/>
            </div>
            <div
              type="1"
              style="padding-top: 10px;box-sizing: border-box;position: relative;">
              <div
                class="echartTitle_t echartTitle_t2"
                style=""><p class="echartTitle sliderTilSmall">进出小区排行榜</p></div>
              <echart
                config="car_bar"
                height="100%"
                ref="car_bar"/>
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
      <!-- 地图 -->
      <div style="color:#fff;height: 100%;box-sizing: border-box;padding-bottom: 1.08rem;">
        <Map/>
      </div>
    </div>
    <transition name="transtionright_globle">
      <div
        v-if="righthideorshow"
        class="right_globle">
        <span class="right_globle_span" />
        <div style="color:#fff;overflow: hidden;height: 98%;">
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
import list from '../../public/alarmList'
import { getDays } from '../../../../Utils/Common'
import user from '../../../../Utils/user'
import { apiNames } from '../../../../config/config'
import { Post } from '../../../../Utils/Http'
import InfoGroupCopy from '../../../UIKit/InfoLabelCopy'
import { TweenLite } from 'gsap/TweenMax'

export default {
  name: 'Cheliang',
  components: {
    list,
    InfoGroupCopy
  },
  data () {
    return {
      isProcess: 2,
      fil: ['parkingCarExceed'],
      alarmType: ['parkingCarExceed'],
      num: 1,
      carNum: 0,
      timer: '',
      items: [
        { title: '车位总数', num: '0' },
        { title: '驶入登记', num: '0' },
        { title: '驶入外来', num: '0' },
        { title: '驻留', num: '0' },
        { title: '驶出登记', num: '0' },
        { title: '驶出外来', num: '0' }
      ],
      bar3: [],
      carbarx: [],
      carbarcount: [],
      carbartime: [],
      isModelIDs: 0,
      pageInfoType: true,
      carAllNum: 0, // 车位总数
      tweenedNumberAllNum: 0,
      carAllNumotype: false,
      carInregister: 0, // 驶入登记
      tweenedNumbercarInregister: 0,
      carInregistertype: false,
      carInforeign: 0, // 驶入外来
      tweenedNumbercarInforeign: 0,
      carInforeigntype: false,
      carstay: 0, // 驻留
      tweenedNumbercarstay: 0,
      carstaytype: false,
      carOutregister: 0, // 驶出登记
      tweenedNumbercarOutregister: 0,
      carOutregistertype: false,
      carOutforeign: 0, // 驶出外来
      tweenedNumbercarOutforeign: 0,
      carOutforeigntype: false,
      timeType1: '',
      timeType2: '',
      timeType3: '',
      timeType4: '',
      timeType5: '',
      InoutMonthArrInfo: '',
      MonthNumArrInfo: '',
      btnPosition: true,
      rightbtnPosition: true,
      btnClickBefore: false,
      rightbtnClickBefore: false,
      lefthideorshow: true,
      righthideorshow: true
    }
  },
  mounted () {
    this.$bus.emit('mapBtnPosition', this.btnPosition)
    this.$bus.emit('/event/alarmTypeList', this.fil)
    this.addInfo()
    this.timer = setInterval(() => { this.getCarInfo() }, 5000)
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
    addInfo () {
      this.getCarNum()
      this.getCarInfo()
      this.getCarIONum()
      this.getSenseCarsInfo()
    },
    carBar (xAxis, count, time) {
      let op1 = this.$refs.car_bar
      if (this.pageInfoType === true) {
        op1.option.xAxis[0].data = xAxis
        op1.option.series[0].data = count
        op1.option.series[1].data = time
        op1.refresh()
      }
    },
    getCarNum () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['小区车位总数', '车辆驻留']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            that.items[0].num = data.datas[0].data
            that.carAllNum = data.datas[0].data
            that.items[3].num = data.datas[1].data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
      Post({
        async: true,
        url: apiNames['感知车辆进出'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            that.items[1].num = JSON.parse(data.data).carIns[0].carInOut
            that.items[5].num = JSON.parse(data.data).carOuts[0].carInOut
            that.items[2].num = JSON.parse(data.data).carLocals[0].carLocal
            that.items[4].num = JSON.parse(data.data).carForeigns[0].carForeign
            that.bar3 = JSON.parse(data.data).CarInOut
            that.carbarx = that.bar3.map(item => item.plateNo)
            that.carbarcount = that.bar3.map(item => item.count)
            that.carbartime = that.bar3.map(item => item.carLeaveTime)
            that.carBar(that.carbarx, that.carbarcount, that.carbartime)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getCarInfo () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['车辆驻留', '小区当日驶入登记数量', '小区当日驶入外来数量', '小区当日驶出登记数量', '小区当日驶出外来数量']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            that.items[1].num = data.datas[1].data
            that.items[2].num = data.datas[2].data
            that.items[3].num = data.datas[0].data
            that.items[4].num = data.datas[3].data
            that.items[5].num = data.datas[4].data

            that.carInregister = data.datas[1].data
            that.carInforeign = data.datas[2].data
            that.carstay = data.datas[0].data
            that.carOutregister = data.datas[3].data
            that.carOutforeign = data.datas[4].data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getCarIONum () {
      let that = this
      let reqParam = user.getRequestHeader()
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [ConfigVillageIDs]
      Post({
        async: true,
        url: apiNames['车辆通行记录'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (!data) {
            console.log('无数据车辆进入数据')
          } else {
            let dataTime = []
            for (let i = 0; i <= 24; i++) {
              dataTime.push(i)
            }
            let arrTime = dataTime
            // 车辆进出 按小时
            let carInoutHours = JSON.parse(data.data).carInoutHours
            let carInHours = carInoutHours.filter(item => item.type === '驶入')
            let carOutHours = carInoutHours.filter(item => item.type === '驶出')
            // 按小时匹配驶入车辆
            let inHours = []
            let outHours = []
            // 按小时分别匹配每天24小时的车辆通行次数
            for (let i = 0; i <= new Date().getHours(); i++) {
              inHours.push(carInHours.filter(item => parseInt(item.hour) === dataTime[i]).length !== 0 ? carInHours.filter(item => item.hour === i)[0].count : 0)
              outHours.push(carOutHours.filter(item => parseInt(item.hour) === dataTime[i]).length !== 0 ? carOutHours.filter(item => item.hour === i)[0].count : 0)
            }
            let arrCar = {
              inCar: inHours,
              outCar: outHours
            }
            let car2 = that.$refs.car_line
            if (that.pageInfoType === true) {
              car2.option.xAxis.data = arrTime
              car2.option.series[0].data = arrCar.inCar
              car2.option.series[1].data = arrCar.outCar
              car2.refresh()
            }
          }
        },
        err: function (err) {
          console.log(err)
        }
      })
    },
    getSenseCarsInfo () {
      let that = this
      let reqParam = user.getRequestHeader()
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [ConfigVillageIDs]
      Post({
        async: true,
        url: apiNames['获取车辆出行感知'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (!data) {
            console.log('常驻和外来车辆出行感知无数据')
          } else {
            let list = JSON.parse(data.data)
            that.InoutMonthArrInfo = list.carInoutMonth
            that.MonthNumArrInfo = list.carsMonth
            that.getSenseCars()
          }
        },
        err: function (err) {
          console.log(err)
        }
      })
    },
    getSenseCars (msg) {
      let that = this
      msg ? msg = that.carNum = msg[1] : msg = that.carNum
      let InoutMonthArr = that.InoutMonthArrInfo
      let MonthNumArr = that.MonthNumArrInfo
      for (let i = 0; i < InoutMonthArr.length; i++) {
        InoutMonthArr[i].date = InoutMonthArr[i].日期.substring(5).replace('-', '/')
      }
      for (let i = 0; i < MonthNumArr.length; i++) {
        MonthNumArr[i].date = MonthNumArr[i].cday.substring(5).replace('-', '/')
      }
      // 获取前七天或者前30天的确切日期
      let weekArr = []
      let monthArr = []
      for (let i = 6; i >= 0; i--) {
        let str = '周' + '日一二三四五六日一二三四五六'.charAt(new Date().getDay() + 7 - i)
        weekArr.push(str)
      }
      for (let i = 29; i >= 0; i--) {
        monthArr.push(getDays(-i))
      }
      // 处理30天、7天数据
      let obj = [[], []]
      for (let i = 0; i < monthArr.length; i++) {
        obj[1].push(InoutMonthArr.filter(item => item.date === monthArr[i]).length !== 0 ? InoutMonthArr.filter(item => item.date === monthArr[i])[0].次数 : 0)
      }
      obj[0] = obj[1].filter((element, index, array) => index >= array.length - 7)

      let obj1 = [[], []]
      for (let i = 0; i < monthArr.length; i++) {
        obj1[1].push(MonthNumArr.filter(item => item.date === monthArr[i]).length !== 0 ? MonthNumArr.filter(item => item.date === monthArr[i])[0].carCount : 0)
      }
      obj1[0] = obj1[1].filter((element, index, array) => index >= array.length - 7)
      // 时间处理
      let dataTime = [weekArr, monthArr]
      let opAlarm = that.$refs.car_pie
      if (that.pageInfoType === true) {
        opAlarm.option.series[0].data = obj[msg]
        opAlarm.option.series[1].data = obj1[msg]
        opAlarm.option.xAxis[0].data = dataTime[msg]
        opAlarm.refresh()
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    this.pageInfoType = false
    clearInterval(this.timer)
    next()
  },
  computed: {
    carAllNumChange: function () {
      return this.tweenedNumberAllNum ? this.tweenedNumberAllNum.toFixed(0) : 0
    },
    carInregisterChange: function () {
      return this.tweenedNumbercarInregister ? this.tweenedNumbercarInregister.toFixed(0) : 0
    },
    carInforeignChange: function () {
      return this.tweenedNumbercarInforeign ? this.tweenedNumbercarInforeign.toFixed(0) : 0
    },
    carstayChange: function () {
      return this.tweenedNumbercarstay ? this.tweenedNumbercarstay.toFixed(0) : 0
    },
    carOutregisterChange: function () {
      return this.tweenedNumbercarOutregister ? this.tweenedNumbercarOutregister.toFixed(0) : 0
    },
    carOutforeignChange: function () {
      return this.tweenedNumbercarOutforeign ? this.tweenedNumbercarOutforeign.toFixed(0) : 0
    }
  },
  watch: {
    carAllNum: function (newValue, oldValue) {
      this.carAllNumotype = true
      clearTimeout(this.timeType1)
      TweenLite.from(this.$data, 1, {tweenedNumberAllNum: Math.ceil(oldValue)})
      TweenLite.to(this.$data, 2, {tweenedNumberAllNum: newValue})
      this.timeType1 = setTimeout(() => {
        this.carAllNumotype = false
      }, 30000)
    },
    carInregister: function (newValue, oldValue) {
      this.carInregistertype = true
      clearTimeout(this.timeType2)
      TweenLite.from(this.$data, 1, {tweenedNumbercarInregister: Math.ceil(oldValue)})
      TweenLite.to(this.$data, 2, {tweenedNumbercarInregister: newValue})
      this.timeType2 = setTimeout(() => {
        this.carInregistertype = false
      }, 30000)
    },
    carInforeign: function (newValue, oldValue) {
      this.carInforeigntype = true
      clearTimeout(this.timeType3)
      TweenLite.from(this.$data, 1, {tweenedNumbercarInforeign: Math.ceil(oldValue)})
      TweenLite.to(this.$data, 2, {tweenedNumbercarInforeign: newValue})
      this.timeType3 = setTimeout(() => {
        this.carInforeigntype = false
      }, 30000)
    },
    carstay: function (newValue, oldValue) {
      this.carstaytype = true
      clearTimeout(this.timeType4)
      TweenLite.from(this.$data, 1, {tweenedNumbercarstay: Math.ceil(oldValue)})
      TweenLite.to(this.$data, 2, {tweenedNumbercarstay: newValue})
      this.timeType4 = setTimeout(() => {
        this.carstaytype = false
      }, 30000)
    },
    carOutregister: function (newValue, oldValue) {
      this.carOutregistertype = true
      clearTimeout(this.timeType5)
      TweenLite.from(this.$data, 1, {tweenedNumbercarOutregister: Math.ceil(oldValue)})
      TweenLite.to(this.$data, 2, {tweenedNumbercarOutregister: newValue})
      this.timeType5 = setTimeout(() => {
        this.carOutregistertype = false
      }, 30000)
    },
    carOutforeign: function (newValue, oldValue) {
      this.carOutforeigntype = true
      clearTimeout(this.timeType6)
      TweenLite.from(this.$data, 1, {tweenedNumbercarOutforeign: Math.ceil(oldValue)})
      TweenLite.to(this.$data, 2, {tweenedNumbercarOutforeign: newValue})
      this.timeType6 = setTimeout(() => {
        this.carOutforeigntype = false
      }, 30000)
    }
  }
}
</script>
<style scoped>
  .car {
    position: relative;
    height: 100%;
  }
  .echartTitle_t2{
    top: .2rem;
  }
  .content {display: grid; width: 100%; grid-template-columns: 7rem 1fr 7rem; padding: 0 5px; box-sizing: border-box; grid-column-gap: 10px; }
  /*.happy-scroll_1 {!* height: auto; *! border-top: 3px solid rgba(49, 241, 254, 0.8); !* box-sizing: border-box; *! }*/
  .cheliang {height: 100%; display: grid; grid-template-rows: 200px 1fr; grid-row-gap: 10px; }
  .cheliang{width:100%;height:100%;display:grid;grid-template-rows:4.2rem 1fr;padding-bottom:6px;box-sizing:border-box;}
  @media screen and (min-width: 1900px) and (max-width: 3000px){.content {grid-template-columns: 7.8rem 1fr 8.3rem; } }
  @media screen and (min-width: 3001px) {
    .content {grid-template-columns: 14.6rem 1fr 14.6rem; }
    .cheliang {width: 14.6rem; }
  }
  @media screen and (min-width: 6001px) {
    .content {grid-template-columns: 20.6rem 1fr 20.6rem; }
    .cheliang {width: 20.6rem;grid-template-rows:6.5rem 1fr; }
    .echartTitle_t2{
      top: 1rem;
    }
  }
</style>
