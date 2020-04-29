<template>
  <pop
    title="通行视频"
    :level="param.level"
    css="width:16.28rem;"
    footer="display:none">
    <div style="height:8.8rem;padding-top:3px;box-sizing:border-box;">
      <player :src="param.e"/>
    </div>
  </pop>
</template>

<script>
import pop from '../../public/popupContainer'

export default {
  components: {
    pop
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
    console.log('this is current player instance object', this.player)
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    // ...player event

    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      console.log('the player is readied', player)
      // you can use it to do something...
      // player.[methods]
    }
  }
}
</script>

<style scoped>

</style>
