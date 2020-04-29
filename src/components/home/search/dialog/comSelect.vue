<template>
  <div class="margTop">
    <div class="tupianbeij">{{ label }}:</div>
    <div class="input">
      <div class="lback"/>
      <div
        style="position:relative;"
        class="btandbm">
        <div
          ref="optionshow"
          class="seloptions setinput"
          @click="showOption">
          <input
            @keyup="searchVal($event)"
            class="canInput"
            type="text"
            v-model="value">
        </div>
        <div
          class="newarrow"
          :class="optionShow ? 'transdown' : 'transup'"/>
        <div
          :class="optionTypesData.length > 8 ? 'dropdownest' : 'dropdownlessest'"
          v-if="optionShow">
          <happy-scroll size="4">
            <div
              v-if="allData"
              class="options"
              @click="selOne('全部', '')">全部</div>
            <div
              v-if="norelationData"
              class="options">没有相关标签</div>
            <div
              style="cursor: pointer"
              class="options"
              v-for="(item,index) in optionTypesData"
              :key="index"
              @click="selOne(item.typeName,item.name)">{{ item.typeName }}</div>
          </happy-scroll>
        </div>
      </div>
      <div class="rback"/>
    </div>
  </div>
</template>

<script>
Array.prototype.contains = function (obj) {
  let i = this.length
  while (i--) {
    if (this[i] === obj) {
      return true
    }
  }
  return false
}
export default {
  name: 'ComSelect',
  data () {
    return {
      optionTypesData: [],
      norelationData: false,
      optionShow: false,
      allData: true
    }
  },
  props: {
    label: {
      type: [String],
      default: ''
    },
    data: {
      type: [Array],
      default: ''
    },
    value: {
      type: [String],
      default: ''
    }
  },
  methods: {
    searchVal (e) {
      this.$emit('input', e.currentTarget.value)
      this.optionTypesData = this.data.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.optionTypesData.length === 0) {
        this.norelationData = true
      } else {
        this.$emit('listen', {typeName: this.optionTypesData[0].typeName, name: this.optionTypesData[0].name})
        this.norelationData = false
      }
      if (e.currentTarget.value === '' || e.currentTarget.value === '全部') {
        this.$emit('listen', {typeName: '', name: ''})
      }
      if (this.optionTypesData.length === this.data.length) {
        this.allData = true
      } else {
        this.allData = false
      }
    },
    showOption () {
      this.optionShow = !this.optionShow
    },
    selOne (typeName, name) {
      this.value = typeName
      this.$emit('listen', {typeName: typeName, name: name})
      this.optionShow = false
    }
    // otherClick (e) {
    //   if (!this.$el.contains(e.target)) {
    //     this.optionShow = false
    //   }
    //   // if (this.optionShow) {
    //   //   this.optionShow = false
    //   // }
    // }
  },
  created () {
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.optionShow = false
      }
    })
  },
  destroyed () {
    document.removeEventListener('click', this.otherClick)
  },
  mounted () {
    this.optionTypesData = this.data
  }
}
</script>

<style scoped>

</style>
