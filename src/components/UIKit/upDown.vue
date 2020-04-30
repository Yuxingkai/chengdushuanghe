<template>
  <div
    class="controlLayer trans"
    :class="mapBtncontrol === true ? classA : classB">
    <div class="control"><p
      @click="control"
      v-show="mainControl"
      class="controlPoint"/>
      <transition
        name='animate'
        mode="out-in">
        <div
          v-show="controlL"
          class="mapPointControl">
          <div class="controlTitle">
            <h3>{{ titleInfo }} <span/><span/></h3>
            <p
              class="pClose"
              @click="pClose">
              <span><img
                src="../../assets/images/close.svg"
                alt=""></span>
            </p>
          </div>
          <ul>
            <!--<div style="width: 6.5rem;"><boxTitle :title="secondTitle"></boxTitle></div>-->
            <Box3 css="padding-bottom:.2rem">
              <li
                v-for="item in itemInfo"
                :key="item.index"
                @change="changeType(item)"
                class="checkLi">
                <div>
                  <input
                    :id="'checkboxId2'+item.id"
                    class="btn_checkbox"
                    :value="item.type"
                    type="checkbox"
                    v-model="item.selected"
                    @change="handleChange(item)">
                  <label :for="'checkboxId2'+item.id"><span>{{ item.type }}</span></label>
                </div>
              </li>
            </Box3>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import boxTitle from '../home/public/boxTitle'

export default {
  name: 'UpDown',
  data () {
    return {
      mainControl: true,
      controlL: false,
      type: false,
      titleInfo: '设备图层选择',
      secondTitle: '设备信息',
      level: 3,
      allIndex: -1,
      classA: 'transitionIn',
      classB: 'transitionOut',
      mapBtncontrol: false
    }
  },
  components: {
    boxTitle
  },
  // props: ['itemInfo'],
  props: {
    itemInfo: {
      type: [Array],
      default: () => {
        return []
      }
    }
  },
  methods: {
    control: function () {
      this.controlL = true
      this.mainControl = false
    },
    handleChange (item) {
      this.$emit('change', item)
    },
    changeType (item) {
      console.log(this.itemInfo, item)
      let items = this.itemInfo.filter(function (val) {
        return val.selected === true && val.type !== '全部'
      })
      if (this.allIndex === -1) {
        for (let i = 0, len = this.itemInfo.length; i < len; i++) {
          if (this.itemInfo[i].type === '全部') {
            this.allIndex = i
            break
          }
        }
      }
      if (items !== undefined && items.length === (this.itemInfo.length - 1)) {
        this.itemInfo[this.allIndex].selected = true
        this.itemInfo[this.allIndex].bg = true
      } else {
        this.itemInfo[this.allIndex].selected = false
        this.itemInfo[this.allIndex].bg = false
      }
      item.bg = !item.bg
    },
    pClose () {
      this.controlL = false
      this.mainControl = true
    }
  },
  mounted: function () {
    if (this.$route.path === '/home/sensor/operation') {
      this.mainControl = false
    }
    this.$bus.on('mapBtnPosition', (e) => {
      if (e === true) {
        this.mapBtncontrol = true
      } else {
        this.mapBtncontrol = false
      }
    })
  },
  watch: {
    $route (to, from) {
      this.controlL = false
      this.mainControl = true
      if (this.$route.path === '/home/sensor/operation') {
        this.mainControl = false
      }
    }
  }
}
</script>

<style scoped>
  .controlLayer{
    position: absolute;
    bottom: 144px;
    z-index: 500;
  }
  .control{
    position: relative;
    font-size: .32rem;
    color:#fff;
    box-sizing: border-box;
  }
  .control p.controlPoint{
    width: 1rem;
    height: 1rem;
    box-sizing: border-box;
    background: url("../../assets/images/mapPointFilter2.png") no-repeat;
    background-size: 1rem;
  }
  .control .mapPointControl {
    width: 9rem;
    position: absolute;
    bottom: 1px;
    left: 1px;
    border: .01rem solid #2c88ff85;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -moz-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -webkit-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -o-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    background: -ms-linear-gradient(to bottom, #071225ef 50%,#182c5f 100%);
    margin: 0 auto;
    -moz-box-shadow: 0px 0px 45px 15px #071225; /* 老的 Firefox */
    box-shadow: 0px 0px 45px 15px #071225;
  }
  .control .mapPointControl .controlTitle{
    position: relative;
    box-sizing: border-box;
    padding-left: .24rem;
    height: .77rem;
    line-height: .65rem;
    font-size: .44rem;
    background: rgba(44, 136, 255, .35);
    overflow: hidden;
    margin-bottom: 5px;
  }
  .control .mapPointControl .controlTitle h3{
    font-size: .36rem;
    position: relative;
    display: inline-block;
    padding-right: .4rem;
    padding-bottom: .2rem
  }
  .control .mapPointControl .controlTitle h3 span {
    display: inline-block;
    position: absolute;
  }

  .control .mapPointControl .controlTitle h3 span:nth-of-type(1) {
    height: .08rem;
    width: .62rem;
    background: #b5e1ea;
    left: -.12rem;
    bottom: .18rem;
  }

  .control .mapPointControl .controlTitle h3 span:nth-of-type(2) {
    height: .74rem;
    width: 100%;
    border-bottom: 1px solid #0062b1;
    border-right: 1px solid #0062b1;
    left: .6rem;
    bottom: .2rem;
  }
  .control .mapPointControl .controlTitle p.pClose {
    width: .77rem;
    text-align: center;
    height: .77rem;
    font-weight: normal;
    border-left: 1px solid #1d4d94;
    display: inline-block;
    position: absolute;
    right: 0;
  }
  .control .mapPointControl .controlTitle p.pClose span{
    cursor: pointer;
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
  .control .mapPointControl .controlTitle p.pClose:hover span {
    background: rgba(255, 8, 8, 0.76);
  }
  .control .mapPointControl .controlTitle p.pClose span img {
    width: .3rem;
    text-align: center;
    margin-bottom: .01rem;
    height: .3rem;
  }
  .control ul{
    position: relative;
    box-sizing: border-box;
    padding: 0 .2rem;
    margin: .1rem 0;
  }
  .control ul li{
    color:#fff;
    width: 50%;
    height: 30px;
    box-sizing: border-box;
    padding-left: .3rem;
    margin-top: 5px;
    display: inline-block;
    cursor: pointer;
  }
  .control ul li.active{
    position: absolute;
    top: -1rem;
    right: -2.2rem;
  }
  .control ul li div{
    position: relative;
    width: 110px;
    height: 30px;
    line-height: 25px;
    box-sizing: border-box;
    padding-left: 26px;
    /*background: linear-gradient(to right, rgba(43, 207, 227, 0.5), rgba(43, 109, 196, 0.18));*/
    /*background: -webkit-linear-gradient(to right, rgba(43, 207, 227, 0.5), rgba(43, 109, 196, 0.18));*/
    /*background: -o-linear-gradient(to right, rgba(43, 207, 227, 0.5), rgba(43, 109, 196, 0.18));*/
    /*background: -moz-linear-gradient(to right, rgba(43, 207, 227, 0.5), rgba(43, 109, 196, 0.18));*/
    /*background: linear-gradient(to right, rgba(43, 207, 227, 0.5), rgba(43, 109, 196, 0.18));*/
  }
  .control ul li div .btn_checkbox{
    position:absolute;
    display:none
  }
  .control ul li div .btn_checkbox+label{
    position:relative;
    top:.1rem;
  }
  .control ul li div .btn_checkbox+label:after{
    position:absolute;
    top:.1rem;
    left:-.32rem;
    display:none;
    width:.16rem;
    height:.08rem;
    content:'';
    border-bottom:.02rem solid #fff;
    border-left:.02rem solid #fff;
    box-sizing:border-box;
    transform:rotate(-46deg)
  }
  .control ul li div .btn_checkbox+label:before{
    position:absolute;
    display:block;
    width:.2rem;
    height:.2rem;
    content:'';
    border:1px solid silver;
    left: -.36rem;
    top: .06rem;
    border-radius:.03rem;
    background:#3e97eb;
    border:1px solid rgba(45, 245, 243, 0.5)
  }
  .control ul li div .btn_checkbox:checked+label:after{
    display:block
  }
  .animate-enter-active,
  .animate-leave-active {
    transition: all 0.2s ease;
  }
  .animate-enter,
  .animate-leave-active {
    opacity: 0;
  }
  .animate-enter {
    transform: translateY(10rem);
  }
  .animate-leave-active {
    transform: translateY(10rem);
  }
  /*整体效果*/
  .transitionIn {
    animation: controlIn .3s linear;
    -webkit-animation: controlIn .3s linear;
    left: 7.4rem;
  }
  @keyframes controlIn {
    from {left:.4rem;}
    to {left:7.4rem;}
  }
  @-webkit-keyframes controlIn
  {
    from {left:.4rem;}
    to {left:7.4rem;}
  }
  .transitionOut {
    animation: controlOut .3s linear;
    -webkit-animation: controlOut .3s linear;
    left: .4rem;
  }
  @keyframes controlOut {
    from {left:7.4rem;}
    to {left:.4rem;}
  }
  @-webkit-keyframes controlOut
  {
    from {left:7.4rem;}
    to {left:.4rem;}
  }
  @media screen and (min-width: 3001px) {
    .trans{
      transform: scale(1.5);
      left: 38px;
      bottom: 15px;
    }
    .controlLayer{
      left: 14.4rem;
      top: 1017px;
    }
    .control .mapPointControl {
      bottom: -40px;
    }
    /*整体效果*/
    .transitionIn {
      animation: controlIn .3s linear;
      -webkit-animation: controlIn .3s linear;
      left: 15.2rem;
    }
    @keyframes controlIn {
      from {left:.4rem;}
      to {left:15.2rem;}
    }
    @-webkit-keyframes controlIn
    {
      from {left:.4rem;}
      to {left:15.2rem;}
    }
    .transitionOut {
      animation: controlOut .3s linear;
      -webkit-animation: controlOut .3s linear;
      left: .4rem;
    }
    @keyframes controlOut {
      from {left:15.2rem;}
      to {left:.4rem;}
    }
    @-webkit-keyframes controlOut
    {
      from {left:15.2rem;}
      to {left:.4rem;}
    }
  }
  .mapcontrolBtn {
    left:.4rem ;
  }
</style>
