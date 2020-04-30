<template>
  <div class="serchPage">
    <div class="searchPage_left">
      <span class="left_globle_span" />
      <router-view/>
    </div>
    <div
      class="allin"
      ref="boxxxx">
      <span class="left_globle_span" />
      <div class="searchPage_right">
        <div style="position: absolute;left:0;bottom:0;right:0;height: 100%">
          <div style="height: 100%;padding:0 .15rem;">
            <userInfo
              :page-size="pageSize"
              :dt-name-text="dtNameText"
              :type="nowvalPath"
              :total="totals"
              :results="results"
              :conditions="serchCondition"/>
          </div>
          <!--分页器-->
          <div style="position: absolute;right: 2%;bottom: 10px;z-index: 16;overflow: hidden">
            <div style="color: white;float: left;margin-top: .1rem;letter-spacing: .05rem">共 {{ totals }} 条</div>
            <div style="float: left">
              <el-pagination
                @current-change="curPage"
                :current-page.sync="currentPage3"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totals"/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Title from '../public/boxTitle'
import userInfo from './userInfo'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post} from '../../../Utils/Http'
export default {
  name: 'SearchIndex',
  data () {
    return {
      results: [],
      type: 'face',
      serchCondition: {},
      showList: false,
      currentPage3: 1,
      lessList: false,
      changetitle: '',
      totals: 18,
      pageSize: 18,
      dtNameText: '暂无数据',
      nowvalPath: '',
      lineNum: 8,
      superBrainUrl: ''
    }
  },
  created () {
    this.getAlarmLevel()
    this.getAlarmModels()
    this.getBuildingList()
    this.getLabels()
    this.getcarlabels()
    this.getOpenType()
    this.getMengTypes()
    this.getTypes()
    this.getStates()
    this.getguStates()
    this.getInoutList()
    this.getPersonType()
    let that = this
    this.$bus.on('clearDatas', this.clearAllDatas)
    this.$bus.on('getallLists', this.showSearch)
    this.$bus.on('serchCondition', function (esg) {
      that.serchCondition = esg
    })
    this.$bus.on('listShow', function (bool) {
      that.showList = bool
    })
    this.$bus.on('listHide', function (bool) {
      that.lessList = bool
    })
    window.addEventListener('resize', this.handleResize)
  },
  watch: {
    pageSize (newval, oldval) {
      this.pageSize = newval
    },
    $route (nowval, oldval) {
      this.showList = false
      this.lessList = false
      this.results = []
      this.totals = 1
      this.dtNameText = '正在读取数据'
      this.nowvalPath = nowval.path
      if (nowval.path === '/home/search/face') {
        this.type = 'face'
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
      } else if (nowval.path === '/home/search/alarm') {
        this.type = 'alarm'
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
      } else if (nowval.path === '/home/search/car') {
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
        this.type = 'car'
      } else if (nowval.path === '/home/search/device') {
        this.type = 'device'
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
      } else if (nowval.path === '/home/search/pass') {
        this.type = 'pass'
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
      } else if (nowval.path === '/home/search/microCardFace') {
        this.type = 'microCardFace'
        this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 170) * this.lineNum
      } else if (nowval.path === '/home/search/serchByPic') {
        this.dtNameText = '暂无数据'
        this.type = 'serchByPic'
        this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 170) * this.lineNum
      } else if (nowval.path === '/home/search/serchByFace') {
        this.dtNameText = '暂无数据'
        this.type = 'serchByFace'
        this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 170) * this.lineNum
      } else if (nowval.path === '/home/search/microCardCar') {
        this.type = 'microCardCar'
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 50) + 1
      }
      this.$bus.emit('/map/locate/clearResult')
    }
  },
  components: {
    Title,
    userInfo
  },
  mounted () {
    this.superBrainUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).superBrainUrl
    this.nowvalPath = '/home/search/pass'
    if (this.$route.path === '/home/search/face') {
      this.nowvalPath = '/home/search/face'
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    } else if (this.$route.path === '/home/search/alarm') {
      this.nowvalPath = '/home/search/alarm'
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    } else if (this.$route.path === '/home/search/car') {
      this.nowvalPath = '/home/search/car'
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    } else if (this.$route.path === '/home/search/device') {
      this.nowvalPath = '/home/search/device'
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    } else if (this.$route.path === '/home/search/pass') {
      this.nowvalPath = '/home/search/pass'
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    } else if (this.$route.path === '/home/search/microCardFace') {
      this.nowvalPath = '/home/search/microCardFace'
      this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 170) * this.lineNum
    } else if (this.$route.path === '/home/search/serchByPic') {
      this.nowvalPath = '/home/search/serchByPic'
      this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
      this.pageSize = 24
    } else if (this.$route.path === '/home/search/serchByFace') {
      this.nowvalPath = '/home/search/serchByFace'
      this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
      this.pageSize = 24
    } else if (this.$route.path === '/home/search/microCardCar') {
      this.nowvalPath = '/home/search/microCardCar'
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 50) + 1
    }
  },
  methods: {
    clearAllDatas () {
      this.results = []
      // if (this.$route.path === '/home/search/serchByPic') {
      //   this.dtNameText = '暂无数据'
      // } else {
      this.dtNameText = '正在读取数据'
      // }
    },
    // 获取报警等级
    getAlarmLevel () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['alarmLevel']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.datas) {
            localStorage.setItem('alarmLevel', JSON.stringify(data.datas))
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取报警规则
    getAlarmModels () {
      let reqParam = user.getRequestHeader()
      Post({
        async: true,
        url: apiNames['获取报警模型'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          localStorage.setItem('alarmModels', JSON.stringify(data.models))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取楼栋列表
    getBuildingList () {
      let reqParam = user.getRequestHeader()
      let villageIDs = []
      let datas = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      datas.forEach((item) => {
        villageIDs.push(item.villageID)
      })
      reqParam.villageIDs = villageIDs
      Post({
        async: true,
        url: apiNames['获取楼栋列表'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          localStorage.setItem('buildingList', JSON.stringify(data.buildingList))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取人员类型
    getPersonType () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_face_log/personType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          localStorage.setItem('personType', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取微卡位置
    getInoutList () {
      let reqParam = user.getRequestHeader()
      let villageInfos = []
      villageInfos = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      let villageIDs = []
      villageInfos.forEach((item) => {
        villageIDs.push(item.villageID)
      })
      reqParam.villageIDs = villageIDs
      Post({
        async: true,
        url: apiNames['获取微卡位置'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          localStorage.setItem('inoutList', JSON.stringify(data.inOuts))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取故障状态
    getguStates () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_device/state']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          localStorage.setItem('deviceState', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取报警状态
    getStates () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_alarm_log/alarmState']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // this.optionsState = data.datas
          localStorage.setItem('alarmState', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取报警类型
    getTypes () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_alarm_log/alarmType', 'db/e_device_alarm_log/alarmType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // this.optionsType = data.datas
          localStorage.setItem('alarmType', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取设备类型
    getMengTypes () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_device/type']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // this.optionsMengType = data.datas
          localStorage.setItem('deviceType', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取开门方式
    getOpenType () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_access_log/openType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // this.optionTypes = data.datas
          localStorage.setItem('openType', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取车类
    getcarlabels () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_parking_car/carType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          // this.cartypes = data.datas
          localStorage.setItem('parkingCar', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    // 获取人员标签
    getLabels () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/p_people_tag/label']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          localStorage.setItem('peopleTag', JSON.stringify(data.datas))
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    showSearch: function (e) {
      if ('/home/search/' + e.type !== this.$route.path) {
        return false
      }
      if (e.results.length === 0) {
        this.dtNameText = '没有相关数据'
      } else {
        this.dtNameText = '正在读取数据'
      }
      this.results = e.results
      this.type = e.type
      if (e.total > 0) {
        this.totals = e.total
      } else {
        this.totals = 0
      }
      this.currentPage3 = 1
    },
    listHide () {
      this.showList = false
      this.lessList = true
    },
    listShow () {
      this.showList = true
      this.lessList = false
    },
    curPage (e) {
      let reqParam = user.getRequestHeader()
      reqParam.condition = {}
      this.results = []
      this.dtNameText = '正在读取数据'
      if (this.type === 'alarm') {
        reqParam.functionCode = 'yujin'
        reqParam.condition.villageIDs = this.serchCondition.villageIDs
        reqParam.condition.alarmLevel = this.serchCondition.alarmLevel
        reqParam.condition.alarmModelIDs = this.serchCondition.alarmModelIDs
        reqParam.condition.alarmAddress = this.serchCondition.alarmAddress
        reqParam.condition.deviceTypes = this.serchCondition.deviceTypes
        reqParam.condition.alarmTypes = this.serchCondition.alarmTypes
        reqParam.condition.alarmStates = this.serchCondition.alarmStates
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
        reqParam.condition.alarmDetail = this.serchCondition.alarmDetail
        reqParam.orders = this.serchCondition.orders
      } else if (this.type === 'face') {
        reqParam.functionCode = 'renkou'
        reqParam.condition.peopleLabels = this.serchCondition.peopleLabels
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.credentialNo = this.serchCondition.credentialNo
        reqParam.condition.peopleName = this.serchCondition.peopleName
        reqParam.condition.buildingNo = this.serchCondition.buildingNo
        reqParam.condition.houseNo = this.serchCondition.houseNo
      } else if (this.type === 'car') {
        reqParam.functionCode = 'cheliang'
        reqParam.condition.peopleName = this.serchCondition.peopleName
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.credentialNo = this.serchCondition.credentialNo
        reqParam.condition.carType = this.serchCondition.carType
        reqParam.condition.buildingNo = this.serchCondition.buildingNo
        reqParam.condition.plateNo = this.serchCondition.plateNo
      } else if (this.type === 'pass') {
        reqParam.functionCode = 'tongxing'
        reqParam.condition.villageIDs = this.serchCondition.villageIDs
        reqParam.condition.gender = this.serchCondition.gender
        reqParam.condition.peopleName = this.serchCondition.peopleName
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.credentialNo = this.serchCondition.credentialNo
        reqParam.condition.peopleLabels = this.serchCondition.peopleLabels
        reqParam.condition.buildingNos = this.serchCondition.buildingNos
        reqParam.condition.cardNo = this.serchCondition.cardNo
        reqParam.condition.openTypes = this.serchCondition.openTypes
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
        reqParam.orders = this.serchCondition.orders
      } else if (this.type === 'device') {
        reqParam.functionCode = 'shebei'
        reqParam.condition.villageIDs = this.serchCondition.villageIDs
        reqParam.condition.installAdd = this.serchCondition.installAdd
        reqParam.condition.deviceCode = this.serchCondition.deviceCode
        reqParam.condition.deviceName = this.serchCondition.deviceName
        reqParam.condition.deviceTypes = this.serchCondition.deviceTypes
        reqParam.condition.deviceStates = this.serchCondition.deviceStates
        reqParam.orders = this.serchCondition.orders
      } else if (this.type === 'microCardFace') {
        reqParam.functionCode = 'wkface'
        reqParam.condition.villageIDs = this.serchCondition.villageIDs
        reqParam.condition.ioID = this.serchCondition.ioID
        reqParam.condition.personType = this.serchCondition.personType
        reqParam.condition.peopleName = this.serchCondition.peopleName
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.inoutType = this.serchCondition.inoutType
        reqParam.condition.credentialNo = this.serchCondition.credentialNo
        reqParam.condition.peopleLabels = this.serchCondition.peopleLabels
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
      } else if (this.type === 'serchByPic') {
        reqParam.picBase64 = this.serchCondition.picBase64
        reqParam.similarity = this.serchCondition.similarity
        reqParam.villageID = this.serchCondition.villageID
        reqParam.startTime = this.serchCondition.startTime
        reqParam.endTime = this.serchCondition.endTime
      } else if (this.type === 'serchByFace') {
        if (this.serchCondition.logsAll) {
          reqParam = {}
        } else {
          reqParam.startTime = this.serchCondition.startTime
          reqParam.endTime = this.serchCondition.endTime
          reqParam.snapUUid = this.serchCondition.snapUUid
        }
      } else if (this.type === 'microCardCar') {
        reqParam.functionCode = 'wkcar'
        reqParam.condition.villageIDs = this.serchCondition.villageIDs
        reqParam.condition.ioID = this.serchCondition.ioID
        reqParam.condition.inOutType = this.serchCondition.inOutType
        reqParam.condition.carType = this.serchCondition.carType
        reqParam.condition.plateNo = this.serchCondition.plateNo
        reqParam.condition.phone = this.serchCondition.phone
        reqParam.condition.credentialNo = this.serchCondition.credentialNo
        reqParam.condition.startTime = this.serchCondition.startTime
        reqParam.condition.endTime = this.serchCondition.endTime
        reqParam.orders = this.serchCondition.orders
      }
      reqParam.pageNum = e
      reqParam.pageSize = this.pageSize
      if (this.type === 'serchByPic') {
        Post({
          async: true,
          url: this.superBrainUrl,
          data: reqParam,
          dataType: 'json',
          success: (data) => {
            console.log(data)
            if (data.data === undefined) {
              this.results = []
            } else {
              this.results = data.data
            }
          },
          error: (err) => {
            console.log(err)
          }
        })
      } else if (this.type === 'serchByFace') {
        Post({
          async: true,
          url: this.serchCondition.logsAll ? apiNames['全部人脸图片'] : apiNames['人脸检索'],
          data: reqParam,
          dataType: 'json',
          success: (data) => {
            console.log(data)
            if (data.data === undefined) {
              this.results = []
            } else {
              this.results = data.data
            }
          },
          error: (err) => {
            console.log(err)
          }
        })
      } else {
        let that = this
        Post({
          async: true,
          url: apiNames['获取预警查询'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            if (that.type === 'pass') {
              that.results = data.data.map(item => {
                if (item.faceUrl === '' || item.faceUrl === null) {
                  item.faceUrl = require('../../../assets/images/photoDefault.png')
                }
                let openType = ['100101', '100102', '100201', '100401', '100304', '100507', '100804']
                if (openType.indexOf(item.opentype) !== -1) {
                  return Object.assign(item, {openTypeImg: require('../../../assets/passImg/' + item.opentype + '.png')})
                } else {
                  return Object.assign(item, {openTypeImg: require('../../../assets/passImg/unknow.png')})
                }
              })
            } else {
              that.results = data.data
            }
            this.dtNameText = '没有相关数据'
            if (that.type === 'device' || that.type === 'alarm') {
              that.$bus.emit('/map/locate/searchResult', data.data)
            }
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    },
    handleResize () {
      if (this.$route.path === '/home/search/face') {
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40)
      } else if (this.$route.path === '/home/search/alarm') {
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40)
      } else if (this.$route.path === '/home/search/car') {
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40)
      } else if (this.$route.path === '/home/search/device') {
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40)
      } else if (this.$route.path === '/home/search/pass') {
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40)
      } else if (this.$route.path === '/home/search/microCardFace') {
        // this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 175) * 8
        this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 170) * this.lineNum
      } else if (this.$route.path === '/home/search/serchByPic') {
        // this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 175) * 8
        this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
        this.pageSize = 24
      } else if (this.$route.path === '/home/search/serchByFace') {
        // this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 175) * 8
        this.lineNum = Math.floor(this.$refs.boxxxx.clientWidth / 193)
        this.pageSize = 24
      } else if (this.$route.path === '/home/search/microCardCar') {
        this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 50)
      }
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
<style>
  .serchPage{
    display:grid;
    grid-template-columns:6.9rem 1fr;
    grid-column-gap:10px;
    box-sizing:border-box;
    padding:0px 5px 0 5px;
  }
  .searchPage_left{
    position: relative;
    border: 1px solid #009fea;
  }
  .serachPage_right{
    padding:5px;
    box-sizing:border-box;
    position: relative;
    width:100%;
  }
  .searchPage_left .left_globle_span:before {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-left: 3px solid rgba(0,159,232,1);
    border-bottom: 3px solid rgba(0,159,232,1);
    left: -2px;
    bottom: -2px;
  }
  .searchPage_left .left_globle_span:after {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-right: 3px solid rgba(0,159,232,1);
    border-bottom: 3px solid rgba(0,159,232,1);
    right: -2px;
    bottom: -2px;
  }
  .searchPage_left:before {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-left: 3px solid rgba(0,159,232,1);
    border-top: 3px solid rgba(0,159,232,1);
    left: -2px;
    top: -2px;
  }
  .searchPage_left:after {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-right: 3px solid rgba(0,159,232,1);
    border-top: 3px solid rgba(0,159,232,1);
    right: -2px;
    top: -2px;
  }
  @media screen and (min-width: 3001px) {
    .serchPage {
      grid-template-columns: 10.4rem 1fr;
    }
    .serchPage .el-input,.serchPage .el-pager li,.serchPage .el-pagination button, .serchPage .el-pagination span:not([class*=suffix]){
      font-size: .4rem !important;
    }
    .serchPage .el-pagination .btn-next .el-icon,.serchPage .el-pagination .btn-prev .el-icon{
      font-size: .32rem !important;
    }
  }
  .serchPage .el-pagination .btn-next, .serchPage .el-pagination .btn-prev{
    background: transparent !important;
    color: white !important;
  }
  .serchPage .el-pager li.active{
    color: white !important;
    border:1px solid #009fe8 !important;
    border-radius: 0.1rem;
    line-height: .5rem;
  }
  .serchPage .el-pager li {
    min-width: 30.5px !important;
    color: white !important;
    background: transparent !important;
  }
  .serchPage .el-pager li.btn-quicknext, .serchPage .el-pager li.btn-quickprev{
    color: white !important;
  }
  .serchPage .el-pagination__jump{
    margin-left: 10px !important;
    color: white !important;
  }
  .serchPage .el-pagination__editor.el-input{
    width: 80px !important;
    margin-left: 10px !important;
    margin-right: 10px !important;
  }
  .serchPage .el-input__inner{
    border-radius: 0 !important;
  }
  .serchPage .el-input__inner{
    background: transparent !important;
    color: white !important;
    border: 1px solid #009fe8 !important;
    border-radius: 0.1rem;
  }
</style>
<style scoped>
  .allin{
    /*display:grid;*/
    /*grid-template-rows:100%;*/
    box-sizing:border-box;
    padding:0px 5px 0 0px;
    /*background:rgba(1,3,5,.9);*/
    background-image: url('../../../assets/images/title_background2.png');
    background-size: 45px;
    position: relative;
    border: 1px solid #009fea;
  }
  .allin .left_globle_span:before {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-left: 3px solid rgba(0,159,232,1);
    border-bottom: 3px solid rgba(0,159,232,1);
    left: -2px;
    bottom: -2px;
  }
  .allin .left_globle_span:after {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-right: 3px solid rgba(0,159,232,1);
    border-bottom: 3px solid rgba(0,159,232,1);
    right: -2px;
    bottom: -2px;
  }
  .allin:before {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-left: 3px solid rgba(0,159,232,1);
    border-top: 3px solid rgba(0,159,232,1);
    left: -2px;
    top: -2px;
  }
  .allin:after {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-right: 3px solid rgba(0,159,232,1);
    border-top: 3px solid rgba(0,159,232,1);
    right: -2px;
    top: -2px;
  }
  .halfin{
    display:grid;
    grid-template-rows:auto 50%;
    box-sizing:border-box;
    padding:0px 5px 0 0px;
  }
</style>
