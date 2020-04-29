<template>
  <div class="fire">
    <div class="lineSmall item clear">
      <div class="item_back">
        <div
          class="item-title topText textCon"
          :title="title">
          <span>{{ title }}</span>
        </div>
        <div
          :class="{'highlight': typeInfo}"
          class="cebian sliderTilSmall">{{ num | numSp }}</div>
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
      tweenedNumber: 0,
      timeType: '',
      typeNum: 1
    }
  },
  props: {
    title: {
      type: [String],
      default: ''
    },
    num: {
      type: [String, Number],
      default: 0
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
    },
    typeInfo: {
      type: [Boolean],
      default: false
    }
  },
  mounted: function () {
  },
  computed: {
    // numInfo: function () {
    //   return this.tweenedNumber ? this.tweenedNumber.toFixed(0) : 0
    // }
  },
  watch: {
    // num: {
    //   handler: function (newValue, oldValue) {
    //     clearTimeout(this.timeType)
    //     TweenLite.from(this.$data, 1, { tweenedNumber: Math.ceil(oldValue) })
    //     TweenLite.to(this.$data, 2, { tweenedNumber: newValue })
    //     this.isRoll = true
    //     this.timeType = setTimeout(() => {
    //       this.isRoll = false
    //     }, 30000)
    //   },
    //   deep: true
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
.item {
  height: 50px;
  font-size: 0.3rem;
  color: #fff;
  box-sizing: border-box;
  padding: 0 .1rem .3rem .1rem;
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
  @media screen and (min-width: 6001px) {
    .item {
      padding: .3rem .1rem .3rem .1rem;
    }
    .topText {
      position: relative;
      display: inline-block;
      height: 2rem;
      width: 100% !important;
      line-height: 1.4rem !important;
    }
    .cebian[data-v-7b4d72ce] {
      line-height: 2.25rem;
    }
  }
}
</style>
