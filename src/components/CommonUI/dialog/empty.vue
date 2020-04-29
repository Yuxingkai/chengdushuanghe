<template>
  <pop
    title="empty"
    :level="param.level">
    <div style="width:8rem;height:4rem;text-align:center;line-height:4rem;">正在建设中...</div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'

export default {
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    pop: pop
  }
}
</script>

<style scoped>

</style>
