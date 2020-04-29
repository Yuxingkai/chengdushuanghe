<template>
  <pop
    :css="boxwidth"
    :title="caption +'信息'"
    :level="param.level"
    footer="display:none">
    <div class="sensor">
      <div class="sensorInfo">
        <div class="sensorBasis">
          <boxTitle
            title="基础信息"
            css="font-size:.32rem"/>
          <div>
            <Box3>
              <div
                class="deveiceImg"
                v-if="fireImgInfo === true"><img :src="deviceInfo.deviceImage"></div>
              <ul
                class="call_police"
                :class="{ 'fireImg' : fireImgInfo === true}">
                <li :title="deviceInfo.name"><span>设备名称</span>{{ deviceInfo.name | capitalize }}</li>
                <li :title="deviceInfo.code"><span>设备编码</span>{{ deviceInfo.code | capitalize }}</li>
                <li><span>设备位置</span>{{ deviceInfo.installAdd | capitalize }}</li>
                <li><span>设备型号</span>{{ deviceInfo.prducetBrand | capitalize }}</li>
                <li><span>设备状态</span><b :class="textColor">{{ deviceInfo.state | capitalize }}</b></li>
                <li><span>运行时长</span>{{ deviceInfo.processingTime | capitalize }}</li>
                <li><span>电&nbsp;&nbsp;量</span>{{ deviceInfo.power | capitalize }}</li>
              </ul>
            </Box3>
          </div>
        </div>
        <div class="sensorRecord">
          <boxTitle
            title="报警记录"
            css="font-size:.32rem"/>
          <div>
            <Box3 css="height:3.76rem">
              <div v-if="record === 1">
                <div class="left_title">
                  <span>报警时间</span><span>报警次数</span><span>报警类型</span><span>处理状态</span><span>处理时间</span><span>操作</span>
                </div>
                <happy-scroll
                  resize
                  size="3"
                  hide-horizontal
                  style="height:3.14rem">
                  <ul class="left3_ul">
                    <li
                      v-for="item in recodeInfo"
                      :key="item.id">
                      <p :title="item.alarmTime">{{ item.alarmStartTime | capitalize }}</p>
                      <p>{{ item.alarmCount }}</p>
                      <p>{{ item.alarmTypeName | capitalize }}</p>
                      <p>{{ item.alarmState | capitalize }}</p>
                      <p :title="item.processedTime">{{ item.alarmEndTime | capitalize }}</p>
                      <p><span @click="selectAlarm(item)">查看详情</span></p>
                    </li>
                  </ul>
                </happy-scroll>
              </div>
              <div v-if="record === 2">
                <div class="record">
                  <p>
                    <img src="../../../assets/images/alarmFlow/noRecord.png">
                    <span>当前无报警记录</span>
                  </p>
                </div>
              </div>
            </Box3>
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
import {apiNames, getRealTimePointComponent} from '../../../config/config'
import {Post} from '../../../Utils/Http'

export default {
  name: 'Sensor',
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
      caption: '设备',
      boxwidth: 'width:14.22rem;',
      sensorInfo: {},
      deviceInfo: {},
      recodeInfo: [],
      textColor: '',
      record: 0,
      fireImgInfo: false
    }
  },
  components: {
    pop,
    boxTitle
  },
  filters: {
    capitalize (value) {
      if (!value) return '-'
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {

  },
  mounted () {
    this.difference()
    this.addInfo()
    this.$bus.on('/event/afterDealAlarm', (e) => {
      this.getalarmList()
      console.log(e)
    })
  },
  methods: {
    difference () {
      /**
         * title——标题信息
         */
      if (this.param.e.alarmTypeName) {
        this.caption = this.param.e.alarmTypeName
      } else if (this.param.e.typeName) {
        this.caption = this.param.e.typeName + '感知'
      }
    },
    addInfo () {
      this.getalarmList()
      this.getdeviceInfo()
    },
    getalarmList () {
      //  报警列表
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = [villageIDs]
      //  报警信息
      Post({
        async: true,
        url: apiNames['获取报警列表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.alarms) {
            for (let i = 0; i < data.alarms.length; i++) {
              switch (data.alarms[i].alarmState) {
                case 0:
                  data.alarms[i].alarmState = '未处理'
                  break
                case 1:
                  data.alarms[i].alarmState = '误报'
                  break
                case 2:
                  data.alarms[i].alarmState = '确认'
                  break
                case 3:
                  data.alarms[i].alarmState = '解除'
                  break
                case 4:
                  data.alarms[i].alarmState = '已受理'
                  break
              }
              let alarmtime = data.alarms[i].alarmTime
              if (alarmtime) data.alarms[i].alarmStartTime = that.dispose(alarmtime)
              let endtime = data.alarms[i].processedTime
              if (endtime) data.alarms[i].alarmEndTime = that.dispose(endtime)
            }
            that.recodeInfo = data.alarms
            that.sensorInfo = data.alarms[0]
            that.record = 1
          } else {
            that.record = 2
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-sensor 获取报警列表')
        }
      })
    },
    getdeviceInfo () {
      //  设备信息
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      Post({
        async: true,
        url: apiNames['获取设备信息'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          switch (data.deviceInfo.state) {
            case 0:
              data.deviceInfo.state = '离线'
              that.textColor = 'yellow'
              break
            case 1:
              data.deviceInfo.state = '在线'
              break
            case 2:
              data.deviceInfo.state = '故障'
              that.textColor = 'red'
              break
          }
          let s = data.deviceInfo.insertTime
          if (s) {
            s = s.substring(0, s.indexOf('.'))
            data.deviceInfo.insertTime = s.replace('T', ' ')
            let insertTime = data.deviceInfo.insertTime
            data.deviceInfo.processingTime = insertTime.length > 0 ? that.showtime(insertTime) : ''
          }
          if (data.deviceInfo) {
            if (!data.deviceInfo.power) {
              data.deviceInfo.power = '-'
            }
            that.fireImgInfo = (data.deviceInfo.type === 'fireCock')
            that.deviceInfo = data.deviceInfo
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-sensor 获取设备信息')
        }
      })
    },
    selectAlarm (e) {
      let path = e.deviceType
      window.pop.show({
        level: 2,
        component: getRealTimePointComponent(path),
        param: {
          level: 2,
          e: e
        }
      })
    },
    showtime (time) {
      /**
         * @两个时间相减 {showtime}
         */
      let endtime = new Date()
      let nowtime = new Date(time) // 设置开始时间
      let lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000)
      let d = Math.floor(lefttime / (60 * 60 * 24))
      let h = Math.floor(lefttime / (60 * 60) % 24)
      // var m = Math.floor(lefttime / 60 % 60)
      // var s = Math.floor(lefttime % 60)
      // setTimeout(showtime, 1000)
      return d + '天' + h + '小时'
    },
    dispose: (s) => s.substring(s.indexOf('-') + 1, s.length)
  }
}
</script>

<style scoped>
  p, li {text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  b {font-weight: normal; }
  .sensor {padding: .18rem .2rem 0 .2rem; box-sizing: border-box; overflow: hidden; display: flex; }
  .sensorInfo {float: left; }
  .sensorBasis ul {overflow: hidden; width: 100%; box-sizing: border-box; padding: .1rem 0; }
  .sensorBasis ul li {float: left; width: 50%; color: #fff; font-size: .32rem; box-sizing: border-box; padding: 0.1rem .52rem 0; line-height: .5rem; }
  .sensorRecord {margin-top: .09rem; box-sizing: border-box; font-size: .32rem; }
  .sensorRecord .left_title {width: 100%; padding-top: .1rem; box-sizing: border-box; display: flex; color: #a4edfc; }
  .sensorRecord .left_title span {flex: 3; text-align: center; line-height: .48rem; }
  .sensorRecord .left_title span:nth-of-type(2) {flex: 3; }
  .sensorRecord .left_title span:nth-of-type(5) {flex: 3; }
  .sensorRecord .left3_ul {overflow: hidden; width: 100%; box-sizing: border-box; padding: 0 .1rem; }
  .sensorRecord .left3_ul li {display: flex; line-height: .6rem;margin-bottom: .05rem}
  .sensorRecord .left3_ul li:nth-of-type(even) {background: rgba(164, 237, 252, .2); }
  .sensorRecord .left3_ul li p {flex: 3; text-align: center; }
  .sensorRecord .left3_ul li p:nth-of-type(2) {flex: 3; }
  .sensorRecord .left3_ul li p:nth-of-type(5) {flex: 3; }
  .sensorRecord .left3_ul li p:nth-of-type(6) {font-size: .32rem;}
  .sensorRecord .left3_ul li p:nth-of-type(6) span{border:1px solid #31f1fe7a;color:#ffffffc9;padding: .05rem .2rem;border-radius:.02rem;box-sizing: border-box;cursor: pointer;}
  .sensorRecord .left3_ul li .left3_ul_p span {padding: .03rem .2rem; border: 1px solid #31f1fe80; font-size: .24rem; }
  .deveiceImg {width: 2.4rem;height: 2.8rem;display: inline-block;box-sizing: border-box;padding:.15rem .05rem;}
  .deveiceImg img{width: 100%;height:100%;}
  .sensorBasis .fireImg {display: inline-block;width: calc(100% - 2.6rem)}
  .call_police li > span {min-width: 1.3rem; display: inline-block; text-align: justify; text-align-last: justify; white-space: nowrap; margin-right: .2rem; box-sizing: border-box; position: relative; color: #a4edfc; }
  .call_police li > span::after {content: ":"; display: inline-block; position: absolute; right: -.1rem; }
  .record{width:100%;height:3.76rem;display: table;text-align: center}
  .record p{vertical-align: middle;display: table-cell;text-align: center;margin: 0 auto}
  .record p img{width: .8rem;}
  .record p span{display: block;color:#ffffffb5;margin-top: .15rem;font-size: .32rem}
</style>
