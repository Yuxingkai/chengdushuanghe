import Notificati from './notify.vue'

export default {
  extends: Notificati,
  computed: {
    style () {
      return {
        position: 'fixed',
        left: '50%',
        top: '50%',
        // transform: 'translate(-50%,-50%)',
        zIndex: '10000'
        // bottom: `${this.verticalOffset}px`
      }
    }
  },
  mounted () {
    this.creatTimer()
  },
  methods: {
    creatTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    },
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    }
  },
  beforeDestory () {
    this.clearTimer()
  },
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000,
      timer: ''
    }
  }
}
