<template>
  <pop
    css="width: 17.20rem;"
    :level="param.level"
    @closed="onClosed"
    title="住户信息"
    footer="display:none"
    :is-loading="getIsLoading">
    <div class="house_main">
      <ul class="popup_ul">
        <li><span>总住户</span>{{ items.houseTotal }}</li>
        <li class="aa"><span>总人数</span>{{ items.peopleTotal }}</li>
        <li><span>老人</span>{{ items.agedTotal }}</li>
        <li><span>小孩</span>{{ items.childTotal }}</li>
      </ul>
      <div class="house_content">
        <boxTitle :title="title"/>
        <div class="house_main">
          <div class="house_left">
            <Box3 css="height:9.5rem;padding-top: .2rem;">
              <div class="left_m">
                <div class="left_top"><input
                  type="text"
                  onkeyup="value=value.replace(/[^\d]/g,'')"
                  placeholder="输入房间号"
                  :value="inputText"
                  id="input_c"><button @click="query">搜索</button></div>
                <happy-scroll
                  resize
                  size="2"
                  hide-horizontal
                  style="height:8.2rem;padding-right: .15rem;">
                  <ul
                    class="storey"
                    id="storey">
                    <li
                      v-for="(item, index) in floorInfo"
                      :key="index">
                      <p class="li1">{{ item.name }}</p>
                      <div class="li2">
                        <p
                          v-for="(item1, i) in item.houses"
                          :key="item1.id">
                          <span
                            ref="query"
                            :demo0="(index*1000+i)"
                            :demo1="index"
                            @click="addClass((index*1000+i), (item1.houseNo), index)"
                            :class="{active : (index*1000)+i===floorIndex}">{{ item1.houseNo }}</span></p>
                      </div>
                    </li>
                  </ul>
                </happy-scroll>
              </div>
            </Box3>
          </div>
          <div class="house_right">
            <Box3 css="height:9.5rem;padding:.2rem;box-sizing: border-box;">
              <ul class="right_top">
                <li><span>房间号</span>{{ houseSum }}号</li>
                <li><span>居住人数</span>{{ peopleSum }}人</li>
              </ul>
              <happy-scroll
                resize
                size="3"
                style="height:8.5rem;">
                <ul class="right_main">
                  <li
                    v-for="item in detailsInfo"
                    :key="item.id">
                    <div class="right_img">
                      <Box3 css="height: 1.86rem;width: 1.64rem;"><img
                        :class="{testDiv : isMask === true && item.headPic !== ''}"
                        :src="item.headPic | splitPhoto"
                        alt=""></Box3>
                    </div>
                    <div class="right_c">
                      <div><span>{{ item.name }}</span><span>{{ item.sex |splitSex }}</span><span>{{ item.age | splitAge }}</span><span>{{ item.relation | splirelation }}</span></div>
                      <div class="passTi">
                        <div>最后通行时间：<span class="timeOverflow">{{ item.passAdd.length !== 0 ? item.passAdd[0].lastPassTime : '暂无数据' }}</span></div>
                        <div>通行总次数：{{ item.passAdd.length !== 0 ? item.passAdd[0].passSum : '暂无数据' }}</div>
                        <div>通行门禁：{{ item.passAdd.length !== 0 ? item.passAdd[0].accessName[0] : '暂无数据' }}</div>
                      </div>
                      <div class="right_tip">
                        <p>用户详情</p>
                        <p>行为轨迹</p>
                      </div>
                    </div>
                  </li>
                  <p style="text-align: center;margin: .5rem auto">{{ errInfo }}</p>
                </ul>
              </happy-scroll>
            </Box3>
          </div>
        </div>
      </div>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post} from '../../../Utils/Http'
export default {
  name: 'HouseInfo',
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
      inputText: '',
      title: '',
      peopleSum: '',
      houseSum: '',
      peopleInfo: [],
      items: {agedTotal: 0, childTotal: 0, careTotal: 0, focusTotal: 0, houseTotal: 0, peopleTotal: 0},
      floorInfo: [],
      houseNo: '',
      floorIndex: 0,
      detailsInfo: [],
      errInfo: '',
      isLoading1: '',
      isLoading2: '',
      isLoading3: '',
      isMask: true,
      functionList: []
    }
  },
  filters: {
    splitime: function (value) {
      if (value) {
        let strBirthdayArr = value.split('-')
        let birthYear = strBirthdayArr[0]
        let birthMonth = strBirthdayArr[1]
        // let birthDay = strBirthdayArr[2]
        let d = new Date()
        let nowYear = d.getFullYear()
        let nowMonth = d.getMonth() + 1
        // let nowDay = d.getDate()
        let ss = nowYear - birthYear
        if (ss === 0) {
          let s = nowMonth - birthMonth
          value = s + '月'
        } else if (ss > 0) {
          value = ss + '岁'
        } else {
          value = '数据错误'
        }
      } else {
        value = '暂无数据'
      }
      return value
    },
    splirelation: function (value) {
      switch (value) {
        case 1:
          value = '业主'
          break
        default:
          value = ''
          break
      }
    },
    splitPhoto: function (value) {
      let aa = require('../../../assets/images/photoDefault.png')
      if (!value) {
        value = aa
      }
      return value
    },
    splitAge: function (value) {
      if (value) {
        value = value + '岁'
      } else {
        value = '--'
      }
      return value
    },
    splitSex: function (value) {
      if (!value) {
        value = '--'
      }
      return value
    }
  },
  computed: {
    getIsLoading: function () {
      return this.isLoading1 || this.isLoading2 || this.isLoading3
    }
  },
  components: {
    pop,
    boxTitle
  },
  watch: {
  },
  methods: {
    open (msg) {
      this.$message(msg)
    },
    query: function () {
      let that = this
      let text = document.getElementById('input_c').value
      let storeyInfo = document.getElementById('storey')
      let value = storeyInfo.getElementsByTagName('span')
      let arr0 = null
      let arr1 = null
      let arr2 = null
      for (let i in value) {
        if (text === value[i].innerText) {
          arr2 = text
          arr0 = parseInt(value[i].getAttribute('demo0'))
          arr1 = parseInt(value[i].getAttribute('demo1'))
          break
        } else {
          arr2 = ''
        }
      }
      if (arr2) {
        that.addClass(arr0, arr2, arr1)
      } else {
        // alert('请输入正确房间号')
        that.open('请输入正确房间号')
        document.getElementById('input_c').value = ''
      }
    },
    onClosed: function () {
      // 此处做一些资源的释放
    },
    addClass: function (msg1, msg2, msg3) {
      if (!msg1) {
        this.floorIndex = 0
      } else {
        this.floorIndex = msg1
      }
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.buildingID = this.param.e.buildingID
      if (!msg2) {
        that.houseSum = that.houseNo
        reqParam.houseNos = that.houseNo
      } else {
        that.houseSum = msg2
        reqParam.houseNos = msg2
      }
      this.isLoading3 = true
      // 获取楼栋住户信息
      Post({
        async: true,
        url: apiNames['获取楼栋住户信息'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading3 = false
          if (data.peopleList) {
            that.detailsInfo = []
            let peopleListLength = data.peopleList.length
            let peopleIds = []
            for (let i = 0; i < peopleListLength; i++) {
              peopleIds.push(data.peopleList[i].peopleID)
            }
            let peopleIdsInfo = that.passTi(peopleIds)
            for (let i = 0; i < peopleListLength; i++) {
              data.peopleList[i].passAdd = []
            }
            if (peopleIdsInfo.length > 0) {
              for (let i = 0; i < peopleListLength; i++) {
                for (let j = 0; j < peopleIdsInfo.length; j++) {
                  if (data.peopleList[i].peopleID === peopleIdsInfo[j].peopleID) {
                    data.peopleList[i].passAdd.push(peopleIdsInfo[j])
                  }
                }
              }
            }
            that.detailsInfo = data.peopleList
            that.peopleSum = peopleListLength
            that.errInfo = ''
          } else {
            that.detailsInfo = []
            that.peopleSum = '* '
            that.errInfo = '暂无数据'
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-houseInfo 获取楼栋住户信息')
        }
      })
    },
    passTi: function (value) {
      if (value) {
        let reqParam = user.getRequestHeader()
        reqParam.peopleIDs = value
        let passInfo = []
        // 获取人员通行情况
        Post({
          async: false,
          url: apiNames['获取人员通行情况'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            if (data.datas) {
              passInfo = data.datas
            } else {
              console.log(1)
            }
          },
          error: function (err) {
            console.log(JSON.stringify(err) + 'popup-houseInfo 获取人员通行情况')
          }
        })
        return passInfo
      }
    }
  },
  mounted: function () {
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let videoMask = this.functionList.find((item) => { return item.functionCode === 'mask_picture' })
    if (videoMask === undefined) {
      this.isMask = true
    } else {
      this.isMask = false
    }
    let that = this
    let reqParam = user.getRequestHeader()
    reqParam.buildingID = this.param.e.buildingID
    reqParam.deviceID = this.param.e.deviceID
    let typeName = this.param.e.villageName
    let typeNo = this.param.e.buildingNo
    that.title = typeName + typeNo + '号'
    this.isLoading1 = this.isLoading2 = true
    // 获取楼栋住户统计
    Post({
      async: true,
      url: apiNames['获取楼栋住户统计'],
      data: reqParam,
      dataType: 'json',
      success: function (data) {
        that.isLoading1 = false
        if (data.peopleInfo) {
          that.items = data.peopleInfo
        }
      },
      error: function (err) {
        console.log(JSON.stringify(err) + 'popup-houseInfo 获取楼栋住户统计')
      }
    })
    // 获取发卡房屋列表
    Post({
      async: true,
      url: apiNames['获取发卡房屋列表'],
      data: reqParam,
      dataType: 'json',
      success: function (data) {
        that.isLoading2 = false
        if (data.areas) {
          that.floorInfo = data.areas
          let firstId = data.areas[0].houses[0].houseNo
          that.houseNo = firstId
          that.addClass()
        }
      },
      error: function (err) {
        console.log(JSON.stringify(err) + 'popup-houseInfo 获取发卡房屋列表')
      }
    })
  }
}
</script>

<style scoped>
  ul.popup_ul {
    overflow: hidden;
    padding: .1rem 0;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    display: flex;
    white-space: nowrap;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
  }

  ul.popup_ul li {
    padding: 0 .2rem;
    height: .36rem;
    color: #31f1fe;
    font-weight: bold;
    line-height: .36rem;
    float: left;
    border-left: 1px solid #ff0080;
    text-align: center;
    font-size: .32rem;
  }
  ul.popup_ul li span{
    text-align: justify;
    text-align-last: justify;
    width: 1rem;
    display: inline-block;
    margin-right: .2rem;
  }
  .house_content{
    box-sizing: border-box;
    padding: .1rem .1rem 0 .1rem;
  }
  .house_main{
    box-sizing: border-box;
    overflow: hidden;
  }
  .house_left{
    width: 6.6rem;
    float: left;
    margin-right: .2rem;
    overflow: hidden;
  }
  .house_left .left_m{
    width: 6rem;
    margin: 0 auto;
  }
  .house_left .left_m .left_top input{
    width: 4.15rem;
    height: .66rem;
    outline: none;
    border: none;
    background: rgba(29, 77, 126, 0.94);
    box-sizing: border-box;
    padding: 0 .1rem;
    color: #fff;
  }
  .house_left .left_m .left_top input::-webkit-input-placeholder{
    color: #a4edfc82;
  }
  .house_left .left_m .left_top input:-moz-placeholder{
    color: #a4edfc82;
  }
  .house_left .left_m .left_top input::-moz-placeholder{
    color: #a4edfc82;
  }
  .house_left .left_m .left_top input:-ms-input-placeholder{
    color: #a4edfc82;
  }
  .house_left .left_m .left_top button{
    width: 1.6rem;
    height: .64rem;
    border: none;
    outline: none;
    float: right;
    cursor: pointer;
    background-color: #0edffaa8;
    color: #fff;
    font-size: .32em;
  }
  .storey{
    padding-top: .15rem;
  }
  .storey li{
    margin-bottom: .15rem;
  }
  .storey li p.li1{
    width: 100%;
    height: .56rem;
    line-height: .56rem;
    box-sizing: border-box;
    padding-left: .45rem;
    background: #a4edfc3b;
  }
  .storey li div.li2{
    width: 100%;
    /*height: .56rem;*/
    border: 1px solid #29c5d4;
    border-top: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 .06rem;
    /*display: flex;*/
  }
  .storey li div.li2 p{
    flex: 1;
    text-align: center;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: .07rem .08rem;
    display: inline-block;
  }
  .storey li div.li2 p span{
    width: 1rem;
    height: .4rem;
    display: inline-block;
    cursor: pointer;
  }
  .storey li div.li2 p span:hover{
    background: #0edffaa8;
  }
  .storey li div.li2 p span.active{
    background: #0edffaa8;
  }
  .house_right{
    width: 9.91rem;
    float: left;
  }
  .right_top{
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .right_top li{
    float: left;
    font-weight: bold;
    font-size: .26rem;
    color:  #a4edfc;
    margin-right: .4rem;
  }
  .timeOverflow {
    /*display: inline-block;*/
    /*width: 3rem;*/
    /*text-overflow: ellipsis;*/
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    /*position: absolute;*/
  }
  .right_top li span{
    display: inline-block;
    padding: 0 .2rem;
    position: relative;
    margin: .1rem;
  }
  .right_top li span::before{
    content: '';
    height: .24rem;
    width: 1px;
    background: #ff0080;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .right_main li{
    width: 100%;
    overflow: hidden;
    margin-bottom: .2rem;
  }
  .right_img{
    float: left;
    text-align: center;
  }
  .right_img img{
    width: 1.4rem;
    height: 1.68rem;
    margin-top: .08rem;
  }
  .right_c{
    float: left;
    padding-left: .4rem;
    box-sizing: border-box;
    font-size: .32rem;
    width: 7.7rem;
    color: #fff;
    position: relative;
  }
  .right_c div{
    line-height: .46rem;
  }
  .right_c div:nth-of-type(1) span{
    margin-right: .3rem;
  }
  .right_tip{
    position: absolute;
    right: 0;
    top: 0;
  }
  .right_tip p{
    width: 1.58rem;
    height: .4rem;
    border: solid 0.5px #31f1fe99;
    text-align: center;
    line-height: .4rem;
    font-size: .32rem;
    color: #fff;
    margin-bottom: .2rem;
    cursor: pointer;
  }

</style>
