<template>
  <div class="videoPlay">
    <div class="main_globle">
      <span class="main_globle_span" />
      <div
        class="leftSide"
        id="leftSide">
        <div class="videocontent">
          <ul
            class="ulWidth"
            :style="ulWidth">
            <li
              v-for="(item, index) in videoListInfo"
              :key="index"
              class="video"
              @click="playBoxChange(index)"
              :class="[{'videoActive' : videoBorderInfo === index},{'boxType3Class' : boxType3 === true && index === 2 }]"
              v-if="item.isShow === true"
              :style="{width: item.style.width, height: item.style.height, margin: item.style.margin}">
              <div
                class="logo_posi"
                v-show="item.data.length === 0"/>
              <div
                v-if="boxType3 === true && index === 0"
                style="height:100%;margin:0 auto;position:relative;box-sizing: border-box;padding: 2px;"
                :style="videoWidth2">
                <span
                  @click="playBoxChange(index)"
                  class="miskControl"/>
                <player
                  mask-tip-info="true"
                  ref="playID"
                  :src="item.data.streamSource"
                  style="transform: scale(1);transform-origin: 0 0;" />
              </div>
              <div
                v-else
                style="height:100%;margin:0 auto;position:relative;box-sizing: border-box;padding: 1px;"
                :style="videoWidth">
                <span
                  @click="playBoxChange(index)"
                  class="miskControl"/>
                <player
                  mask-tip-info="true"
                  ref="playID"
                  :src="item.data.streamSource"
                  style="transform: scale(1);transform-origin: 0 0;" />
              </div>
            </li>
          </ul>
        </div>
        <div class="videoControl">
          <ul class="videoControl_full">
            <li
              v-for="(item, index) in localImgSrc.listFull"
              :key="index"
              @click="smallFullClick"
              :style="{backgroundImage: listFullIndex === true ? 'url(' + item.imgSrc2 + ')' : 'url(' + item.imgSrc1 + ')'}" />
          </ul>
          <ul class="videoControl_left">
            <li
              v-for="(item, index) in localImgSrc.listleft"
              :key="index"
              @click="leftClick(index)"
              :style="{backgroundImage: index === listleftIndex ? 'url(' + item.imgSrc2 + ')' : 'url(' + item.imgSrc1 + ')'}" />
          </ul>
          <ul class="videoControl_middle">
            <li
              v-for="(item, index) in localImgSrc.listMiddle"
              :key="index"
              @click="middleClick(index)"
              :style="{backgroundImage: index === listMiddleIndex ? 'url(' + item.imgSrc2 + ')' : 'url(' + item.imgSrc1 + ')'}" />
          </ul>
          <ul class="videoControl_right">
            <li
              v-for="(item, index) in localImgSrc.listRight"
              :key="index"
              @click="rightClick(index)"
              :style="{backgroundImage: index === listRightIndex ? 'url(' + item.imgSrc2 + ')' : 'url(' + item.imgSrc1 + ')'}" />
          </ul>
          <ul class="videoControl_action">
            <!--<li @click="saveClick"><box3>保存预案</box3></li>-->
            <li @click="fullClick"><box3>全屏</box3></li>
            <li @click="clearPlay"><box3>关闭</box3></li>
            <li @click="clearAllplay"><box3>全部关闭</box3></li>
          </ul>
        </div>
      </div>
      <div class="rightSide">
        <div style="">
          <Tab
            :type="type"
            :padding="fontPadding"
            id="public_tab"
            :css="css1"
            @pass-index-choose='tabChooseList'>
            <div
              v-show="showIndex === 0"
              style="height: 100%">
              <TabItem
                title="视频资源"
                v-show="showIndex === 0"
                :css="css2"
                style="text-align: left;">
                <div class="inputFa">
                  <input
                    placeholder="摄像机名字/编号"
                    type="text"
                    v-model="searchlist"
                    class="tabInput">
                  <span @click="serchList"/>
                </div>
                <div>
                  <transition
                    name="animate"
                    mode="out-in">
                    <div
                      class="tab_div tab_div_top"
                      style="height: 100%">
                      <ul
                        style=""
                        class="tabListUl">
                        <happy-scroll
                          resize
                          size="3"
                          :style="happyHeight">
                          <li
                            class="tabListLi"
                            v-for="(item, index) in filterVideoList"
                            :key="item.id">
                            <i />
                            <div @click.stop="areaList(index)">
                              <span :class="{ spanActive: item.villagetype === false }"><i/></span>
                              <p :title="item.villageName">{{ item.villageName }}</p>
                            </div>
                            <ul
                              class="videoNametab"
                              :class="{ videoNametabaAc: item.villagetype === false }">
                              <i/>
                              <li
                                v-for="(ite, ind) in item.data"
                                :key="ind"
                                v-show="ite.name !== ''">
                                <i/>
                                <div @click.stop="areaListData(index, ind)">
                                  <span :class="{ spanActive: ite.posi === false }"><i/></span>
                                  <p>{{ ite.name }}</p>
                                </div>
                                <ul
                                  :class="{ videoNametabaAc: ite.posi === false }">
                                  <li
                                    v-for="(it, i) in ite.allInfo"
                                    :key="i">
                                    <i/>
                                    <p
                                      @dblclick="dblclick(((index * 100000) + (ind * 10000) + i), it)"
                                      class="typeClass bottomListli"
                                      :title="it.name"
                                      :class="typeClassLiInfo === (((index * 100000) + (ind * 10000) + i)) ? 'typeClassActive' + it.useType : 'typeClass' + it.useType">{{ it.name }}</p></li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </happy-scroll>
                      </ul>
                    </div>
                  </transition>
                </div>
              </TabItem>
            </div>
            <!--<div-->
              <!--v-show="showIndex === 1"-->
              <!--style="height: 100%">-->
              <!--<TabItem-->
                <!--title="分组预案"-->
                <!--v-show="showIndex === 1"-->
                <!--:css="css2"-->
                <!--style="text-align: left;">-->
                <!--<div class="inputFa">-->
                  <!--<input-->
                    <!--placeholder="摄像机名字/编号"-->
                    <!--type="text"-->
                    <!--v-model="searchPlan"-->
                    <!--class="tabInput">-->
                  <!--<span @click="serchPlan"/>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<transition-->
                    <!--name="animate"-->
                    <!--mode="out-in">-->
                    <!--<div-->
                      <!--class="tab_div tab_div_top"-->
                      <!--style="height: 100%">-->
                      <!--<ul-->
                        <!--style=""-->
                        <!--class="tabListUl">-->
                        <!--<happy-scroll-->
                          <!--resize-->
                          <!--size="3"-->
                          <!--:style="happyHeight">-->
                          <!--<li-->
                            <!--class="tabListLi tabListLi1"-->
                            <!--v-for="(it, index) in fliterPlanlist"-->
                            <!--:key="it.id">-->
                            <!--<div @click.stop="areaListPlan(index)">-->
                              <!--<span :class="{ spanActive: it.planHeight === false }"/>-->
                              <!--<p-->
                                <!--:title="it.planName"-->
                                <!--:class="{ tabListLi1_Active: it.planHeight === true }">{{ it.planName }}</p>-->
                              <!--<span-->
                                <!--class="planUse"-->
                                <!--@click.stop="planUse(it)"/>-->
                              <!--<span-->
                                <!--class="planDelet"-->
                                <!--@click.stop="planDelet(it.planID)"/>-->
                            <!--</div>-->
                            <!--<ul-->
                              <!--class="videoNametab videoNametab1"-->
                              <!--:class="{ videoNametabaAc: it.planHeight === false }">-->
                              <!--<li-->
                                <!--v-for="(ite, i) in it.data"-->
                                <!--:key="i"-->
                                <!--v-show="ite.name !== ''">-->
                                <!--<p-->
                                  <!--class="typeClass"-->
                                  <!--:title="ite.name"-->
                                  <!--:class="'typeClass' + ite.useType">{{ ite.name }}</p></li>-->
                            <!--</ul>-->
                          <!--</li>-->
                        <!--</happy-scroll>-->
                      <!--</ul>-->
                    <!--</div>-->
                  <!--</transition>-->
                <!--</div>-->
              <!--</TabItem>-->
            <!--</div>-->
          </Tab>
        </div>
        <div>
          <Tab
            :type="type"
            :padding="fontPadding"
            @pass-index-choose='tabChooseControl'>
            <div>
              <TabItem
                title="历史回放"
                style="text-align: left;">
                <div>
                  <transition
                    name="animate"
                    mode="out-in">
                    <div class="tab_div">
                      <ul class="videoControlUl">
                        <li>
                          <p>开始时间</p>
                          <div class="block timeInput">
                            <el-date-picker
                              class=""
                              v-model="timeValue1"
                              type="datetime"
                              placeholder="" />
                          </div>
                        </li>
                        <li>
                          <p>结束时间</p>
                          <div class="block timeInput">
                            <el-date-picker
                              class=""
                              v-model="timeValue2"
                              type="datetime"
                              placeholder="" />
                          </div>
                        </li>
                      </ul>
                      <div
                        class="tab_button"
                        @click="playChoose"><box3>播放</box3></div>
                    </div>
                  </transition>
                </div>
                <!--<div>-->
                <!--<transition-->
                <!--name="animate"-->
                <!--mode="out-in">-->
                <!--<div class="tab_div tabVideoCon">-->
                <!--<ul class="rightListLeft">-->
                <!--<li-->
                <!--v-for="(item, index) in rightListLeft"-->
                <!--:key="index"-->
                <!--@mouseover="onmouseoverLeft(item.imgSrc, index)"-->
                <!--@mouseout="onmouseoutLeft(item.imgSrc, index)"-->
                <!--:style="{backgroundImage: 'url(' + item.imgSrc + ')'}" />-->
                <!--</ul>-->
                <!--<ul class="rightListRight">-->
                <!--<li-->
                <!--v-for="(item, index) in rightListRight"-->
                <!--:key="index"-->
                <!--@mouseover="onmouseoverRight(item.imgSrc, index)"-->
                <!--@mouseout="onmouseoutRight(item.imgSrc, index)"-->
                <!--:style="{backgroundImage: 'url(' + item.imgSrc + ')'}"> {{ item.text }}</li>-->
                <!--</ul>-->
                <!--</div>-->
                <!--</transition>-->
                <!--</div>-->
              </TabItem>
              <TabItem
                title=""
                style="text-align: left;">
                <div>
                  <transition
                    name="animate"
                    mode="out-in">
                    <div class="tab_div">
                      <ul class="videoControlUl">
                        <li>
                          <p>开始时间</p>
                          <div class="block timeInput">
                            <el-date-picker
                              class=""
                              v-model="timeValue1"
                              type="datetime"
                              placeholder="" />
                          </div>
                        </li>
                        <li>
                          <p>结束时间</p>
                          <div class="block timeInput">
                            <el-date-picker
                              class=""
                              v-model="timeValue2"
                              type="datetime"
                              placeholder="" />
                          </div>
                        </li>
                      </ul>
                      <div
                        class="tab_button"
                        @click="playChoose"><box3>播放</box3></div>
                    </div>
                  </transition>
                </div>
              </TabItem>
            </div>
          </Tab>
        </div>
      </div>
    </div>
    <div
      v-show="popUpInfo"
      style="width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 3000">
      <div
        class="popUp"
        v-show="popUpInfo">
        <p>请输入预案名称</p>
        <span
          class="popClose"
          @click="popClose">X</span>
        <p>
          <input
            autofocus
            v-model="popInputName"
            class="tabInput"
            type="text"></p>
        <p><span @click="popClose">取消</span><span @click="popOpen">确定</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import user from '../../../../Utils/user'
import {apiNames} from '../../../../config/config'
import {Post, PostCopy} from '../../../../Utils/Http'

export default {
  name: 'VideoPlay',
  data () {
    return {
      fontPadding: {
        padding: '0.04rem 0rem',
        fontSize: '.32rem'
      },
      css1: {
        height: '100%',
        display: 'grid',
        gridAutoRows: '.7rem 1fr'
      },
      css2: {
        height: '100%',
        display: 'grid',
        gridAutoRows: '.8rem 1fr'
      },
      videoListInfo: [], // 过滤之前的资源列表
      videoListInfoCope: [],
      ulWidth: {width: '100%'},
      localImgSrc: {
        listFull: [
          {imgName: '全屏默认', imgSrc1: require('../../../../assets/video/videoPlay/left1.png'), imgSrc2: require('../../../../assets/video/videoPlay/left1_active.png')}
        ],
        listleft: [
          {imgName: '正方默认', imgSrc1: require('../../../../assets/video/videoPlay/left2.png'), imgSrc2: require('../../../../assets/video/videoPlay/left2_active.png')},
          {imgName: '长方默认', imgSrc1: require('../../../../assets/video/videoPlay/left3.png'), imgSrc2: require('../../../../assets/video/videoPlay/left3_active.png')}
        ],
        listMiddle: [
          {imgName: '网格1', imgSrc1: require('../../../../assets/video/videoPlay/middle1.png'), imgSrc2: require('../../../../assets/video/videoPlay/middle1_active.png')},
          {imgName: '网格2', imgSrc1: require('../../../../assets/video/videoPlay/middle2.png'), imgSrc2: require('../../../../assets/video/videoPlay/middle2_active.png')},
          {imgName: '网格3', imgSrc1: require('../../../../assets/video/videoPlay/middle3.png'), imgSrc2: require('../../../../assets/video/videoPlay/middle3_active.png')},
          {imgName: '网格4', imgSrc1: require('../../../../assets/video/videoPlay/middle4.png'), imgSrc2: require('../../../../assets/video/videoPlay/middle4_active.png')}
        ],
        // listRight: [
        //   {imgName: '回放5s', imgSrc1: require('../../../../assets/video/videoPlay/right1.png'), imgSrc2: require('../../../../assets/video/videoPlay/right1_active.png')},
        //   {imgName: '回放10s', imgSrc1: require('../../../../assets/video/videoPlay/right2.png'), imgSrc2: require('../../../../assets/video/videoPlay/right2_active.png')},
        //   {imgName: '回放30s', imgSrc1: require('../../../../assets/video/videoPlay/right3.png'), imgSrc2: require('../../../../assets/video/videoPlay/right3_active.png')},
        //   {imgName: '回放1m', imgSrc1: require('../../../../assets/video/videoPlay/right4.png'), imgSrc2: require('../../../../assets/video/videoPlay/right4_active.png')},
        //   {imgName: '回放2m', imgSrc1: require('../../../../assets/video/videoPlay/right5.png'), imgSrc2: require('../../../../assets/video/videoPlay/right5_active.png')},
        //   // {imgName: '回放3m', imgSrc1: require('../../../../assets/video/videoPlay/right6.png'), imgSrc2: require('../../../../assets/video/videoPlay/right6_active.png')},
        //   // {imgName: '回放4m', imgSrc1: require('../../../../assets/video/videoPlay/right7.png'), imgSrc2: require('../../../../assets/video/videoPlay/right7_active.png')},
        //   {imgName: '回放5m', imgSrc1: require('../../../../assets/video/videoPlay/right8.png'), imgSrc2: require('../../../../assets/video/videoPlay/right8_active.png')}
        // ]
      },
      listFullIndex: false, // 左侧全屏控制按钮
      listleftIndex: 1, // 左侧播放框比例
      listMiddleIndex: 3, // 左侧布局控制按钮index
      listRightIndex: 99, // 左侧时间控制按钮index
      rightListLeft: [
        {name: '左上', imgSrc: require('../../../../assets/images/videoControl/leftTop.png')},
        {name: '上', imgSrc: require('../../../../assets/images/videoControl/top.png')},
        {name: '右上', imgSrc: require('../../../../assets/images/videoControl/rightTop.png')},
        {name: '左', imgSrc: require('../../../../assets/images/videoControl/left.png')},
        {name: '处置', imgSrc: require('../../../../assets/images/videoControl/handle.png')},
        {name: '右', imgSrc: require('../../../../assets/images/videoControl/right.png')},
        {name: '左下', imgSrc: require('../../../../assets/images/videoControl/leftBottom.png')},
        {name: '下', imgSrc: require('../../../../assets/images/videoControl/bottom.png')},
        {name: '右上', imgSrc: require('../../../../assets/images/videoControl/rightBottom.png')}
      ],
      rightListLeftActive: [
        {name: '左上', imgSrc: require('../../../../assets/images/videoControl/leftTop.png'), imgSrchov: require('../../../../assets/images/videoControl/leftTop_active.png')},
        {name: '上', imgSrc: require('../../../../assets/images/videoControl/top.png'), imgSrchov: require('../../../../assets/images/videoControl/top_active.png')},
        {name: '右上', imgSrc: require('../../../../assets/images/videoControl/rightTop.png'), imgSrchov: require('../../../../assets/images/videoControl/rightTop_active.png')},
        {name: '左', imgSrc: require('../../../../assets/images/videoControl/left.png'), imgSrchov: require('../../../../assets/images/videoControl/left_active.png')},
        {name: '处置', imgSrc: require('../../../../assets/images/videoControl/handle.png'), imgSrchov: require('../../../../assets/images/videoControl/handle_active.png')},
        {name: '右', imgSrc: require('../../../../assets/images/videoControl/right.png'), imgSrchov: require('../../../../assets/images/videoControl/right_active.png')},
        {name: '左下', imgSrc: require('../../../../assets/images/videoControl/leftBottom.png'), imgSrchov: require('../../../../assets/images/videoControl/leftBottom_active.png')},
        {name: '下', imgSrc: require('../../../../assets/images/videoControl/bottom.png'), imgSrchov: require('../../../../assets/images/videoControl/bottom_active.png')},
        {name: '右上', imgSrc: require('../../../../assets/images/videoControl/rightBottom.png'), imgSrchov: require('../../../../assets/images/videoControl/rightBottom_active.png')}
      ],
      rightListRight: [
        {name: '缩放+', imgSrc: require('../../../../assets/images/videoControl/add.png'), text: ''},
        {name: '缩放', imgSrc: '', text: '缩放'},
        {name: '缩放-', imgSrc: require('../../../../assets/images/videoControl/reduce.png'), text: ''},
        {name: '焦距+', imgSrc: require('../../../../assets/images/videoControl/add.png'), text: ''},
        {name: '焦距', imgSrc: '', text: '焦距'},
        {name: '焦距-', imgSrc: require('../../../../assets/images/videoControl/reduce.png'), text: ''},
        {name: '光圈+', imgSrc: require('../../../../assets/images/videoControl/add.png'), text: ''},
        {name: '光圈', imgSrc: '', text: '光圈'},
        {name: '光圈-', imgSrc: require('../../../../assets/images/videoControl/reduce.png'), text: ''}
      ],
      rightListRightActive: [
        {name: '缩放+', imgSrc: require('../../../../assets/images/videoControl/add.png'), text: '', imgSrchov: require('../../../../assets/images/videoControl/add_active.png')},
        {name: '缩放', imgSrc: '', text: '缩放', imgSrchov: ''},
        {name: '缩放-', imgSrc: require('../../../../assets/images/videoControl/reduce.png'), text: '', imgSrchov: require('../../../../assets/images/videoControl/reduce_active.png')},
        {name: '焦距+', imgSrc: require('../../../../assets/images/videoControl/add.png'), text: '', imgSrchov: require('../../../../assets/images/videoControl/add_active.png')},
        {name: '焦距', imgSrc: '', text: '焦距', imgSrchov: ''},
        {name: '焦距-', imgSrc: require('../../../../assets/images/videoControl/reduce.png'), text: '', imgSrchov: require('../../../../assets/images/videoControl/reduce_active.png')},
        {name: '光圈+', imgSrc: require('../../../../assets/images/videoControl/add.png'), text: '', imgSrchov: require('../../../../assets/images/videoControl/add_active.png')},
        {name: '光圈', imgSrc: '', text: '光圈', imgSrchov: ''},
        {name: '光圈-', imgSrc: require('../../../../assets/images/videoControl/reduce.png'), text: '', imgSrchov: require('../../../../assets/images/videoControl/reduce_active.png')}
      ],
      // playList: [{groupName: '视频资源'}, {groupName: '分组预案'}],
      playList: [{groupName: '视频资源'}],
      controlList: [{groupName: 'PTZ操作'}, {groupName: '历史回放'}],
      type: '3',
      leftHeight: '',
      showIndex: 0,
      villageVideoInfos: [], // 右侧视频资源循环列表
      filterVideoList: [], // 过滤之后的资源列表
      streetName: '', // 街道名称
      happyHeight: {height: '8rem'},
      typeClassLiInfo: '', // 右侧视频资源中双击选中
      streamSourceIndex: '', // 右侧视频资源中双击信息
      planList: [], // 预案循环列表
      fliterPlanlist: [], // 筛选之后的预案循环列表
      popUpInfo: false, // 弹出层是否显示
      popInputName: '', // 弹出层输入框名称
      videoBorderInfo: '', // 选择播放video位置
      timeValue1: '', // 选择的开始时间
      timeValue2: '', // 选择的结束时间
      styleIndex: {}, // 储存的样式
      searchlist: '', // 视频资源搜索
      searchPlan: '', // 视频列表搜索
      titleIndex1: 0,
      titleIndex2: 0,
      smallStreamSource: '', // 小视频播放地址
      videoWidth: {},
      videoWidth2: {},
      videoWidth3: {},
      videoWidth4: {},
      videoHeight: '',
      boxType3: false,
      src1starttime: '',
      src1endtime: '',
      presentUrl: '',
      timeInfo: [],
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: ''
    }
  },
  methods: {
    // 右侧tab切换top
    tabChooseList (index) {
      if (index === 0 || index === 1) {
        this.titleIndex1 = index
        this.showIndex = index
        if (index === 1) {
          this.getPlanList()
          this.searchlist = ''
        }
        if (index === 0) {
          this.searchPlan = ''
        }
      } else {
        this.titleIndex1 = 0
        this.showIndex = 0
      }
    },
    // 右侧tab切换second
    tabChooseControl (index) {
      return false
      // if (index) {
      //   this.titleIndex2 = index
      // } else {
      //   this.titleIndex2 = 0
      // }
    },
    exchange (index, item) {
      console.log(index, item)
    },
    // 左下角全屏按钮
    smallFullClick () {
      let videoHeight
      if ($('#leftSide').width() > 4000) {
        videoHeight = (this.leftHeight - 150)
      } else {
        videoHeight = (this.leftHeight - 60)
      }
      if (this.listFullIndex === false) {
        if (this.videoBorderInfo === '' || this.videoBorderInfo === null) {
          this.$message('请选择全屏目标')
        } else {
          this.styleIndex = this.videoListInfo[this.videoBorderInfo].style
          this.videoWidth3 = this.videoWidth
          this.videoWidth4 = this.videoWidth2
          for (let i = 0; i < this.videoListInfo.length; i++) {
            this.videoListInfo[i].isShow = false
          }
          this.videoListInfo[this.videoBorderInfo].style = {width: '100%'}
          if (this.listleftIndex === 0) {
            // this.videoListInfo[this.videoBorderInfo].style = {width: ((videoHeight / 3 * 4) - 16) + 'px', height: (videoHeight - 9) + 'px', margin: 0}
            this.videoWidth = {width: ((videoHeight / 3 * 4) - 32) + 'px', height: (videoHeight - 9) + 'px'}
            this.videoWidth2 = {width: ((videoHeight / 3 * 4) - 32) + 'px', height: (videoHeight - 9) + 'px'}
          } else {
            // this.videoListInfo[this.videoBorderInfo].style = {width: ((videoHeight / 9 * 16) - 15) + 'px', height: (videoHeight - 9) + 'px', margin: 0}
            this.videoWidth = {width: ((videoHeight / 9 * 16) - 30) + 'px', height: (videoHeight - 9) + 'px'}
            this.videoWidth2 = {width: ((videoHeight / 9 * 16) - 30) + 'px', height: (videoHeight - 9) + 'px'}
          }
          setTimeout(() => {
            this.videoListInfo[this.videoBorderInfo].isShow = true
          }, 10)
          this.listFullIndex = true
        }
      } else {
        this.videoListInfo[this.videoBorderInfo].style = this.styleIndex
        this.videoWidth = this.videoWidth3
        this.videoWidth2 = this.videoWidth4
        this.videoListInfo[this.videoBorderInfo].isShow = false
        setTimeout(() => {
          for (let i = 0; i < this.videoListInfo.length; i++) {
            this.videoListInfo[i].isShow = true
          }
        }, 10)
        this.styleIndex = {}
        this.videoWidth3 = {}
        this.videoWidth4 = {}
        this.listFullIndex = false
      }
    },
    // 视频播放比例按钮
    leftClick (index) {
      this.listleftIndex = index
      this.listRightIndex = -1
      this.middleClick(this.listMiddleIndex)
    },
    // 视频网格样式切换按钮
    middleClick (index) {
      let that = this
      that.listFullIndex = false
      if (index !== undefined) {
        that.listMiddleIndex = index
      } else {
        that.listMiddleIndex = 0
      }
      for (let i = 0; i < 9; i++) {
        this.timeInfo[i].endTime = ''
        this.timeInfo[i].playBoxIndex = ''
      }
      that.listRightIndex = -1
      that.streamSourceIndex = 0
      that.videoBorderInfo = 0
      let videoHeight
      if ($('#leftSide').width() > 4000) {
        videoHeight = (that.leftHeight - 150)
      } else {
        videoHeight = (that.leftHeight - 60)
      }
      let chooseNum = that.listMiddleIndex
      that.videoListInfoCope = that.videoListInfo
      that.videoListInfo = []
      if (that.listleftIndex === 1) {
        that.boxType3 = false
        if (chooseNum === 0) {
          that.videoListInfo = [
            {
              style: {width: '100%', height: (videoHeight - 16) + 'px', margin: 0},
              data: [],
              isShow: true
            }
          ]
          that.videoWidth = {width: ((videoHeight / 9 * 16) - 32) + 'px'}
        }
        if (chooseNum === 1) {
          let videoType2 = (videoHeight - 25) / 2
          for (let i = 0; i < 4; i++) {
            that.videoListInfo.push({
              style: {width: '49.2%', height: videoType2 + 'px', margin: '0 .4% .5% .4%'},
              data: [],
              isShow: true
            })
          }
          that.videoWidth = {width: ((videoType2 / 9 * 16) - 16) + 'px'}
        }
        if (chooseNum === 2) {
          let videoType3 = (videoHeight - 35) / 3
          for (let i = 0; i < 9; i++) {
            that.videoListInfo.push({
              // style: {width: ((videoType3 / 9 * 16) + 3) + 'px', height: videoType3 + 'px'},
              style: {width: '32.7%', height: videoType3 + 'px', margin: '0 .3% .5% .3%'},
              data: [],
              isShow: true
            })
          }
          that.videoWidth = {width: ((videoType3 / 9 * 16)) + 'px'}
        }
        if (chooseNum === 3) {
          let videoType4 = (videoHeight - 35) / 3
          for (let i = 0; i < 6; i++) {
            that.videoListInfo.push({
              // style: {width: ((videoType4 / 9 * 16) + 3) + 'px', height: videoType4 + 'px'},
              style: {width: '32.7%', height: videoType4 + 'px', margin: '0 .3% .5% .3%'},
              data: [],
              isShow: true
            })
          }
          that.boxType3 = true
          that.videoHeight = videoType4 + 'px'
          that.videoWidth = {width: ((videoType4 / 9 * 16)) + 'px'}
          that.videoWidth2 = {width: ((videoType4 / 9 * 16) + 3) * 2 + 'px'}
          that.videoListInfo[0].style = {width: '66.1%', height: ((videoType4 * 2) + 8) + 'px', margin: '0 .3% .5% .3%'}
        }
      } else {
        that.boxType3 = false
        if (chooseNum === 0) {
          that.videoListInfo = [
            {
              // style: {width: ((videoHeight / 3 * 4) - 16) + 'px', height: (videoHeight - 9) + 'px', margin: 0},
              style: {width: '100%', height: (videoHeight - 16) + 'px', margin: 0},
              data: [],
              isShow: true
            }
          ]
          that.videoWidth = {width: ((videoHeight / 3 * 4) - 16) + 'px'}
          // that.ulWidth = {width: ((videoHeight / 3 * 4) - 16) + 'px'}
        }
        if (chooseNum === 1) {
          let videoType2 = (videoHeight - 18) / 2
          for (let i = 0; i < 4; i++) {
            that.videoListInfo.push({
              // style: {width: (videoType2 / 3 * 4) + 'px', height: videoType2 + 'px'},
              style: {width: '49.4%', height: videoType2 + 'px', margin: '0 .3% .5% .3%'},
              data: [],
              isShow: true
            })
          }
          that.videoWidth = {width: (videoType2 / 3 * 4) + 'px'}
          // that.ulWidth = {width: ((videoType2 / 3 * 8) + 30) + 'px'}
        }
        if (chooseNum === 2) {
          let videoType3 = (videoHeight - 30) / 3
          for (let i = 0; i < 9; i++) {
            that.videoListInfo.push({
              // style: {width: ((videoType3 / 3 * 4) + 3) + 'px', height: videoType3 + 'px'},
              style: {width: '32.7%', height: videoType3 + 'px', margin: '0 .3% .5% .3%'},
              data: [],
              isShow: true
            })
          }
          that.videoWidth = {width: ((videoType3 / 3 * 4) + 3) + 'px'}
          // that.ulWidth = {width: ((videoType3 / 3 * 12) + 50) + 'px'}
        }
        if (chooseNum === 3) {
          let videoType4 = (videoHeight - 30) / 3
          for (let i = 0; i < 6; i++) {
            that.videoListInfo.push({
              // style: {width: ((videoType4 / 3 * 4) + 3) + 'px', height: videoType4 + 'px'},
              style: {width: '32.7%', height: videoType4 + 'px', margin: '0 .3% .5% .3%'},
              data: [],
              isShow: true
            })
          }
          that.boxType3 = true
          that.videoHeight = videoType4 + 'px'
          that.videoWidth = {width: ((videoType4 / 3 * 4) + 3) + 'px'}
          that.videoWidth2 = {width: ((videoType4 / 3 * 4) + 3) * 2 + 'px'}
          that.videoListInfo[0].style = {width: '66%', height: ((videoType4 * 2) + 8) + 'px', margin: '0 .3% .5% .3%'}
        }
      }
    },
    // 左下角时间回放按钮
    rightClick (index) {
      let smallStreamSourceId = ''
      if (this.smallStreamSource === '' || this.smallStreamSource === null) {
        this.$message('请选择小视频播放地址')
        return
      } else {
        smallStreamSourceId = this.smallStreamSource
      }
      let timeInfo = [5000, 10000, 30000, 60000, 120000, 180000, 240000, 300000]
      this.listRightIndex = index
      let endTime = ''
      if (this.timeInfo[this.streamSourceIndex].endTime === '') {
        endTime = Date.parse(new Date())
        this.timeInfo[this.streamSourceIndex].endTime = endTime
        this.timeInfo[this.streamSourceIndex].playBoxIndex = index
      } else {
        endTime = this.timeInfo[this.streamSourceIndex].endTime
        this.timeInfo[this.streamSourceIndex].playBoxIndex = index
      }
      let startTime = endTime - timeInfo[index]
      let tvsrc = this.getstremsm(startTime, endTime, smallStreamSourceId)
      this.videoListInfo[this.streamSourceIndex].data.streamSource = tvsrc
    },
    onmouseoverLeft (msg, index) {
      this.rightListLeft[index].imgSrc = this.rightListLeftActive[index].imgSrchov
    },
    onmouseoutLeft (msg, index) {
      this.rightListLeft[index].imgSrc = this.rightListLeftActive[index].imgSrc
    },
    onmouseoverRight (msg, index) {
      this.rightListRight[index].imgSrc = this.rightListRightActive[index].imgSrchov
    },
    onmouseoutRight (msg, index) {
      this.rightListRight[index].imgSrc = this.rightListRightActive[index].imgSrc
    },
    // 获取摄像机列表函数
    getVideoList: function (msg) {
      let videoList = []
      let reqParam = user.getRequestHeader()
      reqParam.villageIDs = [msg]
      // 获取门禁信息
      Post({
        async: false,
        url: apiNames['获取摄像机列表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.cameraList) {
            // console.log(data.cameraList)
            // videoList = data.cameraList
            let numArr = ['0', '2', '4', '8', '16']
            let obj = [
              {name: '监控摄像机', posi: false, allInfo: []},
              {name: '人脸卡口摄像机', posi: false, allInfo: []},
              {name: '车辆卡口摄像机', posi: false, allInfo: []},
              {name: '门禁人脸摄像机', posi: false, allInfo: []},
              {name: '人脸网关摄像机', posi: false, allInfo: []}
            ]
            for (let i = 0; i < obj.length; i++) {
              obj[i].allInfo = data.cameraList.filter(y => y.useType === numArr[i])
            }
            videoList = obj
          } else {
            videoList = []
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + '获取摄像机列表信息')
        }
      })
      return videoList
    },
    areaList (i) {
      this.filterVideoList[i].villagetype = !this.filterVideoList[i].villagetype
    },
    areaListData (i, j) {
      this.filterVideoList[i].data[j].posi = !this.filterVideoList[i].data[j].posi
    },
    // 双击选取摄像机播放地址
    dblclick (index, msg) {
      let that = this
      if (that.streamSourceIndex !== '') {
        that.listRightIndex = -1
        that.typeClassLiInfo = index
        if (msg.deviceID !== '') {
          let playSRC = that.getstrema(msg.deviceID)
          if (playSRC !== '') {
            msg.streamSource = ''
            msg.streamSource = playSRC
            that.videoListInfo[this.streamSourceIndex].data = msg
            that.timeInfo[this.streamSourceIndex].playBoxIndex = ''
            that.timeInfo[this.streamSourceIndex].endTime = ''
          } else {
            that.$message('无效的播放地址')
          }
        } else {
          that.$message('无效的播放地址')
        }
        // this.videoListInfo[this.streamSourceIndex].data = msg
        // this.streamSourceIndex = ''
        that.smallStreamSource = msg.deviceID
      } else {
        that.$message('请选择播放位置')
      }
    },
    // 播放位置选择
    playBoxChange (index) {
      this.streamSourceIndex = index
      this.videoBorderInfo = index
      if (this.timeInfo[index].playBoxIndex !== '') {
        this.listRightIndex = this.timeInfo[index].playBoxIndex
      } else {
        this.listRightIndex = -1
      }
      let smallIndex = this.videoListInfo[index].data
      if (smallIndex.deviceID !== '' && smallIndex.deviceID !== null) {
        this.smallStreamSource = this.videoListInfo[index].data.deviceID
      }
    },
    // 保存预案按钮
    saveClick () {
      console.log(this.videoListInfo)
      for (let i = 0; i < this.videoListInfo.length; i++) {
        if (this.videoListInfo[i].data.length === 0) {
          this.$message('请确认全部配置信息正确')
          return
        }
      }
      this.popUpInfo = true
    },
    // 弹出按钮
    popClose () {
      this.popUpInfo = false
      this.popInputName = ''
    },
    // 弹出关闭按钮
    popOpen () {
      if ($.trim(this.popInputName)) {
        this.popUpInfo = false
        let panData = []
        console.log(this.videoListInfo, 'this.videoListInfo')
        this.videoListInfo.forEach(item => {
          panData.push(item.data.cameraID)
        })
        let cameraLen = ''
        let videoListLength = this.videoListInfo.length
        if (videoListLength === 1) {
          cameraLen = '1*1'
        } else if (videoListLength === 4) {
          cameraLen = '2*2'
        } else if (videoListLength === 9) {
          cameraLen = '2*2'
        } else if (videoListLength === 6) {
          cameraLen = '1*5'
        }
        let cameraStyleInfo = ['4:3', '16:9']
        let reqParam = user.getRequestHeader()
        let villageInfo = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
        reqParam.villageID = villageInfo
        reqParam.planName = this.popInputName
        reqParam.cameraSchema = cameraLen
        reqParam.cameraIDs = panData
        reqParam.cameraDisplayScale = cameraStyleInfo[this.listleftIndex]
        Post({
          async: false,
          url: apiNames['添加预案'],
          data: reqParam,
          dataType: 'json',
          success: (data) => {
            console.log(data)
            this.$message('添加预案成功')
            this.getPlanList()
          },
          error: function (err) {
            console.log(JSON.stringify(err) + '添加预案信息')
          }
        })
        this.popInputName = ''
      } else {
        this.$message('请填写正确配置信息')
      }
    },
    areaListPlan (i) {
      this.fliterPlanlist[i].planHeight = !this.fliterPlanlist[i].planHeight
    },
    // 小视频播放按钮
    playChoose () {
      let smallStreamSourceId = ''
      if (this.smallStreamSource === '' || this.smallStreamSource === null) {
        this.$message('请选择小视频播放地址')
        return
      } else {
        smallStreamSourceId = this.smallStreamSource
      }
      let nowTime = new Date()
      if (this.timeValue1 === '' || this.timeValue1 === null) {
        this.$message('请选择开始时间')
        return
      } else {
        this.src1starttime = Date.parse(new Date(this.timeValue1))
      }
      if (this.timeValue2 === '' || this.timeValue1 === null) {
        this.$message('请选择结束时间')
        return
      } else {
        this.src1endtime = Date.parse(new Date(this.timeValue2))
        console.log(this.src1endtime)
      }
      if (this.timeValue1.getTime() > nowTime.getTime() || this.timeValue2.getTime() > nowTime.getTime()) {
        this.$message('请选择当前时间之前')
        return
      }
      if (this.timeValue1.getTime() >= this.timeValue2.getTime()) {
        this.$message('请确认开始时间在结束时间之前')
        return
      }
      this.listRightIndex = -1
      let playSmallSrc = this.getstremsm(this.src1starttime, this.src1endtime, smallStreamSourceId)
      this.videoListInfo[this.streamSourceIndex].data.streamSource = playSmallSrc
    },
    // 判断是直播还是小视频
    decideSmOrMa (deviceId) {
      // if (this.src1starttime === '' && this.src1endtime === '') {
      //   return this.getstrema(deviceId)
      // }
      // return this.getstremsm(this.src1starttime, this.src1endtime, deviceId)
    },
    // 获取播放预案列表
    getPlanList () {
      let that = this
      let villageInfo = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      let reqParam = user.getRequestHeader()
      reqParam.villageID = villageInfo
      Post({
        async: true,
        url: apiNames['获取预案列表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.planList) {
            that.fliterPlanlist = []
            that.planList = []
            let listInfo = data.planList
            listInfo.forEach(item => {
              that.planList.push({
                planName: item.planName,
                cameraDisplayScale: item.cameraDisplayScale,
                planHeight: false,
                data: item.cameras,
                planID: item.planID
              })
            })
            that.serchPlan(true)
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + '获取预案列表')
        }
      })
    },
    // 使用预案
    planUse (message) {
      let msg = message.data
      let msgStyle = message.cameraDisplayScale
      this.$confirm('确定使用预案吗？')
        .then(_ => {
          this.listRightIndex = -1
          let dataLength = msg.length
          if (msgStyle === '4:3') {
            this.listleftIndex = 0
          } else {
            this.listleftIndex = 1
          }
          if (dataLength === 1) {
            this.listMiddleIndex = 0
          } else if (dataLength === 4) {
            this.listMiddleIndex = 1
          } else if (dataLength === 9) {
            this.listMiddleIndex = 2
          } else if (dataLength === 6) {
            this.listMiddleIndex = 3
          }
          this.middleClick(this.listMiddleIndex)
          for (let i = 0; i < dataLength; i++) {
            let playSRC = this.getstrema(msg[i].deviceID)
            msg[i].streamSource = playSRC
            this.videoListInfo[i].data = msg[i]
          }
          this.smallStreamSource = this.videoListInfo[0].data.deviceID
        })
        .catch(_ => {})
    },
    // 删除预案
    planDelet (msg) {
      this.$confirm('确定删除预案吗？')
        .then(_ => {
          let that = this
          let reqParam = user.getRequestHeader()
          reqParam.planID = msg
          Post({
            async: true,
            url: apiNames['删除预案'],
            data: reqParam,
            dataType: 'json',
            success: function (data) {
              if (data.responseStatus.resultCode === 0) {
                that.$message('删除成功！')
                that.getPlanList()
              }
            },
            error: function (err) {
              that.$message('删除失败！')
              console.log(JSON.stringify(err) + '删除预案')
            }
          })
        })
        .catch(_ => {})
    },
    // 获取摄像机列表
    getlistFun () {
      // let villageInfos = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      // let streetNameInfo = JSON.parse(window.localStorage.getItem('webGlobalConfig')).streetName
      // if (streetNameInfo) {
      //   this.streetName = streetNameInfo
      // } else {
      //   this.streetName = 'xxx街道'
      // }
      // this.villageVideoInfos = []
      // for (let i = 0; i < villageInfos.length; i++) {
      //   this.villageVideoInfos.push({
      //     villageID: villageInfos[i].villageID,
      //     villageName: villageInfos[i].villageName,
      //     villagetype: false,
      //     data: this.getVideoList(villageInfos[i].villageID)
      //   })
      // }
      let villageInfo = JSON.parse(window.localStorage.getItem('currentVillageID'))
      this.villageVideoInfos = []
      this.villageVideoInfos.push({
        villageID: villageInfo.villageID,
        villageName: villageInfo.villageName,
        villagetype: true,
        data: this.getVideoList(villageInfo.villageID)
      })
      this.serchList()
    },
    // 播放列表搜索
    serchList () {
      let that = this
      that.filterVideoList = []
      let indexofList = that.villageVideoInfos
      // for (let i = 0; i < indexofList.length; i++) {
      //   let obj = indexofList[i].data.filter((item) => {
      //     return item.name.indexOf($.trim(that.searchlist)) !== -1
      //   })
      //   that.filterVideoList.push({
      //     villageID: indexofList[i].villageID,
      //     villageName: indexofList[i].villageName,
      //     villagetype: true,
      //     data: obj
      //   })
      // }
      for (let i = 0; i < indexofList.length; i++) {
        let arrobj = [
          {name: '', posi: false, allInfo: []},
          {name: '', posi: false, allInfo: []},
          {name: '', posi: false, allInfo: []},
          {name: '', posi: false, allInfo: []},
          {name: '', posi: false, allInfo: []}]
        for (let j = 0; j < indexofList[i].data.length; j++) {
          let obj = indexofList[i].data[j].allInfo.filter((item) => {
            return item.name.indexOf($.trim(that.searchlist)) !== -1
          })
          arrobj[j].name = indexofList[i].data[j].name
          arrobj[j].allInfo = obj
          arrobj[j].posi = !!that.searchlist
        }
        that.filterVideoList.push({
          villageID: indexofList[i].villageID,
          villageName: indexofList[i].villageName,
          villagetype: true,
          data: arrobj
        })
      }
      this.typeClassLiInfo = -1
    },
    // 播放预案列表搜索
    serchPlan (msg) {
      let that = this
      that.fliterPlanlist = []
      let indexofPlan = that.planList
      for (let i = 0; i < indexofPlan.length; i++) {
        let obj = indexofPlan[i].data.filter((item) => {
          return item.name.indexOf($.trim(that.searchPlan)) !== -1
        })
        that.fliterPlanlist.push({
          planName: indexofPlan[i].planName,
          cameraDisplayScale: indexofPlan[i].cameraDisplayScale,
          planID: indexofPlan[i].planID,
          planHeight: msg ? indexofPlan[i].planHeight : true,
          data: obj
        })
      }
    },
    // 屏幕全屏
    fullClick () {
      let indexInfo = this.videoBorderInfo
      if (indexInfo === '') {
        this.$message('请选择全屏目标')
        return
      } else {
        let playList = this.$refs.playID
        let playId = ''
        let fullIndexSrc = this.videoListInfo[indexInfo].data.streamSource
        if (fullIndexSrc) {
          for (let i = 0; i < playList.length; i++) {
            if (fullIndexSrc === playList[i].src) {
              playId = playList[i].player
            }
          }
          playId.requestFullscreen()
        } else {
          this.$message('视频地址无效！')
        }
        console.log(playList, 'playList')
        // let playId = playList[indexInfo].player
        // playId.isFullscreen(true)
      }
      console.log(indexInfo)
    },
    // 检测是否定位
    positionType () {
      if (this.listMiddleIndex === 3) {
        setTimeout(() => {
          $('.boxType3Class').css({position: 'absolute', top: this.videoHeight})
        }, 50)
      } else {
        setTimeout(() => {
          $('.video').css({position: 'static'})
        }, 200)
      }
    },
    clearPlay () {
      for (let i = 0; i < this.videoListInfo.length; i++) {
        if (i === this.videoBorderInfo) {
          this.videoListInfo[i].data = []
        }
      }
      this.$message('已清空播放')
    },
    clearAllplay () {
      for (let i = 0; i < this.videoListInfo.length; i++) {
        this.videoListInfo[i].data = []
      }
      this.$message('已清空全部播放')
    },
    // 获取直播流
    getstrema (deviceId) {
      let reqParam = user.getRequestHeader()
      reqParam.ID = deviceId
      console.log(JSON.stringify(reqParam))
      let url = ''
      PostCopy({
        async: false,
        url: this.videoUrl,
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          console.log(data)
          if (data.Code === 0) {
            url = this.playUrl + data.Data.RTMP
            // url = 'rtmp://113.214.17.195' + data.Data.RTMP
            // url = 'rtmp://' + window.location.hostname + data.Data.RTMP
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err) + '获取流媒体')
        }
      })
      return url
    },
    // 获取小视频
    getstremsm (startTime, endTime, id) {
      // let allTime = new Date(time)
      // allTime = allTime.getTime()
      let reqParam = user.getRequestHeader()
      let tvSrc = ''
      if (id) {
        reqParam.ID = id
      } else {
        this.$message('请选择播放地址')
        return
      }
      reqParam.Start = startTime / 1000
      reqParam.End = endTime / 1000
      PostCopy({
        async: false,
        url: this.smallVideoUrl,
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.Code === 0) {
            tvSrc = this.playUrl + data.Data.RTMP
            // tvSrc = 'rtmp://113.214.17.195' + data.Data.RTMP
            // this.getDataSrc(tvSrc, '')
            // tvSrc = 'rtmp://' + window.location.hostname + data.Data.RTMP
            // this.getDataSrc(tvSrc, '')
            // this.src1starttime = ''
            // this.src1endtime = ''
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
      return tvSrc
    },
    // 获取门禁列表小视频播放
    getDataSrc (src1, src2) {
      // let src = ''
      // if (src1 === '' && src2 === '') {
      //   console.log('小视频为空')
      // } else {
      //   if (src1 === '') {
      //     src = src2
      //   } else {
      //     src = src1
      //   }
      // }
    }
  },
  created () {
    for (let i = 0; i < 9; i++) {
      this.timeInfo.push({
        endTime: '',
        playBoxIndex: ''
      })
    }
    this.getlistFun()
    this.getPlanList()
    document.onkeydown = (e) => {
      if (!e) e = window.event
      if ((e.keyCode === 13) && this.$route.path === '/home/video') {
        if (this.titleIndex1 === 0) {
          this.serchList()
        }
        if (this.titleIndex1 === 1) {
          this.serchPlan()
        }
      }
    }
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    this.leftHeight = $('#leftSide').height()
    // this.happyHeight = {height: (this.leftHeight * 0.53) + 'px'}
    // if (this.leftHeight > 1500) {
    //   this.happyHeight = {height: (this.leftHeight - 600) + 'px'}
    // } else if (this.leftHeight > 700 && this.leftHeight < 1500) {
    //   this.happyHeight = {height: (this.leftHeight - 360) + 'px'}
    // } else {
    //   this.happyHeight = {height: (this.leftHeight - 310) + 'px'}
    // }
    let leftSideHeight = $('#leftSide').width()
    if (leftSideHeight > 4000) {
      this.fontPadding = {
        padding: '0.04rem .2rem',
        fontSize: '.52rem'
      }
      this.css1.gridAutoRows = '1.2rem 1fr'
      this.css2.gridAutoRows = '1.3rem 1fr'
      this.happyHeight = {height: (this.leftHeight - 620) + 'px'}
    } else if (leftSideHeight > 2000 && leftSideHeight < 4000) {
      this.happyHeight = {height: (this.leftHeight - 360) + 'px'}
    } else {
      this.happyHeight = {height: (this.leftHeight - 330) + 'px'}
    }
    this.middleClick()
  },
  watch: {
    $route (to, from) {
      if (to.fullPath === '/home/video') {
        for (let i = 0; i < this.videoListInfo.length; i++) {
          this.videoListInfo[i].isShow = true
        }
        this.positionType()
      } else {
        if (this.listFullIndex === true) {
          this.smallFullClick()
        }
        for (let i = 0; i < this.videoListInfo.length; i++) {
          this.videoListInfo[i].isShow = false
        }
      }
    },
    listMiddleIndex (oldValue, newValue) {
      this.positionType()
    },
    listFullIndex (oldValue, newValue) {
      this.positionType()
      if (this.videoBorderInfo === 2 && this.listFullIndex === true) {
        setTimeout(() => {
          $('.video').css({position: 'static'})
        }, 200)
      }
    }
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .videoPlay {
    box-sizing: border-box;
    padding: .1rem;
    height: 100%;
    color: #FFFFFF;
  }
  .main_globle {
    border:1px solid rgba(0,190,255,1);
    box-sizing: border-box;
    background:rgba(1,3,5,.9);
    background: url("../../../../assets/images/title_background2.png");
    background-size: 43px ;
    box-shadow:5px 3px 3px rgba(0,0,0,0.6);
    position: relative;
    width: 100%;
    height: 100%;
    padding: .3rem .1rem 0 .1rem;
    display: grid;
    grid-template-columns: 1fr 7.9rem;
  }
  .main_globle .main_globle_span {
    display: inline-block;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .main_globle .main_globle_span:before {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-left: 3px solid rgba(0,159,232,1);
    border-bottom: 3px solid rgba(0,159,232,1);
    left: -2px;
    bottom: -2px;
  }
  .main_globle .main_globle_span:after {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-right: 3px solid rgba(0,159,232,1);
    border-bottom: 3px solid rgba(0,159,232,1);
    right: -2px;
    bottom: -2px;
  }
  .main_globle:before {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-left: 3px solid rgba(0,159,232,1);
    border-top: 3px solid rgba(0,159,232,1);
    left: -2px;
    top: -2px;
  }
  .main_globle:after {
    content: '';
    position: absolute;
    width: .6rem;
    height: .6rem;
    border-right: 3px solid rgba(0,159,232,1);
    border-top: 3px solid rgba(0,159,232,1);
    right: -2px;
    top: -2px;
  }
  .leftSide {
    /*width: 30.1rem;*/
    height: 100%;
    position: relative;
    /*display: grid;*/
    /*grid-template-rows: 1fr 1.2rem;*/
  }
  .leftSide .videocontent>ul{
  }
  /*左侧上面视频栏*/
  .videocontent {
    overflow: hidden;
    text-align: center;
  }
  .videocontent ul {
    overflow: hidden;
    margin: 0 auto;
  }
  .videocontent ul.ulWidth {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap:wrap;
  }
  .videocontent ul li {
    background: #0A1E38;
    /*float: left;*/
    width: 100%;
  }
  .videocontent .video{
    /*margin:0 0 .2rem .24rem;*/
    margin: 0 auto;
    border: 1px solid #000;
    box-sizing: border-box;
    position: relative;
    background: #000;
    padding: 1px;
  }
  .videocontent .video span.miskControl {
    display: inline-block;
    width: 100%;
    height: 15%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: pointer;
  }
  .videocontent .videoActive {
    border: 1px solid #ffd800;
  }
  /*左侧下面控制栏*/
  .leftSide .videoControl {
    font-size: .24rem;
    margin-top: .05rem;
    position: relative;
    box-sizing: border-box;
    padding-top: .1rem;
    position: absolute;
    bottom: .3rem;
    width: 100%;
  }
  .leftSide .videoControl ul {
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
  }
  .leftSide .videoControl .videoControl_full {
    padding-left: .4rem;
    width: 1.84rem;
  }
  .leftSide .videoControl .videoControl_left {
    width: 3.1rem;
  }
  .leftSide .videoControl .videoControl_left:before {
    content: '';
    width: .03rem;
    height: .8rem;
    background: #009fe8;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .leftSide .videoControl li {
    width: .66rem;
    height: .66rem;
    background-size: 100% 100%;
    text-align: center;
    line-height: .66rem;
    font-size: .32rem;
    cursor: pointer;
    float: left;
  }
  .leftSide .videoControl .videoControl_left li {
    margin-right: .84rem;
  }
  .leftSide .videoControl .videoControl_left li:nth-of-type(2) {
    width: .9rem;
    margin-right: 0;
  }
  .leftSide .videoControl .videoControl_middle {
    width: 6.4rem;
  }
  .leftSide .videoControl .videoControl_middle:before {
    content: '';
    width: .03rem;
    height: .8rem;
    background: #009fe8;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .leftSide .videoControl .videoControl_middle li{
    margin-left: .7rem;
  }
  .leftSide .videoControl .videoControl_right {
    padding-left: .75rem;
  }
  .leftSide .videoControl .videoControl_right li{
    margin-right: .45rem;
  }
  .leftSide .videoControl .videoControl_action {
    position: absolute;
    margin-left: .3rem;
    /*right: .3rem;*/
  }
  .leftSide .videoControl .videoControl_action li{
    width: 2rem;
    line-height: .58rem;
    color: #00beff;
  }
  .leftSide .videoControl .videoControl_action li:nth-of-type(1){
   margin-right: .17rem;
  }
  .leftSide .videoControl .videoControl_action li:nth-of-type(2){
    margin-right: .17rem;
  }
  .leftSide .videoControl .videoControl_action li:nth-of-type(3){
    margin-right: .17rem;
  }
  .leftSide .videoControl .videoControl_action li:hover {
    color: #ffd800;
  }
  /*右侧*/
  .rightSide {
    width: 7.55rem;
    height: 100%;
    position: absolute;
    right: .2rem;
    top: 0;
    display: grid;
    grid-template-rows: 1fr 5rem;
  }
  .inputFa {
    position: relative;
  }
  .tabInput {
    width: 100%;
    background: none;
    outline: none;
    border: 1px solid #00beff;
    border-radius: 3px;
    height: .66rem;
    padding-left: .2rem;
    box-sizing: border-box;
    color: rgb(96, 191, 253);
    position: relative;
  }
  .inputFa span {
    display: inline-block;
    width: .3rem;
    height: .3rem;
    background: url('../../../../assets/images/icon/ico-find.svg') center center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: .2rem;
    right: .15rem;
    cursor: pointer;
  }
  .tab_div {
    position: relative;
  }
  .tab_div_top {
    height: 100%;
  }
  .tab_div_top>ul {
    border: 1px solid rgba(0,190,255,.6);
    border-radius: 3px ;
    height: 100%;
    color: #00beff;
  }
  .tab_div .videoControlUl {
    color: rgba(0,190,255,.6);
  }
  .tab_div .videoControlUl li:nth-of-type(1) {
    margin-bottom: .2rem;
  }
  .tab_div .videoControlUl li p {
    margin: 0 0 .17rem 0;
  }
  .tab_div .videoControlUl li .tabInput {
    border: none;
  }
  .tab_div .videoControlUl li>div {
    background-size: 100% 100%;
    position: relative;
    height: .72rem;
    box-sizing: border-box;
    padding: 0 9px;
  }
  .tab_div .videoControlUl li>div:before {
    content: '';
    width: 9px;
    height: 100%;
    background: url('../../../../assets/newjs/pic/left.png') center center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .tab_div .videoControlUl li>div:after {
    content: '';
    width: 9px;
    height: 100%;
    background: url('../../../../assets/newjs/pic/right.png') center center no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
  .tab_div .videoControlUl li>div div{
    border-top:1px solid  rgba(0,190,255,.6);
    border-bottom:1px solid  rgba(0,190,255,.6);
    height: 100%;
    box-sizing: border-box;
  }
  .tab_div .tab_button{
    width: 2.15rem;
    line-height: .58rem;
    color: #00beff;
    text-align: center;
    cursor: pointer;
    margin: .32rem 0 0 5.4rem;
  }
  .tab_div .tab_button:hover {
    color: #ffd800;
  }
  .tabVideoCon {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: .15rem;
  }
  .tabVideoCon ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-row-gap: .2rem;
  }
  .tabVideoCon ul li {
    width: 1.05rem;
    height: 1.05rem;
    line-height: 1.05rem;
    text-align: center;
    color: #00beff;
    font-size: .32rem;
    background-size: 100% 100%;
    cursor: pointer;
  }
  .tabVideoCon ul.rightListRight {
    box-sizing: border-box;
    padding-left: .1rem;
  }
  .rightListLeft li {
  }
  .tabVideoCon ul.rightListRight li:nth-of-type(3n + 2) {
    cursor: default;
  }
  .tabListUl {
    box-sizing: border-box;
    padding:.25rem 0 0 .25rem;
  }
  .tabListUl li.tabListLi{
    box-sizing: border-box;
    font-size: .32rem;
    cursor: pointer;
    position: relative;
  }
  .tabListUl li.tabListLi:before {
    content: '';
    width: 1px;
    height: .45rem;
    border-left: 1px dashed #fff;
    position: absolute;
    top: -.36rem;
    left: .5rem;
  }
  .tabListUl li.tabListLi:nth-of-type(1):before {
    border-left: none;
  }
  .tabListUl li.tabListLi>div span {
    display: inline-block;
    width: .25rem;
    height: .25rem;
    background: url("../../../../assets/images/videoList/close.png") no-repeat center center;
    background-size: 100% 100%;
    margin-right: .55rem;
    float: left;
    margin-top: .1rem;
    position: relative;
  }
  .tabListUl li.tabListLi>div span.spanActive {
    background: url("../../../../assets/images/videoList/open.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .tabListUl li.tabListLi .videoNametab div span {
    display: inline-block;
    width: 0.25rem;
    height: 0.25rem;
    background: url('../../../../assets/images/videoList/close.png') no-repeat
    center center;
    background-size: 100% 100%;
    margin-right: 0.2rem;
    margin-top: 0.1rem;
    position: absolute;
    left: .4rem;
    top:1px;
  }
  .tabListUl li.tabListLi .videoNametab div span.spanActive {
    background: url('../../../../assets/images/videoList/open.png') no-repeat
    center center;
    background-size: 100% 100%;
  }
  .tabListUl li.tabListLi>div span:before {
    content: '';
    height: 1px;
    width: .3rem;
    position: absolute;
    border-top: 1px dashed #fff;
    top: 50%;
    transform: translateY(-50%);
    left: .4rem;
  }
  .tabListUl li.tabListLi>div p {
    display: inline-block;
    padding-left: .4rem;
    box-sizing: border-box;
    background: url("../../../../assets/images/videoList/area.png") no-repeat left center;
    background-size: .35rem;
    width: 65%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tabListUl li.tabListLi1>div p {
    background: url("../../../../assets/images/videoList/planFolder.png") no-repeat left center;
    background-size: .35rem;
  }
  .tabListUl li.tabListLi1 .tabListLi1_Active {
    background: url("../../../../assets/images/videoList/planFolder_active.png") no-repeat left center;
    background-size: .35rem;
  }
  .videoNametab {
    margin: .1rem 0 .1rem .6rem;
    position: relative;
  }
  .videoNametab:before {
    content: '';
    width: 1px;
    height: 100%;
    border-left: 1px dashed #fff;
    position: absolute;
    top: -.26rem;
    left: -.1rem;
  }
  .videoNametab li {
    line-height: .5rem;
    box-sizing: border-box;
    padding-left: .5rem;
    position: relative;
  }
  .videoNametab1 li:before {
    content: '';
    height: 1px;
    width: .3rem;
    position: absolute;
    border-top: 1px dashed #fff;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
  .videoNametab li > i {
    content: '';
    height: 1px;
    width: 0.3rem;
    position: absolute;
    border-top: 1px dashed #ffffff;
    top: .2rem;
    left: 0;
    opacity: .5;
  }
  .videoNametab li > div p{
    padding-left: .25rem;
  }
  .videoNametab li li i {
    width: 0.3rem;
    left: 2px;
  }
  .videoNametab li ul {
    position: relative;
  }
  .videoNametab li ul:before {
    content: '';
    width: 1px;
    height: 100%;
    border-left: 1px dashed #fff;
    opacity: .5;
    position: absolute;
    left: 0;
    top: 0;
  }
  .videoNametabaAc {
    height: 0;
    overflow: hidden;
  }
  .typeClass {
    display: inline-block;
    padding-left: .4rem;
    box-sizing: border-box;
  }
  .typeClass0 {
    background: url("../../../../assets/images/videoList/videoStreet.png") no-repeat left center;
    background-size: .35rem;
  }
  .typeClass0:hover {
    background: url("../../../../assets/images/videoList/videoStreet_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .typeClassActive0{
    background: url("../../../../assets/images/videoList/videoStreet_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .typeClass2 {
    background: url("../../../../assets/images/videoList/videoFace.png") no-repeat left center;
    background-size: .35rem;
  }
  .typeClass2:hover {
    background: url("../../../../assets/images/videoList/videoFace_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .typeClassActive2{
    background: url("../../../../assets/images/videoList/videoFace_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .typeClass4 {
    background: url("../../../../assets/images/videoList/videoCar.png") no-repeat left center;
    background-size: .35rem;
  }
  .typeClass4:hover {
    background: url("../../../../assets/images/videoList/videoCar_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .typeClassActive4{
    background: url("../../../../assets/images/videoList/videoCar_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .typeClass8 {
    background: url("../../../../assets/images/videoList/videoDoor.png") no-repeat left center;
    background-size: .35rem;
  }
  .typeClass8:hover {
    background: url("../../../../assets/images/videoList/videoDoor_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .typeClassActive8{
    background: url("../../../../assets/images/videoList/videoDoor_active.png") no-repeat left center;
    background-size: .35rem;
    color: #fdd600;
  }
  .popUp {
    color:#fff ;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    padding: .1rem .5rem;
    border-radius: 5px;
    background: #264f85;
  }
  .popUp p {
    margin: .3rem 0;
  }
  .popUp p span {
    display: inline-block;
    width: 1rem;
    cursor: pointer;
    text-align: center;
  }
  .popUp p span:nth-of-type(1) {
    margin-right: 1.8rem;
  }
  .tab_div .videoControlUl li .timeInput div {
    width: 100%;
  }
  .tabListUl li.tabListLi>div .planUse {
    position: absolute;
    display: inline-block;
    right: .8rem;
    text-align: center;
    width: .6rem;
    height: .45rem;
    background: url("../../../../assets/images/videoList/planChoose.png") no-repeat center center;
    background-size: .5rem;
    margin-top: 0;
  }
  .tabListUl li.tabListLi1>div .planUse:before {
    border: none;
  }
  .tabListUl li.tabListLi1>div .planUse:hover {
    background: url("../../../../assets/images/videoList/planChoose_active.png") no-repeat center center;
    background-size: .5rem;
  }
  .tabListUl li.tabListLi1>div .planDelet {
    position: absolute;
    display: inline-block;
    right: .1rem;
    text-align: center;
    width: .6rem;
    height: .45rem;
    background: url("../../../../assets/images/videoList/planDelet.png") no-repeat center center;
    background-size: .5rem;
    margin-top: 0;
  }
  .tabListUl li.tabListLi1>div .planDelet:before {
    border: none;
  }
  .tabListUl li.tabListLi1>div .planDelet:hover {
    background: url("../../../../assets/images/videoList/planDelet_active.png") no-repeat center center;
    background-size: .5rem;
  }
  .popClose {
    position: absolute;
    top: .1rem;
    right: .2rem;
    cursor: pointer;
  }
  .vjs-tech {
    pointer-events: none;
  }
  .ulWidth .boxType3Class {
    position: absolute;
    left: 66.6%;
    margin-top: .6% !important;
  }
  .logo_posi{
    width: 100%;
    height: 100%;
    float: left;
    position: relative;
  }
  .logo_posi:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /*background: url("../../../../assets/sxPolice.png") no-repeat center center;*/
    /*background-size: 40% ;*/
    background: url("../../../../assets/images/TSL_logo2.png") no-repeat center center;
    background-size: 80% ;
    z-index: 1;
  }
  @media screen and (min-width: 3001px) {
    .ulWidth .boxType3Class {
      position: absolute;
      left: 66.65%;
      margin-top: 0.3% !important;
    }
  }
  @media screen and (min-width: 6001px) {
    .main_globle {
      grid-template-columns: 1fr 13.2rem;
    }
    .rightSide {
      width: 12.85rem;
      grid-template-rows: 1fr 9rem;
    }
    .tabVideoCon ul li[data-v-6c573135] {
      width: 2.05rem;
      height: 2.05rem;
      line-height: 2.05rem;
    }
    .videoNametab li {
      height: 1rem;
      line-height: 1rem;
      padding-left: 1rem;
    }
    .tabListUl li.tabListLi{
      font-size: 0.54rem;
      padding-top: .2rem;
    }
    .tabInput {
      height: 1.2rem;
      font-size: .55rem;
      padding-left: .3rem;
    }
    .inputFa span {
      width: .6rem;
      height: .6rem;
      position: absolute;
      top: .25rem;
      right: .5rem;
    }
    .tabListUl li.tabListLi>div span {
      display: inline-block;
      width: 0.5rem;
      height: .5rem;
      margin-right: .8rem;
      margin-top: .1rem;
    }
    .tabListUl li.tabListLi>div p {
      padding-left: .7rem;
      background-size: .65rem;
    }
    .typeClass {
      padding-left: .8rem;
      background-size: .65rem;
    }
    .videoNametab {
      margin: .1rem 0 .1rem .95rem;
    }
    .videoNametab li:before {
      width: .8rem;
    }
    .tabListUl li.tabListLi:before {
      left: .85rem;
    }
    .tabListUl li.tabListLi>div span[data-v-6c573135]:before {
      width: 0.6rem;
      left: 0.6rem;
    }
    .planUse {
      width: .8rem;
      height: .8rem;
      background-size: .8rem;
      right: 1rem;
    }
    .planDelet {
      width: .8rem;
      height: .8rem;
      background-size: .8rem;
    }
    .tab_div .videoControlUl li {
      font-size: .54rem;
    }
    .tab_div .videoControlUl li:nth-of-type(1) {
      margin-bottom: 0.5rem;
    }
    .tab_div .videoControlUl li>div {
      height: 1.2rem;
    }
    .tab_div .tab_button{
      width: 2.75rem;
      line-height: 1rem;
      margin: .8rem 0 0 10rem;
      font-size: .54rem;
    }
    .leftSide .videoControl{
      height: 2rem;
    }
    .leftSide .videoControl li {
      width: 1.66rem;
      height: 1.66rem;
      line-height: 1.66rem;
    }
    .leftSide .videoControl .videoControl_left li:nth-of-type(2) {
      width: 1.8rem;
      margin-right: 0;
    }
    .leftSide .videoControl .videoControl_full{
      padding-left: .4rem;
      width: 3.84rem;
    }
    .leftSide .videoControl .videoControl_left {
      width: 7.1rem;
    }
    .leftSide .videoControl .videoControl_middle {
      width: 16rem;
    }
    .leftSide .videoControl .videoControl_left li {
      margin-right: 1.84rem;
    }
    .leftSide .videoControl .videoControl_middle li {
      margin-left: 1.9rem;
    }
    .leftSide .videoControl .videoControl_right {
      padding-left: 1.75rem;
    }
    .leftSide .videoControl .videoControl_right li {
      margin-right: 0.8rem;
    }
    .leftSide .videoControl .videoControl_action li[data-v-6c573135] {
      width: 3rem;
      line-height: 1.58rem;
      font-size: .54rem;
      color: #00beff;
    }
    .main_globle .leftSide .videoControl .videoControl_action li {
      margin-right: 1.17rem;
    }
    .ulWidth .boxType3Class {
      position: absolute;
      left: 66.7%;
      margin-top: 0.2% !important;
    }
    .tabVideoCon {
      margin-top: .55rem;
    }
    .tab_div .videoControlUl {
      margin-top: .55rem;
    }
  }
</style>
