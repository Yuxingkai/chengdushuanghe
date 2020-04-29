<template>
  <div class="operation">
    <transition name="transtion_globle">
      <div
        class="left_globle"
        v-if="lefthideorshow">
        <span class="left_globle_span" />
        <div
          class="cheliang"
          style="width:100%;display:grid;padding-bottom:4px;box-sizing:border-box;overflow: hidden;">
          <Box1
            title="设备信息"
            css="padding:10px 0;width:100%;margin-top: -1px;">
            <div :class="{ 'wipe' : wipe }">
              <happy-scroll
                resize
                style="width:100%;box-sizing: border-box;height: 80%;"
                size='0'
                class="happy-scroll_1">
                <ul
                  class="submenu">
                  <InfoLabelOperation @filtRight="filtRight"/>
                </ul>
              </happy-scroll>
            </div>
          </Box1>
        </div>
      </div>
    </transition>
    <div
      v-if="false"
      @click="hideorshow"
      :class="btnClickBefore ? (btnPosition ? 'btnPositionClassl_globle': 'btnPositionClass_globle') : 'initClass_globle'"/>
    <div class="center_globle">
      <div
        style="color:#fff;grid-column:2;margin-left:0px;height: 100%;box-sizing: border-box;"
        class="mapDiv">
        <Map/>
      </div>
    </div>
    <transition name="transtionright_globle">
      <!--righthideorshow-->
      <div
        class="right_globle">
        <span class="right_globle_span" />
        <div style="color:#fff;grid-column:3;position:relative;height: 100%;">
          <!--<list-->
          <!--:filter="fil"-->
          <!--:types="alarmType"-->
          <!--:is-process="isProcess"-->
          <!--:is-model-ids="isModelIDs"/>-->
          <div
            style="padding: 30px 0 20px 0;box-sizing: border-box; width:100%;position: relative">
            <div
              class="echartTitle_t echartTitle_t2"
              style="top: .1rem">
              <p class="echartTitle sliderTilSmall">设备状态</p>
            </div>
          </div>
          <!--<p-->
          <!--style="text-align: center;padding-top: .5rem"-->
          <!--class="sliderTilSmall"-->
          <!--v-if="!fullScreenShow">暂无报警数据</p>-->
          <ul
            v-if="fullScreenShow"
            class="rel_waring">
            <p
              style="text-align: center;padding-top: .5rem"
              class="sliderTilSmall"
              v-show="errorShowInfo">暂无报警数据</p>
            <div
              v-if="!errorShowInfo"
              class="outBox">
              <div
                ref="listsDataBox"
                class="innerBox">
                <div
                  @mousewheel="handleScroll"
                  class="listsClass">
                  <div
                    v-for="(item, index) in fakeInfoArr"
                    :key="index"
                    @click="popInfo(item)"
                    class="listClass">
                    <div
                      class="imgBox">
                      <box2
                        type-hover="0"
                        css="width: 100%;height: 100%;">
                        <img
                          style="width: 80%;height: 76%;margin-left: 10%;margin-top: 12%"
                          :src="item.image"
                          alt="">
                      </box2>
                    </div>
                    <div style="flex: 1;margin-left: .2rem">
                      <div style="position: relative">
                        <span style="margin-right: .3rem;font-size: .36rem;font-family:PingFangSC-Medium;color:rgba(227,246,255,1);">{{ item.opsTypeName }}</span>
                        <!--<span @click="popInfo(item)"><img-->
                        <!--style="width: .32rem;height: .32rem;cursor: pointer"-->
                        <!--src="../../../../assets/wheel.png"-->
                        <!--alt=""></span>-->
                        <span style="position: absolute;top: 0;right: 0;font-size: .28rem;font-family:DIN-Medium;font-weight:500;color:rgba(196,241,255,1);">{{ item.alarmTime }}</span>
                      </div>
                      <div class="dashLine"/>
                      <div>
                        <div style="margin-top: .1rem;font-size: .28rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(220,246,255,0.7);">
                          <span>{{ item.deviceName }}</span>
                          <!--<span style="margin-left: 1rem">{{ item.deviceName }}</span>-->
                        </div>
                        <!--<div style="margin-top: .1rem;font-size: .28rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(220,246,255,0.7);">{{ item.alarmTitle }}</div>-->
                        <div style="position: relative;margin-top: .1rem">
                          <span style="font-size: .28rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(220,246,255,1);"/>
                          <span style="position: absolute;top: 0;right: 0;font-size: .28rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(255,84,84,1);">{{ item.state === 0 ? '未处理' : '已处理' }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
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
import user from '../../../../Utils/user'
import { apiNames } from '../../../../config/config'
import { Post } from '../../../../Utils/Http'
import InfoLabelOperation from '../../../UIKit/infoLaberOperation'

export default {
  name: 'Operation',
  data () {
    return {
      isLoading: true,
      showIndex: '',
      errorShowInfo: false,
      isProcess: 0,
      fil: ['offline'],
      alarmType: ['offline'],
      isModelIDs: 0,
      deviceNum: [],
      isLoading1: '',
      subIndex: 0,
      errInfo: '',
      btnPosition: true,
      rightbtnPosition: true,
      btnClickBefore: false,
      rightbtnClickBefore: false,
      lefthideorshow: true,
      righthideorshow: true,
      fakeInfoArr: [
        // {
        //   alarmIndex: 5,
        //   imgSrc: require('../../../../assets/images/maps/color/online/electricArc.png'),
        //   alarmLevelName: '一',
        //   alarmTypeName: '田林十二村',
        //   revealTime: '',
        //   eqName: '电弧告警',
        //   address: '田林十二村2号',
        //   alarmContent: '田林十二村 电弧告警',
        //   longTime: '183天12小时',
        //   typeName: '电弧',
        //   code: '20171118005301105',
        //   numInfo: 1
        // },
        // {
        //   alarmIndex: 1,
        //   imgSrc: require('../../../../assets/images/maps/color/online/camera.png'),
        //   alarmLevelName: '一',
        //   alarmTypeName: '田林十二村',
        //   revealTime: '',
        //   eqName: '摄像机报警',
        //   address: '垃圾分类监控45号右',
        //   alarmContent: '田林十二村 摄像机报警',
        //   longTime: '153天11小时',
        //   typeName: '摄像机',
        //   code: '-',
        //   numInfo: 2
        // },
        // {
        //   alarmIndex: 7,
        //   imgSrc: require('../../../../assets/images/maps/color/online/elecMeter.png'),
        //   alarmLevelName: '一',
        //   alarmTypeName: '田林十二村',
        //   revealTime: '',
        //   eqName: '电表报警',
        //   address: '田林十二村46号',
        //   alarmContent: '田林十二村 电表报警',
        //   longTime: '173天19小时',
        //   typeName: '电表',
        //   code: '48-204',
        //   numInfo: 3
        // },
        // {
        //   alarmIndex: 7,
        //   imgSrc: require('../../../../assets/images/maps/color/online/elecMeter.png'),
        //   alarmLevelName: '一',
        //   alarmTypeName: '田林十二村',
        //   revealTime: '',
        //   eqName: '电表报警',
        //   address: '田林十二村61号',
        //   alarmContent: '田林十二村 电表报警',
        //   longTime: '168天16小时',
        //   typeName: '电表',
        //   code: '64-202',
        //   numInfo: 2,
        //   ywcantchuzhi: true
        // }
      ],
      fullScreenShow: false,
      wipe: false,
      pageNum: 1,
      pageSize: 20,
      bol: false
    }
  },
  filters: {
    splitName: function (value) {
      value = value.substring(value.indexOf('-') + 1, value.length)
      return value
    }
  },
  components: {
    list,
    InfoLabelOperation
  },
  created () {
    this.fullScreenShow = true
    this.getOpsList()
    // this.getDeviceDif()
    this.getDeviceNum()
  },
  mounted: function () {
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let yunweiganzhiChuzhi = this.functionList.find((item) => { return item.functionCode === 'yunweiganzhi_chuzhi' })
    if (yunweiganzhiChuzhi === undefined) {
      this.ywcantchuzhi = false
    } else {
      this.ywcantchuzhi = true
    }
    this.timeShow()
    this.$bus.emit('mapBtnPosition', this.btnPosition)
  },
  methods: {
    changeT (msg1, msg2, msg3) {
      if (msg2) {
        this.nowIndexT = msg2
      } else {
        this.nowIndexT = 0
      }
      let filtName = msg1
      if (msg1) {
        filtName = msg1
      } else {
        filtName = this.deviceNum[0].type
      }
      let village = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      this.$bus.emit('/map/layerControl', {village: village, devices: filtName, isClickable: true})
    },
    popInfo (item) {
      window.pop.show({
        level: 1,
        component: () => import('../../../CommonUI/dialog/unusualDevice'),
        param: {
          level: 1,
          e: item
        }
      })
    },
    change (e) {
      if (e[1] === 0) {
        let arr = this.tweentyFour
        let op = this.$refs.dayVisitTop
        let lengenddata = []
        let seriesdata = []
        let allcount = 0
        let otherCount = 0
        if (arr.length > 5) {
          arr.sort((a, b) => {
            return parseInt(b.count) - parseInt(a.count)
          })
          for (let i = 5; i < arr.length; i++) {
            otherCount += parseInt(arr[i].count)
          }
        }
        arr.forEach(item => {
          allcount += parseInt(item.count)
          lengenddata.push(item.typeName)
          seriesdata.push({
            value: item.count,
            name: item.typeName
          })
        })
        let newlengenddata = arr.map(item => {
          let percent = 0
          if (allcount === 0) {
            percent = 0
          } else {
            percent = ((parseInt(item.count) / allcount) * 100).toFixed(2)
          }
          let name = `${item.typeName}  ${item.count}  ${percent}%`
          return name
        })
        let newseriesdata = arr.map((item, index) => {
          let obj = {
            value: item.count,
            name: newlengenddata[index]
          }
          return obj
        })
        if (newlengenddata.length > 5) {
          let percent = 0
          if (allcount === 0) {
            percent = 0
          } else {
            percent = ((parseInt(otherCount) / allcount) * 100).toFixed(2)
          }
          newlengenddata = newlengenddata.slice(0, 5)
          newlengenddata.push(`其他  ${otherCount}  ${percent}%`)
          newseriesdata = newseriesdata.slice(0, 5)
          newseriesdata.push({
            value: otherCount,
            name: newlengenddata[5]
          })
        }
        op.option.legend.data = newlengenddata
        op.option.series[0].data = newseriesdata
        op.dispatchAction(op.option.series[0].data)
        op.refresh()
      }
      if (e[1] === 1) {
        let arr = this.oneWeek
        let op = this.$refs.dayVisitTop
        let lengenddata = []
        let seriesdata = []
        let allcount = 0
        let otherCount = 0
        if (arr.length > 5) {
          arr.sort((a, b) => {
            return parseInt(b.count) - parseInt(a.count)
          })
          for (let i = 5; i < arr.length; i++) {
            otherCount += parseInt(arr[i].count)
          }
        }
        arr.forEach(item => {
          allcount += parseInt(item.count)
          lengenddata.push(item.typeName)
          seriesdata.push({
            value: item.count,
            name: item.typeName
          })
        })
        let newlengenddata = arr.map(item => {
          let percent = 0
          if (allcount === 0) {
            percent = 0
          } else {
            percent = ((parseInt(item.count) / allcount) * 100).toFixed(2)
          }
          let name = `${item.typeName}  ${item.count}  ${percent}%`
          return name
        })
        let newseriesdata = arr.map((item, index) => {
          let obj = {
            value: item.count,
            name: newlengenddata[index]
          }
          return obj
        })
        if (newlengenddata.length > 5) {
          let percent = 0
          if (allcount === 0) {
            percent = 0
          } else {
            percent = ((parseInt(otherCount) / allcount) * 100).toFixed(2)
          }
          newlengenddata = newlengenddata.slice(0, 5)
          newlengenddata.push(`其他  ${otherCount}  ${percent}%`)
          newseriesdata = newseriesdata.slice(0, 5)
          newseriesdata.push({
            value: otherCount,
            name: newlengenddata[5]
          })
        }
        op.option.legend.data = newlengenddata
        op.option.series[0].data = newseriesdata
        op.dispatchAction(op.option.series[0].data)
        op.refresh()
      }
      if (e[1] === 2) {
        let arr = this.oneMonth
        let op = this.$refs.dayVisitTop
        let lengenddata = []
        let seriesdata = []
        let allcount = 0
        let otherCount = 0
        if (arr.length > 5) {
          arr.sort((a, b) => {
            return parseInt(b.count) - parseInt(a.count)
          })
          for (let i = 5; i < arr.length; i++) {
            otherCount += parseInt(arr[i].count)
          }
        }
        arr.forEach(item => {
          allcount += parseInt(item.count)
          lengenddata.push(item.typeName)
          seriesdata.push({
            value: item.count,
            name: item.typeName
          })
        })
        let newlengenddata = arr.map(item => {
          let percent = 0
          if (allcount === 0) {
            percent = 0
          } else {
            percent = ((parseInt(item.count) / allcount) * 100).toFixed(2)
          }
          let name = `${item.typeName}  ${item.count}  ${percent}%`
          return name
        })
        let newseriesdata = arr.map((item, index) => {
          let obj = {
            value: item.count,
            name: newlengenddata[index]
          }
          return obj
        })
        if (newlengenddata.length > 5) {
          let percent = 0
          if (allcount === 0) {
            percent = 0
          } else {
            percent = ((parseInt(otherCount) / allcount) * 100).toFixed(2)
          }
          newlengenddata = newlengenddata.slice(0, 5)
          newlengenddata.push(`其他  ${otherCount}  ${percent}%`)
          newseriesdata = newseriesdata.slice(0, 5)
          newseriesdata.push({
            value: otherCount,
            name: newlengenddata[5]
          })
        }
        op.option.legend.data = newlengenddata
        op.option.series[0].data = newseriesdata
        op.dispatchAction(op.option.series[0].data)
        op.refresh()
      }
    },
    // getDeviceDif () {
    //   let reqParam = user.getRequestHeader()
    //   let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
    //   reqParam.villageIDs = [ConfigVillageIDs]
    //   reqParam.paths = ['设备高发异常排行二十四小时', '设备高发异常排行一周', '设备高发异常排行一月']
    //   Post({
    //     async: true,
    //     url: apiNames['获取统计图表'],
    //     data: reqParam,
    //     dataType: 'json',
    //     success: (data) => {
    //       if (data.responseStatus.resultCode === 0) {
    //         let alldata = data.datas
    //         this.tweentyFour = JSON.parse(alldata.filter(item => item.path === '设备高发异常排行二十四小时')[0].data)
    //         this.oneWeek = JSON.parse(alldata.filter(item => item.path === '设备高发异常排行一周')[0].data)
    //         this.oneMonth = JSON.parse(alldata.filter(item => item.path === '设备高发异常排行一月')[0].data)
    //         let arr = this.tweentyFour
    //         let op = this.$refs.dayVisitTop
    //         let lengenddata = []
    //         let seriesdata = []
    //         let allcount = 0
    //         let otherCount = 0
    //         if (arr.length > 5) {
    //           arr.sort((a, b) => {
    //             return parseInt(b.count) - parseInt(a.count)
    //           })
    //           for (let i = 5; i < arr.length; i++) {
    //             otherCount += parseInt(arr[i].count)
    //           }
    //         }
    //         arr.forEach(item => {
    //           allcount += parseInt(item.count)
    //           lengenddata.push(item.typeName)
    //           seriesdata.push({
    //             value: item.count,
    //             name: item.typeName
    //           })
    //         })
    //         let newlengenddata = arr.map(item => {
    //           let percent = 0
    //           if (allcount === 0) {
    //             percent = 0
    //           } else {
    //             percent = ((parseInt(item.count) / allcount) * 100).toFixed(2)
    //           }
    //           let name = `${item.typeName}  ${item.count}  ${percent}%`
    //           return name
    //         })
    //         let newseriesdata = arr.map((item, index) => {
    //           let obj = {
    //             value: item.count,
    //             name: newlengenddata[index]
    //           }
    //           return obj
    //         })
    //         if (newlengenddata.length > 5) {
    //           let percent = 0
    //           if (allcount === 0) {
    //             percent = 0
    //           } else {
    //             percent = ((parseInt(otherCount) / allcount) * 100).toFixed(2)
    //           }
    //           newlengenddata = newlengenddata.slice(0, 5)
    //           newlengenddata.push(`其他  ${otherCount}  ${percent}%`)
    //           newseriesdata = newseriesdata.slice(0, 5)
    //           newseriesdata.push({
    //             value: otherCount,
    //             name: newlengenddata[5]
    //           })
    //         }
    //         op.option.legend.data = newlengenddata
    //         op.option.series[0].data = newseriesdata
    //         op.dispatchAction(op.option.series[0].data)
    //         op.refresh()
    //       } else {
    //       }
    //     },
    //     error: (err) => {
    //       console.log(err)
    //     }
    //   })
    // },
    handleScroll () {
      if (this.$refs.listsDataBox.scrollTop + this.$refs.listsDataBox.clientHeight >= this.$refs.listsDataBox.scrollHeight) {
        console.log('请求数据')
        console.log(this.$refs.listsDataBox.scrollTop, this.$refs.listsDataBox.clientHeight, this.$refs.listsDataBox.scrollHeight)
        this.pageNum++
        if (!this.bol) {
          this.getOpsList()
        }
      }
    },
    select: function (index) {
      this.innerIndex = index
    },
    getOpsList () {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.pageNum = this.pageNum
      reqParam.pageSize = this.pageSize
      if (!this.bol) {
        this.bol = true
        Post({
          async: true,
          url: apiNames['获取设备维护情况'],
          data: reqParam,
          dataType: 'json',
          success: (data) => {
            if (data.responseStatus.resultCode === 0 && data.deviceOpsList.length !== 0) {
              this.fakeInfoArr = this.fakeInfoArr.concat(data.deviceOpsList)
              let allData = this.fakeInfoArr
              allData.forEach((item, index) => {
                switch (item.deviceType) {
                  case 'camera_face':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/camera_face.png')
                    break
                  case 'camera':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/camera.png')
                    break
                  case 'access':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/access.png')
                    break
                  case 'manholeCover':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/manholeCover.png')
                    break
                  case 'fireCock':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/fireCock.png')
                    break
                  case 'smokeDetector':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/smokeDetector.png')
                    break
                  case 'geomagnetic':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/geomagnetic.png')
                    break
                  case 'fence':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/fence_point.png')
                    break
                  case 'charger':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/charger.png')
                    break
                  case 'combustibleGas':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/combustibleGas.png')
                    break
                  case 'electricArc':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/electricArc.png')
                    break
                  case 'electronicPatrol':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/electronicPatrol.png')
                    break
                  case 'agedElectricSafety':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/agedElectricSafety.png')
                    break
                  case 'agedAlarm':
                    this.fakeInfoArr[index].image = require('../../../../assets/images/maps/color/online/agedAlarm.png')
                    break
                  default:
                    console.log('小图片缺失')
                }
              })
              this.bol = false
            } else {
              this.bol = true
              this.fakeInfoArr = []
            }
          },
          error: (err) => {
            console.log(JSON.stringify(err) + '获取设备维护情况')
          }
        })
      }
    },
    getDeviceNum: function () {
      let that = this
      that.isLoading = true
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      // 获取门禁信息
      setTimeout(() => {
        that.isLoading = false
        if (that.deviceNum.lenght > 0) that.errInfo = '没有相关设备信息'
      }, 8000)
      Post({
        async: true,
        url: apiNames['获取设备数量'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading = false
          if (data.deviceNumInfo) {
            that.errInfo = ''
            let arr = []
            let all = {
              name: '全部',
              total: 0,
              exTotal: 0,
              type: []
            }
            arr.push(all)
            data.deviceNumInfo.forEach(e => {
              arr.push({
                name: e.name,
                total: e.total,
                exTotal: e.exTotal,
                type: [e.type.replace(/^\s+|\s+$/g, '')]
              })
              all.total += e.total
              all.exTotal += e.exTotal
              all.type.push(e.type.replace(/^\s+|\s+$/g, ''))
            })
            that.deviceNum = arr
            console.log(that.deviceNum)
            that.changeT()
          } else {
            that.errInfo = '没有相关设备信息'
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + '获取设备数量')
          that.isLoading1 = false
          that.errInfo = '没有相关设备信息'
        }
      })
    },
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
    showTime (msg) {
      let timestamp = Date.parse(new Date()) - (msg * 60 * 60)
      let date = new Date(timestamp)
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    },
    timeShow () {
      let numArr = [1050, 1345, 1577, 1920]
      for (let i = 0; i < this.fakeInfoArr.length; i++) {
        // let num = Math.round(Math.random() * 2000) + 50
        let time = this.showTime(numArr[i])
        this.fakeInfoArr[i].revealTime = time
      }
    },
    operaShowpopupFake (msg) {
      if (this.ywcantchuzhi) {
        window.pop.show({
          level: 1,
          component: () => import('../../../CommonUI/dialog/operaFake'),
          param: {
            e: msg,
            level: 1
          }
        })
      } else {
        this.$message.error('无权限处置，请联系管理员开通权限')
      }
    },
    filtRight (msg) {
      if (msg) {
        this.showIndex = msg
        if (msg !== '全部' && msg !== '摄像机' && msg !== '电表' && msg !== '电弧' && msg !== '门禁') {
          this.errorShowInfo = true
        } else {
          this.errorShowInfo = false
        }
      } else {
        this.showIndex = '全部'
      }
    }
  }
}
</script>
<style scoped>
  .lazyload {height: 20px !important;}
  .noInfo {color:#fff; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%) }
  .cheliang {float: left; box-sizing: border-box; background-clip: content-box; width: 6.3rem; height: 100%; display: grid; grid-row-gap: 10px; padding-bottom: 10px; }
  .operation {position: relative;height: 100%;}
  .content {display: grid; grid-template-columns: 7rem 1fr 7rem; padding: 0 5px; box-sizing: border-box; grid-column-gap: 10px; }
  .submenu {list-style: none; margin: .3rem auto 1.2rem auto; width: 100%; height: 100%; position: relative; box-sizing: border-box;}
  .submenu li {width: 50%; height: 2.4rem; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; padding: 0 .1rem; text-align: center; float: left; color: #a3f0ff; }
  .submenu li .submenu_a{position: relative; font-size: .36rem; }
  .submenu li .submenu_a .submenu_b span{border: 1px solid #2ee5f3c9; box-sizing: border-box; height: 100%; width: 4px; position: absolute; }
  .submenu li .submenu_a .submenu_b span:nth-of-type(1){border-right: none; top: 0; left: 0; }
  .submenu li .submenu_a .submenu_b span:nth-of-type(2){border-left: none; top: 0; right: 0; }
  .submenu li .submenu_a .submenu_c {border-top: 2px solid #a4edfc; border-bottom: 2px solid #a4edfc; width: 90%; height: 100%; margin: 0 auto; position: relative; padding-top: .1rem; }
  .submenu li .submenu_a .submenu_cc{background-image: linear-gradient(to top, #48D6FF, #1872B4); color: #fff; font-weight: bold; animation:myfirst 0s;}
  .submenu li .submenu_a:hover .submenu_cd {
    background-image: linear-gradient(to top, #48D6FF, #1872B4);
    background-repeat: no-repeat;
    color: #fff;
    font-weight: bold;
    animation:myfirst .2s;
    cursor: pointer;
  }
  @keyframes myfirst
  {
    0%   {background-size: 100% 0%;}
    25%  {background-size: 100% 25%;}
    50%  {background-size: 100% 50%;}
    75%  {background-size: 100% 75%;}
    100% {background-size: 100% 100%;}
  }
  .submenu li .submenu_a .submenu_cd{margin: .05rem auto; width: 90%; height: 80%; }
  .submenu li .submenu_a .submenu_c span{border-top: 1px solid #a4edfc; border-left: 1px solid #a4edfc; display: inline-block; width: 95%; height: .06rem; position: absolute; top: .06rem; left: 2%; }
  .submenu li .submenu_a .submenu_c p:nth-of-type(1){font-weight: bold; }
  .submenu li .submenu_a .submenu_c p:nth-of-type(2){font-size: .6rem; }
  .submenu li .submenu_d {position: relative; margin-top: .1rem; width: 100%; background-image: linear-gradient(to right, rgba(14, 79, 97, 0.1), rgba(14, 79, 97, 0.7)); line-height: .52rem; text-align: center; color: #ffff00; font-size: .28rem; border-bottom: 1px solid rgba(14, 79, 97, 1); }
  .submenu li .submenu_d p span{font-size: .3rem; }
  .submenu li .submenu_d:before{content: ''; width: 4px; height: .34rem; background-color: #ffff00; position: absolute; left: 0; top: .09rem; }
  .submenu_active .submenu_a{color: #00ffff; }
  .submenu_active .submenu_a .submenu_c p:nth-of-type(2){}
  .mapDiv {padding-bottom: 1.08rem; }
  @media screen and (min-width: 1900px) and (max-width: 3000px){.content {grid-template-columns: 7.8rem 1fr 8.3rem; } }
  @media screen and (min-width: 3001px) {
    .content {grid-template-columns: 14.6rem 1fr 14.6rem; }
    .happy-scroll_1 {width: 14.6rem; }
    .cheliang {width: 14.6rem; }
    .submenu {padding-left: .3rem; }
    .submenu li {width: 7rem; height: 3rem; box-sizing: border-box; padding: 0 .3rem; }
    .submenu li .submenu_a{position: relative; font-size: .42rem; }
    .submenu li .submenu_a .submenu_c {width: 90%; padding-top: .25rem; }
    .submenu li .submenu_a .submenu_cd{margin: .1rem auto; }
    .submenu li .submenu_a .submenu_b span{width: .2rem; }
    .submenu li .submenu_a .submenu_c span {top: .14rem; height: .2rem; }
    .submenu li .submenu_d {font-size: .32rem; line-height: 0.68rem; }
    .submenu li .submenu_d p span{font-size: .36rem; }
    .submenu li .submenu_a .submenu_c p:nth-of-type(2){font-size: .7rem; }
    .submenu li .submenu_d:before{height: .5rem; }
  }
  /*假数据style*/
  .rel_waring {
    height: 100%;
  }
  .rel_waring li {display: block;text-align: left;margin-bottom: 0.12rem;position: relative;}
  .rel_waring li .rel_waring_top {overflow: hidden; display: block; position: absolute; top: 2px; right: 1px; z-index: 1; }
  .rel_waring li .rel_waring_top p {display: inline-block; float: right; line-height: .28rem; padding: .1rem; overflow: hidden; position: relative; font-weight: bold; text-align: center; background: #3cc3ff; color: #ff0000; margin: 1px 0; background: #3cc3ff; /*background: linear-gradient(45deg, transparent .08rem, #3cc3ff 0);*/ }
  .rel_waring li .rel_waring_top p::before{content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 0; border-height: .65rem; border-style: solid; border-color:transparent transparent #091428 #091428 ; }
  .rel_waring li .rel_waring_con {box-sizing: border-box; padding: 0.02rem .2rem 0.06rem .2rem; }
  .rel_waring li .rel_waring_con .animate-enter-active {transition: all 0.3s ease; }
  .rel_waring li .rel_waring_con-1 {font-family: InaiMathi; line-height: .7rem; margin-bottom: .1rem; color: #b5e1ea; }
  .rel_waring li .rel_waring_con-1 span:nth-of-type(1) {width: 1.8rem; display: inline-block; }
  .rel_waring li .rel_waring_con-1 span:nth-of-type(2) {margin-left: .1rem; color: #00edff; font-weight: normal; letter-spacing: 1.2px; }
  .rel_waring li .rel_waring_con-2 {overflow: hidden; display: flex; margin:.05rem .5rem 0 0; }
  .rel_waring li .rel_waring_con-21 {float: left; position: relative; width: 1.6rem; height: 2.1rem; padding: .04rem .084rem; box-sizing: border-box; background: #0a1e38; }
  .rel_waring li .rel_waring_con-21 .border_4 span {width: .05rem; height: .05rem; position: absolute; border: 1px solid #0ed5cd; }
  .rel_waring li .rel_waring_con-21 .border_4 span:nth-of-type(1) {left: 0; top: 0; border-right: none; border-bottom: none; }
  .rel_waring li .rel_waring_con-21 .border_4 span:nth-of-type(2) {left: 0; bottom: 0; border-right: none; border-top: none; }
  .rel_waring li .rel_waring_con-21 .border_4 span:nth-of-type(3) {right: 0; top: 0; border-left: none; border-bottom: none; }
  .rel_waring li .rel_waring_con-21 .border_4 span:nth-of-type(4) {right: 0; bottom: 0; border-left: none; border-top: none; }
  /*.rel_waring li .rel_waring_con-21 img {width: .86rem; height: .86rem; }*/
  .rel_waring li .rel_waring_con-21 img {width: 1.45rem;position: absolute;left:0;right:0;top:0;bottom: 0;margin: auto; }
  .decoration {min-width: .18rem; margin-left: .2rem }
  .decoration>img{vertical-align: middle }
  .rel_waring li .rel_waring_con-22 {float: left; box-sizing: border-box; padding-left: .1rem; margin-left: .1rem;width:68%;}
  .rel_waring li .rel_waring_con-22 p {margin: .05rem 0; position: relative; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 96%; font-size: .36rem}
  .rel_waring li .rel_waring_con-22 p.point::before {content: ''; position: absolute; top: 47%; left: -.27rem; width: .1rem; height: .1rem; border-radius: 50%; background: #07ffff; }
  .rel_waring li .rel_waring_con-22 p:nth-of-type(1) {font-size: .4rem;color:rgba(137,222,252,1); }
  .rel_waring li .rel_waring_con-22 p:nth-of-type(2) {font-size: .32rem  ;}
  @media screen and (max-width: 3000px) and (min-width: 1200px) {
    .rel_waring li .rel_waring_con-21 img {
      width: 1.15rem!important;
    }
  }
  .imgBox {
    width: 1.74rem;
    height: 1.74rem
  }
  .listClass {
    width: 96%;
    height: 1.7rem;
    display: flex;
    padding: .1rem 2% .2rem 2%;
    margin-top: .4rem;
    cursor: pointer;
  }
  .listsClass {
    width: 100%;
  }
  .innerBox {
    width: 102%;
    height: 100%;
    overflow-y: scroll
  }
  .outBox {
    width: 100%;
    height: 100%;
    overflow: hidden
  }
  .dashLine {
    width: 100%;
    height: .05rem;
    background-size: .2rem .2rem;
    background-image: url("../../../../assets/dashLine.png");
  }
</style>
