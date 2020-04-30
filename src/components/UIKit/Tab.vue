<template>
  <div >
    <div
      class="tabs yw_left"
      :style="css">
      <div
        class="tabs-bar"
        :class="styleClass">
        <div
          :class="tabCls(item)"
          v-for="(item,index) in navList"
          :key="index"
          @click="handleChange(index)">
          <div>
            <b/>
            <span/>
            <p :style="padding">{{ item.title }}</p>
          </div>
        </div>
      </div>
      <div class="tabs-content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: [],
      styleClass: 'style1',
      currentValue: this.value
    }
  },
  props: {
    value: {
      type: [String],
      default: ''
    },
    currentIndex: {
      type: [String],
      default: ''
    },
    type: {
      type: [String],
      default: '1'
    },
    css: {
      type: [String],
      default: ''
    },
    padding: {
      type: [String, Number, Object],
      default: ''
    }
  },
  mounted () {
    this.boxstyle()
  },
  methods: {
    getTabs: function () {
      return this.$children
    },
    updateNav () {
      this.navList = []
      let _this = this
      this.getTabs().forEach(function (pane, index) {
        _this.navList.push({
          title: pane.title,
          name: pane.name || index
        })
        if (!pane.name) {
          pane.name = 'tabPanel' + index
        }
        if (index === 0) {
          if (!_this.currentValue) {
            _this.currentValue = pane.name || index
          }
        }
      })
      this.updateStatus()
    },
    updateStatus () {
      let tabs = this.getTabs()
      let _this = this
      tabs.forEach(function (tab) {
        tab.show = (tab.name === _this.currentValue)
      })
    },
    tabCls: function (item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    handleChange: function (index) {
      let nav = this.navList[index]
      let name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      this.$emit('pass-index-choose', index)
    },
    boxstyle: function () {
      let a = this.type
      this.styleClass = 'style' + a
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue: function () {
      this.updateStatus()
    }
  }
}
</script>

<style scoped>
[v-hide] {
  display: none;
}

.tabs {
  font-size: .28rem;
  color: #657180;
}
.tabs-bar {
  text-align: center;
}
.tabs-bar:after {
  content: '';
  display: block;
  width: 100%;
  height: .02rem;
  margin-top: -.02rem;
}
.yw_left b {
  width: 100%;
  height: .054rem;
  display: inline-block;
  background: #31f1fe;
  position: absolute;
  left: 0;
  top: 0;
}
.tabs-tab {
  display: inline-block;
  border: none;
  cursor: pointer;
  color: #a8e4e9;
  overflow: hidden;
  padding: 0 .39rem 0 .14rem;
  position: relative;
  margin-right: -.2rem;
}
.yw_left .tabs-tab:last-of-type{
  margin-right: 0;
}
.tabs-tab div {
  width: 100%;
  padding: 0 .12rem;
  transform: skew(25deg);
  background: #355d6b;
}
.tabs-tab div p {
  transform: skew(-25deg);
}
.tabs-tab span {
  display: none;
}
.tabs-tab span {
  width: .5rem;
  height: 1rem;
  background: #355d6b;
  display: none;
  position: absolute;
  top: -.1rem;
  border: none;
  transform: rotate(-15deg);
  -ms-transform: rotate(-15deg); /* IE 9 */
  -moz-transform: rotate(-15deg); /* Firefox */
  -webkit-transform: rotate(-15deg); /* Safari 和 Chrome */
  -o-transform: rotate(-15deg); /* Opera */
}
.style1 .tabs-tab:nth-of-type(1){

}
.style1 .tabs-tab span:nth-of-type(1) {
  left: -.4rem;
}
.tabs-bar > div:nth-of-type(1) span {
  display: block;
}
.tabs-tab-active div {
  color: #05fff5;
  background: #419bd6;
}
.tabs-tab-active div span {
  background: #419bd6;
}
.tabs-tab-active:before {
  content: '';
  display: block;
  height: .02rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.tabs-content {
  padding: .16rem 0;
}
.tabs-tab p {
  line-height: 27px;
  margin: 0;
}

.style2 .tabs-tab div {
  width: 100%;
  padding: 0 .2rem;
  transform: skew(0deg);
  background: #355d6b;
  position: relative;
}
.style2 .tabs-tab div p {
  transform: skew(0deg);
}
.style2 .tabs-tab div span {
  display: block;
  width: .1rem;
  height: 1rem;
  background: #5691a3;
  position: absolute;
  right: .2rem;
  top: 50%;
  transform: translateY(-50%);
}
.style2 .tabs-tab {
  display: inline-block;
  border: none;
  cursor: pointer;
  color: #a8e4e9;
  overflow: hidden;
  padding: 0 .38rem 0 .14rem;
  position: relative;
}
.style2 .tabs-tab-active div {
  color: #00f5ff;
}
.style2 .tabs-tab-active div span {
  background: #ff7400;
}

.style3{
  border-bottom: 1px solid rgba(0,190,255,.5);
  height: .74rem;
  position: relative;
  text-align: left;
  box-sizing: border-box;
  padding-left: .2rem;
}

.style3::after{
  content: '';
  width: 2px;
  height: 2px;
  position: absolute;
  left: 0;
  bottom: -1px;
  background-color: rgba(0,190,255,1);
}

.style3::before{
  content: '';
  width: 2px;
  height: 2px;
  position: absolute;
  right: 0;
  bottom: -1px;
  background-color: rgba(0,190,255,1);
}

.style3 .tabs-tab div {
  /*width: 1.38rem;*/
  padding: 0 .3rem;
  transform: skew(0deg);
  background-color: transparent;
  background-size: 100% 100%;
  box-sizing: border-box;
  color: #fff;
  position: relative;
  /*background: url("../../assets/images/tab.png") no-repeat center;*/
}
.style3 .tabs-tab div p {
  transform: skew(0deg);
  text-align: center;
  line-height: .62rem;
}
.style3 .tabs-tab div span {
  display: none;
  width: .1rem;
  height: 1rem;
  background: #5691a3;
  position: absolute;
  right: .2rem;
  top: 50%;
  transform: translateY(-50%);
}
.style3 .tabs-tab {
  display: inline-block;
  border: none;
  cursor: pointer;
  color: rgba(0,190,255,.6);
  overflow: hidden;
  padding: 0 ;
  position: relative;
  margin-right: 0;
  margin-left: .1rem;
}
.style3 .tabs-tab:nth-of-type(1) {
  padding: 0 ;
  margin-left: 0;
}
.style3 .tabs-tab b{
  display: none;
}
.style3 .tabs-tab .tabs-tab-active span{
  display: none;
}
.style3 .tabs-tab-active div {
  /*color: #00f5ff;*/
  color: #fff;
  opacity:.7;
  border-left: 1px solid rgba(0,190,255,.5);
  border-right: 1px solid rgba(0,190,255,.5);
  background:linear-gradient(180deg,#029cf7 0%,#074274 100%);
  /*background: url("../../assets/images/tabActive.png") no-repeat center;*/
  /*background-size: 100% 100%;*/
}
.style3 .tabs-tab-active div span {
  display: none;
  background: #ff7400;
}
@media screen and (min-width: 6001px) {
  .style3 {
    height: 1.14rem;
  }
  .style3 .tabs-tab div p{
    line-height: 1rem;
  }
}
</style>
