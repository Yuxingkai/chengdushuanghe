<template>
  <div class="warning">
    <transition name="transtion_globle">
      <div
        class="left_globle"
        v-if="lefthideorshow">
        <div>
          <span class="left_globle_span" />
          <happy-scroll
            resize
            style="width:100%;box-sizing: border-box;height: 98%;"
            size='0'
            class="happy-scroll_1">
            <div
              class="cheliang"
              style="">
              <Box1
                title="感知数量"
                css="padding-top: 10px;margin-top:-1px;width:100%;font-size:0.45rem;">
                <el-carousel
                  v-if="leftTopLength > 6"
                  height="100%"
                  :indicator-position="inControl"
                  arrow="never"
                  :autoplay="autoplayFalse">
                  <el-carousel-item
                    v-for="(item,index) in items"
                    :key="index">
                    <InfoGroup
                      css=""
                      columns="3"
                      column-gap="0">
                      <InfoGroupCopy
                        v-for='(i,index) in item'
                        :key="index"
                        :title="i.name"
                        :num="i.total"
                        type='5'/>
                    </InfoGroup>
                  </el-carousel-item>
                </el-carousel>
                <InfoGroup
                  css=""
                  columns="3"
                  column-gap="0"
                  v-else
                  v-for="(item,index) in items"
                  :key="index">
                  <InfoGroupCopy
                    v-for='(i,index) in item'
                    :key="index"
                    :title="i.name"
                    :num="i.total"
                    type='5'/>
                </InfoGroup>
              </Box1>
              <div class="leftMain_m">
                <div
                  type="1"
                  style="padding-top: 20px;box-sizing: border-box; width:100%;position: relative">
                  <div
                    class="echartTitle_t echartTitle_t2"
                    style="">
                    <p class="echartTitle sliderTilSmall">设备报警类型处置</p>
                    <RadioGroup
                      items="近7天,近30天"
                      css="position: absolute; bottom: 0rem;right:0.1rem;z-index:999;font-size:.28rem"
                      @on-index-changed="nowindex"/>
                  </div>
                  <echart
                    config="alarm_bar1"
                    ref="alarm_bar1"
                    v-if="chartData"/>
                  <p
                    class="noInfo sliderTilSmall"
                    v-show="nodata">暂无数据</p>
                </div>
                <div
                  type="1"
                  style="padding-top: 10px;box-sizing: border-box; width:100%;position: relative;">
                  <div class="echartTitle_t echartTitle_t2">
                    <p class="echartTitle sliderTilSmall">设备报警七天处置</p>
                  </div>
                  <RadioGroup
                    items="近7天,近30天"
                    css="position: absolute;top:0;right:0.1rem;z-index:999;display:none"
                    @on-index-changed="nowindex2"/>
                  <echart
                    config="alarm_bar2"
                    ref="alarm_bar2"
                    v-if="chartData2"/>
                  <p
                    class="noInfo sliderTilSmall"
                    v-show="nodata2">暂无数据</p>
                </div>
                <div
                  type="1"
                  style="padding-top:10px;margin-top:0px;box-sizing: border-box;width:100%;position: relative">
                  <div class="echartTitle_t echartTitle_t2"><p class="echartTitles sliderTilSmall">当前在岗人员</p></div>
                  <div
                    class="textCon"
                    style="margin-top: .3rem;left: 0;color: white;width: 100%;">
                    <div class="peopleTitle">
                      <span/>
                      <span>姓名</span>
                      <span>职位</span>
                      <span>手机号</span>
                      <!--<span>定位</span>-->
                    </div>
                    <div
                      v-if="workers.length !== 0"
                      :class="{ 'wipe' : wipe }"
                      class="innerHeight">
                      <happy-scroll
                        resize
                        size="2">
                        <div
                          class="peopleTitle1"
                          :class="{'backGround': index%2 != 1,'clickbaccolor':nowindex1 == index}"
                          v-for="(item, index) in workers"
                          @click="focus4(index, item)"
                          :key="index">
                          <span class="imgDw"><img
                            v-if="item.political_Code === 2"
                            src="../../../../assets/images/nationalEmblem.png"
                            alt=""></span>
                          <span
                            :title="item.name"
                            style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.name }}</span>
                          <span
                            :title="item.position"
                            style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding: 0 5px;box-sizing: border-box">{{ item.position }}</span>
                          <span
                            :title="item.phoneNo"
                            style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.phoneNo }}</span>
                          <!--<span @click.stop="fixPosition(item, index)"><img-->
                            <!--class="imgClass"-->
                            <!--src="../../../../assets/images/position.svg"-->
                            <!--alt=""></span>-->
                        </div>
                      </happy-scroll>
                    </div>
                    <div
                      style="text-align: center;margin-top: .4rem"
                      class="sliderTilSmall"
                      v-else>暂无数据</div>
                  </div>
                </div>
              <!-- <Box3 type="1" css="padding-top:10px;margin-top:0px;box-sizing: border-box;width:100%;"position: absolute;top: .5rem;>
                <echart config="warning_bar_2"></echart>
              </Box3>
              <Box3 type="1" css="padding-top:10px;margin-top:0px;position: relative;box-sizing: border-box;width:100%;">
                <RadioGroup items="当日,本周,本月" css="position: absolute;top:0;right:0;width:3rem;z-index:999;height:0.52rem;"></RadioGroup>
                <echart config="warning_line_bottom"></echart>
              </Box3> -->
              </div>
            </div>
          </happy-scroll>
        </div>
      </div>
    </transition>
    <div
      v-if="false"
      @click="hideorshow"
      :class="btnClickBefore ? (btnPosition ? 'btnPositionClassl_globle': 'btnPositionClass_globle') : 'initClass_globle'"/>
    <!--地图 -->
    <div
      class="center_globle"
      style="height: 100%;">
      <div style="height: 100%;box-sizing: border-box;position: relative;">
        <!--<Box3 css='box-sizing: border-box;padding:5px;'>-->
        <Map/>
        <!--</Box3>-->
      </div>
    </div>
    <transition name="transtionright_globle">
      <div
        v-if="righthideorshow"
        class="right_globle">
        <span class="right_globle_span" />
        <div style="color:#fff;position:relative;overflow: hidden;height: 98%;">
          <list
            :filter="fil"
            :model-type="model"
            accord-type="1"
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
import user from '../../../../Utils/user'
import { apiNames } from '../../../../config/config'
import { Post, Get } from '../../../../Utils/Http'
import { getDays } from '../../../../Utils/Common'
import InfoGroupCopy from '../../../UIKit/InfoLabelCopy'
// import $ from 'jquery'
let _ = require('lodash')
export default {
  name: 'Wraning',
  data () {
    return {
      sontest: false,
      sontests: [
        {left: '400px', top: '0'},
        {left: '400px', top: '200px'}
      ],
      sontestsR: [
        {right: '400px', top: '200px', index: 5},
        {right: '400px', top: '0', index: 6}
      ],
      isProcess: 0,
      fil: [],
      model: [],
      screenData: { fils: [], models: [] },
      screenList: { fils: [], models: [] },
      items: [],
      autoplay: true,
      inControl: '',
      alarmType7day: [],
      alarmType30day: [],
      alarmTypeDone7day: [],
      alarmTypeDone30day: [],
      alarmDevice7day: [],
      alarmDevice30day: [],
      singleObj: {},
      singleObjPie7: {
        value: [],
        name: []
      },
      singleObjPie30: {
        value: [],
        name: []
      },
      data17: [],
      datas17: [],
      arr17: [],
      data130: [],
      datas130: [],
      arr130: [],
      data27: [],
      datas27: [],
      data230: [],
      datas230: [],
      data37: [],
      data330: [],
      names7: [],
      names30: [],
      indicator7: [],
      indicator30: [],
      days: '',
      groupTypeNum: 1,
      nodata: false,
      chartData: true,
      chartData2: true,
      nodata2: false,
      interval: 10000,
      workers: [],
      phoneNum: '',
      leftTop: [],
      leftTopLength: 0,
      isModelIDs: 1,
      autoplayFalse: false,
      pageInfoType: true,
      nowindex1: -1,
      fixPositionBool: false,
      btnPosition: true,
      rightbtnPosition: true,
      btnClickBefore: false,
      rightbtnClickBefore: false,
      lefthideorshow: true,
      righthideorshow: true,
      wipe: false
    }
  },
  watch: {
    nowindex1 () {
      this.fixPositionBool = false
    }
  },
  methods: {
    // testClick () {
    //   $('.testhover').animate({
    //     left: '450px',
    //     height: '600px',
    //     width: '600px',
    //     top: '50px'
    //   })
    //   setTimeout(() => {
    //     $('.testhover').animate({
    //       height: '560px',
    //       width: '560px'
    //     }, 'fast')
    //     $('.testhover').animate({
    //       left: '450px',
    //       height: '650px',
    //       width: '650px',
    //       top: '50px',
    //       opacity: '0',
    //       zIndex: '-1000'
    //     }, 'fast')
    //     setTimeout(() => {
    //       this.sontest = true
    //     }, 800)
    //   }, 1500)
    // },
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
    getScreen () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_alarm_log/alarmType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // 过滤mqtt参数
          this.fil = Array.from(new Set(data.datas.map(x => x.name)))
          // 筛选目录
          this.screenList.fils = data.datas
          window.localStorage.setItem('screenList', JSON.stringify(this.screenList))
          // 筛选条件
          this.screenData.fils = Array.from(new Set(data.datas.map(x => x.name)))
          window.localStorage.setItem('screenChoose', JSON.stringify(this.screenData))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getmodelID () {
      let reqParam = user.getRequestHeader()
      Post({
        async: true,
        url: apiNames['获取报警模型'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // 过滤mqtt参数
          this.model = Array.from(new Set(data.models.map(x => x.modelID)))
          // 筛选目录
          this.screenList.models = data.models
          window.localStorage.setItem('screenList', JSON.stringify(this.screenList))
          // 筛选条件
          this.screenData.models = Array.from(new Set(data.models.map(x => x.modelID)))
          window.localStorage.setItem('screenChoose', JSON.stringify(this.screenData))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取设备数量
    getDeviceNum () {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.types = []
      Post({
        async: true,
        url: apiNames['获取设备数量'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.deviceNumInfo) {
            this.items = []
            this.leftTopLength = data.deviceNumInfo.length
            for (let i = 0; i < this.leftTopLength; i++) {
              this.items.push({
                name: data.deviceNumInfo[i].name,
                total: 0
              })
            }
            if (this.items.length <= 6) {
              this.inControl = 'none'
            }
            this.items = this.splitArray(this.items, 6)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    allpie () {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      Post({
        async: true,
        url: apiNames['获取预警数据'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          console.log(data)
          if (data.responseStatus.resultCode === 0) {
            this.alarmType7day = JSON.parse(data.data).alarmType7day
            this.alarmType30day = JSON.parse(data.data).alarmType30day
            this.alarmTypeDone7day = JSON.parse(data.data).alarmTypeDone7day
            this.alarmTypeDone30day = JSON.parse(data.data).alarmTypeDone30day
            for (let i = 0; i < this.alarmType7day.length; i++) {
              this.data17.push(this.alarmType7day[i].alarmTypeName)
              this.datas17.push(this.alarmType7day[i].count)
            }
            for (let i = 0; i < this.alarmType30day.length; i++) {
              this.data130.push(this.alarmType30day[i].alarmTypeName)
              this.datas130.push(this.alarmType30day[i].count)
            }
            if (this.data17.length === 0) {
              console.log('342432423223')
              this.nodata = true
              this.chartData = false
            }
            for (let i = 0; i < this.alarmTypeDone7day.length; i++) {
              this.data27.push(this.alarmTypeDone7day[i].alarmTypeName)
              this.datas27.push(this.alarmTypeDone7day[i].count)
            }
            for (let i = 0; i < this.alarmTypeDone30day.length; i++) {
              this.data230.push(this.alarmTypeDone30day[i].alarmTypeName)
              this.datas230.push(this.alarmTypeDone30day[i].count)
            }
            if (this.data27.length === 0) {
              this.nodata2 = true
              this.chartData2 = false
            }
            for (let i = 0; i < this.alarmType7day.length; i++) {
              this.arr17[i] = 0
              for (let j = 0; j < this.alarmTypeDone7day.length; j++) {
                if (this.alarmType7day[i].alarmTypeName === this.alarmTypeDone7day[j].alarmTypeName) {
                  this.arr17[i] = this.alarmTypeDone7day[j].count
                }
              }
            }
            for (let i = 0; i < this.alarmType30day.length; i++) {
              this.arr130[i] = 0
              for (let j = 0; j < this.alarmTypeDone30day.length; j++) {
                if (this.alarmType30day[i].alarmTypeName === this.alarmTypeDone30day[j].alarmTypeName) {
                  this.arr130[i] = this.alarmTypeDone30day[j].count
                }
              }
            }
            this.pie1(this.data17, this.datas17, this.arr17)
            this.pie2(this.data27, this.datas27)
          }
          this.pie1(this.data17, this.datas17, this.arr17)
          // this.pie2(this.data27, this.datas27)
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getAlarmDoneInfo () {
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      let allPaths = ['小区设备近7天报警已处置情况']
      reqParam.paths = allPaths
      let that = this
      that.allPostType = false
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.allPostType = true
          if (data.datas) {
            let list = JSON.parse(data.datas[0].data)
            let time = []
            for (let i = 6; i >= 0; i--) {
              time.push(getDays(-i))
            }
            console.log(time, '=====')
            let arrListAll = []
            for (let i = 0; i < list.length; i++) {
              arrListAll.push({
                day: list[i].day.substring(5).replace('-', '/'),
                count: list[i].count,
                typeName: list[i].typeName
              })
            }
            let listName = []
            for (let i = 0; i < list.length; i++) {
              listName.push(list[i].typeName)
            }
            listName = _.uniq(listName)
            let obj = []
            for (let i = 0; i < listName.length; i++) {
              for (let j = 0; j < time.length; j++) {
                obj.push({
                  cday: time[j],
                  value: arrListAll.filter(item => item.typeName === listName[i] && item.day === time[j]).length !== 0 ? arrListAll.filter(item => item.typeName === listName[i] && item.day === time[j])[0].count : 0,
                  name: listName[i]
                })
              }
            }
            let op2 = that.$refs.alarm_bar2
            if (that.pageInfoType === true) {
              op2.option.xAxis.data = time
              op2.option.series = []
              for (let i = 0; i < listName.length; i++) {
                op2.option.series.push({
                  name: listName[i],
                  type: 'line',
                  symbol: 'none',
                  smooth: true,
                  symbolSize: 1,
                  data: obj.filter(item => item.name === listName[i])
                })
              }
              op2.refresh()
            }
          }
        },
        error: function (err) {
          that.allPostType = true
          console.log(err)
        }
      })
    },
    getNowPeople () {
      let reqParam = user.getRequestHeader()
      reqParam.villageID = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      Post({
        async: true,
        url: apiNames['获取当值人员'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.workers !== undefined) {
            this.workers = data.workers
          } else {
            this.workers = []
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    fixPosition (option, index) {
      this.nowindex1 = index
      if (!this.fixPositionBool) {
        this.fixPositionBool = true
        console.log(1)
        this.$bus.emit('/map/locate/peopleID', {
          isShowLayer: true,
          param: option
        })
      }
      setTimeout(() => {
        this.fixPositionBool = false
      }, 10000)
    },
    nowindex (msg) {
      if (msg[1] === 1) {
        if (this.data130.length === 0) {
          this.nodata = true
          this.chartData = false
        } else {
          this.nodata = false
          this.chartData = true
        }
        this.pie1(this.data130, this.datas130, this.arr130)
      } else {
        if (this.data17.length === 0) {
          this.nodata = true
          this.chartData = false
        } else {
          this.nodata = false
          this.chartData = true
        }
        this.pie1(this.data17, this.datas17, this.arr17)
      }
    },
    nowindex2 (msg) {
      // if (msg[1] === 1) {
      //   if (!this.data230) {
      //     this.nodata2 = true
      //     this.chartData2 = false
      //   }
      //   this.pie2(this.data230, this.datas230)
      // } else {
      //   if (!this.data27) {
      //     this.nodata2 = true
      //     this.chartData2 = false
      //   }
      //   this.pie2(this.data27, this.datas27)
      // }
    },
    pie1 (data, datas, arr) {
      let op1 = this.$refs.alarm_bar1
      op1.option.xAxis[0].data = data
      op1.option.series[0].data = datas
      op1.option.series[1].data = arr
      op1.refresh()
    },
    pie2 (data, datas) {
      // let op1 = this.$refs.alarm_bar2
      // op1.option.xAxis[0].data = data
      // op1.option.series[0].data = datas
      // op1.refresh()
    },
    splitArray (chartArr, msg) {
      let allData = []
      let currData = []
      for (let i = 0; i < chartArr.length; i++) {
        currData.push(chartArr[i])
        if ((i !== 0 && (i + 1) % msg === 0) || i === chartArr.length - 1) {
          allData.push(currData)
          currData = []
        }
      }
      return allData
    },
    getdeviceNum () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.types = []
      Post({
        async: true,
        url: apiNames['获取设备数量'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.deviceNumInfo) {
            that.leftTop = data.deviceNumInfo
            that.leftTopLength = data.deviceNumInfo.length
            that.items = data.deviceNumInfo
            if (that.items.length <= 6) {
              that.inControl = 'none'
            }
            that.items = this.splitArray(that.items, 6)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    callPhone (msg) {
      let url = 'http://31.0.178.202:1008'
      //  拨打电话
      let callid = url + '/api/callservice/call/' + msg
      // 挂断电话：
      // var hangUpCallid = url + '/api/callservice/endcall/{callid}'
      // 多人会议{先拨打电话然后加人进去}：
      let callidMore = url + '/api/callservice/add/' + this.phoneNum + '/' + msg
      let calladd = ''
      if (this.phoneNum !== '') {
        calladd = callidMore
      } else {
        calladd = callid
      }
      Get({
        async: false,
        url: calladd,
        dataType: 'jsonp',
        success: (data) => {
          if (this.phoneNum === '') {
            this.phoneNum = data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    endCall () {
      let url = 'http://31.0.178.202:1008'
      //  拨打电话
      // var callid = url + '/api/callservice/call/' + '015962733556'
      // 挂断电话：
      let hangUpCallid = url + '/api/callservice/endcall/' + this.phoneNum
      // 多人会议{先拨打电话然后加人进去}：
      Get({
        async: false,
        url: hangUpCallid,
        dataType: 'jsonp',
        success: (data) => {
          console.log(data)
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    focus4 (index, item) {
      this.nowindex = index
    }
  },
  components: {
    list,
    InfoGroupCopy
  },
  created () {
    // this.getDeviceNum()
    let option = JSON.parse(localStorage.getItem('screenChoose'))
    let entry = JSON.parse(localStorage.getItem('screenList'))
    if (!option || !entry) {
      this.getScreen()
      this.getmodelID()
    }
  },
  mounted () {
    // if (this.items.length > 1) {
    //   this.autoplay = true
    // } else {
    //   this.autoplay = false
    // }
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.$bus.emit('mapBtnPosition', this.btnPosition)
    this.pageInfoType = true
    this.getdeviceNum()
    this.getAlarmDoneInfo()
    this.getNowPeople()
    this.allpie()
    this.$bus.emit('/event/alarmTypeList', this.screenList)
    console.log(this.screenList)
  },
  beforeRouteLeave (to, from, next) {
    this.pageInfoType = false
    next()
  }
}
</script>

<style scoped>
  .cheliang {
    width:100%;
    height:100%;
    display:grid;
    grid-template-rows:4.5rem 1fr;
    padding-bottom:4px;
    box-sizing:border-box;
  }
  .leftMain_m{
    display:grid;
    grid-template-rows:1fr 1fr 5rem;
    box-sizing:border-box;
    margin-top:10px;
  }
  .sontestTrans-enter-active {
    animation: transtion_globle-leave .3s linear;
  }
  @keyframes transtion_globle-leave {
    0% {
      transform: translate(7.2rem, 2rem) scale(.1, .1);
    }
    100% {
      transform: translate(0.2rem, 0) scale(1, 1);
    }
  }
  .sontest1Trans-enter-active {
    animation: transtion_globle1-leave .3s linear;
  }
  @keyframes transtion_globle1-leave {
    0% {
      transform: translate(7.2rem, -.4rem) scale(.1, .1);
    }
    100% {
      transform: translate(0.2rem, 0) scale(1, 1);
    }
  }
  .sontest2Trans-enter-active {
    animation: transtion_globle2-leave .3s linear;
  }
  @keyframes transtion_globle2-leave {
    0% {
      transform: translate(-7.2rem, 4rem) scale(.1, .1);
    }
    100% {
      transform: translate(0, 0) scale(1, 1);
    }
  }
  .sontest3Trans-enter-active {
    animation: transtion_globle3-leave .3s linear;
  }
  @keyframes transtion_globle3-leave {
    0% {
      transform: translate(-7.2rem, .4rem) scale(.1, .1);
    }
    100% {
      transform: translate(0.2rem, 0) scale(1, 1);
    }
  }
  /*@keyframes testAnimation*/
  /*{*/
    /*0%   {width: 120px; height: 120px}*/
    /*50%  {width: 115px; height: 115px}*/
    /*100% {width: 100px; height: 100px}*/
  /*}*/
  /*.testhover:hover {*/
    /*animation: testAnimation .1s ease-out;*/
  /*}*/
  .testhover
  {
    transition:transform 1s;
  }
  .testhover:hover {
    transform: scale(1.1, 1.1);
  }
  .noInfo {color: #fff; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
  .peopleTitle {display: grid; grid-template-columns: 10% 1fr 30% 30%; grid-template-rows: 0.6rem;color:rgba(31,241,250,1); }
  .peopleTitle span {text-align: center; display: inline-block; line-height: 0.6rem; }
  .peopleTitle1 {display: grid; grid-template-columns: 10% 1fr 30% 30%; grid-template-rows: 0.6rem; cursor: pointer; }
  .imgDw img{height:50%;}
  .peopleTitle1 span {text-align: center; display: inline-block; line-height: 0.6rem;}
  .innerHeight {height: 3.25rem; }
  .imgClass {width: 20%; height: 100%; }
  @media screen and (min-width: 3001px) {
    .imgClass {width: 15%; height: 100%; }
    .peopleTitle {grid-template-rows: 0.8rem; }
    .peopleTitle span {line-height: 0.8rem; }
    .peopleTitle1 {grid-template-rows: 0.8rem; }
    .peopleTitle1 span {line-height: 0.8rem; }
    .innerHeight {height: 2.7rem; } }
  .backGround span {background:rgba(16,25,32,1); }
  .clickbaccolor span {background: #29545e;}
  .echartTitles {width: 100%; color:rgba(0,190,255,1); font-size: 0.45rem; font-weight: 400; margin:0 0 -.1rem 4%;}
  .nodata {color: white; bottom: 40%; width: 100%; text-align: center; position: absolute; }
  .warning {position: relative;height: 99%;margin-bottom: -1px;}
  /*.content {display: grid; grid-template-columns: 7rem 1fr 7rem; padding: 0 5px; box-sizing: border-box; grid-gap: 0.2rem; }*/
  /*@media screen and (min-width: 1900px) and (max-width: 3000px){.content {grid-template-columns: 7.8rem 1fr 8.3rem; } }*/
  /*@media screen and (min-width: 3001px) {.content {grid-template-columns: 14.6rem 1fr 14.6rem; } }*/
  @media screen and (min-width: 6001px) {
    .cheliang {
      grid-template-rows:6.5rem 1fr;
    }
    .leftMain_m{
      display:grid;
      grid-template-rows:1fr 1fr 10rem;
      box-sizing:border-box;
      margin-top:10px;
    }
    .innerHeight {
      height: 6.7rem;
    }
    .peopleTitle1 {
      grid-template-rows: 1.2rem;
    }
    .peopleTitle1 span {
      line-height: 1.2rem;
    }
    .echartTitle_t2{
      top: 1rem;
    }
  }
</style>
<style>
  .el-carousel {
    overflow-y: hidden;
  }
  .el-carousel__indicators {
    bottom: -12px !important;
  }
  @media screen and (min-width: 6001px) {
    .el-carousel__indicators {
      bottom: -14px !important;
    }
  }
</style>
