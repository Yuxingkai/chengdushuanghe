<template>
  <pop
    title="视频调阅"
    :level="param.level"
    css="width:16.28rem;"
    footer="display:none">
    <div style="height:8.8rem;padding-top:3px;box-sizing:border-box;">
      <p
        class="tvChange"
        v-show="playChange"
        @click="playChan">前后门视频切换</p>
      <playvideo :src="tvSrc"/>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import playvideo from '../../UIKit/playVideo'

export default {
  data () {
    return {
      playChange: false,
      changSum: true,
      tvSrc: ''
    }
  },
  components: {
    pop,
    playvideo
  },
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    console.log('this is current player instance object', this.playvideo)
    let that = this
    let playArr = that.param.arr
    if (playArr[0] !== '' && playArr[1] !== '') {
      that.playChange = true
    } else {
      that.playChange = false
    }
    that.tvSrc = that.param.e
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.playvideo
    }
  },
  methods: {
    // listen event
    onPlayerPlay (playvideo) {
      // console.log('player play!', player)
    },
    onPlayerPause (playvideo) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (playvideo) {
      console.log('the player is readied', playvideo)
      // you can use it to do something...
      // player.[methods]
    },
    playChan: function () {
      let that = this
      let allArr = that.param.arr
      that.changSum = !that.changSum
      if (that.changSum === true) {
        that.tvSrc = allArr[0]
      } else {
        that.tvSrc = allArr[1]
      }
    }
  }
}
</script>

<style scoped>
.tvChange{
  position: absolute;
  z-index: 99;
  right: .2rem;
  top: .2rem;
  padding: .2rem;
  background: rgba(44, 136, 255, .35);
  cursor: pointer;
  border-radius: 5px;
}
</style>
