<template>
  <div
    style="position: relative;width:100%;height:100%;display: table;"
    class="trans">
    <div
      class="buildingInfo"
      :class="showMask === 'true' ? 'film' : ' ' ">
      <div
        ref="film_main"
        class="film_main clear"
        :style="css">
        <div
          class="buildingInfo_main"
          :class="{'overf' : overF}">
          <div
            @mousedown="move"
            class="buildingInfo_header">
            <h3 class="">
              {{ title }}
              <!--<span/>-->
              <!--<span :style="{}"/>-->
            </h3>
            <p class="pCon"><span>0</span></p>
            <p class="pSmall"><span><img
              src="../../../assets/images/small.svg"
              alt=""></span></p>
            <p
              class="pClose"
              @click="pClose"><span><img
                src="../../../assets/images/close.svg"
                alt=""></span></p>
          </div>
          <div style="position: relative;width:100%;height:100%;display: table;">
            <slot/>
            <loading :visible="isLoading"/>
          </div>
        </div>
        <div
          class="footer"
          :style="footer">
          <div
            class="p_footer"
            :style="css2">
            <slot name="footer"/>
          </div>
          <slot name="equipment"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    css: {
      type: [String],
      default: '0'
    },
    showMask: {
      type: [String],
      default: 'false'
    },
    title: {
      type: [String],
      default: 'false'
    },
    level: {
      type: [Number],
      default: 1
    },
    isLoading: {
      type: [Boolean],
      default: false
    },
    activeColor: {
      type: [String],
      default: '0'
    },
    css2: {
      type: [String],
      default: '0'
    },
    footer: {
      type: [String],
      default: '0'
    },
    overFlow: {
      type: [String],
      default: 'false'
    }
  },
  data () {
    return {
      overF: true
    }
  },
  methods: {
    move (e) {
      let filmMain = this.$refs.film_main
      // 算出鼠标相对元素的位置
      let disX = e.clientX - filmMain.offsetLeft
      let disY = e.clientY - filmMain.offsetTop
      document.onmousemove = (e) => { // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX
        let top = e.clientY - disY
        filmMain.style.left = left + 'px'
        filmMain.style.top = top + 'px'
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    pClose () {
      window.pop.close(this.level)
      this.$emit('closed')
    },
    overFl () {

    }
  },
  mounted () {
    this.overFlow === 'false' ? this.overF = false : this.overF = true
    // if (this.overFlow === 'false') {
    //   this.overF = false
    // } else {
    //   this.overF = true
    // }
  }
}
</script>

<style scoped>
  h3,
  p {
    margin: 0;
  }

  .buildingInfo {
    color: #ffffff;
    font-size: .32rem;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    margin: 0 auto;
  }

  .film {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
  }

  .film_main {
    width: 8rem;
    text-align: left;
    border: .01rem solid #2c88ff85;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -moz-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -webkit-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -o-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -ms-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    /*margin: 0 auto;*/
    -moz-box-shadow: 0px 0px 45px 15px #071225; /* 老的 Firefox */
    box-shadow: 0px 0px 45px 15px #071225;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .buildingInfo_main {
    border: .02rem solid #004e8b;
    box-sizing: border-box;
    padding-bottom: .1rem;
    margin: .1rem;
    position: relative;
  }
  .buildingInfo_main.overf{
    overflow: hidden;
  }
  .buildingInfo .buildingInfo_header {
    position: relative;
    box-sizing: border-box;
    padding-left: .24rem;
    height: .77rem;
    line-height: .65rem;
    font-size: .44rem;
    background: rgba(44, 136, 255, .35);
  }

  .buildingInfo .buildingInfo_header h3 {
    font-size: .36rem;
    position: relative;
    display: inline-block;
    padding-right: .4rem;
    padding-bottom: .2rem
  }

  .buildingInfo .buildingInfo_header h3 span {
    display: inline-block;
    position: absolute;
  }

  .buildingInfo .buildingInfo_header h3 span:nth-of-type(1) {
    height: .08rem;
    width: .62rem;
    background: #b5e1ea;
    left: -.12rem;
    bottom: .18rem;
  }

  .buildingInfo .buildingInfo_header h3 span:nth-of-type(2) {
    height: .74rem;
    width: 100%;
    border-bottom: 1px solid #0062b1;
    border-right: 1px solid #0062b1;
    left: .6rem;
    bottom: .2rem;
  }

  .buildingInfo .buildingInfo_header p {
    width: .77rem;
    text-align: center;
    line-height: .77rem;
    height: .77rem;
    font-weight: normal;
    border-left: 1px solid #1d4d94;
    display: inline-block;
    position: absolute;
  }

  .buildingInfo .buildingInfo_header p span {
    width: .6rem;
    text-align: center;
    margin-top: .09rem;
    height: .6rem;
    font-weight: normal;
    border-radius: 2px;
    display: inline-block;
    background: linear-gradient(to bottom, rgba(14, 79, 97, 0.1), rgba(44, 136, 255, 0.2));
    background: -webkit-linear-gradient(to bottom, rgba(14, 79, 97, 0.1), rgba(44, 136, 255, 0.2));
    background: -o-linear-gradient(to bottom, rgba(14, 79, 97, 0.1), rgba(44, 136, 255, 0.2));
    background: -moz-linear-gradient(to bottom, rgba(14, 79, 97, 0.1), rgba(44, 136, 255, 0.2));
    background: linear-gradient(to bottom, rgba(14, 79, 97, 0.1), rgba(44, 136, 255, 0.2));
  }

  .buildingInfo .buildingInfo_header p.pCon {
    right: 1.54rem;
    border-left: none;
    display: none;
  }

  .buildingInfo .buildingInfo_header p.pCon span {
    color: transparent;
  }

  .buildingInfo .buildingInfo_header p.pSmall {
    right: .77rem;
    cursor: pointer;
    display: none;
  }

  .buildingInfo .buildingInfo_header p.pClose {
    right: 0px;
    cursor: pointer;
  }

  .buildingInfo .buildingInfo_header p.pSmall span img {
    width: .3rem;
    text-align: center;
    line-height: .3rem;
    height: .3rem;
  }

  .buildingInfo .buildingInfo_header p.pClose span img {
    width: .3rem;
    text-align: center;
    margin-bottom: .065rem;
    height: .3rem;
  }

  .buildingInfo .buildingInfo_header p.pClose:hover span {
    background: rgba(255, 8, 8, 0.76);
  }

  .buildingInfo .buildingInfo_header p.pSmall:hover span {
    background: rgba(255, 8, 8, 0.76);
  }

  .footer {
    margin: .2rem 0 0 0;
    bottom: .1rem;
    box-sizing: border-box;
    padding: 0 .12rem;
    position: relative;
  }

  .footer div.p_footer {
    width: 100%;
    position: relative;
    height: .62rem;
    line-height: .62rem;
    padding-left: .438rem;
    box-sizing: border-box;
    background-color: #2c88ff66;
    border: .01rem solid #2c88ffb3;
  }

  .footer div.p_footer::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: .168rem;
    height: 100%;
    background: #2c88ff40;
  }

  .footer div.p_footer::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: .168rem;
    height: 100%;
    background: #2c88ff40;
  }

  .footer span {
    margin-right: .6rem;
  }

  .footer span input {
    background-color: #ff5d5b;
    vertical-align: middle;
    margin-top: -.05rem;
  }

  .ball {
    position: relative;
    margin-left: .45rem;
  }

  .ball::before {
    content: "";
    position: absolute;
    top: .12rem;
    left: -.45rem;
    background: #032d12;
    border-radius: 50%;
    width: .356rem;
    height: .356rem;
  }

  .ball::after {
    content: "";
    position: absolute;
    top: .188rem;
    left: -.375rem;
    background: #30d200;
    border-radius: 50%;
    width: .22rem;
    height: .22rem;
  }

  .equipment {
    position: absolute;
    top: .09rem;
    right: .1rem;
    z-index: 1;
  }

  .equipment b {
    background: -webkit-linear-gradient(#071225, #182c5f);
    background: -o-linear-gradient(#071225, #182c5f);
    background: -moz-linear-gradient(#071225, #182c5f);
    background: linear-gradient(#071225, #182c5f);
    position: absolute;
    top: -.03rem;
    right: .2rem;
    width: .5rem;
    height: .452rem;
  }

  .equipment>span {
    margin: 0 ;
    background: #112147;
    cursor: pointer;
  }
  @media screen and (min-width: 3001px) {
    .trans{
      transform: scale(1.2);
    }
    /*.buildingInfo .buildingInfo_header {*/
      /*height: 1.07rem;*/
      /*line-height: 1.03rem;*/
    /*}*/
    /*.footer div.p_footer {*/
      /*height: .82rem;*/
      /*line-height: .82rem;*/
    /*}*/
  }
  @media screen and (min-width: 6001px) {
    .trans {
      transform: scale(2.4);
    }
  }
</style>
