<template>
  <pop
    css="width: 14.6rem;"
    title="高空抛物报警"
    :level="param.level"
    :css2="floorWidth"
    footer="display:none">
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
            :class="{testDiv : isMask === true}"
            :src="imgUrl"
            alt="" >
          <!--<img class="b" src="http://47.75.190.168:9000/blueplus/Car/20180615/7b273251-f9d6-447c-9b3e-c7111d661dc6.jpg" alt="" >-->
        </Box3>
      </transition>
    </div>
    <div class="popup_m">
      <div class="p_middle">
        <div class="p_middle_top">
          <boxTitle title="报警信息"/>
          <Box3 css="margin-top:.18rem;height:1.48rem;">
            <ul class="infoUl">
              <li><p>报警类型：</p><span>高空抛物报警</span></li>
              <li><p>报警时间：</p><span>2020.4.22 17:49:00</span></li>
              <li><p>报警位置：</p><span>欧景名城22号楼北</span></li>
              <li><p>报警设备：</p><span>高空抛物摄像机</span></li>
            </ul>
            <!--<echart config='dialog_face_bar' height='90%' width='100%'></echart>-->
          </Box3>
        </div>
        <boxTitle title="报警视频"/>
        <div class="middle_title">
          <ul class="title_ul">
            <li
              class=""
              v-for="(item, index) in accessCame"
              :class="{active : index===cameIndex}"
              :key="item.index"
              @click="getDoorInfo(index)">
              <p>{{ item.inOutFlag | splitname }}</p>
            </li>
          </ul>
        </div>
        <div>
          <Box3 css="padding:.08rem .04rem;margin:.18rem .05rem 0 .05rem;">
            <loading :visible="isLoading1"/>
            <div class="five_video">
              <Box3
                type="3"
                css="width:13.73rem;margin:.1rem auto 0 auto;height:8.1rem;">
                <div class="tv">
                  <video autoplay controls="controls" style="width: 100%;height: 100%" :src="tvSrccccc"></video>
                  <!--<player-->
                    <!--:src="tvSrccccc"-->
                    <!--style="transform: scale(1);transform-origin: 0 0;" />-->
                </div>
              </Box3>
            </div>
          </Box3>
        </div>
      </div>
    </div>
    <div
      slot="footer"
      class="access_footer"/>
    <div
      slot="equipment"
      class="equipment"
      style="top: 0.1rem;"
      v-if="isbutton">
      <i class="top-line"/><span
      :class="{'active':isA}"
      @click="notice(process)">{{ infoprompt }}</span><i
      class="bottom-line"/><b/>
    </div>
  </pop>
</template>

<script>
  import playvideo from '../../UIKit/playVideo'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import pop from '../../home/public/popupContainer'
  import boxTitle from '../../home/public/boxTitle'
  import '../../../assets/css/swiper.min.css'
  import user from '../../../Utils/user'
  import {apiNames} from '../../../config/config'
  import {Post, PostCopy} from '../../../Utils/Http'
  import {getNowFormatDate} from '../../../Utils/Common'
  let _ = require('lodash')

  export default {
    name: 'highPop',
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
        capturePhoto: true, // 是否需要八张图片展示
        floorWidth: 'width:100%',
        accessCame: [],
        cameIndex: 0,
        imgUrl: '',
        showImg: false,
        footerType1: 'on_line1',
        footerType_1: '在线',
        footerType2: 'off_line1',
        footerType_2: '启用',
        isLoadidng: false,
        swiperOption: {slidesPerView: 5, slidesPerGroup: 1, spaceBetween: 10, noSwiping: true, speed: 2000, /* autoplay: {delay: 2000, stopOnLastSlide: false, disableOnInteraction: false}, */ loop: true, navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev', hideOnClick: false}},
        items: {agedTotal: 0, childTotal: 0, careTotal: 0, focusTotal: 0, houseTotal: 0, peopleTotal: 0},
        popinfo: {inNum: 0, outNum: 0, resideNum: 0, visitNum: 0},
        recodeNum: [],
        imgInfo: [],
        titleInfo: '楼栋信息',
        footerInfo: {code: '', prducetBrand: '', isDisable: '', days: '', hours: '', state: '', name: '', installAdd: ''},
        errInfo: '',
        textSrc: '',
        tvSrccccc: 'http://10.2.3.10:9000/blueplus/10.2.3.162_22%E6%A0%8B%EF%BC%88%E9%AB%98%E6%8A%9B%EF%BC%89%E5%8C%97_main_202004221749.mp4',
        tvSrc1: '',
        isA: false,
        deveiceID: '',
        infoprompt: '点击处置完成',
        isbutton: false,
        process: {},
        alarmList: [],
        isLoading1: '',
        isLoading2: '',
        isLoading3: '',
        isLoading4: '',
        isLoading5: '',
        timer: '',
        functionList: [],
        isMask: true,
        wipe: false,
        smallVideoUrl: '',
        videoUrl: '',
        playUrl: ''
      }
    },
    components: {
      pop: pop,
      boxTitle,
      swiper,
      swiperSlide,
      playvideo
    },
    computed: {
      // getIsLoading: function () {
      //   return this.isLoading1 || this.isLoading2 || this.isLoading3 || this.isLoading4 || this.isLoading5
      // }
    },
    filters: {
      splitType: function (value) { // 未返回开门方式，默认NFC开门
        if (!value) {
          value = 'NFC开门'
        }
        return value
      },
      splitime: function (value) {
        if (value) {
          value = value.substring(value.indexOf(' ') + 1, value.length)
        } else {
          value = ''
        }
        return value
      },
      splitCode: function (value) {
        if (!value) {
          value = '-'
        }
        return value
      },
      splitname: function (value) {
        switch (value) {
          case 0:
            value = '门外'
            break
          case 1:
            value = '门内'
            break
        }
        return value
      }
    },
    methods: {
      filtration (val) {
        if (val) {
          if (window.location.hostname.indexOf('31.0') !== -1 || window.location.hostname === 'localhost') {
            return val
          } else {
            return val.replace('31.0.167.62:19800', '10.1.247.10:9000')
          }
        }
      },
      tip: function () { // 弹出提醒框
        this.$newnotify({
          titleName: '已催办',
          typeName: 'waring',
          content: '已通知催办',
          autoClose: 11000
        })
      },
      alertTip: function (msg) {
        this.$message(msg)
      },
      /* popup */
      // popupBuilding () {
      //   window.pop.show({
      //     level: 3,
      //     component: () => import('./houseInfo'),
      //     param: {
      //       level: 3,
      //       e: this.param.e
      //     }
      //   })
      // },
      // 大图弹出提醒框关闭按钮
      pClose: function () {
        this.showImg = false
      },
      // 8张详情大图弹出方法
      bigImg: function (index) {
        if (index) {
          this.showImg = true
          this.imgUrl = index
        } else {
          this.alertTip('暂无大图')
        }
      },
      // 获取门禁摄像头信息
      getDoorInfo: function (index) {
        let that = this
        let num = 0
        if (!index) {
          that.cameIndex = 0
        } else {
          that.cameIndex = index
        }
        num = that.cameIndex
        let reqParam = user.getRequestHeader()
        reqParam.deviceID = this.param.e.deviceID
        that.isLoading1 = true
        // 获取门禁信息
        Post({
          async: true,
          url: apiNames['获取门禁信息'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            if (data) {
              that.isLoading1 = false
              that.accessCame = data.cameraInfos
              // that.tvSrc = data.cameraInfos[num].streamSource
              that.deveiceID = data.cameraInfos[num].cameraDeviceID
              that.getstrema(that.deveiceID)
            }
          },
          error: function (err) {
            that.isLoading2 = false
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
          }
        })
      },
      swiper () {
        return this.$refs.mySwiper.swiper
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
              that.tvSrc = that.playUrl + data.Data.RTMP
            }
          },
          error: function (err) {
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
          }
        })
      },
      // 获取门禁右侧通行记录信息
      getPeopleInfo (msg) {
        let num = 0
        if (!msg) {
          num = 0
        } else {
          num = msg[1]
        }
        let peopletype = [ 'resident', 'visitor', 'stranger', 'control' ]
        let reqParam = user.getRequestHeader()
        reqParam.deviceID = this.param.e.deviceID
        reqParam.peopleType = peopletype[num]
        reqParam.pageNum = 1
        reqParam.pageSize = 100
        reqParam.startTime = getNowFormatDate(12)
        reqParam.endTime = getNowFormatDate(0)
        let that = this
        // this.isLoading4 = true
        that.isLoading2 = true
        // 获取门禁通行记录（12小时记录）
        Post({
          async: true,
          url: apiNames['获取门禁通行记录'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            that.isLoading2 = false
            if (data.accessLogs) {
              that.isLoading = false
              let getRecode = data.accessLogs
              for (let i = 0; i < data.accessLogs.length; i++) {
                data.accessLogs[i].houseNo = that.splitHouse(data.accessLogs[i].houseNo)
              }
              that.recodeNum = []
              that.recodeNum = getRecode
              that.errInfo = ''
            } else {
              that.errInfo = '没有相关通行记录'
              that.recodeNum = []
            }
          },
          error: function (err, status) {
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁通行记录')
            that.errInfo = '请求超时'
            that.isLoading = false
            that.recodeNum = []
          }
        })
      },
      // 获取小视频
      getstremsm (time) {
        let allTime = new Date(time)
        allTime = allTime.getTime()
        let reqParam = user.getRequestHeader()
        // reqParam.ID = 'f5418b2cc23d11e8bcf00cc47a937836'
        // reqParam.Start = 1544943181
        // reqParam.End = 1544943281
        // console.log(JSON.stringify(reqParam))
        reqParam.ID = this.deveiceID
        reqParam.Start = allTime / 1000 - 15
        reqParam.End = allTime / 1000 + 15
        Post({
          async: false,
          url: this.smallVideoUrl,
          data: reqParam,
          dataType: 'json',
          success: (data) => {
            if (data.Code === 0) {
              let tvSrc = ''
              tvSrc = this.playUrl + data.Data.RTMP
              this.getDataSrc(tvSrc, '')
            }
          },
          error: (err) => {
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
          }
        })
      },
      // 获取门禁列表小视频播放
      getDataSrc (src1, src2) {
        console.log(src1, src2)
        let src = ''
        if (src1 === '' && src2 === '') {
          console.log('小视频为空')
        } else {
          if (src1 === '') {
            src = src2
          } else {
            src = src1
          }
          window.pop.show({
            level: 2,
            component: () => import('./videoPlay'),
            param: {
              arr: [src1, src2],
              level: 2,
              e: src
            }
          })
        }
      },
      // 初始获得八张图片
      getImg () {
        let that = this
        let reqParam = user.getRequestHeader()
        reqParam.deviceID = this.param.e.deviceID
        // reqParam.deviceID = that.deveiceID
        console.log(reqParam.deviceID, 8)
        // 获取门禁信息
        Post({
          async: true,
          url: apiNames['获取最新人脸抓拍图片'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            if (data.faceLogs) {
              let data1 = _.chunk(data.faceLogs, 8)[0]
              for (let i = 0; i < data1.length; i++) {
                let picImg = data1[i]
                that.imgInfo.push({
                  passTime: picImg.faceCaptureTime,
                  Pic: picImg.faceUrl,
                  backgroundPic: picImg.bkgUrl,
                  Stranger: picImg.stranger
                })
              }
            }
          },
          error: function (err) {
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取最新人脸抓拍图片')
          }
        })
      },
      notice (process) {
        if (this.param.e.isDeal === 1) {
          this.process.isPhase = 3
          this.process.fillIn = 1
        } else {
          this.process.fillIn = 2
          this.process.fillIn = 0
        }
        // let that = this
        window.pop.show({
          level: 2,
          component: () => import('./alarm'),
          param: {
            level: 2,
            e: process
          }
        })
      },
      // 人员感知（楼栋）信息
      getBui: function () {
        let that = this
        let reqParam = user.getRequestHeader()
        reqParam.deviceID = this.param.e.deviceID
        Post({
          async: true,
          url: apiNames['获取门禁通行统计'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            that.isLoading3 = false
            if (data.accessStatic) {
              that.popinfo = data.accessStatic
            }
          },
          error: function (err) {
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁通行统计')
          }
        })
      },
      // 填充没有的户号
      splitHouse: function (value) {
        let num1 = Math.ceil(Math.random() * 5)
        let num2 = Math.ceil(Math.random() * 4)
        let numInfo = num1 + '0' + num2
        if (!value) {
          value = numInfo
        }
        return value
      }
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
      that.timer = setInterval(function () {
        that.getBui()
      }, 10000)
      let reqParam = user.getRequestHeader()
      reqParam.buildingID = this.param.e.buildingID
      reqParam.deviceID = this.param.e.deviceID
      console.log(reqParam.deviceID)
      if (that.capturePhoto === true) {
        that.getImg()
      }
      // 获取人脸卡口通行日志(抓拍人脸)
      this.$bus.on('/web/event/map/accessfaceLog', (a) => {
        if (that.capturePhoto === true) {
          let dev = this.deveiceID
          let obj = JSON.parse(a)
          if (obj.deviceId === dev) {
            if (obj.passTime !== that.imgInfo[0].passTime) {
              that.getPeopleInfo()
              that.getBui()
              that.imgInfo.unshift(obj)
              if (that.imgInfo.length > 8) {
                that.imgInfo.pop()
              }
            }
          }
        }
      })
      that.getDoorInfo()
      that.getPeopleInfo()
      that.getBui()

      // 页面进入直接加载
      that.process = this.param.e
      // end

      // 状态管理
      this.$bus.on('/event/afterDealAlarm', (e) => {
        this.infoprompt = '已处置'
        this.floorWidth = 'width:89.5%'
        this.isA = true
        this.phase = 1
      })
      that.process = this.param.e
      let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID

      // let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('webGlobalConfig'))
      // let villageIDs = ConfigVillageIDs.villageInfos[0].villageID
      // 楼栋名称
      let buildName = this.param.e.name
      if (buildName) {
        that.titleInfo = buildName + '栋信息'
      } else {
        that.titleInfo = '楼栋信息'
      }
      this.isLoading1 = this.isLoading3 = this.isLoading5 = true

      reqParam.villageIDs = villageIDs

      // 获取楼栋住户统计
      Post({
        async: true,
        url: apiNames['获取楼栋住户统计'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading1 = false
          if (data.peopleInfo) {
            that.items = data.peopleInfo
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取楼栋住户统计')
        }
      })

      // 获取设备信息（底部信息）
      Post({
        async: true,
        url: apiNames['获取设备信息'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading5 = false
          if (data.deviceInfo) {
            let time1 = data.deviceInfo.installTime
            // 得到毫秒数
            let time2 = (new Date(time1)).getTime()
            // 获取当前毫秒数
            let dateTime = (new Date()).getTime()
            let time3 = dateTime - time2
            let days = Math.floor(time3 / (1000 * 60 * 60 * 24))
            let hours = Math.floor((time3 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            that.footerInfo.code = data.deviceInfo.code
            that.footerInfo.prducetBrand = data.deviceInfo.prducetBrand
            that.footerInfo.installAdd = data.deviceInfo.installAdd
            that.footerInfo.name = data.deviceInfo.name
            that.footerInfo.isDisable = data.deviceInfo.isDisable
            that.footerInfo.days = days
            that.footerInfo.hours = hours
            switch (data.deviceInfo.state) {
              case 0 :
                that.footerType1 = 'on_line0'
                that.footerType_1 = '离线'
                break
              case 1 :
                that.footerType1 = 'on_line1'
                that.footerType_1 = '在线'
                break
              case 2 :
                that.footerType1 = 'on_line2'
                that.footerType_1 = '故障'
                break
            }
            switch (data.deviceInfo.isDisable) {
              case 0 :
                that.footerType2 = 'off_line1'
                that.footerType_2 = '启用'
                break
              case 1 :
                that.footerType2 = 'off_line2'
                that.footerType_2 = '禁用'
                break
            }
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取设备信息')
        }
      })
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    beforeRouteLeave (to, from, next) {
      console.log('销毁accessDevice')
      clearInterval(this.timer)
      next()
    }
  }
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
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
    left: 51%;
    top: 0rem;
    display: flex;
    white-space: nowrap;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    font-size: .32rem;
  }

  ul.popup_ul li {
    padding: 0 .2rem;
    height: .36rem;
    color: #31f1fe;
    font-weight: bold;
    line-height: .36rem;
    float: left;
    border-left: 1px solid #ff0080;
    text-align: center;
  }

  .popup_m h4 {
    font-family: 微软雅黑;
    font-size: .32rem;
    margin-bottom: .16rem;
  }

  .popup_m {
    overflow: hidden;
    padding-top: .1rem;
    margin: 0;
    display: grid;
    grid-template-columns: 14.4rem 7.3rem;
    box-sizing: border-box;
  }

  #pop_info > li:nth-of-type(1) {
    height: 100%;
    float: left;
    grid-column: 1;
    box-sizing: border-box;
    padding-left: .16rem;
  }

  #pop_info > li:nth-of-type(2) {
    color: #fff;
    grid-column: 2;
    margin: 0.06rem 0.1rem 0;
    position: relative;
    /* color: transparent */
  }

  #pop_info > li:nth-of-type(3) {
    color: #fff;
    grid-column: 3;
  }

  .popup_m .p_left {
    padding-left: .2rem;
    width: 5.5rem;
    float: left;
    box-sizing: border-box;
  }

  .popup_m .p_middle {
    float: left;
    margin: 1px .16rem;
  }

  .p_middle {
    position: relative;
    margin-right: .36rem;
  }

  .middle_title {
    position: absolute;
    top: 3.82rem;
    right: -.08rem;
    font-weight: bold;
  }

  .p_middle .tv {
    margin: 0 auto;
    height: 7.64rem;
  }

  .p_middle h3 {
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
    margin-top: .2rem;
    overflow: hidden;
    margin-bottom: .2rem;
  }

  .middle_ul ul {
    height: 100%;
    box-sizing: border-box;
    padding: 0 .5rem;
  }

  .middle_ul ul li {
    height: 2.5rem;
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
    width: .28rem;
    height: .9rem;
    line-height: .36rem;
    text-align: center;
    display: inline-block;
    font-size: .24rem;
    color: #ffffff;
    background: #348bd5;
    background: linear-gradient(135deg, transparent .08rem, #348bd5 0);
    position: absolute;
    top: .04rem;
    left: 0;
    box-sizing: border-box;
    padding-top: .1rem;
  }

  .middle_ul .click_left {
    display: inline-block;
    position: absolute;
    left: .1rem;
    top: 50%;
    border: none;
    transform: translateY(-50%);
    height: .6rem;
    outline-style: none;
  }
  .swiper-button-prev, .swiper-container-rtl .swiper-button-next{
    background: url("../../../assets/images/left_buttom.svg") no-repeat left center;
  }
  .swiper-button-next, .swiper-container-rtl .swiper-button-prev{
    background: url("../../../assets/images/right_buttom.svg") no-repeat right center;
  }
  .middle_ul .click_right {
    display: inline-block;
    position: absolute;
    right: .1rem;
    top: 50%;
    transform: translateY(-50%);
    height: .6rem;
    border: none;
    outline-style: none;
  }

  .popup_m .p_right {
    width: 6.8rem;
    float: left;
  }

  .p_right_top ul {
    width: 100%;
    overflow: hidden;
    font-size: .32rem;
    padding: 0 .15rem;
    box-sizing: border-box;
  }

  .p_right_top ul li {
    float: left;
    width: 33.3%;
    box-sizing: border-box;
    padding: 0 .15rem;
    margin: .2rem 0;
    white-space: nowrap;
  }

  .p_right_top ul li p {
    display: inline-block;
    box-sizing: border-box;
    padding: 0 .1rem 0 .13rem;
    width: 70%;
    font-weight: bold;
    text-align: justify;
    text-align-last: justify;
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
    display: inline-block;
  }

  .p_right_bottom {
    position: relative;
    margin-top: .16rem;
  }

  .p_right_bottom .right_title {
    position: absolute;
    top: .55rem;
    right: 0rem;
  }

  .p_right_bottom .right_p {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    line-height: .56rem;
    font-size: .32rem;
    padding-top: .16rem;
    padding-right: .1rem;
    color: #a4edfc;
  }

  .p_right_bottom .right_p span {
    flex: 3;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .p_right_bottom .right_p span:nth-of-type(1) {
    flex: 3;
  }

  .p_right_bottom .right_p span:nth-of-type(4) {
    flex: 2;
  }

  .p_right_bottom .right_p span:nth-of-type(5) {
    flex:3;
  }

  .right_ul li {
    display: flex;
    width: 100%;
    line-height: .56rem;
    font-size: .32rem;
    box-sizing: border-box;
    padding-right: .1rem;
  }

  .right_ul li p {
    flex: 3;
    color: #ffffff;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .right_ul li p:nth-of-type(4) {
    position: relative;
    flex: 2;
  }
  .right_ul li p:nth-of-type(5) {
    position: relative;
    flex: 3;
  }

  .right_ul li:nth-of-type(odd) {
    background: rgba(164, 237, 252, .2);
  }
  .right_ul li p.right_ul_p span{
    display: inline-block;
    width: .36rem;
    height: .36rem;
    margin-left: .26rem;
    float: left;
    margin-top: .08rem;
  }
  .right_ul li p.right_ul_p .play_vi{
    background: url("../../../assets/images/play_3.svg") no-repeat center;
    background-size: 100%;
  }
  .right_ul li p.right_ul_p .span{
    background: url("../../../assets/images/trace_1.svg") no-repeat center;
    background-size: 100%;
  }
  .right_ul li p.right_ul_p .play_vi_2{
    background: url("../../../assets/images/play_4.svg") no-repeat center;
    background-size: 100%;
    cursor: pointer;
  }
  /*.foot {*/
  /*position: absolute;*/
  /*left: 7.5rem;*/
  /*top: 0;*/
  /*}*/
  /*.infoUl .on_line0{*/
  /*background: url("../../../assets/images/red_buttom.svg") no-repeat left center;*/
  /*background-size: .3rem;*/
  /*padding-left: .4rem;*/
  /*}*/
  /*.infoUl .on_line1{*/
  /*background: url("../../../assets/images/green_buttom.svg") no-repeat left center;*/
  /*background-size: .3rem;*/
  /*padding-left: .4rem;*/
  /*}*/
  /*.infoUl .on_line2{*/
  /*background: url("../../../assets/images/yellow_buttom.svg") no-repeat left center;*/
  /*background-size: .3rem;*/
  /*padding-left: .4rem;*/
  /*}*/
  /*.infoUl .off_line1{*/
  /*background: url("../../../assets/images/green_buttom.svg") no-repeat left center;*/
  /*background-size: .3rem;*/
  /*padding-left: .4rem;*/
  /*}*/
  /*.infoUl .off_line2{*/
  /*background: url("../../../assets/images/red_buttom.svg") no-repeat left center;*/
  /*background-size: .3rem;*/
  /*padding-left: .4rem;*/
  /*}*/
  .access_footer>span:nth-of-type(1){
    display: inline-block;
    min-width: 5.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .access_footer>span:nth-of-type(2){
    display: inline-block;
    width: 4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .access_footer .foot{
    float: right;
  }
  .access_footer .foot span:nth-of-type(1){
    display: inline-block;
    box-sizing: border-box;
  }
  .access_footer .foot span:nth-of-type(2){
    display: inline-block;
    box-sizing: border-box;
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
    font-size: .28rem;
    padding: 0 .2rem;
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
  }
  .top-line {
    position: absolute;
    top: -.04rem;
    left: 11%;
    background: #c9d2e1;
    width: 62%;
    height: 1px;
    z-index: 1;
  }

  .top-line:before {
    content: '';
    width: .054rem;
    height: .02rem;
    position: absolute;
    top: 0;
    left: -7%;
    background: #b5e1ea;
  }

  .top-line:after {
    content: '';
    width: .054rem;
    height: .02rem;
    position: absolute;
    top: 0;
    right: -7%;
    background: #b5e1ea;
  }

  .bottom-line {
    position: absolute;
    bottom: -.04rem;
    left: 11%;
    background: #c9d2e1;
    width: 62%;
    height: 1px;
    z-index: 1;
  }

  .bottom-line:before {
    content: '';
    width: .054rem;
    height: .02rem;
    position: absolute;
    top: 0;
    left: -7%;
    background: #b5e1ea;
  }

  .bottom-line:after {
    content: '';
    width: .054rem;
    height: .02rem;
    position: absolute;
    top: 0;
    right: -7%;
    background: #b5e1ea;
  }

  .equipment span {
    border: 1px solid #2c88ffc7;
    box-sizing: border-box;
    font-size: .28rem;
    color: #a4edfc;
    padding: .08rem 1.156rem .08rem .3rem;
    position: relative;
    right: 0;
  }

  .equipment span::after {
    content: '';
    background: red;
    position: absolute;
    top: .24rem;
    right: .86rem;
    width: .1rem;
    height: .1rem;
  }

  .equipment span.active::after {
    content: '';
    background: #2cff2c;
    position: absolute;
    top: .24rem;
    right: .86rem;
    width: .1rem;
    height: .1rem;
  }

  .equipment span::before {
    content: '';
    background: #c9d2e154;
    position: absolute;
    top: .14rem;
    right: .75rem;
    width: .322rem;
    height: .294rem;
  }
  @media screen and (min-width: 3001px) {
    /*.title_ul li{*/
    /*line-height: .6rem;*/
    /*}*/
  }
  .p_middle_top ul {
    width:100%;
    overflow: hidden;
    font-size: .32rem;
    padding: .1rem 0;
    justify-content: space-around;
    box-sizing: border-box;
  }
  .p_middle_top ul li{
    font-size: .32rem;
    float: left;
    width:50%;
    box-sizing: border-box;
    padding: 0 0 0 .3rem;
    margin: .1rem 0;
    white-space: nowrap;
    display: flex;
  }
  .p_middle_top ul li p{
    display: inline-block;
    box-sizing: border-box;
    padding:0 .06rem 0 .1rem;
    font-weight: bold;
    text-align:justify;
    text-align-last:justify;
    margin-right: .1rem;
    color: #a4edfc;
  }
  /*右侧根据权限展示的大小*/
  .boxStyle1{
    height: 12.28rem;
  }
  .happyStyle1{
    height: 11.36rem;
  }
  .boxStyle2{
    height: 8.8rem;
  }
  .happyStyle2{
    height: 7.9rem;
  }
  @media screen and (min-width: 3001px) {
    .radioTabs{
      font-size: .28rem !important;
    }
  }
</style>
