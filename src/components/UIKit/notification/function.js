import Component from './func-notify'
import Vue from 'Vue'

const NotifiConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const newnotify = (options) => {
  const {
    autoClose,
    ...rest
  } = options
  const instance = new NotifiConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default newnotify
