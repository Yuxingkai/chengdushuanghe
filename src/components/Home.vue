<template>
  <div class="home">
    <!-- <canvas id="starts" >该浏览器不支持canvas</canvas> -->
    <div
      id="map"
      style="position:absolute;height: 100%"
      :style="{width: width + 'px' , top: top + 'px' ,left: left + 'px' , zIndex : z}"
      v-show="show"
    >
      <mapUI />
    </div>
    <div
      style="display: grid;grid-template-rows:max-content 1fr;width:100%;height: 100%;position: absolute;top:0;bottom:0.2rem;overflow:hidden;box-sizing:border-box;"
    >
      <Head
        :Title="newTitle"
        :TitleID="newTitleID" />
      <!-- <transition name="animate" mode="out-in">  v-if="headshow"-->
      <keep-alive exclude="SearchIndex">
        <router-view />
      </keep-alive>
      <!-- </transition> -->
    </div>
    <popManager />
    <video
      loop
      src="../assets/video/2.mp3"
      controls
      id="myVideo"
      style="width: 1px;height: 1px;display: none"
    />
  </div>
</template>

<script>
import popManager from './UIKit/PopupManager'
import Head from './home/public/Head'
import mapUI from '../maps/MapUI'
import { Post } from '../Utils/Http'
import { apiNames, getRealTimePointComponent } from '../config/config.js'
import user from '../Utils/user'
import { Notification } from 'element-ui'
import $ from 'jquery'
import { delCookie } from '../Utils/Common'

export default {
  data () {
    return {
      show: false,
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      z: 0,
      Title: '',
      TitleID: '',
      tipArr: [],
      timeOu: null,
      newTitle: '',
      newTitleID: '',
      client: null
    }
  },
  components: {
    Head: Head,
    mapUI: mapUI,
    popManager: popManager
  },
  created: function () {
    let that = this
    let api = this.addresIp()
    this.$bus.on('mapLayoutChanged', this.fixMapPosition)
    /* eslint-disable */
    this.client = mqtt.connect(api);
    console.log(api);
    window.localStorage.setItem("marqueeApi", apiNames["获取跑马灯"]);
    // this.client = mqtt.connect('ws://47.75.190.168:3000')
    // 图像网
    // this.client = mqtt.connect('ws://110.1.253.1:3000')
    // 31.0.178.231
    // this.client = mqtt.connect('ws://31.0.178.231:3000')
    /* eslint-disable */
    this.client.subscribe("/web/event/map/parkingLog");
    this.client.subscribe("/web/event/map/faceLog");
    this.client.subscribe("/web/event/map/accessfaceLog");
    this.client.subscribe("/web/event/map/nbdevicealarm");
    this.client.on("message", function(topic, payload) {
      that.$bus.emit(topic, payload);
    });
  },
  mounted: function() {
    let that = this;
    let cConfig = JSON.parse(localStorage.getItem("currentWebGlobalConfig"));
    if (cConfig) {
      that.$bus.emit("/home/webGlobalConfig", {
        config: cConfig
      });
      that.getTitle();
      that.getData();
      var myVideo = document.getElementsByTagName("video")[0];
    } else {
      that.$router.push({
        path: "/login"
      });
    }
  },
  methods: {
    getTitle() {
      let villageInfo=JSON.parse(
        window.localStorage.getItem("currentVillageID")
      )
      this.newTitle = villageInfo.villageName;
      this.newTitleID =villageInfo.villageID;
      document.title = this.newTitle + "智慧社区服务管理平台";
    },
    getData: function() {
      let that = this;
      let VillageID = JSON.parse(
        window.localStorage.getItem("currentVillageID")
      ).villageID;
      this.$bus.on("/web/event/map/nbdevicealarm", function(a) {
        var obj = JSON.parse(a);
        if (obj.villageID === VillageID) {
          that.tipArr = obj;
          let s1 = obj.alarmTypeName;
          let s2 = obj.alarmLevelName;
          let s3 = obj.alarmTime;
          let s4 = obj.deviceName;
          let s5 = obj.address;
          that.tipOpen(s1, s2, s3, s4, s5);
          $("body").on("click", "#tipDetails", function() {
            let option = that.tipArr;
            let path = option.deviceType;
            Notification.closeAll();
            window.pop.close(1);
            window.pop.close(2);
            window.pop.show({
              level: 1,
              component: getRealTimePointComponent(path),
              param: {
                level: 1,
                e: option
              }
            });
          });
        }
      });
    },
    playVideo: function() {},
    fixMapPosition: function(args) {
      this.show = args.show;
      this.left = args.left;
      this.top = args.top;
      this.width = args.width;
      this.height = args.height;
      this.z = args.z;
    },
    alertTip(msg) {
      this.$message(msg);
    },
    tipOpen(msg1, msg2, msg3, msg4, msg5) {
      Notification.closeAll();
      clearTimeout(this.timeOu);
      myVideo.play();
      this.clearTim();
      this.$notify({
        title: "报警通知",
        type: "warning",
        duration: 300000,
        position: "bottom-right",
        dangerouslyUseHTMLString: true,
        message:
          '<ul class="tip_ul textCon">\n' +
          "<li>报警类型:<span>" +
          msg1 +
          "</span></li>\n" +
          "<li>报警级别:<span>" +
          msg2 +
          "</span></li>\n" +
          "<li>报警时间:<span>" +
          msg3 +
          "</span></li>\n" +
          "<li>设备名称:<span>" +
          msg4 +
          "</span></li>\n" +
          '<li class="tip_add">设备位置:<span>' +
          msg5 +
          '</span><span style="display: none"></span></li>\n' +
          '<li style=""><p id="tipDetails" class="textSamll">详情</p></li>\n' +
          "</ul>",
        onClick: function() {
          myVideo.pause();
        },
        onClose: function() {
          myVideo.pause();
        }
      });
    },
    clearTim: function() {
      this.timeOu = setTimeout(function() {
        myVideo.pause();
      }, 300000);
    },
    addresIp: function() {
      let hostname = window.location.hostname;
      let origin = "ws://" + hostname + ":3000";
      let url = hostname === "localhost" ? "ws://220.248.34.75:3000" : origin;
      return url;
    }
  },
  watch: {},
  beforeDestroy() {
    this.client.unsubscribe("/web/event/map/parkingLog");
    this.client.unsubscribe("/web/event/map/faceLog");
    this.client.unsubscribe("/web/event/map/accessfaceLog");
    this.client.unsubscribe("/web/event/map/nbdevicealarm");
  }
};
</script>

<style scoped>
#starts {
  position: fixed;
  opacity: 0.5;
}
.home {
  background: url("../assets/images/homeBG.jpg") no-repeat;
  /*background: rgba(3,8,14,1);*/
  background-position: center center;
  width: 100%;
  /* opacity: 0.2; */
  height: 100%;
  background-size: 100% 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.animate-enter-active,
.animate-leave-active {
  transition: all 0.2s ease;
}
.animate-enter,
.animate-leave-active {
  opacity: 0;
}
.animate-enter {
  transform: translateX(10rem);
}
.animate-leave-active {
  transform: translateX(-10rem);
}

#title {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  color: #fff;
  text-align: center;
  font-family: "lato", sans-serif;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
}

#title span {
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }

  to {
    transform: translateY(-2000px);
  }
}
</style>
