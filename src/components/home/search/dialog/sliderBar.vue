<template>
  <div style="display: flex;width: 100%">
    <div
      class="slider"
      ref="slider">
      <div
        class="process"
        :style="{width}"/>
      <div
        class="thunk"
        ref="trunk"
        :style="{left}">
        <div class="block"/>
        <!--<div class="tips">-->
        <!--<span>{{ parseInt(scale*100) }}</span>-->
        <!--<i class="fas fa-caret-down" />-->
        <!--</div>-->
      </div>
    </div>
    <input
      v-model="per"
      style="border: 1px solid #478FFF;color: white;background: none;width: .6rem;height: .5rem;text-align: center;margin-top: .2rem;margin-left: .2rem"
      type="text">
  </div>
</template>
<script>
/*
  * min 进度条最小值
  * max 进度条最大值
  * v-model 对当前值进行双向绑定实时显示拖拽进度
  * */
export default{
  name: 'SliderBar',
  props: ['min', 'max', 'value'],
  data () {
    return {
      slider: null, // 滚动条DOM元素
      thunk: null, // 拖拽DOM元素
      per: this.value // 当前值
    }
  },
  // 渲染到页面的时候
  mounted () {
    this.slider = this.$refs.slider
    this.thunk = this.$refs.trunk
    let _this = this
    this.thunk.onmousedown = function (e) {
      let width = parseInt(_this.width)
      let disX = e.clientX
      document.onmousemove = function (e) {
        // value, left, width
        // 当value变化的时候，会通过计算属性修改left，width

        // 拖拽的时候获取的新width
        let newWidth = e.clientX - disX + width
        // 拖拽的时候得到新的百分比
        let scale = newWidth / _this.slider.offsetWidth
        _this.per = Math.ceil((_this.max - _this.min) * scale + _this.min)
        _this.per = Math.max(_this.per, _this.min)
        _this.per = Math.min(_this.per, _this.max)
      }
      document.onmouseup = function () {
        _this.$emit('input', _this.per)
        document.onmousemove = document.onmouseup = null
      }
      return false
    }
  },
  watch: {
    scale (newval, oldval) {
      this.$emit('input', newval * 100)
    }
  },
  computed: {
    // 设置一个百分比，提供计算slider进度宽度和trunk的left值
    // 对应公式为  当前值-最小值/最大值-最小值 = slider进度width / slider总width
    // trunk left =  slider进度width + trunk宽度/2
    scale () {
      return (this.per - this.min) / (this.max - this.min)
    },
    width () {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + 'px'
      } else {
        return 0 + 'px'
      }
    },
    left () {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale - this.thunk.offsetWidth / 2 + 'px'
      } else {
        return 0 + 'px'
      }
    }
  }
}
</script>
<style>
  /*.box{margin:100px auto 0;width:80%}*/
  .clear:after{content:'';display:block;clear:both}
  .slider{position:relative;margin:20px 0;width:400px;height:10px;background:#50567C;cursor:pointer}
  .slider .process{position:absolute;left:0;top:0;width:112px;height:10px;background:#8AF3FF}
  .slider .thunk{position:absolute;left:100px;top:-10px;width:30px;height:30px}
  .slider .block{
    width:30px;
    height:30px;
    background-size: 100% 100%;
    /*border-radius:50%;*/
    background-image: url("../../../../assets/images/borderPoint.png");
    background-position: center;
    background-repeat: no-repeat;
    transition:.2s all}
  .slider .tips{position:absolute;left:-7px;bottom:30px;min-width:15px;text-align:center;padding:4px 8px;background:#000;border-radius:5px;height:24px;color:#fff}
  .slider .tips i{position:absolute;margin-left:-5px;left:50%;bottom:-9px;font-size:16px;color:#000}
  .slider .block:hover{transform:scale(1.1);opacity:.6}
</style>
