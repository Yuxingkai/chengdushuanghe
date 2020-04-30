<template>
  <div
    style="color: white;box-sizing:border-box;padding:10px;height: 100%"
    id="search"
    ref="boxxxx">
    <div
      class="title">
      <div>空间条件</div>
    </div>
    <!--<div @click="popop" style="position: absolute;left: 0;top: 0;">点击</div>-->
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
      <div class="tupianbeij">通行位置:</div>
      <div class="input">
        <div class="lback"/>
        <div
          class="btandbm"
          style="position:relative;">
          <div
            class="seloptions"
            @click.stop="showOption('microaddress')">
            <input
              @keyup="searchVal($event)"
              class="canInput"
              type="text"
              v-model="address">
          </div>
          <div
            class="newarrow"
            :class="optionShow1 ? 'transdown' : 'transup'"/>
          <div
            :class="addressesData.length > 8 ? 'dropdown' : 'dropdownless'"
            v-if="optionShow1">
            <happy-scroll size="4">
              <div
                v-if="allData0"
                class="options"
                @click="selOne('','全部')">全部</div>
              <div
                v-if="norelationData0"
                class="options">没有相关标签</div>
              <div
                class="options"
                v-for="(item,index) in addressesData"
                :key="index"
                @click="selOne(item.ioID,item.name)">{{ item.name }}</div>
            </happy-scroll>
          </div>
        </div>
        <div class="rback"/>
      </div>
    </div>
    <!--<div-->
    <!--class="margTop">-->
    <comSelect
      v-model="context2"
      label="进/出"
      :data="exmData2"
      @listen="listen2"/>
    <!--</div>-->
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
        <div class="tupianbeij">驶入时间:</div>
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
        <div class="tupianbeij">驶出时间:</div>
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
      <div @click.stop="carhighSearch">车辆条件</div>
      <div
        class="newarrowH"
        :class="carhighSearchShow ? 'transdownH' : 'transupH'"/>
    </div>
    <div v-if="carhighSearchShow">
      <div class="margTop">
        <div class="tupianbeij">车辆类型:</div>
        <div class="input">
          <div class="lback"/>
          <div
            class="btandbm"
            style="position:relative;">
            <div
              class="seloptions"
              @click.stop="showOption('cartype')">
              <input
                @keyup="searchVal1($event)"
                class="canInput"
                type="text"
                v-model="typename">
            </div>
            <div
              class="newarrow"
              :class="optionShow2 ? 'transdown' : 'transup'"/>
            <div
              :class="cartypesData.length > 8 ? 'dropdown' : 'dropdownless'"
              v-if="optionShow2">
              <happy-scroll size="4">
                <div
                  v-if="allData1"
                  class="options"
                  @click="selOne('','全部')">全部</div>
                <div
                  v-if="norelationData1"
                  class="options">没有相关标签</div>
                <div
                  class="options"
                  v-for="(item,index) in cartypesData"
                  :key="index"
                  @click="selOne(item.name,item.typeName)">{{ item.typeName }}</div>
              </happy-scroll>
            </div>
          </div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="tupianbeij">车牌号:</div>
        <div class="input">
          <div class="lback"/>
          <div class="btandbm"><input
            class="setinput"
            type="text"
            v-model="plate"></div>
          <div class="rback"/>
        </div>
      </div>
      <!--<div class="margTop">-->
      <!--<div class="tupianbeij">车辆所有人:</div>-->
      <!--<div class="input">-->
      <!--<div class="lback"/>-->
      <!--<div class="btandbm"><input-->
      <!--class="setinput"-->
      <!--type="text"-->
      <!--v-model="carowner"></div>-->
      <!--<div class="rback"/>-->
      <!--</div>-->
      <!--</div>-->
      <div class="margTop">
        <div class="tupianbeij">车主手机号:</div>
        <div class="input">
          <div class="lback"/>
          <div class="btandbm"><input
            placeholder="最少输入4位"
            class="setinput"
            type="text"
            v-model="telnum"></div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="tupianbeij">车主证件号:</div>
        <div class="input">
          <div class="lback"/>
          <div class="btandbm"><input
            placeholder="最少输入4位"
            class="setinput"
            type="text"
            v-model="credentialNo"></div>
          <div class="rback"/>
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
import mulselect from '../../public/multipleSelect'
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post} from '../../../../Utils/Http'
export default {
  name: 'MicroCardCar',
  data () {
    return {
      credentialNo: '',
      context2: '全部',
      inOutType: '',
      exmData2: [{name: '0', typeName: '进'}, {name: '1', typeName: '出'}],
      startdateRange: '',
      enddateRange: '',
      startoptionShow2: false,
      endoptionShow2: false,
      starttimeString: '',
      endtimeString: '',
      name: '',
      address: '全部',
      typename: '全部',
      plate: '',
      carowner: '',
      telnum: '',
      dateRange: '',
      optionShow: false,
      optionShow1: false,
      optionShow2: false,
      optionShow3: false,
      villages: [
      ],
      addresses: [
      ],
      cartypes: [
      ],
      ioID: '',
      carType: '',
      startTime: '',
      endTime: '',
      page: 1,
      pageSize: 11,
      showMeaagae: '',
      addressesData: [],
      cartypesData: [],
      allData0: true,
      allData1: true,
      norelationData0: false,
      norelationData1: false,
      highSearchShow: false,
      clientHeightChange: '',
      newclientHeightChange: '',
      carhighSearchShow: false,
      orders: [],
      communityData: [],
      villageIDs: []
    }
  },
  components: {
    mulselect,
    comSelect
  },
  methods: {
    // popop () {
    //   window.pop.show({
    //     level: 2,
    //     component: () => import('../dialog/microCar'),
    //     param: {
    //       level: 2,
    //       e: ''
    //     }
    //   })
    // },
    isclickVi (bol) {
      this.optionShow = bol
      this.optionShow2 = bol
      this.optionShow3 = bol
      this.optionShow1 = bol
    },
    getserchVi (msg) {
      this.villageIDs = msg
      this.addresses = []
      if (this.villageIDs.length === 0) {
        this.addresses = []
        this.addressesData = []
        this.address = ''
        this.ioID = ''
      } else {
        this.addresses = JSON.parse(localStorage.getItem('inoutList')).filter(item => {
          return item.type === 2
        })
        let addresses = []
        for (let i = 0; i < this.villageIDs.length; i++) {
          for (let j = 0; j < this.addresses.length; j++) {
            if (this.addresses[j].villageID === this.villageIDs[i].name) {
              addresses.push(this.addresses[j])
            }
          }
        }
        this.addresses = addresses.filter((item) => { return item.type === 2 })
        this.addressesData = addresses.filter((item) => { return item.type === 2 })
      }
    },
    newserchVi () {
      this.search()
    },
    getOrderscarIn (e) {
      this.orders = e.orders
      this.getLists()
    },
    getOrderscarOut (e) {
      this.orders = e.orders
      this.getLists()
    },
    getOrderscarStay (e) {
      this.orders = e.orders
      this.getLists()
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
      this.endtimeString = this.enddateRange.getTime()
      this.enddateRange = ey + '/' + em + '/' + ed + '/' + eh + ':' + emin + ':' + esec
      this.endTime = ey + '-' + em + '-' + ed + ' ' + eh + ':' + emin + ':' + esec
    },
    highSearch () {
      this.highSearchShow = !this.highSearchShow
    },
    carhighSearch () {
      this.carhighSearchShow = !this.carhighSearchShow
    },
    searchVal1 (e) {
      this.cartypesData = this.cartypes.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.cartypesData.length === 0) {
        this.norelationData1 = true
        this.carType = '-3'
      } else {
        this.norelationData1 = false
        this.carType = this.cartypesData[0].name
      }
      if (this.cartypesData.length === this.cartypes.length) {
        this.allData1 = true
      } else {
        this.allData1 = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.carType = ''
      }
    },
    searchVal (e) {
      this.addressesData = this.addresses.filter((item) => {
        return item.name.indexOf(e.currentTarget.value) !== -1
      })
      if (this.addressesData.length === 0) {
        this.norelationData0 = true
        this.ioID = '-1'
      } else {
        this.norelationData0 = false
        this.ioID = this.addressesData[0].ioID
      }
      if (this.addressesData.length === this.addresses.length) {
        this.allData0 = true
      } else {
        this.allData0 = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.ioID = ''
      }
    },
    handleResize () {
      this.clientHeightChange = this.$refs.boxxxx.clientHeight
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 50) + 1
      if (this.newclientHeightChange === '') {
        return false
      } else if (this.newclientHeightChange !== this.clientHeightChange) {
        this.search()
      } else {
        return false
      }
    },
    listen2 (data) {
      this.context2 = data.typeName
      this.inOutType = data.typeName
    },
    getLists () {
      if (!this.chinese(this.carowner)) {
        this.$message('请输入中文')
        return
      }
      if (!this.computNum(this.telnum)) {
        this.$message('请输入至少4位数字不含空格')
        return
      }
      this.$bus.emit('clearDatas', {
        type: 'pass',
        results: [],
        dtNameText: '正在读取数据'
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
      reqParam.functionCode = 'wkcar'
      reqParam.condition = {}
      reqParam.condition.villageIDs = villageIDs
      reqParam.condition.ioID = this.ioID
      reqParam.condition.inOutType = this.inOutType
      reqParam.condition.startTime = this.startTime
      reqParam.condition.endTime = this.endTime
      reqParam.condition.carType = this.carType
      reqParam.condition.plateNo = this.plate
      reqParam.condition.phone = this.telnum
      reqParam.condition.credentialNo = this.credentialNo
      reqParam.orders = this.orders
      reqParam.pageNum = this.page
      reqParam.pageSize = this.pageSize
      this.$bus.emit('serchCondition', {
        villageIDs: villageIDs,
        ioID: this.ioID,
        inOutType: this.inOutType,
        carType: this.carType,
        plateNo: this.plate,
        phone: this.telnum,
        credentialNo: this.credentialNo,
        startTime: this.startTime,
        endTime: this.endTime,
        orders: this.orders
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
            type: 'microCardCar',
            results: that.listData,
            total: data.total
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    showOption (type) {
      if (type === 'village') {
        this.optionShow = !this.optionShow
        this.optionShow1 = false
        this.optionShow2 = false
      } else if (type === 'microaddress') {
        if (this.addressesData.length === 0 && this.villageIDs.length === 0) {
          this.$message('请选择小区')
        } else {
          this.optionShow1 = !this.optionShow1
          this.optionShow = false
          this.optionShow2 = false
        }
      } else if (type === 'cartype') {
        this.optionShow2 = !this.optionShow2
        this.optionShow1 = false
        this.optionShow = false
      }
    },
    selOne (id, name) {
      if (this.optionShow) {
        this.name = name
        this.optionShow = false
      }
      if (this.optionShow1) {
        this.address = name
        this.optionShow1 = false
        this.ioID = id
      }
      if (this.optionShow2) {
        this.typename = name
        this.optionShow2 = false
        this.carType = id
      }
    },
    focus () {
      this.optionShow3 = true
    },
    blur () {
      this.optionShow3 = false
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
    search () {
      this.getLists()
    },
    reset () {
      this.endtimeString = ''
      this.starttimeString = ''
      this.startdateRange = ''
      this.enddateRange = ''
      this.startTime = ''
      this.endTime = ''
      this.norelationData0 = false
      this.norelationData1 = false
      this.allData = true
      this.address = ''
      this.typename = ''
      this.plate = ''
      this.carowner = ''
      this.telnum = ''
      this.carType = ''
      this.dateRange = ''
      this.startTime = ''
      this.endTime = ''
      this.ioID = ''
      this.villageIDs = []
      this.addressesData = this.addresses.filter((item) => { return item.type === 0 })
      this.cartypesData = JSON.parse(localStorage.getItem('parkingCar'))
    },
    otherClick () {
      if (this.optionShow) {
        this.optionShow = false
      }
      if (this.optionShow1) {
        this.optionShow1 = false
      }
      if (this.optionShow2) {
        this.optionShow2 = false
      }
      if (this.optionShow3) {
        this.optionShow3 = false
      }
    }
  },
  mounted () {
    this.name = JSON.parse(window.localStorage.getItem('currentVillageID')).villageName
    this.clientHeightChange = this.$refs.boxxxx.clientHeight
    this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 50) + 1
    this.search()
    this.cartypes = JSON.parse(localStorage.getItem('parkingCar'))
    this.cartypesData = JSON.parse(localStorage.getItem('parkingCar'))
  },
  watch: {
    clientHeightChange (newval, oldval) {
      this.newclientHeightChange = newval
    }
  },
  created () {
    this.$bus.on('orderScarIn', this.getOrderscarIn)
    this.$bus.on('orderScarOut', this.getOrderscarOut)
    this.$bus.on('orderScarStay', this.getOrderscarStay)
    let datas = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
    datas.forEach((item) => {
      this.communityData.push({
        typeName: item.villageName,
        name: item.villageID
      })
    })
    this.$bus.once('refreshData/home/search/microCardCar', () => {
      this.search()
    })
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('click', this.otherClick)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  destroyed () {
    document.removeEventListener('click', this.otherClick)
  }
}
</script>

<style>
  .el-date-editor .el-range__icon {
    display: none !important;
  }
  .el-date-editor .el-range__close-icon {
    display: none !important;
  }
</style>
