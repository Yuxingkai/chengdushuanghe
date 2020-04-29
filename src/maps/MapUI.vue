<template>
  <div
    id="mapDiv"
    class="container">
    <upDown
      :item-info="itemInfos"
      v-show="panelShow"
      @change="getClickedItem"/>
      <!--<ul class="ulButton">-->
      <!--<li class="plus" @click="zoombig()">+</li>-->
      <!--<li class="minus" @click="zoomsmall()"><span>-</span></li>-->
      <!--<li class="bacgroundLeft bacCommon" @click="panleft()"></li>-->
      <!--<li class="bacgroundRight bacCommon" @click="panright()"></li>-->
      <!--<li class="bacgroundUp bacCommon" @click="panup()"></li>-->
      <!--<li class="bacgroundDown bacCommon" @click="pandownd()"></li>-->
      <!--</ul>-->
  </div>
</template>

<script>
import { addDevices, createMap, getFence, hideLayerAndLabel, showLayerAndLabel, addDataLayer, addBoundaryLayer, showLocation } from './mapJs.js'
import user from '../Utils/user'
import {getMapPointComponent, HtmlConfig, apiNames} from '../config/config'
import upDown from '../components/UIKit/upDown'
import { showLayer, showCar, closePopup, showStranger, baiduToWGS84, hideLayer, getLyrFullName, getLyrByName,
  getMapZoom, stopBlinkingObj, clearDataLayer, startBlinkingObj, setCenterAndZoom, getLayerNamebyVisibility } from './mapApi.js'
import { Post } from '../Utils/Http.js'
import { MapType, MapPolygonStyle, MapLineType } from './mapClass.js'

let headString
let extent = {xmin: 0, ymin: 0, xmax: 0, ymax: 0}
let villageFences = []
let mapParams

// 上一个设备闪烁对象
let preBlinkingObj = []
// 上一个人员闪烁对象
let preBlinkingPeo = []

export default {
  data () {
    return {
      panelShow: false,
      itemInfos: []
    }
  },
  components: {
    upDown
  },
  destroyed: function () {
    clearDataLayer()
    closePopup()
  },
  mounted: function () {
    let current = this.$route.path.trim()
    headString = user.getRequestHeader()
    // 修改head，设置villageID,mapextent
    let that = this

    that.$bus.off('/home/webGlobalConfig')
    that.$bus.once('/home/webGlobalConfig', function (e) {
      let gConfig = e.config
      let vIDs = []
      villageFences = []
      preBlinkingObj = []
      if (typeof gConfig.villageInfos === 'object') {
        gConfig.villageInfos = [gConfig.villageInfos]
      }
      for (let i = 0; i < gConfig.villageInfos.length; i++) {
        vIDs.push(gConfig.villageInfos[i].villageID)
        villageFences.push(gConfig.villageInfos[i].fence)
      }
      headString.villageIDs = vIDs

      if (gConfig.villageInfos.length > 1) {
        extent.xmin = gConfig.mapExtent.minLongitude
        extent.ymin = gConfig.mapExtent.minLatitude
        extent.xmax = gConfig.mapExtent.maxLongitude
        extent.ymax = gConfig.mapExtent.maxLatitude
        mapParams = JSON.parse(gConfig.mapParams)
      } else {
        extent.xmin = gConfig.villageInfos[0].mapExtent.minLongitude
        extent.ymin = gConfig.villageInfos[0].mapExtent.minLatitude
        extent.xmax = gConfig.villageInfos[0].mapExtent.maxLongitude
        extent.ymax = gConfig.villageInfos[0].mapExtent.maxLatitude
        mapParams = JSON.parse(gConfig.villageInfos[0].mapParams)
      }
      // that.panelShow = mapParams.isShowLayerControl
      createMap(current, headString, extent, villageFences, 'mapDiv', mapParams, function () {
        if (mapParams.isShowLayerControl) {
          that.getDataType(current)
        }
        that.getRealtimeData(current)
        that.$bus.on('/web/event/map/nbdevicealarm', function (e) {
          let obj = JSON.parse(e)
          // console.log(obj)
          let currentVillage = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
          let id = currentVillage
          if (id === obj.villageID) {
            that.showRealTimeAlarmOnMap(that, obj.deviceID, true, obj.deviceType, null, null)
          }
        })
        that.$bus.on('/map/locate/searchResult', function (list) {
          if (list === undefined) return
          clearDataLayer()
          let strokeColor = '#FFFF00'
          if (HtmlConfig.mapUrl === 'leaflet_shaoxing' || HtmlConfig.mapUrl === 'esri_changning') {
            strokeColor = '#3B00FF'
          }
          addBoundaryLayer(villageFences, new MapPolygonStyle('#FFFFFF', strokeColor, 8, 0.9, 0, MapLineType.Solid), 'villageFence')
          let resultPoints = []
          let types = list.map(function (val) {
            if (val.devicetype !== null) {
              return val.devicetype.trim()
            }
          })
          types = types.filter(function (val, index) { return types.indexOf(val) === index && val !== '' })
          let currentVillage = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
          for (let i = 0; i < types.length; i++) {
            if (types[i] !== undefined) {
              let typeList = list.filter(function (val) {
                return val.devicetype.trim() === types[i]
              })
              resultPoints.push({villageID: currentVillage, layername: 'search_' + types[i], type: types[i], data: typeList})
            }
          }
          addDataLayer(resultPoints, false, false)
        })
        that.$bus.on('/map/locate/clearResult', function () {
          let lyrs = getLyrFullName('search_')
          for (let i = 0; i < lyrs.length; i++) {
            clearDataLayer(lyrs[i])
          }
          let alarmsLyr = getLyrByName('alarm')
          if (alarmsLyr !== undefined) {
            clearDataLayer('alarm')
          }
        })
        that.$bus.on('/map/layerControl', function (msg) {
          let visibleLayers = getLayerNamebyVisibility(true)
          for (let p = 0; p < visibleLayers.length; p++) {
            if (visibleLayers[p] === 'villageFence') continue
            clearDataLayer(visibleLayers[p])
          }
          for (let i = 0; i < msg.village.length; i++) {
            for (let j = 0, len = msg.devices.length; j < len; j++) {
              if (msg.devices[j] === 'fence') {
                getFence()
                if (getMapZoom() === mapParams.zooms[1]) {
                  showLayer(msg.village[i] + '_fence_line_label')
                }
              }
              showLayerAndLabel(msg.village[i] + '_' + msg.devices[j], msg.devices[j], msg.isClickable, false)
              if (getMapZoom() === mapParams.zooms[1]) {
                showLayer(msg.village[i] + '_' + msg.devices[j] + '_label')
              }
            }
          }
        })

        that.$bus.on('/map/center', function () {
          setCenterAndZoom((extent.xmin + extent.xmax) / 2, (extent.ymin + extent.ymax) / 2, mapParams.zoom)
        })
        window.mapPointClicked = function (e) {
        // alert(e.buildingID)
          let path = window.param.currentRouter.path + '/' + e.type.toLowerCase()
          window.pop.show({
            level: 1,
            component: getMapPointComponent(path),
            param: {
              e: e,
              level: 1
            }
          })
        }
      })
    })
  },
  created: function () {
    this.$bus.on('mapLayoutChanged', this.onPositionChanged)
  },
  methods: {
    onPositionChanged: function (args) {
      if (args.show) {
        if (mapParams === undefined) return
        if (mapParams.mapType === MapType.Esri || mapParams.mapType === MapType.Tianditu) {
          setCenterAndZoom((extent.xmin + extent.xmax) / 2, (extent.ymin + extent.ymax) / 2, mapParams.zoom)
        }
      }
    },
    getClickedItem: function (item) {
      let villageID = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let type = this.getType(item.type.trim())
      if (item.selected) {
        if (type === 'fence') {
          getFence()
          if (getMapZoom() === mapParams.zooms[1]) {
            showLayer(villageID + '_fence_line_label')
          }
        } else if (type === 'all') {
          for (let i = 0; i < this.itemInfos.length; i++) {
            this.itemInfos[i].selected = true
            this.itemInfos[i].bg = true
            if (this.itemInfos[i].type === 'all') continue
            let deviceType = this.getType(this.itemInfos[i].type.trim())
            if (deviceType === 'fence') {
              getFence()
              if (getMapZoom() === mapParams.zooms[1]) {
                showLayer(villageID + '_fence_line_label')
              }
            } else {
              showLayerAndLabel(villageID + '_' + deviceType, deviceType, true, false)
              if (getMapZoom() === mapParams.zooms[1]) {
                showLayer(villageID + '_' + deviceType + '_label')
              }
            }
          }
        } else {
          showLayerAndLabel(villageID + '_' + type, type, true, false)
          if (getMapZoom() === mapParams.zooms[1]) {
            showLayer(villageID + '_' + type + '_label')
          }
        }
      } else {
        if (type === 'fence') {
          clearDataLayer(villageID + '_fence_line')
          clearDataLayer(villageID + '_fence_point')
          clearDataLayer(villageID + '_fence_line_label')
        } else if (type === 'all') {
          for (let i = 0; i < this.itemInfos.length; i++) {
            this.itemInfos[i].selected = false
            this.itemInfos[i].bg = false
            if (this.itemInfos[i].type === 'all') continue
            let deviceType = this.getType(this.itemInfos[i].type.trim())
            if (deviceType === 'fence') {
              clearDataLayer(villageID + '_fence_line')
              clearDataLayer(villageID + '_fence_point')
              clearDataLayer(villageID + '_fence_line_label')
            } else {
              hideLayerAndLabel(villageID + '_' + deviceType)
              if (getMapZoom() === mapParams.zooms[1]) {
                hideLayer(villageID + '_' + deviceType + '_label')
              }
            }
          }
        } else {
          hideLayerAndLabel(villageID + '_' + type)
          if (getMapZoom() === mapParams.zooms[1]) {
            hideLayer(villageID + '_' + type + '_label')
          }
        }
        stopBlinkingObj()
      }
    },
    getModuleName: function (path) {
      let start = path.lastIndexOf('/')
      return path.slice(start + 1, path.length).trim()
    },
    getDataType: function (current) {
      if (current === '/street') {
        this.panelShow = false
      } else {
        this.itemInfos.splice(0, this.itemInfos.length)
        for (let i = 0; i < window.deviceTypeNames.length; i++) {
          this.itemInfos.push({type: this.getTypeName(window.deviceTypeNames[i].type.trim()), id: i, bg: false, selected: false})
        }
        this.checkState(current)
      }
    },
    checkState: function (current) {
      switch (current) {
        case '/home/maintenance/camera':
        case '/home/maintenance/access':
        case '/home/maintenance/smokeDetector':
        case '/home/maintenance/electricArc':
        case '/home/maintenance/manholeCover':
        case '/home/maintenance/fireCock':
        case '/home/maintenance/geomagnetic':
        case '/home/maintenance/charger':
        case '/home/maintenance/fence':
        case '/home/maintenance/combustibleGas':
        case '/home/search/face':
        case '/home/search/car':
        case '/home/search/pass':
        case '/home/search/alarm':
        case '/home/search/device':
        case '/street':
        case '/home/sensor/operation':
          this.panelShow = false
          break
        case '/home/maintenance/all':
          for (let i = 0; i < this.itemInfos.length; i++) {
            this.itemInfos[i].bg = true
            this.itemInfos[i].selected = true
          }
          this.panelShow = true
          break
        case '/home/sensor/face':
        case '/home/sensor/other':
        case '/home/sensor/pass':
        case '/home/sensor/fire':
        case '/home/sensor/car':
        case '/home/sensor/warning':
          for (let i = 0; i < this.itemInfos.length; i++) {
            let checked = false
            let type = this.getType(this.itemInfos[i].type)
            let deviceType = this.getModuleName(current)
            for (let j = 0; j < HtmlConfig.modelDevice[deviceType].length; j++) {
              if (type === HtmlConfig.modelDevice[deviceType][j]) {
                this.itemInfos[i].bg = true
                this.itemInfos[i].selected = true
                checked = true
                break
              }
            }
            if (!checked) {
              this.itemInfos[i].bg = false
              this.itemInfos[i].selected = false
            }
          }
          this.panelShow = true
          break
      }
    },
    getTypeName: function (type) {
      for (let i = 0; i < window.deviceTypeNames.length; i++) {
        if (window.deviceTypeNames[i].type.trim() === type) { return window.deviceTypeNames[i].typeName.trim() }
      }
    },
    getType: function (typeName) {
      for (let i = 0; i < window.deviceTypeNames.length; i++) {
        if (window.deviceTypeNames[i].typeName === typeName) { return window.deviceTypeNames[i].type.trim() }
      }
    },
    filtration (val) {
      if (val) {
        if (window.location.hostname.indexOf('31.0') !== -1 || window.location.hostname === 'localhost') {
          return val
        } else {
          return val.replace('31.0.167.62:19800', '10.1.247.10:9000')
        }
      }
    },
    getRealtimeData: function (current) {
      let that = this
      this.$bus.off('/web/event/map/parkingLog')
      this.$bus.off('/web/event/map/faceLog')
      this.$bus.off('/map/locate/deviceID')
      this.$bus.off('/map/locate/peopleID')

      // this.$bus.off('/web/event/map/nbdevicealarm')
      switch (current) {
        case '/home/sensor/car':
          this.$bus.on('/web/event/map/parkingLog', function (e) {
            let obj = JSON.parse(e)
            console.log(obj + '地图车辆点位popup')
            let currentVillage = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
            let id = currentVillage
            if (id === obj.villageID) {
              let passTime = that.formatDate(obj.passTime)
              showCar(obj.Longitude, obj.Latitude, passTime, obj.parkingName, obj.plateNo, obj.in_outType === 1 ? '驶进' : '驶出', obj.platePic)
              setTimeout(() => {
                closePopup()
              }, 5000)
            }
          })
          break
        case '/home/sensor/face':
          this.$bus.on('/web/event/map/faceLog', function (e) {
            let obj = JSON.parse(e)
            console.log(obj + '地图人脸点位popup')
            let currentVillage = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
            let id = currentVillage
            if (id === obj.villageID) {
              let passTime
              let lastPassTime
              obj.passTime === undefined ? passTime = '' : passTime = that.formatDate(obj.passTime)
              obj.lastPassTime === undefined ? lastPassTime = '' : lastPassTime = that.formatDate(obj.lastPassTime)
              let xCoor
              let yCoor
              if (obj.coordinate === '84') {
                xCoor = obj.Longitude
                yCoor = obj.Latitude
              } else {
              // 百度转84
                let xy = baiduToWGS84([
                  [obj.Longitude, obj.Latitude]
                ])
                xCoor = xy[0][0]
                yCoor = xy[0][1]
              }
              // console.log(xy)
              showStranger(xCoor, yCoor, obj.Location === undefined ? '' : obj.Location,
                obj.lastLocation === undefined ? '' : obj.lastLocation,
                passTime, lastPassTime, obj.similarity === null ? ' --' : obj.similarity, that.filtration(obj.faceUrl), that.filtration(obj.lastFaceUrl))
              setTimeout(() => {
                closePopup()
              }, 5000)
            }
          })
          break
      }

      this.$bus.on('/map/locate/peopleID', function (e) {
        that.showRealTimePeopleOnMap(e.isShowLayer, e.param)
      })
      this.$bus.on('/map/locate/deviceID', function (e) {
        let type
        if (e.param.deviceType != null) { type = e.param.deviceType.trim() }
        that.showRealTimeAlarmOnMap(that, null, e.isShowLayer, type, e.param.longitude, e.param.latitude)
      })
    },
    getDeviceInfos: function (deviceID) {
      return new Promise(function (resolve, reject) {
        let params = user.getRequestHeader()
        params.deviceID = deviceID
        Post({
          async: true,
          url: apiNames['获取设备信息'],
          data: params,
          datatype: 'json',
          success: function (data) {
            if (data.responseStatus.resultCode === 0) {
              try {
                resolve(data.deviceInfo)
              } catch (err) {
                reject(err)
              }
            } else {
              console.log('获取设备信息: ' + data.responseStatus.resultMessage)
            }
          },
          error: function (error) {
            console.log(error)
          }
        })
      })
    },
    // 缩放至报警点&闪烁
    showRealTimeAlarmOnMap: function (that, deviceID, isShowLayer, deviceType, longitude, latitude) {
      let currentVillage = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      if (deviceID != null) {
        that.getDeviceInfos(deviceID).then(function (infos) {
          that.showLoc(currentVillage, deviceType, infos.longitude, infos.latitude, isShowLayer)
        })
      } else {
        that.showLoc(currentVillage, deviceType, longitude, latitude, isShowLayer)
      }
      if (isShowLayer) {
        for (let i = 0; i < that.itemInfos.length; i++) {
          if (that.itemInfos[i].type === that.getTypeName(deviceType)) {
            that.itemInfos[i].selected = true
          }
        }
      }
    },
    showLoc: function (currentVillage, deviceType, longitude, latitude, isShowLayer) {
      if (longitude == null || latitude == null) return
      if (longitude === 0 || latitude === 0) return
      if (deviceType === 'fence') {
        if (isShowLayer) {
          if (!showLayer(currentVillage + '_fence_point')) {
            getFence()
          }
        }
        // let path = JSON.parse(infos.deviceParams)
        // let longitude = (path[0][0] + path[path.length - 1][0]) / 2
        // let latitude = (path[0][1] + path[path.length - 1][1]) / 2

        setCenterAndZoom(longitude, latitude, mapParams.zooms[1] - 1)

        // preBlinkingObj.push(startBlinkingObj(path[0][0], path[0][1], -20, -23))
        // preBlinkingObj.push(startBlinkingObj(path[path.length - 1][0], path[path.length - 1][1], -20, -23))

        preBlinkingObj.push(startBlinkingObj(longitude, latitude, -20, -23))

        setTimeout(() => {
          if (preBlinkingObj.length > 0) {
            for (let i = 0; i < preBlinkingObj.length; i++) {
              stopBlinkingObj(preBlinkingObj[i])
            }
          }
        }, 6000)
      } else {
        if (isShowLayer) {
          showLayerAndLabel(currentVillage + '_' + deviceType, deviceType, true, true)
        }
        let xoffset = -20
        let yoffset = -44
        if (deviceType === 'camera_car' || deviceType === 'camera_face' || deviceType === 'smokeDetector') {
          yoffset = -40
          xoffset = -15
        }
        setCenterAndZoom(longitude, latitude, mapParams.zooms[1] - 1)
        preBlinkingObj.push(startBlinkingObj(longitude, latitude, xoffset, yoffset))

        setTimeout(() => {
          if (preBlinkingObj.length > 0) {
            for (let i = 0; i < preBlinkingObj.length; i++) {
              stopBlinkingObj(preBlinkingObj[i])
            }
          }
        }, 6000)
      }
    },
    showRealTimePeopleOnMap: function (isShowLayer, param) {
      if (isShowLayer) {
        setCenterAndZoom(param.longitude, param.latitude, mapParams.zooms[1] - 1)
        showLocation(param, 'security', 'security', false)
        preBlinkingPeo.push(startBlinkingObj(param.longitude, param.latitude, -20, -44))

        setTimeout(() => {
          if (preBlinkingPeo.length > 0) {
            for (let i = 0; i < preBlinkingPeo.length; i++) {
              stopBlinkingObj(preBlinkingPeo[i])
            }
            clearDataLayer('security')
          }
        }, 6000)
      }
    },
    formatDate: function (value) {
      let date = new Date(value)
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return MM + '-' + d + ' ' + h + ':' + m + ':' + s
    }
  },
  watch: {
    '$route': function (to, from) {
      // add devices on the map and set extent
      let current = to.path.trim()
      let pre = from.path.trim()
      if (current === '/home/trend/allState') return
      let currentMName = current.search('/home/search/')
      if (currentMName !== 0) {
        this.$bus.off('/map/locate/clearResult')
      } else {
        this.$bus.on('/map/locate/clearResult', function () {
          let lyrs = getLyrFullName('search_')
          for (let i = 0; i < lyrs.length; i++) {
            clearDataLayer(lyrs[i])
          }
          let alarmsLyr = getLyrByName('alarm')
          if (alarmsLyr !== undefined) {
            clearDataLayer('alarm')
          }
        })
      }
      addDevices(current, pre, villageFences, extent)
      this.checkState(current)
      this.getRealtimeData(current)
    }
  }
}
</script>

<style scoped>
.container{
  height: 100%;
  width: 100%
}
/*.ulButton {*/
  /*z-index: 1;*/
  /*position: absolute;*/
  /*right: 410px;*/
  /*bottom: 144px;*/
/*}*/
/*.ulButton li {*/
  /*width: 0.6rem;*/
  /*height: 0.6rem;*/
  /*color: #2cdae9;*/
  /*text-align: center;*/
  /*line-height: 0.45rem;*/
  /*font-size: 0.62rem;*/
  /*border-radius: 2px;*/
  /*border: 1px solid #2cdae9;*/
  /*cursor: pointer;*/
  /*!*background: #0a1c3a;*!*/
/*}*/
/*!*.ulButton li:nth-of-type(1) {*!*/
  /*!*border-bottom: none;*!*/
/*!*}*!*/
/*.bacCommon {*/
  /*background-repeat: no-repeat;*/
  /*background-size: 50%;*/
/*}*/
/*.plus {*/
  /*position: absolute;*/
  /*top: -.8rem;*/
/*}*/
/*.minus {*/
  /*margin-bottom: .2rem;*/
/*}*/
/*.bacgroundRight {*/
  /*background-image: url("../assets/images/maps/mapRight.png");*/
  /*position: absolute;*/
  /*top: -.4rem;*/
  /*right: -.8rem;*/
  /*background-position: 30% 50%;*/
/*}*/
/*.bacgroundLeft {*/
  /*background-image: url("../assets/images/maps/mapLeft.png");*/
  /*position: absolute;*/
  /*top: -.4rem;*/
  /*left: -.8rem;*/
  /*background-position: 70% 50%;*/
/*}*/
/*.bacgroundUp {*/
   /*background-image: url("../assets/images/maps/mapUp.png");*/
  /*position: absolute;*/
  /*top: -1.6rem;*/
  /*background-position: 50% 70%;*/
/*}*/
/*.bacgroundDown {*/
    /*background-image: url("../assets/images/maps/mapDown.png");*/
  /*background-position: 50% 30%;*/
/*}*/
</style>
