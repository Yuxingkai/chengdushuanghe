<template>
  <pop
    css="width:16.3rem;"
    :title="titleInfo"
    :level="param.level"
    footer="display:none">
    <div class="equipmentImg">
      <ul>
        <li
          v-for="item in imgInfo"
          :key="item.id">
          <Box3 css="width:5.2rem;height:5.4rem;box-sizing:border-box;padding-top:.1rem">
            <img
              :src="item.srcImg"
              alt="">
          </Box3>
        </li>
      </ul>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
export default {
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'EquipmentImg',
  data () {
    return {
      titleInfo: '消防设备',
      imgInfo: [
        {srcImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1875788854,492261694&fm=27&gp=0.jpg'},
        {srcImg: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1770519118,1459514514&fm=27&gp=0.jpg'},
        {srcImg: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299189482,2519172163&fm=27&gp=0.jpg'},
        {srcImg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2055189389,1809978764&fm=27&gp=0.jpg'},
        {srcImg: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1329838933,2073117081&fm=27&gp=0.jpg'},
        {srcImg: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1677688439,4284318295&fm=27&gp=0.jpg'}
      ]
    }
  },
  methods: {

  },
  components: {
    pop
  },
  mounted: function () {

  }
}
</script>

<style scoped>
.equipmentImg{
  width: 100%;
  box-sizing: border-box;
  padding: .1rem 0 0 .12rem;
}
.equipmentImg ul{
  overflow: hidden;
}
.equipmentImg ul li{
  float: left;
  margin-right: .1rem;
  text-align: center;
}
.equipmentImg ul li img{
  width: 5rem;
  height: 5.2rem;
}
.equipmentImg ul li:nth-of-type(3n){
  margin-right: 0;
}
</style>
