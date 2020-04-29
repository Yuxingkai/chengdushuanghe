<template>
  <pop
    :css="boxwidth"
    :title="alarmName"
    :level="param.level"
    footer="display:none"
    over-flow="false">
    <div class="alarm">
      <div>
        <div class="process">
          <div>
            <div class="alarmLeft_1">
              <boxTitle title="异常处理"/>
              <div
                class="firstText"
                style="width: 100%;display: flex">
                <div style="width: 4rem">
                  <div>异常时间</div>
                  <div style="margin-top: .2rem">{{ deviceOpsList[0].alarmTime || '-' }}</div>
                </div>
                <div style="width: 2rem">
                  <div>设备位置</div>
                  <div style="margin-top: .2rem">{{ alarmflow.installAdd || '-' }}</div>
                </div>
                <div style="width: 2rem">
                  <div>异常类型</div>
                  <div style="margin-top: .2rem">{{ deviceOpsList[0].opsTypeName || '-' }}</div>
                </div>
                <div style="width: 2rem">
                  <div>处理人</div>
                  <div style="margin-top: .2rem">-</div>
                </div>
                <div style="width: 2rem">
                  <div>异常状态</div>
                  <div style="margin-top: .2rem">{{ alarmflow.state === 1 ? '正常' : '' }}</div>
                </div>
                <!--<div style="flex: 1">-->
                <!--<div>是否催办</div>-->
                <!--<div style="margin-top: .2rem">-->
                <!--<img-->
                <!--style="width: .36rem"-->
                <!--src="../../../assets/bell.png"-->
                <!--alt="">-->
                <!--</div>-->
                <!--</div>-->
              </div>
            </div>
            <div class="alarmLeft_2">
              <boxTitle title="设备信息"/>
              <div>
                <div style="margin-top: .2rem;">
                  <div class="info_2">
                    <ul>
                      <li><b>设备姓名:</b><b>{{ deviceInfo.name || '-' }}</b></li>
                      <li><b>设备编号:</b><b>{{ deviceInfo.productCode || '-' }}</b></li>
                      <li><b>设备位置:</b><b>{{ deviceInfo.installAdd || '-' }}</b></li>
                      <li><b>设备品牌:</b><b>{{ deviceInfo.prducetBrand || '-' }}</b></li>
                      <li><b>设备编号/序号:</b><b>{{ deviceInfo.productCode || '-' }}</b></li>
                    </ul>
                    <ul>
                      <li><b>设备类型:</b><b>{{ deviceInfo.typeName || '-' }}</b></li>
                      <li><b>安装时间:</b><b>{{ deviceInfo.installTime || '-' }}</b></li>
                      <li><b>过保时间:</b><b>{{ deviceInfo.expireTime || '-' }}</b></li>
                      <li><b>设备型号:</b><b class="icondinbold">{{ deviceInfo.productModel || '-' }}</b></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="alarmProcessing">
          <boxTitle
            title="异常记录"
            css="font-size:.32rem"/>
          <div style="width: 100%">
            <div class="listsHeader">
              <div style="flex: 1;">异常时间</div>
              <div style="flex: 1;">修复时间</div>
              <div style="flex: 1;">修复时长</div>
              <div style="width: 2rem;">异常类型</div>
              <div style="width: 2rem;">处理人</div>
            </div>
            <div class="listsContent">
              <div
                @mousewheel="handleScroll"
                ref="alllist"
                style="overflow-y: scroll;width: 104%;height: 100%">
                <div
                  class="listContent"
                  :class="index % 2 !== 0 ? 'lineBackground' : ''"
                  :key="index"
                  v-for="(i,index) in deviceOpsList">
                  <div style="flex: 1;">
                    {{ i.alarmTime || '-' }}
                  </div>
                  <div style="flex: 1;">{{ i.processedTime || '-' }}</div>
                  <div style="flex: 1;">{{ timeBetween(i.processedTime, i.alarmTime) }}</div>
                  <div style="width: 2rem;">{{ i.opsTypeName || '-' }}</div>
                  <div style="width: 2rem;">-</div>
                </div>
              </div>
            </div>
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
  name: 'UnusualDevice',
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
      boxwidth: 'width:19.2rem;',
      alarmName: '设备异常记录',
      active: 0,
      peopleInfo: {},
      alarmReason: [],
      alarmflow: '',
      isdeal: '',
      remark: '',
      message: '',
      messageList: '',
      isHover: false,
      isMask: true,
      functionList: [],
      inputClickInfo: false,
      deviceInfo: {},
      deviceOpsList: [],
      pageNum: 1,
      pageSize: 20,
      bol: true
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
    },
    splitPhoto (value) {
      let aa = require('../../../assets/images/photoDefault.png')
      if (!value) {
        value = aa
      }
      return value
    },
    alarmStateChina (value) {
      switch (value) {
        case 0:
          return '未处理'
        case 1:
          return '误报'
        case 2:
          return '确认'
        case 3:
          return '解除'
        case 4:
          return '已受理'
      }
    }
  },
  created () {
    this.alarmflow = this.param.e
    this.isdeal = this.param.e.isDeal
    this.getDeviceInfo(this.param.e.deviceID)
    this.getDeviceOpsList()
  },
  mounted () {
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let videoMask = this.functionList.find((item) => { return item.functionCode === 'mask_picture' })
    if (videoMask === undefined) {
      this.isMask = true
    } else {
      this.isMask = false
    }
  },
  methods: {
    timeBetween (processedTime, alarmtime) {
      if (processedTime) {
        let pTime = new Date(processedTime)
        let aTime = new Date(alarmtime)
        let minustime = pTime - aTime
        let newTime = new Date(minustime)
        let hour = newTime.getHours()
        return hour
      } else {
        return '-'
      }
    },
    handleScroll () {
      if (this.$refs.alllist.scrollTop + this.$refs.alllist.clientHeight >= this.$refs.alllist.scrollHeight) {
        console.log('请求数据')
        this.pageNum++
        this.bol = true
        this.getDeviceOpsList()
      }
    },
    getDeviceOpsList () {
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      reqParam.pageNum = this.pageNum
      reqParam.pageSize = this.pageSize
      if (this.bol) {
        Post({
          async: true,
          url: apiNames['获取设备运维列表'],
          data: reqParam,
          dataType: 'json',
          success: (data) => {
            if (data.deviceOpsList) {
              this.deviceOpsList = this.deviceOpsList.concat(data.deviceOpsList)
              this.bol = false
            } else {
              this.deviceOpsList = []
              this.bol = false
            }
          },
          error: function (err) {
            console.log(JSON.stringify(err) + '获取设备信息')
          }
        })
      }
    },
    getDeviceInfo (deviceID) {
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = deviceID
      Post({
        async: true,
        url: apiNames['获取设备信息'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.deviceInfo) {
            this.deviceInfo = data.deviceInfo
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-viewTV 获取设备信息')
        }
      })
    }
  },
  watch: {}
}
</script>

<style scoped>
  .firstText {
    font-size: .32rem;
    font-family:PingFangSC-Medium;
    color:rgba(220,246,255,1);
  }
  .listContent {
    display: flex;
    height: .72rem;
    font-size: .32rem;
    font-family:PingFangSC-Semibold;
    color:rgba(220,246,255,1);
    background:rgba(19,32,74,1);
    text-align: left;
    line-height: .72rem;
    padding-left: .2rem;
  }
  .lineBackground {
    background: #1e2e62;
  }
  .listsContent {
    height: 4.65rem;
    overflow: hidden;
    margin-top: .1rem;
  }
  .listsHeader {
    padding-left: .2rem;
    display: flex;
    height: .72rem;
    font-size: .36rem;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    color:rgba(196,241,255,1);
    text-align: left;
    line-height: .72rem;
    background: #1e2e62;
  }
  b {font-weight: normal; }
  li {text-overflow: ellipsis; white-space: nowrap; }
  .alarm {padding: .2rem .2rem .06rem; box-sizing: border-box; display: flex; }
  .process {display: flex; }
  .alarmLeft_1 ul {overflow: hidden; width: 100%; box-sizing: border-box;margin: .1rem 0; padding: 0 .4rem; }
  .alarmLeft_2 {margin-top: .1rem; }
  .info_2 {display: flex;  background: url("../../../assets/images/listbg.png");background-size: .2rem .2rem;}
  .info_2 ul {overflow: hidden; box-sizing: border-box; padding: .1rem 0; }
  .info_2 ul:first-child {width: 50%; }
  .info_2 ul:nth-of-type(2) {width: 50%;}
  .info_2 ul:nth-of-type(3) {width: 50%; }
  .info_2 ul li {float: left;font-size: .28rem;width: 100%;color: #DCF6FF;box-sizing: border-box;padding-left: .52rem;line-height: .48rem;margin-bottom: .1rem;}
  .info_2 ul li b:nth-of-type(1) {text-align: right; display: inline-block; margin-right: .3rem; font-weight: normal;position: relative;text-align: justify;text-align-last: justify;}
  .info_2 ul li b:nth-of-type(1)::after{content: ''; position: absolute;top:0; right: -.14rem;}
  .info_2 ul li b:nth-of-type(2) {font-weight: normal; }
  .personalImg {width: 2.5rem; height: 2.5rem; padding: .1rem; box-sizing: border-box; }
  .alarmProcessing .left3_ul li.active {background-color: #2293ad; border: solid 1px #00d4ff; box-sizing: border-box; }
  .alarmProcessing {margin-top: .2rem;box-sizing: border-box; font-size: .28rem;}
  .alarmProcessing .button{float: right;display: flex;margin-top: .1rem;position: relative}
  .alarmProcessing .button .note{margin-right: .3rem;background: #1F2F64;border: none;color: #48B4FF;width: 10.97rem /*8.57rem*/;height: .7rem;margin-top: .05rem;padding: 0 1.8rem 0 .2rem;box-sizing: border-box;font-size: .28rem;}
  .alarmProcessing .button .smallInput {width: 10.97rem }
  .alarmProcessing .button .remark{margin-right: .3rem;background: none;border: 1px solid #acacac22;color: #fff;width: 10.97rem /*8.57rem*/;height: .7rem;line-height:.7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .28rem;}
  .alarmProcessing .button .hov{cursor:pointer;}
  .alarmProcessing .button .hov:after {border: solid transparent; content: ''; right: .3rem; top: .3rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-right-color: #31f1fe; }
  .alarmProcessing .button .hov:hover:after{border: solid transparent; content: ''; right: .25rem; top: .34rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-top-color: #31f1fe; }
  .alarmProcessing .button .reason{display: none;text-align: center; position: absolute; width: 2.1rem; top: .7rem; right: 0; z-index: 1; background: #101215c7; }
  .alarmProcessing .button .hov:hover .reason{display: block}
  ul.reason li{font-size: .28rem;color: #befefe; background: rgba(19,32,74,0.9); margin-top: .06rem;text-align: center; line-height: .55rem; border-left: 1px solid #3cc3ff; border-right: 1px solid #3cc3ff; box-sizing: border-box; }
  ul.reason li span{position: relative;}
  ul.reason li:hover{background: #5564FF; }
  #alarmFlow { background: url("../../../assets/images/popUpImg/buttonBg_big.png") no-repeat center;background-size: 100% 100%;height: 6.3rem}
  .fastInfoUl {position: absolute;background: #13204A;width:10.97rem; }
  .fastInfoUl li {font-size: .32rem;color: #befefe; background: rgba(19,32,74,0.9); margin-top: .06rem;text-align: left; line-height: .6rem; box-sizing: border-box; cursor: pointer;padding-left: .2rem;}
  .fastInfoUl li:hover{background: #5564FF; }
  input::-webkit-input-placeholder {color: #5067B2;}
  .postButton{width:1.7rem;height:.7rem;line-height:.7rem;text-align:center;margin-right: .3rem;cursor:pointer;margin-top: .05rem;position: absolute;right: 0;}
  .postButton:before {width: 2px;height: .4rem;content: '';position: absolute;left: 0;top: 50%;transform: translateY(-50%);background:#befefe;}
</style>
