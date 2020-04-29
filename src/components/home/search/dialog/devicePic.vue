<template>
  <pop
    title="设备图片"
    :level="param.level"
    footer="display:none"
    css="width:14.4rem"
    over-flow="false">
    <Box3>
      <img
        style="width: 100%;height: 100%;"
        :src="devicePic"
        alt="">
    </Box3>
  </pop>
</template>

<script>
import pop from '../../public/popupContainer'

export default {
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
      devicePic: ''
    }
  },
  components: {
    pop
  },
  mounted () {
    this.devicePic = this.param.e
  },
  methods: {
  }
}
</script>

<style scoped>
  .infos{
    display: grid;
    grid-template-columns:2rem 4rem 2rem 4rem;
    grid-template-rows: repeat(6, .8rem);
  }
  .infos div{
    line-height: .8rem;
  }
  .infos div:nth-child(odd){
    text-align: right;
    padding-right: .3rem;
  }
</style>
