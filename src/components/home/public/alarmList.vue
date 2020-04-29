<template>
  <div
    class="eventList"
    style="position: relative"
    id="alarmTest">
    <!--<Title title="实时预警" css="width:380px;" style="margin: 0 .2rem 0 0;" class="scrollnum"></Title>-->
    <!--<h4 class="alarm_title">实时预警</h4>-->
    <div
      class="alarmET"
      style="">
      <div
        class="echartTitle_t echartTitle_t2"
        style="">
        <p class="echartTitle sliderTilSmall">实时预警</p>
      </div>
    </div>
    <div
      v-if="accordType == 1"
      @click="screenAlarm(conditions)"
      class="choose"><span>{{ classify }}</span></div>
    <div :class="{ 'wipe' : wipe === true && options.length > 6}">
      <happy-scroll
        resize
        size="2"
        class="happy-scroll_1"
        :scroll-top.sync="scrollTop">
        <loading :visible="isLoading1"/>
        <ul
          class="rel_waring"
          id="alarmList"
          style="padding-bottom: 1.1rem;box-sizing: border-box;">
          <li
            @click="showpopup1(mockObj)"
            v-if="false">
            <div class="rel_waring_top">
              <p
                :style="mockObj.layerStyle"
                class="textSamll">{{ mockObj.alarmLevelName }}</p>
            </div>
            <Box3 :is-flash="mockObj.flash">
              <div class="rel_waring_con">
                <div class="rel_waring_con-2">
                  <div
                    class="rel_waring_con-21">
                    <div class="border_4"><span/><span/><span/><span/></div>
                    <img
                      :src="mockObj.images"
                      alt=""
                      :class="[{'iconPic': mockObj.alarmType !== 'pass'}, {'testDiv': mockObj.alarmType === 'pass' && mockObj.fakeImg === true && isMask === true}]">
                  </div>
                  <div class="rel_waring_con-22">
                    <p>{{ mockObj.alarmTypeName }}</p>
                    <p>{{ mockObj.revealTime }}</p>
                    <p
                      class="point textCon"
                      :title="mockObj | splitName">{{ mockObj | splitName }}</p>
                    <p
                      class="textCon"
                     >{{ mockObj.alarmContent }}</p>
                  </div>
                </div>
              </div>
            </Box3>
            <a
              @click.stop="locateMap(mockObj)"
              class="click-map"
              v-show="mockObj.location"><img src="../../../assets/images/position.svg" ></a>
          </li>
          <li
            v-for="(option,index) in options"
            :key="index"
            @click="showpopup(option)"
            v-if="option.isDealShow === 0">
            <div class="rel_waring_top">
              <p
                :style="option.layerStyle"
                class="textSamll">{{ option.alarmLevelName }}</p>
            </div>
            <Box3 :is-flash="option.flash">
              <div class="rel_waring_con">
                <div class="rel_waring_con-2">
                  <div
                    class="rel_waring_con-21">
                    <div class="border_4"><span/><span/><span/><span/></div>
                    <img
                      :src="option.images"
                      alt=""
                      :class="[{'iconPic': option.alarmType !== 'pass'}, {'testDiv': option.alarmType === 'pass' && option.fakeImg === true && isMask === true}]">
                  </div>
                  <div class="rel_waring_con-22">
                    <p>{{ option.alarmTypeName }}</p>
                    <p>{{ option.revealTime }}</p>
                    <p
                      class="point textCon"
                      :title="option | splitName">{{ option | splitName }}</p>
                    <p
                      class="textCon"
                      :title="option.deviceID !== null && option.deviceID !== '' ? option.installAdd : option.alarmContent">{{ option.deviceID !== null && option.deviceID !== '' ? option.installAdd : option.alarmContent }}</p>
                  </div>
                </div>
              </div>
            </Box3>
            <a
              @click.stop="locateMap(option)"
              class="click-map"
              v-show="option.location"><img src="../../../assets/images/position.svg" ></a>
          </li>
          <p
            style="text-align: center;padding-top: .5rem"
            class="sliderTilSmall">{{ noInfo }}</p>
          <div
            class="lazyload"
            v-show="isLoading"> <span/> <span/> <span/> <span/> <span/> </div>
        </ul>
      </happy-scroll>
    </div>
  </div>
</template>

<script>
import user from '../../../Utils/user'
// import Title from './boxTitle'
import {apiNames, getRealTimePointComponent, getMapPointComponent} from '../../../config/config'
import {Post} from '../../../Utils/Http'
import '../../../../static/css/supplement.css'
export default {
  name: 'List',
  // props: ['filter', 'modelType', 'types', 'accordType', 'isProcess'],
  props: {
    filter: {
      type: [Array],
      default: () => {
        return []
      }
    },
    modelType: {
      type: [Array],
      default: () => {
        return []
      }
    },
    types: {
      type: [Array],
      default: () => {
        return []
      }
    },
    accordType: {
      type: [String],
      default: ''
    },
    isProcess: {
      type: [Number],
      default: 0
    }
  },
  data () {
    return {
      typeList: [],
      mockObjShow: false,  // 金华需要的
      mockObj: {
        isDealShow: 0,
        alarmID: "93e619d0735011eab4ec93168c1d22cd",
        deviceID: "4fb27a814a8b44abbcaac87e98461cc7",
        deviceName: "摄像机",
        deviceType: "highPop",
        alarmType: "highPop",
        alarmTypeName: "高空抛物报警",
        alarmLevel: 1,
        alarmLevelName: "一级报警",
        alarmCount: 2,
        alarmState: 0,
        isDeal: 0,
        alarmTime: "2020-03-31 20:20:20",
        buildingID: null,
        buildingNo: "",
        houseID: null,
        houseNo: "",
        floor: "",
        images: require('../../../assets/images/highpic.png'),
        address: "欧景名城22号楼北",
        alarmContent: "欧景名城22号楼北",
        currentFlowNo: 2,
        longitude: 119.635638,
        latitude: 29.084084,
        installAdd: null,
        alarmLevelColor: "{'color':'#ffffff','background':'#FF3C3C'}",
        villageID: "fd5876a0650011eab19945a7fac1ea66",
        villageName: "欧景名城"
      },
      options: [],
      layerStyle: '',
      layerColor: [
        {color: '#ffffff', background: '#FF3C3C'},
        {color: '#000000', background: '#FFF03C'},
        {color: '#000000', background: '#3CCAFF'},
        {color: '#000000', background: '#FF9D3C'}
      ],
      classify: '预警分类选择',
      conditions: '',
      fakeInfo: false,
      modelTypeInfo: this.modelType,
      filterInfo: this.filter,
      typeInfo: this.types,
      isLoading1: '',
      noInfo: '',
      pagenum: 0,
      lazy: true,
      lazyAddinfo: false,
      directory: true,
      scrollTop: 0,
      isLoading: false,
      noDataLazy: true,
      functionList: [],
      yjcantchuzhi: true,
      xfcantchuzhi: true,
      rlcantchuzhi: true,
      clcantchuzhi: true,
      txcantchuzhi: true,
      firstFun: false,
      isMask: true,
      wipe: false
    }
  },
  filters: {
    splitName: function (value) {
      if (value.deviceName) {
        value = value.deviceName
      } else if (value.alarmPeople) {
        value = value.alarmPeople.name
      } else if (value.parkingName) {
        value = value.parkingName
      } else {
        value = value.address
      }
      return value
    }
  },
  created () {
    // 预警感知需要保存状态
    if (this.$route.path === '/home/sensor/warning') {
      this.filterInfo = JSON.parse(window.localStorage.getItem('screenChoose')).fils
      this.modelTypeInfo = JSON.parse(window.localStorage.getItem('screenChoose')).models
    }
  },
  mounted () {
    if (this.$route.path === '/home/sensor/warning') {
      this.mockObjShow = true
    } else {
      this.mockObjShow = false
    }
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let yujingganzhiChuzhi = this.functionList.find((item) => { return item.functionCode === 'yujingganzhi_chuzhi' })
    let xiaofangganzhiChuzhi = this.functionList.find((item) => { return item.functionCode === 'xiaofangganzhi_chuzhi' })
    let renlianganzhiChuzhi = this.functionList.find((item) => { return item.functionCode === 'renlianganzhi_chuzhi' })
    let cheliangganzhiChuzhi = this.functionList.find((item) => { return item.functionCode === 'cheliangganzhi_chuzhi' })
    let tongxingganzhiChuzhi = this.functionList.find((item) => { return item.functionCode === 'tongxingganzhi_chuzhi' })
    if (yujingganzhiChuzhi === undefined) {
      this.yjcantchuzhi = false
    } else {
      this.yjcantchuzhi = true
    }
    if (xiaofangganzhiChuzhi === undefined) {
      this.xfcantchuzhi = false
    } else {
      this.xfcantchuzhi = true
    }
    if (renlianganzhiChuzhi === undefined) {
      this.rlcantchuzhi = false
    } else {
      this.rlcantchuzhi = true
    }
    if (cheliangganzhiChuzhi === undefined) {
      this.clcantchuzhi = false
    } else {
      this.clcantchuzhi = true
    }
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
    // let entry = JSON.parse(window.localStorage.getItem('screenList')).models
    let addFirst = window.localStorage.getItem('firsrInfo')
    if (addFirst) {
      this.addInfo()
      // if (entry.length > 0) { setTimeout(() => { this.addInfo() }, 200) }
    } else {
      this.addInfoFirst()
      window.localStorage.firsrInfo = 0
    }
    this.$bus.on('/web/event/map/nbdevicealarm', (a) => {
      this.mqttReq(a)
    })
    this.$bus.on('/event/afterDealAlarm', (e) => {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].alarmID === e) {
          this.options[i].isDeal = 1
          if (this.isProcess === 0) {
            this.options[i].isDealShow = 1
          }
        }
      }
    })
    this.$bus.on('/event/changeConditions', (e) => {
      this.modelTypeInfo = e.models
      this.filterInfo = e.fils
      // 区别懒加载
      this.lazy = true
      this.pagenum = 0
      this.isLoading = false
      this.addInfo()
    })
    this.$bus.on('/event/alarmTypeList', (e) => {
      this.conditions = e
    })
    // 判断是否为田林十三村且为face页面
    let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
    if (villageIDs === '0c7af3bd69054a87a27c3548470961c2' && this.filterInfo[0] === 'face') {
      this.fakeInfo = true
    } else {
      this.fakeInfo = false
    }
  },
  methods: {
    addInfoFirst () {
      let that = this
      that.firstFun = true
      if (this.directory) that.options = [] /* 判断当前是否在懒加载 */
      // 需要的形参
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [villageIDs]
      reqParam.modelIDs = null
      reqParam.alarmTypes = null
      reqParam.isDeal = this.isProcess
      reqParam.pageNum = this.pagenum + 1
      reqParam.pageSize = 15
      // 区别懒加载
      that.lazyAddinfo = false
      if (that.lazy) that.isLoading1 = true
      setTimeout(() => {
        that.isLoading1 = false
        if ((that.options.length === 0) && (this.noInfo.length === 0)) that.noInfo = '请求超时'
      }, 8000)
      //  右侧实时预警
      console.log(JSON.stringify(reqParam) + 'alarmlist')
      Post({
        async: true,
        url: apiNames['获取报警列表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading1 = false
          if (data.alarms) {
            that.noInfo = ''
            // 区别懒加载
            that.lazyAddinfo = true
            that.directory = true
            that.pagenum = that.pagenum + 1
            for (let i = 0; i < data.alarms.length; i++) {
              if (data.alarms[i].alarmTime) {
                let time = data.alarms[i].alarmTime
                data.alarms[i].revealTime = time.substring(time.indexOf('-') + 1, time.length)
              }
              let deviceType = data.alarms[i].deviceType
              if (deviceType) {
                switch (data.alarms[i].deviceType.replace(/\s+/g, '')) {
                  case 'camera_face':
                    // iconPath + iconParams + '/'
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/camera_face.png')
                    break
                  case 'access':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/access.png')
                    break
                  case 'manholeCover':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/manholeCover.png')
                    break
                  case 'fireCock':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/fireCock.png')
                    break
                  case 'smokeDetector':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/smokeDetector.png')
                    break
                  case 'geomagnetic':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/geomagnetic.png')
                    break
                  case 'fence':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/fence_point.png')
                    break
                  case 'charger':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/charger.png')
                    break
                  case 'combustibleGas':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/combustibleGas.png')
                    break
                  case 'electricArc':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/electricArc.png')
                    break
                  case 'electronicPatrol':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/electronicPatrol.png')
                    break
                  case 'agedElectricSafety':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/agedElectricSafety.png')
                    break
                  case 'agedAlarm':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/agedAlarm.png')
                    break
                  default:
                    console.log('小图片缺失')
                }
              } else if (data.alarms[i].alarmType) {
                switch (data.alarms[i].alarmType.replace(/\s+/g, '')) {
                  case 'parkingCarExceed':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/camera_car.png')
                    break
                  case 'face':
                    data.alarms[i].images = data.alarms[i].alarmPeople.pic || require('../../../assets/images/maps/color/security.png')
                    break
                  case 'doorOpen':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/access.png')
                    break
                  default:
                    console.log('小图片缺失')
                }
              }
              data.alarms[i].layerStyle = JSON.parse(data.alarms[i].alarmLevelColor)
              data.alarms[i].fakeImg = true
              let pic = data.alarms[i].images
              let peopelPic = data.alarms[i].alarmPeople
              data.alarms[i].location = true
              if (peopelPic) {
                data.alarms[i].location = false
              }
              if (pic.length === 0 && peopelPic) {
                if (peopelPic.pic) {
                  data.alarms[i].images = data.alarms[i].alarmPeople.pic
                } else {
                  data.alarms[i].fakeImg = false
                  data.alarms[i].images = require('../../../assets/images/photoDefault.png')
                }
              } else if ((pic.length === 0) && !peopelPic) {
                data.alarms[i].fakeImg = false
                data.alarms[i].images = require('../../../assets/images/photoDefault.png')
              }
              data.alarms[i].isDealShow = 0
              that.options.push(data.alarms[i])
            }
          } else {
            if (villageIDs === '0c7af3bd69054a87a27c3548470961c2' && that.filterInfo[0] === 'face') {
              that.noInfo = ''
            } else {
              if (that.pagenum === 0) that.noInfo = '无报警数据'
              that.isLoading = false
              that.noDataLazy = false
            }
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'list 获取报警列表')
        }
      })
      // setTimeout(() => { this.test.abort() }, 5000)
    },
    addInfo () {
      this.firstFun = false
      if (this.directory) this.options = [] /* 判断当前是否在懒加载 */
      // 全不选跳过加载
      // if (this.modelTypeInfo && this.filterInfo) {
      //   if (this.modelTypeInfo.length === 0 && this.filterInfo.length === 0) {
      //     that.noInfo = '未选择报警分类'
      //     that.isLoading1 = false
      //     return true
      //   }
      // }
      // 需要的形参
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let entryNameFilsLength = JSON.parse(window.localStorage.getItem('screenList')).fils.length /* 当前感知报警 */
      let entryNameModelsLength = JSON.parse(window.localStorage.getItem('screenList')).models.length /* 当前通行报警 */
      /* 默认全选所有就传值为空 */
      if (this.modelTypeInfo && this.filterInfo) {
        if ((entryNameModelsLength === this.modelTypeInfo.filter((s) => s && s.trim()).length) && (entryNameFilsLength === this.filterInfo.filter((s) => s && s.trim()).length)) {
          this.modelTypeInfo = null
          this.typeInfo = null
          this.filterInfo = null
        }
      }
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [villageIDs]
      reqParam.modelIDs = this.modelTypeInfo
      reqParam.alarmTypes = this.typeInfo || this.filterInfo
      console.log(this.typeInfo, this.filterInfo, reqParam.alarmTypes)
      // reqParam.deviceTypes = this.filterInfo
      reqParam.isDeal = this.isProcess
      reqParam.pageNum = this.pagenum + 1
      reqParam.pageSize = 15
      // 区别懒加载
      this.lazyAddinfo = false
      if (this.lazy) this.isLoading1 = true
      setTimeout(() => {
        this.isLoading1 = false
        if ((this.options.length === 0) && (this.noInfo.length === 0)) {
          this.noInfo = '无报警数据'
        }
      }, 8000)
      //  右侧实时预警
      console.log(JSON.stringify(reqParam) + 'alarmlist')
      Post({
        async: true,
        url: apiNames['获取报警列表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.isLoading1 = false
          if (data.alarms) {
            this.noInfo = ''
            // 区别懒加载
            this.lazyAddinfo = true
            this.directory = true
            this.pagenum = this.pagenum + 1
            for (let i = 0; i < data.alarms.length; i++) {
              if (data.alarms[i].alarmTime) {
                let time = data.alarms[i].alarmTime
                data.alarms[i].revealTime = time.substring(time.indexOf('-') + 1, time.length)
              }
              let deviceType = data.alarms[i].deviceType
              if (deviceType) {
                switch (data.alarms[i].deviceType.replace(/\s+/g, '')) {
                  case 'camera_face':
                    // iconPath + iconParams + '/'
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/camera_face.png')
                    break
                  case 'access':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/access.png')
                    break
                  case 'manholeCover':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/manholeCover.png')
                    break
                  case 'fireCock':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/fireCock.png')
                    break
                  case 'smokeDetector':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/smokeDetector.png')
                    break
                  case 'geomagnetic':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/geomagnetic.png')
                    break
                  case 'fence':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/fence_point.png')
                    break
                  case 'charger':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/charger.png')
                    break
                  case 'combustibleGas':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/combustibleGas.png')
                    break
                  case 'electricArc':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/electricArc.png')
                    break
                  case 'electronicPatrol':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/electronicPatrol.png')
                    break
                  case 'agedElectricSafety':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/agedElectricSafety.png')
                    break
                  case 'agedAlarm':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/agedAlarm.png')
                    break
                  default:
                    console.log('小图片缺失')
                }
              } else if (data.alarms[i].alarmType) {
                switch (data.alarms[i].alarmType.replace(/\s+/g, '')) {
                  case 'parkingCarExceed':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/camera_car.png')
                    break
                  case 'face':
                    data.alarms[i].images = data.alarms[i].alarmPeople.pic || require('../../../assets/images/maps/color/security.png')
                    break
                  case 'doorOpen':
                    data.alarms[i].images = require('../../../assets/images/maps/color/online/access.png')
                    break
                  default:
                    console.log('小图片缺失')
                }
              }
              data.alarms[i].layerStyle = JSON.parse(data.alarms[i].alarmLevelColor)
              data.alarms[i].fakeImg = true
              let pic = data.alarms[i].images
              let peopelPic = data.alarms[i].alarmPeople
              data.alarms[i].location = true
              if (peopelPic) {
                data.alarms[i].location = false
              }
              if (pic.length === 0 && peopelPic) {
                if (peopelPic.pic) {
                  data.alarms[i].images = data.alarms[i].alarmPeople.pic
                } else {
                  data.alarms[i].fakeImg = false
                  data.alarms[i].images = require('../../../assets/images/photoDefault.png')
                }
              } else if ((pic.length === 0) && !peopelPic) {
                data.alarms[i].fakeImg = false
                data.alarms[i].images = require('../../../assets/images/photoDefault.png')
              }
              data.alarms[i].isDealShow = 0
              // that.options.unshift(data.alarms[i])
              this.options.push(data.alarms[i])
            }
            // that.options = data.alarms
            console.log(this.filterInfo, 'xsxsxsxsxsxs')
            if (this.filterInfo) this.options = this.options.filter(x => this.filterInfo.filter(y => y === x.alarmType).length > 0)
            console.log(this.options, 'ppp0')
          } else {
            if (villageIDs === '0c7af3bd69054a87a27c3548470961c2' && this.filterInfo[0] === 'face') {
              this.noInfo = ''
            } else {
              if (this.pagenum === 0) this.noInfo = '无报警数据'
              this.isLoading = false
              this.noDataLazy = false
            }
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err) + 'list 获取报警列表')
        }
      })
      // setTimeout(() => { this.test.abort() }, 5000)
    },
    mqttReq (a) {
      let that = this
      let obj = JSON.parse(a)
      let VillageID = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      if (obj.deviceType) obj.deviceType = obj.deviceType.replace(/\s+/g, '')
      if (obj.villageID === VillageID) {
        if (obj.alarmTime) {
          let time = obj.alarmTime
          obj.revealTime = time.substring(time.indexOf('-') + 1, time.length)
        }
        if (obj.deviceType) {
          switch (obj.deviceType.replace(/\s+/g, '')) {
            case 'camera_face':
              obj.images = require('../../../assets/images/maps/color/online/camera_face.png')
              break
            case 'access':
              obj.images = require('../../../assets/images/maps/color/online/access.png')
              break
            case 'manholeCover':
              obj.images = require('../../../assets/images/maps/color/online/manholeCover.png')
              break
            case 'fireCock':
              obj.images = require('../../../assets/images/maps/color/online/fireCock.png')
              break
            case 'smokeDetector':
              obj.images = require('../../../assets/images/maps/color/online/smokeDetector.png')
              break
            case 'geomagnetic':
              obj.images = require('../../../assets/images/maps/color/online/geomagnetic.png')
              break
            case 'fence':
              obj.images = require('../../../assets/images/maps/color/online/fence_point.png')
              break
            case 'charger':
              obj.images = require('../../../assets/images/maps/color/online/charger.png')
              break
            case 'combustibleGas':
              obj.images = require('../../../assets/images/maps/color/online/combustibleGas.png')
              break
            case 'electricArc':
              obj.images = require('../../../assets/images/maps/color/online/electricArc.png')
              break
            case 'electronicPatrol':
              obj.images = require('../../../assets/images/maps/color/online/electronicPatrol.png')
              break
            case 'agedElectricSafety':
              obj.images = require('../../../assets/images/maps/color/online/agedElectricSafety.png')
              break
            case 'agedAlarm':
              obj.images = require('../../../assets/images/maps/color/online/agedAlarm.png')
              break
            default:
              console.log('小图片缺失 + 实时')
          }
        } else if (obj.alarmType) {
          switch (obj.alarmType.replace(/\s+/g, '')) {
            case 'parkingCarExceed':
              obj.images = require('../../../assets/images/maps/color/online/camera_car.png')
              break
            case 'face':
              obj.images = require('../../../assets/images/maps/color/security.png')
              break
            case 'doorOpen':
              obj.images = require('../../../assets/images/maps/color/online/access.png')
              break
            default:
              console.log('小图片缺失')
          }
        }
        switch (obj.alarmLevel.toString()) {
          case '1':
            obj.layerStyle = that.layerColor[0]
            break
          case '2':
            obj.layerStyle = that.layerColor[1]
            break
          case '3':
            obj.layerStyle = that.layerColor[2]
            break
          case '4':
            obj.layerStyle = that.layerColor[3]
            break
        }
        if (obj.alarmLevelColor) obj.layerStyle = JSON.parse(obj.alarmLevelColor)
        obj.fakeImg = true
        let pic = obj.images
        let peopelPic = obj.alarmPeople
        obj.location = true
        if (peopelPic) {
          obj.location = false
        }
        if (pic.length === 0 && peopelPic) {
          if (peopelPic.pic) {
            obj.images = obj.alarms.alarmPeople.pic
          } else {
            obj.fakeImg = false
            obj.images = require('../../../assets/images/photoDefault.png')
          }
        } else if ((pic.length === 0) && !peopelPic) {
          obj.fakeImg = false
          obj.images = require('../../../assets/images/photoDefault.png')
        }
        obj.isDealShow = obj.isDeal
        obj.flash = true
        // if (that.filterInfo) obj = that.filterInfo.filter(y => y === obj.alarmType).length > 0
        // console.log(that.filterInfo, '00---00')
        // that.options.unshift(obj)
        if (that.filterInfo === null) {
          that.options.unshift(obj)
        } else {
          let objInfo = that.filterInfo.filter(y => y === obj.alarmType).length > 0
          if (objInfo === true) {
            that.options.unshift(obj)
          }
        }
        that.noInfo = ''
        setTimeout(function () {
          obj.flash = false
        }, 300000)
        console.log(a + 'mqtt信息显示')
      }
    },
    locateMap (option) {
      this.$bus.emit('/map/locate/deviceID', {
        deviceID: option.deviceID,
        isShowLayer: true,
        param: option
      })
    },
    screenAlarm (conditions) {
      if (this.yjcantchuzhi) {
        window.pop.show({
          level: 1,
          component: () => import('../../CommonUI/dialog/screenAlarm'),
          param: {
            level: 1,
            e: conditions
          }
        })
      } else {
        this.$message.error('无权限处置，请联系管理员开通权限')
      }
    },
    showpopup1 (option) {
      window.pop.show({
        level: 1,
        component: getRealTimePointComponent('highPop'),
        param: {
          level: 1,
          e: option
        }
      })
    },
    showpopup (option) {
      option.flash = false
      if (this.$route.path === '/home/sensor/warning') {
        if (this.yjcantchuzhi) {
          let path = ''
          if (option.deviceType) { path = option.deviceType } else { path = option.alarmType }
          window.pop.show({
            level: 1,
            component: getRealTimePointComponent(path),
            param: {
              level: 1,
              e: option
            }
          })
          if (option.isdeal === 0 && option.alarmState === 4) {
            this.$message.error('订单已被接收,无需处理')
          }
        } else {
          this.$message.error('无权限处置，请联系管理员开通权限')
        }
      }
      if (this.$route.path === '/home/sensor/fire') {
        if (this.xfcantchuzhi) {
          let path = ''
          if (option.deviceType) { path = option.deviceType } else { path = option.alarmType }
          window.pop.show({
            level: 1,
            component: getRealTimePointComponent(path),
            param: {
              level: 1,
              e: option
            }
          })
          if (option.isdeal === 0 && option.alarmState === 4) {
            this.$message.error('订单已被接收,无需处理')
          }
        } else {
          this.$message.error('无权限处置，请联系管理员开通权限')
        }
      }
      if (this.$route.path === '/home/sensor/face') {
        if (this.rlcantchuzhi) {
          let path = ''
          if (option.deviceType) { path = option.deviceType } else { path = option.alarmType }
          window.pop.show({
            level: 1,
            component: getRealTimePointComponent(path),
            param: {
              level: 1,
              e: option
            }
          })
          if (option.isdeal === 0 && option.alarmState === 4) {
            this.$message.error('订单已被接收,无需处理')
          }
        } else {
          this.$message.error('无权限处置，请联系管理员开通权限')
        }
      }
      if (this.$route.path === '/home/sensor/car') {
        if (this.clcantchuzhi) {
          let path = ''
          if (option.deviceType) { path = option.deviceType } else { path = option.alarmType }
          window.pop.show({
            level: 1,
            component: getRealTimePointComponent(path),
            param: {
              level: 1,
              e: option
            }
          })
          if (option.isdeal === 0 && option.alarmState === 4) {
            this.$message.error('订单已被接收,无需处理')
          }
        } else {
          this.$message.error('无权限处置，请联系管理员开通权限')
        }
      }
    },
    lowEnough () {
      let pageHeight = Math.max(document.getElementById('alarmList').scrollHeight, document.getElementById('alarmList').offsetHeight)
      let viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementById('alarmList').clientHeight || 0
      let scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.getElementById('alarmList').scrollTop || this.scrollTop || 0
      console.log('滚动高度' + pageHeight + '————' + viewportHeight + '————' + scrollHeight)
      return pageHeight - viewportHeight - scrollHeight < 300
    },
    checkScroll () {
      if (!this.lowEnough()) return false
      if (this.pagenum > 0 && this.noDataLazy) this.isLoading = true
      this.doSomething()
    },
    doSomething () {
      this.lazy = false
      this.directory = false
      // if (this.lazyAddinfo) this.addInfo()
      if (this.lazyAddinfo) {
        if (this.firstFun === false) {
          this.addInfo()
        } else {
          this.addInfoFirst()
        }
      }
    }
  },
  watch: {
    scrollTop (newval, oldval) {
      this.checkScroll()
    },
    $route (newval, oldval) {
      console.log(newval)
      if (newval === '/home/sensor/warning') {
        this.mockObjShow = true
      } else {
        this.mockObjShow = false
      }
    }
  }
}
</script>

<style scoped>
  .alarmET{padding: 30px 0 20px 0;box-sizing: border-box; width:100%;position: relative}
  .alarm_title{line-height: 1rem;box-sizing: border-box;padding-left: .4rem;color: #00BEFF;}
  .rel_waring {width: 100%; box-sizing: border-box; padding: 0 0.1rem; padding-bottom: 1.1rem;}
  .rel_waring li {display: block; text-align: left; margin-bottom: 0.12rem; overflow: hidden; position: relative; }
  a.click-map{position: absolute; padding: .2rem; box-sizing: border-box; top: 42%; right: .2rem; z-index: 2; cursor: pointer; }
  a.click-map>img{width: .3rem; height: .4rem; }
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

  .choose{position: absolute; top: .15rem; right: .13rem; z-index: 6; cursor: pointer;}
  .choose span{border-radius: .02rem; min-width: 2.4rem; padding:.08rem .4rem .08rem .3rem; height: .5rem; line-height: .5rem; font-weight: normal; font-size: .3rem; color: #befefe; text-align: center; z-index: 5;}
  .choose span:after {border: solid transparent; content: ''; right: 6%; top: .22rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-right-color: #31f1fe; }
  @media screen and (min-width: 1200px) and (max-width: 3000px){.iconPic{width:1.15rem !important;} }
  @media screen and (min-width: 3001px) {
    .rel_waring li .rel_waring_con-1 span:nth-of-type(1) {width: 2.8rem; display: inline-block; }
  }
  .lazyload {height: 20px !important;}
  @media screen and (min-width: 6001px) {
    .rel_waring li .rel_waring_con-22 p:nth-of-type(1) {
      font-size: .55rem;
    }
    .rel_waring li .rel_waring_con-22 p:nth-of-type(2) {
      font-size: .48rem;
    }
    .rel_waring li .rel_waring_con-21 {
      width: 2.7rem;
      height: 3.5rem;
      margin-right: .3rem;
    }
    .rel_waring li .rel_waring_top p {
      line-height: .48rem;
      padding: .25rem;
    }
    a.click-map {
      right: 1rem;
    }
    a.click-map>img {
      width: .6rem;
      height: .8rem;
    }
    .alarmET{padding: .6rem 0 1rem 0;}
    .echartTitle_t2 {top: .45rem;}
  }
</style>
