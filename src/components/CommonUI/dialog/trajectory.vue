<template>
  <pop
    css="width:19.1rem;"
    :level="param.level"
    @closed="onClosed">
    <div class="main_content">
      <div class="content_left">
        <boxTitle title="历史视频"/>
        <Box3 type="3">
          <div class="tv">
            <player :src="tvSrc"/>
          </div>
        </Box3>
      </div>
      <div class="content_right">
        <boxTitle title="人员信息"/>
        <Box3 css="width:6.6rem;margin-top:.12rem;height: 7.4rem;">
          <ul class="right_ul1">
            <li
              v-for="item in imgInfo"
              :key="item.id">
              <Box3 css="height:2rem;width:1.72rem;margin:0 auto">
                <img :src="item.imgSrc">
              </Box3>
              <span>{{ item.name }}</span>
            </li>
          </ul>
          <ul
            class="peopleInfo_ul"
            v-for="item in peopleInfo"
            :key="item.id">
            <li>姓名：{{ item.name }}</li>
            <li><span>性别：{{ item.sex }}</span> <span>年龄：{{ item.age }}</span></li>
            <li>联系方式：{{ item.phone }}</li>
            <li>身份证号：{{ item.idCard }}</li>
            <li>最后通行时间：{{ item.time }}</li>
            <li>开门方式：{{ item.type }}</li>
            <li>卡号：{{ item.cardNum }}</li>
          </ul>
        </Box3>
      </div>
    </div>
    <div
      slot="footer"
      v-for="item in brandInfo"
      :key="item.id">
      <span>设备编码：{{ item.coding }}</span>
      <span>品牌型号：{{ item.brand }}</span>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxTitle from '../../home/public/boxTitle'

export default {
  name: 'AccessTrajectory',
  props: {
    param: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      tvSrc: '',
      imgInfo: [
        {'name': '用户头像', 'imgSrc': 'https://p.ssl.qhimg.com/dmfd/125_71_/t01e31841acd6a1fd6e.bmp?size=599x275'},
        {'name': '开门头像', 'imgSrc': 'https://p.ssl.qhimg.com/dmfd/125_71_/t01e31841acd6a1fd6e.bmp?size=599x275'}
      ],
      peopleInfo: [
        {'name': '王健在', 'sex': '男', 'age': '38', 'phone': '13827394812', 'idCard': '283749283748374837', 'time': '2018-05-31 12:23:24', 'type': 'NFC卡', 'cardNum': 'Nkd293843927'}
      ],
      brandInfo: [
        {'coding': 'dv3948520394', 'brand': '海康'}
      ]

    }
  },
  mounted: function () {
    console.log(this.param)
  },
  methods: {
    onClosed: function () {
      // 此处做一些资源的释放
    }
  },
  components: {
    boxTitle,
    pop
  }
}
</script>

<style scoped>
  .main_content{
    overflow: hidden;
    padding-top: .2rem;
  }
  .content_left {
    float: left;
    padding-left: .1rem;
    margin-right: .2rem;
  }
  .content_left .tv{
    width:11.6rem;
    height:7.24rem;
  }
  .content_right{
    float: left;
  }
  .right_ul1{
    overflow: hidden;
    width:100%;
    padding:.12rem 0;
  }
  .right_ul1 li{
    float: left;
    width:50%;
    text-align: center;
  }
  .right_ul1 li img{
    width:1.52rem;
    height:1.86rem;
    margin:.08rem auto;
  }
  .right_ul1 li span{
    display: inline-block;
    width:1.74rem;
    font-size: .28rem;
    background: rgba(44,136,255,.5);
    color: #e2e2e2;
    text-align: center;
  }
  .peopleInfo_ul{
    font-size: .28rem;
    color: #e2e2e2;
    box-sizing: border-box;
    padding:0 .2rem;
  }
  .peopleInfo_ul li{
    padding-left: .72rem;
    height:.56rem;
    line-height: .56rem;
    color: #e2e2e2;
  }
  .peopleInfo_ul li span{
    margin-right: 1.4rem;
  }
  .peopleInfo_ul li:nth-of-type(odd){
    background: rgba(164,257,232,.2);
  }
</style>
