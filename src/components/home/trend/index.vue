<template>
  <div>
    <!-- <transition name='animate' mode="out-in"> -->
    <router-view/>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'Allstates'
}
</script>

<style scoped>
.animate-enter-active,
.animate-leave-active {
  transition: all 0.2s ease;
}
.animate-enter,
.animate-leave-active {
  opacity: 0;
}
.animate-enter {
  transform: translateX(10rem);
}
.animate-leave-active {
  transform: translateX(-10rem);
}
</style>
