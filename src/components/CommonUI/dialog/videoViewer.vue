<template>
  <pop
    title="摄像头感知信息"
    :level="param.level"
    css="width:16.28rem;"
    footer="display:none">
    <div class="videoContent">
      <boxtitle title="基础信息"/>
      <Box3 css="padding:.18rem 0;height:1.92rem;">
        <ul class="deviceInfo">
          <li><p>设备名称：</p><span>{{ footerInfo.name | splitCode }}</span></li>
          <li><p>设备编码：</p><span>{{ footerInfo.code | splitCode }}</span></li>
          <li><p>设备位置：</p><span>{{ footerInfo.installAdd | splitCode }}</span></li>
          <li><p>设备型号：</p><span>{{ footerInfo.prducetBrand | splitCode }}</span></li>
          <li><p>设备状态：</p>
            <span
              class="on_line"
              :class="footerType1" >{{ footerType_1 | splitCode }}</span>
          </li>
          <li><p>运行时长：</p><span>{{ footerInfo.days }}天{{ footerInfo.hours }}小时</span></li>
        </ul>
        <!--<echart config='dialog_face_bar' height='90%' width='100%'></echart>-->
      </Box3>
      <boxtitle
        style="margin-top:.2rem;"
        title="实时视频"/>
      <div style="height:8.8rem;padding-top:3px;box-sizing:border-box;">
        <player
          mask-tip-info="true"
          :src="tvSrc"/>
      </div>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxtitle from '../../home/public/boxTitle'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post, PostCopy} from '../../../Utils/Http'

export default {
  data () {
    return {
      footerInfo: {code: '', prducetBrand: '', isDisable: '', days: '', hours: '', state: '', name: '', installAdd: ''},
      footerType1: 'on_line1',
      footerType_1: '在线',
      footerType2: 'off_line1',
      footerType_2: '启用',
      tvSrc: '',
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: ''
    }
  },
  components: {
    pop,
    boxtitle
  },
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    this.getstrema()
    this.getDeviceInfo()
    console.log('this is current player instance object' + this.player)
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  filters: {
    splitCode: function (value) {
      if (!value) {
        value = '-'
      }
      return value
    }
  },
  methods: {
    getstrema () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.ID = this.param.e.deviceID
      PostCopy({
        async: true,
        url: that.videoUrl,
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.Code === 0) {
            that.tvSrc = that.playUrl + data.Data.RTMP
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
    },
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    },
    getDeviceInfo () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
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
          console.log(JSON.stringify(err) + 'popup-videoViewer 获取设备信息')
        }
      })
    }
  }
}
</script>

<style scoped>
.videoContent{
  padding: .2rem;
  box-sizing: border-box;
}
.videoContent .deviceInfo{
  font-size: .32rem;
  color: #ffffff;
  padding: .1rem;
  box-sizing: border-box;
  overflow: hidden;
}
.videoContent .deviceInfo>li{
  width: 50%;
  float: left;
  margin-bottom: .13rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.videoContent .deviceInfo p{
  color: #a4edfc;
  display: inline-block;
  width: 3rem;
  text-align: right;
}
</style>
