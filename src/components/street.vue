<template>
  <div
    class="street home"
    @click="close">
    <div
      id="map"
      style="position:absolute;"
      :style="{ height: height + 'px', width: width + 'px' , top: top + 'px' ,left: left + 'px' , zIndex : z}"
      v-show="show">
      <mapUI/>
    </div>
    <Map css="position: absolute;left:0;bottom:0;top:0;right:0"/>
    <div style="display: grid;grid-template-rows:max-content 1fr;width:100%;position: absolute;top:0;bottom:0.2rem;overflow:hidden;box-sizing:border-box;">
      <div>
        <div style="height: 100%;box-sizing: border-box;">
          <div class="strTitle">
            <img
              style="width: 100%;height: 100%"
              src="../assets/images/login2Title.png"
              alt="">
            <div class="name">{{ titlename }}</div>
          </div>
          <div
            class="ico_commit"
            style="z-index: 40000">
            <a
              href="#"
              class="ico_button"
              @click="account">
              <box3 css="height:.8rem;width:.8rem;padding:0.035rem 0.02rem;box-sizing: border-box;">
                <span
                  :class="{'active': isClick}"
                  ref="menu_logout_span">
                  <img
                    src="../assets/images/icon/ico-user.svg"
                    ref="menu_logout_img">
                </span>
              </box3>
            </a>
            <ul
              class="account"
              v-if="showAccount">
              <!--<li><i/>账户设置</li>-->
              <li @click="logout"><i/>退出登陆</li>
            </ul>
          </div>
          <div class="dropdown">
            <div
              class="dropdownl"
              @click.stop="allsmallVillage">
              <div
                class="allvillagel"
                ref="allsmallVillage">
                <!-- <span class="point" style="vertical-align: middle;"></span> -->
                <span style="font-size: .44rem;padding-left: .2rem;vertical-align: middle;">所有小区</span>
                <span
                  class="newarrow"
                  :class="optionShow ? 'transdown' : 'transup'"/>
              </div>
              <!--<div style="width: 4.9rem;height: 100px;border: 1px solid red;position: absolute;left: 0;top: 1rem;">-->
              <!--<streetDropDown @changestyle="getSelected" :dropDownItem="dropDownItem"></streetDropDown>-->
              <!--</div>-->
              <strDrop
                :village-name='villageList'
                :nowsel='nowselect'
                v-if="allxiaoqu"
                @changestyle="getSelected"/>
            </div>
            <div
              class="dropdownr"
              @click.stop="alldevices">
              <div
                class="allvillager"
                ref="alldevices">
                <!-- <span class="point" style="vertical-align: middle;"></span> -->
                <span style="font-size: .44rem;padding-left: .2rem;vertical-align: middle;">所有设备类</span>
                <span
                  class="newarrow"
                  :class="optionDevice ? 'transdown' : 'transup'"/>
              </div>
              <!--:leftDevice="leftDevice"-->
              <strtDropdevice
                :items='itemlist'
                :selected-devices='selectedDevices'
                v-if="alldevice"
                @changeDevice="getDeviceSel"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="leftList">
      <happy-scroll
        hide-vertical
        resize
        size="0">
        <div
          @click="linkto(item.villageID)"
          class="sigleftList"
          v-for="(item,index) in arr"
          :key="index">
          <div style="width: 100%;height: 100%">
            <div
              class="list"
              style="position: relative;">
              <div class="listback"/>
              <div style="position: absolute;z-index: 1;margin-top: .32rem;width: 100%;">
                <div class="imgc"><img
                  style="width: 100%;height: 100%"
                  :src="item.villagePic"
                  alt=""></div>
                <div class="rightinner">
                  <div style="width: 100%;height: .78rem;line-height: .78rem;">
                    <span>设备总数：{{ item.devices }}</span>
                    <span style="margin-left: .3rem">驻留人数：{{ item.peoples }}</span>
                  </div>
                  <div style="width: 100%;height: .78rem;line-height: .78rem;">
                    <span>车辆驻留：{{ item.cars }}</span>
                    <span style="margin-left: .3rem">预警总数：{{ item.alarms }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="leftListBot">
              <div class="leftListBotbac"/>
              <div class="leftListBotinner">{{ item.villageName }}</div>
            </div>
          </div>
        </div>
      </happy-scroll>
    </div>
    <div class="rightList">
      <Title
        title="报警数据"
        css="width:100%;"
        style="color:white;"/>
      <div class="title">
        <div
          class="allVilage"
          @click.stop="rigallsmallVillage"
          ref="rigallsmallVillage">
          <span>所有小区</span><span
            class="rightnewarrow"
            :class="smallVillage ? 'transdown' : 'transup'"/>
          <strDropRig
            v-if="allxiaoquRig"
            @changestyleRig="getSelectedRig"/>
        </div>
        <div
          class="alarmSel"
          @click.stop="rigalarm"
          ref="rigalarm">
          <span>预警分类选择</span><span
            class="rightnewarrow"
            :class="alarmSelect ? 'transdown' : 'transup'"/>
          <strtDropdeviceRig
            v-if="alldeviceRig"
            @changeDeviceRig="getDeviceSelRig" />
        </div>
      </div>
      <happy-scroll
        hide-vertical
        resize
        size='0'>
        <strbox
          v-for="(item,index) in options"
          :key="index"
          style="margin-top: .1rem;width: 7.3rem"
          css="box-sizing:border-box;position: relative;width: 7.3rem;height:2.26rem;">
          <div class="somelistscontain">
            <div class="somelistsbac"/>
            <div class="somelistsinner">
              <!--<span v-if="item.alarmLevel === 1" class="alarmState alarmStatered">-->
              <!--一级报警</span>-->
              <!--<span v-if="item.alarmLevel === 2" class="alarmState alarmStateorange">-->
              <!--二级报警</span>-->
              <!--<span v-if="item.alarmLevel === 3" class="alarmState alarmStateyellow">-->
              <!--三级报警</span>-->
              <!--<span v-if="item.alarmLevel === 4" class="alarmState alarmStateblue">-->
              <!--四级报警</span>-->
              <div class="alarmLevelRight"><span
                class="alarmState"
                :style="item.alarmLevelColor">{{ item.alarmLevelName }}</span></div>
              <div style="overflow: hidden;margin-left: .52rem;margin-top: .1rem;height: 100%;">
                <div style="">
                  <div class="rel_waring_con-21">
                    <div class="border_4"><span/><span/><span/><span/></div>
                    <img
                      :src="item.images"
                      alt="">
                  </div>
                </div>
                <!--<div class="decoration"><img src="../assets/images/components/list-decoration.svg"/></div>-->
                <!--<div class="peopleAlarm" style="font-size: .28rem;margin-left: .5rem;float: left;">-->
                <!--<div><span>张亚</span><span style="margin-left: .4rem">35岁</span></div>-->
                <!--<div>XX小区15号301</div>-->
                <!--<div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">纯老,老年人员,老伙伴结对。。。</div>-->
                <!--</div>-->
                <div style="float: left;font-size: .32rem;margin-left: .4rem;width: 60%;">
                  <div
                    class="ellipis"
                    style="font-size: .4rem;margin-top: .06rem;"><span style="color: #b5e1ea;">{{ item.alarmTypeName }}</span></div>
                  <div class="ellipis"><span style="color: #00edff;font-size: .32rem">{{ item.revealTime }}</span></div>
                  <div class="ellipis"><span style="vertical-align: middle;font-size: .36rem;">{{ item | splitName }}</span><!-- <span style="margin-left: 1rem;" class="smallpoint"></span><span style="vertical-align: middle;margin-left: .3rem;">东大门</span> --></div>
                  <div
                    style="font-size: .36rem;"
                    class="ellipis"
                    :title="item.alarmContent">{{ item.alarmContent }}</div>
                </div>
              </div>
            </div>
          </div>
        </strbox>
      </happy-scroll>
    </div>
  </div>
</template>
<style>
  .street .rightList .happy-scroll-container,.street .rightList .happy-scroll{
    width: 7.4rem !important;
  }
</style>
<script>
import Title from './home/public/boxTitle'
import mapUI from '../maps/MapUI'
import { Post } from '../Utils/Http'
import { apiNames, HtmlConfig } from '../config/config.js'
import user from '../Utils/user'
// import $ from 'jquery'
import { delCookie } from '../Utils/Common'

export default {
  data () {
    return {
      itemlist: [],
      villageList: [],
      show: false,
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      z: 0,
      Title: '',
      TitleID: '',
      tipArr: [],
      timeOu: null,
      showAccount: false,
      isClick: false,
      optionShow: false,
      optionDevice: false,
      smallVillage: false,
      alarmSelect: false,
      options: [],
      arr: [],
      arrstay: [],
      arrpeople: [],
      arralarm: [],
      layerColor: [],
      layerStyle: '',
      allxiaoqu: false,
      alldevice: false,
      allxiaoquRig: false,
      alldeviceRig: false,
      titlename: '',
      dropDownItem: [{
        name: '小区1',
        id: '1'
      }, {
        name: '小区2',
        id: '2'
      }, {
        name: '小区3',
        id: '3'
      }],
      villageInfos: [],
      rightDevice: [],
      rightXiaoqu: [],
      nowselect: [],
      selectedDevices: [],
      deviceList: []
      // leftDevice: []
    }
  },
  filters: {
    splitName: function (value) {
      if (value.deviceName) {
        value = value.deviceName
      } else if (value.alarmPeople) {
        value = value.alarmPeople.name
      } else {
        value = value.address
      }
      return value
    }
  },
  components: {
    mapUI,
    Title
  },
  created: function () {
    this.$bus.on('mapLayoutChanged', this.fixMapPosition)
    this.$bus.on('/window/onclick', (args) => {
      if ((args[0].srcElement !== this.$refs.menu_logout_span) && (args[0].srcElement !== this.$refs.menu_logout_img)) {
        this.showAccount = false
        this.isClick = false
      }
    })
  },
  mounted: function () {
    let that = this
    let gConfig = JSON.parse(window.localStorage.getItem('webGlobalConfig'))
    if (gConfig == null) {
      localStorage.removeItem('currentVillageID')
      localStorage.removeItem('currentWebGlobalConfig')
      delCookie('access-token')
      that.$router.push({
        path: '/login'
      })
      return
    }

    try {
      that.Title = gConfig.villageInfos[0].villageName + gConfig.prodcutName
      that.TitleID = gConfig.villageInfos[0].villageID
      that.$bus.emit('/home/webGlobalConfig', {
        config: gConfig
      })
      // callback()
      let infos = gConfig.villageInfos.map(function (item) { return item.villageID })
      that.villageInfos = gConfig.villageInfos
      that.titlename = gConfig.streetName + gConfig.prodcutName
      let _arr = {
        villageName: '',
        villageID: '',
        devices: '0',
        peoples: '0',
        cars: '0',
        alarms: '0',
        villagePic: ''
      }
      for (let i = 0; i < gConfig.villageInfos.length; i++) {
        _arr.villageID = gConfig.villageInfos[i].villageID
        _arr.villagePic = gConfig.villageInfos[i].villagePic
        _arr.villageName = gConfig.villageInfos[i].villageName
        that.arr.push(_arr)
        _arr = {
          villageName: '',
          villageID: '',
          devices: '0',
          peoples: '0',
          cars: '0',
          alarms: '0',
          villagePic: ''
        }
      }
      that.getLeftlist(infos, that.villageInfos)
      that.getstayManNum(infos, that.villageInfos)
      that.getstayCarlist(infos, that.villageInfos)
      that.getalarmlist(infos, that.villageInfos)
      that.addInfo(infos, [])
      that.villageList = gConfig.villageInfos
      that.nowselect = gConfig.villageInfos.map(item => {
        return item.villageID
      })

      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = gConfig.villageInfos.map(item => {
        return item.villageID
      })
      that.getAllDevices(reqParam, that)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    // 左侧所有设备选择
    getDeviceSel (msg) {
      this.selectedDevices = msg
      // this.leftDevice = msg
      this.$bus.emit('/map/layerControl', {village: this.nowselect, devices: this.selectedDevices, isClickable: false})
    },
    // 左侧所有小区选择
    getSelected (msg) {
      this.nowselect = msg
      this.getLeftlist(msg, this.villageInfos)
      let reqParam = user.getRequestHeader()
      if (msg.length > 0) {
        reqParam.villageIDs = msg
        this.itemlist.splice(0, this.itemlist.length)
        for (let i = 0, len = msg.length; i < len; i++) {
          let types = this.deviceList.filter(function (val) {
            return val.villageID === msg[i]
          })
          this.itemlist = this.itemlist.concat(types)
          let obj = {}
          this.itemlist = this.itemlist.reduce(function (item, next) {
            if (next.type.trim() !== 'camera_car' && next.type.trim() !== 'camera_accessFace' &&
                !obj[next.type.trim()]) { obj[next.type.trim()] = true && item.push(next) }
            return item
          }, [])
        }
        this.selectDefaultDevices(this.itemlist)

        this.$bus.emit('/map/layerControl', {village: this.nowselect, devices: this.selectedDevices, isClickable: false})
        // let that = this
        // this.getAllDevices(reqParam, this).then(function (e) {
        //   if (e) {
        //     that.$bus.emit('/map/layerControl', {village: that.nowselect, devices: that.selectedDevices})
        //   }
        // })
      } else {
        this.selectedDevices.splice(0, this.selectedDevices.length)
        this.itemlist.splice(0, this.itemlist.length)
        this.$bus.emit('/map/layerControl', {village: this.nowselect, devices: this.selectedDevices, isClickable: false})
      }
    },
    getAllDevices (reqParam, that) {
      return new Promise(function (resolve, reject) {
        Post({
          async: true,
          url: apiNames['获取设备列表'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            if (data.responseStatus.resultCode === 0) {
              let typeNames = data.deviceList.map(function (val) {
                return { type: val.type.trim(), name: val.typeName.trim(), villageID: val.villageID.trim() }
              })
              let obj = {}
              let types = typeNames.reduce(function (item, next) {
                if (next.type.trim() !== 'camera_car' && next.type.trim() !== 'camera_accessFace' &&
                !obj[next.type.trim()]) { obj[next.type.trim()] = true && item.push(next) }
                return item
              }, [])
              that.itemlist = types
              for (let i = 0, len = reqParam.villageIDs.length; i < len; i++) {
                let deviceByVillage = typeNames.filter(function (val) {
                  return val.villageID === reqParam.villageIDs[i]
                })
                let obj = {}
                let typesInVillage = deviceByVillage.reduce(function (item, next) {
                  if (next.type.trim() !== 'camera_car' && next.type.trim() !== 'camera_accessFace' &&
                !obj[next.type.trim()]) { obj[next.type.trim()] = true && item.push(next) }
                  return item
                }, [])

                that.deviceList = that.deviceList.concat(typesInVillage)
              }

              that.selectedDevices.splice(0, that.selectedDevices.length)
              that.selectDefaultDevices(types)
              resolve(true)
            } else {
              reject(new Error(data.responseStatus.resultCode))
            }
          },
          error: function (err) {
            console.log(JSON.stringify(err) + '获取设备列表')
            reject(err)
          }
        })
      })
    },
    selectDefaultDevices (types) {
      this.selectedDevices.splice(0, this.selectedDevices.length)
      let mDevices = HtmlConfig.modelDevice['street']
      for (let i = 0, len = mDevices.length; i < len; i++) {
        if (mDevices[i] === 'all') { this.selectedDevices = types }

        let dList = types.filter(function (device) {
          return device.type === mDevices[i]
        })
        if (dList !== undefined && dList.length > 0) {
          this.selectedDevices.push(dList[0].type)
        }
      }
    },
    // 右侧所有设备选择
    getDeviceSelRig (msg) {
      this.rightDevice = msg
      if (this.rightXiaoqu.length === this.villageInfos.length || this.rightXiaoqu.length === 0) {
        this.rightXiaoqu = this.villageInfos.map(function (item) { return item.villageID })
      }
      this.addInfo(this.rightXiaoqu, msg)
    },
    // 右侧所有小区选择
    getSelectedRig (msg) {
      this.rightXiaoqu = msg
      this.addInfo(msg, this.rightDevice)
    },
    close () {
      this.allxiaoqu = false
      this.alldevice = false
      this.allxiaoquRig = false
      this.alldeviceRig = false
      this.optionShow = false
      this.optionDevice = false
      this.smallVillage = false
      this.alarmSelect = false
    },
    linkto (villageID) {
      let gConfig = JSON.parse(window.localStorage.getItem('webGlobalConfig'))
      let community = gConfig.villageInfos
      for (let i = 0; i < community.length; i++) {
        if (community[i].villageID === villageID) {
          window.localStorage.setItem('currentVillageID', JSON.stringify(community[i]))
          this.$router.push('/home')
          let mapConfig = gConfig
          mapConfig.villageInfos = []
          mapConfig.villageInfos.push(community[i])
          this.$bus.emit('/home/webGlobalConfig', {
            config: mapConfig
          })
          window.localStorage.setItem('currentWebGlobalConfig', JSON.stringify(mapConfig))
        }
      }
    },
    changeVillageName (id) {
      let villageId = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      let name = ''
      for (let i = 0; i < villageId.length; i++) {
        if (villageId[i].villageID === id) {
          name = villageId[i].villageName
        }
      }
      return name
    },
    allsmallVillage () {
      this.smallVillage = false
      this.allxiaoquRig = false
      this.alarmSelect = false
      this.alldeviceRig = false
      this.optionShow = !this.optionShow
      this.optionDevice = false
      this.alldevice = false
      this.allxiaoqu = !this.allxiaoqu
    },
    alldevices () {
      this.smallVillage = false
      this.allxiaoquRig = false
      this.alarmSelect = false
      this.alldeviceRig = false
      this.optionDevice = !this.optionDevice
      this.alldevice = !this.alldevice
      this.allxiaoqu = false
      this.optionShow = false
    },
    rigallsmallVillage () {
      this.optionDevice = false
      this.alldevice = false
      this.allxiaoqu = false
      this.optionShow = false
      this.smallVillage = !this.smallVillage
      this.allxiaoquRig = !this.allxiaoquRig
      this.alarmSelect = false
      this.alldeviceRig = false
    },
    rigalarm () {
      this.optionDevice = false
      this.alldevice = false
      this.allxiaoqu = false
      this.optionShow = false
      this.alarmSelect = !this.alarmSelect
      this.alldeviceRig = !this.alldeviceRig
      this.smallVillage = false
      this.allxiaoquRig = false
    },
    account () {
      this.showAccount = !this.showAccount
      this.isClick = !this.isClick
    },

    // getData: function () {
    //   let that = this
    //   let VillageID = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
    //   this.$bus.on('/web/event/map/nbdevicealarm', function (a) {
    //     var obj = JSON.parse(a)
    //     if (obj.villageID === VillageID) {
    //       that.tipArr = obj
    //       let s1 = obj.alarmTypeName
    //       let s2 = obj.alarmLevelName
    //       let s3 = obj.alarmTime
    //       let s4 = obj.deviceName
    //       let s5 = obj.address
    //       that.tipOpen(s1, s2, s3, s4, s5)
    //       $('body').on('click', '#tipDetails', function () {
    //         let option = that.tipArr
    //         let path = option.deviceType
    //         Notification.closeAll()
    //         window.pop.close(1)
    //         window.pop.close(2)
    //         window.pop.show({
    //           level: 1,
    //           component: getRealTimePointComponent(path),
    //           param: {
    //             level: 1,
    //             e: option
    //           }
    //         })
    //       })
    //     }
    //   })
    // },
    fixMapPosition: function (args) {
      this.show = args.show
      this.left = args.left
      this.top = args.top
      this.width = args.width
      this.height = args.height
      this.z = args.z
    },
    logout () {
      let reqParam = user.getRequestHeader()
      let that = this
      Post({
        async: true,
        url: apiNames['登出'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          window.localStorage.removeItem('currentVillageID')
          delCookie('access-token')
          that.$router.push({
            path: '/login'
          })
        }
      })
    },
    addInfo (info, rigsel) {
      let that = this
      that.options = []
      let reqParam = user.getRequestHeader()
      // 需要的形参
      reqParam.villageIDs = info
      reqParam.deviceTypes = rigsel
      reqParam.isDeal = 0
      //  右侧实时预警
      Post({
        async: true,
        url: apiNames['获取报警列表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.alarms) {
            for (let i = 0; i < data.alarms.length; i++) {
              if (data.alarms[i].alarmTime) {
                let time = data.alarms[i].alarmTime
                data.alarms[i].revealTime = time.substring(time.indexOf('-') + 1, time.length)
              }
              data.alarms[i].alarmLevelColor = JSON.parse(data.alarms[i].alarmLevelColor)
              if (data.alarms[i].deviceType !== null) {
                switch (data.alarms[i].deviceType.replace(/\s+/g, '')) {
                  case 'camera_face':
                    // iconPath + iconParams + '/'
                    data.alarms[i].images = require('../assets/images/maps/color/online/camera_face.png')
                    break
                  case 'access':
                    data.alarms[i].images = require('../assets/images/maps/color/online/access.png')
                    break
                  case 'manholeCover':
                    data.alarms[i].images = require('../assets/images/maps/color/online/manholeCover.png')
                    break
                  case 'fireCock':
                    data.alarms[i].images = require('../assets/images/maps/color/online/fireCock.png')
                    break
                  case 'smokeDetector':
                    data.alarms[i].images = require('../assets/images/maps/color/online/smokeDetector.png')
                    break
                  case 'geomagnetic':
                    data.alarms[i].images = require('../assets/images/maps/color/online/geomagnetic.png')
                    break
                  case 'fence':
                    data.alarms[i].images = require('../assets/images/maps/color/online/fence_point.png')
                    break
                  case 'charger':
                    data.alarms[i].images = require('../assets/images/maps/color/online/charger.png')
                    break
                  case 'combustibleGas':
                    data.alarms[i].images = require('../assets/images/maps/color/online/combustibleGas.png')
                    break
                  case 'electricArc':
                    data.alarms[i].images = require('../assets/images/maps/color/online/electricArc.png')
                    break
                  case 'electronicPatrol':
                    data.alarms[i].images = require('../assets/images/maps/color/online/electronicPatrol.png')
                    break
                  case 'agedElectricSafety':
                    data.alarms[i].images = require('../assets/images/maps/color/online/agedElectricSafety.png')
                    break
                  case 'agedAlarm':
                    data.alarms[i].images = require('../assets/images/maps/color/online/agedAlarm.png')
                    break
                  default:
                    console.log('小图片缺失')
                }
              } else if (data.alarms[i].alarmPeople) {
                if (data.alarms[i].alarmPeople.pic) {
                  data.alarms[i].images = data.alarms[i].alarmPeople.pic
                } else {
                  data.alarms[i].images = require('../assets/images/photoDefault.png')
                }
              } else {
                data.alarms[i].images = ''
              }
              // switch (data.alarms[i].alarmLevel.toString()){
              //   case '1':
              //     data.alarms[i].layerStyle = that.layerColor[0]
              //     break
              //   case '2':
              //     data.alarms[i].layerStyle = that.layerColor[1]
              //     break
              //   case '3':
              //     data.alarms[i].layerStyle = that.layerColor[2]
              //     break
              //   case '4':
              //     data.alarms[i].layerStyle = that.layerColor[3]
              //     break
              // // }
              // data.alarms[i].deviceType = data.alarms[i].deviceType.replace(/\s+/g, '')
            }
            that.options = data.alarms
            let nowtime = Date.parse(new Date()) / 1000
            that.options = that.options.filter(item => {
              let date = Date.parse(new Date(item.alarmTime)) / 1000
              return nowtime - date > 3600
            })
            console.log(that.options)
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'list 获取报警列表')
        }
      })
    },
    // 小区设备总数
    getLeftlist (info, infos) {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = info
      reqParam.paths = ['小区设备总数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.responseStatus.resultCode === 0) {
            for (let i = 0; i < this.arr.length; i++) {
              for (let j = 0; j < data.datas.length; j++) {
                if (data.datas[j].villageID === this.arr[i].villageID) {
                  this.arr[i].devices = data.datas[j].data
                }
              }
            }
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 小区驻留总数
    getstayManNum (info, infos) {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = info
      reqParam.paths = ['小区驻留人数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.responseStatus.resultCode === 0) {
            for (let i = 0; i < this.arr.length; i++) {
              for (let j = 0; j < data.datas.length; j++) {
                if (data.datas[j].villageID === this.arr[i].villageID) {
                  this.arr[i].peoples = data.datas[j].data
                }
              }
            }
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 车辆驻留
    getstayCarlist (info, infos) {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = info
      reqParam.paths = ['车辆驻留']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.responseStatus.resultCode === 0) {
            for (let i = 0; i < this.arr.length; i++) {
              for (let j = 0; j < data.datas.length; j++) {
                if (data.datas[j].villageID === this.arr[i].villageID) {
                  this.arr[i].cars = data.datas[j].data
                }
              }
            }
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 实时预警总数
    getalarmlist (info, infos) {
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = info
      reqParam.paths = ['实时预警总数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.responseStatus.resultCode === 0) {
            for (let i = 0; i < this.arr.length; i++) {
              for (let j = 0; j < data.datas.length; j++) {
                if (data.datas[j].villageID === this.arr[i].villageID) {
                  this.arr[i].alarms = data.datas[j].data
                }
              }
            }
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
/* eslint-disable */
Array.prototype.distinct = function () {
  var arr = this
  var len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        len--
        j--
      }
    }
  }
  return arr
}
</script>

<style scoped>
.ellipis {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.leftList {
  position: absolute;
  left: .1rem;
  top: 2rem;
  height: 80%;
  z-index: 10000
}
.sigleftList{
  width: 8.4rem;
  height: 3.14rem;
  border: 1px solid #31f1fe;
  margin-top: .2rem;
  cursor: pointer;
}
.leftList .leftListBot {
  width: 100%;
  height: .94rem;
  text-align: center;
  line-height: .94rem;
  position: relative;
}
.leftList .leftListBot .leftListBotbac{
  z-index: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: .3;
  background: #6493e5;
}
.leftList .leftListBot .leftListBotinner{
  z-index: 1;
  color: white;
  width: 100%;
  height: 100%;
  position: absolute;
}
.leftList .list {
  width: 100%;
  height: 2.2rem;
  overflow: hidden;
  /*padding: .32rem 0;*/
}
.leftList .listback{
  background: #192c4d;
  opacity: .8;
  width: 100%;
  height: 2.2rem;
  position: absolute;
  z-index: 0;
}
.leftList .list .imgc {
  padding:0 .54rem;
  float: left;
  width: 1.7rem;
  height: 1.62rem
}
.leftList .list .rightinner{
  float: left;
  color: white;
  font-size: .32rem
}
.rightList {
  width: 7.4rem;
  height: 80%;
  position: absolute;
  right: .1rem;
  top: 2rem;
  z-index: 10000;
  padding-top: .1rem;
}
.rightList .title {
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  font-size: .24rem;
}
.rightList .somelistscontain {
  width: 7.28rem;
  height: 1.84rem;
  position: relative;
}
.rightList .somelistscontain .somelistsbac {
  opacity: 0.8;
  background-color: #192c4d;
  width: 7.26rem;
  height: 2.22rem;
  position: absolute;
  z-index: 0;
  top: .02rem;
}
.rightList .somelistscontain .somelistsinner {
  width: 7.26rem;
  height: 2.22rem;
  position: absolute;
  z-index: 1;
  color: white;
  top: .02rem;
  font-size: .32rem;
}
.rightList .somelistscontain .somelistsinner  .alarmLevelRight {
  position: absolute;
  right: 0;
  top: 0;
}
.rightList .somelistscontain .somelistsinner .alarmState {
  display: inline-block;
  float: right;
  width: 1.5rem;
  height: .45rem;
  line-height: .45rem;
  font-size: .26rem;
  text-align: center;
  position: relative;
}
.rightList .somelistscontain .somelistsinner .alarmState:before{
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent transparent #192c4d #192c4d;
}
.alarmStatered {
  background: linear-gradient(45deg, transparent .1rem, #ff3c3c 0);
  color:#fff;
}
.alarmStateorange {
  background: linear-gradient(45deg, transparent .1rem, #ff9d3c 0);
  color: black;
}
.alarmStateyellow {
  background: linear-gradient(45deg, transparent .1rem, #fff03c 0);
  color: black;
}
.alarmStateblue {
  background: linear-gradient(45deg, transparent .1rem, #3ccaff 0);
  color: black;
}
.rightList .title .allVilage {
  float: left;
  width: 1.9rem;
  height: .5rem;
  border-radius: .04rem;
  background-color: #192c4d;
  text-align: center;
  line-height: .5rem;
  position: relative;
}
.rightList .title .alarmSelect {
  float: left;
  width: 2.16rem;
  height: .5rem;
}
.rightList .title .alarmSel {
  float: left;
  width: 2.6rem;
  height: .5rem;
  border-radius: .04rem;
  background-color: #192c4d;
  text-align: center;
  line-height: .5rem;
  margin-left: .05rem;
  position: relative;
}
.decoration {min-width: .18rem; margin-left: .2rem; float: left;}
.rel_waring_con-21 {float: left; display: inline-grid; position: relative; width: 1.6rem; height: 2.1rem; padding: .04rem .084rem; box-sizing: border-box; background: #0a1e389c;}
.rel_waring_con-21 .border_4 span {width: .05rem; height: .05rem; position: absolute; border: 1px solid #0ed5cd; }
.rel_waring_con-21 .border_4 span:nth-of-type(1) {left: 0; top: 0; border-right: none; border-bottom: none; }
.rel_waring_con-21 .border_4 span:nth-of-type(2) {left: 0; bottom: 0; border-right: none; border-top: none; }
.rel_waring_con-21 .border_4 span:nth-of-type(3) {right: 0; top: 0; border-left: none; border-bottom: none; }
.rel_waring_con-21 .border_4 span:nth-of-type(4) {right: 0; bottom: 0; border-left: none; border-top: none; }
.rel_waring_con-21 img {width: 1.5rem; margin: auto;position: absolute;left: 0;top: 0;bottom: 0;right: 0; }
.smallpoint {
  display: inline-block;
  width: .1rem;
  height: .1rem;
  border-radius: .05rem;
  background-color: #07ffff;
  vertical-align: middle;
}
.transup{
  transform: rotate(90deg);
}
.transdown{
  transform: rotate(0deg);
}
#starts {
  position: fixed;
  opacity: 0.5;
}
.home {
  width: 100%;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.animate-enter-active,
.animate-leave-active {
  transition: all 0.2s ease;
}
.animate-enter,
.animate-leave-active {
  opacity: 0;
}
.animate-enter {
  transform: translateX(10rem);
}
.animate-leave-active {
  transform: translateX(-10rem);
}

#title {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  color: #fff;
  text-align: center;
  font-family: 'lato', sans-serif;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
}

#title span {
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-2000px);
  }
}
.strTitle{
    z-index: 6;
    color: white;
    position: absolute;
    top: -2.2rem;
    width: 100%;
    height: 4rem
  }
  .strTitle .name{
    width: 100%;
    text-align: center;
    position: absolute;
    top: 2.4rem;
    font-size: .8rem;
    color: #31f1fe
  }
  ul.account{width: 2.5rem;position: absolute;top:1.2rem;right: 0;color:#fff;margin-right: 16px;background-image: linear-gradient(to top, #14a6c3 0%, #3a9ebc 50% , #14a6c3 51%, #3a9ebc 100%);border-radius: 2px;}
  ul.account:after{border: solid transparent;content: '';height: 0;right: 0.2rem;top: -15.7px;position: absolute;width: 0;}
  ul.account:after {border-width: 8px;border-bottom-color: #14a6c3;}
  ul.account>li{line-height: normal;font-size: .28rem;padding: .3rem .35rem;cursor: pointer}
  ul.account>li:hover{background: #226272;border-radius: 2px;}
  ul.account>li>i{width: .4rem;height: .4rem;display: inline-block;margin-right:.24rem;vertical-align: middle;}
  ul.account>li:nth-of-type(1)>i{background: url("../assets/images/icon/ico-setting.svg") no-repeat;}
  ul.account>li:nth-of-type(2)>i{background: url("../assets/images/icon/logout.svg") no-repeat;}
  .dropdown{
    position: absolute;
    top: 30px;
    left: 20px;
    z-index: 50000;
    color: white;
  }
  .dropdown .dropdownl{
    float: left;
    width: 4.6rem;
    height: 1rem;
    background: #192c4d;
    color: white;
    position: relative;
    line-height: 1rem;
    padding-left: .3rem;
  }
  .dropdown .dropdownr{
    float: right;
    width: 4.6rem;
    height: 1rem;
    background: #192c4d;
    color: white;
    position: relative;
    margin-left: .5rem;
    line-height: 1rem;
    padding-left: .3rem;
  }
  .newarrow{
    display:block;
    width:0;
    height:0;
    border-width:4px 4px 0;
    border-style:solid;
    border-color:#31f1fe transparent transparent;/*黄 透明 透明 */
    position:absolute;
    top:45%;
    right:.45rem;
  }
  .rightnewarrow{
    display:block;
    width:0;
    height:0;
    border-width:4px 4px 0;
    border-style:solid;
    border-color:#31f1fe transparent transparent;/*黄 透明 透明 */
    position:absolute;
    top:45%;
    right:.1rem;
  }
  .transup{
    transform: rotate(90deg);
  }
  .transdown{
    transform: rotate(0deg);
  }
  .point{
    width: .16rem;
    height: .16rem;
    background: #a03841;
    border-radius: .08rem;
    display: inline-block;
  }
</style>
