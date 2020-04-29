<template>
  <pop
    title="门禁通行详情"
    :level="param.level"
    footer="display:none"
    css="width: 21rem"
    over-flow="false">
    <div
      class="userSelect"
      style="width: 19.56rem;height: 6.18rem;background:rgba(255,255,255,.13);margin: .2rem auto;border-radius: .2rem">
      <div
        class="textfont"
        style="float:left;width: 55%;height: 100%">
        <div>
          <span>姓名 : {{ obj.peoplename || '-' }}</span>
          <span>性别 ：{{ obj.gender || '-' }}</span>
        </div>
        <div>
          <span>民族 ：{{ obj.nation || '-' }}</span>
          <span>出生日期 ：{{ obj.birthdate || '-' }}</span>
        </div>
        <div>
          <span style="width: 100%">身份证号 ：{{ obj.credentialno || '-' }}</span>
        </div>
        <div>
          <span>联系方式 ：{{ obj.phoneno || '-' }}</span>
          <span>人口类别 ：{{ changePeopleType(obj.peopletype) || '-' }}</span>
        </div>
        <div>
          <span style="width: 100%">户籍地址 ：{{ obj.domiclle || '-' }}</span>
        </div>
        <div>
          <span style="width: 100%">住址 ：{{ obj.residenceDetailAddress || '-' }}</span>
        </div>
        <div>
          <span style="width: 100%">标签 ：{{ changeLabel(obj.peoplelabel) || '-' }}</span>
        </div>
      </div>
      <div style="float:right;width: 45%;height: 100%">
        <div style="margin: .6rem auto">
          <div style="width: 3.84rem;height: 4.82rem;float: left;position: relative">
            <box3>
              <img
                style="width: 100%;height: 100%"
                :src="idPic"
                alt="">
            </box3>
            <div style="left: .02rem;position: absolute;bottom: 0.06rem;background:rgba(26,39,96,1);width: 3.8rem;height: .54rem;line-height: .54rem;text-align: center;font-size: .28rem;font-family:Microsoft YaHei;font-weight:400;color:rgba(196,241,255,1);">
              <span>身份证照</span>
              <img
                v-if="obj.political_Code == '3'"
                style="position: absolute;top: .13rem;right: .3rem;width: .32rem;height: .32rem;"
                src="../../../../assets/images/nationalEmblem.png"
                alt="">
            </div>
          </div>
          <div
            v-if="faceUrlShow"
            style="width: 3.84rem;height: 4.82rem;float: left;margin-left: .58rem;position: relative">
            <box3>
              <img
                style="width: 100%;height: 100%"
                :src="filtration(faceUrl)"
                alt="">
            </box3>
            <div style="left: .02rem;position: absolute;bottom: 0.06rem;background:rgba(26,39,96,1);width: 3.8rem;height: .54rem;line-height: .54rem;text-align: center;font-size: .28rem;font-family:Microsoft YaHei;font-weight:400;color:rgba(196,241,255,1);">
              抓拍头像
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 19.56rem;margin: .3rem auto;">
      <div style="height: .5rem;line-height: .5rem;vertical-align: middle;">
        <span style="vertical-align: middle;width: .2rem;height: .2rem;display: inline-block;background: rgba(0,146,194,1);border-radius: .1rem"/>
        <span style="vertical-align: middle;margin-left: .1rem;font-size: .36rem;font-family:Microsoft YaHei;font-weight:400;color:rgba(196,241,255,1);">通行信息</span>
      </div>
      <div style="width: 100%;overflow: hidden;margin-top: .3rem;font-size:16px;font-family:Microsoft YaHei;font-weight:400;color:rgba(196,241,255,1);">
        <span style="width: 25%;float: left">小区名称 : {{ changeVillageName(obj.villageid) || '-' }}</span>
        <span style="width: 25%;float: left">通行时间 : {{ formatDates(obj.opentime) || '-' }} </span>
        <span style="width: 25%;float: left">通行楼栋 : {{ obj.name || '-' }}</span>
        <span style="width: 25%;float: left">开门方式 : {{ changeOpenType(obj.opentype) || '-' }}</span>
      </div>
    </div>
    <div style="width: 19.56rem;height: 9.46rem;background:rgba(255,255,255,.13);margin: .2rem auto;border-radius: .2rem">
      <!--<div>-->
      <!--<div>-->
      <!--<span>小区名称 ：{{ changeVillageName(obj.villageid) || '-' }}</span>-->
      <!--<span>小区名称 ：{{ changeVillageName(obj.villageid) || '-' }}-->
      <!--<span>开门方式 ：{{ changeOpenType(obj.opentype) || '-' }}</span>-->
      <!--</div>-->
      <!--<div>-->
      <!--<span>通行时间：{{ formatDates(obj.opentime) || '-' }}</span>-->
      <!--<span>通行视频：</span>-->
      <!--</div>-->
      <!--</div>-->
      <div style="width: 100%;height: 100%;position: relative;border-radius: .2rem">
        <p
          class="tvChange"
          v-show="playChange"
          @click="playChan">前后门视频切换</p>
        <playvideo :src="tvSrc"/>
        <div
          v-if="hasShiPin"
          style="position: absolute;left: 50%;top: 4rem;z-index: 11111;color: white">无相关视频</div>
      </div>
    </div>
  </pop>
</template>

<script>
import pop from '../../public/popupContainer'
import user from '../../../../Utils/user'
import { apiNames } from '../../../../config/config'
import { Post, PostCopy } from '../../../../Utils/Http'
import playvideo from '../../../UIKit/playVideo'
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
      hasShiPin: false,
      obj: {},
      openType: [],
      playChange: false,
      tvSrc: '',
      playArr: [],
      changSum: true,
      labels: [],
      idPic: '',
      faceUrl: '',
      faceUrlShow: true,
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: ''
    }
  },
  name: 'PassDetail',
  components: {
    pop,
    playvideo
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    this.obj = this.param.e
    this.getstremsm(this.obj.opentime, this.obj.inCameraDeviceID, this.obj.outCameraDeviceID)
    if (this.obj.idpic === '' || this.obj.idpic == null) {
      this.idPic = require('../../../../assets/images/photoDefault.png')
    } else {
      this.idPic = this.obj.idpic
    }
    if (this.obj.faceUrl === '' || this.obj.faceUrl == null) {
      this.faceUrl = require('../../../../assets/images/photoDefault.png')
      this.faceUrlShow = this.obj.faceUrlShow
    } else {
      this.faceUrl = this.obj.faceUrl
      this.faceUrlShow = this.obj.faceUrlShow
    }
    this.getLabels()
    this.getOpenType()
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
    // 获取小视频
    getstremsm (time, inid, outid) {
      let allTime = new Date(time)
      allTime = allTime.getTime()
      let reqParamIn = user.getRequestHeader()
      let reqParamOut = user.getRequestHeader()
      // reqParam.ID = '31010520011320001003'
      // reqParam.Start = '1548825600'
      // reqParam.End = '1548825900'
      reqParamIn.ID = inid
      reqParamIn.Start = allTime - 15
      reqParamIn.End = allTime + 15

      reqParamOut.ID = outid
      reqParamOut.Start = allTime - 15
      reqParamOut.End = allTime + 15
      if (inid) {
        PostCopy({
          async: false,
          url: this.smallVideoUrl,
          data: reqParamIn,
          dataType: 'json',
          success: (data) => {
            if (data.Code === 0) {
              this.tvSrcIn = this.playUrl + data.Data.RTMP
            } else {
            }
          },
          error: (err) => {
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
          }
        })
      }
      if (outid) {
        PostCopy({
          async: false,
          url: this.smallVideoUrl,
          data: reqParamOut,
          dataType: 'json',
          success: (data) => {
            if (data.Code === 0) {
              this.tvSrcOut = this.playUrl + data.Data.RTMP
            } else {
              // this.$message('没有相关视频')
            }
          },
          error: (err) => {
            console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
          }
        })
      }
      console.log(this.tvSrcIn, this.tvSrcOut)
      this.getDataSrc(this.tvSrcIn, this.tvSrcOut)
    },
    // 获取门禁列表小视频播放
    getDataSrc (src1, src2) {
      if (this.tvSrcIn || this.tvSrcOut) {
        this.hasShiPin = false
      } else {
        this.hasShiPin = true
      }
      if (src1 === '' && src2 === '') {
        console.log('小视频为空')
      } else {
        this.playArr = [src1, src2]
        if (this.playArr[0] !== undefined && this.playArr[1] !== undefined) {
          this.playChange = true
        } else {
          this.playChange = false
        }
        this.tvSrc = src1 || src2
      }
    },
    changeOpenType (id) {
      let name = ''
      for (let i = 0; i < this.openType.length; i++) {
        if (this.openType[i].name === id) {
          name = this.openType[i].typeName
        }
      }
      return name
    },
    getOpenType () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_access_log/openType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.openType = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    changeVillageName (id) {
      let villageId = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      let name = ''
      for (let i = 0; i < villageId.length; i++) {
        if (villageId[i].villageID === id) {
          name = villageId[i].villageName
        }
      }
      return name
    },
    changePeopleType (num) {
      switch (num) {
        case '1':
          return '本市人员'
        case '2':
          return '外来人员'
        default:
          return '境外人员'
      }
    },
    getLabels () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/p_people_tag/label']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.labels = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    changeLabel (str) {
      if (str) {
        let label = str.split(',')
        let newstr = []
        if (label.length > 0) {
          for (let i = 0; i < label.length; i++) {
            for (let j = 0; j < this.labels.length; j++) {
              if (this.labels[j].name === label[i].replace(/\s/g, '')) {
                newstr.push(this.labels[j].typeName)
              }
            }
          }
        }
        newstr = newstr.join(',')
        return newstr
      } else {
        return ''
      }
    },
    playChan () {
      let allArr = this.playArr
      this.changSum = !this.changSum
      if (this.changSum === true) {
        this.tvSrc = allArr[0]
        if (this.tvSrc !== '' || this.tvSrc !== undefined) {
          this.hasShiPin = false
        } else {
          this.hasShiPin = true
        }
      } else {
        this.tvSrc = allArr[1]
        if (this.tvSrc !== '' || this.tvSrc !== undefined) {
          this.hasShiPin = false
        } else {
          this.hasShiPin = true
        }
      }
    },
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>

<style scoped>
  .userSelect {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .textfont {
    font-size: .32rem;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(196,241,255,1);
  }
  .textfont div {
    line-height: .52rem;
    padding: .18rem .4rem .18rem 0;
    overflow: hidden;
    margin-left: 4%;
  }
  .textfont div span{
    float: left;
    width: 45%;
    display: inline-block;
  }
  .tvChange{
    position: absolute;
    z-index: 99;
    right: .7rem;
    top: .7rem;
    padding: .2rem;
    background: rgba(44, 136, 255, .35);
    cursor: pointer;
    border-radius: 5px;
  }
</style>
