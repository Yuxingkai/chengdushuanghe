<template>
  <pop
    :title="title"
    :level="param.level"
    footer="display:none"
    css="width:26.28rem"
    over-flow="false">
    <div class="contain">
      <div style="height: 7.9rem;width: 11.84rem;float: left;">
        <Box3>
          <div
            v-if="microCarInfo.inplatepic"
            style="position: relative">
            <div
              style="width: 100%; height: 7.8rem;background-position: center center;background-repeat: no-repeat;"
              :style="{backgroundImage: 'url(' + microCarInfo.inplatepic + ')', backgroundSize:'cover'}"/>
            <div style="display: flex;position: absolute;bottom: 0rem;overflow: hidden;width: 100%;height: .8rem;color: white;font-size: .44rem;opacity:0.66;">
              <div style="flex: 1;float: left;height: .8rem;line-height: .8rem;margin-left: .2rem"/>
              <div style="flex: 1;float: right;height: .8rem;line-height: .8rem;margin-right: .2rem"/>
              <div
                @click="controlLargePic(microCarInfo.inplatepic)"
                class="el-icon-search"
                style="width: .8rem;height: .8rem;line-height: .8rem;"/>
            </div>
          </div>
          <div
            v-else
            style="position: relative">
            <div style="width: 100%; height: 8rem;text-align: center;line-height: 8rem;font-size: .52rem">无驶入图片</div>
            <!--<div style="overflow: hidden;width: 100%;height: .8rem;color: white;font-size: .44rem;background:rgba(26,39,96,1);opacity:0.66;position: absolute;top: 0rem;">-->
            <!--<div style="float: left;height: .8rem;line-height: .8rem;margin-left: .2rem">-</div>-->
            <!--<div style="float: right;height: .8rem;line-height: .8rem;margin-right: .2rem">-</div>-->
            <!--</div>-->
          </div>
        </Box3>
      </div>
      <div style="height: 7.9rem;width: 11.84rem;float: right;">
        <Box3>
          <div
            v-if="microCarInfo.outplatepic"
            style="position: relative">
            <div
              style="width: 100%; height: 7.8rem;background-position: center center;background-repeat: no-repeat;"
              :style="{backgroundImage: 'url(' + microCarInfo.outplatepic + ')', backgroundSize:'cover'}"/>
            <div style="display: flex;opacity:0.66;position: absolute;bottom: 0rem;overflow: hidden;width: 100%;height: .8rem;line-height: .8rem;color: white;font-size: .44rem;">
              <div style="flex: 1;height: .8rem;margin-left: .2rem"/>
              <div style="flex: 1;height: .8rem;margin-right: .2rem"/>
              <div
                @click="controlLargePic(microCarInfo.outplatepic)"
                class="el-icon-search"
                style="width: .8rem;height: .8rem;line-height: .8rem;"/>
            </div>
          </div>
          <div
            v-else
            style="position: relative">
            <div style="width: 100%; height: 8rem;text-align: center;line-height: 8rem;font-size: .52rem">无驶出图片</div>
            <!--<div style="overflow: hidden;width: 100%;height: .8rem;color: white;font-size: .44rem;background:rgb(26, 39, 96);opacity:0.66;position: absolute;top: 0rem;">-->
            <!--<div style="float: left;height: .8rem;line-height: .8rem;margin-left: .2rem">-</div>-->
            <!--<div style="float: right;height: .8rem;line-height: .8rem;margin-right: .2rem">-</div>-->
            <!--</div>-->
          </div>
        </Box3>
      </div>
    </div>
    <div class="foot">
      <div style="font-size:22px;font-family:Microsoft YaHei;font-weight:400;color:rgba(238,127,70,1);">
        <span>{{ title }}</span>
        <span style="margin-left: 1rem;">停留时长:{{ computdifTime(difTime(microCarInfo.intime, microCarInfo.outtime)) }}</span>
      </div>
      <div class="secondCla">
        <span>车辆类型: {{ changeName(microCarInfo.cartype) || '-' }}</span>
        <span>车辆所有人:{{ microCarInfo.peoplename || '  -' }}</span>
        <span>手机号码: {{ microCarInfo.phoneno || '  -' }}</span>
      </div>
    </div>
    <div
      v-if="largePic"
      @click="close"
      style="background: rgba(0,0,0,1);position: absolute;left: 0;top: 0;bottom: 0;right: 0;z-index: 222">
      <div
        @click.stop="notClose"
        style="border: 1px solid rgba(44, 136, 255, .35);z-index: 223;position: absolute;width: 14rem;height: 9rem;top: .5rem;left: 50%;transform: translate(-50%, 0)">
        <scalePic :pic-url="picUrl"/>
      </div>
    </div>
  </pop>
</template>
<script>
import pop from '../../public/popupContainer'
import scalePic from './scalePic'
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
      largePic: false,
      title: '沪A66666-本区',
      microCarInfo: {},
      carTypes: [],
      picUrl: ''
    }
  },
  components: {
    pop,
    scalePic
  },
  mounted () {
    this.microCarInfo = this.param.e
    if (this.microCarInfo.peoplename === null || this.microCarInfo.peoplename === '') {
      this.title = this.microCarInfo.plateno + ' - 外来'
    } else {
      this.title = this.microCarInfo.plateno + ' - 本地'
    }
    this.carTypes = JSON.parse(localStorage.getItem('parkingCar'))
  },
  methods: {
    notClose () {
      // P
    },
    close () {
      this.largePic = false
    },
    controlLargePic (url) {
      this.largePic = true
      this.picUrl = url
    },
    changeName (name) {
      let newname = ''
      for (let i = 0; i < this.carTypes.length; i++) {
        if (this.carTypes[i].name === name) {
          newname = this.carTypes[i].typeName
        }
      }
      return newname
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
    difTime (intime, outtime) {
      if (outtime === null || outtime === '') {
        outtime = new Date() / 1000
      }
      if (intime === null || intime === '') {
        return 0
      } else {
        return outtime - intime
      }
    }
  }
}
</script>

<style scoped>
  .dragAble {position:relative;cursor:move;}
  .img-con {
    position:relative;
    width: 14rem;
    height: 9rem;
    overflow: hidden;
    border: 1px solid red;
  }
  .contain{
    overflow: hidden;
    padding: .2rem 1rem;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .foot {
    width: 100%;
    margin-top: .1rem;
    text-align: center;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .foot div {
    width: 100%;
  }
  .foot div span{
    display: inline-block;
    height: .8rem;
    line-height: .8rem;
    font-size: .44rem;
    font-weight: bold;
  }
  .foot .secondCla span {
    font-size: .36rem !important;
  }
  .secondCla span:nth-child(2), .secondCla span:nth-child(3) {
    margin-left: 2rem;
  }
</style>
