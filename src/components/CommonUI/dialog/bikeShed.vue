<template>
  <pop
    :css="boxwidth"
    :title="alarmName"
    :level="param.level"
    footer="display:none">
    <div class="bikeShed">
      <boxTitle
        title="基础信息"
        css="font-size:.32rem"/>
      <Box3 css="">
        <div class="bikeShed_content">
          <div class="bikeImg">
            <Box3 css="">
              <img src="../../../assets/images/bikeShed.jpg">
            </Box3>
          </div>
          <ul class="deviceInfo">
            <li><p>车棚名称：</p><span>{{ listName }}</span></li>
            <li><p>车棚类型：</p><span>{{ listType }}</span></li>
            <li><p>监控位置：</p><span>{{ listAddress }}</span></li>
          </ul>
        </div>
      </Box3>
      <div class="bikeShed_button">
        <div
          @click="viewClick"
          class="button">
          <Box3 css="box-sizing: border-box;padding:1px;">
            <span class="button_span">查看监控</span>
          </Box3>
        </div>
      </div>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'
export default {
  name: 'BikeShed',
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
      boxwidth: 'width:18.4rem;',
      alarmName: '非机动车棚信息',
      listName: this.param.e.name,
      listType: '地上',
      listAddress: ''
    }
  },
  methods: {
    viewClick () {
      // let listCameraInfo = []
      // let list = this.param.e.cameras
      // list.forEach((item) => {
      //   listCameraInfo.push({
      //     deviceID: item.deviceID,
      //     name: item.name
      //   })
      // })
      window.pop.show({
        level: 2,
        component: () => import('../../CommonUI/dialog/viewTV'),
        param: {
          level: 2,
          e: this.param.e
        }
      })
    }
  },
  components: {
    pop,
    boxTitle
  },
  mounted () {
    console.log(this.param, 'param')
    let arr = this.param.e.cameras
    let listInfo = ''
    for (let i = 0; i < arr.length; i++) {
      if (i === (arr.length - 1)) {
        listInfo += arr[i].name
      } else {
        listInfo += arr[i].name + '、'
      }
    }
    this.listAddress = listInfo
  }
}
</script>

<style scoped>
.bikeShed{
  padding:.3rem .48rem;
  box-sizing: border-box;
}
.bikeShed_content {
  box-sizing: border-box;
  padding:.4rem .6rem;
  display: flex;
}
.bikeShed_content .bikeImg {
  width: 3.7rem;
  height: 3.3rem;
  box-sizing: border-box;
  padding: .1rem;
}
.bikeShed_content .bikeImg img{
  width: 100%;
  height: 100%;
}
.bikeShed_content .deviceInfo {
  flex: 1;
  padding-left: .8rem;
  box-sizing: border-box;
  padding-right: 1rem;
}
.bikeShed_content .deviceInfo li{
  line-height: .8rem;
  font-size: .38rem;
}
.bikeShed_content .deviceInfo li p{
  display: inline-block;
  color: #A4EDFC;
}
.bikeShed_button {
  overflow: hidden;
}
.button {
  font-size: .38rem;
  line-height: .8rem;
  width: 2.6rem;
  height: .9rem;
  text-align: center;
  float: right;
  margin-top: .3rem;
  cursor: pointer;
}
.button .button_span {
  display: inline-block;
  background: #31F1FE;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
</style>
