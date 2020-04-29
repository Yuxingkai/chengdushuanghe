<template>
  <pop
    :css="boxwidth"
    :title="titleInfo"
    :level="param.level"
    footer="display:none">
    <div class="search">
      <div>
        <i class="el-icon-search"/>
      </div>
      <input
        @keyup="searchVal($event)"
        placeholder="所有小区"
        type="text">
    </div>
    <div class="mainscrop">
      <div class="container">
        <div
          v-if="communityData.length < 25"
          v-for="(item,index) in communityData"
          :key="index"
          @click="selectTo(item, index)"
          :class="nowsel === index ? 'active' : 'noactive'"
          class="single">
          <div
            class="picture"
            :style="{backgroundImage: 'url(' + item.villagePic + ')', backgroundSize:'cover'}"/>
          <div class="name">{{ item.villageName }}</div>
        </div>
        <div
          v-if="communityData.length > 24"
          v-for="(item,index) in communityData"
          :key="index"
          @click="selectTo(item, index)"
          :class="nowsel === index ? 'active' : 'noactive'"
          class="onlyName">
          {{ item.villageName }}
        </div>
      </div>
    </div>
    <ul
      v-if="false"
      class="village">
      <li
        v-for="item in community"
        :key="item.index"
        @change="select(item)">
        <input
          :id="'checkboxId-'+item.villageID"
          class="btn-checkbox"
          type="radio"
          :value="item.villageID"
          v-model="nowId"
          name="village_input">
        <label :for="'checkboxId-'+item.villageID"><span>{{ item.villageName }}</span></label>
      </li>
    </ul>
    <div
      v-if="false"
      class="confirm"
      @click="village"><span>确定</span></div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
export default {
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'SwitchVillage',
  arr: 1,
  data () {
    return {
      titleInfo: '小区切换',
      boxwidth: 'width: 16rem;',
      community: [],
      communityData: [],
      Village: '',
      nowId: '',
      nowsel: 0
    }
  },
  components: {
    pop
  },
  mounted () {
    this.addInfo()
  },
  methods: {
    searchVal (e) {
      this.communityData = this.community.filter((item) => {
        return item.villageName.indexOf(e.currentTarget.value) !== -1
      })
    },
    selectTo (Village, index) {
      this.nowsel = index
      if (Village) {
        console.log('传值给localStorage  ' + JSON.stringify(Village))
        window.localStorage.setItem('currentVillageID', JSON.stringify(Village))
        let gConfig = JSON.parse(window.localStorage.getItem('webGlobalConfig'))
        let mapConfig = gConfig
        mapConfig.villageInfos = []
        let villageLocal = JSON.parse(JSON.stringify(Village))
        mapConfig.villageInfos.push(villageLocal)

        this.$bus.emit('/home/webGlobalConfig', {
          config: mapConfig
        })
        window.localStorage.setItem('currentWebGlobalConfig', JSON.stringify(mapConfig))
        location.reload(setTimeout(() => {
          this.$router.push({
            path: '/home/trend/allState'
          })
        }, 200))
      } else {
        console.log('************')
      }
    },
    addInfo () {
      this.community = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      this.communityData = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      this.community.find((item, index) => {
        if (item.villageID === this.param.e.titleID) {
          this.nowId = this.param.e.titleID
          this.nowsel = index
        }
      })
    },
    // old methods
    select (e) {
      this.Village = e
    },
    village () {
      if (this.Village) {
        console.log('传值给localStorage  ' + JSON.stringify(this.Village))
        window.localStorage.setItem('currentVillageID', JSON.stringify(this.Village))
        let gConfig = JSON.parse(window.localStorage.getItem('webGlobalConfig'))
        let mapConfig = gConfig
        mapConfig.villageInfos = []
        let villageLocal = JSON.parse(JSON.stringify(this.Village))
        mapConfig.villageInfos.push(villageLocal)

        this.$bus.emit('/home/webGlobalConfig', {
          config: mapConfig
        })
        window.localStorage.setItem('currentWebGlobalConfig', JSON.stringify(mapConfig))

        location.reload(setTimeout(() => {
          this.$router.push({
            path: '/home/trend/allState'
          })
        }, 200))
      } else {
        console.log('************')
      }
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar{width:0px;background-color: transparent}
.village{display: block;padding: .54rem .92rem;box-sizing:border-box;height: 6.8rem;overflow-y: scroll}
.village li{width: 50%;display:inline-block;border: 1px solid #071225;box-sizing: border-box}
.village li:hover{border: 1px solid #1592e6;box-sizing: border-box}
.btn-checkbox{position:absolute;display:none}
.btn-checkbox+label{position:relative;top:.1rem;padding: .12rem 0 .3rem 1rem;display:flex;font-weight: bold;cursor: pointer;font-size: .28rem;}
.btn-checkbox+label:before{content:'';position:absolute;top:.13rem;left:.4rem;display:block;width:.3rem;height:.3rem;background: url("../../../assets/images/components/noSwitch.svg") no-repeat;}
.btn-checkbox+label:after{content:'';position:absolute;top:.13rem;left:.4rem;display:none;width:.3rem;height:.3rem;background: url("../../../assets/images/components/Switching.svg") no-repeat;}
.btn-checkbox:checked+label:after{display:block}
.confirm{margin-top: 1.2rem;padding: .23rem 0;text-align: center;width:100%;cursor: pointer;}
.confirm>span{padding: .23rem 1.1rem;background-image: linear-gradient(to top, #a4e8fcb8 0%, #0edffab8 100%);font-size: .32rem;}
.search {
  width: 4.9rem;
  height: .64rem;
  border: 1px solid #00beff;
  line-height: .64rem;
  margin: .2rem 0 0 .2rem;
}
.search div {
  width: 8%;
  float: left;
  padding-left: 2%;
}
.search .el-icon-search {
  color: #00beff;
}
.search input {
  background: none;
  border: none;
  width: 90%;
  height: 100%;
  color: white;
  float: left;
}
.mainscrop {
  overflow: hidden;
  height: 5rem;
  margin-bottom: .05rem;
}
.container {
  width: 105%;
  height: 5.4rem;
  overflow: scroll;
  padding:0 1% .5rem 1%;
  box-sizing: border-box;
  margin-bottom: .5rem;
}
.container .single {
  width: 4.5rem;
  height: 1.54rem;
  border-radius: 2px;
  margin: .2rem 0;
  padding: .2rem;
  margin-left: .25rem;
  cursor: pointer;
  float: left;
}
.container .noactive {
  border: 1px solid #009fe873;
}
.container .active {
  border: 1px solid #009fe8;
}
.container .single:nth-child(3n+1){
  margin-left: 0rem;
}
.container .single .picture {
  width: 2.26rem;
  height: 1.5rem;
  float: left;
  border: .04rem solid white;
}
.container .single .name {
  width: 1.92rem;
  height: 1.58rem;
  float: left;
  line-height: .5rem;
  margin-left: .2rem;
  word-wrap: break-word;
}
.container .onlyName {
  width: 4.9rem;
  height: .8rem;
  border-radius: 1px;
  margin-left: .25rem;
  margin-top: .2rem;
  line-height: .8rem;
  text-align: center;
  float:left;
  cursor: pointer;
}
.container .onlyName:nth-child(3n+1){
  margin-left: 0rem;
}
</style>
