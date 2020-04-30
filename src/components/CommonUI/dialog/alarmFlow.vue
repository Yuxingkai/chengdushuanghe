<template>
  <div id="flowChart">
    <div class="alarmChart"> <!---->
      <ul
        class="flowChart"
        v-for="(item,index) in alarmFlowList.flows"
        :key="item.id">
        <li
          class="process will"
          v-if="index === (currentFlowNo3 + 1) || index === (currentFlowNo3 + 2)"><img :src="imgurl[0]"></li><!--未启动-->
        <li
          class="process"
          v-if="index === currentFlowNo3"><img :src="imgurl[1]"></li><!--启动中-->
        <li
          class="process over"
          v-if="index === (currentFlowNo3 - 1) || index === (currentFlowNo3 - 2)"><img :src="imgurl[2]"></li><!--启动完成-->
        <div class="message">
          <p
            :class="{'active': index === 0 || index === 1 || index === currentFlowNo3 }"
            class="alarmTitle">{{ item.name }}</p>
          <p class="alaemDiscription" >{{ item.duty }}</p>
        </div>
      </ul>
    </div>
    <aside>
      <h4 :class="{ 'wipe1' : wipe === true }"><b>责任人</b><b>联系方式</b><b>报警状态</b><b>催办</b></h4>
      <ul
        :class="{ 'wipe' : wipe === true }"
        class="principal">
        <happy-scroll
          resize
          size="3"
          hide-horizontal
          style="height:2.68rem">
          <li
            v-for="item in alarmFlowList.flows[0].users"
            :key="item.id"><b>{{ item.name }}</b><b>{{ item.phone }}</b><b>接收</b><b class="rush"><img
              @click="reminder(item.phone)"
              src="../../../assets/images/alarmFlow/rush.png"
              :class="{gray: item.position.length > 0}"></b></li>
        </happy-scroll>
      </ul>
    </aside>
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
      default: 0
    }
  },
  data () {
    return {
      parameter: {},
      alarmFlowList: [],
      currentFlowNo: '',
      currentFlowNo3: '',
      imgurl: [require('../../../assets/images/icon/unstart.svg'), require('../../../assets/images/icon/started.svg'), require('../../../assets/images/icon/complete.png')],
      wipe: false
    }
  },
  mounted () {
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.addInfo()
    this.$bus.on('/event/afterDealAlarm', (e) => {
      this.addInfo()
      console.log(e)
    })
  },
  methods: {
    addInfo () {
      this.getalarmFlow()
      this.getCurrentFlowNo()
    },
    getalarmFlow () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.alarmflow.alarmID
      Post({
        async: true,
        url: apiNames['获取报警推送流程'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.flows) {
            that.alarmFlowList = data
            console.log(JSON.stringify(that.alarmFlowList))
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarmFlow 获取报警推送流程')
        }
      })
    },
    getCurrentFlowNo () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.alarmflow.alarmID
      Post({
        async: true,
        url: apiNames['获取当前推送流程'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data) {
            that.currentFlowNo3 = data.currentFlowNo
            // if (that.currentFlowNo === 2) that.currentFlowNo3 = 1
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarmFlow 获取当前推送流程')
        }
      })
    },
    reminder (phoneNo) {
      let reqParam = user.getRequestHeader()
      // reqParam.alarmID = '09f68450288a11ea9125e9738d3d7c54'
      // reqParam.alarmType = 'doorOpen'
      // reqParam.address = '测试地址'
      // reqParam.alarmTime = '2019-09-03 03:30:00'
      // reqParam.phoneNo = '18862877559'
      reqParam.alarmID = this.alarmflow.alarmID
      reqParam.alarmType = this.alarmflow.alarmType
      reqParam.address = this.alarmflow.address
      reqParam.alarmTime = this.alarmflow.alarmTime
      reqParam.phoneNo = phoneNo
      Post({
        async: true,
        url: apiNames['催办'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data) {
            this.$newnotify({
              titleName: '已催办',
              content: '已通知催办',
              autoClose: 3000
            })
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarmFlow 获取当前推送流程')
        }
      })
    }
  }
}
</script>

<style scoped>
b{font-weight: normal; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}
.alarmChart{display: flex;display: -webkit-flex;padding: .08rem .05rem}
.alarmChart .flowChart{background: #2e4a6ac4;height: 1.7rem;width: 100%;padding-top: .12rem}
.alarmChart .flowChart .process {text-align: center; background: #264060; z-index: 2; font-size: 0; position: relative;height: .5rem;line-height: .5rem; position: relative}
.alarmChart .flowChart:not(:first-child) .process::after{content: "";background: #31f1fe;height: .02rem;width: 84%;position: absolute;top:50%;left:-43%;display: block}
.alarmChart .flowChart .process > img {width: .5rem; height: .5rem; vertical-align: middle;}
.alarmChart .flowChart .over > img{width: .34rem; height: .34rem;}
.alarmChart .flowChart .will > img{width: .3rem; height: .3rem;}
.alarmChart .flowChart .message{text-align: center;}
.alarmChart .flowChart .message .alarmTitle{font-size: .32rem;background: #f5b94585;color:#c1c1c1;padding: .02rem .28rem;display: inline-block;margin: .1rem auto .1rem}
.alarmChart .flowChart .message .alaemDiscription{font-size: .24rem;}
#flowChart aside{padding: 0 .2rem;overflow: hidden;}
#flowChart aside h4,#flowChart aside .principal li{display: flex;display: -webkit-flex;font-size: .32rem}
#flowChart aside h4 b,#flowChart aside .principal li b{flex: 1;text-align: center}
#flowChart aside h4{color:#a4edfc;padding: .2rem 0}
#flowChart aside .principal li{padding: .1rem 0}
#flowChart aside .principal li:nth-child(2n+0){background: #a4edfc33;}
#flowChart aside .principal li .rush>img{width: .36rem;height: .36rem}
.gray{-webkit-filter: grayscale(100%); -moz-filter: grayscale(100%); -ms-filter: grayscale(100%); -o-filter: grayscale(100%); filter: grayscale(100%); filter: gray; }
.active {background: #f5b945 !important;color: #fff !important;}
  .wipe1{width: 103%}
</style>
