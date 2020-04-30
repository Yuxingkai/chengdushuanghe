<template>
  <div
    @click="hideul"
    style="font-size:25px;color:#fff;box-sizing:border-box;padding:10px;height: 100%"
    id="search"
    ref="boxxxx">
    <div class="allsel">
      <div>
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">输入车牌号</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div><input
            class="setinput"
            type="text"
            v-model="plateNo"></div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">输入证件号码(最少4位)</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div><input
            class="setinput"
            type="text"
            v-model="cardNum"></div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">输入车辆类型</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div style="position:relative;">
            <div
              class="seloptions"
              @click.stop="showOptioncar">
              <input
                @keyup="searchVal($event)"
                class="canInput"
                type="text"
                v-model="textcar">
            </div>
            <div
              class="newarrow"
              :class="optionShowcar ? 'transdown' : 'transup'"/>
            <div
              :class="cartypesData.length > 8 ? 'dropdown' : 'dropdownless'"
              v-if="optionShowcar">
              <happy-scroll size="4">
                <div
                  class="options"
                  @click="selOne('','全部')">全部</div>
                <div
                  class="options"
                  v-for="(item,index) in cartypesData"
                  :key="index"
                  @click="selOne(item.name,item.typeName)">{{ item.typeName }}</div>
              </happy-scroll>
            </div>
          </div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">输入手机号码(最少4位)</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div><input
            class="setinput"
            type="text"
            v-model="phone"></div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">输入居住楼栋号</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div><input
            class="setinput"
            type="text"
            v-model="buildNum"></div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">输入用户姓名</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div><input
            class="setinput"
            type="text"
            v-model="peopleName"></div>
          <div class="rback"/>
        </div>
      </div>
    </div>
    <div style="position:absolute;bottom: 10px;width: 98%;">
      <Box3
        style="float: left;width: 47%"
        css="padding:.03rem 0;box-sizing:border-box;float:left;height:40px;text-align:center;line-height:30px;top:0;">
        <button
          @click="search"
          class="serchBtn">搜索</button>
      </Box3>
      <Box3
        style="float: right;width: 47%;"
        css="padding:.03rem 0;box-sizing:border-box;float:right;margin-right:2%;height:40px;text-align:center;line-height:30px;right:10px;">
        <button
          @click="reset"
          class="resetBtn">重置</button>
      </Box3>
    </div>
  </div>
</template>
<script>
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post} from '../../../../Utils/Http'
export default {
  data () {
    return {
      options: [
        {name: 'qw'},
        {name: 'ee'},
        {name: 'bv'}
      ],
      optionShow: false,
      text: '全部',
      which: '',
      buildNum: '',
      itemName: '',
      cardNum: '',
      page: 1,
      peopleName: '',
      phone: '',
      carType: '',
      plateNo: '',
      cartypes: [],
      cartypesData: [],
      textcar: '全部',
      optionShowcar: false,
      carid: '',
      pageSize: 1
    }
  },
  mounted () {
    let that = this
    this.$bus.on('/window/onclick', (args) => {
      if ((args[0].srcElement !== that.$refs.optionshow1)) {
        that.optionShowcar = false
      }
    })
    this.cartypes = JSON.parse(localStorage.getItem('parkingCar'))
    this.cartypesData = JSON.parse(localStorage.getItem('parkingCar'))
    this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
    this.search()
  },
  created () {
    document.onkeydown = (e) => {
      if (!e) e = window.event
      if ((e.keyCode === 13)) {
        this.search()
      }
    }
    this.$bus.on('refreshData/home/search/car', () => {
      this.search()
    })
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    searchVal (e) {
      this.cartypesData = this.cartypes.filter((item) => {
        return item.typeName.indexOf(e.currentTarget.value) !== -1
      })
    },
    handleResize () {
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40) + 2
      this.search()
    },
    hideul () {
      this.optionShowcar = false
    },
    selOne (id, name) {
      this.textcar = name
      this.carid = id
      this.optionShowcar = false
    },
    showOption () {
      this.optionShow = !this.optionShow
    },
    showOptioncar () {
      this.optionShowcar = !this.optionShowcar
    },
    reset () {
      this.buildNum = ''
      this.itemName = ''
      this.cardNum = ''
      this.text = ''
      this.carid = ''
      this.textcar = ''
      this.plateNo = ''
      this.peopleName = ''
      this.phone = ''
      this.cartypesData = JSON.parse(localStorage.getItem('parkingCar'))
      this.$bus.emit('listShow', false)
      this.$bus.emit('listHide', false)
    },
    search: function () {
      this.getLists()
      this.$bus.emit('listShow', true)
      this.$bus.emit('listHide', false)
    },
    getLists () {
      let reqParam = user.getRequestHeader()
      reqParam.functionCode = 'cheliang'
      let id = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.condition = {}
      reqParam.condition.villageIDs = [id]
      reqParam.condition.peopleName = this.peopleName
      reqParam.condition.phone = this.phone
      reqParam.condition.credentialNo = this.cardNum
      reqParam.condition.carType = this.carid
      reqParam.condition.buildingNo = this.buildNum
      reqParam.condition.plateNo = this.plateNo
      reqParam.pageNum = this.page
      reqParam.pageSize = this.pageSize
      this.$bus.emit('serchCondition', {
        peopleName: this.peopleName,
        phone: this.phone,
        credentialNo: this.cardNum,
        carType: this.carid,
        buildingNo: this.buildNum,
        plateNo: this.plateNo
      })
      let that = this
      Post({
        async: true,
        url: apiNames['获取预警查询'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.data === undefined) {
            that.listData = []
          } else {
            that.listData = data.data
          }
          that.$bus.emit('getallLists', {
            type: 'car',
            results: that.listData,
            total: data.total
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
