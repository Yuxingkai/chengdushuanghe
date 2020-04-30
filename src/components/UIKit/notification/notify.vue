<template>
  <transition name="bounce">
    <div
      class="notify"
      :style="style"
      v-if="visible">
      <div
        @click="close"
        class="tipClose"><img
          src="../../../assets/images/close.svg"
          alt=""></div>
      <div class="tipType">
        <span
          class="success"
          v-show="typeInfo === 'success' ? true : false"/>
        <span
          class="err"
          v-show="typeInfo === 'err' ? true : false"/>
        <span
          class="waring"
          v-show="typeInfo === 'waring' ? true : false"/>
      </div>
      <div class="tipComtent">
        <span class="content">{{ titleName }}</span>
        <span class="content">{{ content }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notify',
  props: {
    titleName: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    typeName: {
      type: String,
      default: 'success'
    }
  },
  data () {
    return {
      visible: true,
      typeInfo: this.typeName
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  computed: {
    style () {
      return {}
    }
  }
}
</script>

<style scoped>
.bounce-enter-active {animation: bounce-in .5s; }
.bounce-leave-active {animation: bounce-in .5s reverse; }
@keyframes bounce-in {
  0% {transform: scale(0); }
  50% {transform: scale(1.05); }
  100% {transform: scale(1); }
}
.notify {display: table;text-align: center;font-size: .42rem; color: white; width: 4.4rem; height: 2.48rem; margin-top: -1.24rem;margin-left: -2.2rem;background: url("../../../assets/images/alert/alertBg.png") no-repeat; background-size: 99%;}
.tipType{width: 1.2rem;display: table-cell; vertical-align: middle; line-height: 2.48; }
.tipType span{margin-left: .4rem}
.tipType span.success{display: block; width:.9rem; height: .9rem; background: url("../../../assets/images/alert/success.svg") no-repeat; background-size: 99%; }
.tipType span.err{display: block; width:.9rem; height: .9rem; background: url("../../../assets/images/alert/err.svg") no-repeat; background-size: cover; }
.tipType span.waring{display: block; width:.9rem; height: .9rem; background: url("../../../assets/images/alert/waring.svg") no-repeat; background-size: cover; }
.tipComtent{box-sizing: border-box;display: table-cell;vertical-align: middle}
.tipComtent span{display: block; }
.tipComtent span:nth-of-type(1){font-size: .38rem; color: #ffffffe6;line-height: .6rem;white-space: nowrap;}
.tipComtent span:nth-of-type(2){font-size: .32rem; color: #ffffff9e;padding: 0 .2rem}
.tipClose{position: absolute; right: .16rem; top: .02rem; width: .3rem; cursor: pointer; }
.tipClose img{width: .3rem; }
</style>
