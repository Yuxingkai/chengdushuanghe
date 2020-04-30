<!--suppress ALL -->
<template>
  <div
    style="display: grid;grid-template-rows: auto auto"
    class="headCascader title_back"
    id="search"
  >
    <!--<div @click="reminder">11111111111111111111</div>-->
    <div class="container">
      <div style="margin-top: .7rem">
        <div
          @click="toStreet"
          class="headlog" />
        <div
          style="position: relative"
          class="headtext"
          ref="switch_village"
          @click.stop="switchVillage"
        >
          <div class="headtextTop">{{ Title }}</div>
          <div class="headtextBottom">智慧社区服务管理平台</div>
        </div>
      </div>
      <div style="grid-column: 2;">
        <ul class="menu navTit">
          <router-link
            v-for="menu in menus"
            :key="menu.name"
            :to="menu.path"
            tag="li"
          >{{ menu.name }}</router-link>
        </ul>
      </div>
      <div class="ico_commit">
        <a
          href="#"
          class="ico_button"
          @click="account">
          <box3 css="height:.8rem;width:.8rem;padding:0.035rem 0.02rem;box-sizing: border-box;">
            <span
              :class="{'active': isClick}"
              ref="menu_logout_span">
              <img
                src="../../../assets/images/icon/ico-user.svg"
                ref="menu_logout_img" >
            </span>
          </box3>
        </a>
        <ul
          class="account"
          v-if="showAccount">
          <!--<li>-->
          <!--<i/>账户设置</li>-->
          <li @click="logout">
            <i />退出登陆
          </li>
        </ul>
      </div>
    </div>
    <!--v-show="showSubMenu"-->
    <div
      style="grid-row: 2;height: 48px;margin: 0px 0;z-index:1"
      class="animated"
      :class="{ fadeIn: showSubMenu }"
    >
      <ul class="submenu">
        <router-link
          v-for="menu in subMenus"
          :key="menu.name"
          @click.native="refreshData(menu.path)"
          :to="menu.path"
          tag="li"
        >
          <div class="subbutton-l">&nbsp;</div>
          <div class="subbutton-c">
            <div class="subbutton-c-1">
              <div class="subbutton-c-1-1" />
            </div>
            <div
              class="subbutton-c-2 navTitSmall"
              @click="listenPath('center')"
              style="display:table;height:100%;"
            >
              <div style="display: table-cell;vertical-align: middle;">
                {{ menu.name }}
                <span
                  v-if="menu.total>0"
                  style="font-family:'tsl' !important;"
                >&nbsp;{{ menu.total }}</span>
              </div>
            </div>
          </div>
          <div class="subbutton-r">&nbsp;</div>
          <div
            v-if="menu.exTotal>0"
            class="extotal">
            <span style="font-size:0.32rem">
              <img
                src="../../../assets/images/extotal.svg"
                style="width:0.28rem;height:0.28rem;margin-right:0.1rem;vertical-align:sub;margin-bottom:0.04rem;font-family:'tsl' !important;"
              >
              {{ menu.exTotal }}
            </span> 个异常
          </div>
        </router-link>
      </ul>
      <div
        style="color: white;font-size: .32rem"
        v-if="subMenus.length === 0">
        <div
          id="move"
          v-show="marqueeShow">
          <iframe
            width="100%"
            src="../../../../static/marquee.html"
            frameborder="0" />
            <!--<marquee behavior="" direction="" onMouseOut="this.start()" onMouseOver="this.stop()">-->
            <!--<span v-html="marquee">-->
            <!--&lt;!&ndash; '<span style="margin-left: 20px;"><i class="iconfont">&#xe66e</i><span style="vertical-align: middle;">物业人员1 18888838888</span></span>' &ndash;&gt;-->
            <!--</span>-->
            <!--</marquee>-->
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<style>
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: rgba(0, 190, 255, 0.6);
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(0, 190, 255, 0.6);
}
.el-cascader-menu__item:hover,
.el-cascader-menu__item:focus:not(:active) {
  background-color: rgba(0, 190, 255, 1);
}
.el-cascader-menu__item.is-active {
  color: white;
}
.el-cascader-menu__item {
  color: white;
}
.el-cascader-menus {
  background: none;
  border: none;
}
.el-cascader-menu {
  background-color: rgba(0, 190, 255, 0.6);
  border: none;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
}
.el-cascader {
  line-height: 0.8rem;
}
.el-cascader__label {
  padding: 0;
}
.el-input__inner {
  background-color: rgba(0, 190, 255, 0.6);
  border: none;
  color: white;
}
.el-cascader-menu__item.is-disabled {
  background-color: rgba(0, 190, 255, 0.6) !important;
  color: white;
}
.el-cascader__label {
  color: white;
}
.el-cascader-menu {
  height: auto !important;
  max-height: 7rem !important;
}
</style>
<style scoped>
.title_back {
  background-image: url("../../../assets/images/title_background2.png");
  background-size: 43px;
}
.headlog {
  float: left;
  width: 3.72rem;
  height: 1.02rem;
  line-height: 1.02rem;
  background-image: url("../../../assets/newPic/Image34.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.headtext {
  float: left;
  height: 1.02rem;
  color: #02bffe;
  padding-left: 0.4rem;
  cursor: pointer;
}
.headtextTop {
  line-height: 0.5rem;
  height: 0.5rem;
  font-size: 0.44rem;
  text-align: left;
  letter-spacing: 8px;
}
.headtextBottom {
  line-height: 0.5rem;
  height: 0.5rem;
  margin-top: 0.1rem;
  font-size: 0.32rem;
  text-align: left;
  letter-spacing: 4px;
}
.settingHover {
  background: linear-gradient(#13c0d8, #77b1c8);
}
.titleImg {
  width: 8rem;
  margin-top: 0.25rem;
}
#move {
  width: 70%;
  margin-left: 15%;
  height: 1rem;
  overflow: hidden;
  position: relative;
  font-size: 0.32rem;
}
/*.subbutton-l {*/
/*border-width: 0.02rem 0px 0.02rem 0.02rem;*/
/*border-color: #0471bf;*/
/*border-style: solid;*/
/*grid-row: 1/5;*/
/*}*/
.subbutton-c {
  grid-column: 2;
  border-width: 2px 0px 3px 0px;
  /*border-color: #0471bf;*/
  /*border-style: solid;*/
  /*min-width: 2rem;*/
  grid-row: 1/5;
  /*display: grid;*/
  /*grid-template-rows: 0.04rem auto 0.02rem 1fr 0.04rem;*/
}
.subbutton-c-2 span {
  font-size: 0.28rem;
  display: inline;
}
.submenu li:hover .subbutton-c,
.submenu .active .subbutton-c,
.submenu li:hover .subbutton-c-1,
.submenu .active .subbutton-c-1,
.submenu li:hover .subbutton-c-2,
.submenu .active .subbutton-c-2,
.submenu li:hover .subbutton-r,
.submenu .active .subbutton-r,
.submenu li:hover .subbutton-l,
.submenu .active .subbutton-l,
.submenu li:hover .subbutton-r .submenu .active .subbutton-r {
  /*border-color: #00ffff;*/
  /* color: #00ffff; */
  font-weight: normal;
}
.submenu li:hover .subbutton-c-2 {
  /*border-color: #00ffff;*/
}
.subbutton-c-1 {
  border-width: 0.02rem 0 0 0.02rem;
  height: 0.04rem;
  border-style: solid;
  border-color: #0471bf;
  grid-row: 2;
  margin-left: 0.08rem;
  margin-right: 0.06rem;
  display: none;
}
.subbutton-c-2 {
  grid-row: 3;
  border-style: solid;
  border-color: transparent;
  color: #a4edfc;
  border-width: 0 0 0 0.04rem;
  padding: 0 0.4rem;
  font-weight: 400;
  color: rgba(0, 190, 255, 1);
  opacity: 0.7;
}
/********个人调试*******/
.subbutton-c-1-1 {
  display: node;
  height: 0;
}
.submenu li:hover .subbutton-c,
.submenu .active .subbutton-c {
  border-bottom-color: transparent;
}
.submenu li:hover .subbutton-c-1-1,
.submenu .active .subbutton-c-1-1 {
  width: 100%;
  position: absolute;
  /*background-image: linear-gradient(to top, #48D6FF, #1872B4);*/
  /*top: 0;*/
  /*left: 0;*/
  /*height: 0.64rem;*/
  /*z-index: 1;*/
  /*transition: all 0.3s;*/
  /*border-bottom: 0.06rem solid #00ffff;*/
  display: block;
}
.subbutton-c-1 {
  position: relative;
}
.submenu li:hover .subbutton-c-2,
.submenu .active .subbutton-c-2 {
  transition: all 0.3s;
  /*color: #ffffff;*/
  font-weight: bold;
  color: rgba(0, 190, 255, 1);
  opacity: 1;
  z-index: 2;
}
/* ************* */
.subbutton-r {
  /*width: auto;*/
  /*border-width: 0.02rem 0.02rem 0.02rem 0px;*/
  /*border-color: #0471bf;*/
  /*border-style: solid;*/
  /*grid-column: 3;*/
  /*grid-row: 1/5;*/
}
.container {
  /*background-image: url('../../../assets/images/head_decor.png');*/
  background-position-y: -0.06rem;
  background-repeat: repeat-x;
  height: 1.7rem;
  line-height: 1.7rem;
  display: grid;
  grid-template-columns: 9.4rem 1fr 9.4rem;
  grid-gap: 0.4rem;
  padding: 0 0.4rem 0 0.6rem;
  align-items: center;
}
.logoBoxB {
  position: absolute;
  top: 0.2rem;
  left: 0.8rem;
  font-size: 0.6rem;
  color: #f58f45;
  background: url("../../../assets/images/logo-box.png") no-repeat;
  line-height: 1.06rem;
  text-align: left;
  padding-left: 1.18rem;
  white-space: nowrap;
}
.logoBox {
  grid-column: 1;
  font-size: 0.6rem;
  color: #f58f45;
  /*background: url('../../../assets/images/logo-box.png') no-repeat;*/
  width: 5.6rem;
  height: 1.26rem;
  line-height: 1.46rem;
  text-align: left;
  /*padding-left: 1.18rem;*/
  white-space: nowrap;
}
div {
  text-align: center;
}
.menu {
  list-style: none;
  margin: 0 auto;
  line-height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu li {
  margin: 0 0.7rem;
  /* font-size: .6rem; */
  height: 1.3rem;
  /*color: #00ffff;*/
  color: rgba(190, 249, 255, 1);
  text-decoration: none;
  font-weight: 200;
  /*background: url('../../../assets/titleLight.png') no-repeat;*/
  /*background-size: 100%;*/
  line-height: 1.5rem;
  display: block;
  /*overflow: hidden;*/
  cursor: pointer;
  opacity: 0.5;
}
.menu li:hover {
  color: #31f1fe;
  font-weight: normal;
}
.menu .active {
  /*color: #31f1fe;*/
  color: rgba(0, 190, 255, 1);
  font-weight: normal;
  text-shadow: 0 0 20px #69b4ff;
  /*background: -webkit-radial-gradient(rgba(105,180,255,.3),rgba(105,180,255,0.18));*/
  /*box-shadow: 180px 0 100px #59a6f4d6;*/
  position: relative;
  /*background: url('../../../assets/titleLight.png') no-repeat;*/
  /*background-size: 100%;*/
  /*background-position: center center;*/
  opacity: 1;
}
.menu .active:before {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  content: "";
  width: 7rem;
  height: 5.5rem;
  background: url("../../../assets/titleLight.png") no-repeat center;
  background-size: cover;
}
.submenu {
  list-style: none;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.submenu li {
  display: grid;
  grid-template-columns: 0.06rem auto 0.06rem;
  grid-template-rows: 0.2rem 0.2rem 0.2rem 0.2rem;
  grid-column-gap: 0.04rem;
  margin: 0 0.04rem;
  font-size: 0.4rem;
  color: #7db8cb;
  text-decoration: none;
  font-weight: lighter;
  cursor: pointer;
  position: relative;
}
.submenu li.active::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.12rem;
  content: "";
  width: 100px;
  height: 10px;
  background: url("../../../assets/images/menu_two1.png") no-repeat;
  background-size: 100%;
  margin: 0 auto;
}
.extotal {
  position: absolute;
  width: 100%;
  bottom: 0;
  color: #fff;
  text-align: center;
  height: 0.4rem;
  line-height: 0.4rem;
  margin-bottom: -0.5rem;
  font-size: 0.22rem;
  background: #ff7f00;
}
ul.account {
  position: absolute;
  top: 1.2rem;
  width: 2.5rem;
  right: 0;
  color: #fff;
  margin-right: 16px;
  background-image: linear-gradient(
    to top,
    #14a6c3 0%,
    #3a9ebc 50%,
    #14a6c3 51%,
    #3a9ebc 100%
  );
  border-radius: 2px;
}
ul {
  position: relative;
}
ul.account:after {
  border: solid transparent;
  content: "";
  height: 0;
  right: 0.2rem;
  top: -15.7px;
  position: absolute;
  width: 0;
}
ul.account:after {
  border-width: 8px;
  border-bottom-color: #14a6c3;
}
ul.account > li {
  line-height: normal;
  font-size: 0.28rem;
  padding: 0.3rem 0.35rem;
  cursor: pointer;
}
ul.account > li:hover {
  background: #226272;
  border-radius: 2px;
}
ul.account > li > i {
  width: 0.4rem;
  height: 0.4rem;
  display: inline-block;
  margin-right: 0.24rem;
  vertical-align: middle;
}
ul.account > li:nth-of-type(1) > i {
  background: url("../../../assets/images/icon/ico-setting.svg") no-repeat;
}
ul.account > li:nth-of-type(2) > i {
  background: url("../../../assets/images/icon/logout.svg") no-repeat;
}
@media screen and (min-width: 3001px) {
  .container {
    grid-template-columns: 12.1rem 1fr 12.4rem;
  }
}
</style>

<script>
import { menus, apiNames } from '../../../config/config'
import { Post } from '../../../Utils/Http'
import user from '../../../Utils/user'
import { delCookie } from '../../../Utils/Common'

// import $ from 'jquery'
export default {
  data () {
    let data = {
      marquee: '',
      menus: [],
      showSubMenu: false,
      subMenus: [],
      showAccount: false,
      showSetting: false,
      isClick: false,
      conectData: [],
      selectedOptions: [],
      settDis: false,
      selectedOptions2: '',
      marqueeShow: false,
      functionList: [],
      changeShow: false,
      client: null
    }
    this.refreshMenu(data)
    return data
  },
  props: {
    Title: {
      type: [String],
      default: '0'
    },
    TitleID: {
      type: [String],
      default: '0'
    }
  },
  components: {},
  methods: {
    // reminder (phoneNo) {
    //   window.pop.show({
    //     level: 3,
    //     component: () => import('../../CommonUI/dialog/viewTV'),
    //     param: {
    //       level: 3,
    //       e: ''
    //     }
    //   })
    // },
    handleChange (value) {
      console.log(value)
    },
    refreshData (path) {
      this.$bus.emit('refreshData' + path)
    },
    overShow () {
      this.settDis = true
    },
    outHide () {
      this.settDis = false
    },
    toStreet () {
      this.$router.push('/street')
    },
    getMarquee () {
      this.marquee = ''
      let reqParam = user.getRequestHeader()
      reqParam.villageID = JSON.parse(
        window.localStorage.getItem('currentVillageID')
      ).villageID
      Post({
        async: true,
        url: apiNames['获取跑马灯'],
        data: reqParam,
        dataType: 'json',
        success: data => {
          if (data.marquee) {
            this.marquee = data.marquee
          } else {
            this.marquee = ''
          }
        }
      })
    },
    refreshMenu (data) {
      let childrens = null
      for (let i in this.menus) {
        if (this.$route.path.startsWith(this.menus[i].path)) {
          childrens = this.menus[i].menus
        }
      }
      if (childrens != null) {
        data.subMenus = childrens
        data.showSubMenu = true
      } else {
        data.showSubMenu = false
        data.subMenus = []
      }
    },
    // otherClick () {
    //   if (this.changeShow) {
    //     this.changeShow = false
    //   }
    // },
    elCascader () {
      this.changeShow = true
    },
    switchVillage () {
      // this.changeShow = !this.changeShow
      window.pop.show({
        level: 1,
        component: () => import('../../CommonUI/dialog/switchVillage'),
        param: {
          level: 1,
          e: {
            title: this.Title,
            titleID: this.TitleID
          }
          // e: byValue
        }
      })
    },
    account () {
      this.showAccount = !this.showAccount
      this.isClick = !this.isClick
    },
    logout () {
      let reqParam = user.getRequestHeader()
      let that = this
      Post({
        async: true,
        url: apiNames['登出'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          console.log(data)
          localStorage.removeItem('currentVillageID')
          localStorage.removeItem('currentWebGlobalConfig')
          localStorage.removeItem('screenChoose')
          let first = window.localStorage.getItem('firsrInfo')
          if (first) {
            localStorage.removeItem('firsrInfo')
          }
        }
      })
      delCookie('access-token')
      let api = that.addresIp()
      that.client = mqtt.connect(api)
      that.client.unsubscribe('/web/event/map/nbdevicealarm')
      that.$router.push({
        path: '/login'
      })
    },
    addresIp () {
      let hostname = window.location.hostname
      let origin = 'ws://' + hostname + ':3000'
      let url = hostname === 'localhost' ? 'ws://220.248.34.75:3000' : origin
      return url
    },
    listenPath (e) {
      if (e.indexOf('/home/sensor') === 0 || e === 'center') { this.$bus.emit('/map/center', e) }
    }
  },
  watch: {
    $route (to, from) {
      this.refreshMenu(this)
      // 动态检索
      let weikarenyuanFangwen = this.functionList.find(item => {
        return item.functionCode === 'weikarenyuan_fangwen'
      })
      let weikacheliangFangwen = this.functionList.find(item => {
        return item.functionCode === 'weikacheliang_fangwen'
      })
      let tongxingchaxunFangwen = this.functionList.find(item => {
        return item.functionCode === 'tongxingchaxun_fangwen'
      })
      let baojingchaxunFangwen = this.functionList.find(item => {
        return item.functionCode === 'baojingchaxun_fangwen'
      })
      let shebeichaxunFangwen = this.functionList.find(item => {
        return item.functionCode === 'shebeichaxun_fangwen'
      })
      let yitusoutuFangwen = this.functionList.find(item => {
        return item.functionCode === 'yitusoutu_fangwen'
      })
      let renlianjiansuoFangwen = this.functionList.find(item => {
        return item.functionCode === 'renlianjiansuo_fangwen'
      })
      // 神经感知
      let renlianganzhiFangwen = this.functionList.find(item => {
        return item.functionCode === 'renlianganzhi_fangwen'
      })
      let yujingganzhiFangwen = this.functionList.find(item => {
        return item.functionCode === 'yujingganzhi_fangwen'
      })
      let xiaofangganzhiFangwen = this.functionList.find(item => {
        return item.functionCode === 'xiaofangganzhi_fangwen'
      })
      let tongxingganzhiFangwen = this.functionList.find(item => {
        return item.functionCode === 'tongxingganzhi_fangwen'
      })
      let cheliangganzhiFangwen = this.functionList.find(item => {
        return item.functionCode === 'cheliangganzhi_fangwen'
      })
      let yunweiganzhiFangwen = this.functionList.find(item => {
        return item.functionCode === 'yunweiganzhi_fangwen'
      })
      // 动态检索
      if (weikarenyuanFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '微卡人员'
        })
      }
      if (weikacheliangFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '微卡车辆'
        })
      }
      if (tongxingchaxunFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '通行查询'
        })
      }
      if (baojingchaxunFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '报警查询'
        })
      }
      if (shebeichaxunFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '设备查询'
        })
      }
      if (yitusoutuFangwen === undefined) {
        this.routePath = this.routePath.filter(item => {
          return item.name !== '以图搜图'
        })
      }
      if (renlianjiansuoFangwen === undefined) {
        this.routePath = this.routePath.filter(item => {
          return item.name !== '人脸检索'
        })
      }
      // 神经感知
      if (renlianganzhiFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '人脸感知'
        })
      }
      if (yujingganzhiFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '预警感知'
        })
      }
      if (xiaofangganzhiFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '消防感知'
        })
      }
      if (tongxingganzhiFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '通行感知'
        })
      }
      if (cheliangganzhiFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '车辆感知'
        })
      }
      if (yunweiganzhiFangwen === undefined) {
        this.subMenus = this.subMenus.filter(item => {
          return item.name !== '运维感知'
        })
      }
      if (
        this.$route.path === '/home/sensor/warning' ||
        this.$route.path === '/home/search/pass'
      ) {
        this.$router.push(this.subMenus[0].path)
      }
      this.listenPath(this.$route.path)
      if (this.$route.path === '/home/trend/allState') {
        this.getMarquee()
        this.marqueeShow = true
        // window.localStorage.setItem('marqueeApi', apiNames['获取跑马灯'])
      } else {
        this.marqueeShow = false
      }
    }
  },
  created () {
    // 从配置获取菜单
    this.menus = menus
    this.functionList = JSON.parse(
      window.localStorage.getItem('webGlobalConfig')
    ).functionList
    let dongtaijiansuoFangwen = this.functionList.find(item => {
      return item.functionCode === 'dongtaijiansuo_fangwen'
    })
    let shenjingganzhiFangwen = this.functionList.find(item => {
      return item.functionCode === 'shenjingganzhi_fangwen'
    })

    if (dongtaijiansuoFangwen === undefined) {
      this.menus = this.menus.filter(item => {
        return item.name !== '动态检索'
      })
    }
    if (shenjingganzhiFangwen === undefined) {
      this.menus = this.menus.filter(item => {
        return item.name !== '神经感知'
      })
    }

    // 动态检索
    let weikarenyuanFangwen = this.functionList.find(item => {
      return item.functionCode === 'weikarenyuan_fangwen'
    })
    let weikacheliangFangwen = this.functionList.find(item => {
      return item.functionCode === 'weikacheliang_fangwen'
    })
    let tongxingchaxunFangwen = this.functionList.find(item => {
      return item.functionCode === 'tongxingchaxun_fangwen'
    })
    let baojingguanliFangwen = this.functionList.find(item => {
      return item.functionCode === 'baojingchaxun_fangwen'
    })
    let shebeichaxunFangwen = this.functionList.find(item => {
      return item.functionCode === 'shebeichaxun_fangwen'
    })
    let yitusoutuFangwen = this.functionList.find(item => {
      return item.functionCode === 'yitusoutu_fangwen'
    })
    let renlianjiansuoFangwen = this.functionList.find(item => {
      return item.functionCode === 'renlianjiansuo_fangwen'
    })
    // 神经感知
    let renlianganzhiFangwen = this.functionList.find(item => {
      return item.functionCode === 'renlianganzhi_fangwen'
    })
    let yujingganzhiFangwen = this.functionList.find(item => {
      return item.functionCode === 'yujingganzhi_fangwen'
    })
    let xiaofangganzhiFangwen = this.functionList.find(item => {
      return item.functionCode === 'xiaofangganzhi_fangwen'
    })
    let tongxingganzhiFangwen = this.functionList.find(item => {
      return item.functionCode === 'tongxingganzhi_fangwen'
    })
    let cheliangganzhiFangwen = this.functionList.find(item => {
      return item.functionCode === 'cheliangganzhi_fangwen'
    })
    let yunweiganzhiFangwen = this.functionList.find(item => {
      return item.functionCode === 'yunweiganzhi_fangwen'
    })
    // 动态检索
    if (weikarenyuanFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '微卡人员'
      })
    }
    if (weikacheliangFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '微卡车辆'
      })
    }
    if (tongxingchaxunFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '通行查询'
      })
    }
    if (baojingguanliFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '报警查询'
      })
    }
    if (shebeichaxunFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '设备查询'
      })
    }
    if (yitusoutuFangwen === undefined) {
      this.routePath = this.routePath.filter(item => {
        return item.name !== '以图搜图'
      })
    }
    if (renlianjiansuoFangwen === undefined) {
      this.routePath = this.routePath.filter(item => {
        return item.name !== '人脸检索'
      })
    }
    // 神经感知
    if (renlianganzhiFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '人脸感知'
      })
    }
    if (yujingganzhiFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '预警感知'
      })
    }
    if (xiaofangganzhiFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '消防感知'
      })
    }
    if (tongxingganzhiFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '通行感知'
      })
    }
    if (cheliangganzhiFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '车辆感知'
      })
    }
    if (yunweiganzhiFangwen === undefined) {
      this.menus = this.menus.menus.filter(item => {
        return item.name !== '运维感知'
      })
    }
    this.refreshMenu(this)
    // this.subMenus = this.menus[0].menus
    if (this.$route.path === '/home/trend/allState') {
      this.getMarquee()
      this.marqueeShow = true
    }
  },
  mounted () {
    let that = this
    this.$bus.on('/window/onclick', args => {
      // let xxx = that.$refs.menu_logout
      if (
        args[0].srcElement !== that.$refs.menu_logout_span &&
          args[0].srcElement !== that.$refs.menu_logout_img
      ) {
        that.showAccount = false
        that.isClick = false
      }
      if (args[0].srcElement !== that.$refs.switch_village) {
        that.changeShow = false
      }
    })
  }
}
</script>
