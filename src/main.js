// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import './assets/css/public.css'
import 'animate.css'
import uiKit from './components/UIKit'
import HappyScroll from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import VueBus from 'vue-bus'
import './assets/css/layer-animate.css'
import VueCookies from 'vue-cookie'
import user from './Utils/user'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入swiper样式
import './assets/css/swiper.min.css'
import { router } from './config/config'
import mixin from './assets/js/mixin'
// import 'echarts-gl'
import './Utils/layout'
// video player
import VueVideoPlayer from 'vue-video-player'
import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
import notification from './components/UIKit/notification'
import newexport from './components/home/search/export'
// import 'videojs-contrib-hls.js/src/videojs.hlsjs'

require('videojs-flash/dist/videojs-flash.js')

Vue.use(
  VueVideoPlayer
  /* {
  options: global default options,
  events: global videojs events
} */
)
Vue.mixin(mixin)
Vue.use(VueCookies)
Vue.use(VueBus)
Vue.use(VueRouter)
Vue.use(HappyScroll)
Vue.use(uiKit.uBox1)
Vue.use(uiKit.echartComp)
Vue.use(uiKit.uBox3)
Vue.use(uiKit.uBox2)
Vue.use(uiKit.ustrBox)
Vue.use(uiKit.uTab)
Vue.use(uiKit.uTabItem)
Vue.use(uiKit.uRadioGroup)
Vue.use(uiKit.uRadioTabs)
Vue.use(uiKit.uMap)
Vue.use(uiKit.uInfoLabel)
Vue.use(uiKit.uInfoGroup)
Vue.use(uiKit.loadingComp)
Vue.use(notification.notify)
Vue.use(newexport.newexport)
Vue.use(uiKit.playerComp)
Vue.use(uiKit.udropDown)
Vue.use(uiKit.ustrDrop)
Vue.use(uiKit.ustrDropdevice)
Vue.use(uiKit.ustrDropRig)
Vue.use(uiKit.ustrDropdeviceRig)
Vue.use(uiKit.ustreetDropDown)
Vue.use(VueAwesomeSwiper /* { default global options } */)
Vue.use(ElementUI)
Vue.use(newexport.newexport)

Vue.config.productionTip = false
// 年+月+日  + ' ' + h + ':' + m + ':' + s
Vue.prototype.formatDates = function (value) {
  if (value === null) {
    return '-'
  } else if (value.toString().indexOf('-') !== -1) {
    let a = value.toString()
    let b = a.substring(0, a.length - 3)
    return b
  } else {
    let date = new Date(value * 1000)
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
    MM = MM < 10 ? '0' + MM : MM
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    let h = date.getHours()
    h = h < 10 ? '0' + h : h
    let m = date.getMinutes()
    m = m < 10 ? '0' + m : m
    // let s = date.getSeconds()
    // s = s < 10 ? ('0' + s) : s
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m
  }
}
// 掩码身份证号码
Vue.prototype.maskCredentialNo = function (credentialNo) {
  return credentialNo.substr(0, 3) + '***********' + credentialNo.substr(14, 4)
}
// 掩码手机号吗
Vue.prototype.maskPhoneNo = function (phoneNo) {
  return phoneNo.substr(0, 3) + '****' + phoneNo.substr(7, 4)
}
// 掩码人名
Vue.prototype.maskPeopleName = function (peopleName) {
  return (
    peopleName.substr(0, 1) + '*' + peopleName.substr(2, peopleName.length - 2)
  )
}
// 判断是否输入4位数字
Vue.prototype.computNum = function (val) {
  let num4 = /^\d{4,}$/
  if (!num4.test(val) && val !== '') {
    return false
  } else {
    return true
  }
}
// 输入中文
Vue.prototype.chinese = function (val) {
  let num4 = /^[\u4e00-\u9fa5]{0,}$/
  if (!num4.test(val) && val !== '') {
    return false
  } else {
    return true
  }
}
// 验证身份证
// Vue.prototype.cridient = function (val) {
//   let num4 = /^*\d + \d|X|x + $/
//   if (!num4.test(val)) {
//     return false
//   } else {
//     if (val.length > 0 && val.length < 4) {
//       return false
//     } else {
//       return true
//     }
//   }
// }
// 计算年龄
Vue.prototype.computAge = function (birthday) {
  try {
    return parseInt(
      (new Date() - new Date(birthday)) / (1000 * 60 * 60 * 24 * 365)
    )
  } catch (error) {
    return 0
  }
}
Vue.prototype.computdifTime = function (time) {
  try {
    // 计算出相差天数
    // let days = Math.floor(time / (24 * 3600))
    // 计算出小时数
    let leave1 = time % (24 * 3600) // 计算天数后剩余的秒数
    let hours = Math.floor(leave1 / 3600)
    // 计算相差分钟数
    let leave2 = leave1 % 3600 // 计算小时数后剩余的秒数
    let minutes = Math.floor(leave2 / 60)
    // 计算相差秒数
    let leave3 = leave2 % 60 // 计算分钟数后剩余的秒数
    let seconds = Math.round(leave3)
    return hours + '小时' + minutes + '分' + seconds + '秒'
  } catch (error) {
    return 0
  }
}
window.param = {}
let appRouter = new VueRouter(router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  created () {
    let that = this
    window.onclick = function () {
      that.$bus.emit('/window/onclick', arguments)
    }
  },
  data () {
    return {
      keepAliveRunning: false
    }
  },
  // mixins: [mixin],
  router: appRouter,
  template: '<App/>',
  watch: {
    $route: function (to, from) {
      window.param.currentRouter = to
      if (to.path.toLowerCase() !== '/login') {
        if (!user.isLogin()) {
          this.$router.push({
            path: '/login'
          })
        } else {
          // 定期检查keepAlive
          // if (!this.keepAliveRunning) {
          //   this.keepAliveRunning = true
          //   let that = this
          //   setInterval(() => {
          //     Post({
          //       async: true,
          //       url: apiNames['keepAlive'],
          //       data: user.getRequestHeader(),
          //       dataType: 'json',
          //       success: function (data) {
          //         that.$cookie.set('access-token', data.token, {
          //           expires: '1h'
          //         })
          //       }
          //     })
          //   }, 5000 * 60)
          // }
        }
      }
    }
  }
})

appRouter.beforeEach((to, from, next) => {
  if (to.path.toLowerCase() === '/login') {
    next()
    return
  }
  if (!user.isLogin()) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})
