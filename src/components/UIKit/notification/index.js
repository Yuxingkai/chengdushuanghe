import Notificati from './notify.vue'
import notifys from './function'
const notify = {
  install: (Vue) => {
    Vue.component(Notificati.name, Notificati)
    Vue.prototype.$newnotify = notifys
  }
}
export default {
  notify
}
