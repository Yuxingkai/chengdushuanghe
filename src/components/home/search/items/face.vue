<template>
  <div
    style="font-size:25px;color:#fff;box-sizing:border-box;padding:10px;height: 100%"
    class="facePage"
    id="search"
    ref="boxxxx">
    <div class="allsel">
      <div>
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">选择标签</div>
        </div>
        <mulselect
          @selserch="newserch"
          :items='options'
          @chosenSelect="getserch"
          :content="moreselect"/>
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
            v-model="name"></div>
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
            style="text-align:left;">输入居住弄</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div><input
            class="setinput"
            type="text"
            v-model="nong"></div>
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
            v-model="build"></div>
          <div class="rback"/>
        </div>
      </div>
      <div class="margTop">
        <div class="fl">
          <div class="item-1"/>
          <div
            class="item-2"
            style="text-align:left;">输入居住房间号</div>
        </div>
        <div class="input">
          <div class="lback"/>
          <div><input
            class="setinput"
            type="text"
            v-model="roomNum"></div>
          <div class="rback"/>
        </div>
      </div>
    </div>
    <div style="position:absolute;bottom: 10px;width: 98%;">
      <Box3
        style="float: left;width: 47%"
        css="box-sizing:border-box;float:left;height:40px;text-align:center;line-height:30px;top:0;padding:.03rem 0;">
        <button
          @click="search"
          class="serchBtn">搜索</button>
      </Box3>
      <Box3
        style="float: right;width: 47%;"
        css="box-sizing:border-box;float:right;margin-right:2%;height:40px;text-align:center;line-height:30px;right:10px;padding:.03rem 0;">
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
import mulselect from '../../public/multipleSelect'
export default {
  name: 'SearchFace',
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
      roomNum: '',
      build: '',
      itemWord: '',
      cardNum: '',
      phone: '',
      name: '',
      moreselect: [],
      page: 1,
      nong: '',
      pageSize: 1,
      showMeaagae: ''
    }
  },
  mounted () {
    this.options = JSON.parse(localStorage.getItem('peopleTag'))
    this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40)
    this.search()
  },
  created () {
    document.onkeydown = (e) => {
      if (!e) e = window.event
      if ((e.keyCode === 13)) {
        this.search()
      }
    }
    this.$bus.on('refreshData/home/search/face', () => {
      this.search()
    })
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    mulselect
  },
  methods: {
    handleResize () {
      this.pageSize = Math.floor((this.$refs.boxxxx.clientHeight - 200) / 40)
      this.search()
    },
    newserch () {
      this.search()
    },
    selOne (name) {
      this.text = name
      this.optionShow = false
    },
    showOption () {
      this.optionShow = !this.optionShow
    },
    getserch (msg) {
      this.moreselect = msg
    },
    reset () {
      this.text = ''
      this.roomNum = ''
      this.build = ''
      this.itemWord = ''
      this.cardNum = ''
      this.phone = ''
      this.name = ''
      this.nong = ''
      this.moreselect = []
      this.$bus.emit('listShow', false)
      this.$bus.emit('listHide', false)
    },
    search () {
      this.getLists()
      this.$bus.emit('listShow', true)
      this.$bus.emit('listHide', false)
    },
    getLists () {
      let moreselect = []
      moreselect = this.moreselect.map((item) => {
        return item.name
      })
      let reqParam = user.getRequestHeader()
      reqParam.functionCode = 'renkou'
      let id = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.condition = {}
      reqParam.condition.villageIDs = [id]
      reqParam.condition.peopleLabels = moreselect
      reqParam.condition.phone = this.phone
      reqParam.condition.credentialNo = this.cardNum
      reqParam.condition.peopleName = this.name
      reqParam.condition.buildingNo = this.build
      reqParam.condition.houseNo = this.roomNum
      reqParam.pageNum = this.page
      reqParam.pageSize = this.pageSize
      this.$bus.emit('serchCondition', {
        peopleLabels: moreselect,
        phone: this.phone,
        credentialNo: this.cardNum,
        peopleName: this.name,
        buildingNo: this.build,
        houseNo: this.roomNum
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
            type: 'face',
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
