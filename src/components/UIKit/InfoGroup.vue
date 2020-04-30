<template>
  <div :class="groupClass">
    <div :style="css">
      <!-- type为2时才能传入参数 padding以及 color[必须] -->
      <div
        class="group1"
        :style='{gridTemplateColumns:`repeat(${columns}, 1fr)`,gridColumnGap:`${columnGap}px`,padding:`${padding}px 0 0 ${padding}px`,color:`${color}`}'>
        <slot/>
      </div>
    </div>
    <!-- <div class="group2"  :style='{gridTemplateColumns:`repeat(${columns}, 1fr)`}' v-show="!showOff">
      <slot></slot>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'InfoGroup',
  data () {
    return {
      num: 3,
      classA: 'group1',
      classB: 'group2',
      groupClass: 'group1'
    }
  },
  props: {
    columns: {
      type: [String, Number],
      default: 3
    },
    columnGap: {
      type: [String],
      default: ''
    },
    padding: {
      type: [String],
      default: '0'
    },
    color: {
      type: [String],
      default: ''
    },
    css: {
      type: [String],
      default: ''
    },
    type: {
      type: [String],
      default: '1'
    }
  },
  mounted: function () {
    if (!this.type) {
      this.groupClass = 'group1'
    } else if (this.type === '1') {
      this.groupClass = 'group1'
    } else if (this.type === '2') {
      this.groupClass = 'group2'
    }
  }
}
</script>

<style scoped>
.group1 {
  display: grid;
  width: 100%;
  /* grid-template-rows: repeat(2) 1fr; */
  /* grid-row-gap: 0.1rem; */
}
.group2 {
  display: grid;
  width: 100%;
  grid-row-gap: 0.08rem;
  grid-column-gap: 0.1rem;
}
</style>
