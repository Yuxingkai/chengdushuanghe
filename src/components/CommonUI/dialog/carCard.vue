<template>
  <pop
    css="width:19.6rem;"
    title="车辆卡口信息"
    :level="param.level">
    <!-- 大图弹出 -->
    <div style="padding:25px 8px 5px;height:auto;position: absolute;width:70%;z-index:9999;left:50%;top:50%;transform:translate(-50%,-50%);min-height:1rem;">
      <transition
        name="aa"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        style="">
        <Box3
          type='1'
          class='zhezhao'
          css='padding:0 0.1rem;box-sizing:border-box;-moz-box-shadow: 0px 0px 45px 15px #071225; box-shadow: 0px 0px 45px 15px #071225;background-color:rgba(0,0,0,.7);min-height:0.7rem;'
          v-show='showImg'>
          <p
            class="pClose"
            @click="pClose">
            <span><img
              src="../../../assets/images/close.svg"
              alt=""
              class="a"></span>
          </p>
          <!-- <div v-show='showImg'>暂无图片</div> -->
          <img
            class="b"
            :src="imgUrl"
            alt="">
            <!-- <img class="b" src="http://47.75.190.168:9000/blueplus/Car/20180615/7b273251-f9d6-447c-9b3e-c7111d661dc6.jpg" alt="" > -->
        </Box3>
      </transition>
    </div>
    <!-- <div class="content"
         style="padding-left:0.1rem;padding-top: .1rem;">
      <boxTitle title='车卡统计'
                style="margin-top:0.1rem;"></boxTitle>
      <Box3 type='1'
            css='width:4.55rem;padding:0;'>
        <echart config='dialong_car_pie'
                height='3.3rem'
                style="margin:0.1rem 0 0 0rem;"
                ref="aaa"></echart>
      </Box3>
      <Box3 type='1'
            css="margin-top:0.1rem;">
        <echart config='dialong_car_line'
                height='3.3rem'
                style="margin:0.1rem 0 0 0rem;"></echart>
      </Box3>
      <Box3 type='1'
            css="margin-top:0.1rem;">
        <echart config='dialong_car_line_1'
                height='3.3rem'
                style="margin:0.1rem 0 0 0rem;"></echart>
      </Box3>
    </div> -->
    <div
      class="content center"
      style="">
      <boxTitle
        title='实时视频'
        style="margin-top:0.05rem;"/>
      <RadioTabs
        @on-index-changed='getImg'
        :items='inOutName'
        :show-type="groupTypeNum"
        css="position: absolute;right:.12rem;top:0.68rem;height: .52rem;background:#071225"/>
      <Box3
        type='3'
        css='width:11.65rem;height:7.25rem;margin:0.15rem auto 0 auto;'>
        <loading :visible="isLoading1"/>
        <!-- 实时视频 -->
        <div
          class="tv five_video"
          v-show="tvShow">
          <player
            :src="videoSrc"
            style="transform: scale(1);transform-origin: 0 0;" />
            <!-- <player src="rtmp://31.0.167.62:11985/live/camera_226"/> -->
        </div>
      </Box3>
      <!-- 实时抓拍8张 -->
      <div>
        <h3
          class="ti sliderTilSmall"
          style="margin-top:0.3rem;">实时抓拍8张</h3>
        <div class="middle_ul">
          <ul class="">
            <swiper
              :options="swiperOption"
              ref="mySwiper"
              class="swiper-no-swiping">
              <swiper-slide
                v-for="(item, index) in fistImg"
                :key="index">
                <div class="ul_div">
                  <li>
                    <span
                      v-text="item.isRegister == 0 ? '外来':'本地'"
                      :class="{otherCar : item.isRegister == 1 ? true : false}"/>
                    <Box3 css="position: relative;overflow:none;height:auto;"><img
                      :src="item.minPlatePic"
                      :alt="item.plateNo"
                      :title="item.passTime"
                      @click="bigImg(item.platePic)">
                      <p
                        class="ul_time"
                        :title="item.passTime"
                        style="">{{ item.passTime | splitime }}</p>
                    </Box3>
                  </li>
                </div>
              </swiper-slide>

            </swiper>
            <div
              class="swiper-button-prev click_left"
              slot="button-prev"/>
            <div
              class="swiper-button-next click_right"
              slot="button-next"/>
          </ul>
        </div>
      </div>
    </div>
    <div class="p_right content">
      <div
        class="p_right_top"
        style="padding-top:0.05rem;box-sizing:border-box;">
        <boxTitle title="实时通行"/>
        <Box3 css="">
          <ul class="ul_right_top">
            <li><p>当日驶入车辆数</p><span>{{ getCarStatics.inNum }}</span></li>
            <li><p>当前滞留数</p><span>{{ getCarStatics.detainNum }}</span></li>
            <li><p>当日驶出车辆数</p><span>{{ getCarStatics.outNum }}</span></li>
            <li><p>空闲车位数</p><span>{{ getCarStatics.availableNum }}</span></li>
          </ul>
          <!--<InfoGroup type='6'-->
          <!--css="padding:0.2rem 0.2rem;"-->
          <!--columns="2"-->
          <!--columnGap="">-->
          <!--<InfoLabel title="当日驶入车辆数"-->
          <!--:num="getCarStatics.inNum"-->
          <!--type="6"></InfoLabel>-->
          <!--<InfoLabel title="当前滞留数"-->
          <!--:num="getCarStatics.detainNum"-->
          <!--type="6"></InfoLabel>-->
          <!--<InfoLabel title="当日驶出车辆数"-->
          <!--:num="getCarStatics.outNum"-->
          <!--type="6"></InfoLabel>-->
          <!--<InfoLabel title="空闲车位数"-->
          <!--:num="getCarStatics.availableNum"-->
          <!--type="6"></InfoLabel>-->
          <!--</InfoGroup>-->
          <div
            class="showTitle clear"
            style="display: none">
            <div
              class="fl1"
              style="margin-left:1px;">
              <span>当前滞留率</span>
              <span>
                <em>{{ detainNum1 }}</em>
              </span>
            </div>
            <div
              class="fr1"
              style="margin-right:1px;">
              <span>外来停放数</span>
              <span>
                <em>0</em>
              </span>
            </div>
          </div>
          <!-- <echart config='dialong_car_bar'
                  ref="dialogCar"
                  height="2rem"
                  style="bottom:0;"></echart> -->
        </Box3>
      </div>
      <div
        class="p_right_bottom"
        style="position: relative;height: 7.9rem;">
        <boxTitle title="12小时通行记录"/>
        <RadioTabs
          @on-index-changed='getList'
          items="驶入,驶出"
          :show-type="groupTypeNum"
          css="height:0.43rem;line-height:.42rem;;height:.5rem;font-size: .28rem;padding:0 .1rem;position: absolute;right:0;top:0.55rem;background:#071225"/>
        <Box3 css="margin-top:.08rem;padding-bottom:0.4rem;overflow-x: hidden;">
          <loading :visible="isLoading2"/>
          <p class="right_p">
            <span>车牌</span>
            <span>属性</span>
            <span>时间</span>
            <span>进/出</span>
            <span>照片</span>
          </p>
          <div :class="{ 'wipe' : wipe === true }">
            <happy-scroll
              size="2"
              hide-horizontal
              style="height:7rem;"
              resize>
              <ul
                class="right_ul textCon"
                style="padding-top:0.1rem;">
                <li
                  v-if="showAll"
                  style="color:#fff;font-size:0.35rem;text-align: center;background: none;"><p>未找到通行记录</p></li>
                <li
                  v-for="(item,index) in recodeNum"
                  :key="item.id"
                  @click="select(index)"
                  :class="{'fontColor': item.isRegister !== 1 ? true :false}">
                  <p>{{ item.plateNo }}
                    <!--<span class="mark">外来</span>-->
                  </p>
                  <p>{{ item.isRegister | splitName }}</p>
                  <p
                    style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                    :title="item.passTime">{{ item.passTime | splitime }}</p>
                  <p>{{ item.inout }}</p>
                  <p
                    class="right_ul_p"
                    @click="bigImg(item.platePic)">
                    <span class="videoTvIcon"/>
                  </p>
                </li>
              </ul>
            </happy-scroll>
          </div>
        </Box3>
      </div>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'
import user from '../../../Utils/user'
import {apiNames, imgUrl} from '../../../config/config'
import {Post, PostCopy} from '../../../Utils/Http'

let _ = require('lodash')
export default {
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
      groupTypeNum: 2,
      innerIndex: 0,
      imgUrl: '',
      showImg: false,
      videoSrc: '',
      showAll: false,
      fistImg: [],
      inOutName: '',
      baseUrl: imgUrl,
      carNum: [
        { 'title': '单日驶入车辆数', 'num': '1' },
        { 'title': '当前滞留率', 'num': '20%' },
        { 'title': '当日驶出车辆数', 'num': '3' },
        { 'title': '超出车位数', 'num': '4' }
      ],
      parkNum: [
        { 'title': '当前滞留率', 'num': '90%' },
        { 'title': '当前停放数', 'num': '289' }
      ],
      recodeNum: [],
      imgInfo: [],
      getCarStatics: {inNum: 0, detainNum: 0, outNum: 0, availableNum: 0},
      swiperOption: {
        slidesPerView: 4,
        noSwiping: true,
        slidesPerGroup: 4,
        spaceBetween: 2,
        notNextTick: true,
        speed: 500,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: false
        }
      },
      isLoading1: '',
      isLoading2: '',
      isLoading3: '',
      numA: 0,
      numB: 0,
      tvShow: false,
      timer: '',
      getNumInfo: false,
      ioidInfo: '',
      wipe: false,
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: ''
    }
  },
  computed: {
    // getIsLoading: function () {
    //   return this.isLoading2
    // },
    detainNum1: function () {
      return (parseFloat(this.getCarStatics.detainNum / this.getCarStatics.currentNum).toFixed(4) * 100 + '%')
      // if (!this.getCarStatics.detainNum) {
      //   return '100%'
      // } else {
      //   return (parseFloat(this.getCarStatics.detainNum / this.getCarStatics.currentNum).toFixed(4) * 100 + '%')
      // }
    }
    // getIsLoading: function () {
    //   return this.isLoading1 || this.isLoading2 || this.isLoading3
    // }
  },
  components: {
    pop,
    boxTitle
  },
  filters: {
    splitime: function (value) {
      if (value) {
        value = value.split(' ')[1]
      } else {
        value = ''
      }
      return value
    },
    splitName: function (value) {
      if (value === 1) {
        value = '本地'
      } else {
        value = '外来'
      }
      return value
    }
  },
  created () {
    this.getImg()
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.getList()
    this.getCarStatic()
    this.ioidInfo = this.param.e.ioID
    let that = this
    this.$bus.on('/web/event/map/parkingLog', function (a) {
      let obj = JSON.parse(a)
      // 长宁使用代码
      if (obj.ioID) {
        if (obj.ioID === that.ioidInfo) {
          that.getCarStatic()
          that.getList()
          that.fistImg.unshift(obj)
          if (that.fistImg.length > 8) {
            that.fistImg = _.chunk(that.fistImg, 8)[0]
          }
        }
      } else {
        that.getCarStatic()
        that.getList()
        that.fistImg.unshift(obj)
        if (that.fistImg.length > 8) {
          that.fistImg = _.chunk(that.fistImg, 8)[0]
        }
      }
    })
    that.timer = setInterval(function () {
      if (that.getNumInfo === true) {
        that.getCarStatic()
        console.log('2')
      }
    }, 3000)
    console.log(this.inOutName)
  },
  methods: {
    pClose: function () {
      this.showImg = false
    },
    bigImg: function (index) {
      this.showImg = true
      this.imgUrl = index
    },
    select: function (index) {
      this.innerIndex = index
      console.log(this.innerIndex)
    },
    getCarStatic: function () {
      let that = this
      that.getNumInfo = false
      let reqParam = user.getRequestHeader()
      if (this.param.e.ioID) {
        let ioIDarr = []
        ioIDarr.push(this.param.e.ioID)
        reqParam.ioIDs = ioIDarr
      } else {
        console.log('ioID不存在')
        return false
      }
      // this.isLoading1 = true
      Post({
        async: true,
        url: apiNames['获取出入口相关设备'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.getNumInfo = true
          // 获取停车场通行日志
          // console.log(data)
          // 从出入口设备获取停车场的parkingID  值固定
          if (data.devices.length > 0) {
            let parkingID = data.devices[0].parkingID
            // console.log(parkingID)
            let reqParam = user.getRequestHeader()
            reqParam.parkingID = parkingID
            console.log(JSON.stringify(reqParam, '====++++'))
            Post({
              async: true,
              url: apiNames['获取停车场通行统计'],
              data: reqParam,
              dataType: 'json',
              success: function (data) {
                that.getCarStatics = data
              },
              err: function (err) {
                that.getNumInfo = true
                console.log(JSON.stringify(err) + 'popup-carCard 获取停车场通行统计')
              }
            })
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-carCard 获取出入口相关设备')
        }
      })
    },
    getImg: function (msg) {
      // 获取车牌图片
      let num = 0
      if (!msg) {
        num = this.numA
      } else {
        this.numA = msg[1]
        num = msg[1]
      }
      let that = this
      // let parkingID = '3159be2a54d811e88ce8005056c00'
      let reqParam = user.getRequestHeader()
      if (this.param.e.ioID) {
        let ioIDarr = []
        ioIDarr.push(this.param.e.ioID)
        reqParam.ioIDs = ioIDarr
      } else {
        console.log('ioID不存在')
        return false
      }
      that.isLoading1 = true
      Post({
        async: false,
        url: apiNames['获取出入口相关设备'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          console.log(data)
          // 获取停车场通行日志
          that.isLoading1 = false
          if (data.devices.length > 0) {
            if (data.devices.length === 1) {
              let deviceId = data.devices[0].deviceID
              that.getstrema(deviceId)
            } else {
              // 非长宁使用
              if (num === 0) {
                that.getstrema(data.devices[1].deviceID)
                // that.videoSrc = data.devices[1].streamSource
              } else if (num === 1) {
                that.getstrema(data.devices[0].deviceID)
                // that.videoSrc = data.devices[0].streamSource
              }
            }
            // 长宁使用
            // that.videoSrc = data.devices[0].streamSource
            // that.inOutName = data.devices[num].name
            let arrName = []
            for (let i = 0; i < data.devices.length; i++) {
              arrName.push(data.devices[i].name)
            }
            that.inOutName = _.chunk(arrName, 1).reverse().join(',')
            console.log(that.inOutName)
            that.tvShow = true
            let parkChanID = data.devices[num].parkChanID
            reqParam.parkChanID = parkChanID
            console.log(reqParam)
            Post({
              async: true,
              url: apiNames['获取停车场通行日志'],
              data: reqParam,
              dataType: 'json',
              success: function (data) {
                that.fistImg = []
                if (data.responseStatus.resultMessage === '未找到通行记录') {
                  console.log('getImg数据库无数据')
                } else {
                  that.fistImg = []
                  console.log(data.parkingLogs)
                  let data1 = _.chunk(data.parkingLogs, 8)[0]
                  for (let i = 0; i < data1.length; i++) {
                    that.fistImg.push(data1[i])
                  }
                }
              },
              err: function (err) {
                console.log(JSON.stringify(err) + 'popup-carCard 获取停车场通行日志')
              }
            })
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-carCard 获取出入口相关设备')
        }
      })
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
            that.videoSrc = that.playUrl + data.Data.RTMP
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
    },
    getList: function (msg) {
      // 获取车辆进出记录
      let num = 0
      if (!msg) {
        num = this.numB
      } else {
        this.numB = msg[1]
        num = msg[1]
      }
      let reqParam = user.getRequestHeader()
      console.log(this.param)
      if (this.param.e.ioID) {
        let ioIDarr = []
        ioIDarr.push(this.param.e.ioID)
        reqParam.ioIDs = ioIDarr
      } else {
        console.log('ioID不存在')
        return false
      }
      let that = this
      that.isLoading2 = true
      Post({
        async: true,
        url: apiNames['获取出入口相关设备'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.devices.length === 0) {
            that.showAll = true
          } else {
            let parkChanID = data.devices[num].parkChanID
            reqParam.parkChanID = parkChanID
            Post({
              async: true,
              url: apiNames['获取停车场通行日志'],
              data: reqParam,
              dataType: 'json',
              success: function (data) {
                that.isLoading2 = false
                if (data.responseStatus.resultCode === 0 && data.responseStatus.resultMessage === '未找到通行记录') {
                  that.recodeNum = data.parkingLogs
                  that.showAll = true
                } else {
                  that.showAll = false
                  that.recodeNum = data.parkingLogs
                }
              },
              err: function (err) {
                console.log(JSON.stringify(err) + 'popup-carCard 获取停车场通行日志')
              }
            })
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-carCard 获取出入口相关设备')
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped>
.swiper-no-swiping {
  height: 100% !important;
}

.ul_time {
  width: 100%;
  height: 0.5rem;
  text-align: center;
  box-sizing: border-box;
  font-size: 0.32rem;
  padding-right: 0.2rem;
  line-height: 0.6rem;
  position: absolute;
  color: rgba(0, 210, 255, 1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.pClose {
  position: absolute;
  right: 5px;
  top: 5px;
  width: 0.5rem;
  height: 0.5rem;
  background: rgba(255, 8, 8, 0.76);
  cursor: pointer;
}

/* .pClose span */
.pClose span .a {
  width: 0.4rem;
  text-align: center;
  height: 0.4rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.pClose:hover {
  background: rgba(255, 8, 8, 0.76);
}

.zhezhao {
  box-sizing: border-box;
}

.zhezhao .b {
  width: 100%;
  margin-top: 6px;
}

.tv {
  margin: 0 auto;
  height: 100%;
}

.tab td {
  text-align: center;
  height: 0.56rem;
  padding: 0.05rem 0;
  font-size: 0.2rem;
  line-height: 0.56rem;
  color: rgba(255, 255, 255, 0.8);
  position: relative;
}

.mark {
  width: 0.8rem;
  height: 0.4rem;
  line-height: 0.222rem;
  text-align: center;
  display: inline-block;
  font-size: 0.2rem;
  color: #ffffff;
  background: #348bd5;
  background: linear-gradient(45deg, transparent 0.08rem, #348bd5 0);
  position: absolute;
  right: -0.4rem;
  top: -0.12rem;
  box-sizing: border-box;
  padding-top: 0.1rem;
}

.tab {
  margin-left: -1px;
  text-align: center;
  width: 100%;
}

.tab tr {
  width: 100%;
}

.tab th {
  color: #a4edfc;
  padding: 0.2rem 0 0.1rem 0;
}

.tab_lin:nth-of-type(2n-1) {
  background-color: rgba(255, 255, 255, 0.2);
}

.showTitle {
  width: 100%;
  height: 0.74rem;
  margin-top: 0.1rem;
}

.showTitle > div {
  width: 48%;
  background-color: #a4edfc;
  color: black;
  font-weight: bold;
  box-sizing: border-box;
  font-size: 0.32rem;
  line-height: 0.74rem;
  padding-left: 0.15rem;
  display: table;
}

.showTitle .fl1 {
  float: left;
  width: 49%;
  box-sizing: border-box;
}

.showTitle .fr1 {
  float: right;
  width: 49%;
  margin-left: -1px;
  box-sizing: border-box;
}

.showTitle div > span {
  float: left;
}

.showTitle div > span:nth-of-type(1) {
  width: 60%;
}

.showTitle div > span:nth-of-type(2) {
  width: 40%;
}

.showTitle em {
  display: inline-block;
  width: 100%;
  text-align: center;
  /* padding-left: 0.2rem; */
  float: right;
  color: #ff0000;
  font-size: 0.4rem;
  line-height: 0.74rem;
  box-sizing: border-box;
  display: table-cell;
  height: 0.74rem;
}

.content {
  float: left;
  margin-right: -1px;

  /* color: transparent; */
}

.ti {
  font-size: 0.36rem;
  text-align: center;
  line-height: 0.5rem;
  margin-top: 0.1rem;
}

.center {
  padding-top: 0.1rem;
  margin: 0 0.2rem;
  position: relative;
}

.middle_ul {
  position: relative;
  padding-top: 0.6rem;
  width: 11.74rem;
  height: 2rem;
  box-sizing: border-box;
  padding: 0 0.1rem;
  margin-top: 0.2rem;
  /* overflow: hidden; */
}

.middle_ul ul {
  height: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  width: 100%;
  margin-left: -0.1rem;
}

.middle_ul ul li {
  width: 2.32rem;
  min-height: 0.92rem;
  /* box-sizing: border-box; */
  padding-left: 0.28rem;
  float: left;
  position: relative;
  padding-top: 0.4rem;
}

.middle_ul ul li img {
  width: 100%;
  height: 1rem;
  /* height: 0.92rem; */
  min-height: 0.92rem;
}

.middle_ul ul li span {
  width: 1rem;
  height: 0.4rem;
  line-height: 0.32rem;
  margin-left: 0.1rem;
  text-align: center;
  display: inline-block;
  font-size: 0.32rem;
  font-weight: bold;
  color: #ffffff;
  background: #348bd5;
  background: linear-gradient(135deg, transparent 0.08rem, #348bd5 0);
  position: absolute;
  top: -0.0005rem;
  left: 0.2rem;
  box-sizing: border-box;
  padding-top: 0.02rem;
}
.middle_ul ul li span.otherCar {
  display: none;
  background: #34C2D5;
  background: linear-gradient(135deg, transparent 0.08rem, #34C2D5 0);
}
.middle_ul .click_left {
  display: inline-block;
  position: absolute;
  left: 0.15rem;
  top: 69% !important;
  border: none;
  transform: translateY(-50%);
  height: 0.6rem;
  outline-style: none;
}

.middle_ul .click_right {
  display: inline-block;
  position: absolute;
  right: 0.1rem;
  top: 69% !important;
  transform: translateY(-50%);
  height: 0.6rem;
  border: none;
  outline-style: none;
}

.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  background: url('../../../assets/images/left_buttom.svg') no-repeat left center;
}

.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  background: url('../../../assets/images/right_buttom.svg') no-repeat right center;
}

.p_right {
  width: 7.064rem;
  float: right;
  padding-top: 0.1rem;
  margin-right: 0.1rem;
}

.p_right_top ul {
  width: 100%;
  /* overflow: hidden; */
  font-size: 0.28rem;
  padding: 0 0.15rem;
  box-sizing: border-box;
}

.p_right_top ul li {
  float: left;
  width: 33.3%;
  box-sizing: border-box;
  padding: 0 0.15rem;
  box-sizing: border-box;
  margin: 0.2rem 0;
  white-space: nowrap;
}

.p_right_top ul li p {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 0.1rem 0 0.13rem;
  width: 60%;
  font-weight: bold;
  text-align: justify;
  text-align-last: justify;
}

.p_right_top ul li span {
  display: inline-block;
}

.right_title {
  position: absolute;
  top: 0.4rem;
  right: 1px;
}

.right_p {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  line-height: 0.56rem;
  font-size: 0.28rem;
  padding-top: 0.16rem;
  color: #a4edfc;
}

.right_p span {
  flex: 2;
  text-align: center;
}

.right_p span:nth-of-type(1) {
  flex: 5;
}

.right_p span:nth-of-type(2) {
  flex: 3;
}
.right_p span:nth-of-type(3) {
  flex: 5;
}
.right_p span:nth-of-type(4) {
  flex: 3;
}

.right_ul li {
  display: flex;
  width: 100%;
  line-height: 0.56rem;
  font-size: 0.28rem;
}

.right_ul li p {
  box-sizing: border-box;
  padding: 0.01rem;
  flex: 2;
  color: #ffffff;
  text-align: center;
}

.right_ul li p:nth-of-type(1) {
  position: relative;
  flex: 5;
}

.right_ul li p:nth-of-type(2) {
  position: relative;
  flex: 3;
  text-align: center;
}
.right_ul li p:nth-of-type(3) {
  position: relative;
  flex: 5;
  text-align: center;
}
.right_ul li p:nth-of-type(4) {
  position: relative;
  flex: 3;
}

.right_ul li:nth-of-type(odd) {
  background: rgba(164, 237, 252, 0.2);
}

.right_ul li p.right_ul_p .span {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 0.04rem;
  line-height: 0.32rem;
  font-size: 0.24rem;
  margin-left: 0.16rem;
  color: #ffffff9e;
  transform: scale(0.8) translateY(-0.04rem);
}
ul.ul_right_top {
  width: 100%;
  overflow: hidden;
  font-size: .32rem;
  padding: 0 .15rem;
  box-sizing: border-box;
  padding-top: .2rem;
}
ul.ul_right_top li {
  position: relative;
}
ul.ul_right_top li:nth-of-type(odd) {
  float: left;
  width: 55%;
  box-sizing: border-box;
  padding: 0 .15rem;
  margin: 0 auto .2rem 0;
  white-space: nowrap;
}
ul.ul_right_top li:nth-of-type(even) {
  float: left;
  width: 45%;
  box-sizing: border-box;
  padding: 0 .15rem;
  margin: 0 auto .2rem 0;
  white-space: nowrap;
}
ul.ul_right_top li p {
  display: inline-block;
  box-sizing: border-box;
  padding: 0 .1rem 0 .13rem;
  width: 60%;
  font-weight: bold;
  text-align: justify;
  text-align-last: justify;
  position: relative;
}
ul.ul_right_top li p:before{
  content: '';
  width: 3px;
  height: .3rem;
  background:#ffff00;
  position: absolute;
  left: 0;
  top: .07rem;
}
ul.ul_right_top li span{
  display: inline-block;
  position: absolute;
  right: .1rem;
}

.foot {
  position: absolute;
  right: 0;
  top: 0;
}
.right_ul li.fontColor p{
    color: #26FFF6;
  }
</style>
