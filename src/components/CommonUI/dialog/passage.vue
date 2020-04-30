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
              <boxTitle title="报警信息"/>
              <div>
                <Box3 css="">
                  <ul class="info_1">
                    <li :title="peopleInfo.modelName"><b>报警类型：</b><b>{{ alarmflow.alarmTypeName | capitalize }}</b></li>
                    <li :title="peopleInfo.alarmTime"><b>报警时间：</b><b>{{ peopleInfo.alarmTime | capitalize }}</b></li>
                    <li :title="peopleInfo.residenceDetailAddress"><b>居住信息：</b><b>{{ peopleInfo.residenceAddress | capitalize }}</b></li>
                    <li :title="peopleInfo.isDeal"><b>报警状态：</b><b>{{ peopleInfo.state | alarmStateChina }}</b></li>
                  </ul>
                </Box3>
              </div>
            </div>
            <div class="alarmLeft_2">
              <boxTitle title="身份信息"/>
              <div>
                <Box3 css="">
                  <div class="info_2">
                    <ul style="position:relative;">
                      <Box3 css="height:3rem;width:2.5rem;position:absolute;top:.1rem;left:.2rem;">
                        <img
                          :class="{testDiv : isMask === true && peopleInfo.headPic !== ''}"
                          :src="peopleInfo.headPic | splitPhoto"
                          alt=""
                          class="personalImg">
                      </Box3>
                    </ul>
                    <ul>
                      <li><b>姓名</b><b>{{ peopleInfo.peopleName | capitalize }}</b></li>
                      <li><b>名族</b><b>{{ peopleInfo.nation | capitalize }}</b></li>
                      <li><b>学历</b><b>{{ peopleInfo.educationCode | capitalize }}</b></li>
                      <li><b>身份证号</b><b>{{ peopleInfo.credentialNo | capitalize }}</b></li>
                      <li><b>户籍</b><b>{{ peopleInfo.domiclleAddress | capitalize }}</b></li>
                      <li><b>人口类别</b><b>{{ peopleInfo.category | capitalize }}</b></li>
                    </ul>
                    <ul>
                      <li><b>性别</b><b>{{ peopleInfo.gender | capitalize }}</b></li>
                      <li><b>政治面貌</b><b>{{ peopleInfo.political | capitalize }}</b></li>
                      <li><b>婚姻状况</b><b>{{ peopleInfo.maritialStatus | capitalize }}</b></li>
                      <li><b>出生日期</b><b>{{ peopleInfo.birthDate | capitalize }}</b></li>
                      <li><b>联系方式</b><b>{{ peopleInfo.phoneNo | capitalize }}</b></li>
                      <li><b>所属项目</b><b>{{ peopleInfo.residenceAddress | capitalize }}</b></li>
                    </ul>
                  </div>
                </Box3>
              </div>
            </div>
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
            <div>
              <input
                type="text"
                class="note"
                placeholder="备注"
                v-model="remark"
                v-if="isdeal === 0">
              <p
                class="remark"
                v-if="isdeal === 1">{{ remark }}<span v-if="peopleInfo.peopleName === '肖闯'"><a
                  href="http://10.231.6.9/CityGrid/CaseOperate_flat/ParticularDisplayInfo_flat.aspx?taskid=1808I8018633"
                  style="color: #ffffff;text-decoration:underline"
                  target="_blank">任务编号1808I8018633</a></span></p>
            </div>
            <!--<Box3 css="width:2.1rem;height:.7rem;line-height:.7rem;text-align:center;margin-right: .3rem;cursor:pointer;" @click="lookVideo">查看视频</Box3>-->
            <Box3
              css="width:2.1rem;height:.7rem;line-height:.7rem;text-align:center;"
              :class="{hov: isHover}"
              :is-grag="isHover?false:true"
              ref="steven">
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
  name: 'Passage',
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
      boxwidth: 'width:14.02rem;',
      alarmName: '通行报警信息',
      active: 0,
      peopleInfo: {},
      alarmReason: [],
      alarmflow: '',
      isdeal: '',
      remark: '',
      message: '',
      functionList: [],
      isHover: false,
      isMask: true
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
    this.initialize()
  },
  mounted () {
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let videoMask = this.functionList.find((item) => { return item.functionCode === 'mask_picture' })
    if (videoMask === undefined) {
      this.isMask = true
    } else {
      this.isMask = false
    }
    this.addInfo()
    console.log('pass页面popup' + this.param.e)
  },
  methods: {
    addInfo () {
      this.houseInfo()
      this.getalarmReason()
      if (this.param.e.isDeal === 0) {
        this.message = '未处理'
        this.isHover = true
      } else if (this.param.e.isDeal === 1) {
        this.isHover = false
        this.remark = this.param.e.processedRemark
        this.message = this.param.e.processedResult
      }
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
    houseInfo () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.peopleID = this.param.e.alarmPeople.peopleID
      Post({
        async: true,
        url: apiNames['获取住户信息'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.peopleInfo) {
            that.peopleInfo = data.peopleInfo
            that.peopleInfo.isDeal = that.param.e.isDeal
            that.peopleInfo.state = that.param.e.alarmState
            that.peopleInfo.alarmTime = that.param.e.alarmTime
            that.peopleInfo.modelName = that.param.e.modelName
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-passage 获取住户信息')
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
          console.log(JSON.stringify(err) + 'popup-passage 获取报警原因')
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
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-passage 报警处理')
        }
      })
    },
    select (index) {
      this.innerIndex = index
      this.active = index
    }
  },
  watch: {}
}
</script>

<style scoped>
  b {font-weight: normal; }
  li {text-overflow: ellipsis; white-space: nowrap; }
  .alarm {padding: .2rem .2rem .06rem; box-sizing: border-box; display: flex; }
  .process {display: flex; }
  .alarmLeft_1 ul {overflow: hidden; width: 100%; box-sizing: border-box; padding: .1rem .5rem; }
  .info_1 > li {float: left;font-size: .28rem;width: 50%;color: #fff;box-sizing: border-box;line-height: .45rem;position: relative;padding-right: .3rem;margin: .05rem 0;display: flex;}
  .info_1 > li >b:nth-of-type(2){display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .info_1 > li::before {content: ''; position: absolute; width: .03rem; height: .25rem; top: .1rem; left: -.22rem; background: #ff0080; }
  .alarmLeft_2 {margin-top: .1rem; }
  .info_2 {display: flex; }
  .info_2 ul {overflow: hidden; box-sizing: border-box; padding: .1rem 0; }
  .info_2 ul:first-child {width: 23.3%; }
  .info_2 ul:nth-of-type(2) {width: 38.3%;}
  .info_2 ul:nth-of-type(3) {width: 38.3%; }
  .info_2 ul li {float: left;font-size: .28rem;width: 100%;color: #fff;box-sizing: border-box;padding-left: .52rem;line-height: .48rem;margin-bottom: .1rem;}
  .info_2 ul li b:nth-of-type(1) {width: 1.18rem; text-align: right; display: inline-block; margin-right: .3rem; font-weight: normal;position: relative}
  .info_2 ul li b:nth-of-type(1)::after{content: ':'; position: absolute;top:0; right: -.14rem;}
  .info_2 ul li b:nth-of-type(2) {font-weight: normal; }
  .personalImg {width: 2.5rem; height: 3rem; padding: .1rem; box-sizing: border-box; }
  .alarmProcessing .left3_ul li.active {background-color: #2293ad; border: solid 1px #00d4ff; box-sizing: border-box; }
  .alarmProcessing {margin-top: .2rem;box-sizing: border-box; font-size: .28rem;}
  .alarmProcessing .button{float: right;display: flex;margin-top: .1rem;position: relative}
  .alarmProcessing .button .note{margin-right: .3rem;background: #1b4c95;border: 1px solid #acacac53;color: #fff;width: 10.97rem /*8.57rem*/;height: .7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .28rem;}
  .alarmProcessing .button .remark{margin-right: .3rem;background: none;border: 1px solid #acacac22;color: #fff;width: 10.97rem /*8.57rem*/;height: .7rem;line-height:.7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .28rem;}
  .alarmProcessing .button .hov{cursor:pointer;}
  .alarmProcessing .button .hov:after {border: solid transparent; content: ''; right: .3rem; top: .3rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-right-color: #31f1fe; }
  .alarmProcessing .button .hov:hover:after{border: solid transparent; content: ''; right: .25rem; top: .34rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-top-color: #31f1fe; }
  .alarmProcessing .button .reason{display: none;text-align: center; position: absolute; width: 2.1rem; top: .7rem; right: 0; z-index: 1; background: #101215c7; }
  .alarmProcessing .button .hov:hover .reason{display: block}
  ul.reason li{font-size: .28rem;color: #befefe; background: #102044; margin-top: .06rem;text-align: center; line-height: .55rem; border-left: 1px solid #3cc3ff; border-right: 1px solid #3cc3ff; box-sizing: border-box; }
  ul.reason li span{position: relative;}
  ul.reason li:hover{background: #254a9f; }
</style>
