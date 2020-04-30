<template>
  <div class="fire">
    <loading :visible="isLoading"/>
    <div
      class="lineSmall item clear"
      v-for='(i,index) in deviceNum'
      :key="index">
      <div
        class="item_back"
        @click="filtMap(i.type, index, i.name)">
        <div
          class="item-title topText textCon"
          :title="i.name">
          <span>{{ i.name }}</span>
        </div>
        <div
          :class="{submenu_active : index == innerIndex }"
          class="cebian sliderTilSmall">{{ i.total }}</div>
      </div>
      <div class="operationClass"><div
        class="secondClass"
        v-if="i.exTotal !== 0"><p><span>{{ i.exTotal }}</span>个设备报警</p></div></div>
    </div>
    <p
      style="text-align: center;padding-top: .5rem"
      class="sliderTilSmall">{{ errInfo }}</p>
  </div>
</template>
<script>
import user from '../../Utils/user'
import { apiNames } from '../../config/config'
import { Post } from '../../Utils/Http'
// import { TweenLite } from 'gsap/TweenMax'
export default {
  name: 'InfoLaberOperation',
  data () {
    return {
      tweenedNumber: 0,
      timeType: '',
      typeNum: 1,
      operationChange: false,
      innerIndex: 0,
      deviceNum: [],
      errInfo: '',
      isLoading: ''
    }
  },
  props: {
  },
  mounted: function () {
    this.getDeviceNum()
  },
  computed: {
  },
  methods: {
    select: function (index) {
      this.innerIndex = index
    },
    getDeviceNum: function () {
      let that = this
      that.isLoading = true
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      // 获取门禁信息
      setTimeout(() => {
        that.isLoading = false
        if (that.deviceNum.lenght > 0) that.errInfo = '没有相关设备信息'
      }, 8000)
      Post({
        async: true,
        url: apiNames['获取设备数量'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading = false
          if (data.deviceNumInfo) {
            that.errInfo = ''
            let arr = []
            let all = {
              name: '全部',
              total: 0,
              exTotal: 0,
              type: []
            }
            arr.push(all)
            data.deviceNumInfo.forEach(e => {
              arr.push({
                name: e.name,
                total: e.total,
                exTotal: e.exTotal,
                type: [e.type.replace(/^\s+|\s+$/g, '')]
              })
              all.total += e.total
              all.exTotal += e.exTotal
              all.type.push(e.type.replace(/^\s+|\s+$/g, ''))
            })
            that.deviceNum = arr
            console.log(that.deviceNum)
            that.filtMap()
          } else {
            that.errInfo = '没有相关设备信息'
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + '获取设备数量')
          that.isLoading1 = false
          that.errInfo = '没有相关设备信息'
        }
      })
    },
    filtMap: function (msg1, msg2, msg3) {
      if (msg2) {
        this.innerIndex = msg2
        this.$emit('filtRight', msg3)
      } else {
        this.innerIndex = 0
        this.$emit('filtRight', '全部')
      }
      let filtName = msg1
      if (msg1) {
        filtName = msg1
      } else {
        filtName = this.deviceNum[0].type
      }
      let village = [JSON.parse(window.localStorage.getItem('currentVillageID')).villageID]
      this.$bus.emit('/map/layerControl', {village: village, devices: filtName, isClickable: true})
    }
  },
  watch: {
    '$route': function (oldVal, newval) {
      if (this.$route.path === '/home/sensor/operation') {
      }
    }
  }
}

</script>
<style scoped>
  .item .topText::before {
    content: '';
    width: 0.05rem;
    height: 60%;
    /*background: #ff0080ab;*/
    position: absolute;
    top: 25%;
    left: 54%;
    margin-left: -0.7rem;
  }
  .lineSmall {
    font-size: 0.3rem;
    color: #fff;
    /*height: auto !important;*/
    width: 50%;
    display: inline-block;
  }
  .cebian {
    /*padding: 0.13rem 0.2rem;*/
    min-width: 66%;
    width: 100%;
    height: .85rem;
    line-height: .85rem;
    /*font-family: 'tsl';*/
    text-align: center;
    color: #FFFFFF;
    font-size: .65rem !important;
    display: inline-block;
    position: relative;
  }
  .item .cebian::before {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin: 0 auto;
    content: '';
    width: 100%;
    height: 1px;
    background:url('../../assets/images/numbg_back_middle.png') no-repeat;
    background-size: 100% 100%;
  }
  .highlight {
    /*background-image: url('../../assets/images/numbg_highlight.svg') !important;*/
    /*background: linear-gradient(to right bottom,rgba(255,255,255,1),rgba(255,255,255,0)),url('../../assets/images/numbg_highlight.svg') no-repeat center;*/
    color: #31F1FE !important;
    /*animation: gradientChange 10s infinite alternate;*/
  }
  .cebian > div {
    padding: 0 0.5rem !important;
  }
  .submenu_active {
    color: rgba(0,190,255,1);
    font-weight: bold;
  }
  .item {
    height: 2.5rem;
    font-size: 0.3rem;
    color: #fff;
    box-sizing: border-box;
    padding: 0 .1rem .3rem .1rem;
    cursor: pointer;
    float: left;
  }
  .item .item_back {
    background:url('../../assets/images/numbg_back.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
  }
  .item .item-title {
    text-align: center;
    line-height: 30px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color:rgba(0,190,255,1);
  }
  /*.operationClass {height:.52rem}*/
  .operationClass .secondClass {position: relative; margin-top: .1rem; width: 100%; background-image: linear-gradient(to right, rgba(14, 79, 97, 0.1), rgba(14, 79, 97, 0.7)); line-height: .52rem; text-align: center; color: #ffff00; font-size: .28rem; border-bottom: 1px solid rgba(14, 79, 97, 1); }
  .operationClass .secondClass p span{font-size: .3rem; }
  .operationClass .secondClass:before{content: ''; width: 4px; height: .34rem; background-color: #ffff00; position: absolute; left: 0; top: .09rem; }
  @media screen and (min-width: 3001px) {
    .topText {
      /* display: table; */
      position: relative;
      display: inline-block;
      height: 100%;
      width: 100% !important;
      line-height: 22px !important;
    }
    .topText > span {
      position: absolute;
      /* display: table-cell; */
      display: inline-block;
      /* width: 100%; */
      vertical-align: middle;
      /* padding-left: 0.4rem; */
      top: 20%;
      box-sizing: border-box;
      padding-left: 0.3rem;
      transform: translateX(-50%);
      text-align: left;
    }
    .lineSmall .item_back{
      display: grid;
      grid-template-rows: 1fr;
      grid-gap: 0.2rem;
      text-align: left;
      grid-template-columns: 0.7fr 0.8fr;
    }
    .item {
      height: 1.8rem;
    }
    .item .cebian::before {
      display: none;
    }
    .item .topText::before {
      content: '';
      width: 0.05rem;
      transform: translateX(-50%);
      height: 60%;
      /*background: #ff0080ab;*/
      position: absolute;
      top: 35%;
      left: 20%;
      margin-left: -0.2rem;
    }
    .operationClass {
      height: 30px;
    }
  }
  @media screen and (min-width: 6001px){
    .item {
      height: 4.8rem;
    }
    .topText {
      height: 2rem;
      line-height: 1rem !important;
    }
    .operationClass .secondClass {
      line-height: 1.32rem;
      font-size: 0.5rem;
    }
    .operationClass .secondClass:before{
      height: 1.35rem;
    }
    .operationClass .secondClass p span {
      font-size: 0.55rem;
    }
    .cebian {
      line-height: 1.8rem;
    }
  }
</style>
