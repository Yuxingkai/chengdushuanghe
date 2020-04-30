<template>
  <pop
    css="width:27.76rem"
    title="摄像机-人脸识别"
    :level="param.level"
    @closed="onClosed"
    :is-loading="getIsLoading">
    <div class="monitor">
      <div class="monitor_left">
        <div class="mo_top">
          <div class="mo_top_l">
            <div class="mo_top_l1">
              <boxTitle title="设备详情"/>
              <p><span>设备定位</span></p>
              <p @click="select()">
                <img
                  src="../../../assets/images/camera/img.svg"
                  alt=""
                  v-if="innerIndex == true">
                <img
                  src="../../../assets/images/camera/tv.svg"
                  alt=""
                  v-if="innerIndex == false">
              </p>
            </div>
            <ul>
              <li :title="cameraInfo.name">名称：{{ cameraInfo.name | replace }}</li>
              <li :title="cameraInfo.prducetBrand">品牌：{{ cameraInfo.prducetBrand | replace }}</li>
              <li :title="cameraInfo.state">状态：{{ cameraInfo.state | replace }}</li>
              <li :title="cameraInfo.productModel">型号：{{ cameraInfo.productModel | replace }}</li>
              <li :title="cameraInfo.productCode">编码：{{ cameraInfo.productCode | replace }}</li>
              <li :title="cameraInfo.installAdd">安装地址：{{ cameraInfo.installAdd | replace }}</li>
              <li :title="cameraInfo.insertTime">安装时间：{{ cameraInfo.insertTime | replace }}</li>
              <li :title="cameraInfo.installPeo">安装人员：{{ cameraInfo.installPeo | replace }}</li>
            </ul>
          </div>
          <div class="top_rimg">
            <Box3><img
              :src="deviceImage"
              alt=""></Box3>
          </div>
          <div class="mo_top_r"/>
        </div>
        <div class="mo_middle">
          <div class="mo_middle_t">
            <boxTitle title="处置流程"/>
          </div>
          <div class="mo_middle_ul">
            <div class="mo_middle_img"/>
            <p class="ulbtn"><span/></p>
            <p class="ulbtn"><span/></p>
            <ul class="">
              <li>
                <p class="point"><span/></p>
                <p class="arrow"><span/><span/></p>
                <h5>2018-04-13 12:23:45</h5>
                <div class="ul_main">
                  <div><p><span/></p>发生异常</div>
                </div>
              </li>
              <li>
                <p class="point"><span/></p>
                <p class="arrow"><span/><span/></p>
                <h5>2018-04-13 12:23:45</h5>
                <div class="ul_main">
                  <div><p><span/></p>通知责任人</div>
                </div>
              </li>
              <li class="ul_3li">
                <p class="point"><span/></p>
                <p class="arrow"><span/><span/></p>
                <h5>2018-04-13 12:23:45</h5>
                <div class="ul_main">
                  <div><p><span/></p>维修中</div>
                </div>
              </li>
              <li class="ul_4li">
                <p class="point"><span/></p>
                <h5>2018-04-13 12:23:45</h5>
                <div class="ul_main">
                  <div><p><span/></p>已修复</div>
                </div>
              </li>
              <li class="ul_5li">
                <p class="point"><span/></p>
                <h5/>
                <div class="ul_main">
                  <div>
                    <p><span/></p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="mo_bottom">
          <div>
            <Box3>
              <echart config='dialog_camera_are2'/>
            </Box3>
          </div>
          <div>
            <Box3>
              <echart config='dialog_camare_are'/>
            </Box3>
          </div>
          <div>
            <Box3>
              <echart config='dialog_camera_pie'/>
            </Box3>
          </div>
        </div>
      </div>
      <div class="monitor_right">
        <div class="monitor_right_t">
          <boxTitle title="报警列表"/>
        </div>
        <div class="monitor_right_ul">
          <box3>
            <div class="monitor_right_ultop"><span>名称</span><span>报警时间</span><span>类型</span></div>
            <happy-scroll
              style="height:9.6rem;"
              hide-horizontal >
              <ul>
                <li
                  v-for="item in cameraAlar"
                  :key="item.id">
                  <span :title="item.opsTypeName">{{ item.opsTypeName }}</span>
                  <span :title="item.alarmTime">{{ item.alarmTime | splitime }}</span>
                  <span :title="item.opsType">{{ item.opsType }}</span>
                </li>
                <div style="text-align: center;border:none;margin-top: .2rem">{{ warinInfo }}</div>
              </ul>
            </happy-scroll>
          </box3>
        </div>
      </div>
    </div>
    <div slot="footer">
      设备寿命：五年五个月
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post} from '../../../Utils/Http'

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
      innerIndex: true,
      cameraInfo: {name: '', prducetBrand: '', state: '', productModel: '', productCode: '', installAdd: '', insertTime: '', installPeo: ''},
      cameraAlar: [],
      deviceImage: '',
      warinInfo: '',
      isLoading1: '',
      isLoading2: ''
    }
  },
  components: {
    pop,
    boxTitle
  },
  computed: {
    getIsLoading: function () {
      return (this.isLoading1) && this.isLoading2
    }
  },
  filters: {
    splitime: function (value) {
      let s = value
      return s.substring(s.indexOf(' ') + 1, s.length)
    },
    replace: function (value) {
      if (value) {
        return value
      } else {
        return '-'
      }
    }
  },
  mounted: function () {
    let reqParam = user.getRequestHeader()
    if (this.param.e.deviceID !== undefined) {
      reqParam.deviceID = this.param.e.deviceID
      // reqParam.deviceID = 'b6cf0b33755e11e8a0ad7cd30adae832'
      console.log(this.param.e.deviceID)
    } else {
      console.log('没有deviceID')
    }
    let villageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
    if (villageIDs !== undefined) {
      reqParam.villageIDs = villageIDs
      console.log(villageIDs)
    } else {
      console.log('没有villageIDs')
    }
    let that = this
    this.isLoading1 = this.isLoading2 = true

    // 获取设备信息
    Post({
      async: true,
      url: apiNames['获取设备信息'],
      data: reqParam,
      dataType: 'json',
      success: function (data) {
        that.isLoading1 = false
        console.log(data)
        if (data.responseStatus.resultCode === 0) {
          let s = data.deviceInfo.insertTime
          let a = s.replace('T', ' ')
          data.deviceInfo.insertTime = a.substring(0, a.indexOf('.'))
          switch (data.deviceInfo.state) {
            case 0 :
              data.deviceInfo.state = '离线'
              break
            case 1 :
              data.deviceInfo.state = '在线'
              break
            case 2 :
              data.deviceInfo.state = '故障'
              break
          }
          that.cameraInfo = data.deviceInfo
          that.deviceImage = data.deviceInfo.deviceImage
        }
        if (data.responseStatus.resultCode !== 0) {
          console.log(data.responseStatus.resultMessage)
        }
      },
      error: function (err) {
        console.log(JSON.stringify(err) + 'popup-camera 获取设备信息')
      }
    })

    //  获取设备报警信息
    Post({
      async: true,
      url: apiNames['获取设备报警信息'],
      data: reqParam,
      dataType: 'json',
      success: function (data) {
        that.isLoadidng2 = false
        let alarmsInfo = data.alarms
        let arr = []
        for (let i in alarmsInfo) {
          arr.push(alarmsInfo[i])
        }
        for (let i = 0; i < arr.length; i++) {
          let s = arr[i].insertTime
          let a = s.replace('T', ' ')
          arr[i].insertTime = a.substring(0, a.indexOf('.'))
        }
        for (let i = 0; i < arr.length; i++) {
          that.cameraAlar[i].name = arr[i].deviceType
          that.cameraAlar[i].time = arr[i].insertTime
          that.cameraAlar[i].type = arr[i].alarmTypeName
        }
        if (data.responseStatus.resultCode !== 0) {
          console.log(data.responseStatus.resultMessage)
        }
      },
      error: function (err) {
        console.log(JSON.stringify(err) + 'popup-camera 获取设备报警信息')
      }
    })

    //  获取设备运维列表
    Post({
      async: true,
      url: apiNames['获取设备运维列表'],
      data: reqParam,
      dataType: 'json',
      success: function (data) {
        that.isLoadidng2 = false
        if (data.deviceOpsList) {
          that.cameraAlar = data.deviceOpsList
        } else {
          that.warinInfo = '暂无报警信息'
        }
        if (data.responseStatus.resultCode !== 0) {
          console.log(data.responseStatus.resultMessage)
        }
      },
      error: function (err) {
        console.log(JSON.stringify(err) + 'popup-camera 获取设备运维列表')
      }
    })
  },
  methods: {
    onClosed: function () {
      // 此处做一些资源的释放
    },
    select: function () {
      this.innerIndex = !this.innerIndex
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
.monitor {
  overflow: hidden;
}
.monitor_left {
  width: 18.4rem;
  padding-left: .1rem;
  float: left;
}
.mo_top {
  box-sizing: border-box;
  padding-top: .2rem;
  padding-left: .4rem;
  position: relative;
  overflow: hidden;
}
.mo_top .mo_top_l {
  float: left;
}
.mo_top .mo_top_l .mo_top_l1 {
  position: relative;
  width: 12.6rem;
}
.mo_top .mo_top_l .mo_top_l1 h4 {
  display: inline-block;
  position: absolute;
  width: 3.1rem;
  padding-bottom: .1rem;
  border-bottom: 1px solid #00485e;
  bottom: 0;
  left: 0;
}
.mo_top .mo_top_l .mo_top_l1 .topImg {
  position: absolute;
  top: -.2rem;
  left: .6rem;
}
.mo_top .mo_top_l .mo_top_l1 p:nth-of-type(1) {
  position: absolute;
  display: inline-block;
  font-size: .4rem;
  width: 1.9rem;
  height: .5rem;
  line-height: .5rem;
  text-align: center;
  border: 1px solid #00485e;
  background: #3baec1;
  transform: skew(-35deg);
  left: 2.5rem;
  bottom: .15rem;
}
.mo_top .mo_top_l .mo_top_l1 p:nth-of-type(1) span {
  display: inline-block;
  transform: skew(35deg);
}
.mo_top .mo_top_l .mo_top_l1 p:nth-of-type(2) {
  position: absolute;
  display: inline-block;
  font-size: .28rem;
  height: .52rem;
  width: .52rem;
  line-height: .62rem;
  text-align: center;
  cursor: pointer;
  right: 0;
  top: .5rem;
  background: #004c61;
}
.mo_top .mo_top_l .mo_top_l1 p img{
  width:.4rem;
  height:.28rem;
}
.mo_top .mo_top_l ul {
  width: 12.6rem;
  font-size: .4rem;
  overflow: hidden;
  margin-top: .18rem;
}
.mo_top .mo_top_l ul li {
  box-sizing: border-box;
  padding-left: .4rem;
  padding-right: .2rem;
  height: .45rem;
  line-height: .45rem;
  border-left: 2px solid red;
  float: left;
  margin-top: .18rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mo_top .mo_top_l ul li:nth-of-type(odd) {
  width: 45%;
}
.mo_top .mo_top_l ul li:nth-of-type(even) {
  width: 55%;
}
.top_rimg {
  float: left;
  width: 5.4rem;
  height: 3.2rem;
  margin-top: .48rem;
}
.mo_middle {
  box-sizing: border-box;
  margin-top: .2rem;
  padding-left: .1rem;
}
.mo_middle_t {
  box-sizing: border-box;
  padding-left: .3rem;
  position: relative;
  height: .8rem;
}
.mo_middle_t img {
  position: absolute;
  top: -.2rem;
  left: .6rem;
}
.mo_middle_t h4 {
  display: inline-block;
  position: absolute;
  width: 3.1rem;
  padding-bottom: .1rem;
  border-bottom: 1px solid #00485e;
  bottom: 0;
  left: .4rem;
}
.mo_middle_t p {
  position: absolute;
  display: inline-block;
  font-size: .28rem;
  height: .44rem;
  line-height: .44rem;
  width: 12.8rem;
  text-align: center;
  border-top: 1px solid #00485e;
  border-left: 1px solid #00485e;
  transform: skew(-20deg);
  left: 3.56rem;
  bottom: 1px;
}
.mo_middle_img {
  width: 100%;
  box-sizing: border-box;
  height: .04rem;
  background: #31f1fe;
  position: absolute;
  top: .4rem;
}
.mo_middle_ul {
  height: 2.42rem;
  width: 100%;
  border-bottom: .2rem solid #193042;
  position: relative;
  padding-top: .85rem;
}
.mo_middle_ul p.ulbtn {
  width: .22rem;
  height: 2.42rem;
  text-align: center;
  background: rgba(52, 80, 90, 1);
  position: absolute;
}
.mo_middle_ul p.ulbtn:nth-of-type(1) {
  left: 0;
}
.mo_middle_ul p.ulbtn:nth-of-type(2) {
  right: 0;
}
.mo_middle_ul p.ulbtn:nth-of-type(1) span {
  display: inline-block;
  height: 0;
  width: 0;
  border: .08rem solid transparent;
  border-right: .08rem solid #00acb5;
  margin-top: 2.1rem;
  margin-right: .1rem;
}
.mo_middle_ul p.ulbtn:nth-of-type(2) span {
  display: inline-block;
  height: 0;
  width: 0;
  border: 4px solid transparent;
  border-left: .08rem solid #00acb5;
  margin-top: 2.1rem;
  margin-left: 1px;
}
.mo_middle_ul ul {
  box-sizing: border-box;
  padding: 0 .22rem;
  width: 20rem;
}
.mo_middle_ul ul li {
  float: left;
  position: relative;
  font-size: .4rem;
  width: 3.46rem;
  margin-right: .2rem;
}
.mo_middle_ul ul li .point{
  width:.4rem;
  height:.4rem;
  line-height: .4rem;
  position: absolute;
  left: 50%;
  top:-.65rem;
  transform: translateX(-50%);
}
.mo_middle_ul ul li .point span{
  width:100%;
  height:100%;
  display: inline-block;
  background: url("../../../assets/images/camera/process_icon1.svg") no-repeat 100% 100%;
}
.mo_middle_ul ul li .arrow{
  width:.8rem;
  height:.4rem;
  line-height: .4rem;
  position: absolute;
  right: -.6rem;
  top:-.63rem;
  background: none;
}
.mo_middle_ul ul li .arrow span{
  width:.28rem;
  height:100%;
  display: inline-block;
  background: url("../../../assets/images/camera/process_icon.svg") no-repeat 100% 100%;
}
.mo_middle_ul ul li h5 {
  font-weight: normal;
  text-align: center;
  margin-bottom: 1px;
  height: .48rem;
  line-height: .48rem;
  background: rgba(0, 78, 85, 1);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mo_middle_ul ul li div.ul_main {
  font-weight: normal;
  height: 1.9rem;
  margin-bottom: 1px;
  background: rgba(31, 42, 59, 1);
  overflow: hidden;
}
.mo_middle_ul ul li div.ul_main div {
  margin-top: .3rem;
  box-sizing: border-box;
  padding-top: .3rem;
  border-top: 1px solid #547982;
}
.mo_middle_ul ul li div.ul_main div p {
  display: inline-block;
  width: .22rem;
  height: .4rem;
  background: #89bec2;
  margin-left: .1rem;
  margin-right: .4rem;
  position: relative;
  top: .1rem;
}
.mo_middle_ul ul li div.ul_main div p span {
  display: inline-block;
  width: 1px;
  height: .22rem;
  background: #89bec2;
  position: absolute;
  right: -.2rem;
  top: 0;
}
.mo_middle_ul ul li.ul_3li {
  width: 3.35rem;
}
.mo_middle_ul ul li.ul_3li .point span{
  background: url("../../../assets/images/camera/process_icon2.svg") no-repeat 100% 100%;
}
.mo_middle_ul ul li.ul_4li .point span{
  width:.32rem;
  height:.32rem;
}
.mo_middle_ul ul li.ul_5li .point span{
  background: url("../../../assets/images/camera/process_icon3.svg") no-repeat 100% 100%;
}
.mo_middle_ul ul li.ul_3li h5 {
  background: #ffb641;
}
.mo_middle_ul ul li.ul_3li div.ul_main {
  border-bottom: .22rem solid #00525b;
  box-sizing: border-box;
}
.mo_middle_ul ul li.ul_3li div.ul_main div {
  border-top: 1px solid #ffb641;
}
.mo_middle_ul ul li.ul_3li div.ul_main div p {
  background: #00d9d8;
}
.mo_middle_ul ul li.ul_3li div.ul_main div p span {
  background: #00d9d8;
}
.mo_bottom {
  overflow: hidden;
  margin-top: .2rem ;
  box-sizing: border-box;
  padding: .1rem .1rem 0 .1rem;
}
.mo_bottom > div {
  float: left;
  width: 5.9rem;
  height: 3.4rem;
  margin-right: .24rem;
}
.mo_bottom > div:last-child {
  margin-right: 0px;
}
.monitor_right {
  float: left;
  box-sizing: border-box;
  margin-left: .2rem;
  padding-top: .2rem;
}
.monitor_right_t {
  position: relative;
  height: .8rem;
}
.monitor_right h4 {
  display: inline-block;
  position: absolute;
  width: 2.48rem;
  padding-bottom: .1rem;
  border-bottom: 1px solid #00485e;
  top: 0;
  left: 0px;
}
.monitor_right p {
  position: absolute;
  display: inline-block;
  font-size: .28rem;
  height: .44rem;
  line-height: .44rem;
  width: 4.1rem;
  text-align: center;
  border-top: 1px solid #00485e;
  border-left: 1px solid #00485e;
  transform: skew(-20deg);
  left: 2.52rem;
  top: .08rem;
}
.monitor_right img {
  position: absolute;
  top: -.2rem;
  left: .6rem;
}
.monitor_right_ul {
  width: 8.6rem;
  height: 10.86rem;
  font-size: .4rem;
  margin-top: .2rem;
}
.monitor_right_ultop {
  box-sizing: border-box;
  padding: .2rem .3rem 0 .1rem;
  display: flex;
  height: .76rem;
  line-height: .56rem;
}
.monitor_right_ultop span {
  flex: 2;
  text-align: center;
}
.monitor_right_ultop span:nth-of-type(2) {
  flex: 2;
}
.monitor_right_ul ul {
  box-sizing: border-box;
  padding: 0 .3rem .2rem .1rem;
}
.monitor_right_ul ul li {
  text-align: center;
  height: .56rem;
  line-height: .56rem;
  display: flex;
}
.monitor_right_ul ul li span {
  text-align: center;
  flex: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.monitor_right_ul ul li span:nth-of-type(2) {
  flex: 2;
}
.monitor_right_ul ul li:nth-of-type(odd) {
  background: #244450;
}
</style>
