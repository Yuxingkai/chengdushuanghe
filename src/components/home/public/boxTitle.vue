<template>
  <div class="boxInfo">
    <div class="noWrap">
      <h3>
        <img
          src="../../../assets/images/title_1.svg"
          alt="上划线">
        {{ title }}
        <span class="line"/>
      </h3>
      <span class="tail"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxTitle',
  props: {
    title: {
      type: [String],
      default: '0'
    }
  }
}
</script>

<style scoped>
  .boxInfo {position: relative; overflow: hidden; height: 1rem; }
  .boxInfo img {position: absolute; top: 0; left: .9rem; width: 3.5rem; height: auto; }
  .boxInfo .noWrap{white-space:nowrap; position: relative; width: 100%; }
  .boxInfo h3 {padding: .3rem .3rem .1rem; min-width: 2.1rem; margin: 0; display: inline-block; position: relative;font-size: .32rem;font-weight: bold;}
  .line{height: .54rem; width: 100%; border-bottom: 1px solid #00485e; border-right: 1px solid #00485e; -webkit-transform: skew(-48deg); transform: skew(-48deg); left: 0; bottom: -.06rem; margin-right: 1rem; display: inline-block; position: absolute; height: .34rem; }
  .boxInfo .tail {position: relative; top: -.1rem; left: .1rem; display: inline-block; width: 100%; border-top: 1px solid #00485e; }
</style>
