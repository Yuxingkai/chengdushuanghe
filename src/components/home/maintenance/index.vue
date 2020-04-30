<template>
  <div class='operation'>

    <happy-scroll
      resize
      style=""
      size='2'
      class="happy-scroll_1">
      <div
        style="display:grid;grid-template-rows:1fr 1fr 1fr 1fr 1fr 4px;box-sizing:border-box;height:100%;display: none"
        class="content">
        <!-- 预警总体比例 -->
        <Box3 css=''>
          <p class="echartTitle sliderTilSmall">所有设备以及数量</p>
          <echart config='yw_scatter'/>
        </Box3>
        <Box3 css='rem'>
          <echart config='yw_bar'/>
        </Box3>
        <!-- are图 -->
        <Box3 css=''>
          <echart config='yw_are' />
        </Box3>
        <!-- 矢量图 -->
        <Box3 css=''>
          <echart
            config='yw_sl_bar'
            ref="sl" />
        </Box3>
        <!-- 折线图 -->
        <Box3 css='rem'>
          <RadioGroup
            items="当日,本周,本月"
            css="position: absolute;top:0;right:0;z-index:999;"/>
          <echart config='yw_line_bottom'/>
        </Box3>
      </div>

    </happy-scroll>
    <div style="color: #fff;grid-column: 2;height: 100%;box-sizing: border-box;padding-bottom: 0.06rem;">
      <Box3 css="padding:5px">
        <Map/>
      </Box3>
    </div>
    <div style="color:#fff;grid-column:3;display:grid;grid-template-rows:auto 1fr;height: 100%;box-sizing: border-box;padding-bottom: 0.06rem;display: none">
      <div class="line"/>
      <Box3 css="padding:4px 0;box-sizing:border-box;">
        <box1
          :title="msg"
          css="padding-top:5px;border-top:0"/>
        <div class="right_main">
          <Tab :padding="fontPadding">
            <TabItem title="已处理">
              <transition
                name="animate"
                mode="out-in">
                <div class="tab_div">
                  <ul>
                    <li
                      v-for="(item,index) in proceInfo"
                      :key="item.id"
                      @click="addClass1(index)"
                      :class="{'hov': index === current1}">
                      <p>12-12 &nbsp;&nbsp;15:42</p>
                      <div>
                        <p><span/>{{ item.test }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </TabItem>
            <TabItem title="未处理">
              <transition
                name="animate"
                mode="out-in">
                <div class="tab_div">
                  <ul>
                    <li
                      v-for="(item,index) in noProce"
                      :key="item.id"
                      @click="addClass2(index)"
                      :class="{'hov': index === current2}">
                      <p>12-12 &nbsp;&nbsp;15:42</p>
                      <div>
                        <p><span/>{{ item.test }}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </transition>
            </TabItem>
          </Tab>
        </div>
      </Box3>
    </div>
  </div>
</template>

<script>
let schedule = require('node-schedule')
export default {
  name: 'Maintenance',
  data () {
    return {
      msg: '监控设备报警',
      currentTab: 0,
      current1: 0,
      current2: 0,
      proceInfo: [
        { test: '道路55-57号东区7-27（4）' },
        { test: '道路55-57号东区7-27（4）' }
      ],
      noProce: [
        { test: '道路15-27号东区9-27（7）' },
        { test: '道路15-37号东区9-27（8）' }
      ],
      fontPadding: {
        padding: '0.1rem 1.22rem',
        fontSize: '.44rem'
      }
    }
  },
  methods: {
    addClass1: function (index) {
      this.current1 = index
    },
    addClass2: function (index) {
      this.current2 = index
    },
    winWidth: function () {
      let wWidth = document.documentElement.clientWidth
      if (wWidth > 3000) {
        this.fontPadding.padding = '0.1rem 2.52rem'
      }
    }
  },
  mounted () {
    this.winWidth()
    /**
     * 运维部分矢量图
     */
    let $sl = this.$refs.sl
    function checkTime (i) {
      if (i < 10) {
        i = '0' + i
      }
      return i
    }
    function randomData () {
      let value = Math.random() * 50
      return {
        value: Math.round(value)
      }
    }
    function timeSet () {
      let newTime = new Date()
      let m = newTime.getMinutes()
      let s = newTime.getSeconds()
      m = checkTime(m)
      s = checkTime(s)
      return [m, s].join(':')
    }
    let data1 = []
    let timeData1 = []
    for (let i = 0; i < 9; i++) {
      timeData1.unshift(timeSet())
      data1.unshift(randomData())
    }
    let key = 0
    // 定时器每秒执行一次
    let rule = new schedule.RecurrenceRule()
    let time = []
    for (let i = 1; i < 60; i++) {
      time.push(i)
    }
    // 每分钟执行一次
    rule.second = time
    schedule.scheduleJob(rule, function () {
      timeData1.shift()
      timeData1.push(timeSet())
      data1.shift()
      data1.push(randomData())
      // 颜色控制
      key = (key === 1) ? 0 : 1
      $sl.option.series[0].data = data1
      $sl.option.xAxis.data = timeData1
      $sl.refresh()
    })
  },
  components: {},
  watch: {
    $route (to, from) {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operation{
  /*display: grid;grid-template-columns: 9.5rem 1fr 9.5rem;padding: 0 5px;grid-column-gap: 10px;box-sizing: border-box;*/
  display: grid;grid-template-columns: 0 1fr 0;padding: 0 5px;grid-column-gap: 10px;box-sizing: border-box;
}
.happy-scroll_1{
  width:9.5rem;height: auto;box-sizing: border-box;
}
.right_main .tabs .tabs-tab div p{

}
.content > div {
  box-sizing: border-box;
}
.right_main {
  margin: 10px auto;
}
.tab_div {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  font-size: 14px;
  color: #ffffff;
  text-align: left;
  margin: 0 auto;
}
.tab_div li {
  margin-bottom: 10px;
  font-size: .4rem;
}
.tab_div li > p {
  box-sizing: border-box;
  margin: 3px 0 3px 17px;
  padding-left: 10px;
  position: relative;
}
.tab_div li > p::before {
  content: "";
  width: 1px;
  height: 12px;
  position: absolute;
  left: 0;
  top: 55%;
  transform: translateY(-50%);
  background: red;
}
.tab_div li div {
  width: 100%;
  height: .8rem;
  line-height:.8rem;
  background: url(../../../assets/images/test_01.png) no-repeat left center,
    url(../../../assets/images/test_02.png) no-repeat right center;
  background-size: 0.18rem 100%;
  box-sizing: border-box;
  padding: 0 7px;
  cursor: pointer;
}
.tab_div li div p {
  display: inline-block;
  margin: 0;
  background: #01526f;
  width: 100%;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-sizing: border-box;
  padding: 0 7px;
}
.tab_div li.hov div {
  background: url(../../../assets/images/group_01.png) no-repeat left center,
    url(../../../assets/images/group_02.png) no-repeat right center;
  background-size: 0.18rem 100%;
}

.tab_div li.hov div p {
  background: #00eeff;
}
.tab_div li div span {
  display: inline-block;
  margin: 0 6px 0 4px;
  width: 5px;
  height: 5px;
  background: red;
  transform: rotate(-45deg) translateY(-4px);
  -ms-transform: rotate(-45deg) translateY(-4px); /* IE 9 */
  -moz-transform: rotate(-45deg) translateY(-4px); /* Firefox */
  -webkit-transform: rotate(-45deg) translateY(-4px); /* Safari 和 Chrome */
  -o-transform: rotate(-45deg) translateY(-4px); /* Opera */
}
.line {
  width: 100%;
  height: 0.066rem;
  background: #31f1fe;
  margin-bottom: 0.1rem;
}
.animate-enter {
  transition: all 0.3s ease;
}
.animate-enter,
.animate-leave-active {
  opacity: 0;
}
.animate-enter {
  transform: translateX(-10rem);
}
.animate-leave-active {
  transform: translateX(10rem);
}
@media screen and (min-width: 3001px) {
  .operation{
    /*grid-template-columns: 14.6rem 1fr 14.6rem;*/
  }
  .happy-scroll_1{
    width:14.6rem;
  }
}
</style>
