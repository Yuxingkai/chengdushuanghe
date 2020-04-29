<template>
  <div class="fire">
    <!-- type=1  可接受参数 color代表中间颜色 -->
    <div
      class="item"
      v-if='showOff1'
      :style="{padding:padding,margin:margin}">
      <div>
        <div class="fl">
          <div class="item-1"/>
          <div class="item-2">{{ title }}</div>
        </div>
        <div class="fl">
          <div class="item-3 item-6"/>
          <div
            class="item-4"
            :style='{backgroundColor:color}'>
            <div class="item-4-1 l"/>
            <div class="content">{{ num }}</div>
            <div class="item-4-1 r"/>
          </div>
          <div class="item-3 item-5"/>
        </div>
      </div>
    </div>

    <div
      class="infoLabel2"
      v-if='showOff2'>
      <div class="line"/>
      <div
        style="text-align:justify;text-justify:distribute-all-lines;text-align-last:justify;font-weight: bold;"
        class="center">{{ title }}</div>
      <div
        style="text-align:center;"
        class="bottom">{{ num }}</div>
    </div>

    <div
      class="tslabel"
      v-if="showOff3">
      <div
        class="box1"
        :style="{borderTop:`8px solid rgba(${bgColor},.8)`}"/>
      <div
        class="box2"
        :style="{backgroundColor:`rgba(${bgColor},.7)`}"/>
      <div
        class="box3"
        :style="{backgroundColor:`rgba(${bgColor},.5)`}"/>
      <div
        class="a"
        :class="{ 'firfoxHeight' : wipe === true}"
        :style="{background:`-webkit-linear-gradient(left,rgba(${bgColor},.6), transparent)`}">
        <p
          class="top sliderTilSmall"
          :style="{fontSize:textSize}">{{ title }}</p>
        <!--<p :style="{backgroundImage:`-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)),to(rgba(${bgColor},1))`}"-->
        <p
          :style="{backgroundImage:`-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)),to(rgba(255, 255, 255, 1))`}"
          class="bottom sliderTilSmall">{{ num }}</p>
      </div>
    </div>
    <!-- type=4 中空 色调较亮 -->
    <div
      class="item"
      v-if='showOff4'>
      <div>
        <div class="fl">
          <div class="item-1"/>
          <div class="item-2">{{ title }}</div>
        </div>
        <div class="fl">
          <div class="bot">
            <div>
              {{ num }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- type=5 线条较细 -->
    <div
      class="lineSmall item clear"
      v-if='showOff5'>
      <!-- <div class="fl  slideTop"> -->
      <div
        class="item-title topText textCon"
        :title="title">
        <span>{{ title }}</span>
      </div>
      <!-- </div> -->
      <div
        :class="{'highlight': isRoll}"
        class="cebian sliderTilSmall">{{ num | numSp }}</div>
    </div>
    <div
      class="infoLabel3"
      v-if='showOff6'>
      <div class="line fl1"/>
      <div
        style=""
        class="center fl1">{{ title }}</div>
      <div
        style="text-align:center;"
        class="bottom fl1">{{ num }}</div>
    </div>
    <div
      class="tslabel"
      v-if="showOff7">
      <div
        class="box1"
        :style="{borderTop:`8px solid rgba(${bgColor},.8)`}"/>
      <div
        class="box2"
        :style="{backgroundColor:`rgba(${bgColor},.7)`}"/>
      <div
        class="box3"
        :style="{backgroundColor:`rgba(${bgColor},.5)`}"/>
      <div
        class="a"
        :style="{background:`-webkit-linear-gradient(left,rgba(${bgColor},.6), transparent)`}">
        <p
          class="top sliderTit"
          :style="{fontSize:textSize}">{{ title }}</p>
        <!--<p :style="{backgroundImage:`-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)),to(rgba(${bgColor},1))`}" class="bottom navTitSmall">{{num | numSp}}</p>-->
        <p
          :style="{backgroundImage:`-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255, 255, 255, 1)),to(rgba(255, 255, 255, 1))`}"
          class="bottom navTitSmall">{{ num | numSp }}</p>
      </div>
    </div>
  </div>
</template>
<script>
// import { TweenLite } from 'gsap/TweenMax'
export default {
  name: 'InfoLabel',
  data () {
    return {
      showOff1: false,
      showOff2: false,
      showOff3: false,
      showOff4: false,
      showOff5: false,
      showOff6: false,
      showOff7: false,
      tweenedNumber: 0,
      isRoll: false,
      wipe: false
    }
  },
  props: {
    title: {
      type: [String],
      default: ''
    },
    num: {
      type: [String, Number],
      default: ''
    },
    bgColor: {
      type: [String],
      default: '0,210,255'
    },
    padding: {
      type: [String],
      default: ''
    },
    margin: {
      type: [String],
      default: ''
    },
    css: {
      type: [String],
      default: ''
    },
    textSize: {
      type: [String],
      default: '0.4rem'
    },
    numSize: {
      type: [String],
      default: '0.4rem'
    },
    type: {
      type: [String],
      default: ''
    },
    color: {
      type: [String],
      default: 'rgba(52, 213, 207, 0.8)'
    }
  },
  mounted: function () {
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    if (!this.type) {
      this.showOff1 = true
    } else if (this.type === '1') {
      this.showOff1 = true
    } else if (this.type === '2') {
      this.showOff2 = true
    } else if (this.type === '3') {
      this.showOff3 = true
    } else if (this.type === '4') {
      this.showOff4 = true
    } else if (this.type === '5') {
      this.showOff5 = true
    } else if (this.type === '6') {
      this.showOff6 = true
    } else if (this.type === '7') {
      this.showOff7 = true
    }
  },
  computed: {
    // numInfo: function () {
    //   return this.tweenedNumber ? this.tweenedNumber.toFixed(0) : 0
    // }
  },
  watch: {
    // num (newValue, oldValue) {
    //   TweenLite.from(this.$data, 1, { tweenedNumber: Math.ceil(oldValue) })
    //   TweenLite.to(this.$data, 2, { tweenedNumber: newValue })
    //   console.log(this.num, this.numInfo, '909')
    //   this.isRoll = true
    //   setTimeout(() => {
    //     this.isRoll = false
    //   }, 3000)
    // }
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
  height: auto !important;
}
.cebian {
  /*padding: 0.13rem 0.2rem;*/
  min-width: 66%;
  width: 2rem;
  height: 1rem;
  line-height: 1rem;
  font-family: 'tsl';
  text-align: center;
  color: #ecff07;
  font-size: .5rem !important;
  margin-bottom: 0.2rem;
  display: inline-block;
  background-image: url('../../assets/images/numbg_normal.svg') !important;
  background-size: 100% 100% !important;
  /* background-size: cover cover; */
  background-position: center center !important;
  background-repeat: no-repeat !important;
}
.highlight {
  background-image: url('../../assets/images/numbg_highlight.svg') !important;
  color: red !important;
}
.cebian > div {
  padding: 0 0.5rem !important;
}
.bot2 {
  /* padding:0 0.2rem; */
  background: url('../../assets/images/small-1.svg') center center no-repeat !important;
  background-size: cover cover;
  padding: 0 !important;
  float: left;
  font-family: 'tsl' !important;
}
.bot2 > div {
}
.lineSmall .item-2 {
  text-align: right !important;
}
.bot {
  width: 70%;
  text-align: center;
  margin-top: 2px;
  padding: 0 0.1rem;
  /* background: url('../../assets/images/small-1.svg') center center no-repeat; */
  background-size: 100% 100%;
}
.bot > div {
  width: 78%;
  margin: auto;
  height: 100%;
  line-height: 29px;
  border-left: none !important;
  border-right: none !important;
}
.item {
  height: 50px;
  font-size: 0.3rem;
  color: #fff;
}
.item .fl > div {
  float: left;
}
.item .fl {
  clear: both;
  overflow: hidden;
  /* display: inline-block; */
  margin-bottom: 1px;
}
.item .item-2 {
  width: 40px;
  height: 20px;
  max-width: 40px;
  line-height: 20px;
  text-align: justify;
  text-align-last: justify;
  margin-left: 7px;
}
.item .item-1 {
  width: 2px !important;
  margin-top: 4px;
  height: 12px;
  padding-left: 4px;
  background-clip: content-box;
  background-color: #ff0080;
}
.item .item-title {
  text-align: center;
  line-height: 20px;
  width: 80%;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.item .item-title::before {
  content: '';
  width: 0.04rem;
  height: 60%;
  /*background: #ff0080ab;*/
  position: absolute;
  top: 25%;
  left: 54%;
  margin-left: -0.8rem;
}
.item .item-4 {
  position: relative;
  width: 51px;
  height: 27px;
  box-sizing: border-box;
  line-height: 27px;
  text-align: center;
  background-clip: content-box;
  /* background-color: rgba(52, 213, 207, 0.8); */
}
.item .item-4 .item-4-1 {
  position: absolute;
  text-align: center;
}
.item .item-3,
.item .item-4-1 {
  height: 18px;
  background-clip: content-box;
  width: 0;
  margin-top: 2px;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}
.item .item-4-1 {
  height: 20px;
  top: 0;
}
.item .l {
  left: 0;
  border-left: 3px solid rgb(12, 29, 50);
}
.item .r {
  right: 0;
  z-index: 999;
  border-right: 3px solid rgb(12, 29, 50);
}
.item .item-5 {
  border-right: 3px solid rgba(52, 213, 207, 0.8);
}
.item .item-6 {
  border-left: 3px solid rgba(52, 213, 207, 0.8);
}
/* infoLabel2样式 */
.infoLabel2 .line {
  width: 0;
  height: 15px;
  border-left: solid 1px #ff0080;
  margin-top: 2px;
  margin-left: 8px;
}
.infoLabel2 div {
  font-size: 10px;
  color: #fff;
}
.infoLabel2 {
  width: 60px;
  display: grid;
  grid-template-columns: 10px 40px;
}
.infoLabel2 .center {
  grid-column: 2/4;
  padding-left: 5px;
  box-sizing: border-box;
}
.infoLabel2 .bottom {
  grid-column: 1/4;
  text-align: center;
  padding-top: 5px;
  font-size: 0.39rem;
}
/* infoLabel3样式 */
.infoLabel3 .line {
  width: 0;
  height: 0.3rem;
  border-left: solid 1px #ff0080;
  margin-top: 0.04rem;
  margin-left: 0.16rem;
}
.infoLabel3 div {
  font-size: 0.2rem;
}
.infoLabel3 {
  display: grid;
  grid-template-columns: 0.2rem 3fr 1fr;
}
.infoLabel3 .center {
  padding-left: 0.1rem;
  box-sizing: border-box;
}
.infoLabel3 .bottom {
  text-align: left;
  font-weight: 400 !important;
  /* background-color: #ffffff; */
  line-height: 0.39rem !important;
}
/* TSLabel */
.tslabel .a p {
  /* font-size: 0.14rem; */
}
.tslabel .top {
  margin-top: 0.14rem;
  /* box-sizing: border-box; */
  /* padding: 0.14rem 0 0; */
  width: 90%;
  /* font-size: 0.14rem; */
}
.tslabel .box1 {
  height: 0;
  border-right: 3px solid transparent;
  margin-top: 7px;
}
.tslabel .box2 {
  height: 6px;
  margin-top: 9px;
  /* background-color:rgba(0,210,255,.6); */
  transform: skewX(-18deg);
}
.tslabel .box3 {
  /* background-color:rgba(0,210,255,.4); */
  width: 15%;
  height: 6px;
  box-sizing: border-box;
  margin-top: 9px;
  margin-left: 2px;
  transform: skewX(-18deg);
}
.tslabel {
  cursor: pointer;
  display: grid;
  text-align: center;
  grid-template-rows: 0.3rem auto;
  grid-template-columns: 1fr 2fr 2fr;
}
.tslabel .a {
  grid-column: 1/4;
  /* background: linear-gradient(left,rgba(0,210,255,.4), transparent); */
}
.tslabel .bottom {
  grid-column: 1/4;
  /* display: inline-block; */
  color: transparent;
  padding: 0.1rem 0;
  /* margin-top: 0.05rem; */
  font-family: 'tsl';
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold !important;
  width: 90%;
  /* margin-left: -20%; */
}
@media screen and (min-width: 3001px) {
  .topText {
    /* display: table; */
    position: relative;
    display: inline-block;
    height: 100%;
    width: 100% !important;
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
  .lineSmall {
    display: grid;
    grid-template-rows: 1fr;
    grid-gap: 0.2rem;
    text-align: left;
    grid-template-columns: 0.7fr 0.8fr;
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
}
  .firfoxHeight {
    height: 1.2rem;
  }
</style>
