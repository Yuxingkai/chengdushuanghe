<template>
  <div
    class="selectBox"
    @mouseover="showUl"
    @mouseout="xsUl"
    :style="css">
    <p class="top">
      <span class="timeTex"/>
      <strong/>
    </p>
    <ul class="box">
      <li
        v-for="(x,indexs) in innerItems"
        :key="indexs"
        @click="select(x,indexs)">{{ x }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'SelectBox',
  props: {
    items: {
      type: [String],
      default: '0'
    },
    currentIndex: {
      type: [String],
      default: '0'
    },
    css: {
      type: [String],
      default: '0'
    }
  },
  data () {
    return {
      innerItems: [],
      innerIndex: this.currentIndex
    }
  },
  methods: {
    select: function (x, indexs) {
      document.querySelector('.timeTex').innerHTML = x
      this.innerIndex = indexs
      // console.log(this.innerItems[this.innerIndex])
    },
    reload: function () {
      this.innerItems = []
      this.items.split(',').forEach(itm => {
        this.innerItems.push(itm)
      })
    },
    showUl: function () {
      document.querySelector('.box').style.height =
        this.innerItems.length * 20 + 'px'
    },
    xsUl: function () {
      document.querySelector('.box').style.height = 0
    }
  },
  mounted: function () {
    this.reload()
    document.querySelector('.timeTex').innerHTML = this.innerItems[parseInt(this.currentIndex)]
  },
  watch: {
    innerIndex: function (val, oval) {
      this.$emit('on-index-changed', this.innerItems[val], val)
    }
  }
}
</script>
<style scoped>
.selectBox {
  color: #ffffff;
  list-style: none;
  width: 1.6rem;
  height: .4rem;
  font-size: .28rem;
  z-index: 999;
  position: relative;
}
.top {
  width: 100%;
  height: .4rem;
  position: absolute;
  left: 0;
  box-sizing: border-box;
  padding-left: .4rem;
  top: 0;
}
strong {
  display: inline-block;
  width: .4rem;
  height: .4rem;
  position: absolute;
  right: .1rem;
  top: 0;
  background-image: url('../../../assets/images/more_unfold.png');
  background-repeat: no-repeat;
  background-size: .4rem .4rem;
  transition: all 0.3s;
}
ul {
  position: absolute;
  top: .4rem;
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
}
.top,
ul li {
  box-sizing: border-box;
}
ul li {
  width: 90%;
  text-align: center;
  height: .4rem;
  width: 1.4rem;
  margin-top: -.02rem;
  background-clip: content-box;
  background-color: #cccccc;
}
ul li:hover {
  /* color: rgb(48,205,195); */
  color: red;
  cursor: pointer;
  background-color: rgb(48, 205, 195);
}
/* .selectBox:hover ul{
    height: 60px;
  } */
.selectBox:hover strong {
  transform-origin: center center;
  transform: rotateZ(180deg);
}
</style>
