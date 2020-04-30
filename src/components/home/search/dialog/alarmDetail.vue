<template>
  <pop
    title="事件报警详情"
    :level="param.level"
    footer="display:none"
    css="width:19rem"
    over-flow="false">
    <div class="userSelect">
      <div style="line-height: .52rem; margin-top: .5rem">
        <span
          style="width: .2rem;
          height: .2rem;
          display: inline-block;
          margin-left: 1rem;
          background:rgba(0,146,194,1);
          border-radius:50%;"/>
        <span
          style="font-size: .36rem;
          color:rgba(196,241,255,1);
          font-family:Microsoft YaHei;">报警信息</span>
      </div>
      <div class="textfont">
        <div>
          <span>所属小区 : {{ changeVillageName(obj.villageid) || '-' }}</span>
          <!--<span>报警名称 : {{ obj.alarmtypename || '-' }}</span>-->
          <span>报警类型 : {{ obj.alarmtypename || '-' }}</span>
          <span>报警规则 : 通行报警通行报警通行报警</span>
          <!--<span>报警时间 : {{ formatDates(obj.alarmtime) || '-' }}</span>-->
        </div>
        <div>
          <span>报警时间 : {{ formatDates(obj.alarmtime) || '-' }}</span>
          <span>报警次数 : {{ obj.alarmcount || '-' }}次</span>
          <span>报警等级 : {{ obj.alarmlevelname || '-' }}</span>
          <!--<span>报警地址 : {{ obj.address || '-' }}</span>-->
        </div>
        <div>
          <span>报警地址 : {{ obj.installadd || obj.address }}</span>
          <span style="width: 66.7%">报警内容 : {{ obj.alarmcontent || '-' }}</span>
        </div>
      </div>
    </div>
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
      obj: {}
    }
  },
  name: 'AlarmDetail',
  components: {
    pop
  },
  methods: {
    changeVillageName (id) {
      let villageId = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      let name = ''
      for (let i = 0; i < villageId.length; i++) {
        if (villageId[i].villageID === id) {
          name = villageId[i].villageName
        }
      }
      return name
    }
  },
  mounted () {
    this.obj = this.param.e
  }
}
</script>

<style scoped>
  .textfont {
    font-size: .32rem;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(196,241,255,1);
  }
  .textfont div {
    line-height: .52rem;
    padding: .2rem .2rem .2rem 0;
    margin-left: 1rem;
    overflow: hidden;
  }
  .textfont div span{
    float: left;
    width: 33.3%;
    display: inline-block;
  }
  .four {
    width: 25%!important;
  }
  .userSelect {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
</style>
