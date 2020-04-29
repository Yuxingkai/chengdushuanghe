<template>
  <div style="position: relative">
    <div class="contain">
      <div class="left"/>
      <div
        class="content"
        @click.stop="changeUl">
        <span
          class="single"
          v-for="(list,index) in contents"
          :key="list.index"
          @click.stop="close(index)">
          <span
            style="vertical-align: middle"
            class="nameClass">{{ list.roleName }}</span>
          <span class="xBtn">x</span>
        </span>
        <div
          class="btn"
          :class="choose ? 'transdown' : 'transup'"/>
      </div>
      <div class="right"/>
    </div>
    <ul
      v-show="choose"
      style="position: absolute;width: 100%;z-index: 1"
      :class="items.length > 8 ? 'ulheight' : ''">
      <happy-scroll size="0">
        <li
          v-for="item in items"
          :key="item.index">
          <input
            :id="'checkboxId'+item.roleName"
            class="btn-checkbox"
            type="checkbox"
            :value="{roleName: item.roleName, roleID: item.roleID}"
            v-model="contents"
            @change="handleChange">
          <label :for="'checkboxId'+item.roleName"><span>{{ item.roleName }}</span></label>
        </li>
      </happy-scroll>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'MultipleSelect',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    },
    content: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      choose: false,
      contents: this.content
    }
  },
  watch: {
    content (newval, oldval) {
      this.contents = newval
    }
  },
  created () {
    document.addEventListener('click', (e) => {
      // console.log(this.$el.contains(e.target))
      if (!this.$el.contains(e.target)) {
        this.choose = false
      }
    })
    document.onkeydown = (e) => {
      if (!e) e = window.event
      if ((e.keyCode === 13)) {
        this.choose = false
        this.$emit('selserch', this.contents)
      }
    }
  },
  methods: {
    changeUl () {
      this.choose = !this.choose
      this.$emit('changeSelect', false)
    },
    handleChange () {
      console.log(this.contents, 'multi')
      this.$emit('chosenSelect', this.contents)
    },
    close (index) {
      this.contents = this.contents.filter((item, id) => {
        return id !== index
      })
      this.$emit('chosenSelect', this.contents)
    }
  }
}
</script>

<style scoped>
  @media screen and (min-width: 3001px) {
    ul li{
      font-size:.42rem !important;
    }
    .contain .content{
      min-height: .76rem !important;
    }
    .nameClass{
      font-size: .42rem !important;
    }
    .contain .content .single{
      margin-top: .1rem !important;
    }
  }
  .contain{
    width: 100%;
    display: grid;
    grid-template-columns: 5px 1fr 5px
  }
  .contain .content{
    min-height: .56rem;
    border-top: .5px solid #31f1febd;
    border-bottom: .5px solid #31f1febd;
    position: relative;
    padding-right: 30px;
    /*padding-top: 2px;*/
    padding-bottom: 3px;
    padding-left: 3px;
    overflow-wrap: break-word;
  }
  .contain .content .single{
    border: .5px solid #31f1febd;
    padding: .5px 8px;
    border-radius: 8px;
    margin-top: .1rem;
    margin-left: 6px;
    float: left;
    vertical-align: middle;
  }
  .contain .content .single .xBtn{
    width: 19px;
    height: 19px;
    display: inline-block;
    border-radius: 9px;
    text-align: center;
    line-height: 19px;
    vertical-align: middle;
  }
  .contain .content .single .xBtn:hover{
    background: #50bce0;
    font-size: 12px;
  }
  .contain .btn{
    display:block;
    width:0;
    height:0;
    border-width:4px 4px 0;
    border-style:solid;
    border-color:#31f1fe transparent transparent;
    vertical-align: middle;
    position:absolute;
    top:50%;
    right:8px;
  }
  .transup{
    transform: rotate(90deg);
  }
  .transdown{
    transform: rotate(0deg);
  }
  .contain .left{
    background: url('../../../assets/images/left-1.png') center center no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 5px;
  }
  .contain .right{
    background: url('../../../assets/images/right-1.png') center center no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 5px;
  }
   ul {
    text-align: center;
    overflow: hidden;
     background: #0a1e38;
  }
   ul li{
    color: #befefe;
    font-size: .28rem;
    background: #102044;
    margin-top: .07rem;
    line-height: .55rem;
    border-left: 1px solid #3cc3ff;
    border-right: 1px solid #3cc3ff;
    box-sizing: border-box;
    text-align: left;
    width: 99%;
  }
   .ulheight{
     height: 4.96rem;
   }
   ul li span{
    position: relative;
    top:-.1rem
  }
   ul li .btn-checkbox{position:absolute;display:none}
   ul li .btn-checkbox+label{position:relative;top:.1rem;padding-left: 1rem;display:flex;}
   ul li .btn-checkbox+label:after{position:absolute;top:.1rem;left:.45rem;display:none;width:.16rem;height:.08rem;content:'';border-bottom:.02rem solid #fff;border-left:.02rem solid #fff;box-sizing:border-box;transform:rotate(-46deg)}
   ul li .btn-checkbox+label:before{position:absolute;display:block;width:.2rem;height:.2rem;content:'';border:1px solid silver;top:.03rem;left: .4rem;border-radius:.03rem;background:#3e97eb;border:1px solid rgba(45, 245, 243, 0.5)}
   ul li .btn-checkbox:checked+label:after{display:block}
</style>
