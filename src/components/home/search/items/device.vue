<template>
  <div
    @click="hideul"
    style="font-size:25px;color:#fff;box-sizing:border-box;padding:10px;height: 100%"
    id="search"
    ref="boxxxx">
    <div class="allsel">
      <div
        class="title">
        <div>空间条件</div>
      </div>
      <div style="display: flex;align-items: center;margin-top: .3rem">
        <div class="tupianbeij">所属小区:</div>
        <div style="width: 100%">
          <mulselect
            @selserch="newserchVi"
            :items='communityData'
            @changeSelect="isclickVi"
            @chosenSelect="getserchVi"
            :content="villageIDs"/>
        </div>
      </div>
      <div class="margTop">
        <div class="tupianbeij">安装位置:</div>
        <div class="input">
          <div class="lback"/>
          <div class="btandbm"><input
            class="setinput"
            type="text"
            v-model="installAdd"></div>
          <div class="rback"/>
        </div>
      </div>
      <div
        style="cursor: pointer;margin-top: .3rem"
        class="title">
        <div @click.stop="highSearch">设备条件</div>
        <div
          class="newarrowH"
          :class="highSearchShow ? 'transdownH' : 'transupH'"/>
      </div>
      <div v-if="highSearchShow">
        <div class="margTop">
          <div class="tupianbeij">设备类型:</div>
          <div style="width: 100%">
            <mulselect
              @selserch="newserch"
              :items='optionsItemType'
              @chosenSelect="getserch"
              @changeSelect="isclick"
              :content="moreselect"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">设备状态:</div>
          <div class="input">
            <div class="lback"/>
            <div
              class="btandbm"
              style="position:relative;">
              <div
                class="seloptions"
                @click.stop="showOption('state')">
                <input
                  @keyup="searchVal($event)"
                  class="canInput"
                  type="text"
                  v-model="text">
              </div>
              <div
                class="newarrow"
                :class="optionShow ? 'transdown' : 'transup'"/>
              <div
                :class="optionsStatesData.length > 8 ? 'dropdown' : 'dropdownless'"
                v-if="optionShow">
                <happy-scroll size="4">
                  <div
                    v-if="allData"
                    class="options"
                    @click="selOne('全部')">全部</div>
                  <div
                    v-if="norelationData"
                    class="options">没有相关标签</div>
                  <div
                    class="options"
                    v-for="(item,index) in optionsStatesData"
                    :key="index"
                    @click="selOne(item.typeName,item.name)">{{ item.typeName }}</div>
                </happy-scroll>
              </div>
            </div>
            <div class="rback"/>
          </div>
        </div>
        <div style="display: flex;align-items: center;margin-top: .3rem">
          <div class="tupianbeij">设备名称:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              class="setinput"
              type="text"
              v-model="deviceName"></div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">设备编号:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              class="setinput"
              type="text"
              v-model="deviceCode"></div>
            <div class="rback"/>
          </div>
        </div>
        <!--<div class="margTop">-->
        <!--<div class="tupianbeij">楼栋号:</div>-->
        <!--<div class="input">-->
        <!--<div class="lback"/>-->
        <!--<div class="btandbm"><input-->
        <!--class="setinput"-->
        <!--type="text"-->
        <!--v-model="build"></div>-->
        <!--<div class="rback"/>-->
        <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div style="position:absolute;bottom: 10px;width: 98%;">
      <Box3
        style="float: left;width: 47%"
        css="padding:.03rem 0;box-sizing:border-box;float:left;height:40px;text-align:center;line-height:30px;top:0;">
        <button
          @click="search"
          class="serchBtn">搜索</button>
      </Box3>
      <Box3
        style="float: right;width: 47%;"
        css="padding:.03rem 0;box-sizing:border-box;float:right;margin-right:2%;height:40px;text-align:center;line-height:30px;right:10px;">
        <button
          @click="reset"
          class="resetBtn">重置</button>
      </Box3>
    </div>
  </div>
</template>
<script>
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post} from '../../../../Utils/Http'
import mulselect from '../../public/multipleSelect'
/* eslint-disable */
Array.prototype.contains = function (obj) {
  var i = this.length
  while (i--) {
    if (this[i] === obj) {
      return true
    }
  }
  return false
}
export default {
  data () {
    return {
      villageIDs: [],
      communityData: [],
      options: [
      ],
      optionsStates: [],
      optionsTypes: [],
      optionShow: false,
      optionShow1: false,
      optionShow2: false,
      deviceStates: '',
      text2: '全部',
      text: '全部',
      which: '',
      dateRange: '',
      startTime: '',
      endTime: '',
      itemName: '',
      build: '',
      deviceType: '',
      moreselect: [],
      optionsItemType: [],
      page: 1,
      deviceCode: '',
      deviceName: '',
      pageSize: 1,
      showMeaagae: '',
      optionsStatesData: [],
      allData: true,
      norelationData: false,
      highSearchShow: false,
      clientHeightChange: '',
      newclientHeightChange: '',
      installAdd: '',
      orders: []
    }
  },
  mounted () {
    this.clientHeightChange = this.$refs.boxxxx.clientHeight
    this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    this.search()
    this.optionsItemType = JSON.parse(localStorage.getItem('deviceType'))
    this.optionsStates = JSON.parse(localStorage.getItem('deviceState'))
    this.optionsStatesData = JSON.parse(localStorage.getItem('deviceState'))
  },
  components: {
    mulselect
  },
  watch: {
    clientHeightChange (newval, oldval) {
      this.newclientHeightChange = newval
    }
  },
  created () {
    this.$bus.on('orderSdevice', this.getOrders)
    let datas = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
    datas.forEach((item) => {
      this.communityData.push({
        typeName: item.villageName,
        name: item.villageID
      })
    })
    document.onkeydown = (e) => {
      if (!e) e = window.event
      if ((e.keyCode === 13)) {
        this.search()
      }
    }
    this.$bus.once('refreshData/home/search/device', () => {
      this.search()
    })
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('click', this.otherClick)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('click', this.otherClick)
  },
  methods: {
    getOrders (e) {
      this.orders = e.orders
      this.getLists()
    },
    newserchVi () {
      this.search()
    },
    highSearch () {
      this.highSearchShow = !this.highSearchShow
    },
    otherClick () {
      if (this.optionShow) {
        this.optionShow = false
      }
    },
    searchVal (e) {
      this.optionsStatesData = this.optionsStates.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.optionsStatesData.length === 0) {
        this.norelationData = true
        this.deviceStates = [0]
      } else {
        this.norelationData = false
        this.deviceStates = this.optionsStatesData[0].name
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.deviceStates = ''
      }
      if (this.optionsStatesData.length === this.optionsStates.length) {
        this.allData = true
      } else {
        this.allData = false
      }
    },
    handleResize () {
      this.clientHeightChange = this.$refs.boxxxx.clientHeight
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
      if (this.newclientHeightChange === '') {
        return
      } else if (this.newclientHeightChange !==this.clientHeightChange) {
        this.search()
      } else {
        return
      }
    },
    newserch () {
      this.search()
    },
    isclick (bol) {
      this.optionShow = bol
      this.optionShow2 = bol
    },
    isclickVi (bol) {
      this.optionShow = bol
      this.optionShow2 = bol
    },
    getserchVi (msg) {
      this.villageIDs = msg
    },
    hideul () {
      this.optionShow = false
      this.optionShow2 = false
    },
    getserch (msg) {
      this.moreselect = msg
    },
    focus () {
      this.optionShow1 = true
    },
    blur () {
      this.optionShow1 = false
    },
    formDate () {
      this.changeDate()
    },
    changeDate () {
      let nowday = new Date()
      let sy = this.dateRange[0].getFullYear()
      let sm = this.dateRange[0].getMonth() + 1
      sm = sm < 10 ? '0' + sm : sm
      let sd = this.dateRange[0].getDate()
      sd = sd < 10 ? ('0' + sd) : sd
      let sh = this.dateRange[0].getHours()
      sh = sh < 10 ? '0' + sh : sh
      let smin = this.dateRange[0].getMinutes()
      smin = smin < 10 ? '0' + smin : smin
      let ssec = this.dateRange[0].getSeconds()
      ssec = ssec < 10 ? '0' + ssec : ssec
      if (this.dateRange[0].getTime() > nowday.getTime()) {
        this.dateRange = '请选择当前时间之前'
        return
      }
      let ey = this.dateRange[1].getFullYear()
      let em = this.dateRange[1].getMonth() + 1
      em = em < 10 ? '0' + em : em
      let ed = this.dateRange[1].getDate()
      ed = ed < 10 ? ('0' + ed) : ed
      let eh = this.dateRange[1].getHours()
      eh = eh < 10 ? '0' + eh : eh
      let emin = this.dateRange[1].getMinutes()
      emin = emin < 10 ? '0' + emin : emin
      let esec = this.dateRange[1].getSeconds()
      esec = esec < 10 ? '0' + esec : esec
      this.dateRange = sy + '/' + sm + '/' + sd + '/' + sh + ':' + smin + ':' + ssec + '至' + ey + '/' + em + '/' + ed + '/' + eh + ':' + emin + ':' + esec
      this.startTime = sy + '-' + sm + '-' + sd + ' ' + sh + ':' + smin + ':' + ssec
      this.endTime = ey + '-' + em + '-' + ed + ' ' + eh + ':' + emin + ':' + esec
    },
    selOne (name, id) {
      if (this.optionShow) {
        this.text = name
        this.deviceStates = id
        this.optionShow = false
      }
      if (this.optionShow1) {
        this.text1 = name
        this.optionShow1 = false
      }
      if (this.optionShow2) {
        this.text2 = name
        this.optionShow2 = false
      }
    },
    showOption (which) {
      if (which === 'state') {
        this.optionShow = !this.optionShow
        this.optionShow1 = false
        this.optionShow2 = false
      } else if (which === 'time') {
        this.optionShow1 = !this.optionShow1
        this.optionShow = false
        this.optionShow2 = false
      } else {
        this.optionShow2 = !this.optionShow2
        this.optionShow1 = false
        this.optionShow = false
      }
    },
    reset () {
      this.norelationData = false
      this.allData = true
      this.dateRange = ''
      this.itemName = ''
      this.build = ''
      this.deviceType = ''
      this.deviceStates = ''
      this.text2 = ''
      this.text = ''
      this.moreselect = []
      this.villageIDs = []
      this.deviceName = ''
      this.deviceCode = ''
      this.$bus.emit('listShow', false)
      this.$bus.emit('listHide', false)
      this.$bus.emit('/map/locate/clearResult')
    },
    search: function () {
      this.getLists()
      this.$bus.emit('listShow', true)
      this.$bus.emit('listHide', false)
    },
    getLists () {
      this.$bus.emit('clearDatas', {
        type: 'pass',
        results: [],
        dtNameText: '正在读取数据'
      })
      let moreselect = []
      moreselect = this.moreselect.map((item) => {
        return item.name
      })
      let villageIDs = []
      if (this.villageIDs.length === 0) {
        villageIDs = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos.map((item) => {
          return item.villageID
        })
      } else {
        villageIDs = this.villageIDs.map((item) => {
          return item.name
        })
      }
      let reqParam = user.getRequestHeader()
      reqParam.functionCode = 'shebei'
      reqParam.condition = {}
      reqParam.condition.villageIDs = villageIDs
      reqParam.condition.installAdd = this.installAdd
      reqParam.condition.deviceTypes = moreselect
      reqParam.condition.deviceStates = [this.deviceStates]
      reqParam.condition.deviceName = this.deviceName
      reqParam.condition.deviceCode = this.deviceCode
      reqParam.orders = this.orders
      // reqParam.condition.buildingNos = [this.build]
      // reqParam.condition.deviceModel = this.deviceType
      // reqParam.condition.startTime = this.startTime
      // reqParam.condition.endTime = this.endTime
      reqParam.pageNum = this.page
      reqParam.pageSize = this.pageSize
      this.$bus.emit('serchCondition', {
        villageIDs: villageIDs,
        installAdd: this.installAdd,
        deviceTypes: moreselect,
        deviceStates: [this.deviceStates],
        deviceCode: this.deviceCode,
        deviceName: this.deviceName
      })
      let that = this
      Post({
        async: true,
        url: apiNames['获取预警查询'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.data === undefined) {
            that.listData = []
          } else {
            that.listData = data.data
          }
          that.$bus.emit('/map/locate/searchResult',data.data)
          that.$bus.emit('getallLists', {
            type: 'device',
            results: that.listData,
            total: data.total
          })
        },
        error: (err) => {
          conole.log(err)
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
