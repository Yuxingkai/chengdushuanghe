<template>
  <div
    class="maskTipFullActive"
    :class="{miskDiv : isMask === true}"
    style="width: 100%;height: 100%;position: relative">
    <video-player
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      custom-event-name="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied"/>
  </div>
</template>

<script>

export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 450
    }
  },
  data () {
    return {
      playerOptions: {
        muted: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: 'application/x-mpegURL',
            src: this.src
          }
        ],
        techOrder: ['flash'],
        flash: {
          hls: { withCredentials: false },
          swf: '../../static/videojs/video-js.swf'
        },
        autoplay: true,
        controls: true,
        poster: '',
        height: this.height,
        width: this.width
      },
      isMask: true,
      functionList: []
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  watch: {
    src: function (a, b) {
      this.playerOptions.sources[0].src = a
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
    onPlayerWaiting (player) {
      // console.log('player pause!', player)
    },
    onPlayerLoadeddata (player) {
      // ...player event
    },
    onPlayerCanplay (player) {
      // ...player event
    },
    onPlayerCanplaythrough (player) {
      // ...player event
    },
    // ...player event
    onPlayerPlaying (player) {
      // ...player event
    },
    onPlayerEnded (player) {
      // ...player event
    },
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },

    // player is ready
    playerReadied (player) {
      // you can use it to do something...
      // player.[methods]
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    }
  },
  mounted () {
    this.functionList = JSON.parse(window.localStorage.getItem('webGlobalConfig')).functionList
    let videoMask = this.functionList.find((item) => { return item.functionCode === 'mask_video' })
    if (videoMask === undefined) {
      this.isMask = true
    } else {
      this.isMask = false
    }
  }
}

</script>
