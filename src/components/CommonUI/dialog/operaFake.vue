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
            <Box3>
              <ul class="call_police">
                <li :title="deviceInfo.name"><span>设备名称</span>{{ this.param.e.typeName }}</li>
                <li :title="deviceInfo.code"><span>设备编码</span>{{ this.param.e.code }}</li>
                <li :title="deviceInfo.installAdd"><span>设备位置</span>{{ this.param.e.address }}</li>
                <li><span>设备型号</span>-</li>
                <li><span>设备状态</span><b :class="textColor">在线</b></li>
                <li><span>运行时长</span>{{ this.param.e.longTime }}</li>
                <li><span>电&nbsp;&nbsp;量</span>-</li>
              </ul>
            </Box3>
          </div>
        </div>
        <div class="alarmPolice">
          <boxTitle
            title="报警信息"
            css="font-size:.32rem"/>
          <div style="position:relative;">
            <div class="rel_waring_top">
              <p style="color: #ffffff; background: #FF3C3C">一级报警</p>
            </div>
            <Box3
              :is-red="alarmInfo.isColorStyle"
              css="height:1.15rem">
              <ul class="call_police">
                <li><span>报警类型</span>{{ this.param.e.eqName }}</li>
                <li><span>报警时间</span>{{ this.param.e.revealTime }}</li>
                <li><span>报警状态</span>4（正在处理）</li>
                <li><span>报警次数</span>{{ this.param.e.numInfo }}</li>
              </ul>
            </Box3>
          </div>
        </div>
        <div class="alarmProcessing">
          <boxTitle
            title="报警处理"
            css="font-size:.32rem"/>
          <div id="alarmFlow">
            <Box3 css="height:4.1rem;">
              <div id="flowChart">
                <div class="alarmChart"> <!---->
                  <ul class="flowChart">
                    <li class="process will"><img :src="imgurl[0]"></li><!--未启动-->
                    <div class="message">
                      <p class="alarmTitle active">触发报警</p>
                      <p class="alaemDiscription" >触发报警，通知责任人 </p>
                    </div>
                  </ul>
                  <ul class="flowChart">
                    <li class="process"><img :src="imgurl[1]"></li><!--启动中-->
                    <div class="message">
                      <p class="alarmTitle active"> 处置中 </p>
                      <p class="alaemDiscription" >报警正常处置</p>
                    </div>
                  </ul>
                  <ul class="flowChart">
                    <li class="process over "><img :src="imgurl[2]">结案</li><!--启动完成-->
                    <div class="message">
                      <p class="alarmTitle active"> 结案 </p>
                      <p class="alaemDiscription" >报警结案 </p>
                    </div>
                  </ul>
                </div>
                <aside>
                  <h4><b>责任人</b><b>联系方式</b><b>报警状态</b><b>催办</b></h4>
                  <ul class="principal">
                    <happy-scroll
                      resize
                      size="3"
                      hide-horizontal
                      style="height:1.28rem">
                      <li>
                        <b>史俊</b>
                        <b>13916412999</b>
                        <b>接收</b>
                        <b
                          class="rush"
                          @click="reminder"><img src="../../../assets/images/alarmFlow/rush.png" ></b></li>
                      <li>
                        <b>朱礼彬</b>
                        <b>18917020732</b>
                        <b>接收</b>
                        <b
                          class="rush"
                          @click="reminder"><img src="../../../assets/images/alarmFlow/rush.png" ></b></li>
                      <li>
                        <b>西门保安</b>
                        <b>18717835349</b>
                        <b>接收</b>
                        <b
                          class="rush"
                          @click="reminder"><img src="../../../assets/images/alarmFlow/rush.png" ></b></li>
                    </happy-scroll>
                  </ul>
                </aside>
              </div>
            </Box3>
          </div>
          <div class="button">
            <div class="accessDe">
              <input
                type="text"
                class="note"
                placeholder="备注"
                v-model="remark">
            </div>
            <Box3
              css="width:2.1rem;height:.7rem;line-height:.7rem;text-align:center;"
              class="hov">
              <span class="">{{ message }}</span>
              <ul class="reason">
                <li
                  v-for="item in alarmReason"
                  :key="item.index">
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
// import user from '../../../Utils/user'
// import {apiNames} from '../../../config/config'
// import {Post} from '../../../Utils/Http'
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
      alarmReason: [
        {name: '误报'},
        {name: '人为'}
      ],
      isdeal: '',
      nowTime: '',
      remark: '',
      message: '未处理',
      isHover: false,
      textColor: '',
      alarmflow: '',
      layerStyle: '',
      imgurl: [require('../../../assets/images/icon/unstart.svg'), require('../../../assets/images/icon/started.svg'), require('../../../assets/images/icon/complete.png')],
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
  mounted () {
    console.log(this.param.e)
  },
  methods: {
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
    reminder () {
      this.$newnotify({
        titleName: '已催办',
        content: '已通知催办',
        autoClose: 3000
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
  .alarmProcessing .button .accessDe .note{margin-right: .3rem;background: #1b4c95;border: 1px solid #acacac53;color: #fff;width: 10.95rem;height: .7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .32rem;}
  .alarmProcessing .button .accessDe .remark{margin-right: .3rem;background: none;border: 1px solid #acacac22;color: #fff;width: 8.57rem;height: .7rem;line-height:.7rem;margin-top: .05rem;padding: 0 .2rem;box-sizing: border-box;font-size: .32rem;}
  .alarmProcessing .button .hov{cursor:pointer;}
  .alarmProcessing .button .hov:after {border: solid transparent; content: ''; right: .3rem; top: .3rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-right-color: #31f1fe; }
  .alarmProcessing .button .hov:hover:after{border: solid transparent; content: ''; right: .25rem; top: .34rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-top-color: #31f1fe; }
  .alarmProcessing .button .reason{display:none;text-align: center; position: absolute; width: 2.05rem; top: .7rem; left: 0; z-index: 1; background: #101215c7; }
  .alarmProcessing .button .hov:hover .reason{display: block}
  ul.reason li{font-size: .32rem;color: #befefe; background: #102044; margin-top: .06rem;text-align: center; line-height: .55rem; border-left: 1px solid #3cc3ff; border-right: 1px solid #3cc3ff; box-sizing: border-box; }
  ul.reason li span{position: relative;}
  ul.reason li:hover{background: #254a9f; }

  .alarmChart{display: flex;display: -webkit-flex;padding: .08rem .05rem}
  .alarmChart .flowChart{background: #2e4a6ac4;height: 1.7rem;width: 100%;padding-top: .12rem}
  .alarmChart .flowChart .process {text-align: center; background: #264060; z-index: 2; font-size: 0; position: relative;height: .5rem;line-height: .5rem; position: relative;}
  .alarmChart .flowChart:not(:first-child) .process::after{content: "";background: #31f1fe;height: .02rem;width: 84%;position: absolute;top:50%;left:-43%;display: block}
  .alarmChart .flowChart .process > img {width: .5rem; height: .5rem; vertical-align: middle;}
  .alarmChart .flowChart .over > img{width: .34rem; height: .34rem;}
  .alarmChart .flowChart .will > img{width: .3rem; height: .3rem;}
  .alarmChart .flowChart .message{text-align: center;}
  .alarmChart .flowChart .message .alarmTitle{font-size: .28rem;background: #f5b94585;color:#c1c1c1;padding: .02rem .28rem;display: inline-block;margin: .1rem auto .1rem}
  .alarmChart .flowChart .message .alaemDiscription{font-size: .24rem;}
  #flowChart aside{padding: 0 .2rem;}
  #flowChart aside h4,#flowChart aside .principal li{display: flex;display: -webkit-flex;font-size: .28rem}
  #flowChart aside h4 b,#flowChart aside .principal li b{flex: 1;text-align: center}
  #flowChart aside h4{color:#a4edfc;padding: .2rem 0}
  #flowChart aside .principal li{padding: .1rem 0}
  #flowChart aside .principal li:nth-child(2n+0){background: #a4edfc33;}
  #flowChart aside .principal li .rush>img{width: .36rem;height: .36rem}
  .alarmPolice .rel_waring_top {overflow: hidden; display: block; position: absolute; top: 2px; right: 1px; }
  .alarmPolice .rel_waring_top p {display: inline-block; float: right; line-height: .32rem; padding: .1rem; overflow: hidden; position: relative; font-size: .22rem; font-weight: bold; text-align: center; background: #3cc3ff; color: #ff0000; margin: 1px 0; background: #3cc3ff; /*background: linear-gradient(45deg, transparent .08rem, #3cc3ff 0);*/ }
  .alarmPolice .rel_waring_top p::before {content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 0; border-height: .65rem; border-style: solid; border-color: transparent transparent #091428 #091428; }

</style>
