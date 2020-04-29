<template>
  <pop
    title="车辆通行记录"
    :level="param.level"
    footer="display:none"
    css="width:14.4rem"
    over-flow="false">
    <Box3 css="margin-top:.08rem;padding-bottom:0.4rem;">
      <p class="right_p textCon">
        <span>车牌</span>
        <span>属性</span>
        <span>时间</span>
        <span>进/出</span>
        <span>照片</span>
      </p>
      <happy-scroll
        size="2"
        hide-horizontal
        style="height:7rem;"
        resize>
        <ul
          class="right_ul textCon"
          style="padding-top:0.1rem;">
          <li
            v-if="showAll"
            style="color:#fff;font-size:0.35rem;padding-left:10px;">未找到通行记录</li>
          <li
            v-for="(item,index) in recodeNum"
            :key="item.id"
            @click="select(index)">
            <p>{{ item.plateNo }}
              <!--<span class="mark">外来</span>-->
            </p>
            <p>{{ item.isRegister | splitName }}</p>
            <p
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              :title="item.passTime">{{ item.passTime | splitime }}</p>
            <p>{{ item.inout }}</p>
            <p
              class="right_ul_p"
              @click="bigImg(item.platePic)">
              <span class="videoTvIcon"/>
            </p>
          </li>
        </ul>
      </happy-scroll>
    </Box3>
    <!-- 大图弹出 -->
    <div style="padding:25px 8px 5px;height:auto;position: absolute;width:70%;z-index:9999;left:50%;top:50%;transform:translate(-50%,-50%);min-height:1rem;">
      <transition
        name="aa"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
        :duration="300"
        style="">
        <Box3
          type='1'
          class='zhezhao'
          css='padding:0 0.1rem;box-sizing:border-box;-moz-box-shadow: 0px 0px 45px 15px #071225; box-shadow: 0px 0px 45px 15px #071225;background-color:rgba(0,0,0,.7);min-height:0.7rem;'
          v-show='showImg'>
          <p
            class="pClose"
            @click="pClose">
            <span><img
              src="../../../../assets/images/close.svg"
              alt=""
              class="a"></span>
          </p>
          <!-- <div v-show='showImg'>暂无图片</div> -->
          <img
            class="b"
            :src="imgUrl"
            alt="">
            <!-- <img class="b" src="http://47.75.190.168:9000/blueplus/Car/20180615/7b273251-f9d6-447c-9b3e-c7111d661dc6.jpg" alt="" > -->
        </Box3>
      </transition>
    </div>
  </pop>
</template>

<script>
import pop from '../../public/popupContainer'

export default {
  data () {
    return {
      faceInfo: {},
      headurl: '',
      showAll: false,
      recodeNum: []
    }
  },
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    pop
  },
  mounted () {
    // this.faceInfo = this.param.e
    // if (this.faceInfo.headpic === '') {
    //   console.log(this.faceInfo.headpic, 'kkongde')
    //   this.headurl = require('../../../../assets/images/photoDefault.png')
    // } else {
    //   this.headurl = this.faceInfo.headpic
    // }
  },
  methods: {
    select: function (index) {
      this.innerIndex = index
      console.log(this.innerIndex)
    },
    bigImg: function (index) {
      this.showImg = true
      this.imgUrl = index
    },
    pClose: function () {
      this.showImg = false
    }
  }
}
</script>

<style scoped>
  .infos{
    display: grid;
    grid-template-columns:2rem 4rem 2rem 4rem;
    grid-template-rows: repeat(6, .8rem);
  }
  .infos div{
    line-height: .8rem;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .infos div:nth-child(odd){
    text-align: right;
    padding-right: .3rem;
  }
  .right_p {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    line-height: 0.56rem;
    font-size: 0.28rem;
    padding-top: 0.16rem;
    color: #a4edfc;
  }

  .right_p span {
    flex: 2;
    text-align: center;
  }

  .right_p span:nth-of-type(1) {
    flex: 4;
  }

  .right_p span:nth-of-type(2) {
    flex: 4;
  }

  .right_p span:nth-of-type(4) {
    flex: 2;
  }
  .right_ul li {
    display: flex;
    width: 100%;
    line-height: 0.56rem;
    font-size: 0.28rem;
  }

  .right_ul li p {
    box-sizing: border-box;
    padding: 0.01rem;
    flex: 2;
    color: #ffffff;
    text-align: center;
  }

  .right_ul li p:nth-of-type(1) {
    position: relative;
    flex: 5;
  }

  .right_ul li p:nth-of-type(2) {
    position: relative;
    flex: 5;
    text-align: center;
  }

  .right_ul li p:nth-of-type(4) {
    position: relative;
    flex: 2.5;
  }

  .right_ul li:nth-of-type(odd) {
    background: rgba(164, 237, 252, 0.2);
  }

  .right_ul li p.right_ul_p .span {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 0.04rem;
    line-height: 0.32rem;
    font-size: 0.24rem;
    margin-left: 0.16rem;
    color: #ffffff9e;
    transform: scale(0.8) translateY(-0.04rem);
  }
  .mark {
    width: 0.8rem;
    height: 0.4rem;
    line-height: 0.222rem;
    text-align: center;
    display: inline-block;
    font-size: 0.2rem;
    color: #ffffff;
    background: #348bd5;
    background: linear-gradient(45deg, transparent 0.08rem, #348bd5 0);
    position: absolute;
    right: -0.4rem;
    top: -0.12rem;
    box-sizing: border-box;
    padding-top: 0.1rem;
  }
</style>
