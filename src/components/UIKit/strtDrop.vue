<template>
  <div
    class="choose"
    style="display: block;">
    <ul>
      <li style="position: relative">
        <div @click.stop="focus">
          <input
            @keyup="searchVal($event)"
            class="canInput"
            type="text"
            style="text-indent: .5rem"
            placeholder="请搜索">
          <i
            style="position: absolute;top: .15rem;right: .2rem"
            class="el-icon-search"/>
        </div>
      </li>
      <li
        v-if="noSearchData"
        style="padding-left: 1rem;width:4.8rem">没有对应小区</li>
      <li
        v-if="allxiaoqu"
        style="width:4.8rem">
        <input
          id="all"
          class="btn-checkbox"
          type="checkbox"
          value="all"
          v-model="allfil"
          @change="handleChangeall">
        <label for="all"><span>所有小区</span></label>
      </li>
      <li
        style="width: 4.8rem"
        v-for="item in villageNameData"
        :key="item.index">
        <input
          :id="'checkboxId'+item.villageID"
          class="btn-checkbox"
          type="checkbox"
          :value="item.villageID"
          v-model="fil"
          @change="handleChange">
        <label :for="'checkboxId'+item.villageID"><span>{{ item.villageName }}</span></label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StrDrop',
  data () {
    return {
      fil: [],
      allfil: null,
      villageNameData: [],
      noSearchData: false,
      allxiaoqu: true
      // villageName: []
    }
  },
  // props: ['villageName', 'nowsel'],
  props: {
    villageName: {
      type: [Object, Array],
      default: () => {
        return []
      }
    },
    nowsel: {
      type: [Object, Array],
      default: () => {
        return []
      }
    }
  },
  created () {
  },
  methods: {
    searchVal (e) {
      this.villageNameData = this.villageName.filter((item) => {
        return item.villageName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.villageNameData.length === 0) {
        this.noSearchData = true
        this.allxiaoqu = false
      } else if (this.villageNameData.length < this.villageName.length) {
        this.allxiaoqu = false
        this.noSearchData = false
      }
      if (this.villageNameData.length === this.villageName.length) {
        this.allxiaoqu = true
        this.noSearchData = false
      }
    },
    focus () {
      console.log('wqw')
    },
    handleChangeall () {
      if (this.allfil) {
        this.fil = this.villageName.map(item => {
          return item.villageID
        })
        this.$emit('changestyle', this.fil)
      } else {
        this.fil = []
        this.$emit('changestyle', this.fil)
      }
    },
    handleChange () {
      if (this.fil.length === this.villageName.length) {
        this.allfil = true
      } else {
        this.allfil = false
      }
      this.$emit('changestyle', this.fil)
    },
    function () {
      console.log()
    }
  },
  mounted: function () {
    this.villageNameData = this.villageName
    this.fil = this.nowsel
    if (this.fil.length === this.villageName.length) {
      this.allfil = true
    } else {
      this.allfil = false
    }
    // this.villageName = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
  }
}
</script>

<style scoped>
  .choose{position: absolute;right: .11rem; background: #0e1937; z-index:50000; cursor: pointer; }
  .choose h3 {background: #347ed587; border-radius: .02rem; min-width: 2.4rem; padding:.08rem .2rem .08rem .1rem; height: .5rem; line-height: .5rem; font-weight: normal; font-size: .32rem; color: #befefe; text-align: center; z-index: 5; }
  .choose h3.active ul{background: #0a2239; }
  .choose h3:after {border: solid transparent; content: ''; right: 6%; top: .28rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-right-color: #31f1fe; }
  .choose h3.active:after{border: solid transparent; content: ''; right: 6%; top: .3rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-top-color: #31f1fe; }
  .choose ul {text-align: center; overflow: hidden; }
  .choose ul li{color: #befefe; font-size: .3rem; background: #102044; margin-top: .14rem; line-height: .55rem; border-left: 1px solid #3cc3ff; border-right: 1px solid #3cc3ff; box-sizing: border-box; text-align: left; }
  .choose ul li span{position: relative; top:-.1rem }
  .choose ul li .btn-checkbox{position:absolute;display:none}
  .choose ul li .btn-checkbox+label{position:relative;top:.1rem;padding-left: 1.2rem;display:flex;}
  .choose ul li .btn-checkbox+label:after{position:absolute;top:.1rem;left:.55rem;display:none;width:.16rem;height:.08rem;content:'';border-bottom:.02rem solid #fff;border-left:.02rem solid #fff;box-sizing:border-box;transform:rotate(-46deg)}
  .choose ul li .btn-checkbox+label:before{position:absolute;display:block;width:.2rem;height:.2rem;content:'';border:1px solid silver;top:.03rem;left: .5rem;border-radius:.03rem;background:#3e97eb;border:1px solid rgba(45, 245, 243, 0.5)}
  .choose ul li .btn-checkbox:checked+label:after{display:block}
  @media screen and (min-width: 3001px) {
    .choose h3{
      font-size: .42rem;
      padding: .22rem .6rem .2rem .5rem;
    }
    .choose ul li{
      font-size: .4rem;
    }
    .choose h3:after{
      border-width:.13rem
    }
    .choose h3.active:after{
      border-width:.13rem
    }
  }
  .canInput{
    background: none;
    width: 100%;
    height: 100%;
    border: none;
    color: white;
  }
</style>
