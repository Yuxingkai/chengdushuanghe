<template>
  <div style="position: relative;width:100%;height:100%;">
    <div
      class="login"
      style="position: absolute;left:0;bottom:0;top:0;right:0">
      <div class="wrap">
        <div class="login-box">
          <div class="logo" />
          <ul>
            <li>
              <div>USER NAME</div>
              <div>
                <input
                  id="tUserName"
                  v-model="userName"
                  type="text"
                  name
                  value
                  placeholder
                  maxlength="30"
                >
              </div>
            </li>
            <li>
              <div>PASSWORD</div>
              <div>
                <input
                  id="tPassword"
                  type="password"
                  v-model="password"
                  name
                  value
                  placeholder
                  maxlength="30"
                >
              </div>
            </li>
          </ul>
          <div class="login-button">
            <a
              href="javascript:void(0)"
              class="login-link"
              @click="login">
              <div class="login-scroll">
                <img
                  src="../assets/images/login/LOGIN-box-4-sm.png"
                  alt >
              </div>
              <span style>LOGIN</span>
            </a>
            <img
              src="../assets/images/login/LOGIN-box-4-lar.png"
              alt >
            <img
              src="../assets/images/login/LOGIN-box-3.png"
              alt >
            <img
              src="../assets/images/login/LOGIN-box-2.png"
              alt >
          </div>
        </div>
      </div>
    </div>
    <!--loading 覆盖层-->
    <loading :visible="isLoading" />
  </div>
</template>

<script>
import { apiNames } from '../config/config'
import { Post } from '../Utils/Http'
import $ from 'jquery'
import user from '../Utils/user'
// import { delCookie } from '../Utils/Common'

export default {
  data () {
    return {
      isLoading: false,
      getvillageInfos: [],
      userName: '',
      password: '',
      notlogin: false,
      token: ''
    }
  },
  watch: {
    $route (to, from) {}
  },
  created () {
    document.onkeydown = e => {
      if (!e) e = window.event
      if (e.keyCode === 13 && this.$route.path === '/login') {
        this.login()
      }
    }
  },
  mounted: function () {
    this.userName = window.localStorage.getItem('userName')
    // console.log(this.$route.query.userName)
    // this.$route.query.userName ? $('#tUserName').val() : $('#tUserName').val('')
    // this.$route.query.password ? $('#tPassword').val() : $('#tPassword').val('')
    // alert(this.$route.query.userName)
    // alert(this.$route.query.password)
    if (this.$route.query.userName && this.$route.query.password) {
      localStorage.removeItem('currentVillageID')
      localStorage.removeItem('currentWebGlobalConfig')
      this.login()
      return
    }
    if (user.isLogin()) {
      if (this.notlogin) {
        this.$router.push({
          path: '/home'
        })
      }
    }
    // $('#tUserName').val(window.localStorage.getItem('userName'))
  },
  methods: {
    validInput: function () {
      return true
    },
    alertTip (msg) {
      this.$message.error(msg)
    },
    keepAlive: function () {
      let that = this
      Post({
        async: true,
        url: apiNames['login'],
        data: {
          head: {
            platform: 'web',
            timestamp: Date.parse(new Date()) / 1000
          },
          userName: $('#tUserName').val(),
          password: $('#tPassword').val()
        },
        dataType: 'json',
        success: function (data) {
          try {
            if (data.responseStatus.resultCode === 0) {
              that.$cookie.set('access-token', data.token, { expires: '30d' })
              that.$router.push({
                path: '/home'
              })
            } else {
              that.alertTip(data.responseStatus.resultMessage)
            }
          } catch (e) {}
        },
        error: function (error) {
          that.isLoading = false
          console.log(error)
        }
      })
    },
    getViewCodeFunctionList (ids) {
      let req = {
        head: {
          platform: 'web',
          timestamp: Date.parse(new Date()) / 1000,
          token: this.token
        }
      }
      let functionList = []
      req.roleIDs = ids
      req.parentFunctionCode = ''
      Post({
        async: false,
        url: apiNames['获取权限功能'],
        data: req,
        datatype: 'json',
        success: data => {
          functionList = data.functionList
        },
        error: err => {
          console.log(err)
        }
      })
      return functionList
    },
    getWebGlobalConfig: function () {
      let that = this
      Post({
        async: false,
        url: apiNames['home'],
        data: {
          head: {
            platform: 'web',
            timestamp: Date.parse(new Date()) / 1000,
            token: that.token
          }
        },
        datatype: 'json',
        success: function (data) {
          if (data.responseStatus.resultCode !== 0) {
            that.alertTip('登陆失败')
            return
          }

          try {
            let functionList = that.getViewCodeFunctionList(data.roleIDs)
            if (functionList === undefined) {
              that.alertTip('无相关权限信息')
              return false
            }
            let lanFangwen = functionList.find(item => {
              return item.functionCode === 'lan_fangwen'
            })
            if (lanFangwen === undefined) {
              that.alertTip('无权登录,请联系管理员开通访问权限')
              that.notlogin = false
              return false
            } else {
              that.notlogin = true
            }
            let gConfig = {
              mapExtent: data.mapExtent,
              prodcutName: data.prodcutName,
              villageInfos: data.villageInfos,
              mapParams: data.mapParams,
              functionList: functionList,
              streetName: data.streetName
            }
            window.localStorage.setItem(
              'webGlobalConfig',
              JSON.stringify(gConfig)
            )
            let key = JSON.parse(localStorage.getItem('currentVillageID'))
            let ckey = JSON.parse(localStorage.getItem('currentWebGlobalConfig'))
            if (!key) {
              window.localStorage.setItem(
                'currentVillageID',
                JSON.stringify(gConfig.villageInfos[0])
              )
            }
            if (!ckey) {
              gConfig.villageInfos = gConfig.villageInfos[0]
              window.localStorage.setItem(
                'currentWebGlobalConfig',
                JSON.stringify(gConfig)
              )
            }
            that.getvillageInfos = data.villageInfos
            that.$router.push({
              path: '/home'
            })
          } catch (err) {
            console.log(err)
          }
        },
        error: function (error) {
          that.alertTip('获取配置信息失败')
          console.log(error)
        }
      })
    },
    login: function () {
      if (this.$route.query.userName && this.$route.query.password) {
        $('#tUserName').val(this.$route.query.userName)
        $('#tPassword').val(this.$route.query.password)
      }
      window.localStorage.setItem('userName', $('#tUserName').val())
      if (!this.validInput()) return
      this.isLoading = true
      let that = this
      Post({
        async: false,
        url: apiNames['login'],
        data: {
          head: {
            platform: 'web',
            timestamp: Date.parse(new Date()) / 1000
          },
          userName: $('#tUserName').val(),
          password: $('#tPassword').val()
        },
        dataType: 'json',
        success: function (data) {
          that.isLoading = false
          try {
            if (data.responseStatus.resultCode === 0) {
              that.token = data.token
              that.getWebGlobalConfig()
              that.$cookie.set('access-token', data.token, { expires: '30d' })
            } else {
              that.alertTip(data.responseStatus.resultMessage)
            }
          } catch (e) {}
        },
        error: function (error) {
          that.isLoading = false
          that.alertTip(error + '请检查相关信息')
        }
      })
    }
  }
}
</script>
<style scoped>
.login-scroll > img {
  position: absolute;
  width: 100%;
  left: -0.04rem;
  top: 0;
}

.login-link {
  display: inline-block;
  width: 80%;
  height: 80%;
  position: absolute;
  left: 51%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  cursor: pointer;
  list-style: none;
  border-radius: 50%;
  text-decoration: none;
}

.login-scroll {
  position: absolute;
  width: 95%;
  height: 95%;
  left: 2.5%;
  border-radius: 50%;
  animation: run 4s infinite linear;
}

.login-button > img {
  position: absolute;
  z-index: -1;
  transform-origin: center center;
}

.login-button > img:nth-of-type(1) {
  width: 100%;
  position: absolute;
  left: -1px;
  top: -3px;
  transform-origin: 51.5% 56.6%;
  animation: run 4s infinite linear;
}

.login-button > img:nth-of-type(2) {
  width: 76%;
  left: 0.5rem;
  top: 2.06rem;
  transform-origin: 1.48rem -0.24rem;
  animation: run2 4s infinite linear;
}

.login-button img:nth-of-type(3) {
  width: auto;
  left: 50%;
  top: 93%;
  transform: translate(-50%, 0);
}

.login-button {
  width: 3.84rem;
  position: absolute;
  height: 3.84rem;
  left: 49%;
  bottom: -0.42rem;
  transform: translate(-50%, 0);
}

.login-button span {
  background-image: linear-gradient(8deg, #06b6ff 0%, #04ffe5),
    linear-gradient(#d8ff00, #d8ff00);
  font-family: SIL-Hei-Med-Jian;
  font-size: 0.52rem;
  line-height: 3rem;
  text-align: left;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-box ul {
  width: 83.5%;
  padding: 0;
  position: absolute;
  left: 50%;
  list-style: none;
  top: 45%;
  transform: translate(-50%, -50%);
}

.login-box > img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.login-box li {
  padding-bottom: 0.4rem;
}

.login-box ul li div:nth-of-type(2) {
  height: 1rem;
}

input:focus {
  outline: none;
}

.login-box ul li div:nth-of-type(2) input {
  background-color: rgba(255, 255, 255, 0);
  color: #ffffff;
  box-sizing: border-box;
  padding: 0.1rem 0.2rem;
  font-size: 0.4rem;
  border: none;
  width: 100%;
  height: 100%;
  display: inline-block;
  background: url("../assets/images/login/LOGIN-box-5.png") no-repeat center
    center;
  background-size: 100% 100%;
}

.login-box ul li div:nth-of-type(1) {
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(8deg, #06b6ff 0%, #04ffe5),
    linear-gradient(rgba(216, 255, 0, 0.8), rgba(216, 255, 0, 0.8));
  height: 0.56rem;
  font-family: SIL-Hei-Med-Jian;
  font-size: 0.36rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: normal;
  text-align: left;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.wrap {
  width: 100%;
  height: 100%;
  /* max-width: 38.4rem; */
  background: url("../assets/images/bg.jpg") no-repeat center center;
  background-size: 100% 100%;
  position: relative;
}

.login-box {
  width: 9.21rem;
  height: 10.42rem;
  background: url("../assets/images/login/login-box-1.png") no-repeat center
    center;
  background-size: cover;
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  bottom: 20.5%;
  transform: translate(-49%, 0);
}

.logo {
  width: 30%;
  height: 17.6%;
  background: url("../assets/images/login/logo-1.png") no-repeat center center;
  background-size: 100% 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: 10.7%;
}

@keyframes run {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}

@keyframes run2 {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}
</style>
