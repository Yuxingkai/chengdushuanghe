<template>
  <pop
    :css="boxwidth"
    :title="alarmName"
    :level="param.level"
    footer="display:none"
    over-flow="false">
    <div class="screenAlarm">
      <div
        class="senseAlarm"
        v-if="senseList.length != 0">
        <boxTitle
          title="感知报警"
          style="width:83%"/>
        <Box3>
          <ul style="padding: .2rem;box-sizing: border-box;">
            <li style="position: absolute;top: -1.1rem;right: -2.8rem;">
              <input
                id="filterAll"
                class="btn-checkbox"
                type="checkbox"
                value="all"
                v-model="allfilter"
                @change="handleChangeallfilter">
              <label for="filterAll"><span>所有感知报警</span></label>
            </li>
            <li
              v-for="item in senseList"
              :key="item.id">
              <input
                :id="'checkboxId'+item.name"
                class="btn-checkbox"
                type="checkbox"
                :value="item.name"
                v-model="filter"
                @change="handleChange">
              <label :for="'checkboxId'+item.name"><span>{{ item.typeName }}</span></label>
            </li>
          </ul>
        </Box3>
      </div>

      <div
        class="passageAlarm"
        v-if="passageList.length != 0">
        <boxTitle
          title="通行报警"
          style="width:83%"/>
        <Box3>
          <ul style="padding: .2rem;box-sizing: border-box;">
            <li style="position: absolute;top: -1.1rem;right: -2.8rem;">
              <input
                id="modelAll"
                class="btn-checkbox"
                type="checkbox"
                value="all"
                v-model="allmodel"
                @change="handleChangeallmodel">
              <label for="modelAll"><span>所有通行报警</span></label>
            </li>
            <li
              v-for="item in passageList"
              :key="item.id">
              <input
                :id="'checkboxId'+item.modelID"
                class="btn-checkbox"
                type="checkbox"
                :value="item.modelID"
                v-model="model"
                @change="handleChange">
              <label
                :for="'checkboxId'+item.modelID"
                :title="item.modelName"><span>{{ item.modelName }}</span></label>
            </li>
          </ul>
        </Box3>
      </div>

      <div
        class="opsAlarm"
        v-if="OpsList.length != 0">
        <boxTitle
          title="运维报警"
          style="width:83%"/>
        <Box3>
          <ul style="padding: .2rem;box-sizing: border-box;">
            <li
              v-for="item in OpsList"
              :key="item.id">
              <input
                :id="'checkboxId'+item.name"
                class="btn-checkbox"
                type="checkbox"
                :value="item.name"
                v-model="ops"
                @change="handleChange">
              <label :for="'checkboxId'+item.name"><span>{{ item.typeName }}</span></label>
            </li>
          </ul>
        </Box3>
      </div>

    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post} from '../../../Utils/Http'

export default {
  name: 'ScreenAlarm',
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      boxwidth: 'width:18.72rem',
      alarmName: '报警分类选择',
      filter: [], // 感知报警选择
      model: [], // 通行报警选择
      ops: [], // 运维报警选择
      filterList: [], // 感知报警目录
      modelList: [], // 通行报警目录
      opsList: [], // 运维报警目录
      senseList: [],
      passageList: [],
      OpsList: [],
      allfilter: null,
      allmodel: null
    }
  },
  components: {
    pop,
    boxTitle
  },
  methods: {
    handleChange () {
      this.filter.length === this.filterList.length ? this.allfilter = true : this.allfilter = false
      this.model.length === this.modelList.length ? this.allmodel = true : this.allmodel = false
      let fils = this.filter
      let models = this.model
      console.log(fils)
      let conditions = {fils, models}
      this.$bus.emit('/event/changeConditions', conditions)
      window.localStorage.setItem('screenChoose', JSON.stringify(conditions))
    },
    handleChangeallfilter () {
      this.allfilter ? this.filter = Array.from(new Set(this.filterList.map(x => x.name))) : this.filter = []
      let fils = this.filter
      let models = this.model
      let conditions = {fils, models}
      this.$bus.emit('/event/changeConditions', conditions)
      window.localStorage.setItem('screenChoose', JSON.stringify(conditions))
    },
    handleChangeallmodel () {
      this.allmodel ? this.model = Array.from(new Set(this.modelList.map(x => x.modelID))) : this.model = []
      let fils = this.filter
      let models = this.model
      let conditions = {fils, models}
      this.$bus.emit('/event/changeConditions', conditions)
      window.localStorage.setItem('screenChoose', JSON.stringify(conditions))
    },
    addInfo () {
      // 查看localStorge里面是否有感知参数了，没有就重新加载
      if (this.filterList) {
        this.senseList = this.filterList
      } else {
        this.alarmSenseList()
      }
      // 查看localStorge里面是否有通行参数了，没有就重新加载
      if (this.modelList) {
        this.passageList = this.modelList
      } else {
        this.alarmPassageList()
      }
      // 运维条件，占无接口
      this.alarmOpsList()
    },
    alarmSenseList () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_alarm_log/alarmType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.senseList = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    alarmPassageList () {
      let reqParam = user.getRequestHeader()
      Post({
        async: true,
        url: apiNames['获取报警模型'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.passageList = data.models
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    alarmOpsList () {}
  },
  mounted () {
    let screenChoose = JSON.parse(window.localStorage.getItem('screenChoose')) // 选择
    let screenList = JSON.parse(window.localStorage.getItem('screenList')) // 目录
    this.filter = screenChoose.fils
    this.model = screenChoose.models
    this.filterList = screenList.fils
    this.modelList = screenList.models
    if (screenChoose && screenList) {
      this.filter.length === this.filterList.length ? this.allfilter = true : this.allfilter = false
      this.model.length === this.modelList.length ? this.allmodel = true : this.allmodel = false
    }
    this.addInfo()
  }
}
</script>

<style scoped>
.screenAlarm{padding:.2rem}
.screenAlarm div:not(:first-child){margin-top: .2rem}
ul {text-align: center; overflow: hidden; }
ul li{color: #befefe; font-size: .3rem; margin-top: .14rem; line-height: .55rem; width: 33.33%; box-sizing: border-box; text-align: left; float: left; }
ul li span{position: relative; top:-.1rem;text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
ul li .btn-checkbox{position:absolute;display:none}
ul li .btn-checkbox+label{position:relative;top:.1rem;padding-left: 1.2rem;display:flex;}
ul li .btn-checkbox+label:after{position:absolute;top:.1rem;left:.55rem;display:none;width:.16rem;height:.08rem;content:'';border-bottom:.02rem solid #fff;border-left:.02rem solid #fff;box-sizing:border-box;transform:rotate(-46deg)}
ul li .btn-checkbox+label:before{position:absolute;display:block;width:.2rem;height:.2rem;content:'';border:1px solid silver;top:.03rem;left: .5rem;border-radius:.03rem;background:#3e97eb;border:1px solid rgba(45, 245, 243, 0.5)}
ul li .btn-checkbox:checked+label:after{display:block}
</style>
