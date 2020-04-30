<template>
  <div
    :style="css"
    class="box1">
    <div style="display: grid;grid-template-rows: auto 1fr;height: 100%;">
      <h2 class="sliderTit"><span>{{ title }}</span></h2>
      <slot style="grid-row: 2"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box1',
  // props: ['css', 'title']
  props: {
    css: {
      type: [String],
      default: ''
    },
    title: {
      type: [String],
      default: ''
    }
  }
}
</script>

<style scoped>
.box1{
  border-top: .03rem solid rgba(49,241,254,0.8);
  /*background: -webkit-linear-gradient(rgba(14,79,97,0),rgba(13,107,175,0.25),rgba(18,28,49,0.5));*/
  /*background: -o-linear-gradient(rgba(14,79,97,0),rgba(13,107,175,0.25),rgba(18,28,49,0.5));*/
  /*background: -moz-linear-gradient(rgba(14,79,97,0),rgba(13,107,175,0.25),rgba(18,28,49,0.5));*/
  /*background: linear-gradient(rgba(14,79,97,0),rgba(13,107,175,0.25),rgba(18,28,49,0.5));*/
}
.box1 h2{
    font-size: .32rem;
    color: #fff;
    /*height: 1.48rem;*/
    line-height: .54rem;
     margin-bottom: .2rem;
    /*text-align: center;*/
    padding-bottom: .1rem;
    background:url("../../assets/images/box1_bottom.png") no-repeat center bottom;
    background-size: 95%;
  }
.box1 h2 span{
  display: inline-block;
  /*width: 4.28rem;*/
  background-size: cover;
  margin-left:.6rem;
  color:rgba(0,190,255,1);
  /*background:url("../../assets/images/components/box1_title.svg") no-repeat center center;*/
}
@media screen and (min-width: 3001px) {
  .box1 h2{
    font-size: .42rem;
  }
}
@media screen and (min-width: 6001px) {
  .box1 h2{
    font-size: .54rem;
  }
  .box1 h2 span{
    padding: .4rem 0;
  }
}
</style>
