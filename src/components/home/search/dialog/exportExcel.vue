<template>
  <pop
    title="导出"
    :level="param.level"
    footer="display:none"
    css="width:14.4rem;"
    over-flow="false">
    <el-progress
      :stroke-width="strokeWidth"
      color="rgba(2,191,254,1)"
      class="progressClass"
      type="circle"
      :percentage="percentage"/>
    <div class="checkBox">
      <div>
        <input
          id="all"
          class="btn-checkbox"
          type="checkbox"
          value="all"
          v-model="all"
          @change="allCheck">
        <label for="all"><span style="margin-top: -.03rem;color: #02BFFE">全部</span></label>
      </div>
      <div>
        <input
          id="front"
          class="btn-checkbox"
          type="checkbox"
          value="front"
          v-model="front"
          @change="frontCheck">
        <label for="front"><span style="margin-top: -.03rem;color: #02BFFE">导出前100页</span></label>
      </div>
      <div>
        <input
          id="self"
          class="btn-checkbox"
          type="checkbox"
          value="self"
          v-model="self"
          @change="selfCheck">
        <label for="self"><span style="margin-top: -.03rem;color: #02BFFE">自定义选择</span></label>
      </div>
    </div>
    <div
      class="choosePage"
      v-if="pageShow">
      <span>第</span>
      <span><input
        type="text"
        onkeyup="(this.v=function(){this.value=this.value.replace(/[^\d]/g,'');}).call(this)"
        onblur="this.v();"
        v-model="firstPage"></span>
      <span>页到</span>
      <span><input
        type="text"
        v-model="lastPage"
        onkeyup="(this.v=function(){this.value=this.value.replace(/[^\d]/g,'');}).call(this)"
        onblur="this.v();"></span>
      <span>页</span>
    </div>
    <div
      class="footPage"
      v-if="pageShow">
      共{{ this.lastPage - this.firstPage + 1 }}页{{ (this.lastPage - this.firstPage + 1) * this.pageSize }}条记录
    </div>
    <div :class="reexport ? 'newexport' : 'export'">
      <Box3>
        <div
          v-if="show"
          class="exportClass"
          @click.stop="exportExcel">导出</div>
        <div
          v-if="showcancel"
          class="exportClassCancel"
          @click.stop="cancelExcel">取消</div>
        <div
          v-if="reexport"
          class="exportClass"
          @click.stop="reexportExcel">导出失败，重新导出</div>
      </Box3>
    </div>
  </pop>
</template>

<script>
import pop from '../../public/popupContainer'
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post} from '../../../../Utils/Http'

export default {
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'ExportExcel',
  components: {
    pop
  },
  data () {
    return {
      percentage: 0,
      firstPage: 1,
      lastPage: 1,
      all: true,
      front: false,
      self: false,
      pageShow: false,
      type: '',
      total: '',
      serchCondition: {},
      exportpage: 1,
      exportData: [],
      openType: [],
      carTypes: [],
      labels: [],
      optionsItemType: [],
      pageSize: 0,
      show: true,
      showcancel: false,
      iscancel: false,
      reexport: false,
      exportType: '',
      circleStatus: '',
      strokeWidth: 8
    }
  },
  watch: {
    firstPage (newval, oldval) {
      if (newval < 0 || newval === '0') {
        this.firstPage = 1
      }
      if (newval > this.lastPage) {
        this.$message('前一页页数不能大于后一页页数')
      }
    },
    lastPage (newval, oldval) {
      if (newval < 0 || newval === '0') {
        this.lastPage = 1
      }
      if (newval < this.firstPage) {
        this.$message('前一页页数不能大于后一页页数')
      }
    }
  },
  mounted () {
    this.type = this.param.e.type
    this.exportType = this.param.e.type
    this.serchCondition = this.param.e.serchCondition
    this.total = this.param.e.total
    this.pageSize = this.param.e.pageSize
    this.carTypes = JSON.parse(localStorage.getItem('parkingCar'))
    this.getLabels()
    this.getOpenType()
    this.getItemTypes()
  },
  destroyed () {
    this.cancelExcel()
  },
  methods: {
    allCheck () {
      if (!this.all) {
        this.all = true
      }
      this.front = false
      this.self = false
      this.pageShow = false
      this.exportpage = 1
    },
    frontCheck () {
      if (!this.front) {
        this.front = true
      }
      this.self = false
      this.all = false
      this.pageShow = false
      this.exportpage = 1
    },
    selfCheck () {
      if (!this.self) {
        this.self = true
      }
      this.all = false
      this.front = false
      this.pageShow = true
      this.exportpage = this.firstPage
    },
    reexportExcel () {
      this.percentage = 0
      this.showcancel = true
      this.show = false
      this.reexport = false
      this.exportExcel()
    },
    exportExcel () {
      if (this.firstPage > this.lastPage) {
        this.$message('前一页页数不能大于后一页页数')
        this.firstPage = 1
        return
      }
      if (this.firstPage === '') {
        this.$message('请输入开始页')
        return
      }
      if (this.lastPage === '') {
        this.$message('请输入结束页')
        return
      }
      this.show = this.iscancel
      this.showcancel = !this.iscancel
      let reqParam = user.getRequestHeader()
      // let id = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.condition = {}
      reqParam.condition.villageIDs = this.serchCondition.villageIDs
      if (this.type === 'alarm') {
        reqParam.functionCode = 'yujin'
        reqParam.condition.deviceTypes = this.serchCondition.deviceTypes
        reqParam.condition.alarmTypes = this.serchCondition.alarmTypes
        reqParam.condition.alarmStates = this.serchCondition.alarmStates
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
        reqParam.condition.alarmReason = this.serchCondition.alarmReason
      } else if (this.type === 'pass') {
        reqParam.functionCode = 'tongxing'
        reqParam.condition.peopleName = this.serchCondition.peopleName
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.credentialNo = this.serchCondition.credentialNo
        reqParam.condition.peopleLabels = this.serchCondition.peopleLabels
        reqParam.condition.buildingNos = this.serchCondition.buildingNos
        reqParam.condition.cardNo = this.serchCondition.cardNo
        reqParam.condition.openTypes = this.serchCondition.openTypes
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
      } else if (this.type === 'device') {
        reqParam.functionCode = 'shebei'
        reqParam.condition.deviceCode = this.serchCondition.deviceCode
        reqParam.condition.deviceName = this.serchCondition.deviceName
        reqParam.condition.deviceTypes = this.serchCondition.deviceTypes
        reqParam.condition.buildingNos = this.serchCondition.buildingNos
        reqParam.condition.deviceModel = this.serchCondition.deviceModel
        reqParam.condition.deviceStates = this.serchCondition.deviceStates
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
      } else if (this.type === 'microCardFace') {
        reqParam.functionCode = 'wkface'
        reqParam.condition.ioID = this.serchCondition.ioID
        reqParam.condition.personType = this.serchCondition.personType
        reqParam.condition.peopleName = this.serchCondition.peopleName
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.credentialNo = this.serchCondition.credentialNo
        reqParam.condition.peopleLabels = this.serchCondition.peopleLabels
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
      } else if (this.type === 'microCardCar') {
        reqParam.functionCode = 'wkcar'
        reqParam.condition.ioID = this.serchCondition.ioID
        reqParam.condition.carType = this.serchCondition.carType
        reqParam.condition.plateNo = this.serchCondition.plateNo
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.peopleName = this.serchCondition.peopleName
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
      }
      if (this.all) {
        this.counts = Math.ceil(this.total / 100)
      } else if (this.front) {
        this.counts = 100
      } else if (this.self) {
        this.counts = this.lastPage - this.firstPage + 1
      }
      reqParam.pageNum = this.exportpage
      reqParam.pageSize = this.pageSize
      Post({
        async: true,
        url: apiNames['获取预警查询'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.data === undefined) {
            console.log('0')
          } else {
            this.exportData = this.exportData.concat(data.data)
            this.exportpage++
            if (this.exportpage - 1 === this.counts) {
              this.percentage = 100
              for (let i = 0; i < this.exportData.length; i++) {
                if (this.exportData[i].birthdate) {
                  this.exportData[i].birthdate = this.computAge(this.exportData[i].birthdate)
                }
                if (this.exportData[i].peopleinserttime) {
                  this.exportData[i].peopleinserttime = this.formatDates(this.exportData[i].peopleinserttime)
                }
                if (this.exportData[i].lastopendoortime) {
                  this.exportData[i].lastopendoortime = this.formatDates(this.exportData[i].lastopendoortime)
                }
                if (this.exportData[i].cartype) {
                  this.exportData[i].cartype = this.changeName(this.exportData[i].cartype)
                }
                if (this.exportData[i].villageid) {
                  this.exportData[i].villageid = this.changeVillageName(this.exportData[i].villageid)
                }
                if (this.exportData[i].peoplelabel) {
                  this.exportData[i].peoplelabel = this.changeLabel(this.exportData[i].peoplelabel)
                }
                if (this.exportData[i].opentype) {
                  this.exportData[i].opentype = this.changeOpenType(this.exportData[i].opentype)
                }
                if (this.exportData[i].opentime) {
                  this.exportData[i].opentime = this.formatDates(this.exportData[i].opentime)
                }
                if (this.exportData[i].alarmtime) {
                  this.exportData[i].alarmtime = this.formatDates(this.exportData[i].alarmtime)
                }
                if (this.exportData[i].intime) {
                  this.exportData[i].intime = this.formatDates(this.exportData[i].intime)
                }
                if (this.exportData[i].facecapturetime) {
                  this.exportData[i].facecapturetime = this.formatDates(this.exportData[i].facecapturetime)
                }
                if (this.exportData[i].outtime) {
                  this.exportData[i].outtime = this.formatDates(this.exportData[i].outtime)
                }
                if (this.exportData[i].alarmstate !== '' || this.exportData[i].alarmstate !== null) {
                  if (Number(this.exportData[i].alarmstate) === 0) {
                    this.exportData[i].alarmstate = '未处理'
                  } else if (Number(this.exportData[i].alarmstate) === 1) {
                    this.exportData[i].alarmstate = '误报'
                  } else if (Number(this.exportData[i].alarmstate) === 2) {
                    this.exportData[i].alarmstate = '已处理'
                  } else if (Number(this.exportData[i].alarmstate) === 3) {
                    this.exportData[i].alarmstate = '解除'
                  } else if (Number(this.exportData[i].alarmstate) === 4) {
                    this.exportData[i].alarmstate = '已受理'
                  }
                }
                if (this.exportData[i].inouttype) {
                  this.exportData[i].inouttype = this.exportData[i].inouttype === 0 ? '进' : '出'
                }
                if (this.exportData[i].devicetype) {
                  this.exportData[i].devicetype = this.changeTypes(this.exportData[i].devicetype.replace(/\s/ig, ''))
                }
                if (this.exportData[i].state) {
                  if (this.exportData[i].state === 1) {
                    this.exportData[i].state = '在线'
                  } else if (this.exportData[i].state === 0) {
                    this.exportData[i].state = '离线'
                  } else {
                    this.exportData[i].state = '故障'
                  }
                }
              }
              this.inexcel(this.exportData)
            } else {
              if (this.percentage < 100) {
                if (this.counts >= this.exportpage) {
                  this.percentage += parseFloat((100 / this.counts).toFixed(2))
                  if (!this.show) {
                    this.exportExcel()
                  }
                  if (this.show) {
                    this.percentage = 0
                  }
                }
              } else {
                this.percentage = 99
              }
            }
          }
        },
        error: () => {
          this.showcancel = false
          this.show = false
          this.reexport = true
          this.exportData = []
        }
      })
    },
    inexcel (data) {
      if (this.exportType === 'pass') {
        this.columns = [
          {
            label: '姓名',
            prop: 'peoplename'
          },
          {
            label: '性别',
            prop: 'gender'
          },
          {
            label: '手机号码',
            prop: 'phoneno'
          },
          {
            label: '标签',
            prop: 'peoplelabel'
          },
          {
            label: '小区名称',
            prop: 'villageid'
          },
          {
            label: '通行位置',
            prop: 'installadd'
          },
          {
            label: '开门方式',
            prop: 'opentype'
          },
          {
            label: '通行时间',
            prop: 'opentime'
          }]
      } else if (this.exportType === 'alarm') {
        this.columns = [
          {
            label: '报警名称',
            prop: 'alarmtypename'
          },
          {
            label: '报警时间',
            prop: 'alarmtime'
          },
          {
            label: '报警次数',
            prop: 'alarmcount'
          },
          {
            label: '报警等级',
            prop: 'alarmlevelname'
          },
          {
            label: '处理状态',
            prop: 'alarmstate'
          },
          {
            label: '报警地址',
            prop: 'address'
          },
          {
            label: '报警内容',
            prop: 'alarmcontent'
          }]
      } else if (this.exportType === 'device') {
        this.columns = [
          {
            label: '设备名称',
            prop: 'name'
          },
          {
            label: 'CODE',
            prop: 'code'
          },
          {
            label: '设备类型',
            prop: 'devicetype'
          },
          {
            label: '型号',
            prop: 'productmodel'
          },
          {
            label: 'MAC',
            prop: 'mac'
          },
          {
            label: '小区名称',
            prop: 'villageid'
          },
          {
            label: '安装位置',
            prop: 'installadd'
          },
          {
            label: '设备状态',
            prop: 'state'
          }]
      } else if (this.exportType === 'microCardFace') {
        this.columns = [
          {
            label: '名字',
            prop: 'peoplename'
          },
          {
            label: '时间',
            prop: 'facecapturetime'
          },
          {
            label: '进/出',
            prop: 'inouttype'
          }]
      } else if (this.exportType === 'microCardCar') {
        this.columns = [
          {
            label: '车牌号',
            prop: 'plateno'
          },
          {
            label: '所属小区',
            prop: 'villageid'
          },
          {
            label: '车辆类型',
            prop: 'cartype'
          },
          {
            label: '车辆所有人',
            prop: 'peoplename'
          },
          {
            label: '手机号码',
            prop: 'phoneno'
          },
          {
            label: '驶入时间',
            prop: 'intime'
          },
          {
            label: '驶出时间',
            prop: 'outtime'
          }]
      }
      this.$export.csv({
        columns: this.columns,
        data: data
      })
        .then(() => {
          this.percentage = 0
          this.exportData = []
          this.show = true
          window.pop.close(this.param.level)
          this.$message('导出表格成功')
        })
    },
    cancelExcel () {
      this.show = true
      this.exportData = []
      this.iscancel = true
      this.showcancel = false
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
    changeName (name) {
      let newname = ''
      for (let i = 0; i < this.carTypes.length; i++) {
        if (this.carTypes[i].name === name) {
          newname = this.carTypes[i].typeName
        }
      }
      return newname
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
        console.log(label, 'label')
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
    }
  }
}
</script>
<style>
  .el-progress-circle__track {
    background: red;
  }
</style>
<style scoped>
.progressClass {
  margin: .5rem auto;
  margin-left: 50%;
  transform: translate(-50%,0);
}
.checkBox {
  overflow: hidden;
  height: .6rem;
  text-align: center;
  margin-left: 50%;
  transform: translate(-50%,0);
}
.checkBox div {
  float: left;
}
.choosePage, .footPage{
  text-align: center;
  margin-top: .3rem;
  color: #02BFFE;
}
.choosePage input {
  width: 60px;
  height: 25px;
  background: none;
  border:1px solid #02BFFE;
  color: #02BFFE;
  text-align: center;
}
.export {
  width: 2rem;
  height: .8rem;
  margin-left: 50%;
  transform: translate(-50%,0);
  margin-top: .3rem;
  margin-bottom: .3rem;
}
.newexport {
  width: 4rem;
  height: .8rem;
  margin-left: 50%;
  transform: translate(-50%,0);
  margin-top: .3rem;
  margin-bottom: .3rem;
}
.exportClass {
  background: none;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: .7rem;
  cursor: pointer;
  color: #02BFFE;
}
.exportClassCancel {
  background: none;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: .7rem;
  cursor: pointer;
  color: #02BFFE;
}
.exportClassCancel:hover {
  background: rgba(142,22,22,0.55);
  color: #FF0000;
}
.exportClass:hover {
  background: rgba(16,57,108,1);
}
.btn-checkbox{position:absolute;display:none}
.btn-checkbox+label{position:relative;top:.1rem;padding-left: .8rem;display:flex;}
.btn-checkbox+label:after{position:absolute;top:.1rem;left:.45rem;display:none;width:.25rem;height:.1rem;content:'';border-bottom:.02rem solid #fff;border-left:.02rem solid #fff;box-sizing:border-box;transform:rotate(-46deg)}
.btn-checkbox+label:before{position:absolute;display:block;width:.3rem;height:.3rem;content:'';border:1px solid silver;top:.03rem;left: .4rem;border-radius:.03rem;background:#3e97eb;border:1px solid rgba(45, 245, 243, 0.5)}
.btn-checkbox:checked+label:after{display:block}
</style>
