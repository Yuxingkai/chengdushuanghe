<template>
  <pop
    :css="boxwidth"
    :title="alarmName"
    :level="param.level"
    footer="display:none">
    <div class="camera">
      <div class="cameraList">
        <boxTitle title="摄像机列表"/>
        <Box3>
          <happy-scroll
            style="height:10rem;"
            resize
            size="3">
            <ul class="list">
              <li
                v-for="(item, index) in cameraList"
                :key="index"
                @click="chooseTV(item, index)"
                :class="{ 'active' : index === activeInfo }">
                <b>{{ item.name }}</b>
                <b
                  :class="{videoTvIcon: item.streamSource !== null ? true : false}"
                  style="margin-top: .03rem"/>
              </li>
            </ul>
          </happy-scroll>
        </Box3>
      </div>
      <div class="cameraDetails">
        <div class="basicInfo">
          <boxTitle
            title="基础信息"
            css="font-size:.32rem"/>
          <Box3 css="">
            <ul class="deviceInfo">
              <li><p>设备名称：</p><span>{{ footerInfo.name | splitCode }}</span></li>
              <li :title="footerInfo.code | splitCode"><p>设备编码：</p><span>{{ footerInfo.code | splitCode }}</span></li>
              <li><p>设备位置：</p><span>{{ footerInfo.installAdd | splitCode }}</span></li>
              <li><p>设备型号：</p><span>{{ footerInfo.prducetBrand | splitCode }}</span></li>
              <li><p>设备状态：</p>
                <span
                  class="on_line"
                  :class="footerType1" >{{ footerType_1 | splitCode }}</span>
              </li>
              <li><p>运行时长：</p><span>{{ footerInfo.days }}天{{ footerInfo.hours }}小时</span></li>
            </ul>
          </Box3>
        </div>
        <div style="position: relative" class="realTimeVideo five_video">
          <boxTitle
            title="实时视频"
            css="font-size:.32rem"/>
          <div @click="lookLuxiang" style="position: absolute;left: 85px;top: 15px;font-size: .32rem;cursor: pointer">/ 查看视频</div>
          <div style="height:6.8rem;padding-top:3px;box-sizing:border-box;">
            <player
              mask-tip-info="true"
              :src="tvUrl"
              style="transform: scale(1);transform-origin: 0 0;"/>
          </div>
        </div>
      </div>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post, PostCopy} from '../../../Utils/Http'
export default {
  name: 'ViewTV',
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      boxwidth: 'width:16.68rem;',
      alarmName: '设备信息',
      cameraList: [],
      footerInfo: {code: '', prducetBrand: '', isDisable: '', days: '', hours: '', state: '', name: '', installAdd: ''},
      footerType1: 'on_line1',
      footerType_1: '在线',
      footerType2: 'off_line1',
      footerType_2: '启用',
      tvUrl: '',
      activeInfo: 0,
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: '',
      time: '',
      deveiceID: ''
    }
  },
  components: {
    pop,
    boxTitle
  },
  filters: {
    splitCode: function (value) {
      if (!value) {
        value = '-'
      }
      return value
    }
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    this.addInfo()
  },
  methods: {
    addInfo () {
      if (this.param.e.cameras) {
        this.getDeviceInfo(this.param.e.cameras[0].deviceID)
        this.cameraList = this.param.e.cameras
        this.getstrema(this.param.e.cameras[0].deviceID)
      } else if (this.param.e.alarmType === 'doorOpen') {
        this.getDeviceInfo(this.param.e.deviceID)
        this.getAccessList()
      } else {
        this.getDeviceInfo(this.param.e.deviceID)
        this.getCameraList()
      }
    },
    getDeviceInfo (deviceID) {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = deviceID
      Post({
        async: true,
        url: apiNames['获取设备信息'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.deviceInfo) {
            let time1 = data.deviceInfo.installTime
            // 得到毫秒数
            let time2 = (new Date(time1)).getTime()
            // 获取当前毫秒数
            let dateTime = (new Date()).getTime()
            let time3 = dateTime - time2
            let days = Math.floor(time3 / (1000 * 60 * 60 * 24))
            let hours = Math.floor((time3 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            that.footerInfo.code = data.deviceInfo.code
            that.footerInfo.prducetBrand = data.deviceInfo.prducetBrand
            that.footerInfo.installAdd = data.deviceInfo.installAdd
            that.footerInfo.name = data.deviceInfo.name
            that.footerInfo.isDisable = data.deviceInfo.isDisable
            that.footerInfo.days = days
            that.footerInfo.hours = hours
            switch (data.deviceInfo.state) {
              case 0 :
                that.footerType1 = 'on_line0'
                that.footerType_1 = '离线'
                break
              case 1 :
                that.footerType1 = 'on_line1'
                that.footerType_1 = '在线'
                break
              case 2 :
                that.footerType1 = 'on_line2'
                that.footerType_1 = '故障'
                break
            }
            switch (data.deviceInfo.isDisable) {
              case 0 :
                that.footerType2 = 'off_line1'
                that.footerType_2 = '启用'
                break
              case 1 :
                that.footerType2 = 'off_line2'
                that.footerType_2 = '禁用'
                break
            }
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-viewTV 获取设备信息')
        }
      })
    },
    getCameraList () {
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      Post({
        async: true,
        url: apiNames['获取关联设备'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data) {
            this.cameraList = data.relateDevices
            this.time = this.param.e.cameras[0].time
            this.getstrema(this.param.e.cameras[0].deviceID)
            this.deveiceID = this.param.e.cameras[0].deviceID
            this.footerInfo.name = this.cameraList[0].name
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取小视频
    lookLuxiang () {
      let allTime = new Date(this.time)
      allTime = allTime.getTime()
      let reqParam = user.getRequestHeader()
      reqParam.ID = this.deveiceID
      reqParam.Start = allTime / 1000 - 15
      reqParam.End = allTime / 1000 + 15
      Post({
        async: false,
        url: this.smallVideoUrl,
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.Code === 0) {
            let tvSrc = ''
            tvSrc = this.playUrl + data.Data.RTMP
            this.getDataSrc(tvSrc, '')
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
    },
    getAccessList () {
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      Post({
        async: true,
        url: apiNames['获取门禁信息'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.cameraInfos) {
            this.cameraList = data.cameraInfos
            for (let i = 0; i < this.cameraList.length; i++) {
              this.cameraList[i].name = this.cameraList[i].cameraName
            }
            this.time = this.cameraList[0].time
            this.getstrema(this.cameraList[0].cameraDeviceID)
            this.deveiceID = this.cameraList[0].cameraDeviceID
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    chooseTV (item, index) {
      this.activeInfo = index
      let src = ''
      if (item.deviceID) {
        src = item.deviceID
      } else if (item.cameraDeviceID) {
        src = item.cameraDeviceID
      }
      this.time = item.time
      this.getDeviceInfo(item.deviceID)
      this.deveiceID = src
      this.getstrema(src)
    },
    getstrema (src) {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.ID = src
      //  reqParam.ID = '31010520011320001003'
      PostCopy({
        async: false,
        url: that.videoUrl,
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.Code === 0) {
            that.tvUrl = that.playUrl + data.Data.RTMP
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
    }
  }
}
</script>

<style scoped>
b {font-weight: normal; }
li {text-overflow: ellipsis; white-space: nowrap; }
.camera{margin: .2rem;position: relative;box-sizing: border-box;}
.camera .cameraList{height: 100%;width: 5rem;}
.camera .cameraList .list{min-height: 10rem;padding: .1rem;box-sizing: border-box;}
.camera .cameraList .list li{padding: .2rem .4rem .2rem 1rem;text-align: center;display: flex;display: -webkit-flex;justify-content: space-between;box-sizing: border-box;}
.camera .cameraList .list li:nth-child(2n+0){background: #a4edfc1a;}
.cameraDetails{position: absolute;top:0;left: 0;margin-left: 5.2rem;width: 10.6rem}
.cameraDetails .basicInfo .deviceInfo{font-size: .32rem;color: #ffffff;box-sizing: border-box;overflow: hidden;height: 1.8rem;padding: .18rem 0;}
.cameraDetails .basicInfo .deviceInfo>li{width: 50%;float: left;margin-bottom: .13rem;}
.cameraDetails .basicInfo .deviceInfo>li>p{color: #a4edfc;display: inline-block;text-align: right;padding-left: .5rem;}
.cameraDetails .realTimeVideo{margin-top: .2rem}
.camera .cameraList .list li.active{background: #00d4ff80;}
</style>
