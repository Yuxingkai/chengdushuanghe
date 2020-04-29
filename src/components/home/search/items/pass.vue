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
      <div style="display: flex;align-items: center">
        <!--<comSelect v-model="context1" label="所属小区" :data="communityData" @listen="listen2"/>-->
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
        <div class="tupianbeij">通行楼栋:</div>
        <div
          style="width: 100%"
          @click="decideData">
          <mulselect
            @selserch="newserchBu"
            :items='buData'
            @changeSelect="isclickBu"
            @chosenSelect="getserchBu"
            :content="buildingNos"/>
        </div>
        <!--<div class="input">-->
        <!--<div class="lback"/>-->
        <!--<div class="btandbm"><input-->
        <!--class="setinput"-->
        <!--type="text"-->
        <!--v-model="build"></div>-->
        <!--<div class="rback"/>-->
        <!--</div>-->
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
        <div @click.stop="peopleSearch">人员条件</div>
        <div
          class="newarrowH"
          :class="peopleSearchShow ? 'transdownH' : 'transupH'"/>
      </div>
      <div v-if="peopleSearchShow">
        <div class="margTop">
          <div class="tupianbeij">开门方式:</div>
          <div class="input">
            <div class="lback"/>
            <div
              style="position:relative;"
              class="btandbm">
              <div
                ref="optionshow"
                class="seloptions setinput"
                @click="showOption">
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
                :class="optionTypesData.length > 8 ? 'dropdownest' : 'dropdownlessest'"
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
                    v-for="(item,index) in optionTypesData"
                    :key="index"
                    @click="selOne(item.typeName,item.name)">{{ item.typeName }}</div>
                </happy-scroll>
              </div>
            </div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">门禁卡号:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              placeholder="最少输入4位"
              class="setinput"
              type="text"
              v-model="cardNum"></div>
            <div class="rback"/>
          </div>
        </div>
        <div style="display: flex;align-items: center;margin-top: .3rem">
          <div class="tupianbeij">人员姓名:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              class="setinput"
              type="text"
              v-model="name"></div>
            <div class="rback"/>
          </div>
        </div>
        <comSelect
          v-model="context"
          label="人员性别"
          :data="exmData"
          @listen="listen1"/>
        <div class="margTop">
          <div class="tupianbeij">手机号码:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              placeholder="最少输入4位"
              class="setinput"
              type="text"
              v-model="phone"></div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">证件号码:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              placeholder="最少输入4位"
              class="setinput"
              type="text"
              v-model="card"></div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">人员标签:</div>
          <div style="width: 100%">
            <mulselect
              @selserch="newserch"
              :items='options'
              @changeSelect="isclick"
              @chosenSelect="getserch"
              :content="moreselect"/>
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
  name: 'PassIndex',
  data () {
    return {
      buData: [],
      buildingNos: [],
      context1: '全部',
      communityData: [],
      exmData: [{typeName: '男',name: 'nan'},{typeName: '女',name: 'nv'}],
      startdateRange: '',
      enddateRange: '',
      startoptionShow2: false,
      endoptionShow2: false,
      starttimeString: '',
      endtimeString: '',
      peopleSearchShow: false,
      flag: true,
      options: [
        {name: 'qw'},
        {name: 'ee'},
        {name: 'bv'}
      ],
      optionShow: false,
      text: '全部',
      which: '',
      name: '',
      phone: '',
      card: '',
      passItem: '',
      build: '',
      cardNum: '',
      open: '',
      page: 1,
      startTime: '',
      endTime: '',
      moreselect: [],
      optionTypes: [],
      optionTypesData: [],
      pageSize: 1,
      showMeaagae: '',
      allData: true,
      norelationData: false,
      highSearchShow: false,
      clientHeightChange: '',
      newclientHeightChange: '',
      listData: [],
      scrollBar: false,
      selectedName: '',
      context: '全部',
      gender: '',
      villageIDs: [],
      orders: [],
      buildNum: []
      // openTypeImgs:[
      //   {img:require('../../../../assets/passImg/'),opentype: ''},
      //   {img:require(''),opentype: ''}
      // ]
    }
  },
  components: {
    mulselect,
    comSelect
  },
  created () {
    this.$bus.on('orderSs', this.getOrders)
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
    this.$bus.once('refreshData/home/search/pass', () => {
      this.search()
    })
    window.addEventListener('resize', this.handleResize)
  },
  mounted () {
    // let that = this
    // this.$bus.on('/window/onclick', (args) => {
    //   if ((args[0].srcElement !== that.$refs.optionshow)) {
    //     that.optionShow = false
    //   }
    // })
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.optionShow = false
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
    this.options = JSON.parse(localStorage.getItem('peopleTag'))
    this.optionTypes = JSON.parse(localStorage.getItem('openType'))
    this.optionTypesData = JSON.parse(localStorage.getItem('openType'))
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    clientHeightChange (newval, oldval) {
      this.newclientHeightChange = newval
    }
  },
  methods: {
    decideData () {
      if (this.buData.length === 0 && this.villageIDs.length === 0) {
        this.$message('请选择小区')
      } else {
        // **
      }
    },
    getOrders (e) {
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
    peopleSearch () {
      this.peopleSearchShow = !this.peopleSearchShow
    },
    highSearch () {
      this.highSearchShow = !this.highSearchShow
    },
    searchVal (e) {
      this.optionTypesData = this.optionTypes.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.optionTypesData.length === 0) {
        this.norelationData = true
        this.open = [0]
      } else {
        this.open = this.optionTypesData[0].name
        this.norelationData = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.open = []
      }
      if (this.optionTypesData.length === this.optionTypes.length) {
        this.allData = true
      } else {
        this.allData = false
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
    newserchBu () {
      this.search()
    },
    newserchVi () {
      this.search()
    },
    isclick (bol) {
      this.optionShow = bol
    },
    isclickVi (bol) {
      this.optionShow = bol
    },
    isclickBu (bol) {
      this.optionShow = bol
    },
    selOne (name, id) {
      this.text = name
      this.open = id
      this.optionShow = false
    },
    showOption () {
      this.optionShow = !this.optionShow
    },
    getserch (msg) {
      this.moreselect = msg
    },
    getserchVi (msg) {
      this.villageIDs = msg
      let buildings = JSON.parse(window.localStorage.getItem('buildingList'))
      if (this.villageIDs.length === 0) {
        this.buData = []
      } else {
        for (let i = 0; i < this.villageIDs.length ; i++) {
          buildings.forEach((item) => {
            if (item.villageID === this.villageIDs[i].name) {
              this.buData.push({
                typeName: item.buildingNo,
                name: item.buildingID
              })
            }
          })
        }
      }
    },
    getserchBu (msg) {
      this.buildingNos = msg
      this.buildNum = this.buildingNos.map(item => {
        return item.typeName
      })
    },
    reset () {
      this.buildingNos = []
      this.endtimeString = ''
      this.starttimeString = ''
      this.startdateRange = ''
      this.enddateRange = ''
      this.startTime = ''
      this.endTime = ''
      this.norelationData = false
      this.allData = true
      this.name = ''
      this.phone = ''
      this.card = ''
      this.passItem = ''
      this.build = ''
      this.cardNum = ''
      this.open = ''
      this.text = ''
      this.gender = ''
      this.moreselect = []
      this.context = ''
      this.context1 = ''
      this.villageIDs = []
      this.optionTypesData = JSON.parse(localStorage.getItem('openType'))
      this.$bus.emit('listShow', false)
      this.$bus.emit('listHide', false)
    },
    search: function () {
      this.getLists()
      this.$bus.emit('listShow', true)
      this.$bus.emit('listHide', false)
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
          this.optionTypes = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
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
          this.options = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    getLists () {
      if (!this.chinese(this.name)) {
        this.$message('请输入中文')
        return
      }
      if (!this.computNum(this.phone)) {
        this.$message('请输入至少4位数字不含空格')
        return
      }
      if (!this.computNum(this.card)) {
        this.$message('请输入至少4位数字不含空格')
        return
      }
      if (this.cardNum.length < 4 && this.cardNum !== '') {
        this.$message('请输入至少4位数字或字母不含空格')
        return
      }
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
      reqParam.functionCode = 'tongxing'
      if (this.dateRange === '') {
        this.startTime = ''
        this.endTime = ''
      }
      reqParam.condition = {}
      reqParam.condition.villageIDs = villageIDs
      reqParam.condition.buildingNos = this.buildNum
      reqParam.condition.startTime = this.startTime
      reqParam.condition.endTime = this.endTime
      reqParam.condition.openTypes = [this.open]
      reqParam.condition.cardNo = this.cardNum
      reqParam.condition.peopleName = this.name
      reqParam.condition.gender = this.gender
      reqParam.condition.phone = this.phone
      reqParam.condition.credentialNo = this.card
      reqParam.condition.peopleLabels = moreselect
      reqParam.orders = this.orders
      reqParam.pageNum = this.page
      reqParam.pageSize = this.pageSize
      this.$bus.emit('serchCondition', {
        villageIDs: villageIDs,
        gender: this.gender,
        peopleName: this.name,
        phone: this.phone,
        credentialNo: this.card,
        peopleLabels: this.moreselect,
        buildingNos: this.buildNum,
        cardNo: this.cardNum,
        openTypes: [this.open],
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
            that.listData = that.listData.map(item => {
              if (item.faceUrl === '' || item.faceUrl === null) {
                item.faceUrl = require('../../../../assets/images/photoDefault.png')
                item.faceUrlShow = false
              } else {
                item.faceUrlShow = true
              }
              let openType = ['100101','100102','100201','100401','100304','100507','100804']
              if (openType.indexOf(item.opentype) !== -1) {
                return Object.assign(item,{openTypeImg: require('../../../../assets/passImg/'+item.opentype + '.png')})
              } else {
                return Object.assign(item,{openTypeImg: require('../../../../assets/passImg/unknow.png')})
              }
            })
            console.log(that.listData)
          }
          that.$bus.emit('getallLists', {
            type: 'pass',
            results: that.listData,
            total: data.total
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    listen1 (data) {
      if (data.typeName === '全部') {
        this.gender = ''
      } else {
        this.gender = data.typeName
      }
    },
    listen2 (data) {
      this.context1 = data.typeName
      this.villageID = data.name
    }
  }
}
</script>
<style>
  #search .el-input__icon {
    display: none;
  }
</style>
<style scoped>
  ::-webkit-scrollbar{width:0px;background-color: transparent}
  .scrollClass {
    height: 13.6rem;
    overflow: scroll;
  }
</style>
