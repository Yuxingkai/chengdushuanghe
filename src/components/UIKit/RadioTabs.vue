<template>
  <div
    class="top"
    :style="css">
    <ul
      id="a"
      class="default_data clear">
      <li
        v-for="(item,i) in innerItems"
        :class="{active : i===innerIndex}"
        :key="i"
        @click="select(i)" >
        <p
          class="sliderTilSmall"
          v-if="showType === 1">{{ item }}</p>
        <p
          class="hold"
          v-if="showType === 2">{{ item }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      innerItems: [],
      innerIndex: this.currentIndex
    }
  },
  props: {
    items: {
      type: [String],
      default: ''
    },
    css: {
      type: [String],
      default: ''
    },
    currentIndex: {
      type: [Number],
      default: 0
    },
    showType: {
      type: Number,
      default: 1
    }
  },
  watch: {
    items: () => {
      this.reload()
    },
    innerIndex: function (val) {
      this.$emit('on-index-changed', [this.innerItems[val], val])
    }
  },
  mounted: function () {
    this.reload()
    // console.log(this.innerItems.length)
  },
  methods: {
    reload: function () {
      this.innerItems = []
      this.items.split(',').forEach((itm) => {
        this.innerItems.push(itm)
      })
    },
    select: function (index) {
      this.innerIndex = index
    }
  }
}
</script>

<style scoped>
  .top {
    display: inline-block;
  }
  .active {
    background: linear-gradient(to top, #a4e8fcba, #0edffae8);
    background: -moz-linear-gradient(to top, #a4e8fcba, #0edffae8);
    background: -o-linear-gradient(to top, #a4e8fcba, #0edffae8);
    background: -webkit-linear-gradient(to top, #a4e8fcba, #0edffae8);
    font-weight: bold;
  }
  ul {
    /* height:0.7rem; */
  }
  ul li {
    list-style: none;
  }
  ul {
    display: flex;
    box-sizing: border-box;
    white-space: nowrap;
  }
  ul li {
    text-align: center;
    float: left;
    display: table;
    cursor: pointer;
    padding: 0 0.05rem;
    color: #ffffff;
    background: none;
    /* padding: .04rem; */
    float: left;
    transform: skew(-25deg);
    border: 1px solid #1eb6d1;
    border-right: none;
  }
  ul li:last-child {
    border-right: 1px solid #1eb6d1;
  }
  ul li p {
    margin: 0;
    padding: 0rem 0.1rem;
    transform: skew(25deg);
  }
  .hold{
    font-size: .24rem;
  }
</style>
