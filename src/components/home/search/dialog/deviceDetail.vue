<template>
  <pop
    title="设备查询详情"
    :level="param.level"
    footer="display:none"
    css="width:16.46rem"
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
          font-family:Microsoft YaHei;">基本信息</span>
      </div>
      <div class="textfont">
        <div>
          <span>设备名称 :{{ obj.name || '-' }}</span>
          <span>设备类型 : {{ changeTypes(obj.devicetype.replace(/\s/ig,'')) || '-' }}</span>
          <span>所属小区 : {{ changeVillageName(obj.villageid) || '-' }}</span>
        </div>
        <div>
          <span>设备状态 : {{ changeerrState(obj.state) || '-' }}</span>
          <span>设备编号 : {{ obj.code || '-' }}</span>
          <span>设备型号 : {{ obj.productmodel || '-' }}</span>
        </div>
        <div>
          <span>安装位置 : {{ obj.installadd || '-' }}</span>
          <span>启用状态 : 启用</span>
          <span>运行时长 : 200天200小时</span>
        </div>
      </div>
    </div>
    <div v-if="obj.devicetype.replace(/\s/ig,'') === 'access'">
      <div style="line-height: .52rem; margin-top: .5rem">
        <span
          style="width: .2rem;
          height: .2rem;
          margin-left: 1rem;
          display: inline-block;
          background:rgba(0,146,194,1);
          border-radius:50%;"/>
        <span
          style="font-size: .36rem;
          color:rgba(196,241,255,1);
          font-family:Microsoft YaHei;">特有属性</span>
      </div>
      <div class="textfont">
        <div>
          <span>门禁IP : 垃圾箱门禁卡设备</span>
          <span>门禁端口 : ——</span>
          <span>门禁类别 : — —</span>
        </div>
        <div>
          <span>MAC : ——</span>
          <span>登录名 : — —</span>
          <span>登录密码 : — —</span>
        </div>
        <div>
          <span>人脸网关 : — —</span>
          <span>读头编码 : — —</span>
        </div>
      </div>
    </div>
  </pop>
</template>

<script>
import pop from '../../public/popupContainer'
import user from '../../../../Utils/user'
import { apiNames } from '../../../../config/config'
import { Post } from '../../../../Utils/Http'
export default {
  data () {
    return {
      obj: [],
      optionsItemType: []
    }
  },
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'DeviceDetail',
  components: {
    pop
  },
  methods: {
    geterrState () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_device/state']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.errState = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    changeerrState (id) {
      let name = ''
      for (let i = 0; i < this.errState.length; i++) {
        if (Number(this.errState[i].name) === id) {
          name = this.errState[i].typeName
        }
      }
      return name
    },
    getItemTypes () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_device/type']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.optionsItemType = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    changeTypes (str) {
      if (str) {
        let newstr = ''
        for (let i = 0; i < this.optionsItemType.length; i++) {
          if (this.optionsItemType[i].name === str) {
            newstr = this.optionsItemType[i].typeName
          }
        }
        return newstr
      } else {
        return ''
      }
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
    }
  },
  mounted () {
    this.geterrState()
    this.getItemTypes()
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
  .textfont div span {
    float: left;
    width: 33.3%;
    display: inline-block;
  }
  .userSelect {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
</style>
