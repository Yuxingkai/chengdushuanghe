<template>
  <div class="process">
    <div>
      <Box3 css="">
        <ul class="top_ul">
          <li>
            <div><span/></div>
            <p><span>发生异常</span></p>
            <i>{{ getalarmTime }}</i>
          </li>
          <li :class="fillIn === 0?'active': ''">
            <div><span/></div>
            <p><span>处置中</span></p>
            <i/>
          </li>
          <li :class="fillIn === 1?'active': ''">
            <div><span/></div>
            <p><span>处置完成</span></p>
            <i>{{ endTime }}</i>
          </li>
        </ul>
      </Box3>
    </div>
    <div
      class="fo_div"
      v-if="fillIn == '0'">
      <h3 :style="{'color':Color}">{{ message }}
        <ul>
          <li
            v-for="item in items"
            :key="item.index">
            <input
              :id="'checkboxId'+item.type"
              class="checkbox1"
              type="radio"
              :value="item.name"
              v-model="arr"
              name="ra_input"
              @change="handleChange(item)" >
            <label :for="'checkboxId'+item.type"><span>{{ item.name }}</span></label>
          </li>
        </ul>
      </h3>
      <input
        type="text"
        class="input_text"
        placeholder="备注"
        v-model="remark">
      <button
        class="input_button"
        @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post} from '../../../../Utils/Http'

export default {
  name: 'AlarmAlert',
  props: {
    fillIn: {
      type: [Array, String, Object, Number],
      default: ''
    },
    alarmType: {
      type: [Array, String, Object, Number],
      default: ''
    },
    alarmID: {
      type: [Array, String, Object, Number],
      default: ''
    },
    alarmTime: {
      type: [Array, String, Object, Number],
      default: ''
    }
  },
  data () {
    return {
      message: '请选择原因',
      choose: true,
      arr: 1,
      items: [],
      remark: '',
      Color: '',
      endTime: '',
      getalarmType: this.alarmType,
      getalarmID: this.alarmID,
      getalarmTime: this.alarmTime
    }
  },
  mounted () {
    this.addInfo()
  },
  methods: {
    handleChange (item) {
      // this.$emit('change', this.arr)
      this.message = this.arr
      this.Color = '#fff'
      console.log(this.message)
    },
    addInfo () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmType = this.getalarmType
      let s = this.getalarmTime
      that.alarmTime = s.substring(s.indexOf(' ') + 1, s.length)
      /**
       * 报警原因
       */
      Post({
        async: true,
        url: apiNames['获取报警原因'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.alarmReasons) {
            that.items = data.alarmReasons
          }
        },
        error: function (err) {
          console.log(err)
        }
      })
    },
    submit () {
      if (this.message !== '请选择原因' && this.remark) {
        /**
         * 处理报警任务
         */
        let reqParam = user.getRequestHeader()
        reqParam.alarmID = this.getalarmID
        reqParam.reasonType = this.message
        reqParam.remark = this.remark
        Post({
          async: true,
          url: apiNames['报警处理'],
          data: reqParam,
          dataType: 'json',
          success: function (data) {
            console.log('事件已处理' + JSON.stringify(reqParam))
            console.log('事件已处理')
          },
          error: function (err) {
            console.log(err)
          }
        })
        this.$bus.emit('/event/afterDealAlarm', reqParam.alarmID)
      } else {
        this.alertTip('请填写完成信息')
      }
    },
    alertTip: function (msg) {
      this.$message(msg)
    }
  }
}
</script>

<style scoped>
  i{
    font-style: normal;
  }
  .process{
    width: 13.1rem;
    margin: .1rem auto;
  }
  .process ul.top_ul {
    display: flex;
    box-sizing: border-box;
  }
  .process ul.top_ul li{
    flex: 1;
    text-align: center;
    box-sizing: border-box;
    position: relative;
  }
  .process ul.top_ul li div{
    height: .8rem;
    line-height: .8rem;
  }
  .process ul.top_ul li div span{
    display: inline-block;
    margin-top: .28rem;
    width: .24rem;
    height: .24rem;
    background: url("../../../../assets/images/icon/unstart.svg") no-repeat center;
    background-size: 100%;
  }
  .process ul.top_ul li div span:before{
    content: '';
    width: 3.85rem;
    height: 1px;
    background: #31f1fe;
    position: absolute;
    left: -1.92rem;
    top: .4rem;
  }
  .process ul.top_ul li:nth-of-type(1) div span:before{
    display: none;
  }
  .process ul.top_ul li.active div span{
    display: inline-block;
    margin-top: .22rem;
    width: .36rem;
    height: .36rem;
    background: url("../../../../assets/images/icon/started.svg") no-repeat center;
    background-size: 100%;
  }
  .process ul.top_ul li p span{
    display: inline-block;
    width: 1.4rem;
    /*height: .4rem;*/
    background: #f5b94578;
    color: #000;
  }
  .process ul.top_ul li.active p span{
    display: inline-block;
    width: 1.4rem;
    /*height: .44rem;*/
    background: #f5b945;
    color: #000;
  }
  .process ul.top_ul li i {
    color: #ff0000;
    display: inline-block;
    margin: .2rem 0 .3rem 0;
    font-weight: bold;
  }
  .fo_div{
    width: 100%;
    padding: .2rem 0;
  }
  .fo_div h3{
    position: relative;
    display: inline-block;
    width: 3rem;
    color: #ffffff57;
    font-size: .28rem;
    height: .56rem;
    line-height: .56rem;
    box-sizing: border-box;
    padding-left: .3rem;
    background: url("../../../../assets/images/bg_box.svg") no-repeat left center;
  }
  .fo_div h3:after {
    border: solid transparent;
    content: '';
    right: .3rem;
    top: .18rem;
    position: absolute;
    width: 0;
    height: 0;
    border-width: .09rem;
    border-right-color: #31f1fe;
  }
  .fo_div h3:hover:after{
    border: solid transparent;
    content: '';
    right: .25rem;
    top: .2rem;
    position: absolute;
    width: 0;
    height: 0;
    border-width: .09rem;
    border-top-color: #31f1fe;
  }
  .fo_div ul {
    display: none;
    text-align: center;
    position: absolute;
    width: 3rem;
    left: 0;
    z-index: 1;
    background: #000;
  }
  .fo_div h3:hover ul{
    display: block;
  }
  .fo_div ul li{
    color: #befefe;
    font-size: .25rem;
    background: #102044;
    margin-top: .06rem;
    line-height: .55rem;
    border-left: 1px solid #3cc3ff;
    border-right: 1px solid #3cc3ff;
    box-sizing: border-box;
    text-align: left;
  }
  .fo_div ul li span{
    position: relative;
    top:-.1rem
  }
  .fo_div ul li .checkbox1{
    position:absolute;
    display:none
  }
  .fo_div ul li .checkbox1+label{
    position:relative;
    top:.1rem;
    padding-left: 1rem;
    display:flex;
  }
  .fo_div ul li .checkbox1+label:after{
    position:absolute;
    top:.1rem;
    left:.45rem;
    display:none;
    width:.16rem;
    height:.08rem;
    content:'';
    border-bottom:.02rem solid #fff;
    border-left:.02rem solid #fff;
    box-sizing:border-box;
    transform:rotate(-46deg)
  }
  .fo_div ul li .checkbox1+label:before{
    position:absolute;
    display:block;
    width:.2rem;
    height:.2rem;
    content:'';
    border:1px solid silver;
    top:.03rem;
    left: .4rem;
    border-radius:.03rem;
    background:#3e97eb;
    border:1px solid rgba(45, 245, 243, 0.5)
  }
  .fo_div ul li .checkbox1:checked+label:after{
    display:block
  }
  .fo_div ul li:hover{
    background: #254a9f;
  }
  .fo_div .input_text{
    background: #1b4c95a6;
    border: 1px solid #acacac52;
    height: .5rem;
    color: #fff;
    box-sizing: border-box;
    padding-left: .2rem;
    width: 8.1rem;
    margin: 0 .2rem;
    font-size: .28rem;
  }
  .fo_div .input_button{
    background-image: linear-gradient(to left, #a4e8fc, #0edffa);
    background-image: -moz-linear-gradient(to left, #a4e8fc, #0edffa);
    background-image: -ms-linear-gradient(to left, #a4e8fc, #0edffa);
    background-image: -o-linear-gradient(to left, #a4e8fc, #0edffa);
    border: none;
    height: .52rem;
    line-height: .52rem;
    width: 1.38rem;
    color: #fff;
    font-size: .3rem;
    cursor: pointer;
  }
</style>
