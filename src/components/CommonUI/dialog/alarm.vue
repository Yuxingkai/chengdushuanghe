<template>
  <pop
    :css="boxwidth"
    :title="caption +'信息'"
    :level="param.level"
    footer="display:none"
    over-flow="false">
    <div class="alarm">
      <div class="alarmInfo">
        <div class="alarmBasis">
          <boxTitle
            title="基础信息"
            css="font-size:.32rem"/>
          <div>
            <Box3 v-if="this.param.e.alarmType !== 'parkingCarExceed'">
              <ul class="call_police">
                <li :title="deviceInfo.name"><span>设备名称</span>{{ deviceInfo.name | capitalize }}</li>
                <li :title="deviceInfo.code"><span>设备编码</span>{{ deviceInfo.code | capitalize }}</li>
                <li :title="deviceInfo.installAdd"><span>设备位置</span>{{ deviceInfo.installAdd | capitalize }}</li>
                <li><span>设备型号</span>{{ deviceInfo.prducetBrand | capitalize }}</li>
                <li><span>设备状态</span><b :class="textColor">{{ deviceInfo.state | capitalize }}</b></li>
                <li><span>运行时长</span>{{ deviceInfo.processingTime | capitalize }}</li>
                <li><span>电&nbsp;&nbsp;量</span>{{ deviceInfo.power | capitalize }}</li>
              </ul>
            </Box3>
            <Box3 v-if="this.param.e.alarmType === 'parkingCarExceed'">
              <ul class="call_police">
                <li :title="alarmInfo.parkingName"><span>微卡名称</span>{{ alarmInfo.parkingName }}</li>
                <!--<li :title="alarmInfo.parkingName"><span>微卡位置</span>{{alarmInfo.parkingName}}</li>-->
              </ul>
            </Box3>
          </div>
        </div>
        <div class="alarmPolice">
          <boxTitle
            title="报警信息"
            css="font-size:.32rem"/>
          <div style="position:relative;">
            <div :class="{ rel_waring_top: alarmInfo.alarmLevelName != '' ? true : false}">
              <p :style="alarmInfo.layerStyle">{{ alarmInfo.alarmLevelName }}</p>
            </div>
            <Box3
              :is-red="alarmInfo.isColorStyle"
              css="height:1.65rem">
              <ul class="call_police">
                <li><span>报警类型</span>{{ alarmInfo.alarmTypeName | capitalize }}</li>
                <li><span>报警时间</span>{{ alarmInfo.alarmTime | capitalize }}</li>
                <li><span>报警状态</span>{{ alarmInfo.alarmState | capitalize }}</li>
                <li><span>报警次数</span>{{ alarmInfo.alarmCount | capitalize }}</li>
                <div v-if="alarmInfo.isDeal === 1">
                  <li><span>处理人</span>{{ alarmInfo.processedUser | capitalize }}</li>
                  <li><span>处理时间</span>{{ alarmInfo.processedTime | capitalize }}</li>
                </div>
              </ul>
            </Box3>
          </div>
        </div>
        <div class="alarmProcessing">
          <boxTitle
            title="报警处理"
            css="font-size:.32rem"/>
          <div id="alarmFlow">
            <Box3 css="height:5.5rem;">
              <flow :alarmflow="alarmflow"/>
            </Box3>
          </div>
          <div class="button">
            <div :class="{accessDe : this.param.e.alarmType === 'doorOpen' ? true : false}">
              <input
                type="text"
                class="note"
                placeholder="备注"
                v-model="remark"
                v-if="isdeal === 0">
              <p
                class="remark"
                v-if="isdeal === 1">{{ remark }}</p>
            </div>
            <Box3
              css="width:2.1rem;height:.7rem;line-height:.7rem;text-align:center;margin-right: .3rem;cursor:pointer;"
              v-if="this.param.e.alarmType === 'doorOpen'"><span
                class="fill"
                @click="lookVideo">查看视频</span></Box3>
            <Box3
              css="width:2.1rem;height:.7rem;line-height:.7rem;text-align:center;"
              :class="{hov: isHover}"
              :is-grag="isHover?false:true">
              <span class="">{{ message }}</span>
              <ul class="reason">
                <li
                  v-for="item in alarmReason"
                  :key="item.index"
                  @click="submit(item)">
                  <span :value="item.type">{{ item.name }}</span>
                </li>
              </ul>
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
import flow from './alarmFlow'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post} from '../../../Utils/Http'
export default {
  name: 'Alarm',
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
      boxwidth: 'width:14.02rem;',
      deviceInfo: {},
      alarmInfo: {},
      alarmReason: [],
      isdeal: '',
      remark: '',
      message: '',
      isHover: false,
      textColor: '',
      alarmflow: '',
      layerStyle: '',
      layerColor: [
        {color: '#ffffff', background: '#FF3C3C'},
        {color: '#000000', background: '#FFF03C'},
        {color: '#000000', background: '#3CCAFF'},
        {color: '#000000', background: '#FF9D3C'}
      ],
      active: 0,
      isColor: false,
      infoAlarmID: ''
    }
  },
  components: {
    pop,
    boxTitle,
    flow
  },
  filters: {
    capitalize (value) {
      if (!value) return '-'
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    getIsLoading () {
      return this.isLoading1 || this.isLoading2
    }
  },
  created () {
    this.alarmflow = this.param.e
    this.isdeal = this.param.e.isDeal
    this.initialize()
  },
  mounted () {
    this.difference()
    this.addInfo()
    console.log(this.param.e)
  },
  methods: {
    difference () {
      /**
         * title——标题信息
         */
      if (this.param.e.alarmTypeName) {
        this.caption = this.param.e.alarmTypeName
      } else {
        if (this.param.e.typeName) {
          this.caption = this.param.e.typeName + '感知'
        }
      }
    },
    addInfo () {
      this.getAlarmInfo()
      this.getdeviceInfo()
      this.getalarmReason()
    },
    initialize () {
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.param.e.alarmID
      reqParam.status = 0
      Post({
        async: false,
        url: apiNames['报警处理'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarm 报警处理')
        }
      })
    },
    getAlarmInfo () {
      console.log(this.param.e)
      if (this.param.e.isDeal === 0) {
        this.param.e.isColorStyle = true
        this.message = '未处理'
        this.isHover = true
      } else if (this.param.e.isDeal === 1) {
        this.isHover = false
        this.remark = this.param.e.processedRemark
        this.message = this.param.e.processedResult
      }
      this.alarmInfo = this.param.e
    },
    getalarmList () {
      //  报警列表
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.param.e.alarmID
      Post({
        async: true,
        url: apiNames['获取报警单条数据'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isColor = true
          if (data.alarm) {
            switch (data.alarm.alarmtate) {
              case 0:
                data.alarm.alarmState = '未处理'
                break
              case 1:
                data.alarm.alarmState = '误报'
                break
              case 2:
                data.alarm.alarmState = '确认'
                break
              case 3:
                data.alarm.alarmState = '解除'
                break
              case 4:
                data.alarm.alarmState = '已受理'
                break
            }
            switch (data.alarm.alarmLevel.toString()) {
              case '1':
                data.alarm.layerStyle = that.layerColor[0]
                break
              case '2':
                data.alarm.layerStyle = that.layerColor[1]
                break
              case '3':
                data.alarm.layerStyle = that.layerColor[2]
                break
              case '4':
                data.alarm.layerStyle = that.layerColor[3]
                break
            }
            let alarmtime = data.alarm.alarmTime
            if (alarmtime) data.alarm.alarmStartTime = that.dispose(alarmtime)
            let endtime = data.alarm.processedTime
            if (endtime) data.alarm.alarmEndTime = that.dispose(endtime)
            that.alarmInfo = data.alarm
            /**
             * box3 红色边框
             */
            if (that.alarmInfo.isDeal === 0) {
              that.alarmInfo.isColorStyle = true
              that.message = '未处理'
              that.isHover = true
            } else if (that.alarmInfo.isDeal === 1) {
              that.isHover = false
              that.remark = that.alarmInfo.processedRemark
              that.message = that.alarmInfo.processedResult
            }
            if (that.alarmInfo.alarmTypeName) {
              that.caption = that.alarmInfo.alarmTypeName
            }
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarm 获取报警列表')
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
          if (data.deviceInfo) {
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
              // s = s.substring(0, s.indexOf('.'))
              // data.deviceInfo.insertTime = s.replace('T', ' ')
              let insertTime = data.deviceInfo.insertTime
              data.deviceInfo.processingTime = that.showtime(insertTime)
            }
            if (data.deviceInfo) {
              if (!data.deviceInfo.power) {
                data.deviceInfo.power = '-'
              }
              that.deviceInfo = data.deviceInfo
            }
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarm 获取设备信息')
        }
      })
    },
    getalarmReason () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmType = this.param.e.alarmType
      Post({
        async: true,
        url: apiNames['获取报警原因'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.alarmReasons) {
            that.alarmReason = data.alarmReasons
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarm 获取报警原因')
        }
      })
    },
    showtime (time) {
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
    dispose: (s) => s.substring(s.indexOf('-') + 1, s.length),
    lookVideo () {
      let e = this.param.e
      window.pop.show({
        level: 3,
        component: () => import('./viewTV'),
        param: {
          level: 3,
          e: e
        }
      })
    },
    submit (item) {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.param.e.alarmID
      reqParam.reasonType = item.type
      reqParam.remark = this.remark
      reqParam.status = 1
      Post({
        async: true,
        url: apiNames['报警处理'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          console.log('事件已处理' + JSON.stringify(reqParam) + JSON.stringify(data))
          that.$bus.emit('/event/afterDealAlarm', reqParam.alarmID)
          that.isHover = false
          that.message = item.name
          that.isdeal = 1
          setTimeout(() => { that.getalarmList() }, 200)
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarm 报警处理')
        }
      })
    }
  }
}
</script>

<style scoped>
  p, li {text-overflow: ellipsis; white-space: nowrap;}
  b {font-weight: normal; }
  ::-webkit-input-placeholder { color:#ffffff75;font-size: .32rem}
  .alarm {padding: .2rem .2rem 0 .2rem; box-sizing: border-box; display: flex; }
  .alarmInfo {float: left; width: 13.36rem; /* position: relative; */ margin-right: .2rem; }
  .alarmBasis ul {overflow: hidden; width: 100%; box-sizing: border-box; padding: .1rem 0; }
  .alarmBasis ul li {float: left; width: 50%; color: #fff; font-size: .32rem; box-sizing: border-box; padding-left: .52rem; line-height: .5rem; }
  /*两个alarmBasis、alarmPolice公用*/
  .call_police li > span {min-width: 1.1rem; display: inline-block; text-align: justify; text-align-last: justify; white-space: nowrap; margin-right: .2rem; box-sizing: border-box; position: relative; color: #a4edfc; }
  .call_police li > span::after {content: ":"; display: inline-block; position: absolute; right: -.1rem; }

  .alarmPolice {margin-top: .2rem; }
  .alarmPolice ul {overflow: hidden; width: 100%; box-sizing: border-box; padding: .1rem 0; }
  .alarmPolice ul li {float: left; width: 50%; color: #fff; font-size: .32rem; box-sizing: border-box; padding-left: .52rem; line-height: .48rem; }
  .alarmPolice .rel_waring_top {overflow: hidden; display: block; position: absolute; top: 2px; right: 1px; }
  .alarmPolice .rel_waring_top p {display: inline-block; float: right; line-height: .32rem; padding: .1rem; overflow: hidden; position: relative; font-size: .22rem; font-weight: bold; text-align: center; background: #3cc3ff; color: #ff0000; margin: 1px 0; background: #3cc3ff; /*background: linear-gradient(45deg, transparent .08rem, #3cc3ff 0);*/ }
  .alarmPolice .rel_waring_top p::before {content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 0; border-height: .65rem; border-style: solid; border-color: transparent transparent #091428 #091428; }
  .alarmPolice .alarmProcessing .left3_ul li.active {background-color: #2293ad; border: solid 1px #00d4ff; box-sizing: border-box; }
  .alarmProcessing {margin-top: .2rem;box-sizing: border-box; font-size: .32rem;}
  .alarmProcessing .button{float: right;display: flex;margin-top: .1rem;position: relative}
  .alarmProcessing .button .fill{position:absolute;top:0;left:0;bottom:0;right:0;}
  .alarmProcessing .button .note{margin-right: .3rem;background: #1b4c95;border: 1px solid #acacac53;color: #fff;width: 10.97rem /*8.57rem*/;height: .7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .32rem;}
  .alarmProcessing .button .remark{margin-right: .3rem;background: none;border: 1px solid #acacac22;color: #fff;width: 10.97rem /*8.57rem*/;height: .7rem;line-height:.7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .32rem;}
  .alarmProcessing .button .accessDe .note{margin-right: .3rem;background: #1b4c95;border: 1px solid #acacac53;color: #fff;width: 8.57rem;height: .7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .32rem;}
  .alarmProcessing .button .accessDe .remark{margin-right: .3rem;background: none;border: 1px solid #acacac22;color: #fff;width: 8.57rem;height: .7rem;line-height:.7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .32rem;}
  .alarmProcessing .button .hov{cursor:pointer;}
  .alarmProcessing .button .hov:after {border: solid transparent; content: ''; right: .3rem; top: .3rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-right-color: #31f1fe; }
  .alarmProcessing .button .hov:hover:after{border: solid transparent; content: ''; right: .25rem; top: .34rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-top-color: #31f1fe; }
  .alarmProcessing .button .reason{display: none;text-align: center; position: absolute; width: 2.1rem; top: .7rem; right: 0; z-index: 1; background: #101215c7; }
  .alarmProcessing .button .hov:hover .reason{display: block}
  ul.reason li{font-size: .32rem;color: #befefe; background: #102044; margin-top: .06rem;text-align: center; line-height: .55rem; border-left: 1px solid #3cc3ff; border-right: 1px solid #3cc3ff; box-sizing: border-box; }
  ul.reason li span{position: relative;}
  ul.reason li:hover{background: #254a9f; }
</style>
