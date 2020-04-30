<template>
  <buildingInfo
    css="width:1225px;height:696px"
    @on-index-change="closeUp"
    title="19号楼感知数据">
    <ul class="popup_ul">
      <li
        v-for="item in items"
        :key="item.id">{{ item.name }}:{{ item.num }}</li>
    </ul>
    <div class="popup_m">
      <div class="p_left">
        <h4>
          <p>设备统计</p>
          <span/>
          <img
            src="../../assets/images/title_1.png"
            alt="">
        </h4>
        <box3/>
        <box3/>
        <box3/>
      </div>
      <div class="p_middle">
        <tv/>
      </div>
      <div class="p_right">
        <pop1/>
      </div>
    </div>
    <div slot="footer">
      <span>设备编码：dv3948520394</span>
      <span>品牌型号：海康</span>
      <span><input
        type="radio"
        name="aa"
        checked
        style="background:green;">在线</span>
      <span><input
        type="radio"
        name="bb"
        checked>启动</span>
      <span>运行时间：135天4小时</span>
    </div>
  </buildingInfo>
</template>

<script>
import box3 from '../UIKit/Box-3'
import tv from '../CommonUI/Poptv'
import pop1 from '../../temp/info-css'
// import pop2 from '../../temp/info-tab'
import buildingInfo from '../home/public/popupContainer'

export default{
  name: 'Popup',
  data () {
    return {
      items: [
        {name: '老人', num: '23'},
        {name: '小孩', num: '23'},
        {name: '重点', num: '23'},
        {name: '关爱', num: '23'}
      ]
    }
  },
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  components: {
    box3: box3,
    tv: tv,
    pop1: pop1,
    buildingInfo
  },
  methods: {
    closeUp (msg) {
      this.$emit('on-index-change', msg)
    },
    load (id) {
      // alert(id)
    }
  },
  mounted: function () {
    console.log(this.param)
  },
  watch: {

  }
}
</script>
<style scoped>
*{
  margin:0;padding:0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 .2rem;
}

 ul.popup_ul{
  overflow:hidden;
  padding: .1rem 0;
  margin:0 auto;
  position: absolute;
  left: 50%;
  top: .88rem;
  transform: translateX(-50%);
   -webkit-transform: translateX(-50%);
   -o-transform: translateX(-50%);
   -moz-transform: translateX(-50%);
}
 ul.popup_ul li{
  width: 1.36rem;
  height: .36rem;
  color: #31f1fe;
  font-weight: bold;
  line-height: .36rem;
  float:left;
  border-left: .04rem solid #ff0080;
  text-align:center;
}

.popup_m h4{
  font-family: 微软雅黑;
  font-size: .32rem;
  margin-bottom: .16rem;
}

.popup_m{
  overflow:hidden;
  padding-top: .6rem;
  margin:0;
}
.popup_m .p_left{
  padding-left: .2rem;
  float:left;
}
.popup_m .p_left h4{
  font-size: .32rem;
  position: relative;
  box-sizing: border-box;
}
.popup_m .p_left h4 p{
  box-sizing: border-box;
  padding-bottom: .06rem;
  width: 2rem;
  display: inline-block;
  border-bottom: 1px solid #004459;
}
.popup_m .p_left h4 img{
  width: 2.68rem;
  position: absolute;
  top:- .24rem;
  left: .4rem;
}
.popup_m .p_left h4 span{
  display: inline-block;
  width: 2.08rem;
  height: .32rem;
  border-left: 1px solid #004459;
  border-top: 1px solid #004459;
  transform: skew(-45deg) translate(.3rem,.16rem);
  -webkit-transform: skew(-45deg) translate(.3rem,.16rem);
  -o-transform: skew(-45deg) translate(.3rem,.16rem);
  -moz-transform: skew(-45deg) translate(.3rem,.16rem);
}
.popup_m .p_left div{
  width: 4.48rem;
  height: 3.5rem;
  margin-top: .16rem;
}

.popup_m .p_middle{
  float:left;
  margin:1px .16rem;
}
.popup_m .p_right{
  float:left;
}

</style>
