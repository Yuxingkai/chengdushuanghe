<template>
  <pop
    title="用户详情"
    :level="param.level"
    footer="display:none"
    css="width:14.4rem"
    over-flow="false">
    <Box3>
      <div class="infos">
        <div>姓名 :</div>
        <div>{{ faceInfo.peoplename }}</div>
        <div>性别 :</div>
        <div>{{ faceInfo.gender }}</div>
        <div>名族 :</div>
        <div>{{ faceInfo.nation }}</div>
        <div>政治面貌 :</div>
        <div>{{ faceInfo.political }}</div>
        <div>学历 :</div>
        <div>{{ faceInfo.education }}</div>
        <div>婚姻状况 :</div>
        <div>{{ faceInfo.maritialstatus }}</div>
        <div>身份证 :</div>
        <div>{{ faceInfo.credentialno }}</div>
        <div>出生日期 :</div>
        <div>{{ faceInfo.birthdate }}</div>
        <div>联系方式 :</div>
        <div>{{ faceInfo.phoneno }}</div>
        <div>人口标签 :</div>
        <div
          :title="faceInfo.peoplelabel"
          style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;width: 2rem">{{ faceInfo.peoplelabel }}</div>
        <div>户籍地 :</div>
        <div>{{ faceInfo.domiclleaddress }}</div>
        <div>家庭住址 :</div>
        <div>{{ faceInfo.alladdress }}</div>
        <div>小区名称 :</div>
        <div>{{ faceInfo.villagename }}</div>
      </div>
      <div style="position: absolute;right: 0.5rem;top: 0.5rem;width: 3rem;height: 3.6rem;">
        <Box3>
          <img
            style="width: 100%;height: 100%;"
            :src="headurl"
            alt="">
        </Box3>
      </div>
    </Box3>
  </pop>
</template>

<script>
import pop from '../../public/popupContainer'

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
      faceInfo: {},
      headurl: ''
    }
  },
  components: {
    pop
  },
  mounted () {
    this.faceInfo = this.param.e
    if (this.faceInfo.headpic === '') {
      this.headurl = require('../../../../assets/images/photoDefault.png')
    } else {
      this.headurl = this.faceInfo.headpic
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .infos{
    display: grid;
    grid-template-columns:2rem 4rem 2rem 4rem;
    grid-template-rows: repeat(6, .8rem);
  }
  .infos div{
    line-height: .8rem;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .infos div:nth-child(odd){
    text-align: right;
    padding-right: .3rem;
  }
</style>
