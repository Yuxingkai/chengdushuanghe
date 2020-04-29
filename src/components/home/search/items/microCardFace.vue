<template>
  <div
    style="color: white;box-sizing:border-box;padding:10px;height: 100%"
    id="search"
    ref="boxxxx">
    <div
      :class="scrollBar ? 'scrollClass' : ''">
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
      <div
        class="margTop">
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
                @keyup="searchVal1($event)"
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
                  v-if="allData1"
                  class="options"
                  @click="selOne('','全部')">全部</div>
                <div
                  v-if="norelationData1"
                  class="options">没有相关标签</div>
                <div
                  class="options"
                  :title="item.name"
                  v-for="(item,index) in addressesData"
                  :key="index"
                  @click="selOne(item.ioID,item.name)">
                  {{ item.name }}
                </div>
              </happy-scroll>
            </div>
          </div>
          <div class="rback"/>
        </div>
      </div>
      <div
        class="margTop">
        <div class="tupianbeij">进/出:</div>
        <div class="input">
          <div class="lback"/>
          <div
            class="btandbm"
            style="position:relative;">
            <div
              class="seloptions"
              @click.stop="showOption('inoutType')">
              <input
                @keyup="searchVal($event)"
                class="canInput"
                type="text"
                v-model="inoutType">
            </div>
            <div
              class="newarrow"
              :class="inoutTypeShow ? 'transdown' : 'transup'"/>
            <div
              :class="inoutTypeData.length > 8 ? 'dropdown' : 'dropdownless'"
              v-if="inoutTypeShow">
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
                  v-for="(item,index) in inoutTypeData"
                  :key="index"
                  @click="selOne(item.name,item.id)">{{ item.name }}</div>
              </happy-scroll>
            </div>
          </div>
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
        <!--<div style="margin-top: .3rem">-->
        <!--<div class="searchPic">-->
        <!--<div>搜索照片:</div>-->
        <!--<div style="text-indent: 0">-->
        <!--<div-->
        <!--class="box"-->
        <!--style="margin-left: .2rem;position: relative;width: 3.24rem;height: 3.98rem;border: 1px solid #009fe8;text-align: center">-->
        <!--<input-->
        <!--ref="picinputs"-->
        <!--style="position: absolute;left: -9999px;"-->
        <!--id="id"-->
        <!--@change="handlechange"-->
        <!--type="file">-->
        <!--<label-->
        <!--style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;z-index: 10;"-->
        <!--for="id"/>-->
        <!--<i-->
        <!--style="font-size: 1.14rem;margin-top: 45%;color: #009fe8"-->
        <!--class="el-icon-circle-plus-outline"/>-->
        <!--<div-->
        <!--@mouseenter="overShow"-->
        <!--@mouseleave="outHide"-->
        <!--@click="cancelOldPic"-->
        <!--v-if="oldPic"-->
        <!--style="height: 100%;width: 100%;position: absolute;z-index: 11;top: 0;">-->
        <!--<img-->
        <!--width="100%"-->
        <!--height="100%"-->
        <!--:src="dataUrl"-->
        <!--alt="">-->
        <!--<div-->
        <!--v-if="cancelBac"-->
        <!--style="position: absolute;width: 100%;height: 100%;top: 0;background: rgba(51,51,51,.6);text-align: center;line-height: 3.98rem">取消</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
      </div>
      <div
        style="cursor: pointer;margin-top: .3rem"
        class="title">
        <div @click.stop="peoplehighSearch">人员条件</div>
        <div
          class="newarrowH"
          :class="peopleSearchShow ? 'transdownH' : 'transupH'"/>
      </div>
      <div v-if="peopleSearchShow">
        <div class="margTop">
          <div class="tupianbeij">人员类型:</div>
          <div class="input">
            <div class="lback"/>
            <div
              class="btandbm"
              style="position:relative;">
              <div
                class="seloptions"
                @click.stop="showOption('peopletype')">
                <input
                  @keyup="searchVal2($event)"
                  class="canInput"
                  type="text"
                  v-model="peoplename">
              </div>
              <div
                class="newarrow"
                :class="optionShow2 ? 'transdown' : 'transup'"/>
              <div
                :class="peopleTypesData.length > 8 ? 'dropdown' : 'dropdownless'"
                v-if="optionShow2">
                <happy-scroll size="4">
                  <div
                    v-if="allData2"
                    class="options"
                    @click="selOne('','全部')">全部</div>
                  <div
                    v-if="norelationData2"
                    class="options">没有相关标签</div>
                  <div
                    class="options"
                    v-for="(item,index) in peopleTypesData"
                    :key="index"
                    @click="selOne(item.name,item.typeName)">{{ item.typeName }}</div>
                </happy-scroll>
              </div>
            </div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">居民姓名:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              class="setinput"
              type="text"
              v-model="username"></div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">手机号码:</div>
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
          <div class="tupianbeij">证件号码:</div>
          <div class="input">
            <div class="lback"/>
            <div class="btandbm"><input
              placeholder="最少输入4位"
              class="setinput"
              type="text"
              v-model="criditnum"></div>
            <div class="rback"/>
          </div>
        </div>
        <div class="margTop">
          <div class="tupianbeij">人员标签:</div>
          <div style="width: 100%">
            <mulselect
              :items='optionsMengType'
              @chosenSelect="getserch"
              @changeSelect="isclick"
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
import mulselect from '../../public/multipleSelect'
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post} from '../../../../Utils/Http'
export default {
  name: 'MicroCardFace',
  data () {
    return {
      villageIDs: [],
      communityData: [],
      startdateRange: '',
      enddateRange: '',
      startoptionShow2: false,
      endoptionShow2: false,
      starttimeString: '',
      endtimeString: '',
      optionShow: false,
      optionShow1: false,
      optionShow2: false,
      optionShow3: false,
      highSearchShow: false,
      villages: [
      ],
      inoutTypeDa: [{
        id: 0,
        name: '进'
      }, {
        id: 1,
        name: '出'
      }],
      inoutTypeData: [],
      addresses: [
      ],
      addressesData: [],
      peopleTypes: [
      ],
      peopleTypesData: [],
      name: '',
      address: '全部',
      peoplename: '全部',
      username: '',
      telnum: '',
      criditnum: '',
      dateRange: '',
      startTime: '',
      endTime: '',
      optionsMengType: [],
      moreselect: [],
      ioID: '',
      personType: '',
      listData: [],
      page: 1,
      pageSize: 2,
      showMeaagae: '',
      faceInoutType: '',
      inoutType: '全部',
      inoutTypeShow: false,
      scrollBar: false,
      allData0: true,
      allData1: true,
      allData2: true,
      norelationData0: false,
      norelationData1: false,
      norelationData2: false,
      lineNum: 8,
      dataUrl: '',
      oldPic: false,
      cancelBac: false,
      peopleSearchShow: false
    }
  },
  components: {
    mulselect
  },
  methods: {
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
      // let ey = this.dateRange[1].getFullYear()
      // let em = this.dateRange[1].getMonth() + 1
      // em = em < 10 ? '0' + em : em
      // let ed = this.dateRange[1].getDate()
      // ed = ed < 10 ? ('0' + ed) : ed
      // let eh = this.dateRange[1].getHours()
      // eh = eh < 10 ? '0' + eh : eh
      // let emin = this.dateRange[1].getMinutes()
      // emin = emin < 10 ? '0' + emin : emin
      // let esec = this.dateRange[1].getSeconds()
      // esec = esec < 10 ? '0' + esec : esec
      //  + '至' + ey + '/' + em + '/' + ed + '/' + eh + ':' + emin + ':' + esec
      // this.endTime = ey + '-' + em + '-' + ed + ' ' + eh + ':' + emin + ':' + esec
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
    peoplehighSearch () {
      this.peopleSearchShow = !this.peopleSearchShow
    },
    cancelOldPic () {
      this.dataUrl = ''
      this.oldPic = false
      this.cancelBac = false
    },
    overShow () {
      this.cancelBac = true
    },
    outHide () {
      this.cancelBac = false
    },
    imgPreview (file) {
      let self = this
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          self.dataUrl = this.result
        }
      }
    },
    getFileUrl (obj) {
      let url
      url = window.URL.createObjectURL(obj.files.item(0))
      return url
    },
    handlechange (e) {
      let inputDOM = this.$refs.picinputs
      if (e.target.value !== '') {
        if (!inputDOM['value'].match(/.jpg|.gif|.png|.bmp/i)) {
          return this.$message('上传的图片格式不正确，请重新选择')
        }
        // 通过DOM取文件数据
        this.imgPreview(inputDOM.files[0])
        this.cancelBac = false
        this.oldPic = true
        e.target.value = ''
      }
    },
    searchVal1 (e) {
      this.addressesData = this.addresses.filter((item) => {
        return item.name.indexOf(e.currentTarget.value) !== -1
      })
      if (this.addressesData.length === 0) {
        this.norelationData1 = true
        this.ioID = '0'
      } else {
        this.norelationData1 = false
        this.ioID = this.addressesData[0].ioID
      }
      if (this.addressesData.length === this.addresses.length) {
        this.allData1 = true
      } else {
        this.allData1 = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.ioID = ''
      }
    },
    searchVal2 (e) {
      this.peopleTypesData = this.peopleTypes.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.peopleTypesData.length === 0) {
        this.norelationData2 = true
        this.personType = '0'
      } else {
        this.norelationData2 = false
        this.personType = this.peopleTypesData[0].name
      }
      if (this.peopleTypesData.length === this.peopleTypes.length) {
        this.allData2 = true
      } else {
        this.allData2 = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.personType = ''
      }
    },
    searchVal (e) {
      this.inoutTypeData = this.inoutTypeDa.filter((item) => {
        return item.name.indexOf(e.currentTarget.value) !== -1
      })
      if (this.inoutTypeData.length === 0) {
        this.norelationData0 = true
        this.faceInoutType = ''
      } else {
        this.norelationData0 = false
        this.faceInoutType = this.inoutTypeData[0].id
      }
      if (this.inoutTypeData.length === this.inoutTypeDa.length) {
        this.allData0 = true
      } else {
        this.allData0 = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.faceInoutType = ''
      }
    },
    handleResize () {
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 170)
      this.lineNum = Math.floor((window.innerWidth - this.$refs.boxxxx.clientWidth) / 193)
      if (this.$refs.boxxxx.clientHeight < 800) {
        this.scrollBar = true
      } else {
        this.scrollBar = false
      }
      this.search()
    },
    getLists () {
      if (!this.chinese(this.username)) {
        this.$message('请输入中文')
        return
      }
      if (!this.computNum(this.telnum)) {
        this.$message('请输入至少4位数字不含空格')
        return
      }
      if (!this.computNum(this.criditnum)) {
        this.$message('请输入至少4位数字不含空格')
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
      reqParam.functionCode = 'wkface'
      reqParam.condition = {}
      reqParam.condition.villageIDs = villageIDs
      reqParam.condition.ioID = this.ioID
      reqParam.condition.inoutType = this.inoutType
      reqParam.condition.startTime = this.startTime
      reqParam.condition.endTime = this.endTime
      reqParam.condition.personType = this.personType
      reqParam.condition.peopleName = this.username
      reqParam.condition.phone = this.telnum
      reqParam.condition.credentialNo = this.criditnum
      reqParam.condition.peopleLabels = this.moreselect
      reqParam.pageNum = this.page
      reqParam.pageSize = this.pageSize * this.lineNum
      this.$bus.emit('serchCondition', {
        villageIDs: villageIDs,
        ioID: this.ioID,
        personType: this.personType,
        peopleName: this.username,
        phone: this.telnum,
        inoutType: this.inoutType,
        credentialNo: this.criditnum,
        peopleLabels: moreselect,
        startTime: this.startTime,
        endTime: this.endTime
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
            type: 'microCardFace',
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
        this.inoutTypeShow = false
      } else if (type === 'microaddress') {
        if (this.addressesData.length === 0 && this.villageIDs.length === 0) {
          this.$message('请选择小区')
        } else {
          this.optionShow1 = !this.optionShow1
          this.optionShow = false
          this.optionShow2 = false
          this.inoutTypeShow = false
        }
      } else if (type === 'peopletype') {
        this.optionShow2 = !this.optionShow2
        this.optionShow1 = false
        this.optionShow = false
        this.inoutTypeShow = false
      } else if (type === 'inoutType') {
        this.inoutTypeShow = !this.inoutTypeShow
        this.optionShow = false
        this.optionShow2 = false
        this.optionShow1 = false
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
        this.peoplename = name
        this.optionShow2 = false
        this.personType = id
      }
      if (this.inoutTypeShow) {
        this.inoutTypeShow = false
        this.faceInoutType = name
        this.inoutType = id
      }
    },
    newserch () {
    },
    getserch (msg) {
      this.moreselect = msg
    },
    isclick (bol) {
      this.optionShow = bol
      this.optionShow1 = bol
      this.optionShow2 = bol
    },
    isclickVi (bol) {
      this.optionShow = bol
      this.optionShow1 = bol
      this.optionShow2 = bol
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
          return item.type === 1
        })
        let addresses = []
        for (let i = 0; i < this.villageIDs.length; i++) {
          for (let j = 0; j < this.addresses.length; j++) {
            if (this.addresses[j].villageID === this.villageIDs[i].name) {
              addresses.push(this.addresses[j])
            }
          }
        }
        this.addresses = addresses.filter((item) => { return item.type === 1 })
        this.addressesData = addresses.filter((item) => { return item.type === 1 })
      }
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
      this.norelationData2 = false
      this.allData = true
      this.address = ''
      this.peoplename = ''
      this.username = ''
      this.telnum = ''
      this.criditnum = ''
      this.dateRange = ''
      this.moreselect = []
      this.startTime = ''
      this.endTime = ''
      this.ioID = ''
      this.personType = ''
      this.inoutType = ''
      this.faceInoutType = ''
      this.villageIDs = []
      this.addressesData = this.addresses.filter((item) => { return item.type === 1 })
      this.peopleTypesData = JSON.parse(localStorage.getItem('personType'))
      this.inoutTypeData = [{
        id: 0,
        name: '进'
      }, {
        id: 1,
        name: '出'
      }]
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
      if (this.inoutTypeShow) {
        this.inoutTypeShow = false
      }
    }
  },
  mounted () {
    this.inoutTypeData = [{
      id: 0,
      name: '进'
    }, {
      id: 1,
      name: '出'
    }]
    if (window.innerWidth > 3001 && window.innerWidth < 6001) {
      this.pageSize = Math.floor((window.innerHeight - 300) / 170) - 2
      this.lineNum = Math.floor((window.innerWidth - this.$refs.boxxxx.clientWidth) / 193) - 6
    } else if (window.innerWidth > 6001) {
      this.pageSize = Math.floor((window.innerHeight - 300) / 170) - 7
      this.lineNum = Math.floor((window.innerWidth - this.$refs.boxxxx.clientWidth) / 193) - 15
    } else {
      this.pageSize = Math.floor((window.innerHeight - 300) / 170)
      this.lineNum = Math.floor((window.innerWidth - this.$refs.boxxxx.clientWidth) / 193)
    }
    if (this.$refs.boxxxx.clientHeight < 800) {
      this.scrollBar = true
    } else {
      this.scrollBar = false
    }
    this.name = JSON.parse(window.localStorage.getItem('currentVillageID')).villageName
    this.getLists()
    document.addEventListener('click', this.otherClick)
    // this.addresses = JSON.parse(localStorage.getItem('inoutList'))
    // this.addresses = this.addresses.filter((item) => { return item.type === 1 })
    // this.addressesData = this.addresses.filter((item) => { return item.type === 1 })
    this.optionsMengType = JSON.parse(localStorage.getItem('peopleTag'))
    this.peopleTypes = JSON.parse(localStorage.getItem('personType'))
    this.peopleTypesData = JSON.parse(localStorage.getItem('personType'))
  },
  created () {
    let datas = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
    datas.forEach((item) => {
      this.communityData.push({
        typeName: item.villageName,
        name: item.villageID
      })
    })
    this.$bus.once('refreshData/home/search/microCardFace', () => {
      this.search()
    })
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  destroyed () {
    document.removeEventListener('click', this.otherClick)
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar{width:0px;background-color: transparent}
  .scrollClass {
    height: 13.6rem;
    overflow: scroll;
  }
  .searchPic {
    background: url('../../../../assets/newjs/pic/biankuang.png');
    background-size: 100%;
    background-repeat: no-repeat;
    width: 100%;
    line-height: .6rem;
    margin-right: .2rem;
    height: .6rem;
    text-indent: .5rem;
    display: flex;
  }
</style>
