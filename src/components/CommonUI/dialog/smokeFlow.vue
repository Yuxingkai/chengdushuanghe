<template>
  <div>
    <div
      class="countdown"
      v-if="disposal === 0"><b>倒计时</b><b>{{ startTime }}</b></div>
    <div
      v-if="disposal === 1"
      class="over">已处理</div>
    <div
      v-if="disposal === 2"
      class="without">未处理</div>
    <div class="content">
      <div
        v-for="(state,index) in states"
        :key="state.id"
        class="flowChart">
        <div class="flowBox">
          <div
            class="process medium"
            v-if="index === currentFlowNo + 1 || index === currentFlowNo + 2">
            <img :src="imgurl[0]"> <!--未启动-->
          </div>
          <div
            class="process"
            v-if="index === currentFlowNo ">
            <img :src="imgurl[1]"> <!--启动中-->
            <span
              class="reading-text"
              :class="{centerLeft: currentFlowNo === 1}">{{ stateing }}</span>
          </div>
          <div
            class="process small"
            v-if="index === currentFlowNo - 1 || index === currentFlowNo - 2">
            <img :src="imgurl[2]"> <!--启动完成-->
          </div>
          <div class="answer">
            <p
              :class="{'active': index === currentFlowNo || index === (currentFlowNo >= 1 ? 0 : '') || index === (currentFlowNo === 2 ? 1 : '')}"
              @click="switchStage(index)">{{ state.name }}</p>
            <p :class="{'smallarrow': index === switchStageNum}"/>
            <!--<p><span>{{state.duty}}</span></p>-->
            <!--<p v-show="index === currentFlowNo">责任人</p>-->
          </div>
        </div>
      </div>
      <ul class="start">
        <li
          v-for="(item,index) in start"
          :key="item.id"
          @click.once="manual(index)">
          <button
            type="button"
            :disabled="item.isDis">{{ item.text }}</button>
        </li>
      </ul>
    </div>
    <ul
      class="duty"
      v-for="(users,index) in states"
      :key="users.id"
      v-if="index === (switchStageNum.length !== 0 ? switchStageNum : currentFlowNo)">
      <div class="common passage">
        <b/>
        <b>姓名</b>
        <b>手机号码</b>
        <b>职务</b>
        <b>职责</b>
        <!--<b>处理状态</b>-->
      </div>
      <div :class="{ 'wipe' : wipe === true }">
        <happy-scroll
          resize
          size="3"
          hide-horizontal
          style="height:2.1rem">
          <li
            v-for="item in users.users"
            :key="item.id"
            class="common passage">
            <b><img
              src="../../../assets/images/nationalEmblem.png"
              alt=""></b>
            <b :title="item.name">{{ item.name }}</b>
            <b :title="item.phone">{{ item.phone }}</b>
            <b :title="item.position">{{ item.position }}</b>
            <b :title="users.duty">{{ users.duty }}</b>
            <!--<b>未处理</b>-->
          </li>
        </happy-scroll>
      </div>
    </ul>
  </div>
</template>

<script>
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post} from '../../../Utils/Http'
export default {
  name: 'FlowChart',
  props: {
    alarmflow: {
      type: Object,
      default: () => {
        return {}
      }
    },
    phaseNum: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data () {
    return {
      switchStageNum: '',
      timer: '',
      timerFlow: '',
      show: 3,
      states: [],
      currentFlowNo: '',
      disposal: 0,
      startTime: '00:00:00',
      imgurl: [require('../../../assets/images/icon/unstart.svg'), require('../../../assets/images/icon/start.svg'), require('../../../assets/images/icon/started.svg')],
      stateing: '启动',
      noticecolor: ['color:red', 'color:#05ffa8'],
      start: [
        {text: '手动启动', isDis: true},
        {text: '手动启动', isDis: true}
      ],
      flowno: '',
      wipe: false
    }
  },
  filters: {
    conversion (value) {
      value = Number(value)
      if (value === 0) {
        return '未处理'
      } else if (value === 1) {
        return '确认'
      }
    }
  },
  mounted () {
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.addInfo()
    let aPicUrl = []
    let vilId = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
    if (localStorage.getItem('fire_publicSave' + vilId)) {
      // '
    } else {
      aPicUrl.push(this.getLikeBusinessType('fire_publicSave'))
      localStorage.setItem('fire_publicSave' + vilId, aPicUrl)
    }
    this.$bus.emit('/event/alarmFlowNum', this.currentFlowNo)
    if (this.alarmflow.isDeal === 1) this.disposal = 1
    if (this.alarmflow.isDeal === 2) this.disposal = 2
    // if (this.currentFlowNo === 2) this.disposal = 2
    this.$bus.on('/event/somkeAlarmFlow', (e) => { this.disposal = 1 })
  },
  methods: {
    addInfo () {
      this.getCurrentFlowNo()
      this.alarmFlowChart()
    },
    getCurrentFlowNo () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.alarmflow.alarmID
      /**
       * 获取当前流程阶段
       */
      Post({
        async: false,
        url: apiNames['获取当前推送流程'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data) {
            that.currentFlowNo = data.currentFlowNo
            if (that.currentFlowNo >= 2) {
              that.currentFlowNo = 2
            }
            if (that.alarmflow.isDeal === 0 && that.start && (that.currentFlowNo <= 1)) that.start[that.currentFlowNo].isDis = false
            if (that && !that._isDestroyed && that.alarmflow.isDeal === 0) {
              this.dispatch = setTimeout(() => {
                that.getCurrentFlowNo()
              }, 2000)
            }
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smokeFlow 获取当前推送流程')
        }
      })
    },
    updateAlarmCurrentFlow (num) {
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.alarmflow.alarmID
      reqParam.flowNo = num
      this.$bus.emit('/event/upDataAlarmFlowNum', num)
      /**
       * 获取当前流程阶段
       */
      Post({
        async: true,
        url: apiNames['更新报警当前推送流程'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          console.log(JSON.stringify(data))
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smokeFlow 获取当前推送流程')
        }
      })
      if (this.currentFlowNo === 2) this.resetTime(this.states[this.currentFlowNo].countdown)
    },
    alarmFlowChart () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.alarmflow.alarmID
      /**
       * 报警推送流程图——中间流程接口
       */
      Post({
        async: true,
        url: apiNames['获取报警推送流程'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.flows) {
            for (let i = 0; i < data.flows.length; i++) {
              let s = data.flows[i].startTime
              data.flows[i].startTimeDeal = s.substring(s.indexOf(' ') + 1, s.length)
            }
            that.states = data.flows
            if (that.currentFlowNo < 2 && that.alarmflow.isDeal === 0) that.resetTime(that.states[that.currentFlowNo].countdown)
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smokeFlow 获取报警推送流程')
        }
      })
    },
    resetTime (time) {
      clearInterval(this.timer)
      this.startTime = '00:00:00'
      this.timer = null
      let t = time
      let m = 0
      let s = 0
      m = Math.floor(t / 60 % 60)
      m < 10 && (m = '0' + m)
      s = Math.floor(t % 60)
      let that = this
      let countDown = () => {
        s--
        s < 10 && (s = '0' + s)
        if (s.length >= 3) {
          s = 59
          m = '0' + (Number(m) - 1)
        }
        if (m.length >= 3) {
          m = '00'
          s = '00'
          clearInterval(that.timer)
          this.manual(this.currentFlowNo)
        }
        // console.log('00:' + m + ':' + s)
        that.startTime = '00:' + m + ':' + s
      }
      that.timer = setInterval(countDown, 1000)
    },
    manual (index) {
      this.updateAlarmCurrentFlow(index + 1)
      this.getCurrentFlowNo()
      if (index === 0) {
        this.start[0].isDis = true
        this.start[1].isDis = false
      } else if (index === 1) {
        this.start[0].isDis = true
        this.start[1].isDis = true
      }
    },
    getLikeBusinessType (businessType) {
      let reqParam = user.getRequestHeader()
      let picUrl = ''
      reqParam.businessID = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.businessType = businessType
      Post({
        async: false,
        url: apiNames['获取消防图片'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.responseStatus.resultCode === 0) {
            picUrl = data.resources[0].filePath
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err))
        }
      })
      return picUrl
    },
    switchStage (index) {
      if (index <= this.currentFlowNo) {
        this.switchStageNum = index
        this.$bus.emit('/event/upDataAlarmFlowNum', index)
      }
      if (index === 0) {
        let aPicUrl = []
        let vilId = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
        if (localStorage.getItem('fire_selfSave' + vilId)) {
          this.$bus.emit('/event/fromSmokeFlow1', localStorage.getItem('fire_selfSave' + vilId))
        } else {
          aPicUrl = []
          for (let i = 1; i < 7; i++) {
            aPicUrl.push(this.getLikeBusinessType('fire_selfSave_' + i))
          }
          localStorage.setItem('fire_selfSave' + vilId, aPicUrl)
          this.$bus.emit('/event/fromSmokeFlow1', aPicUrl)
        }
      }
      if (index === 1) {
        let aPicUrl = []
        let vilId = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
        if (localStorage.getItem('fire_otherSave' + vilId)) {
          this.$bus.emit('/event/fromSmokeFlow2', localStorage.getItem('fire_otherSave' + vilId))
        } else {
          aPicUrl = []
          aPicUrl.push(this.getLikeBusinessType('fire_otherSave'))
          localStorage.setItem('fire_otherSave' + vilId, aPicUrl)
          this.$bus.emit('/event/fromSmokeFlow2', aPicUrl)
        }
      }
      if (index === 2) {
        let aPicUrl = []
        let vilId = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
        if (localStorage.getItem('fire_publicSave' + vilId)) {
          this.$bus.emit('/event/fromSmokeFlow3', localStorage.getItem('fire_publicSave' + vilId))
        } else {
          aPicUrl = []
          aPicUrl.push(this.getLikeBusinessType('fire_publicSave'))
          localStorage.setItem('fire_publicSave' + vilId, aPicUrl)
          this.$bus.emit('/event/fromSmokeFlow3', aPicUrl)
        }
      }
    }
  },
  computed: {

  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    this.getCurrentFlowNo()
    next()
  }
}
</script>

<style scoped>
  b {font-weight: normal; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  i {font-style: normal }
  /*倒计时*/
  .countdown{color:#f54545;font-weight: bold;height: .5rem;text-align: center;padding:.1rem;font-size: .4rem;}
  .countdown>span{display: block;text-align: center;padding-top: .05rem}
  .countdown b:first-child{font-weight: bold;}
  .countdown b:last-child{font-weight: bold;margin-left: .3rem;}
  /*结束倒计时*/
  .over{color:#06f4a4;font-weight: bold;height: .5rem;text-align: center;padding:.1rem;font-size: .4rem;}
  .without{color:#ff0000;font-weight: bold;height: .5rem;text-align: center;padding:.1rem;font-size: .4rem;}
  /*中间样式布局*/
  .content {max-width: 100%; position: relative; display: flex; display: -webkit-flex; justify-content: space-between; padding: 0; box-sizing: border-box; margin: 0 .36rem;}
  .content > div {width: 100%;position: relative; text-align: center;}
  .content .process {text-align: center; z-index: 2; font-size: 0; display: inline-block; position: relative;width: .8rem;height: .8rem;line-height: .8rem; }
  .content .flowChart:not(:first-child) .process::after{content: "";background: #31f1fe;height: .02rem;width:534%;position: absolute;top:50%;left:-537%;display: block}
  .content .flowChart .flowBox{width: 2.7rem;}
  .content .flowChart:nth-of-type(2) .flowBox{margin: 0 auto;}
  .content .flowChart:nth-of-type(3) .flowBox{float:right}
  .content .process > img {width: .8rem; height: .8rem; vertical-align: middle;}
  .content .medium > img {width: .38rem; height: .38rem; }
  .content .small > img {width: .28rem; height: .28rem; }
  .content .process span {line-height: .32rem; width: .18rem; color: #45f5cc; position: absolute; left: 34%; top: 8%;font-size: .24rem;transform: scale(.8, .8); }
  .content .process span.centerLeft{left:38%}
  .content .line {opacity: .5; background: #31f1fe; position: absolute; left: 13%; width: 71.5%; height: 0.02rem; top: 0.42rem; }
  /*火警流程——黄色框内容*/
  .content .answer {font-size: 0.32rem;text-align: center; white-space: nowrap; margin: 0 0.6rem; position: relative; }
  .content .answer p:nth-of-type(1) {color: #000000; background: #f5b94585; padding: 0.04rem 0.14rem; display: inline-block; border-radius: 0.04rem; }
  .content .answer p:nth-of-type(2) span {display: inline-block;color: #a4edfc; margin-top: 0.12rem; border: solid 0.02rem #f5b94594; padding: 0.12rem 0.18rem 0.14rem; border-radius: 0.02rem; position: relative; }
  .content .answer p:nth-of-type(2) span::before {content: ""; background: #f5b945; width: 0.08rem; height: 0.28rem; position: absolute; left: 0; top: 0.2rem; }
  .content .answer p:nth-of-type(2) span::after {content: ""; background: #f5b945; width: 0.08rem; height: 0.28rem; position: absolute; right: 0; top: 0.2rem; }
  .content .answer p:nth-of-type(3) {margin-top: .2rem;margin-bottom:.1rem}
  .content .answer p:nth-of-type(4) {color: #31fed7; font-size: .32rem;margin-top: .1rem}
  .content .answer p:nth-of-type(4) b {margin: 0 0.1rem; }
  .content .answer > p.active {background: #f5b945;cursor: pointer;}
  .phone_icon {background: url("../../../assets/images/icon/phone.png") no-repeat;width: .4rem;height: .4rem;display: inline-block;vertical-align: middle}
  .content .answer p:nth-of-type(5) {color: #a4edfc; font-size: .32rem; margin: .1rem; }
  .content .answer p:nth-of-type(5) > i {color: #31f1fe; font-size: .24rem; margin: .1rem; padding: .01rem .1rem; border: 1px solid #31f1fe52; position: relative; }
  .content .answer p:nth-of-type(5) > i::before {content: ""; position: absolute; left: -1px; top: 41%; background: #071225; width: 2px; height: 3.9px; }
  .content .answer p:nth-of-type(5) > i::after {content: ""; position: absolute; right: -1px; top: 41%; background: #071225; width: 2px; height: 3.9px; }
  .content .answer p:nth-of-type(6) {font-size: .32rem; font-weight: bold; color: #f54545; }
  .content .start{position: absolute;z-index: 3;top:.2rem;font-size: 0;}
  .content .start li{float: left;background: #31f1fe;margin-left: 3.3rem;color:#000;}
  .content .start li>button{font-weight: bold;background: #31f1fe;padding:.03rem .16rem .04rem;font-size: .24rem;border-radius: .03rem;cursor: pointer;border: 0;}
  :focus{outline: 0;}
  .content .start li:last-child{margin-left: 3.6rem;}
  .duty{/*margin: .5rem 0 .02rem .86rem;*/margin-top:.2rem;font-size: .32rem;overflow: hidden;}
  .duty li{margin-bottom: .04rem;}
  .smallarrow::after{content: "";position: absolute;bottom: -.24rem;left: 37%;border-width:.2rem;border-style:solid;border-color:transparent transparent orangered transparent; }
  /* 表格化样式 */
  .common {color: #a4edfc; padding: .13rem .14rem; box-sizing: border-box; white-space: nowrap; font-size: 0.32rem;}
  .common > b {margin-right: 0.1rem; }
  li.passage {color: #fff; }
  .passage {display: flex; justify-content: space-between; padding-left: 0.04rem; padding-right: 0.2rem; width:auto; margin-left: 0.16rem; }
  .passage > b {flex: 2; text-align: center; }
  .passage > b img {height:.4rem;}
  .passage > b:nth-of-type(1) {flex: 2; }
  .passage > b:nth-of-type(2) {flex: 4; }
  .passage > b:nth-of-type(3) {flex: 4; }
  .passage > b:nth-of-type(4) {flex: 8; }
  .passage > b:nth-of-type(5) {flex: 8; }
  .passage > b:nth-of-type(6) {flex: 4; }
</style>
