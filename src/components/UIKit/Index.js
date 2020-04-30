import Box1 from './Box-1'
import Box2 from './Box-2'
import Box3 from './Box-3'
import StreetBox from './streetBox'
import Tab from './Tab'
import TabItem from './TabItem'
import RadioGroup from './RadioGroup'
import RadioTabs from './RadioTabs'
import Map from '../home/public/MapContainer'
import InfoLabel from './InfoLabel.vue'
import InfoGroup from './InfoGroup.vue'
import echart from './echart'
import loading from './Loading'
import player from './player'
import dropDown from './dropDown'
import strDrop from './strtDrop'
import strDropdevice from './strtDropdevice'
import strDropRig from './strtDropRig'
import strDropdeviceRig from './strtDropdeviceRig'
import streetDropDown from './streetDropDown'

const uBox2 = {
  install: function (Vue) {
    Vue.component('Box2', Box2)
  }
}
const playerComp = {
  install: function (Vue) {
    Vue.component('player', player)
  }
}
const loadingComp = {
  install: function (Vue) {
    Vue.component('loading', loading)
  }
}
const echartComp = {
  install: function (Vue) {
    Vue.component('echart', echart)
  }
}
const uBox1 = {
  install: function (Vue) {
    Vue.component('Box1', Box1)
  }
}

const uBox3 = {
  install: function (Vue) {
    Vue.component('Box3', Box3)
  }
}

const ustrBox = {
  install: function (Vue) {
    Vue.component('strbox', StreetBox)
  }
}

const uTab = {
  install: function (Vue) {
    Vue.component('Tab', Tab)
  }
}

const uTabItem = {
  install: function (Vue) {
    Vue.component('TabItem', TabItem)
  }
}

const uRadioGroup = {
  install: function (Vue) {
    Vue.component('RadioGroup', RadioGroup)
  }
}

const uRadioTabs = {
  install: function (Vue) {
    Vue.component('RadioTabs', RadioTabs)
  }
}

const uMap = {
  install: function (Vue) {
    Vue.component('Map', Map)
  }
}

const uInfoLabel = {
  install: function (Vue) {
    Vue.component('InfoLabel', InfoLabel)
  }
}

const uInfoGroup = {
  install: function (Vue) {
    Vue.component('InfoGroup', InfoGroup)
  }
}
const udropDown = {
  install: function (Vue) {
    Vue.component('dropDown', dropDown)
  }
}
const ustrDrop = {
  install: function (Vue) {
    Vue.component('strDrop', strDrop)
  }
}
const ustrDropdevice = {
  install: function (Vue) {
    Vue.component('strtDropdevice', strDropdevice)
  }
}
const ustrDropRig = {
  install: function (Vue) {
    Vue.component('strDropRig', strDropRig)
  }
}
const ustrDropdeviceRig = {
  install: function (Vue) {
    Vue.component('strtDropdeviceRig', strDropdeviceRig)
  }
}
const ustreetDropDown = {
  install: function (Vue) {
    Vue.component('streetDropDown', streetDropDown)
  }
}
export default {
  uBox1,
  uBox3,
  uTab,
  uTabItem,
  uRadioGroup,
  uRadioTabs,
  uMap,
  uInfoLabel,
  uInfoGroup,
  echartComp,
  loadingComp,
  playerComp,
  udropDown,
  ustrBox,
  ustrDrop,
  ustrDropdevice,
  ustrDropRig,
  ustrDropdeviceRig,
  ustreetDropDown,
  uBox2
}
