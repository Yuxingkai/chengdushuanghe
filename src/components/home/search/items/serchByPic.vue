<template>
  <div
    style="color: white;box-sizing:border-box;padding:10px;height: 100%"
    id="search"
    ref="boxxxx">
    <div>
      <div
        class="title">
        <div>以图搜图</div>
      </div>
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
      <div class="margTop">
        <div class="tupianbeij">阈值设置:</div>
        <div class="input"/>
      </div>
      <div
        style="padding-left: .2rem"
        class="margTop">
        <slider
          :min=0
          :max=100
          @input="getNum"
          v-model="percent"/>
      </div>
      <div style="margin-top: .3rem">
        <div class="searchPic">
          <div>搜索照片:</div>
          <div style="text-indent: 0">
            <div
              class="box"
              style="margin-left: .2rem;position: relative;width: 3.24rem;height: 3.98rem;border: 1px solid #009fe8;text-align: center">
              <input
                ref="picinputs"
                style="position: absolute;left: -9999px;"
                id="id"
                @change="handlechange"
                type="file">
              <label
                style="position: absolute;top: 0;left: 0;right: 0;bottom: 0;z-index: 10;"
                for="id"/>
              <i
                style="font-size: 1.14rem;margin-top: 45%;color: #009fe8"
                class="el-icon-circle-plus-outline"/>
              <div
                @mouseenter="overShow"
                @mouseleave="outHide"
                @click="cancelOldPic"
                v-if="oldPic"
                style="height: 100%;width: 100%;position: absolute;z-index: 11;top: 0;">
                <img
                  width="100%"
                  height="100%"
                  :src="dataUrl"
                  alt="">
                <div
                  v-if="cancelBac"
                  style="position: absolute;width: 100%;height: 100%;top: 0;background: rgba(51,51,51,.6);text-align: center;line-height: 3.98rem">取消</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="width: 94%;
      position: absolute;
      bottom: .2rem;overflow: hidden">
      <Box3
        style="float: left;width: 47%"
        :css="css">
        <button
          @click="searchByImage"
          class="serchBtn">搜索</button>
      </Box3>
      <Box3
        style="float: right;width: 47%;"
        :css="css">
        <button
          @click="resetImage"
          class="resetBtn">重置</button>
      </Box3>
    </div>
  </div>
</template>

<script>
import user from '../../../../Utils/user'
import {Post} from '../../../../Utils/Http'
import slider from '../dialog/sliderBar'
export default {
  name: 'SerchByPic',
  data () {
    return {
      percent: '50',
      startTime: '',
      endTime: '',
      startoptionShow2: false,
      endoptionShow2: false,
      startdateRange: '',
      enddateRange: '',
      villageIDs: [],
      villages: [
      ],
      page: 1,
      pageSize: 2,
      showMeaagae: '',
      lineNum: 8,
      dataUrl: '',
      oldPic: false,
      cancelBac: false,
      peopleSearchShow: false,
      cantJiansuo: true,
      superBrainUrl: '',
      css: 'padding:.03rem 0;box-sizing:border-box;float:left;height:40px;text-align:center;line-height:30px;top:0;'
    }
  },
  components: {
    slider
  },
  methods: {
    getNum (e) {
      this.percent = e
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
      this.startTime = this.starttimeString / 1000
      console.log(this.startTime, 'this.startTime')
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
      this.endTime = this.endtimeString / 1000
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
    searchByImage () {
      if (this.cantJiansuo) {
        this.$bus.emit('clearDatas', {
          type: 'serchByPic',
          results: [],
          dtNameText: '正在读取数据'
        })
        let reqParam = user.getRequestHeader()
        let id = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
        reqParam.picBase64 = this.dataUrl
        reqParam.similarity = Number(this.percent) / 100
        reqParam.villageID = id
        reqParam.startTime = this.startTime
        reqParam.endTime = this.endTime
        reqParam.pageNum = this.page
        reqParam.pageSize = this.pageSize * this.lineNum
        this.$bus.emit('serchCondition', {
          picBase64: this.dataUrl,
          similarity: Number(this.percent) / 100,
          villageID: id,
          endTime: this.endTime,
          startTime: this.startTime
        })
        Post({
          async: true,
          url: this.superBrainUrl,
          data: reqParam,
          dataType: 'json',
          success: (data) => {
            console.log(data)
            if (data.data === undefined) {
              this.listData = []
            } else {
              this.listData = data.data
            }
            this.$bus.emit('getallLists', {
              typePic: 'serchByFace',
              type: 'serchByPic',
              results: this.listData,
              total: data.totalNum
            })
          },
          error: (err) => {
            console.log(err)
          }
        })
      } else {
        this.$message.error('无权限搜索，请联系管理员开通权限')
      }
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
    resetImage () {
      this.dataUrl = ''
      this.endTime = ''
      this.startTime = ''
      this.startdateRange = ''
      this.endtimeString = ''
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
        if (!inputDOM['value'].match(/.jpg|.gif|.jpeg|.png|.bmp/i)) {
          return this.$message('上传的图片格式不正确，请重新选择')
        }
        // 通过DOM取文件数据
        this.imgPreview(inputDOM.files[0])
        this.cancelBac = false
        this.oldPic = true
        e.target.value = ''
      }
    }
  },
  mounted () {
    this.superBrainUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).superBrainUrl
    this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 170)
    this.lineNum = Math.floor((window.innerWidth - this.$refs.boxxxx.clientWidth) / 193)
    this.name = JSON.parse(window.localStorage.getItem('currentVillageID')).villageName
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let weikarenyuanJiansuo = this.functionList.find((item) => { return item.functionCode === 'weikarenyuan_jiansuo' })
    if (weikarenyuanJiansuo === undefined) {
      this.cantJiansuo = false
    } else {
      this.cantJiansuo = true
    }
    document.addEventListener('click', this.otherClick)
  },
  created () {
    // let datas = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
    // datas.forEach((item) => {
    //   this.communityData.push({
    //     typeName: item.villageName,
    //     name: item.villageID
    //   })
    // })
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
