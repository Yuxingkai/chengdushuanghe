<template>
  <div
    :style="css"
    :class="{'typeHoverclass' : typeHoverInfo === '1'}"
    class="box2">
    <div
      :class="typeClass"
      class="box2C">
      <span class="sp1"/>
      <span class="sp2"/>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box2',
  props: {
    css: {
      type: [String],
      default: ''
    },
    type: {
      type: String,
      default: '2'
    },
    typeHover: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      typeClass: 'type2',
      typeHoverInfo: this.typeHover
    }
  },
  created () {
    this.boxstyle()
  },
  watch: {
    type (oldtype, newtype) {
      if (oldtype === '1') {
        this.typeClass = 'type1'
      } else if (oldtype === '3') {
        this.typeClass = 'type3'
      } else if (oldtype === '4') {
        this.typeClass = 'type4'
      } else {
        this.typeClass = 'type2'
      }
    }
  },
  methods: {
    boxstyle () {
      let a = this.type
      if (a === '1') {
        this.typeClass = 'type1'
      } else if (a === '3') {
        this.typeClass = 'type3'
      } else if (a === '4') {
        this.typeClass = 'type4'
      } else {
        this.typeClass = 'type2'
      }
    }
  },
  mounted () {
    console.log(this.typeHover, this.typeHoverInfo, typeof (this.typeHoverInfo), 'box2')
  }
}
</script>

<style scoped>
.box2{
  cursor: pointer;
}
.box2C {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/images/lan3/gezi2.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.typeHoverclass .box2C:hover {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("../../assets/images/lan3/gezi3.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.box2C .sp1:before {
  position: absolute;
  content: '';
  left: 0;
  top: 0;
  width: .1rem;
  height: .1rem;
  border-left: .02rem solid rgba(58,232,255,1);
  border-top: .02rem solid rgba(58,232,255,1);
}
.box2C .sp1:after {
  position: absolute;
  content: '';
  right: 0;
  top: 0;
  width: .1rem;
  height: .1rem;
  border-right: .02rem solid rgba(58,232,255,1);
  border-top: .02rem solid rgba(58,232,255,1);
}
.box2C .sp2:before {
  position: absolute;
  content: '';
  right: 0;
  bottom: 0;
  width: .1rem;
  height: .1rem;
  border-right: .02rem solid rgba(58,232,255,1);
  border-bottom: .02rem solid rgba(58,232,255,1);
}
.box2C .sp2:after {
  position: absolute;
  content: '';
  left: 0;
  bottom: 0;
  width: .1rem;
  height: .1rem;
  border-left: .02rem solid rgba(58,232,255,1);
  border-bottom: .02rem solid rgba(58,232,255,1);
}

.type1 .sp1:before {
  border-left: 2px solid rgba(58,232,255,1);
  border-top: 2px solid rgba(58,232,255,1);
}
.type1 .sp1:after {
  border-right: 2px solid rgba(58,232,255,1);
  border-top: 2px solid rgba(58,232,255,1);
}
.type1 .sp2:before {
  border-right: 2px solid rgba(58,232,255,1);
  border-bottom: 2px solid rgba(58,232,255,1);
}
.type1 .sp2:after {
  border-left: 2px solid rgba(58,232,255,1);
  border-bottom: 2px solid rgba(58,232,255,1);
}
.type3 {
  background: url("../../assets/images/lan3/gezi2.png");
  background-repeat: repeat;
  background-size: .15rem .15rem;
}
.type4 {
  background: url("../../assets/images/lan3/gezi3.png");
  background-repeat: repeat;
  background-size: .15rem .15rem;
}
</style>
