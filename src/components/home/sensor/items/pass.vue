<template>
  <div class="pass">
    <transition name="transtion_globle">
      <div
        class="left_globle"
        v-if="lefthideorshow">
        <span class="left_globle_span" />
        <div class="cheliang">
          <Box1
            title="社区基本信息"
            css="padding-top: 10px;margin-top:-1px;height:100%;width:100%;box-sizing:border-box;">
            <InfoGroup
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
          <div style="display:grid;grid-template-rows:.8fr 1.2fr 1fr;box-sizing:border-box;margin-top:10px;width:100%;">
            <!-- 总通行人数/次数分析 -->
            <div style='position: relative'>
              <div
                class="echartTitle_t echartTitle_t2"
                style="">
                <p class="echartTitle sliderTilSmall">当日通行人员/次数感知</p>
              </div>
              <echart
                config="pass_bar_1"
                ref="pass_bar_1"
                css="width:100%;height:100%;"/>
            </div>
            <!-- 分时段通行人数统计 -->
            <div style='position: relative'>
              <div
                class="echartTitle_t echartTitle_t2"
                style="">
                <p class="echartTitle sliderTilSmall">本周开门方式</p>
              </div>
              <echart
                v-show="pass_are_1_info1"
                config="pass_are_1"
                ref="pass_are_1"/>
              <p
                class="noInfo sliderTilSmall"
                v-show="pass_are_1_info2">暂无数据</p>
            </div>
            <!-- 最后一个 -->
            <div style='position: relative'>
              <div
                class="echartTitle_t echartTitle_t2"
                style="">
                <p class="echartTitle sliderTilSmall">楼栋人员通行Top5</p>
                <RadioGroup
                  items="当日,近7天,近30天"
                  css="position: absolute;right:0.1rem;bottom:0rem;z-index:1;"
                  @on-index-changed="getPeoplePassChange"/>
              </div>
              <echart
                config="pass_line_bottom"
                ref="pass_line_bottom"
                v-show="pass_line_bottom_info1"/>
              <p
                class="noInfo sliderTilSmall"
                v-show="pass_line_bottom_info2">暂无数据</p>
            </div>
            <!-- 通行方式统计 pass_sl_bar-->
            <!-- <Box3 css=''>
                <p class="echartTitle sliderTilSmall">分时段通人数统计</p>
                <echart config="pass_sl_bar"
                        ref='sl'></echart>
              </Box3> -->
            <!-- 通行楼栋统计 -->
            <!--<Box3 css=''> -->
            <!-- <p class="echartTitle sliderTilSmall">通行楼栋统计</p>
              <RadioGroup items="当日,本周,本月"
                          css="position: absolute;right:0.1rem;top:0;z-index:1;"></RadioGroup>
              <echart config="pass_bar_2"></echart>
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
      <div style="color:#fff;grid-column:2;height: 100%;box-sizing: border-box;padding-bottom: .53rem;margin-left:0px;">
        <Map/>
      </div>
    </div>
    <transition name="transtionright_globle">
      <div
        v-show="righthideorshow"
        class="right_globle">
        <span class="right_globle_span" />
        <div
          style="color:#fff;grid-column:3;border-top: 0px solid #31f1fe;box-sizing: border-box;padding: 4px;height: 100%;"
          id="public_pass">
          <div class="right_main">
            <Tab
              :type="type"
              :padding="fontPadding"
              id="public_tab"
              @pass-index-choose='tabChoose'>
              <div
                v-for="group in AlarmModels"
                :key="group.id">
                <TabItem :title="group.groupName">
                  <Box3 css="height:auto;padding:.1rem 0;">
                    <transition
                      name="animate"
                      mode="out-in">
                      <div class="tab_div">
                        <ul>
                          <li
                            v-for="(item,index) in group.sceneList"
                            :key="item.id">
                            <div
                              @click="exchange(index,item)"
                              :class="{'hov': index === active}">
                              <p :title="item.modelName"><span/>{{ item.modelName }}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </transition>
                  </Box3>
                </TabItem>
              </div>
            </Tab>
            <div style="overflow-x: hidden;">
              <ul
                class="right_ul"
                :class="{ 'wipe' : wipe }"
                ref="scollHeight">
                <happy-scroll
                  resize
                  size='2'
                  style="height: 98%;">
                  <loading :visible="isLoading2"/>
                  <p style="text-align: center;margin-top: 10px">{{ errInfo }}</p>
                  <li
                    v-for="item in listInfo"
                    :key="item.id"
                    @click="showpopup(item)">
                    <div
                      class="div_img"><img
                        :class="{testDiv : isMask === true && item.alarmPeople.pic !== ''}"
                        :src="item.alarmPeople.pic | splitPhoto"
                        alt=""></div>
                    <div class="div_content">
                      <p>
                        <span
                          v-if="item.isDeal == 0"
                          class="type1">未处理</span>
                        <span
                          v-else-if="item.isDeal == 1"
                          class="type2">已处理</span>
                      </p>
                      <p>
                        <span>{{ item.alarmPeople.name | capitalize }}</span>
                        <span>{{ item.alarmPeople.age | capitalize }}岁</span><br>
                        <span>{{ item.alarmTime | capitalize }}</span><br>
                        <!--显示人员标签，目前标签有问题，暂时隐藏-->
                        <span style="display: none">{{ item.alarmPeople.labels | capitalize }}</span>
                      </p>
                      <p>{{ item.address | capitalize }}</p>
                      <p>
                        <span>详情</span>
                      </p>
                    </div>
                  </li>
                </happy-scroll>
              </ul>
            </div>
          </div>
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
import { getRealTimePointComponent, apiNames } from '../../../../config/config'
import user from '../../../../Utils/user'
import { Post } from '../../../../Utils/Http'
import InfoGroupCopy from '../../../UIKit/InfoLabelCopy'
import $ from 'jquery'
let _ = require('lodash')
// setTimeout(function () {
//   var phoneWidth = parseInt(window.screen.width)
//   var phoneHeight = parseInt(window.screen.height)
//   var AvailHeight = parseInt(window.screen.availHeight)
//   var AvailWidth = parseInt(window.screen.availWidth)
//   var ClientHeight = parseInt(document.body.clientHeight)
//   var ClientWidth = parseInt(document.body.clientWidth)
//   alert(phoneWidth + '分辨率' + phoneHeight + '。' + AvailHeight + '可用工作区' + AvailWidth + '。' + ClientHeight + '可见区域' + ClientWidth)
// }, 2000)
// let schedule = require('node-schedule')

export default {
  name: 'Face',
  data () {
    return {
      TabclientHeight: '',
      // items: [
      //   { 'title': '楼栋', 'num': '0' },
      //   { 'title': '户数', 'num': '0' },
      //   { 'title': '人口', 'num': '0' },
      //   { 'title': '关爱', 'num': '0' },
      //   { 'title': '关注', 'num': '0' }
      // ],
      // 双合小区
      items: [
        { 'title': '单元', 'num': '0' },
        { 'title': '户数', 'num': '0' },
        { 'title': '人口', 'num': '0' },
        { 'title': '关爱', 'num': '0' },
        { 'title': '关注', 'num': '0' }
      ],
      listInfo: [],
      AlarmModels: [],
      active: 0,
      modelName: '',
      fontPadding: {
        padding: '0.04rem 0rem',
        fontSize: '.36rem'
      },
      Peopleday: [],
      Peopleweek: [],
      Peoplemonth: [],
      buildFristInfoData: '',
      content: {},
      timer: '',
      isLoading2: '',
      pageInfoType: true,
      pass_are_1_info1: true,
      pass_are_1_info2: false,
      pass_line_bottom_info1: true,
      pass_line_bottom_info2: false,
      errInfo: '',
      btnPosition: true,
      rightbtnPosition: true,
      btnClickBefore: false,
      rightbtnClickBefore: false,
      lefthideorshow: true,
      righthideorshow: true,
      dataSumCount: [],
      titleIndex: 0,
      titleName: '',
      ajaxInfo: '',
      type: '1',
      functionList: [],
      txcantchuzhi: true,
      isMask: true,
      wipe: false
    }
  },
  components: {
    InfoGroupCopy
  },
  filters: {
    capitalize (value) {
      if (!value) return '-'
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    splitPhoto (value) {
      let aa = require('../../../../assets/images/photoDefault.png')
      if (!value) value = aa
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created () {
    this.getThreeBuild()
  },
  mounted () {
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let tongxingganzhiChuzhi = this.functionList.find((item) => { return item.functionCode === 'tongxingganzhi_chuzhi' })
    if (tongxingganzhiChuzhi === undefined) {
      this.txcantchuzhi = false
    } else {
      this.txcantchuzhi = true
    }
    let videoMask = this.functionList.find((item) => { return item.functionCode === 'mask_picture' })
    if (videoMask === undefined) {
      this.isMask = true
    } else {
      this.isMask = false
    }
    this.winWidth()
    this.addInfo()
    this.$bus.emit('mapBtnPosition', this.btnPosition)
    this.$bus.on('/event/afterDealAlarm', (e) => {
      this.exchange(this.active, this.content)
      console.log(e)
    })
    this.timer = setInterval(() => {
      this.getPassBuildNum()
      this.getPassHouseNum()
      this.getPassPelpeoNum()
      this.getPassNum()
      this.getPassGuanzhu()
      this.getPassGuanai()
    }, 5000)
  },
  updated () {
    this.TabclientHeight = document.getElementById('public_tab').clientHeight
    window.onresize = function temp () {
      this.TabclientHeight = document.getElementById('public_tab').clientHeight
    }
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
    winWidth: function () {
      let wWidth = document.documentElement.clientWidth
      if (wWidth > 3000) {
        this.fontPadding.padding = '0.1rem 1.18rem'
        this.fontPadding.fontSize = '0.44rem'
      }
    },
    changeFixed (TabclientHeight) {
      this.$refs.scollHeight.style.height = (document.getElementById('public_pass').clientHeight - TabclientHeight) + 'px'
      console.log(document.getElementById('public_pass').clientHeight, TabclientHeight)
    },
    addInfo () {
      this.getPassBuildNum()
      this.getPassHouseNum()
      this.getPassPelpeoNum()
      this.getPassNum()
      this.getOpenDoor()
      this.getPeoplePass()
      this.exchange(0, this.buildFristInfoData[0])
    },
    getThreeBuild () {
      let that = this
      let reqParam = user.getRequestHeader()
      Post({
        async: false,
        url: apiNames['获取报警模型'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading1 = false
          let models = data.models
          if (models) {
            let modelsList = []
            let groupList = Array.from(new Set(models.map(x => x.groupName).filter(s => s && s.trim())))
            for (let i = 0; i < groupList.length; i++) {
              let group = groupList[i]
              let scene = models.filter(x => x.groupName === group)
              modelsList.push({
                groupName: group,
                sceneList: scene
              })
            }
            that.AlarmModels = modelsList
            let array = []
            for (let i = 0; i < that.AlarmModels.length; i++) {
              let single = that.AlarmModels[i].sceneList[0]
              array.push(single)
            }
            that.buildFristInfoData = array
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'pass 获取报警模型')
        }
      })
    },
    getPassBuildNum () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['小区总楼数'] /* '小区进入人数', '小区离开人数', '小区驻留人数', '小区老人数量', '小区儿童数量', '小区关爱数量', '小区重点人员数量' */
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            that.items[0].num = data.datas[0].data - 1
            // if (JSON.parse(window.localStorage.getItem('currentVillageID')).villageName === '虹宝苑') {
            //   that.items[3].num = 17
            // } else {
            //   that.items[3].num = 1904
            // }
            // that.items[4].num = 6
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getPassGuanai () {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['小区关爱数量'] /* '小区进入人数', '小区离开人数', '小区驻留人数', '小区老人数量', '小区儿童数量', '小区关爱数量', '小区重点人员数量' */
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            this.items[3].num = data.datas[0].data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getPassGuanzhu () {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['小区重点人员数量'] /* '小区进入人数', '小区离开人数', '小区驻留人数', '小区老人数量', '小区儿童数量', '小区关爱数量', '小区重点人员数量' */
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            this.items[4].num = data.datas[0].data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getPassHouseNum () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['小区总住户'] /* '小区进入人数', '小区离开人数', '小区驻留人数', '小区老人数量', '小区儿童数量', '小区关爱数量', '小区重点人员数量' */
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            that.items[1].num = data.datas[0].data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getPassPelpeoNum () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['小区总人数'] /* '小区进入人数', '小区离开人数', '小区驻留人数', '小区老人数量', '小区儿童数量', '小区关爱数量', '小区重点人员数量' */
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            that.items[2].num = data.datas[0].data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getPassNum () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['通行人数次数感知当日']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.datas.length > 0) {
            let num1 = JSON.parse(data.datas[0].data).passCount
            let num2 = JSON.parse(data.datas[0].data).passPeopleCount
            let barData = [{
              title: '通行人员',
              num: num2
            },
            {
              title: '通行次数',
              num: num1
            }]
            let sortedObjKeys = barData.sort(function (a, b) {
              return a.num < b.num
            })
            let datale = []
            let datale2 = []
            for (let i = 0; i < sortedObjKeys.length; i++) {
              datale.push(sortedObjKeys[i].title)
              datale2.push(sortedObjKeys[i].num)
            }
            let data3 = []
            let data1Max = Math.max.apply(Math, datale2)
            for (let i = 0; i < datale2.length; i++) {
              data3.push(data1Max)
            }
            let pass1 = that.$refs.pass_bar_1
            if (that.pageInfoType === true) {
              pass1.option.yAxis[0].data = datale
              pass1.option.series[0].data = datale2
              // pass1.option.series[1].data = data3
              pass1.refresh()
            }
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getOpenDoor () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['开门方式感知本周']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // console.log(JSON.parse(data.datas[0].data))
          if (data.datas) {
            let list = JSON.parse(data.datas[0].data)
            if (list.length > 0) {
              that.pass_are_1_info1 = true
              that.pass_are_1_info2 = false
            } else {
              that.pass_are_1_info2 = true
              that.pass_are_1_info1 = false
            }
            let obj = []
            for (let i = 0; i < list.length; i++) {
              obj.push({
                name: list[i].typeName.replace('开门', ''),
                value: list[i].count
              })
            }
            // let num2 = JSON.parse(data.datas[0].data)
            let pass2 = that.$refs.pass_are_1
            if (that.pageInfoType === true) {
              // pass1.option.series[1].data = data3
              pass2.option.series[0].data = obj
              pass2.refresh()
              // pass1.option.yAxis[0].data = datale
            }
          } else {
            that.pass_are_1_info2 = true
            that.pass_are_1_info1 = false
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getPeoplePass () {
      let that = this
      let pathsName = ['楼栋人员通行感知当日', '楼栋人员通行感知本周', '楼栋人员通行感知本月']
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = pathsName
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.datas) {
            let dataSumAll = data.datas
            that.dataSumCount[0] = dataSumAll.filter(item => item.path === '楼栋人员通行感知当日')
            that.dataSumCount[1] = dataSumAll.filter(item => item.path === '楼栋人员通行感知本周')
            that.dataSumCount[2] = dataSumAll.filter(item => item.path === '楼栋人员通行感知本月')
            that.getPeoplePassChange()
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getPeoplePassChange (msg) {
      let that = this
      let num = 0
      if (!msg) {
        num = 0
      } else {
        num = msg[1]
      }
      let dataSum = JSON.parse(that.dataSumCount[num][0].data)
      // 通行次数
      let passCount = dataSum.passCount
      // 通行人次
      let passPeopleCount = dataSum.passPeopleCount
      if (passCount.length === 0 && passPeopleCount.length === 0) {
        that.pass_line_bottom_info2 = true
        that.pass_line_bottom_info1 = false
      } else {
        that.pass_line_bottom_info1 = true
        that.pass_line_bottom_info2 = false
        passCount = passCount.sort(function (a, b) {
          return b.passCount - a.passCount
        })
        passCount = _.chunk(passCount, 5)[0]
        let strangerCount = []
        if (passCount) {
          for (let i = 0; i < passCount.length; i++) {
            for (let j = 0; j < passPeopleCount.length; j++) {
              if (passCount[i].buildingNo === passPeopleCount[j].buildingNo) {
                strangerCount.push(passPeopleCount[j])
              }
            }
          }
        }
        let dataX = []
        let ser0 = []
        let ser1 = []
        if (passCount) {
          for (let i = 0; i < passCount.length; i++) {
            dataX.push('楼栋' + passCount[i].buildingNo)
            ser0.push(passCount[i].passCount)
            if (strangerCount[i]) {
              ser1.push(strangerCount[i].passPeopleCount)
            } else {
              ser1.push(0)
            }
          }
        }
        let op3 = that.$refs.pass_line_bottom
        if (that.pageInfoType === true) {
          op3.option.yAxis.data = dataX
          op3.option.series[0].data = ser0
          op3.option.series[1].data = ser1
          op3.refresh()
        }
      }
    },
    tabChoose (index) {
      console.log(index)
      if (index) {
        this.titleIndex = index
      } else {
        this.titleIndex = 0
      }
      this.exchange(0, this.buildFristInfoData[index])
      this.listInfo = []
      this.active = 0
    },
    exchange (index, item) {
      this.active = index
      this.content = item
      let that = this
      console.log(that.ajaxInfo, 'this')
      if (that.ajaxInfo) {
        that.ajaxInfo.abort()
      }
      that.isLoading2 = true
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      let model = item.modelID
      that.titleName = model
      reqParam.modelIDs = [model]
      that.ajaxInfo = $.ajax({
        async: true,
        type: 'post',
        url: apiNames['获取报警列表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading2 = false
          that.listInfo = []
          if (data.alarms) {
            that.errInfo = ''
            let alarms = data.alarms
            // for (let i = 0; i < alarms.length; i++) {
            //   alarms[i].getName = item.modelID
            // }
            for (let i = 0; i < alarms.length; i++) {
              // if (alarms[i].alarmPeople && that.titleName === alarms[i].getName) {
              //   that.isLoading2 = false
              //   that.listInfo.push(alarms[i])
              // }
              if (alarms[i].alarmPeople) {
                that.listInfo.push(alarms[i])
              }
            }
            if (that.listInfo.length === 0) {
              that.errInfo = '暂无数据'
            }
            console.log(that.listInfo, '000-0-0-')
          } else {
            that.errInfo = '没有相关记录'
          }
        },
        error: function (err) {
          console.log(err)
          that.listInfo = []
          that.isLoading2 = false
          that.errInfo = '请求超时'
        }
      })
    },
    showpopup (e) {
      if (this.txcantchuzhi) {
        e.modelName = this.modelName
        let path = window.param.currentRouter.path
        window.pop.show({
          level: 1,
          component: getRealTimePointComponent(path),
          param: {
            level: 1,
            e: e
          }
        })
      } else {
        this.$message.error('无权限处置，请联系管理员开通权限')
      }
    }
  },
  watch: {
    TabclientHeight () {
      this.changeFixed(this.TabclientHeight)
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    this.pageInfoType = false
    clearInterval(this.timer)
    next()
  }
}
</script>

<style scoped>
  .cheliang{height:100%;display:grid;grid-template-rows:4.4rem 1fr;box-sizing:border-box;padding-bottom:1px;}
.noInfo {color:#fff;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%)}
.pass {position: relative;height: 100%;}
  .content {/* position: relative; position: absolute; */ display: grid; grid-template-columns: 7rem 1fr 7rem; padding: 0 5px; box-sizing: border-box; grid-column-gap: 10px; }
  .happy-scroll_1 { height: auto; box-sizing: border-box; }
  .right_main .tab_div ul {width: 100%; padding: 0 0.2rem; box-sizing: border-box; margin: .15rem auto 0 auto; color: #ffffff; }
  .right_main .tab_div ul li {width: 100%; margin-bottom: 0.2rem; font-size: 0.32rem; }
  .right_main .tab_div ul li .li_title {font-size: 0.28rem; padding-left: 0.44rem; box-sizing: border-box; line-height: 0.38rem; position: relative; }
  .right_main .tab_div ul li .li_title::before {content: ''; width: 1px; height: 0.24rem; position: absolute; left: 0.24rem; top: 50%; transform: translateY(-50%); background: red; }
  .right_main .tab_div ul li div {width: 100%; height: 0.8rem; line-height: 0.8rem; background: url(../../../../assets/images/border/left-2.svg) no-repeat left center, url(../../../../assets/images/border/right-2.svg) no-repeat right center; background-size: 11px 100%; box-sizing: border-box; padding: 0 0.18rem; cursor: pointer; }
  .right_main .tab_div ul li div.hov {background: url(../../../../assets/images/border/left-m.svg) no-repeat left center, url(../../../../assets/images/border/right-m.svg) no-repeat right center; background-size: 0.22rem 100%; }
  .right_main .tab_div ul li div p {box-sizing: border-box; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; background: #01526fde; }
  .right_main .tab_div ul li div.hov p {background: #00eaffc9; font-weight: bold; }
  .right_main .tab_div ul li div p span {display: inline-block; margin: 0 0.06rem 0 0.16rem; width: 5px; height: 5px; background: red; transform: rotate(-45deg) translateY(-4px); -ms-transform: rotate(-45deg) translateY(-4px); /* IE 9 */ -moz-transform: rotate(-45deg) translateY(-4px); /* Firefox */ -webkit-transform: rotate(-45deg) translateY(-4px); /* Safari 和 Chrome */ -o-transform: rotate(-45deg) translateY(-4px); /* Opera */ }
  .right_ul {box-sizing: border-box; width: 100%; margin: 0px auto 20px auto; }
  .right_ul li {overflow: hidden; margin-bottom: 20px; }
  .right_ul li > div {float: left; width: 65%; }
  .right_ul li .div_img {width: 1.7rem; height: 2rem; margin-right: 5px; }
  .right_ul li .div_img img {width: 100%; height: 100%; }
  .div_content {font-size: 0.28rem; }
  .div_content p:nth-of-type(1) {-webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; padding-left: 10px; }
  .div_content p:nth-of-type(1) span.type1 {display: inline-block; width: 1.52rem; height: 0.4rem; text-align: center; line-height: 0.4rem; background: #348bd5; background: linear-gradient(45deg, transparent 5px, #d53434 0); }
  .div_content p:nth-of-type(1) span.type2 {display: inline-block; width: 1.52rem; height: 0.4rem; text-align: center; line-height: 0.4rem; background: #348bd5; background: linear-gradient(45deg, transparent 5px, #34d59d 0); }
  .div_content p:nth-of-type(2) {color: #a4edfc; margin: 8px 0 0 10px; }
  .div_content p:nth-of-type(2) span {margin-right: 10px; }
  .div_content p:nth-of-type(3) {color: #a4edfc; margin: 5px 0 0 10px; }
  .div_content p:nth-of-type(4) span {display: inline-block; padding: 0.02rem 0.12rem; color: #fff; font-size: 0.24rem; border: 1px solid #31f1fe7d; float: right; }
  @media screen and (min-width: 1900px) and (max-width: 3000px){.content {grid-template-columns: 7.8rem 1fr 8.3rem; } }
  @media screen and (min-width: 3001px) {
    .content {grid-template-columns: 14.6rem 1fr 14.6rem; }
    .happy-scroll_1 {width: 14.6rem; }
    .right_main .tab_div ul li div {height: 1rem; line-height: 1rem; font-size: .40rem; }
    .right_main .tab_div ul li {font-size: 0.42rem; }
    .right_ul li .div_img {width: 2.22rem; height: 2.4rem; margin-right: 5px; }
    .div_content {font-size: 0.4rem; }
    .div_content p:nth-of-type(1) span.type1 {height: 0.6rem; line-height: 0.6rem; }
    .div_content p:nth-of-type(1) span.type2 {height: 0.6rem; line-height: 0.6rem; }
    .div_content p:nth-of-type(4) span {padding: 0.04rem 0.22rem; font-size: 0.36rem; }
  }
  @media screen and (min-width: 6001px) {
    .cheliang{grid-template-rows:6.5rem 1fr;}
    .echartTitle_t2{
      top: 1rem;
    }
  }
</style>
