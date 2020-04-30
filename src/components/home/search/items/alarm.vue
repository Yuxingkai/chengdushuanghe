<template>
  <div
    style="font-size:25px;color:#fff;box-sizing:border-box;padding:10px;height: 100%"
    id="search"
    ref="boxxxx">
    <div :class="scrollBar ? 'scrollClass' : ''">
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
        <div class="tupianbeij">报警地址:</div>
        <div class="input">
          <div class="lback"/>
          <div class="btandbm"><input
            class="setinput"
            type="text"
            v-model="alarmAddress"></div>
          <div class="rback"/>
        </div>
      </div>
      <div
        style="cursor: pointer;margin-top: .3rem"
        class="title">
        <div @click.stop="highSearch">时间条件</div>
        <div
          class="newarrowH"
          :class="highSearchShow ? 'transdownH' : 'transupH'"/>
      </div>
      <div v-if="highSearchShow">
        <div class="margTop">
          <div class="tupianbeij">开始时间:</div>
          <div class="input">
            <div class="lback"/>
            <div
              class="btandbm"
              style="position:relative;">
              <el-date-picker
                style="position: absolute;width: 100%;opacity:0;"
                v-model="startdateRange"
                type="datetime"
                @blur = "startblur"
                @focus = "startfocus"
                @change = "startformDate"/>
              <div
                class="seloptions"
                @click="showOption('time')">{{ startdateRange }}</div>
              <div
                class="newarrow"
                :class="startoptionShow2 ? 'transdown' : 'transup'"/>
            </div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">结束时间:</div>
          <div class="input">
            <div class="lback"/>
            <div
              class="btandbm"
              style="position:relative;">
              <el-date-picker
                style="position: absolute;width: 100%;opacity:0;"
                v-model="enddateRange"
                type="datetime"
                @blur = "endblur"
                @focus = "endfocus"
                @change = "endformDate"/>
              <div
                class="seloptions"
                @click="showOption('time')">{{ enddateRange }}</div>
              <div
                class="newarrow"
                :class="endoptionShow2 ? 'transdown' : 'transup'"/>
            </div>
            <div class="rback"/>
          </div>
        </div>
      </div>
      <div
        style="cursor: pointer;margin-top: .3rem"
        class="title">
        <div @click.stop="alarmSearch">报警条件</div>
        <div
          class="newarrowH"
          :class="alarmSearchShow ? 'transdownH' : 'transupH'"/>
      </div>
      <div v-if="alarmSearchShow">
        <div style="display: flex;align-items: center;margin-top: .3rem">
          <div class="tupianbeij">设备类型:</div>
          <div style="width: 100%">
            <mulselect
              @selserch="newserch"
              :items='optionsMengType'
              @chosenSelect="getserch"
              @changeSelect="isclick"
              :content="moreselect"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">报警类型:</div>
          <div class="input">
            <div class="lback"/>
            <div
              class="btandbm"
              style="position:relative;">
              <div
                class="seloptions"
                @click.stop="showOption('type')">
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
                :class="optionsTypeData.length > 8 ? 'dropdown' : 'dropdownless'"
                v-if="optionShow">
                <happy-scroll size="4">
                  <div
                    v-if="allData0"
                    class="options"
                    @click="selOne('全部')">全部</div>
                  <div
                    v-if="norelationData0"
                    class="options">没有相关标签</div>
                  <div
                    class="options"
                    v-for="(item,index) in optionsTypeData"
                    :key="index"
                    @click="selOne(item.typeName,item.name)">{{ item.typeName }}</div>
                </happy-scroll>
              </div>
            </div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">报警规则:</div>
          <div style="width: 100%">
            <mulselect
              @selserch="newserchMod"
              :items='modelData'
              @changeSelect="isclickMod"
              @chosenSelect="getserchMod"
              :content="alarmModelIDs"/>
          </div>
        </div>
        <!--<comSelect v-model="context1" label="报警规则" :data="exmData1" @listen="listen1"/>-->
        <comSelect
          v-model="context2"
          label="报警等级"
          :data="exmData2"
          @listen="listen2"/>
        <div class="margTop">
          <div class="tupianbeij">处理状态:</div>
          <div class="input">
            <div class="lback"/>
            <div
              class="btandbm"
              style="position:relative;">
              <div
                ref="optionshow1"
                class="seloptions"
                @click.stop="showOption('state')">
                <input
                  @keyup="searchVal1($event)"
                  class="canInput"
                  type="text"
                  v-model="text1">
              </div>
              <div
                class="newarrow"
                :class="optionShow1 ? 'transdown' : 'transup'"/>
              <div
                :class="optionsStateData.length > 8 ? 'dropdown' : 'dropdownless'"
                v-if="optionShow1">
                <happy-scroll size="4">
                  <div
                    v-if="allData1"
                    class="options"
                    @click="selOne('全部')">全部</div>
                  <div
                    v-if="norelationData1"
                    class="options">没有相关标签</div>
                  <div
                    class="options"
                    v-for="(item,index) in optionsStateData"
                    :key="index"
                    @click="selOne(item.typeName,item.name)">{{ item.typeName }}</div>
                </happy-scroll>
              </div>
            </div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">报警内容:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              class="setinput"
              type="text"
              v-model="alarmDetail"></div>
            <div class="rback"/>
          </div>
        </div>
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
import comSelect from '../dialog/comSelect'
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
      communityData: [],
      startdateRange: '',
      enddateRange: '',
      startoptionShow2: false,
      endoptionShow2: false,
      starttimeString: '',
      endtimeString: '',
      alarmAddress: '',
      optionsState: [
      ],
      optionsType: [
      ],
      optionsStateData: [],
      optionsTypeData: [],
      optionsMengType: [],
      optionShow: false,
      optionShow1: false,
      optionShow2: false,
      optionShow3: false,
      text: '全部',
      text1: '全部',
      text2: '全部',
      text3: '全部',
      time: '',
      which: '',
      deviceTypes: [],
      alarmTypes: [],
      alarmStates: [],
      startTime: '',
      endTime: '',
      listData: [],
      page: 1,
      moreselect: [],
      alarmDetail: '',
      pageSize: 1,
      allData0: true,
      allData1: true,
      norelationData0: false,
      norelationData1: false,
      highSearchShow: false,
      clientHeightChange: '',
      newclientHeightChange: '',
      context1: '全部',
      context2: '全部',
      exmData1: [],
      exmData2: [],
      scrollBar: false,
      alarmSearchShow: false,
      villageIDs: [],
      alarmModelIDs: [],
      alarmLevel: '',
      orders: [],
      modelData: []
    }
  },
  watch: {
    clientHeightChange (newval, oldval) {
      this.newclientHeightChange = newval
    }
  },
  mounted () {
    let that = this
    this.$bus.on('/window/onclick', (args) => {
      if ((args[0].srcElement !== that.$refs.optionshow1)) {
        that.optionShow1 = false
        that.optionShow = false
      }
    })
    if (this.$refs.boxxxx.clientHeight < 800) {
      this.scrollBar = true
    } else {
      this.scrollBar = false
    }
    this.clientHeightChange = this.$refs.boxxxx.clientHeight
    this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    this.search()
    this.optionsMengType = JSON.parse(localStorage.getItem('deviceType'))
    this.optionsType = JSON.parse(localStorage.getItem('alarmType'))
    this.optionsTypeData = JSON.parse(localStorage.getItem('alarmType'))
    this.optionsState = JSON.parse(localStorage.getItem('alarmState'))
    this.optionsStateData = JSON.parse(localStorage.getItem('alarmState'))
    this.exmData2 = JSON.parse(localStorage.getItem('alarmLevel'))
  },
  components: {
    mulselect,
    comSelect
  },
  created () {
    let alarmModels = JSON.parse(window.localStorage.getItem('alarmModels'))
    alarmModels.forEach((item) => {
      this.modelData.push({
        typeName: item.modelName,
        name: item.modelID
      })
    })
    this.$bus.on('orderSalarm', this.getOrders)
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
    this.$bus.once('refreshData/home/search/alarm', () => {
      this.search()
    })
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    getOrders (e) {
      this.orders = e.orders
      this.getLists()
    },
    newserchVi () {
      this.search()
    },
    startfocus () {
      this.startoptionShow2 = true
      if (this.startdateRange === '结束时间应大于开始时间' || this.startdateRange === '请选择当前时间之前') {
        this.startdateRange = ''
        this.starttimeString = ''
      }
    },
    endfocus () {
      this.endoptionShow2 = true
      if (this.enddateRange === '结束时间应大于开始时间' || this.enddateRange === '请选择当前时间之前') {
        this.enddateRange = ''
        this.endtimeString = ''
      }
    },
    startblur () {
      this.startoptionShow2 = false
      if (this.endtimeString !== '') {
        if (this.endtimeString < this.starttimeString) {
          this.startdateRange = '结束时间应大于开始时间'
        }
      }
    },
    endblur () {
      this.endoptionShow2 = false
      if (this.starttimeString !== '') {
        if (this.endtimeString < this.starttimeString) {
          this.enddateRange = '结束时间应大于开始时间'
        }
      }
    },
    startformDate () {
      this.startchangeDate()
    },
    endformDate () {
      this.endchangeDate()
    },
    startchangeDate () {
      let nowday = new Date()
      let sy = this.startdateRange.getFullYear()
      let sm = this.startdateRange.getMonth() + 1
      sm = sm < 10 ? '0' + sm : sm
      let sd = this.startdateRange.getDate()
      sd = sd < 10 ? ('0' + sd) : sd
      let sh = this.startdateRange.getHours()
      sh = sh < 10 ? '0' + sh : sh
      let smin = this.startdateRange.getMinutes()
      smin = smin < 10 ? '0' + smin : smin
      let ssec = this.startdateRange.getSeconds()
      ssec = ssec < 10 ? '0' + ssec : ssec
      if (this.startdateRange.getTime() > nowday.getTime()) {
        this.startdateRange = '请选择当前时间之前'
        return
      }
      this.starttimeString = this.startdateRange.getTime()
      this.startdateRange = sy + '/' + sm + '/' + sd + '/' + sh + ':' + smin + ':' + ssec
      this.startTime = sy + '-' + sm + '-' + sd + ' ' + sh + ':' + smin + ':' + ssec
    },
    endchangeDate () {
      let nowday = new Date()
      let ey = this.enddateRange.getFullYear()
      let em = this.enddateRange.getMonth() + 1
      em = em < 10 ? '0' + em : em
      let ed = this.enddateRange.getDate()
      ed = ed < 10 ? ('0' + ed) : ed
      let eh = this.enddateRange.getHours()
      eh = eh < 10 ? '0' + eh : eh
      let emin = this.enddateRange.getMinutes()
      emin = emin < 10 ? '0' + emin : emin
      let esec = this.enddateRange.getSeconds()
      esec = esec < 10 ? '0' + esec : esec
      // if (this.enddateRange.getTime() > nowday.getTime()) {
      //   this.enddateRange = '请选择当前时间之前'
      //   return
      // }
      this.endtimeString = this.enddateRange.getTime()
      this.enddateRange = ey + '/' + em + '/' + ed + '/' + eh + ':' + emin + ':' + esec
      this.endTime = ey + '-' + em + '-' + ed + ' ' + eh + ':' + emin + ':' + esec
    },
    highSearch () {
      this.highSearchShow = !this.highSearchShow
    },
    alarmSearch () {
      this.alarmSearchShow = !this.alarmSearchShow
    },
    searchVal1 (e) {
      this.optionsStateData = this.optionsState.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.optionsStateData.length === 0) {
        this.norelationData1 = true
        this.alarmStates = [0]
      } else {
        this.norelationData1 = false
        this.alarmStates = [this.optionsStateData[0].name]
      }
      if (this.optionsStateData.length === this.optionsState.length) {
        this.allData1 = true
      } else {
        this.allData1 = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.alarmStates = []
      }
    },
    searchVal (e) {
      this.optionsTypeData = this.optionsType.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.optionsTypeData.length === 0) {
        this.norelationData0 = true
        this.alarmTypes = [0]
      } else {
        this.norelationData0 = false
        this.alarmTypes = [this.optionsTypeData[0].name]
      }
      if (this.optionsTypeData.length === this.optionsType.length) {
        this.allData0 = true
      } else {
        this.allData0 = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.alarmTypes = []
      }
    },
    handleResize () {
      this.clientHeightChange = this.$refs.boxxxx.clientHeight
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
      if (this.$refs.boxxxx.clientHeight < 800) {
        this.scrollBar = true
      } else {
        this.scrollBar = false
      }
      if (this.newclientHeightChange === '') {
        return
      } else if (this.newclientHeightChange !== this.clientHeightChange) {
        this.search()
      } else {
        return
      }
    },
    newserch () {
      this.search()
    },
    newserchMod () {
      this.search()
    },
    isclick (bol) {
      this.optionShow = bol
      this.optionShow1 = bol
    },
    isclickVi (bol) {
      this.optionShow = bol
      this.optionShow1 = bol
    },
    isclickMod (bol) {
      this.optionShow = bol
      this.optionShow1 = bol
    },
    selOne (name, id) {
      if (this.optionShow) {
        if (name === '全部') {
          this.alarmTypes = []
        } else {
          this.alarmTypes = [id]
        }
        this.text = name
        this.optionShow = false
      }
      if (this.optionShow1) {
        if (name === '全部') {
          this.alarmStates = []
        } else {
          this.alarmStates = [id]
        }
        this.text1 = name
        this.optionShow1 = false
      }
      if (this.optionShow3) {
        if (name === '全部') {
          this.deviceTypes = []
        } else {
          this.deviceTypes = [id]
        }
        this.text3 = name
        this.optionShow3 = false
      }
    },
    showOption (which) {
      if (which === 'type') {
        this.optionShow = !this.optionShow
        this.optionShow1 = false
        this.optionShow2 = false
      } else if (which === 'state') {
        this.optionShow1 = !this.optionShow1
        this.optionShow = false
        this.optionShow2 = false
      } else if (which === 'mengType') {
        this.optionShow3 = !this.optionShow3
        this.optionShow = false
        this.optionShow2 = false
        this.optionShow1 = false
      } else {
        this.optionShow2 = !this.optionShow2
        this.optionShow1 = false
        this.optionShow = false
      }
    },
    getserch (msg) {
      this.moreselect = msg
    },
    getserchVi (msg) {
      this.villageIDs = msg
    },
    getserchMod (msg) {
      this.alarmModelIDs = msg
      // this.alarmModelIDs = []
      // msg.forEach(item => {
      //   this.alarmModelIDs.push(item.name)
      // })
    },
    reset () {
      this.villageIDs = []
      this.endtimeString = ''
      this.starttimeString = ''
      this.startdateRange = ''
      this.enddateRange = ''
      this.startTime = ''
      this.endTime = ''
      this.alarmModelIDs = []
      this.norelationData0 = false
      this.norelationData1 = false
      this.allData = true
      this.text = ''
      this.text1 = ''
      this.text2 = ''
      this.text3 = ''
      this.dateRange = ''
      this.deviceTypes = []
      this.alarmTypes = []
      this.alarmStates = []
      this.startTime = []
      this.endTime = []
      this.moreselect = []
      this.alarmReason = ''
      this.optionsTypeData = JSON.parse(localStorage.getItem('alarmType'))
      this.optionsStateData = JSON.parse(localStorage.getItem('alarmState'))
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
      if(this.moreselect.length>0){
        moreselect = this.moreselect.map((item) => {
          return item.name
        })
      }
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
      reqParam.functionCode = 'yujin'
      if (this.dateRange === '') {
        this.startTime = []
        this.endTime = []
      }
      reqParam.condition = {}
      reqParam.condition.villageIDs = villageIDs
      reqParam.condition.alarmAddress = this.alarmAddress
      reqParam.condition.startTime = this.startTime
      reqParam.condition.endTime = this.endTime
      reqParam.condition.deviceTypes = moreselect
      reqParam.condition.alarmTypes = this.alarmTypes
      reqParam.condition.alarmModelIDs = this.alarmModelIDs
      reqParam.condition.alarmLevel = this.alarmLevel
      reqParam.condition.alarmStates = this.alarmStates
      reqParam.condition.alarmDetail = this.alarmDetail
      reqParam.orders = this.orders
      reqParam.pageNum = this.page
      reqParam.pageSize = this.pageSize
      this.$bus.emit('serchCondition', {
        alarmTypes: this.alarmTypes,
        villageIDs: villageIDs,
        alarmLevel: this.alarmLevel,
        alarmModelIDs: this.alarmModelIDs,
        alarmAddress: this.alarmAddress,
        alarmStates: this.alarmStates,
        deviceTypes: moreselect,
        startTime: this.startTime,
        endTime: this.endTime,
        orders: this.orders,
        alarmDetail: this.alarmDetail
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
          that.$bus.emit('getallLists', {
            type: 'alarm',
            results: that.listData,
            total: data.total,
          })
          that.$bus.emit('/map/locate/searchResult',data.data)
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    listen1 (data) {
      // $$ 获取alarmModelIDs
    },
    listen2 (data) {
      this.context2 = data.typeName
      this.alarmLevel = data.name
      // $$ 获取alarmLevel
    }
  }
}
</script>
<style scoped>
  ::-webkit-scrollbar{width:0px;background-color: transparent}
  .scrollClass {
    height: 13.6rem;
    overflow: scroll;
  }
</style>
