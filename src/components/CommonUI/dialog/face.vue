<template>
  <pop
    css="width:21.38rem;"
    title="人脸微卡"
    :level="param.level"
    footer="display:none">
    <!--<div @click="test">test</div>-->
    <!-- 大图弹出 -->
    <div
      class="bigImg"
      v-show='showImg'>
      <transition
        name="aa"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        style="">
        <Box3
          class="zhezhao"
          css='padding:0 0.1rem;box-sizing:border-box;-moz-box-shadow: 0px 0px 45px 15px #071225; box-shadow: 0px 0px 45px 15px #071225;width:100%'>
          <p
            class="pClose"
            @click="pClose"><span><img
              src="../../../assets/images/close.svg"
              alt=""
              class="a"></span></p>
          <img
            class="b"
            :src="imgUrl | filtration"
            alt="" >
          <div :class="{testDiv : isMask === true}"/>
        </Box3>
      </transition>
    </div>
    <div class="popup_m">
      <div class="p_middle">
        <div class="p_middle_top">
          <boxTitle title="基础信息"/>
          <Box3 css="margin-top:.18rem;height:.8rem;">
            <ul class="">
              <li><div>微卡名称：</div><span>{{ topAdd }}</span></li>
              <li><div>微卡位置：</div><span>{{ topInfoAdd }}</span></li>
            </ul>
            <!--<echart config='dialog_face_bar' height='90%' width='100%'></echart>-->
          </Box3>
        </div>
        <boxTitle title="实时视频"/>
        <div class="middle_title">
          <ul class="title_ul">
            <li
              class=""
              v-for="(item, index) in faceCame"
              :class="{active : index===faceIndex}"
              :key="item.index"
              @click="getDoorInfo(index)"><p>{{ item.name }}</p></li>
          </ul>
        </div>
        <Box3 css="padding:.1rem .06px;margin-top:.18rem;">
          <Box3
            type="3"
            css="width:13.74rem;margin:.05rem .05rem 0 .05rem">
            <loading :visible="isLoading2"/>
            <div class="tv five_video">
              <player
                ref='player'
                :src="tvSrc"
                style="transform: scale(1);transform-origin: 0 0;" />
            </div>
          </Box3>
          <h3 v-show="capturePhoto">实时抓拍</h3>
          <div
            class="middle_ul"
            v-show="capturePhoto">
            <div class="big_img"/>
            <ul class="">
              <!-- dir="rtl"-->
              <swiper
                :options="swiperOption"
                ref="mySwiper"
                class="swiper-no-swiping">
                <swiper-slide
                  v-for="(item, index) in imgInfo"
                  :key="index">
                  <li
                    class="swiperLi"><span
                      style="display: none"
                      v-if="item.Stranger == 1">陌生人</span>
                    <Box3 css="text-align:center;height:2.3rem;width:100%;padding-top:.02rem;position: relative;">
                      <div
                        class="maskTip"
                        @click="bigImg(item.backgroundPic)">详情</div>
                      <img
                        :src="item.faceUrl | filtration"
                        alt=""
                        :class="{testDiv : isMask === true}"
                        :title="item.passTime">
                      <p
                        class="ul_time"
                        :title="item.passTime">{{ item.passTime | splitime }}</p>
                    </Box3>
                  </li>
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
        </Box3>
      </div>
      <div class="p_right">
        <div class="p_right_top">
          <boxTitle title="人员感知（微卡）"/>
          <Box3 css="margin-top:.18rem;height:.84rem;">
            <ul class="">
              <li><p>当日进入</p><span>{{ popinfo.inNum }}</span></li>
              <li><p>当日离开</p><span>{{ popinfo.outNum }}</span></li>
              <!--<li><p>当日驻留</p><span>{{popinfo.resideNum}}</span></li>-->
            </ul>
            <!--<echart config='dialog_face_bar' height='90%' width='100%'></echart>-->
          </Box3>
        </div>
        <div class="p_right_bottom">
          <boxTitle title="12小时记录"/>
          <div
            class="right_title"
            :class="{ right_title2: stateInfo === false ? true : false }">
            <RadioTabs
              @on-index-changed='getPeopleInfo'
              :show-type="radioNum"
              items="陌生人"
              css="height:.5rem;font-size: .28rem;padding:0 .1rem;"/>
              <!--<RadioTabs @on-index-changed='getPeopleInfo' items="居民,陌生人" css="width:2.7rem;height:.5rem;font-size: .28rem;padding:0 .1rem;"></RadioTabs>-->
          </div>
          <div
            class="boxStyle1"
            :class="{ boxStyle2: capturePhoto === false ? true : false }" >
            <loading :visible="isLoading3"/>
            <Box3 css="margin-top:.18rem;height:100%;overflow:hidden;">
              <!--<p class="right_p "><span></span><span v-show="stateInfo2">户号</span><span>时间</span><span>进/出</span></p>-->
              <div :class="{ 'wipe' : wipe === true }">
                <happy-scroll
                  class="happyStyle1"
                  :class="{ happyStyle2: capturePhoto === false ? true : false }"
                  resize
                  size="3">
                  <ul class="right_ul">
                    <li
                      v-for="(item, index) in recodeNum"
                      :key="index"
                      class="">
                      <p
                        style="position: relative"
                        @click="getDataSrc(item.bkgUrl)">
                        <span>详情</span>
                        <Box3 css="padding: .06rem;">
                          <img
                            :src="item.faceUrl | filtration"
                            :class="{testDiv : isMask === true}">
                        </Box3>
                      </p>
                      <div>
                        <p v-show="stateInfo2">{{ item.houseNo }}</p>
                        <p><span :title="item.faceCaptureTime">{{ item.faceCaptureTime | splitime }}</span>{{ item.inout }}</p>
                        <p :title="topInfoAdd">{{ topInfoAdd }}</p>
                      </div>
                    </li>
                    <div style="text-align: center;margin-top: 10px">{{ promptInfo }}</div>
                  </ul>
                </happy-scroll>
              </div>
            </Box3>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer"/>
  </pop>
</template>
<script>
import '../../../assets/css/swiper.min.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post} from '../../../Utils/Http'
let _ = require('lodash')

export default{
  name: 'Face',
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
      radioNum: 2,
      stateInfo: false,
      stateInfo2: false,
      capturePhoto: true, // 是否需要八张图片展示
      topAdd: '',
      topInfoAdd: '',
      faceCame: [],
      imgInfo: [],
      faceIndex: 0,
      isLoadidng: false,
      imgUrl: '',
      showImg: false,
      swiperOption: {
        slidesPerView: 5,
        slidesPerGroup: 1,
        spaceBetween: 5,
        noSwiping: true,
        speed: 1000,
        // autoplay: {
        //   delay: 5000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: false
        }
      },
      items: {agedTotal: 0, childTotal: 0, focusTotal: 0, careTotal: 0},
      popinfo: {inNum: 0, outNum: 0, resideNum: 0},
      recodeNum: [],
      deviceID: '',
      promptInfo: '',
      tvSrc: '',
      isLoading1: '',
      isLoading2: '',
      isLoading3: '',
      isLoading4: '',
      timer: '',
      maskShow: false,
      isMask: true,
      functionList: [],
      wipe: false,
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: ''
    }
  },
  filters: {
    splitime: function (value) {
      if (value) {
        value = value.substring(value.indexOf(' ') + 1, value.length)
      } else {
        value = ''
      }
      return value
    },
    filtration: function (val) {
      if (val) {
        if (window.location.hostname.indexOf('31.0') !== -1 || window.location.hostname === 'localhost') {
          return val
        } else {
          return val.replace('31.0.167.62:19800', '10.1.247.10:9000')
        }
      }
    }
  },
  components: {
    pop: pop,
    boxTitle,
    swiper,
    swiperSlide
  },
  computed: {
    // getIsLoading: function () {
    //   return this.isLoading1
    // }
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let videoMask = this.functionList.find((item) => { return item.functionCode === 'mask_picture' })
    if (videoMask === undefined) {
      this.isMask = true
    } else {
      this.isMask = false
    }
    let that = this
    let reqParam = user.getRequestHeader()
    reqParam.buildingID = this.param.e.buildingID
    reqParam.deviceID = this.param.e.deviceID
    if (that.capturePhoto === true) {
      that.getImg()
      // 获取推送图片  崇明
      this.$bus.on('/web/event/map/faceLog', function (a) {
        let dev = that.deviceID
        let obj = JSON.parse(a)
        if (that.imgInfo === undefined) {
          that.imgInfo = []
        }
        if (obj.deviceId === dev) {
          console.log(obj)
          if (obj.passTime !== that.imgInfo[0].passTime) {
            that.getBui()
            that.getDoorInfo()
            that.imgInfo.unshift(obj)
            if (that.imgInfo.length > 8) {
              that.imgInfo = _.chunk(that.imgInfo, 8)[0]
            }
          }
        }
      })
    }
    // 楼栋住户统计
    Post({
      async: true,
      url: apiNames['获取楼栋住户统计'],
      data: reqParam,
      dataType: 'json',
      success: function (data) {
        if (data.peopleInfo) {
          that.items = data.peopleInfo
        }
      },
      error: function (err) {
        console.log(JSON.stringify(err) + 'popup-face 获取楼栋住户统计')
      }
    })
    that.getBui()
    that.getDoorInfo()
    // 定时刷新进出数据
    this.timer = setInterval(() => {
      this.getBui()
      this.getImg()
      setTimeout(() => { this.getPeopleInfo() }, 1000)
    }, 5000)
  },
  methods: {
    // test () {
    //   // let allTime = new Date()
    //   // allTime = allTime.getTime()
    //   let reqParam = user.getRequestHeader()
    //   reqParam.ID = '379fd19836ea4d08a9baec40468d8c8b'
    //   reqParam.Start = 1570760120
    //   reqParam.End = 1570760150
    //   Post({
    //     async: true,
    //     url: this.smallVideoUrl,
    //     data: reqParam,
    //     dataType: 'json',
    //     success: (data) => {
    //       if (data.Code === 0) {
    //         let tvSrc = ''
    //         tvSrc = this.playUrl + data.Data.RTMP
    //         this.tvSrc = tvSrc
    //       }
    //     },
    //     error: (err) => {
    //       console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
    //     }
    //   })
    // },
    // 大图关闭按钮
    pClose: function () {
      this.showImg = false
      this.imgUrl = ''
    },
    // 8张详情大图弹出
    bigImg: function (index) {
      if (index) {
        this.imgUrl = index
        this.showImg = true
      } else {
        this.$message('暂无大图')
      }
    },
    load (id) {
      // alert(id)
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    // 列表详情大图弹出
    getDataSrc (src) {
      if (src) {
        this.imgUrl = src
        this.showImg = true
      } else {
        this.$message('暂无大图')
      }
    },
    // 获取人脸摄像头信息
    getDoorInfo: function (index) {
      let that = this
      let num = 0
      if (!index) {
        that.faceIndex = 0
      } else {
        that.faceIndex = index
      }
      num = that.faceIndex
      let reqParam = user.getRequestHeader()
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let villageName = JSON.parse(window.localStorage.getItem('currentVillageID')).villageName
      reqParam.deviceID = this.param.e.deviceID
      reqParam.villageIDs = [villageIDs]
      this.isLoading2 = true
      // 获取门禁信息
      Post({
        async: true,
        url: apiNames['获取人脸摄像机'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data) {
            that.isLoading2 = false
            that.faceCame = data.cameras
            // that.tvSrc = data.cameras[num].streamSource
            that.deviceID = data.cameras[num].deviceID
            that.imgInfo = []
            that.topAdd = data.cameras[num].name
            that.topInfoAdd = villageName + data.cameras[num].name
            that.getPeopleInfo()
            that.getstrema(data.cameras[num].deviceID)
            that.getImg()
            console.log(data, that.imgInfo)
          }
        },
        error: function (err) {
          that.isLoading2 = false
          console.log(JSON.stringify(err) + 'popup-face 获取人脸摄像机')
        }
      })
    },
    getstrema (src) {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.ID = src
      //  reqParam.ID = '31010520011320001003'
      Post({
        async: false,
        url: that.videoUrl,
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.Code === 0) {
            that.tvSrc = that.playUrl + data.Data.RTMP
            console.log(that.tvSrc, 'that.tvSrc')
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
    },
    // 获取人脸列表信息
    getPeopleInfo: function () {
      // let num = 0
      // if (!msg) {
      //   num = 0
      // } else {
      //   num = msg[1]
      // }
      // let peopletype = [ 'resident', 'stranger' ]
      let that = this
      let reqParam = user.getRequestHeader()
      // reqParam.peopleType = peopletype[num]
      reqParam.peopleType = 'stranger'
      reqParam.deviceID = that.deviceID
      reqParam.pageNum = 1
      reqParam.pageSize = 50
      // that.isLoading3 = true //为刷接口用的
      // 获取人脸卡口通行日志
      Post({
        async: true,
        url: apiNames['获取人脸卡口通行日志'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading3 = false
          if (data.faceLogs) {
            that.isLoading = false
            that.recodeNum = []
            that.recodeNum = data.faceLogs
            that.promptInfo = ''
          } else {
            that.recodeNum = []
            that.promptInfo = '没有相关通行记录'
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-face 获取人脸卡口通行日志')
          that.recodeNum = []
          that.promptInfo = '请求超时'
          that.isLoading3 = false
        }
      })
    },
    // 获取人脸8张图片
    getImg: function () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = that.deviceID
      console.log(JSON.stringify(reqParam) + '  shuju ')
      // 获取人脸卡口通行日志
      Post({
        async: true,
        url: apiNames['获取最新人脸抓拍图片'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.faceLogs) {
            let data1 = _.chunk(data.faceLogs, 8)[0]
            that.imgInfo = []
            for (let i = 0; i < data1.length; i++) {
              let picImg = data1[i]
              setTimeout(() => {
                that.imgInfo.push({
                  passTime: picImg.faceCaptureTime,
                  faceUrl: picImg.faceUrl,
                  backgroundPic: picImg.bkgUrl,
                  Stranger: picImg.stranger
                })
              })
            }
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-face 获取最新人脸抓拍图片')
        }
      })
    },
    // 获取人脸人员感知（楼栋）信息
    getBui: function () {
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      let that = this
      Post({
        async: true,
        url: apiNames['获取人脸卡口通行统计'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.faceStatic) {
            that.popinfo = data.faceStatic
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-face 获取人脸卡口通行统计')
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  // 离开页面清除定时器
  beforeRouteLeave (to, from, next) {
    console.log('销毁face')
    clearInterval(this.timer)
    next()
  }
}
</script>
<style scoped>
  p{
    text-overflow:ellipsis;white-space:nowrap;overflow:hidden;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
  }

  ul.popup_ul {
    overflow: hidden;
    padding: .1rem 0;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: .18rem;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
  }
  ul.popup_ul li {
    width: 1.7rem;
    height: .36rem;
    color: #31f1fe;
    font-weight: bold;
    font-size: .32rem;
    line-height: .36rem;
    float: left;
    text-align: center;
    position: relative;
  }
  ul.popup_ul li::before{
    content: '';
    width: .04rem;
    height: 100%;
    position: absolute;
    left:0;
    top:0;
    background: #ff0080;
  }
  .popup_m h4 {
    font-family: 微软雅黑;
    font-size: .32rem;
    margin-bottom: .16rem;
  }

  .popup_m{
    overflow: hidden;
    padding-top: .1rem;
    margin: 0;
  }
  .popup_m .p_left {
    padding-left: .2rem;
    width: 5.5rem;
    float: left;
  }

  .popup_m .p_middle {
    float: left;
    margin: .02rem .16rem;
  }
  .p_middle{
    position: relative;
    margin-right: .36rem;
  }
  .middle_title{
    position: absolute;
    top: 2.6rem;
    right: -.08rem;
    font-weight: bold;
  }
  .p_middle .tv{
    margin:0 auto;
    height: 7.64rem;
  }
  .p_middle h3{
    font-size: .36rem;
    text-align: center;
    line-height: .5rem;
    margin-top: .1rem;
  }
  .middle_ul {
    position: relative;
    width: 13.74rem;
    height: 2.5rem;
    box-sizing: border-box;
    padding: 0 .1rem;
    margin-top: .16rem;
    overflow: hidden;
  }
  .middle_ul ul {
    height: 100%;
    box-sizing: border-box;
    padding: 0 .5rem;
  }

  .middle_ul ul li {
    height: 100%;
    width: 2.25rem;
    box-sizing: border-box;
    padding-left: .28rem;
    float: left;
    margin-right: .2rem;
    position: relative;
  }
  .middle_ul ul li .ul_time{
    position: absolute;
    text-align: center;
    font-size: .28rem;
    bottom: 0rem;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    line-height: .5rem;
    background: rgba(0, 0, 0, .3);
    color: #fff;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .middle_ul ul li img {
    width: 95%;
    height: 95%;
    margin: 2.5% auto;
  }

  .middle_ul ul li span {
    width: .3rem;
    /*height: .9rem;*/
    line-height: .36rem;
    text-align: center;
    display: inline-block;
    font-size: .24rem;
    color: #ffffff;
    background: #348bd5;
    background: linear-gradient(135deg, transparent .08rem, #348bd5 0);
    position: absolute;
    top: 0px;
    left: 0;
    box-sizing: border-box;
    padding-top: .15rem;
    padding-bottom: .05rem;
  }

  .middle_ul .click_left {
    display: inline-block;
    position: absolute;
    border: none;
    height: .6rem;
    outline-style: none;
    left: .1rem;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0;
  }

  .middle_ul .click_right {
    display: inline-block;
    position: absolute;
    height: .6rem;
    border: none;
    outline-style: none;
    right: .1rem;
    top: 50%;
    transform: translateY(-50%);
    margin-top: 0;
  }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
    background: url("../../../assets/images/left_buttom.svg") no-repeat left center;
  }
  .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    background: url("../../../assets/images/right_buttom.svg") no-repeat right center;
  }
  .popup_m .p_right {
    width: 6.8rem;
    float: left;
  }
  .p_middle_top ul {
    width:100%;
    overflow: hidden;
    font-size: .32rem;
    justify-content: space-around;
    box-sizing: border-box;
  }
  .p_middle_top ul li{
    float: left;
    width:50%;
    font-size: .32rem;
    box-sizing: border-box;
    padding: 0 0 0 .3rem;
    margin: .2rem 0;
    white-space: nowrap;
    display: flex;
  }
  .p_middle_top ul li div{
    display: inline-block;
    box-sizing: border-box;
    padding:0 .06rem 0 .1rem;
    font-weight: bold;
    text-align:justify;
    text-align-last:justify;
    margin-right: .1rem;
    color: #a4edfc;
  }
  .p_middle_top ul li span{
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .p_right_top ul{
    width:100%;
    overflow: hidden;
    font-size: .32rem;
    font-weight: bold;
    justify-content: space-around;
    box-sizing: border-box;
  }
  .p_right_top ul li{
    float: left;
    width:50%;
    box-sizing: border-box;
    padding: 0 0 0 .3rem;
    margin: .2rem 0;
    white-space: nowrap;
    display: flex;
  }
  .p_right_top ul li p{
    display: inline-block;
    box-sizing: border-box;
    padding:0 .06rem 0 .2rem;
    font-weight: bold;
    text-align:justify;
    text-align-last:justify;
    margin-right: .4rem;
    position: relative;
  }
  .p_right_top ul li p:before{
    width: 3px;
    height: .3rem;
    background: #ffff00;
    content: '';
    position: absolute;
    left: 0;
    top: .07rem;
  }
  .p_right_top ul li span{
    float: right;
    display: inline-block;
    /*width: 1.2rem;*/
    text-align: right;
  }
  .p_right_bottom{
    position: relative;
    margin-top: .16rem;
  }
  .p_right_bottom .right_title {
    position: absolute;
    top: .5rem;
    right:-.4rem;
  }
  .p_right_bottom .right_title {
    position: absolute;
    top: .53rem;
    right:0rem;
  }
  .p_right_bottom .right_p{
    width:100%;
    box-sizing: border-box;
    display: flex;
    line-height: .56rem;
    font-size: .32rem;
    padding-top: .16rem;
    color: #a4edfc;
  }
  .right_ul_p .display_non{
    display: none;
  }
  .p_right_bottom .right_p span{
    flex: 2;
    text-align: center;
  }
  .p_right_bottom .right_p span:nth-of-type(2){
    flex: 2;
  }
  .p_right_bottom .right_p span:nth-of-type(3){
    flex: 3;
  }
  .p_right_bottom .right_p span:nth-of-type(5){
    flex: 2;
  }
  .right_ul{
    margin: .22rem .16rem;
  }
  .right_ul li{
    width:100%;
    height: 1.72rem;
    font-size: .32rem;
    box-sizing: border-box;
    padding-left: .2rem;
    color: #ffffff;
    overflow: hidden;
    margin-bottom: .2rem;
  }
  .right_ul li > p{
    float: left;
    width: 1.4rem;
    height: 1.7rem;
    box-sizing: border-box;
    margin-right: .5rem;
    position: relative;
  }
  .right_ul li > p span{
    height: 100%;
    width: 100%;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    text-align: center;
    font-size: .24rem;
    line-height:  1.8rem;
    background: rgba(0, 0, 0, .4);
    opacity: 0;
    cursor: pointer;
    color: #000;
  }
  .right_ul li > p:hover span{
    opacity: 1;
  }
  .right_ul li > p img{
    width: 100%;
    height: 100%;
  }
  .right_ul li > div {
    padding-top: .3rem;
  }
  .right_ul li > div p{
    line-height: .6rem;
  }
  .right_ul li > div p span{
    margin-right: .5rem;
  }
  /*.right_ul li p:nth-of-type(1) span{*/
    /*display: inline-block;*/
    /*border:.02rem solid #31f1fe75;*/
    /*height: .5rem;*/
    /*margin: .05rem auto;*/
    /*width: .7rem;*/
    /*box-sizing: border-box;*/
  /*}*/
  /*.right_ul li p:nth-of-type(1) span img{*/
    /*width: 100%;*/
    /*height: 100%;*/
  /*}*/
  /*.right_ul li p:nth-of-type(1){*/
    /*cursor: pointer;*/
  /*}*/
  /*.right_ul li p:nth-of-type(2){*/
    /*position: relative;*/
    /*flex: 2;*/
  /*}*/
  /*.right_ul li p:nth-of-type(3){*/
    /*position: relative;*/
    /*flex: 3;*/
  /*}*/
  /*.right_ul li p:nth-of-type(5){*/
    /*position: relative;*/
    /*flex: 2;*/
  /*}*/
  .right_ul_p span{
    cursor: pointer;
  }
  .right_ul li:nth-of-type(odd){
    background: rgba(164,237,252,.2);
  }
  .foot{
    position: absolute;
    right: 0;
    top: 0;
  }
  .bigImg{
    padding:25px 8px 5px;
    height:auto;
    position: absolute;
    width:70%;
    z-index:9999;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
  }
  .bigImg .pClose {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 0.5rem;
    height: 0.5rem;
    background: rgba(255, 8, 8, 0.76);
    cursor: pointer;
  }
  /* .pClose span */
  .bigImg .pClose span .a {
    width: 0.4rem;
    text-align: center;
    height: 0.4rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .bigImg .pClose:hover {
    background: rgba(255, 8, 8, 0.76);
  }
  .bigImg .zhezhao {
    box-sizing: border-box;
  }
  .bigImg .zhezhao .b {
    width: 100%;
    margin-top: 6px;
  }
  /*视频播放头部*/
  .title_ul{
    overflow: hidden;
    padding: 0 .2rem;
    display: flex;
  }
  .title_ul li{
    float: left;
    line-height: .5rem;
    text-align: center;
    font-size: .24rem;
    padding: 0 .08rem;
    border: 1px solid #1eb6d1;
    transform: skew(-25deg);
    cursor: pointer;
    border-right: none;
    flex: 1;
  }
  ul.title_ul li:last-child {
    border-right: 1px solid #1eb6d1;
  }
  .title_ul li p{
    transform: skew(25deg);
  }
  ul.title_ul .active {
    background:linear-gradient(to top,#a4e8fcba,#0edffae8);
    background:-moz-linear-gradient(to top,#a4e8fcba,#0edffae8);
    background:-o-linear-gradient(to top,#a4e8fcba,#0edffae8);
    background:-webkit-linear-gradient(to top,#a4e8fcba,#0edffae8);
  }
  .swiperLi:hover .maskTip{
    opacity: 1;
  }
  .maskTip {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 2.3rem;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .4);
    opacity: 0;
    cursor: pointer;
    color: #000;
    z-index: 100;
  }
  @media screen and (min-width: 3001px) {
    /*.title_ul li{*/
      /*line-height: .6rem;*/
    /*}*/
    /*.right_ul li{*/
      /*height: .68rem;*/
      /*line-height: .68rem;*/
    /*}*/
  }
  /*右侧根据权限展示的大小*/
  .boxStyle1{
    height: 11.52rem;
  }
  .happyStyle1{
    height: 11.12rem;
  }
  .boxStyle2{
    height: 8.28rem;
  }
  .happyStyle2{
    height: 8rem;
  }
</style>
