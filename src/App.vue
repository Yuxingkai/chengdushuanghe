<template>
  <div
    id="app"
    style="width: 100%;height:100%;">
    <router-view
      class="routBox"
      style="width:100%;height:100%;"
      v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    mounted: function () {
      this.reload()
    }
  }
}
</script>

<style>
</style>
