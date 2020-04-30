<template>
  <div class="allState content">
    <!-- <happy-scroll
                  resize
                  size="2"
                  class="happy-scroll_1"> -->
    <div
      class="left ff leftTop"
      style="width:100%;height:100%;margin:0 auto;margin-top:-1px;display:grid;box-sizing:border-box;grid-row-gap: 0rem;">
      <Box3
        type='1'
        class="ff"
        css="">
        <p class="allStateTitle sliderTit">小区综合统计</p>
        <div style="height: 38%;">
          <InfoGroup
            type='2'
            columns="4"
            css='color:#fff;'>
            <InfoLabel
              title="单元总数"
              :num='buildingSum | numSp'
              type='3'
              css="font-weight:normal;"/>
            <InfoLabel
              title="房屋总数"
              :num='houseSum | numSp'
              type='3'/>
            <InfoLabel
              title="人口总数"
              :num='peopleSum | numSp'
              type='3'/>
            <InfoLabel
              title="车位总数"
              :num='parkingSpaceSum | numSp'
              type='3'/>
          </InfoGroup>
        </div>
        <div style="height: 38%;">
          <InfoGroup
            type='2'
            columns="4"
            css='color:#fff'
            style="margin-top:5px;">
            <InfoLabel
              title="社区民警"
              :num='police | numSp'
              type='3'
              bg-color='0,255,216'/>
            <InfoLabel
              title="居委干部"
              :num='juwei | numSp'
              type='3'
              bg-color='0,255,216'/>
            <InfoLabel
              title="楼长人员"
              :num='louzhang | numSp'
              type='3'
              bg-color='0,255,216'/>
            <InfoLabel
              title="物业人员"
              :num='wuye | numSp'
              type='3'
              bg-color='0,255,216'/>
          </InfoGroup>
        </div>
      </Box3>
      <!-- 人口数据分析 -->
      <Box3
        type="1"
        css="position: relative;"
        class="ff">
        <p class="echartTitle sliderTilSmall">房屋数据感知</p>
        <!-- <RadioGroup items="当日,本月"
                      @on-index-changed="strangerNum"
                      css="position: absolute;top:0;right:0rem;height:0.52rem;width:4.1srem;z-index:999;"></RadioGroup> -->
        <echart
          config='trend_line_1'
          ref='trend_line_1'
          style="width:100%"
          height='100%'/>
      </Box3>
      <!-- 房屋数据分析 -->
      <Box3
        type='1'
        class="ff"
        css="position: relative;">
        <p class="echartTitle sliderTilSmall">人口数据感知</p>
        <echart
          config='trend_bar_1'
          ref="trend_bar_1"
          height='100%'/>
      </Box3>
      <!-- 今日实有预警感知统计 -->
      <!-- <Box3 type='1'>
          <echart config='trend_bar_2'
                  ref="trend_bar_2"
                  width="100%"
                  height='100%'></echart>
        </Box3> -->
      <!-- 车辆通行统计 -->
      <Box3
        type="1"
        css="position: relative;">
        <p class="echartTitle sliderTilSmall">车辆数据感知</p>
        <RadioGroup
          items="当日,本月"
          @on-index-changed="carLogChange"
          css="position: absolute;top:0;right:0.1rem;z-index:999;"/>
        <echart
          config="trend_line_bottom"
          ref='trend_line_bottom'/>
      </Box3>
    </div>
    <!-- </happy-scroll> -->
    <!-- 中间部分一标四实 -->
    <div
      class="center"
      style="heigth:100%;">
      <Box3
        type='2'
        css='width:100%;margin:0 auto;height:100%;'
        class="center">
        <div
          class="bgCenter"
          style="width:100%;height:100%;">
          <div style="position: absolute;width:100%;height: 2.4rem;">
            <p class="allStateTitle sliderTit">当前实时情况</p>
            <!--头部四个总数-->
            <InfoGroup
              type='2'
              columns="4"
              css='color:#fff'
              class="sliderTit">
              <InfoLabel
                title="设备总数"
                :num='deviceSum | numSp'
                type='7'
                bg-color='0,210,255'/>
              <!--<InfoLabel-->
                <!--title="驻留人口"-->
                <!--:num='renkouzhuliu | numSp'-->
                <!--type='7'-->
                <!--bg-color='0,210,255'/>-->
              <InfoLabel
                title="驻留人口"
                :num='peopleSum | numSp'
                type='7'
                bg-color='0,210,255'/>
              <InfoLabel
                title="驻留车辆"
                :num='carZhuliu | numSp'
                type='7'
                bg-color='0,210,255'/>
              <InfoLabel
                title="预警总数"
                :num='animatedNumber2 | numSp'
                type='7'
                bg-color='0,210,255'
                ref="alarmSumDay"
                :data-time="time"
                :data-value="value"/>
            </InfoGroup>
          </div>
          <!-- <div class="bgCenter1">
            <img src="../../../../assets/images/tsfx.png" alt="" draggable="false">
          </div> -->
          <div class="detail">
            <!--报警动态-->
            <div class="contentBox">
              <div
                class="title sliderTit"
                style="color:#fff;">{{ getAlarminfodata.title }}</div>
              <ul
                style="width:100%;margin-top:0.1rem;"
                class='sliderTilSmall'>
                <!--<li class="clear">-->
                <!--<div style="color:#02f6ff;font-family: 'tsl';">{{getAlarminfodata.time1}}</div>-->
                <!--<div class="con"-->
                <!--style="font-family: 'tsl' !important;">{{ani91 | numSp}}</div>-->
                <!--</li>-->
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getAlarminfodata.time2 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani92 | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getAlarminfodata.time3 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani93 | numSp }}</div>
                </li>
                <!--<li class="clear">-->
                <!--<div style="color:#02f6ff;font-family: 'tsl';">{{getAlarminfodata.time4}}</div>-->
                <!--<div class="con"-->
                <!--style="font-family: 'tsl' !important;">{{ani94 | numSp}}</div>-->
                <!--</li>-->
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getAlarminfodata.time5 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani95 | numSp }}</div>
                </li>
              </ul>
            </div>
            <!--通行动态-->
            <div class="contentBox">
              <div
                class="title sliderTit"
                style="color:#fff;">{{ getDoorInfodata.title }}</div>
              <ul
                style="width:100%;margin-top:0.1rem;"
                class='sliderTilSmall'>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getDoorInfodata.time1 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani2 | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getDoorInfodata.time2 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani1 | numSp }}</div>
                </li>
                <!--<li class="clear">-->
                <!--<div style="color:#02f6ff;font-family: 'tsl';">{{detailData[1].time3}}</div>-->
                <!--<div class="con"-->
                <!--style="font-family: 'tsl' !important;">{{ani4 | numSp}}</div>-->
                <!--</li>-->
              </ul>
            </div>
            <!--车辆动态-->
            <div class="contentBox">
              <div
                class="title sliderTit"
                style="color:#fff;">{{ detailData[2].title }}</div>
              <ul
                style="width:100%;margin-top:0.1rem;"
                class='sliderTilSmall'>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[2].time1 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ realTime_Sum | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[2].time2 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ registration_In | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[2].time3 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ foreign_In | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[2].time4 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ registration_Out | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[2].time5 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ foreign_Out | numSp }}</div>
                </li>
                <!--<li class="clear">-->
                <!--<div style="color:#02f6ff;font-family: 'tsl';">{{detailData[2].time4}}</div>-->
                <!--<div class="con"-->
                <!--style="font-family: 'tsl' !important;">{{ani8 | numSp}}</div>-->
                <!--</li>-->
              </ul>
            </div>
            <!--运维动态-->
            <div class="contentBox">
              <div
                class="title sliderTit"
                style="color:#fff;">{{ getDeviceData.title }}</div>
              <ul
                style="width:100%;margin-top:0.1rem;"
                class='sliderTilSmall'>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getDeviceData.time1 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani9 | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getDeviceData.time2 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ getDeviceData.time2Num }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getDeviceData.time3 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ getDeviceData.time3Num }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getDeviceData.time4 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ getDeviceData.time4Num }}</div>
                </li>
              </ul>
            </div>
            <!--人口动态-->
            <div class="contentBox">
              <div
                class="title sliderTit"
                style="color:#fff;">{{ getPeopleInfodata.title }}</div>
              <ul
                style="width:100%;margin-top:0.1rem;"
                class='sliderTilSmall'>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getPeopleInfodata.time1 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani3 | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ getPeopleInfodata.time2 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ ani4 | numSp }}</div>
                </li>
              </ul>
            </div>
            <!--事件动态-->
            <div class="contentBox">
              <div
                class="title sliderTit"
                style="color:#fff;">{{ detailData[5].title }}</div>
              <ul
                style="width:100%;margin-top:0.1rem;"
                class='sliderTilSmall'>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[5].time3 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ management_Public | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[5].time4 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ service_Public | numSp }}</div>
                </li>
                <li class="clear">
                  <div style="color:#02f6ff;font-family: 'tsl';">{{ detailData[5].time5 }}</div>
                  <div
                    class="con"
                    style="font-family: 'tsl' !important;">{{ security_Public | numSp }}</div>
                </li>
              </ul>
            </div>
            <!--中间房屋建设-->
            <div
              class="contentBox"
              style="padding:0.1rem;width:5.8rem;">
              <div
                class="title sliderTit clear"
                style="color:#fff;">幸福指数</div>
              <ul
                class="stars"
                style="width:100%;margin-top:0.1rem;p class='sliderTilSmall'adding:0.1rem 0;">
                <li>
                  <div>★</div>
                  <div>★</div>
                  <div>★</div>
                  <div>★</div>
                  <div>★</div>
                </li>
              </ul>
              <div
                class="bot-title clear"
                style="padding-bottom:0.1rem;">
                <div
                  style="text-align:center;width:100%;"
                  class="sliderTilSmall">
                  建设中...
                  <!-- <span></span>
                  <p>车位占比</p> -->
                </div>
                <!-- <div>
                  <span></span>
                  <p>报警占比</p>
                </div>
                <div>
                  <span></span>
                  <p>处理效率</p>
                </div> -->
              </div>
            </div>
            <div class="cir1 cir">
              <div/>
            </div>
            <div class="cir2 cir">
              <div/>
            </div>
            <div class="cir3 cir">
              <div/>
            </div>
            <div class="cir4 cir">
              <div/>
            </div>
            <div class="cir5 cir">
              <div/>
            </div>
          </div>
        </div>
      </Box3>
    </div>
    <!-- 地图 -->
    <!-- <div style="height: 100%;box-sizing: border-box;padding-bottom: 1.08rem;position: absolute;left: 271px;top:122px;width:;display: none">
      <Box3 css='box-sizing: border-box;padding:5px;'>
        <Map/>
      </Box3>
    </div> -->
    <!-- 右侧部分 -->
    <!-- <happy-scroll style=""
                  resize
                  class="happy-scroll_1 dd"
                  size='2'
                  hide-horizontal> -->
    <div
      style="width:100%;height:100%;margin-top:-1px;"
      class="rightHeight">
      <Box3
        type='1'
        css='position: relative;'>
        <p class="allStateTitle sliderTit">感知设备统计</p>
        <InfoGroup
          type='2'
          columns="4"
          css='color:#fff;'>
          <InfoLabel
            v-for='(item,index) in getNum'
            :key='index'
            :title="item.name"
            :num='item.total'
            type='3'
            bg-color='0,210,255'/>
        </InfoGroup>
      </Box3>
      <!-- 一周感知数量统计 -->
      <!-- <Box3 type='1'
              css=''
              v-if="isShow">
          <echart config='trend_bar_3'
                  ref="trend_bar_3"></echart>
        </Box3> -->
      <!-- 设备数据感知  只需要取前五种 -->
      <Box3
        type='1'
        css='position: relative;'
        v-if="isShow">
        <p class="echartTitle sliderTilSmall">设备运维情况</p>
        <!-- <RadioGroup items="本周,本月"
                      css="position: absolute;top:0;right:0.1rem;z-index:999;"></RadioGroup> -->
        <echart
          config='trend_device_bar'
          ref="trend_device_bar"/>
      </Box3>
      <!-- 报警数据分析 -->
      <Box3
        type='1'
        css='position: relative;'
        v-if="isShow">
        <p class="echartTitle sliderTilSmall">智能感知报警</p>
        <RadioGroup
          items="近7天,近30天"
          css="position: absolute;top:0;right:0.1rem;z-index:999;"
          @on-index-changed="alarmChange"/>
        <echart
          config='trend_alarm_line'
          ref="trend_alarm_line"/>
      </Box3>
      <!-- 人员通行数据感知 月度统计 -->
      <Box3
        type='1'
        css='padding-bottompx;box-sizing:border-box;css="position: relative;"'
        v-if="isShow">
        <p class="echartTitle sliderTilSmall">人员分类感知</p>
        <echart
          config='trend_people_pie'
          ref="trend_people_pie"/>
        <ul class="people_ul">
          <li><span/>本小区</li>
          <li><span/>陌生人</li>
          <li><span/>重点关注</li>
        </ul>
      </Box3>
    </div>
    <!-- </happy-scroll> -->
  </div>
</template>
<script>
import { TweenLite } from 'gsap/TweenMax'
import { Post } from '../../../../Utils/Http'
import { apiNames } from '../../../../config/config.js'
import user from '../../../../Utils/user'
import { getCountDays, getDays, setCookie, isNullOrEmpty } from '../../../../Utils/Common'
import $ from 'jquery'
// let schedule = require('node-schedule')
let _ = require('lodash')
export default {
  name: 'AllState',
  data () {
    return {
      isShow: false,
      alarmNum: 0,
      buildingSum: 0, // 楼栋总数
      peopleSum: 0, // 人员总数
      houseSum: 0, // 房屋总数
      deviceSum: 0, // 设备总数
      parkingSpaceSum: 0, // 车位总数
      carSum: 0, // 车辆总数
      passCarSumDay: 0, // 车辆昨日通行总数
      passCarSumRealtime: 0, // 车辆今日通行
      alarmSumRealtime: 0, // jinri报警
      alarmSumDay: 0, // 昨日报警
      passPeopleSum: 0, // 人员昨日整天通行数量
      passPeopleSumRealtime: 0, // 人员今日实时通行数量
      deviceStateRealtime: 0, // 实时设备状态统计 echarts图标
      alarmTypeRealtime: 0, // 今日实有预警感知系统
      strangerPassDay: 0, // 今日陌生人实时通行统计
      strangerPassRealtime: 0, // 陌生人按天统计 ---
      ganzhizengliang: 0, // 一周感知数量统计
      deviceZaixian: 0, // 实时在线设备
      deviceYichang: 0, // 实时设备异常
      renkouzhuliu: 0, // 人口驻留  ----
      carZhuliu: 0, // 车辆驻留
      starngerEcharts: 0, // 陌生人趋势
      passcarTongji: 0,
      // 实时监测数据变化
      customer: 0, // 实时访客
      tweenedNumber3: 0,
      peopleInOut: 0, // 实时进出
      tweenedNumber4: 0,
      strangerInOut: 0, // 陌生人进出
      tweenedNumber5: 0,
      careInOut: 0, // 关注人员
      tweenedNumber6: 0,
      carInOut: 0, // 车辆实时进出
      tweenedNumber7: 0,
      carLocal: 0, // 本地车辆
      tweenedNumber8: 0,
      carForeign: 0, // 外来车辆
      tweenedNumber9: 0,
      carForeignStay: 0, // 外来滞留
      tweenedNumber10: 0,
      tweenedNumber90: 0, // 设备在线
      deviceOnline1: 0,
      tweenedNumber91: 0,
      tweenedNumber92: 0,
      alarmDynamics2: 0,
      tweenedNumber93: 0,
      alarmDynamics3: 0,
      tweenedNumber94: 0,
      alarmDynamics4: 0,
      tweenedNumber95: 0, // 未处理
      alarmDynamics5: 0, // 未处理
      realTimeSum: 0, // 实时进出
      realTimesum: 0, // 实时进出
      registrationIn: 0, // 驶入登记
      registrationin: 0, // 驶入登记
      foreignIn: 0, // 驶入外来
      foreignin: 0, // 驶入外来
      registrationOut: 0, // 驶出登记
      registrationout: 0, // 驶出登记
      foreignOut: 0, // 驶出外来
      foreignout: 0, // 驶出外来
      managementPublic: 0, // 公共管理
      managementpublic: 0, // 公共管理
      servicePublic: 0, // 公共服务
      servicepublic: 0, // 公共服务
      securityPublic: 0, // 公共安全
      securitypublic: 0, // 公共安全
      num: 0,
      yjNum: 334,
      clAsMin: 0,
      addNum: 7,
      pNum: 245,
      datas: [],
      getNum: [],
      detailShow: true,
      tweenedNumber2: 0,
      interVal: '',
      police: 0,
      juwei: 0,
      louzhang: 0,
      wuye: 0,
      dataTimeAlarm: [],
      siginArr: [],
      objA: [],
      objB: [],
      arrCar: [],
      arrTime: [],
      interVals: [],
      newPath: '/home/trend/allState',
      carNum: 0,
      timer: '',
      detailData: [
        { title: '报警动态', time1: '报警总数', time1Num: 0, time2: '已处理', time2Num: '0', time3: '正在处理', time3Num: '0', time4: '延期/超时', time4Num: '0' },
        { title: '通行动态', time1: '门禁开门次数', time1Num: 0, time2: '访客开门次数', time2Num: '0', time3: '关爱/关注进出', time3Num: '0' },
        { title: '车辆动态', time1: '实时进出', time1Num: 0, time2: '驶入登记', time2Num: '0', time3: '驶入外来', time3Num: '0', time4: '驶出登记', time4Num: '0', time5: '驶出外来', time5Num: '0' },
        { title: '运维动态', time1: '设备在线', time1Num: 0, time2: '设备离线', time2Num: '0', time3: '设备故障', time3Num: '0', time4: '当日维修', time4Num: '0' },
        { title: '人口动态', time1: '人员进出', time1Num: 0, time2: '关注人员进出', time2Num: 0 },
        { title: '事件动态', time1: '感知事件', time1Num: 0, time2: '消防事件', time2Num: '0', time3: '公共管理', time3Num: '0', time4: '公共服务', time4Num: '0', time5: '公共安全', time5Num: '0' }
        // { title: '幸福指数', time1: '车位占比', time1Num: 0, time2: '报警占比', time2Num: '0', time3: '处理效率', time3Num: '0', time4: '早九晚五', time4Num: '0' }
      ],
      getPeopleInfodata: { title: '人口动态', time1: '通行人员进出', time1Num: 0, time2: '关注人员进出', time2Num: 0 },
      getAlarminfodata: { title: '报警动态', time1: '报警总数', time1Num: 0, time2: '已处理', time2Num: 0, time3: '正在处理', time3Num: 0, time4: '延期/超时', time4Num: 0, time5: '未处理', time5Num: 0 },
      getDeviceData: { title: '运维动态', time1: '设备在线', time1Num: 0, time2: '设备离线', time2Num: '0', time3: '设备故障', time3Num: '0', time4: '当日维修', time4Num: '0' },
      getDoorInfodata: { title: '通行动态', time1: '门禁开门次数', time1Num: 0, time2: '访客开门次数', time2Num: '0' },
      getPeopleInfoType: true, // 判断接口正常返回之后才执行定时器
      getAlarmInfoType: true, // 判断接口正常返回之后才执行定时器
      getDevicesInfoType: true, // 判断接口正常返回之后才执行定时器
      getDoorInfoType: true, // 判断接口正常返回之后才执行定时器
      getRealPeopleType: true, // 判断接口正常返回之后才执行定时器
      getRealHourseType: true, // 判断接口正常返回之后才执行定时器
      passCarLogsType: true, // 判断接口正常返回之后才执行定时器
      getshujuType: true, // 判断接口正常返回之后才执行定时器
      getshuju1Type: true, // 判断接口正常返回之后才执行定时器
      getshuju2Type: true, // 判断接口正常返回之后才执行定时器
      getCarInfoType: true, // 判断接口正常返回之后才执行定时器
      pageInfoType: true
    }
  },
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 0
    }
  },
  filters: {
    ifShow: function (value) {
      if (!value) {
        this.detailShow = false
      } else {
        this.detailShow = false
      }
    }
  },
  mounted: function () {
    this.getNumSb()
    this.getStatic()
    this.getRealHourse()
    this.passCarLogs()
    // this.getRealTimeAlarmStatistics()
    this.getshuju()
    this.getshuju1()
    this.getshuju2()
    this.getCarInfo()
    // 人员进出详情
    this.getPeopleInfo()
    this.getAlarmInfo()
    this.getDevicesInfo()
    this.getDoorInfo()
    this.getRealPeople()
    this.getPeopleClass()
    let that = this
    this.timer = setInterval(function () {
      // clearInterval(that.timer)
      // 人员进出详情
      if (that.getPeopleInfoType === true) {
        that.getPeopleInfo()
      }
      if (that.getAlarmInfoType === true) {
        that.getAlarmInfo()
      }
      if (that.getDevicesInfoType === true) {
        that.getDevicesInfo()
      }
      if (that.getDoorInfoType === true) {
        that.getDoorInfo()
      }
      if (that.getRealPeopleType === true) {
        that.getRealPeople()
      }
      if (that.getRealHourseType === true) {
        that.getRealHourse()
      }
      if (that.passCarLogsType === true) {
        that.passCarLogs()
      }
      if (that.getshujuType === true) {
        that.getshuju()
      }
      if (that.getshuju1Type === true) {
        that.getshuju1()
      }
      if (that.getshuju2Type === true) {
        that.getshuju2()
      }
      if (that.getCarInfoType === true) {
        that.getCarInfo()
      }
      // that.getRealTimeAlarmStatistics()
      console.log('开始执行')
    }, 5000)
  },
  computed: {
    animatedNumber2: function () {
      return this.tweenedNumber2 ? this.tweenedNumber2.toFixed(0).toString() : 0
    },
    ani1: function () {
      return this.tweenedNumber3 ? this.tweenedNumber3.toFixed(0).toString() : 0
    },
    ani2: function () {
      return this.tweenedNumber4 ? this.tweenedNumber4.toFixed(0).toString() : 0
    },
    ani3: function () {
      return this.tweenedNumber5 ? this.tweenedNumber5.toFixed(0).toString() : 0
    },
    ani4: function () {
      return this.tweenedNumber6 ? this.tweenedNumber6.toFixed(0).toString() : 0
    },
    ani5: function () {
      return this.tweenedNumber7 ? this.tweenedNumber7.toFixed(0).toString() : 0
    },
    ani6: function () {
      return this.tweenedNumber8 ? this.tweenedNumber8.toFixed(0).toString() : 0
    },
    ani7: function () {
      return this.tweenedNumber9 ? this.tweenedNumber9.toFixed(0).toString() : 0
    },
    ani8: function () {
      return this.tweenedNumber10 ? this.tweenedNumber10.toFixed(0).toString() : 0
    },
    ani9: function () {
      return this.tweenedNumber90 ? this.tweenedNumber90.toFixed(0).toString() : 0
    },
    // ani91: function () {
    //   return this.tweenedNumber91 ? this.tweenedNumber91.toFixed(0).toString() : 0
    // },
    ani92: function () {
      return this.tweenedNumber92 ? this.tweenedNumber92.toFixed(0).toString() : 0
    },
    ani93: function () {
      return this.tweenedNumber93 ? this.tweenedNumber93.toFixed(0).toString() : 0
    },
    ani94: function () {
      return this.tweenedNumber94 ? this.tweenedNumber94.toFixed(0).toString() : 0
    },
    ani95: function () {
      return this.tweenedNumber95 ? this.tweenedNumber95.toFixed(0).toString() : 0
    },
    realTime_Sum () {
      return this.realTimeSum ? this.realTimeSum.toFixed(0).toString() : 0
    },
    registration_In () {
      return this.registrationIn ? this.registrationIn.toFixed(0).toString() : 0
    },
    foreign_In () {
      return this.foreignIn ? this.foreignIn.toFixed(0).toString() : 0
    },
    registration_Out () {
      return this.registrationOut ? this.registrationOut.toFixed(0).toString() : 0
    },
    foreign_Out () {
      return this.foreignOut ? this.foreignOut.toFixed(0).toString() : 0
    },
    management_Public () {
      return this.managementPublic ? this.managementPublic.toFixed(0).toString() : 0
    },
    service_Public () {
      return this.servicePublic ? this.servicePublic.toFixed(0).toString() : 0
    },
    security_Public () {
      return this.securityPublic ? this.securityPublic.toFixed(0).toString() : 0
    }
  },
  methods: {
    alarmChange: function (msg11) {
      msg11 ? msg11 = this.alarmNum = msg11[1] : msg11 = this.alarmNum
      let opAlarm = this.$refs.trend_alarm_line
      if (this.pageInfoType === true) {
        if (this.alarmNum === 1) {
          opAlarm.option.xAxis.axisLabel.interval = 3
          opAlarm.option.xAxis.axisLabel.rotate = 0
        } else {
          opAlarm.option.xAxis.axisLabel.interval = 0
          opAlarm.option.xAxis.axisLabel.rotate = 0
        }
        opAlarm.option.series = []
        // var allDataAlarm = []
        if (this.alarmNum === 0) {
          for (let i = 0; i < this.siginArr.length; i++) {
            opAlarm.option.series.push({
              name: this.siginArr[i],
              type: 'line',
              symbol: 'none',
              smooth: true,
              symbolSize: 1,
              data: this.objA.filter(item => item.name === this.siginArr[i])
            })
          }
        } else if (this.alarmNum === 1) {
          // allDataAlarm = obj2
          for (let i = 0; i < this.siginArr.length; i++) {
            opAlarm.option.series.push({
              name: this.siginArr[i],
              type: 'line',
              symbol: 'none',
              smooth: true,
              symbolSize: 1,
              data: this.objB.filter(item => item.name === this.siginArr[i])
            })
          }
        }
        if (this.pageInfoType === true) {
          opAlarm.option.xAxis.data = this.dataTimeAlarm[msg11]
          opAlarm.option.legend.data = this.siginArr
          opAlarm.refresh()
        }
      }
    },
    // 设备报警信息
    alarmDevices: function (msg11) {
      let that = this
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      // 默认不传为30天数据
      // reqParam.days = 30
      Post({
        async: true,
        url: apiNames['报警设备感知'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (!data) {
            console.log('无数据')
          } else {
            // msg11 ? msg11 = that.alarmNum = msg11[1] : msg11 = that.alarmNum
            let list = JSON.parse(data.data).alarmSense
            // that.dataTime = []
            // console.log(list)
            // var list = JSON.parse('{"alarmSense":[{"count":13,"alarmTypeName":"地磁报警","cday":"2018-07-08"},{"count":19,"alarmTypeName":"消防报警","cday":"2018-07-12"},{"count":5,"alarmTypeName":"消防报警","cday":"2018-07-11"},{"count":2,"alarmTypeName":"消防报警","cday":"2018-07-24"},{"count":2,"alarmTypeName":"消防报警","cday":"2018-07-20"},{"count":2,"alarmTypeName":"消防报警","cday":"2018-07-08"},{"count":2,"alarmTypeName":"消防报警","cday":"2018-07-23"},{"count":2,"alarmTypeName":"消防报警","cday":"2018-07-22"},{"count":1,"alarmTypeName":"消防报警","cday":"2018-07-10"},{"count":3,"alarmTypeName":"通行报警","cday":"2018-07-24"},{"count":2,"alarmTypeName":"通行报警","cday":"2018-07-20"},{"count":1,"alarmTypeName":"通行报警","cday":"2018-07-23"},{"count":20,"alarmTypeName":"门未关","cday":"2018-07-23"},{"count":4,"alarmTypeName":"门未关","cday":"2018-07-12"}]}').alarmSense
            let arrListAll = []
            for (let i = 0; i < list.length; i++) {
              arrListAll.push({
                cday: list[i].cday.substring(5).replace('-', '/'),
                count: list[i].count,
                alarmTypeName: list[i].alarmTypeName
              })
            }
            // console.log(arrListAll)
            // 根据报警类型分类 -> 对象
            // var arrList = _.groupBy(list, 'alarmTypeName')
            let siginArr = []
            for (let i = 0; i < list.length; i++) {
              siginArr.push(list[i].alarmTypeName)
            }
            // 获取目前所有的报警类型进行去重
            siginArr = _.uniq(siginArr)
            // 获取前七天或者前30天的确切日期
            // var dataTime = []
            let time = [[], []]
            for (let i = 6; i >= 0; i--) {
              time[0].push(getDays(-i))
            }
            for (let i = 30; i >= 0; i--) {
              time[1].push(getDays(-i))
            }
            // 处理30天数据
            let obj = []
            for (let i = 0; i < siginArr.length; i++) {
              for (let j = 0; j < time[1].length; j++) {
                obj.push({
                  cday: time[1][j],
                  value: arrListAll.filter(item => item.alarmTypeName === siginArr[i] && item.cday === time[1][j]).length !== 0 ? arrListAll.filter(item => item.alarmTypeName === siginArr[i] && item.cday === time[1][j])[0].count : 0,
                  name: siginArr[i]
                })
              }
            }
            let obj2 = []
            for (let i = 0; i < siginArr.length; i++) {
              for (let j = 0; j < time[0].length; j++) {
                obj2.push({
                  cday: time[0][j],
                  value: arrListAll.filter(item => item.alarmTypeName === siginArr[i] && item.cday === time[0][j]).length !== 0 ? arrListAll.filter(item => item.alarmTypeName === siginArr[i] && item.cday === time[0][j])[0].count : 0,
                  name: siginArr[i]
                })
              }
            }
            // 时间处理
            that.dataTimeAlarm = time
            that.siginArr = siginArr
            that.objB = obj
            that.objA = obj2
            that.alarmChange(msg11)
          }
        },
        err: function (err) {
          console.log(err)
        }
      })
    },
    // 居民信息
    getRealPeople: function () {
      let that = this
      that.getRealPeopleType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      Post({
        async: true,
        url: apiNames['居住人员'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          // console.log(data)
          that.getRealPeopleType = true
          if (!data) {
            console.log('无数据')
          } else if (data.data) {
            let datas = JSON.parse(data.data).Peoples
            console.log(datas)
            let objData1 = [] // 本市数据
            let legendData = []
            // let objData2 = [] // 来沪数据
            for (let i = 0; i < datas.length; i++) {
              objData1.unshift({
                name: datas[i].type,
                value: datas[i].count
              })
              legendData.unshift(datas[i].type)
              // objData2.push({
              //   name: outHourse[i].type,
              //   value: outHourse[i].count
              // })
            }
            let opHourse = that.$refs.trend_bar_1
            opHourse.option.series[0].data = objData1
            opHourse.option.yAxis.data = legendData
            // opHourse.option.series[1].data = objData2
            opHourse.refresh()
          }
        },
        err: function (err) {
          that.getRealPeopleType = true
          console.log(err)
        }
      })
    },
    // 房屋信
    getRealHourse: function () {
      let that = this
      that.getRealHourseType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      Post({
        async: true,
        url: apiNames['居住房屋'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getRealHourseType = true
          if (!data) {
            console.log('无数据')
          } else if (data.data) {
            let datas = JSON.parse(data.data).Houses
            let objData = []
            let yAxisData = []
            for (let i = 0; i < datas.length; i++) {
              objData.push({
                name: datas[i].type,
                value: datas[i].count
              })
              yAxisData.push(datas[i].type)
            }
            let op0 = that.$refs.trend_line_1
            if (that.pageInfoType === true) {
              if (ConfigVillageIDs === '6d62288413e6441ab5a2af9a2fe29e1d') {
                op0.option.legend.data = ['沪籍', '来沪', '境外', '其他']
                op0.option.series[0].data = objData
              }
              if (ConfigVillageIDs === '059658d18e8946ed851655efdf4b866b') {
                op0.option.legend.data = ['沪籍', '来沪', '境外', '其他']
                op0.option.series[0].data = objData
              }
              op0.option.legend.data = yAxisData
              op0.option.series[0].data = objData
              op0.refresh()
            }
            // console.log(objData1)
            // console.log(objData2)
          }
        },
        err: function (err) {
          that.getRealHourseType = true
          console.log(err)
        }
      })
    },
    carLogChange: function (msg) {
      msg ? msg = this.carNum = msg[1] : msg = this.carNum
      let op7 = this.$refs.trend_line_bottom
      if (this.pageInfoType === true) {
        op7.option.xAxis.interval = this.interVals[msg]
        op7.option.xAxis.data = this.arrTime[msg]
        op7.option.series[0].data = this.arrCar[msg].inCar
        op7.option.series[1].data = this.arrCar[msg].outCar
        op7.option.series[2].data = this.arrCar[msg].waidiCar
        op7.option.series[3].data = this.arrCar[msg].localCar
        op7.refresh()
      }
    },
    passCarLogs: function (msg) {
      let that = this
      that.passCarLogsType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      // reqParam.days = 30
      Post({
        async: true,
        url: apiNames['车辆通行记录'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.passCarLogsType = true
          // console.log(JSON.parse(data.data))
          // msg ? msg = that.carNum = msg[1] : msg = that.carNum
          if (!data) {
            console.log('无数据车辆进入数据')
          } else if (data.data) {
            let dataTime = [[], []]
            for (let i = 0; i <= 24; i++) {
              dataTime[0].push(i)
            }
            // 获取当前月份的天数
            let days = getCountDays()
            for (let i = 1; i <= days; i++) {
              // 获得当前月的天数
              dataTime[1].push(i)
            }
            // 当前月份
            let nowMouth = new Date().getMonth() + 1
            // console.log(nowMouth)
            that.interVals = [1, 2]
            that.arrTime = dataTime
            // 车辆进出 按小时
            let carInoutHours = JSON.parse(data.data).carInoutHours
            let carInHours = carInoutHours.filter(item => item.type === '驶入')
            let carOutHours = carInoutHours.filter(item => item.type === '驶出')
            // 车辆进出 按天计算
            let carInoutDays = JSON.parse(data.data).carInoutDays
            carInoutDays = carInoutDays.filter(item => parseInt(item['日期'].split('-')[1]) === nowMouth)
            // console.log(carInoutDays)
            let carInDays = carInoutDays.filter(item => item['进出状态'] === '驶入')
            let carOutDays = carInoutDays.filter(item => item['进出状态'] === '驶出')
            // 本地车辆 按小时
            let carlocalHours = JSON.parse(data.data).carlocalHours
            let carlocalInHours = carlocalHours.filter(item => item.type === '外来车辆')
            let carlocalOutHours = carlocalHours.filter(item => item.type === '本地车辆')
            // 本地车辆 按天计算
            let carlocalDays = JSON.parse(data.data).carlocalDays
            carlocalDays = carlocalDays.filter(item => parseInt(item['day'].split('-')[1]) === nowMouth)
            let carlocalInDays = carlocalDays.filter(item => item.type === '外来车辆')
            let carlocalOutDays = carlocalDays.filter(item => item.type === '本地车辆')
            // 按小时匹配驶入车辆
            let inHours = []
            let outHours = []
            let localInHours = []
            let localOutHours = []
            // 按小时分别匹配每天24小时的车辆通行次数

            // for (let i = 0; i < dataTime[0].length; i++) {
            for (let i = 0; i <= new Date().getHours(); i++) {
              inHours.push(carInHours.filter(item => parseInt(item.hour) === dataTime[0][i]).length !== 0 ? carInHours.filter(item => item.hour === i)[0].count : 0)
              outHours.push(carOutHours.filter(item => parseInt(item.hour) === dataTime[0][i]).length !== 0 ? carOutHours.filter(item => item.hour === i)[0].count : 0)
              localInHours.push(carlocalInHours.filter(item => parseInt(item.hour) === dataTime[0][i]).length !== 0 ? carlocalInHours.filter(item => item.hour === i)[0].count : 0)
              localOutHours.push(carlocalOutHours.filter(item => parseInt(item.hour) === dataTime[0][i]).length !== 0 ? carlocalOutHours.filter(item => item.hour === i)[0].count : 0)
            }
            let inDays = []
            let outDays = []
            let localInDays = [] // 本地车辆
            let localOutDays = [] // 外地车辆
            // for (let i = 0; i < dataTime[1].length; i++) {
            for (let i = 0; i < new Date().getDate(); i++) {
              inDays.push(carInDays.filter(item => parseInt(item['日期'].split('-')[2]) === parseInt(dataTime[1][i])).length === 0 ? 0 : carInDays.filter(item => parseInt(item['日期'].split('-')[2]) === parseInt(dataTime[1][i]))[0]['次数'])
              outDays.push(carOutDays.filter(item => parseInt(item['日期'].split('-')[2]) === parseInt(dataTime[1][i])).length === 0 ? 0 : carOutDays.filter(item => parseInt(item['日期'].split('-')[2]) === parseInt(dataTime[1][i]))[0]['次数'])
              // 外来车辆
              localInDays.push(carlocalInDays.filter(item => parseInt(item['day'].split('-')[2]) === parseInt(dataTime[1][i])).length === 0 ? 0 : carlocalInDays.filter(item => parseInt(item['day'].split('-')[2]) === parseInt(dataTime[1][i]))[0].count)
              // 本地车辆
              localOutDays.push(carlocalOutDays.filter(item => parseInt(item['day'].split('-')[2]) === parseInt(dataTime[1][i])).length === 0 ? 0 : carlocalOutDays.filter(item => parseInt(item['day'].split('-')[2]) === parseInt(dataTime[1][i]))[0].count)
            }
            let arrCar = [{
              inCar: inHours,
              outCar: outHours,
              localCar: localInHours,
              waidiCar: localOutHours
            }, {
              inCar: inDays,
              outCar: outDays,
              localCar: localInDays,
              waidiCar: localOutDays
            }]
            that.arrCar = arrCar
            that.carLogChange(msg)
          }
        },
        err: function (err) {
          that.passCarLogsType = true
          console.log(err)
        }
      })
    },
    // 获取设备数量
    getNumSb: function () {
      let that = this
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      Post({
        async: true,
        url: apiNames['获取设备数量'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.deviceNumInfo) {
            // console.log(data)
            that.alarmDevices()
            that.getNum = data.deviceNumInfo
            // that.$set(that.getNum, data.deviceNumInfo)
            let numDevice = that.getNum.length / 4
            if (Math.ceil(numDevice) > 2) {
              $('.rightHeight').addClass('aa')
              that.isShow = true
            } else {
              $('.rightHeight').addClass('bb')
              that.isShow = true
            }
            // 获取首页数据
            // that.getshuju()
          }
        },
        err: function (err) {
          console.log(err)
        }
      })
    },
    randNum: function (min, max) {
      return parseInt(Math.random() * (max - min + 1))
    },
    getPeopleInfo: function () {
      let that = this
      that.getPeopleInfoType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['小区当日陌生人员进出', '小区当日关注人员进出']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getPeopleInfoType = true
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            // let
            console.log(obj)
            if (obj.length > 0) {
              that.strangerInOut = obj[0].data || 0
              that.careInOut = obj[1].data || 0
              that.getPeopleInfodata = { title: '人口动态', time1: '通行人员进出', time1Num: obj[0].data, time2: '关注人员进出', time2Num: obj[1].data }
            }
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          that.getPeopleInfoType = true
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    },
    getDoorInfo: function () {
      let that = this
      that.getDoorInfoType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['小区门禁当日开门次数', '小区门禁当日访客开门次数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getDoorInfoType = true
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            that.peopleInOut = obj[0].data
            that.customer = obj[1].data
            console.log(obj)
            that.getDoorInfodata = { title: '通行动态', time1: '门禁开门次数', time1Num: obj[0].data, time2: '访客开门次数', time2Num: obj[1].data }
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          that.getDoorInfoType = true
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    },
    getDevicesInfo: function () {
      let that = this
      that.getDevicesInfoType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['小区当日设备在线', '小区当日设备离线', '小区当日设备故障', '小区当日维修']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getDevicesInfoType = true
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            console.log(obj)
            if (obj.length > 0) {
              that.deviceOnline1 = obj[0].data
              that.getDeviceData = { title: '运维动态', time1: '设备在线', time1Num: obj[0].data, time2: '设备离线', time2Num: obj[1].data, time3: '设备故障', time3Num: obj[2].data, time4: '当日维修', time4Num: obj[3].data }
            }
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          that.getDevicesInfoType = true
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    },
    getAlarmInfo: function () {
      let that = this
      that.getAlarmInfoType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['小区当日预警总数', '小区当日已处理报警数', '小区当日正在处理报警数', '小区当日延期超时报警数', '小区当日未处理报警数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getAlarmInfoType = true
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            // let
            console.log(obj)
            if (obj.length > 0) {
              // 小区预警总数
              that.alarmSumDay = obj[0].data
              // that.deviceOnline1 = 100
              that.alarmDynamics2 = obj[1].data
              that.alarmDynamics3 = obj[2].data
              that.alarmDynamics4 = obj[3].data
              that.alarmDynamics5 = obj[4].data
              that.getAlarminfodata = { title: '报警动态', time1: '报警总数', time1Num: obj[0].data, time2: '已处理', time2Num: obj[1].data, time3: '正在处理', time3Num: obj[2].data, time4: '延期/超时', time4Num: obj[3].data, time5: '未处理', time5Num: obj[4].data }
            }
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          that.getAlarmInfoType = true
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    },
    getStatic: function (sameNum) {
      let that = this
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['社区民警', '居委干部', '楼长人员', '物业人员', '小区总楼数', '小区总住户', '小区总房屋数', '小区车位总数', '小区设备总数', '小区总人数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            // 民警
            if (!obj.filter(item => item.path === '社区民警')) {
              that.police = 0
            } else {
              that.police = obj.filter(item => item.path === '社区民警')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '社区民警')[0].data)
            }
            // 居委
            if (!obj.filter(item => item.path === '居委干部')) {
              that.juwei = 0
            } else {
              that.juwei = obj.filter(item => item.path === '居委干部')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '居委干部')[0].data)
            }
            // 楼长
            if (!obj.filter(item => item.path === '楼长人员')) {
              that.louzhang = 0
            } else {
              that.louzhang = obj.filter(item => item.path === '楼长人员')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '楼长人员')[0].data)
            }
            // wuye
            if (!obj.filter(item => item.path === '物业人员')) {
              that.wuye = 0
            } else {
              that.wuye = obj.filter(item => item.path === '物业人员')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '物业人员')[0].data)
            }
            // 楼栋
            if (!obj.filter(item => item.path === '小区总楼数')) {
              that.buildingSum = 0
            } else {
              that.buildingSum = obj.filter(item => item.path === '小区总楼数')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '小区总楼数')[0].data - 1)
            }
            // 人员
            if (!obj.filter(item => item.path === '小区总人数')) {
              that.peopleSum = 0
            } else {
              that.peopleSum = obj.filter(item => item.path === '小区总人数')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '小区总人数')[0].data)
              setCookie('peopleSum', JSON.parse(obj.filter(item => item.path === '小区总人数')[0].data), 'd30')
            }
            // 房屋
            if (!obj.filter(item => item.path === '小区总房屋数')) {
              that.houseSum = 0
            } else {
              that.houseSum = obj.filter(item => item.path === '小区总房屋数')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '小区总房屋数')[0].data)
              setCookie('houseSum', JSON.parse(obj.filter(item => item.path === '小区总房屋数')[0].data), 'd30')
            }
            // 停车位
            if (!obj.filter(item => item.path === '小区车位总数')) {
              that.parkingSpaceSum = 0
            } else {
              that.parkingSpaceSum = obj.filter(item => item.path === '小区车位总数')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '小区车位总数')[0].data)
            }
            // 设备
            if (!obj.filter(item => item.path === '小区设备总数')) {
              that.deviceSum = 0
            } else {
              that.deviceSum = obj.filter(item => item.path === '小区设备总数')[0].data === "" ? 0 : JSON.parse(obj.filter(item => item.path === '小区设备总数')[0].data)
            }
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    },
    getshuju1: function (sameNum) {
      let that = this
      that.getshuju1Type = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['设备实时状态统计']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getshuju1Type = true
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            /**
             *  实时设备状态统计
             */
            if (!obj.filter(item => item.path === '设备实时状态统计')) {
              that.deviceStateRealtime = []
            } else {
              that.deviceStateRealtime = JSON.parse(obj.filter(item => item.path === '设备实时状态统计')[0].data)
              // 实时设备统计 12条 state 0离线  1正常 2异常
              let device1 = that.deviceStateRealtime
              let allArr = []
              // 对某个字段去重
              for (let i = 0; i < device1.length; i++) {
                let flag = true
                for (let j = 0; j < allArr.length; j++) {
                  if (device1[i].type === allArr[j].type) {
                    flag = false
                  }
                }
                if (flag) {
                  allArr.push(device1[i])
                }
              }
              let allArr1 = []
              for (let i = 0; i < allArr.length; i++) {
                let obj = {
                  type: allArr[i].type,
                  stateData: [{
                    state: 0,
                    count: (device1.filter(item => item.state === 0 && item.type === allArr[i].type)[0] ? device1.filter(item => item.state === 0 && item.type === allArr[i].type)[0].count : 0)
                  }, {
                    state: 1,
                    count: (device1.filter(item => item.state === 1 && item.type === allArr[i].type)[0] ? device1.filter(item => item.state === 1 && item.type === allArr[i].type)[0].count : 0)
                  }, {
                    state: 2,
                    count: (device1.filter(item => item.state === 2 && item.type === allArr[i].type)[0] ? device1.filter(item => item.state === 2 && item.type === allArr[i].type)[0].count : 0)
                  }],
                  typeName: allArr[i].typeName ? allArr[i].typeName : '不明'
                }
                allArr1.push(obj)
              }
              // console.log(allArr1)
              let dataX = []
              let ser0 = []
              let ser1 = []
              let ser2 = []
              // var serall = []
              allArr1 = allArr1.sort(function (a, b) {
                return b.stateData[1].count - a.stateData[1].count
              })
              allArr1 = _.chunk(allArr1, 5)[0]
              for (let i = 0; i < allArr1.length; i++) {
                dataX.push(allArr1[i].typeName)
                ser0.push(allArr1[i].stateData[0].count)
                ser1.push(allArr1[i].stateData[1].count)
                ser2.push(allArr1[i].stateData[2].count)
                // serall.push(ser0[i] + ser1[i] + ser2[i])
              }
              // 已分别获取到 X轴以及数据
              let op3 = that.$refs.trend_device_bar
              if (that.pageInfoType === true) {
                op3.option.yAxis.data = dataX
                op3.option.series[0].data = ser0
                op3.option.series[1].data = ser1
                op3.option.series[2].data = ser2
                // op3.option.series[3].data = serall
                op3.refresh()
              }
            }
          } else {
            console.log('设备运维情况-获取数据失败')
          }
        },
        err: function (err) {
          that.getshuju1Type = true
          console.log(JSON.stringify(err) + '设备运维情况 获取统计图表')
        }
      })
    },
    getshuju: function (sameNum) {
      let that = this
      that.getshujuType = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['车辆驻留']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getshujuType = true
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            if (!obj.filter(item => item.path === '车辆驻留')) {
              that.carZhuliu = 0
            } else {
              that.carZhuliu = JSON.parse(obj.filter(item => item.path === '车辆驻留')[0].data)
            }
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          that.getshujuType = true
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    },
    getshuju2: function (sameNum) {
      let that = this
      that.getshuju2Type = false
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['小区驻留人数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getshuju2Type = true
          if (data.responseStatus.resultCode === 0) {
            let obj = that.datas = data.datas
            // 人口驻留
            if (!obj.filter(item => item.path === '小区驻留人数')) {
              that.renkouzhuliu = 0
            } else {
              that.renkouzhuliu = JSON.parse(obj.filter(item => item.path === '小区驻留人数')[0].data)
            }
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          that.getshuju2Type = true
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    },
    getCarInfo () {
      let that = this
      that.getCarInfoType = false
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['小区当日驶入登记数量', '小区当日驶入外来数量', '小区当日驶出登记数量', '小区当日驶出外来数量']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          that.getCarInfoType = true
          if (data.datas) {
            that.registrationin = isNullOrEmpty(data.datas[0].data) ? 0 : Number(data.datas[0].data)
            that.foreignin = isNullOrEmpty(data.datas[1].data) ? 0 : Number(data.datas[1].data)
            that.registrationout = isNullOrEmpty(data.datas[2].data) ? 0 : Number(data.datas[2].data)
            that.foreignout = isNullOrEmpty(data.datas[3].data) ? 0 : Number(data.datas[3].data)
            that.realTimesum = that.registrationin + that.foreignin + that.registrationout + that.foreignout
          }
        },
        error: (err) => {
          that.getCarInfoType = true
          console.log(err)
        }
      })
    },
    getPublic () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      reqParam.paths = ['当日公共管理报警数', '当日公共服务报警数', '当日公共安全报警数']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.datas) {
            that.managementpublic = data.datas[0].data
            that.servicepublic = data.datas[1].data
            that.securitypublic = data.datas[2].data
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取人员分类感知
    getPeopleClass: function () {
      let that = this
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [ConfigVillageIDs]
      reqParam.paths = ['人员分类感知']
      Post({
        async: true,
        url: apiNames['获取统计图表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getDoorInfoType = true
          if (data.responseStatus.resultCode === 0) {
            setTimeout(() => {
              let ops = that.$refs.trend_people_pie
              let obj = JSON.parse(data.datas[0].data).data
              ops.option.series[0].data = [{
                value: obj.villagePeopleCount,
                name: '本小区通行人数',
                selected: true
              }, {
                value: obj.strangerPeopleCount,
                name: '陌生人通行人数'
              }, {
                value: obj.focusPeopleCount,
                name: '重点关注通行人数'
              }]
              ops.option.series[1].data = [{
                value: obj.villageCount,
                name: '本小区通行人次'
              }, {
                value: obj.strangerCount,
                name: '陌生人通行人次'
              }, {
                value: obj.focusCount,
                name: '重点关注通行人次'
              }]
              // options.series[0].data[0].value = obj.villagePeopleCount
              // options.series[0].data[1].value = obj.strangerPeopleCount
              // options.series[0].data[2].value = obj.focusPeopleCount
              // options.series[1].data[0].value = obj.villageCount
              // options.series[1].data[1].value = obj.strangerCount
              // options.series[1].data[2].value = obj.focusCount
              ops.refresh()
            }, 500)
          } else {
            console.log('获取数据失败')
          }
        },
        err: function (err) {
          console.log(JSON.stringify(err) + 'allState 获取统计图表')
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    console.log('销毁销毁')
    clearInterval(this.timer)
    next()
  },
  watch: {
    alarmSumDay: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber2: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber2: newValue })
    },
    customer: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber3: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber3: newValue })
    },
    peopleInOut: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber4: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber4: newValue })
    },
    strangerInOut: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber5: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber5: newValue })
    },
    careInOut: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber6: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber6: newValue })
    },
    carInOut: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber7: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber7: newValue })
    },
    carLocal: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber8: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber8: newValue })
    },
    carForeign: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber9: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber9: newValue })
    },
    carForeignStay: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber10: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber10: newValue })
    },
    deviceOnline1: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber90: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber90: newValue })
    },
    alarmDynamics2: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber92: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber92: newValue })
    },
    alarmDynamics3: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber93: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber93: newValue })
    },
    alarmDynamics4: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber94: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber94: newValue })
    },
    alarmDynamics5: function (newValue) {
      TweenLite.from(this.$data, 0.4, { tweenedNumber95: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { tweenedNumber95: newValue })
    },
    realTimesum (newValue) {
      TweenLite.from(this.$data, 0.4, { realTimeSum: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { realTimeSum: newValue })
    },
    registrationin (newValue) {
      TweenLite.from(this.$data, 0.4, { registrationIn: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { registrationIn: newValue })
    },
    foreignin (newValue) {
      TweenLite.from(this.$data, 0.4, { foreignIn: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { foreignIn: newValue })
    },
    registrationout (newValue) {
      TweenLite.from(this.$data, 0.4, { registrationOut: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { registrationOut: newValue })
    },
    foreignout (newValue) {
      TweenLite.from(this.$data, 0.4, { foreignOut: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { foreignOut: newValue })
    },
    managementpublic (newValue) {
      TweenLite.from(this.$data, 0.4, { managementPublic: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { managementPublic: newValue })
    },
    servicepublic (newValue) {
      TweenLite.from(this.$data, 0.4, { servicePublic: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { servicePublic: newValue })
    },
    securitypublic (newValue) {
      TweenLite.from(this.$data, 0.4, { securityPublic: Math.ceil(newValue / 5) })
      TweenLite.to(this.$data, 0.8, { securityPublic: newValue })
    },
    '$route': function (oldVal, newval) {
      console.log(this.$route.path)
      let that = this
      if (this.$route.path === '/home/trend/allState') {
        that.pageInfoType = true
        that.getPeopleInfo()
        that.getAlarmInfo()
        that.getDevicesInfo()
        that.getDoorInfo()
        that.getRealPeople()
        that.getRealHourse()
        that.passCarLogs()
        that.getshuju()
        that.getshuju1()
        that.getshuju2()
        that.getCarInfo()
        clearInterval(that.timer)
        this.timer = setInterval(function () {
          if (that.getPeopleInfoType === true) {
            that.getPeopleInfo()
          }
          if (that.getAlarmInfoType === true) {
            that.getAlarmInfo()
          }
          if (that.getDevicesInfoType === true) {
            that.getDevicesInfo()
          }
          if (that.getDoorInfoType === true) {
            that.getDoorInfo()
          }
          if (that.getRealPeopleType === true) {
            that.getRealPeople()
          }
          if (that.getRealHourseType === true) {
            that.getRealHourse()
          }
          if (that.passCarLogsType === true) {
            that.passCarLogs()
          }
          if (that.getshujuType === true) {
            that.getshuju()
          }
          if (that.getshuju1Type === true) {
            that.getshuju1()
          }
          if (that.getshuju2Type === true) {
            that.getshuju2()
          }
          if (that.getCarInfoType === true) {
            that.getCarInfo()
          }
          console.log('重新执行')
        }, 5000)
      } else {
        that.pageInfoType = false
      }
    }
  }
}
</script>
<style scoped>
.fontFamily {
  font-family: 'tsl';
}
/**/
.number-grow-warp {
  transform: translateZ(0);
}
.number-grow {
  font-family: Arial-BoldMT;
  font-size: 64px;
  color: #ffaf00;
  letter-spacing: 2.67px;
  margin: 110px 0 20px;
  display: block;
  line-height: 64px;
}
/**/
.bot-title > div span {
  display: inline-block;
  width: 5px;
  height: 5px;
  float: left;
  margin: 0.1rem 4px 0 4px;
  margin-top: 0.1rem;
  background-color: #f0ad4e;
}
.bot-title > div p {
  float: left;
  padding-right: 10px;
}
.bot-title > div {
  float: left;
  color: rgb(2, 246, 255);
  /* font-size: 0.35rem !important; */
}
.stars li {
  display: inline-block;
  grid-template-columns: 20% 20% 20% 20% 20% !important;
  color: #f0ad4e;
  font-size: 0.7rem !important;
  width: 80% !important;
  margin: auto;
  text-align: center;
}
.stars {
  margin-top: 0.1rem;
  width: auto !important;
  margin-bottom: 0.1rem;
}
 .echartTitle {
  top: .2rem !important;
}
* {
  font-family: 'tslfont' !important;
}
.rightHeight {
  width: 100%;
}
.leftTop {
  grid-template-rows: 4rem 1fr 1fr 1fr;
}
.aa {
  display: grid;
  grid-template-rows: 5.4rem 1fr 1fr 1fr;
}
.bb {
  display: grid;
  grid-template-rows: 4rem 1fr 1fr 1fr;
}
canvas {
  height: 100%;
}
.detail {
  color: red;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.detail .contentBox {
  /* font-weight: bold; */
  padding: 0.15rem 0.2rem;
  background-color: rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border: 2px solid #00d2ff;
  position: absolute;
  border-left: none;
  border-right: none;
}
.contentBox li {
  display: grid;
  /* height:0.5rem; */
  line-height: 0.6rem;
  grid-template-columns: 3rem auto;
  width: 100%;
}
.contentBox li > div:nth-of-type(1) {
  text-align: left;
}
.contentBox li > div:nth-of-type(2) {
  text-align: center;
}
.con {
  color: transparent;
  font-family: '微软雅黑';
  -webkit-text-fill-color: transparent;
  box-sizing: border-box;
  /*background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)), to(rgba(0, 210, 255, 1)));*/
  -webkit-background-clip: text;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(rgba(255, 255, 255, 1)),
    to(rgba(255, 255, 255, 1))
  );
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}
.cir {
  background-color: rgba(6, 94, 175, 0.7);
  width: 0.38rem;
  height: 0.38rem;
  border-radius: 50%;
  /* border: 0.1rem solid rgba(6,94,175,.4); */
  position: absolute;
  animation: scral 2s linear infinite;
}
@keyframes scral {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
}
.cir div {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  margin: 0.09rem auto 0;
  background-color: rgba(70, 255, 6, 0.8);
}
.detail .contentBox:nth-of-type(1),
.detail .contentBox:nth-of-type(2),
.detail .contentBox:nth-of-type(6),
.detail .contentBox:nth-of-type(7) {
  animation: runLeft 5s linear infinite;
  left: 2.2%;
  top: 16%;
}
.detail > .contentBox:hover {
  animation: d 3s linear infinite !important;
}
@keyframes d {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 0);
  }
  75% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
.detail .contentBox:nth-of-type(3),
.detail .contentBox:nth-of-type(4),
.detail .contentBox:nth-of-type(5) {
  animation: runRight 5s linear infinite;
}
.detail .contentBox:nth-of-type(2) {
  left: 5.3%;
  top: 56.3%;
}
.detail .contentBox:nth-of-type(3) {
  left: 70%;
  top: 17.8%;
}
.detail .contentBox:nth-of-type(4) {
  left: 76%;
  top: 65.2%;
}
.detail .contentBox:nth-of-type(5) {
  left: 35%;
  top: 79.8%;
}
.cir1 {
  left: 39%;
  top: 31%;
}
.cir2 {
  left: 46.6%;
  top: 49.5%;
}
.cir3 {
  right: 28%;
  top: 47.4%;
}
.cir4 {
  right: 23%;
  top: 55.5%;
}
.cir5 {
  left: 68%;
  top: 69.8%;
}
.bgCenter1 {
  padding: 5px;
  box-sizing: border-box;
}
.bgCenter1 img {
  width: 100%;
}
/* 态势中间部分 */
.bgCenter {
  background: url('../../../../assets/images/people.jpg') no-repeat center top;
  background-size: cover;
  position: relative;
}
.allState {
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 10rem 1fr 10rem;
  grid-gap: 0.2rem;
  padding: 0 0.1rem !important;
}
/* .happy-scroll_1{
  width:10rem !important;
} */
/**********************标题样式设置**************/
.title {
  height: 0.61rem;
  line-height: 0.61rem;
  font-size: 0.16rem;
  position: relative;
  text-align: center;
  margin-top: 0.1rem;
  font-weight: bold;
}
.title > img {
  position: absolute;
  height: 0.61rem;
  /* width: auto !important; */
  top: 50%;
  transform: translate(0, -50%);
}
.title > img:nth-of-type(1) {
  left: 0;
}
.title > img:nth-of-type(2) {
  right: 0;
}
.title > p {
  font-family: '微软雅黑';
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 bottom,
    from(rgba(0, 255, 162, 1)),
    to(rgba(6, 255, 252, 1))
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
/**********************************************/
.two > img {
  height: 0.4rem !important;
}
.allStateTitle {
  font-size: 0.45rem;
  width: 4.58rem;
  height: 0;
  border-bottom: 0.75rem solid rgba(0, 210, 255, 0.5);
  border-right: 0.47rem solid transparent;
  line-height: 0.75rem;
  padding: 0 0.2rem;
  color: rgba(255, 255, 255, 0.9);
}

@keyframes runLeft {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-0.2rem);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(0.2rem);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes runRight {
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateX(-0.2rem);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(0.2rem);
  }
  100% {
    transform: translateX(0);
  }
}
.people_ul {
  position: absolute;
  right: 1rem;
  top: .3rem;
}
.people_ul li {
  color: #fff;
  font-size: .28rem;
  margin: .2rem 0 ;
  font-family: none !important;
}
.people_ul li span{
  display: inline-block;
  width: .23rem;
  height: .23rem;
  position: relative;
  top: .05rem;
  margin-right: .2rem;
}
.people_ul li:nth-of-type(1) span {
  background: #04b5f2;
}
.people_ul li:nth-of-type(2) span {
  background: #40E0D0;
}
.people_ul li:nth-of-type(3) span {
  background: #9370DB;
}
@media screen and (min-width: 0px) and (max-width: 3000px) {
  .bgCenter {
    background: url('../../../../assets/images/people.jpg') no-repeat center top;
    background-size: cover;
  }
  .detail > .contentBox:nth-of-type(6) {
    /* display: none; */
    opacity: 0;
  }
  .detail > .contentBox:nth-of-type(7) {
    opacity: 0;
    /* display: none; */
  }
}
@media screen and (min-width: 3000px) and (max-width: 6000px) {
  /* .detail .contentBox {
    width: 8.48rem;
    font-size: 0.8rem !important;
  } */
  .cir {
    display: none;
  }
  .bgCenter {
    background: url('../../../../assets/images/map.jpg') no-repeat center top;
    background-size: cover;
  }
  .allState {
    grid-template-columns: 14.6rem 1fr 14.6rem;
  }
  .detail > .contentBox:nth-of-type(1) {
    left: 10%;
    top: 16.3%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(2) {
    left: 68.2%;
    top: 25.2%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(3) {
    left: 30%;
    top: 15.8%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(4) {
    left: 20.6%;
    top: 57.5%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(5) {
    left: 80.9%;
    top: 16.2%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(6) {
    left: 63%;
    top: 43.6%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(7) {
    left: 44.5%;
    top: 13.5%;
    transform: translate(-50%, -50%);
  }
}
@media screen and (min-width: 3000px) and (max-width: 6000px) {
  .allState {
    grid-template-columns: 14.6rem 1fr 14.6rem;
  }
  .contentBox li {
    line-height: 0.7rem;
    grid-template-columns: 4rem auto;
    width: 100%;
  }
}
@media screen and (min-width: 6001px) {
  .allState {
    grid-template-columns: 20.6rem 1fr 20.6rem;
  }
  .title {
    height: 1.2rem;
    line-height: 1.2rem;
  }
  .contentBox li {
    line-height: 1.2rem;
    grid-template-columns: 7rem auto;
    width: 100%;
  }
  .cir {
    display: none;
  }
  .bgCenter {
    background: url('../../../../assets/images/map.jpg') no-repeat center top;
    background-size: cover;
  }
  .detail > .contentBox:nth-of-type(1) {
    left: 4%;
    top: 16.3%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(2) {
    left: 73.2%;
    top: 24.2%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(3) {
    left: 29%;
    top: 15.8%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(4) {
    left: 17%;
    top: 55%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(5) {
    left: 87.9%;
    top: 11%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(6) {
    left: 68%;
    top: 41.6%;
    transform: translate(-50%, -50%);
  }
  .detail > .contentBox:nth-of-type(7) {
    left: 47.5%;
    top: 12.5%;
    transform: translate(-50%, -50%);
  }
  .allStateTitle {
    width: 9.5rem;
    height: 0;
    line-height: 1.2rem;
  }
  .allStateTitle[data-v-76697a61] {
    border-bottom: 1.15rem solid rgba(0, 210, 255, 0.5);
  }
}
</style>
