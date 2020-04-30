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
            class="nameClass">{{ list.typeName }}</span>
          <div class="xBtn">x</div>
          <span class="btnbacground"/>
        </span>
      </div>
      <div class="right"/>
      <div
        class="btn"
        :class="choose ? 'transdown' : 'transup'"/>
    </div>
    <ul
      v-if="choose"
      style="position: absolute;width: 100%;z-index: 1"
      :class="itemsData.length > 8 ? 'ulheight' : ''">
      <li style="position: relative">
        <input
          @keyup="searchVal($event)"
          class="canInput"
          type="text"
          style="text-indent: .5rem"
          placeholder="请搜索">
        <i
          style="position: absolute;top: .15rem;right: .2rem"
          class="el-icon-search"/>
      </li>
      <happy-scroll size="0">
        <li
          v-if="noSearchData"
          style="padding-left: 1rem">没有相关标签</li>
        <li
          v-for="item in itemsData"
          :key="item.index">
          <input
            :id="'checkboxId'+item.name"
            class="btn-checkbox"
            type="checkbox"
            :value="{name: item.name, typeName: item.typeName}"
            v-model="contents"
            @change="handleChange">
          <label :for="'checkboxId'+item.name"><span>{{ item.typeName }}</span></label>
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
      contents: this.content,
      itemsData: this.items,
      noSearchData: false
    }
  },
  watch: {
    content (newval, oldval) {
      this.contents = newval
    },
    items (newval, oldval) {
      this.itemsData = newval
    }
  },
  created () {
    document.addEventListener('click', (e) => {
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
  mounted () {
    this.itemsData = this.items
  },
  methods: {
    searchVal (e) {
      this.itemsData = this.items.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
      if (this.itemsData.length === 0) {
        this.noSearchData = true
      } else {
        this.noSearchData = false
      }
    },
    changeUl () {
      this.choose = !this.choose
      this.itemsData = this.items
      this.$emit('changeSelect', false)
      if (this.choose) {
        this.noSearchData = false
      }
    },
    handleChange () {
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
  /*input::-webkit-input-placeholder {*/
      /*color: white;*/
    /*}*/
  ::-webkit-scrollbar{width:10px;background-color: transparent}
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
    .contain .content{
      border-top: 1px solid #009fe8a6 !important;
      border-bottom: 1px solid #009fe8a6 !important;
    }
  }
  @media screen and (min-width: 6001px) {
    ul li{
      font-size:.62rem !important;
      line-height: 1.2rem !important;
    }
    .contain .content{
      min-height: 2rem !important;
    }
    ul li .btn-checkbox+label:before {
      width: .4rem !important;
      height: .4rem !important;
      top: .2rem !important;
    }
    .contain .btn {
      border-width: 16px 16px 0 !important;
    }
    .nameClass{
      font-size: .62rem !important;
    }
    .contain .content .single{
      margin-top: .2rem !important;
    }
  }
  .contain{
    width: 100%;
    display: grid;
    grid-template-columns: 9px 1fr 9px
  }
  .contain .content{
    min-height: .72rem;
    max-height: 1.66rem;
    border-top: .5px solid #009fe8a6;
    border-bottom: .5px solid #009fe8a6;
    position: relative;
    padding-right: .16rem;
    padding-bottom: .06rem;
    padding-left: .06rem;
    overflow-wrap: break-word;
    overflow-y: auto;
  }
  .contain .content .single{
    position: relative;
    padding: .04rem .2rem;
    margin: .12rem .04rem 0;
    float: left;
    vertical-align: middle;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: .32rem;
  }
  .contain .content .single .nameClass{
    float: left;
  }
  .contain .content .single .xBtn{
    float: left;
    font-size: .24rem;
    z-index: 3;
    line-height: .4rem;
    text-align: center;
    width: .4rem;
    border-radius: .2rem;
    margin-left: .2rem;
    opacity: .7;
  }
  .contain .content .single .xBtn:hover{
    background: #50bce0;
    font-size: 12px;
    cursor: pointer;
  }
  .contain .content .single .btnbacground {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.6;
    border-radius: .06rem;
    left: 0;
    top: 0;
    background: #3caddab3;
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
    top:44%;
    right:.25rem;
  }
  .transup{
    transform: rotate(90deg);
  }
  .transdown{
    transform: rotate(0deg);
  }
  .contain .left{
    background: url('../../../assets/newjs/pic/left.png') center center no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 9px;
  }
  .contain .right{
    background: url('../../../assets/newjs/pic/right.png') center center no-repeat;
    background-size: 100% 100%;
    height: 100%;
    width: 9px;
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
