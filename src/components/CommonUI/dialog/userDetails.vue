<template>
  <pop
    css="width: 11.6rem;"
    :level="param.level"
    @closed="onClosed"
    title="用户详情"
    footer="display:none">
    <div class="detail_m">
      <Box3 css="height:4.25rem;">
        <ul class="detail_ul">
          <li><span>姓名</span>张亚</li>
          <li><span>性别</span>男</li>
          <li><span>民族</span>汉</li>
          <li><span>政治面貌</span>-</li>
          <li><span>学历</span>无</li>
          <li><span>婚姻状况</span>-</li>
          <li><span>身份证号</span>310293819283948291</li>
          <li><span>出生日期</span>1983-01-14</li>
          <li><span>联系方式</span>13718273991</li>
          <li><span>人口标签</span>-</li>
          <li><span>户籍地</span>-</li>
          <li><span>房位信息</span>xx小区16号101</li>
          <li><span>所属项目1</span>xx小区</li>
        </ul>
        <div class="detail_img">
          <Box3 css="width:2.16rem;height:2.44rem;box-sizing:border-box;padding-top:.05rem"><img
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1529598461947&di=ddfcad478564e9fbd07cb26de3c0c711&imgtype=0&src=http%3A%2F%2Fwww.qqzhi.com%2Fuploadpic%2F2015-01-20%2F080149541.jpg"
            alt=""></Box3>
        </div>
      </Box3>
    </div>
  </pop>
</template>

<script>

import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'

export default {
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  name: 'UserDetails',
  data () {
    return {

    }
  },
  components: {
    pop,
    boxTitle
  },
  mounted: function () {
    console.log(this.param)
  },
  methods: {
    onClosed: function () {
      // 此处做一些资源的释放
    }
  },
  watch: {

  }
}
</script>

<style scoped>
.detail_m{
  box-sizing: border-box;
  padding:.1rem .2rem 0 .2rem;
  position: relative;
}
.detail_ul{
  width:9rem;
  overflow: hidden;
  padding-top: .1rem;
}
.detail_ul li:nth-of-type(odd){
  width:5rem;
  overflow: hidden;
  float: left;
  box-sizing: border-box;
  padding-left: .2rem;
}
.detail_ul li:nth-of-type(even){
  width:4rem;
  overflow: hidden;
  float: left;
}
.detail_ul li{
  line-height: .55rem;
  font-size: .28rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.detail_ul li span{
  width: 1.3rem;
  text-align: right;
  display: inline-block;
  margin-right: .1rem;
}
.detail_img{
  position: absolute;
  right: .4rem;
  top: .2rem;
  text-align: center;
}
.detail_img img{
  width:1.88rem;
  height:2.3rem
}
</style>
