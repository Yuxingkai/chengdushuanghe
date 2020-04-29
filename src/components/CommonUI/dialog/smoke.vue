<template>
  <pop
    :title="caption +'报警信息'"
    :level="param.level"
    :css="boxwidth"
    :css2="floorWidth"
    over-flow="false"> <!--css2="width:87%;"-->
    <ul id="pop_info">
      <!--左侧面板-->
      <li class="five_video">
        <div>
          <boxtitle title="基本信息"/>
          <box3 css="height:2.8rem;padding:.1rem 0;box-sizing: border-box;">
            <p class="common"><b>报警时间:</b>{{ basic.alarmTime }}</p>
            <p class="common"><b>事件类型:</b>{{ basic.eventType }}</p>
            <p class="common"><b>设备位置:</b>{{ basic.address }}</p>
            <p class="common"><b>处理时长:</b>{{ basic.processingTime }}</p>
          </box3>
        </div>
        <div v-if="show === 1">
          <boxtitle
            title="消防信息"
            style="margin-top:.15rem"/>
          <box3 css="height:4.82rem;padding:.1rem 0;box-sizing: border-box;">
            <ul class="imgList">
              <li
                v-for="(item, index) in imgInfo"
                :key="index">
                <img
                  :src="item"
                  alt="">
                  <!--<p class="imgDescribe" >{{ item.name }}</p>-->
              </li>
            </ul>
          </box3>
        </div>
        <div v-if="show === 2">
          <boxtitle
            title="消防信息"
            style="margin-top:.15rem"/>
          <box3 css="height:4.82rem;">
            <ul style="width:100%;height: 100%;padding: .1rem;box-sizing: border-box;">
              <!--:src="../../../assets/images/alarmFlow/somkeDevice.jpg"-->
              <img
                :src="imgInfo1"
                alt=""
                style="width:100%;height: 100%;display: block;">
              <p
                class="imgDescribe"
                style="width: 96.5%;text-align: center;position: absolute;bottom: 0;top: 92%;">微型消防站</p>
            </ul>
          </box3>
        </div>
        <div v-if="show === 3">
          <boxtitle
            title="消防栓信息"
            style="margin-top:.15rem"/>
          <box3 css="height:4.82rem;padding:.1rem 0;box-sizing: border-box;">
            <div class="fireMapPic">
              <img
                :src="imgInfo2"
                alt="">
            </div>
            <!--src="../../../assets/images/fireMapPic-hongxian.jpg"-->
            <!--src="../../../assets/images/fireMapPic-tianlin.jpg"-->
            <!--src="../../../assets/images/fire_hongbao.jpg"-->
          </box3>
        </div>
        <div>
          <box3 css="height:4.16rem;margin-top:.16rem;padding:.1rem;box-sizng:border-box;display:table;">
            <player
              :src="video_TV[2]"
              v-if="showVideo(2)"
              style="transform: scale(1);transform-origin: 0 0;" />
            <div
              class="video_text"
              v-else>没有相关视频</div>
          </box3>
        </div>
      </li>
      <!--中间面板-->
      <li class="five_video">
        <div class="flex">
          <box3 css="height:4.16rem;width:6.74rem;padding:.1rem;box-sizng:border-box;display:table;">
            <player
              :src="video_TV[0]"
              v-if="showVideo(0)"
              style="transform: scale(1);transform-origin: 0 0;" />
            <div
              class="video_text"
              v-else>没有相关视频</div>
          </box3>
          <box3 css="height:4.16rem;width:6.74rem;padding:.1rem;box-sizng:border-box;display:table;">
            <player
              :src="video_TV[1]"
              v-if="showVideo(1)"
              style="transform: scale(1);transform-origin: 0 0;" />
            <div
              class="video_text"
              v-else>没有相关视频</div>
          </box3>
        </div>
        <div style="margin:.16rem .06rem;">
          <box3 css="height:5.462rem;width:13.7rem;">
            <flow
              :alarmflow="alarmflow"
              :phase-num="show"/>
          </box3>
        </div>
        <div class="flex">
          <box3 css="height:4.16rem;width:6.74rem;padding:.1rem;box-sizng:border-box;display:table;">
            <player
              :src="video_TV[3]"
              v-if="showVideo(3)"
              style="transform: scale(1);transform-origin: 0 0;" />
            <div
              class="video_text"
              v-else>没有相关视频</div>
          </box3>
          <box3 css="height:4.16rem;width:6.74rem;padding:.1rem;box-sizng:border-box;display:table;">
            <player
              :src="video_TV[4]"
              v-if="showVideo(4)"
              style="transform: scale(1);transform-origin: 0 0;" />
            <div
              class="video_text"
              v-else>没有相关视频</div>
          </box3>
        </div>
      </li>
      <!--右侧面板-->
      <!--消防感知——图一-->
      <!--<li v-show="show === 1">-->
      <!--<div style="overflow: hidden">-->
      <!--<boxtitle title="住户信息"/>-->
      <!--<box3 css="height:3.84rem;padding:.1rem 0 ;box-sizing: border-box;">-->
      <!--<ul-->
      <!--class="peopleInfo"-->
      <!--:class="{ 'wipe' : wipe === true }"-->
      <!--id="scolllocate">-->
      <!--<loading :visible="isLoading1_1"/>-->
      <!--<happy-scroll-->
      <!--resize-->
      <!--size="1"-->
      <!--hide-horizontal-->
      <!--style="height:3.65rem;"-->
      <!--:scroll-top.sync="scrollTop">-->
      <!--<li-->
      <!--:class="[{active:house.show}]"-->
      <!--v-for="(house,index) in neighbors"-->
      <!--:key="house.id"-->
      <!--@click="switchRoomnum(index,house)">-->
      <!--<h3><b>{{ house.houseName }}</b><b v-show="house.peopleLists.length>0">共{{ house.peopleLists.length }}人</b><b>{{ house.current === 0 ? '同层' : '火警位置' }}</b></h3>-->
      <!--<ul v-show="house.show">-->
      <!--<li-->
      <!--v-for="item in house.peopleLists"-->
      <!--:key="item.id">-->
      <!--<p class="common resident">-->
      <!--<b>{{ item.name }}</b>-->
      <!--<b>{{ item.sex }}</b>-->
      <!--<b>{{ item.age }}</b>-->
      <!--<b>{{ item.phoneNo | phoneHide }}</b>-->
      <!--<b class="last-time">最后通行时间: <span>{{ item.lastOpenDoorTime | capitalize }}</span></b>-->
      <!--</p>-->
      <!--</li>-->
      <!--</ul>-->
      <!--</li>-->
      <!--</happy-scroll>-->
      <!--</ul>-->
      <!--</box3>-->
      <!--</div>-->
      <!--<div style="position: relative;">-->
      <!--<boxtitle-->
      <!--title="24小时该户通行记录"-->
      <!--style="margin-top:.2rem;"/>-->
      <!--<RadioTabs-->
      <!--@on-index-changed='getPeopleLongInfo'-->
      <!--items="居民,访客"-->
      <!--:show-type="groupTypeNum"-->
      <!--css="height:0.5rem;line-height:.4rem;padding:0 .1rem;position: absolute;right:0;top:0.54rem;background:#071225"/>-->
      <!--<box3 css="height:3.85rem;padding:.1rem 0;overflow: hidden;box-sizing:border-box;">-->
      <!--<loading :visible="isLoading1_2"/>-->
      <!--<div class="common passage">-->
      <!--<b>姓名</b>-->
      <!--<b>时间</b>-->
      <!--<b>开门方式</b>-->
      <!--<b>进/出</b>-->
      <!--<b>视频</b>-->
      <!--</div>-->
      <!--<happy-scroll-->
      <!--style="height:3.1rem;"-->
      <!--resize-->
      <!--size="3">-->
      <!--<div>-->
      <!--<p-->
      <!--v-for="passage in trafficRecordsLong"-->
      <!--:key="passage.id"-->
      <!--class="common passage">-->
      <!--<b>{{ passage.name }}</b>-->
      <!--<b :title="passage.time">{{ passage.currentTime }}</b>-->
      <!--<b :title="passage.type">{{ passage.type }}</b>-->
      <!--<b>{{ passage.inOut }}</b>-->
      <!--<b>-->
      <!--<span-->
      <!--style="top:.06rem"-->
      <!--:class="{ videoTvIcon: passage.inStreamSource !== '' && passage.outStreamSource !== '' ? true : false }"-->
      <!--@click="getDataSrc(passage.inStreamSource, passage.outStreamSource)"/>-->
      <!--</b>-->
      <!--</p>-->
      <!--<div-->
      <!--v-if="trafficRecordsLong.length === 0"-->
      <!--style="text-align: center;margin-top:.2rem">{{ warinInfo }}</div>-->
      <!--</div>-->
      <!--</happy-scroll>-->
      <!--</box3>-->
      <!--</div>-->
      <!--<div style="position: relative;">-->
      <!--<boxtitle-->
      <!--title="相关信息"-->
      <!--style="margin-top:.2rem;"/>-->
      <!--<keep-alive>-->
      <!--<RadioTabs-->
      <!--@on-index-changed='infoAlarmChoose'-->
      <!--items="微型消防人员,历史报警记录"-->
      <!--:show-type="groupTypeNum"-->
      <!--css="height:0.5rem;line-height:.4rem;padding:0 .1rem;position: absolute;right:0;top:0.54rem;background:#071225"/>-->
      <!--</keep-alive>-->
      <!--<box3-->
      <!--css="height:2.99rem;padding:.1rem 0;overflow: hidden;"-->
      <!--class="right_info">-->
      <!--&lt;!&ndash;<loading :visible="isLoading1_3"></loading>&ndash;&gt;-->
      <!--<div-->
      <!--:class="{ 'wipe' : wipe === true }"-->
      <!--style=""-->
      <!--v-show="infoAlarm === 0">-->
      <!--<div class="common residents">-->
      <!--<b>姓名</b>-->
      <!--<b>联系电话</b>-->
      <!--<b>通知情况</b>-->
      <!--</div>-->
      <!--<div>-->
      <!--<happy-scroll-->
      <!--style="height:2.2rem;"-->
      <!--resize-->
      <!--size="3">-->
      <!--<ul>-->
      <!--<p-->
      <!--v-for="item in alarmInfoPeople"-->
      <!--:key="item.id"-->
      <!--class="common residents">-->
      <!--<b>{{ item.name | nameHide }}</b><b>{{ item.phoneNum | phoneHide }}</b><b :title="item.message">{{ item.message }}</b>-->
      <!--</p>-->
      <!--</ul>-->
      <!--</happy-scroll>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div :class="{ 'wipe' : wipe === true }">-->
      <!--<happy-scroll-->
      <!--style="height:2.3rem;"-->
      <!--resize-->
      <!--size="3">-->
      <!--<ul-->
      <!--class="historyAlarm"-->
      <!--v-show="infoAlarm === 1">-->
      <!--<div class="common residents">-->
      <!--<b>报警时间</b>-->
      <!--<b>处置状态</b>-->
      <!--</div>-->
      <!--<happy-scroll-->
      <!--style="height:1.7rem;"-->
      <!--resize-->
      <!--size="3">-->
      <!--<ul>-->
      <!--<p-->
      <!--v-for="item in alarmList"-->
      <!--:key="item.id"-->
      <!--class="common residents">-->
      <!--<b>{{ item.alarmTime }}</b><b>{{ item.isDeal == '0' ? '未处理' : '已处理' }}</b>-->
      <!--</p>-->
      <!--</ul>-->
      <!--</happy-scroll>-->
      <!--&lt;!&ndash;<li v-for="(sigli, index) in alarmList" :key="index">&ndash;&gt;-->
      <!--&lt;!&ndash;<p><b>报警时间:</b><b>{{sigli.alarmTime}}</b></p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p><b>处置时间:</b><b>{{sigli.processedTime || '-'}}</b></p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p><b>报警结果:</b><b>{{sigli.processedResult || '-'}}</b></p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p><b>处置人:</b><b>{{sigli.processedUser || '-'}}</b></p>&ndash;&gt;-->
      <!--&lt;!&ndash;<p><b>处置状态:</b><b>{{sigli.isDeal == '0' ? '未处理' : '已处理'}}</b></p>&ndash;&gt;-->
      <!--&lt;!&ndash;</li>&ndash;&gt;-->
      <!--</ul>-->
      <!--</happy-scroll>-->
      <!--</div>-->
      <!--</box3>-->
      <!--</div>-->
      <!--</li>-->
      <!--&lt;!&ndash;消防感知——图二&ndash;&gt;-->
      <!--<li v-show="show === 2">-->
      <!--<div>-->
      <!--<boxtitle title="楼栋信息"/>-->
      <!--<box3 css="height:2.42rem;padding:.1rem 0;">-->
      <!--<loading :visible="isLoading3_1"/>-->
      <!--<ul-->
      <!--class="building"-->
      <!--@click="popupBuilding(byValue)">-->
      <!--<li><b>总住户</b><b>{{ buildings.houseTotal }}</b></li>-->
      <!--<li><b>总人数</b><b>{{ buildings.peopleTotal }}</b></li>-->
      <!--<li><b>老人</b><b>{{ buildings.agedTotal }}</b></li>-->
      <!--&lt;!&ndash;<li><b>关注</b><b>{{buildings.focusTotal}}</b></li>&ndash;&gt;-->
      <!--&lt;!&ndash;<li><b>关爱</b><b>{{buildings.careTotal}}</b></li>&ndash;&gt;-->
      <!--<li><b>儿童</b><b>{{ buildings.childTotal }}</b></li>-->
      <!--</ul>-->
      <!--&lt;!&ndash;<div class="totla_people">&ndash;&gt;-->
      <!--&lt;!&ndash;<span>当前滞留人数</span>&ndash;&gt;-->
      <!--&lt;!&ndash;<b>约</b>{{total_num}}&ndash;&gt;-->
      <!--&lt;!&ndash;<b>人</b>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</box3>-->
      <!--</div>-->
      <!--<div style="position: relative;">-->
      <!--<boxtitle-->
      <!--title="12小时该楼栋通行记录"-->
      <!--style="margin-top:.2rem;"/>-->
      <!--<RadioTabs-->
      <!--@on-index-changed='getPeopleShoreInfo'-->
      <!--items="居民,访客"-->
      <!--:show-type="groupTypeNum"-->
      <!--css="height:0.5rem;line-height:.4rem;padding:0 .1rem;position: absolute;right:0;top:0.54rem;background:#071225"/>-->
      <!--<box3 css="height:5.3rem;padding:.1rem 0;overflow: hidden;box-sizing:border-box;">-->
      <!--<loading :visible="isLoading2_2"/>-->
      <!--<div class="common passage">-->
      <!--<b>房号</b>-->
      <!--<b>时间</b>-->
      <!--<b>开门方式</b>-->
      <!--<b>进/出</b>-->
      <!--<b>视频</b>-->
      <!--</div>-->
      <!--<div :class="{ 'wipe' : wipe === true }">-->
      <!--<happy-scroll-->
      <!--style="height:4.5rem;"-->
      <!--resize-->
      <!--size="3"-->
      <!--hide-horizontal>-->
      <!--<div>-->
      <!--<p-->
      <!--v-for="passage in trafficRecordsShort"-->
      <!--:key="passage.id"-->
      <!--class="common passage">-->
      <!--<b>{{ passage.houseNo | numFiltrate }}</b>-->
      <!--<b :title="passage.time">{{ passage.currentTime }}</b>-->
      <!--<b :title="passage.type">{{ passage.type }}</b>-->
      <!--<b>{{ passage.inOut }}</b>-->
      <!--<b>-->
      <!--<span-->
      <!--style="top:.06rem"-->
      <!--:class="{ videoTvIcon: passage.inStreamSource !== '' && passage.outStreamSource !== '' ? true : false }"-->
      <!--@click="getDataSrc(passage.inStreamSource, passage.outStreamSource)"/>-->
      <!--</b>-->
      <!--</p>-->
      <!--<div-->
      <!--v-if="trafficRecordsShort.length === 0"-->
      <!--style="text-align: center;margin-top:.2rem">{{ warinInfo }}</div>-->
      <!--</div>-->
      <!--</happy-scroll>-->
      <!--</div>-->
      <!--</box3>-->
      <!--</div>-->
      <!--<div>-->
      <!--<boxtitle-->
      <!--title="楼组长和志愿者通知情况"-->
      <!--style="margin-top:.2rem;"/>-->
      <!--<box3-->
      <!--css="height:2.96rem;padding:.1rem 0;overflow: hidden;"-->
      <!--class="right_info">-->
      <!--&lt;!&ndash;<happy-scroll style="height:2.28rem;" resize size="3">&ndash;&gt;-->
      <!--&lt;!&ndash;<ul class="alarmInfoPeople">&ndash;&gt;-->
      <!--&lt;!&ndash;<li v-for="item in alarmInfoPeople" :key="item.id">&ndash;&gt;-->
      <!--&lt;!&ndash;<b>{{item.name}}</b><b>{{item.phoneNum}}</b><b>{{item.message}}</b><b>{{item.informWay}}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;</li>&ndash;&gt;-->
      <!--&lt;!&ndash;</ul>&ndash;&gt;-->
      <!--&lt;!&ndash;</happy-scroll>&ndash;&gt;-->
      <!--<div class="common residents">-->
      <!--<b>姓名</b>-->
      <!--<b>职位</b>-->
      <!--<b>联系电话</b>-->
      <!--<b>通知情况</b>-->
      <!--<b>通知方式</b>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div :class="{ 'wipe' : wipe === true }">&ndash;&gt;-->
      <!--&lt;!&ndash;<happy-scroll&ndash;&gt;-->
      <!--&lt;!&ndash;style="height:2.2rem;"&ndash;&gt;-->
      <!--&lt;!&ndash;resize&ndash;&gt;-->
      <!--&lt;!&ndash;size="3">&ndash;&gt;-->
      <!--&lt;!&ndash;<ul>&ndash;&gt;-->
      <!--&lt;!&ndash;<p&ndash;&gt;-->
      <!--&lt;!&ndash;v-for="item in alarmInfoPeople"&ndash;&gt;-->
      <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
      <!--&lt;!&ndash;class="common residents">&ndash;&gt;-->
      <!--&lt;!&ndash;<b>{{ maskPeopleName(item.name) }}</b><b>{{ item.position }}</b><b :title="maskPhoneNo(item.phoneNum)">{{ maskPhoneNo(item.phoneNum) }}</b><b :title="item.message">{{ item.message }}</b><b>{{ item.informWay }}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;</ul>&ndash;&gt;-->
      <!--&lt;!&ndash;</happy-scroll>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</box3>-->
      <!--&lt;!&ndash;<box3 css="height:2.48rem;padding:.1rem 0;" class="right_info">&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="peopletitle">{{microFire}}</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<happy-scroll style="height:1.2rem;" resize size="3">&ndash;&gt;-->
      <!--&lt;!&ndash;<ul class="alarmInfoPeople">&ndash;&gt;-->
      <!--&lt;!&ndash;<li v-for="item in alarmInfoPeople" :key="item.id">&ndash;&gt;-->
      <!--&lt;!&ndash;<b>{{item.name}}</b><b>{{item.phoneNum}}</b><b>{{item.message}}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;</li>&ndash;&gt;-->
      <!--&lt;!&ndash;</ul>&ndash;&gt;-->
      <!--&lt;!&ndash;</happy-scroll>&ndash;&gt;-->
      <!--&lt;!&ndash;</box3>&ndash;&gt;-->
      <!--</div>-->
      <!--</li>-->
      <!--&lt;!&ndash;消防感知——图三&ndash;&gt;-->
      <!--<li v-if="show === 3">-->
      <!--<div>-->
      <!--<boxtitle title="楼栋信息"/>-->
      <!--<box3 css="height:2.42rem;padding:.1rem 0;">-->
      <!--<loading :visible="isLoading3_1"/>-->
      <!--<ul-->
      <!--class="building"-->
      <!--@click="popupBuilding(byValue)">-->
      <!--<li><b>总住户</b><b>{{ buildings.houseTotal }}</b></li>-->
      <!--<li><b>总人数</b><b>{{ buildings.peopleTotal }}</b></li>-->
      <!--<li><b>老人</b><b>{{ buildings.agedTotal }}</b></li>-->
      <!--&lt;!&ndash;<li><b>关注</b><b>{{buildings.focusTotal}}</b></li>&ndash;&gt;-->
      <!--&lt;!&ndash;<li><b>关爱</b><b>{{buildings.careTotal}}</b></li>&ndash;&gt;-->
      <!--<li><b>儿童</b><b>{{ buildings.childTotal }}</b></li>-->
      <!--</ul>-->
      <!--&lt;!&ndash;<div class="totla_people">&ndash;&gt;-->
      <!--&lt;!&ndash;<span>当前滞留人数</span>&ndash;&gt;-->
      <!--&lt;!&ndash;<b>约</b>{{total_num}}&ndash;&gt;-->
      <!--&lt;!&ndash;<b>人</b>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</box3>-->
      <!--</div>-->
      <!--<div style="position: relative">-->
      <!--<boxtitle-->
      <!--title="居民预通知情况"-->
      <!--style="margin:.2rem 0 .06rem;"/>-->
      <!--<box3 css="height:5.3rem;padding:.1rem 0;box-sizing:border-box;overflow:hidden;">-->
      <!--<div class="common residents">-->
      <!--<b>房号</b>-->
      <!--<b>姓名</b>-->
      <!--<b>联系电话</b>-->
      <!--<b>通知情况</b>-->
      <!--<b>通知方式</b>-->
      <!--</div>-->
      <!--<div :class="{ 'wipe' : wipe === true }">-->
      <!--<happy-scroll-->
      <!--style="height:4.5rem;"-->
      <!--resize-->
      <!--size="3">-->
      <!--<ul>-->
      <!--<p-->
      <!--v-for="item in alarmInfoPeople"-->
      <!--:key="item.id"-->
      <!--class="common residents">-->
      <!--<b>{{ item.houseNo }}</b><b>{{ maskPeopleName(item.name) }}</b><b :title="maskPhoneNo(item.phoneNum)">{{ maskPhoneNo(item.phoneNum) }}</b><b>{{ item.message }}</b><b>{{ item.informWay }}</b>-->
      <!--</p>-->
      <!--</ul>-->
      <!--</happy-scroll>-->
      <!--</div>-->
      <!--</box3>-->
      <!--</div>-->
      <!--<div>-->
      <!--<boxtitle-->
      <!--title="相关单位通知情况"-->
      <!--style="margin-top:.2rem;"/>-->
      <!--<box3-->
      <!--css="height:2.914rem;padding:.1rem 0;overflow:hidden;"-->
      <!--class="right_info">-->
      <!--<loading :visible="isLoading2_2"/>-->
      <!--<div class="common school">-->
      <!--<b>单位</b>-->
      <!--<b>姓名</b>-->
      <!--<b>职务</b>-->
      <!--<b>联系电话</b>-->
      <!--<b>通知情况</b>-->
      <!--<b>通知方式</b>-->
      <!--</div>-->
      <!--&lt;!&ndash;<div :class="{ 'wipe' : wipe === true }">&ndash;&gt;-->
      <!--&lt;!&ndash;<happy-scroll&ndash;&gt;-->
      <!--&lt;!&ndash;resize&ndash;&gt;-->
      <!--&lt;!&ndash;size="3"&ndash;&gt;-->
      <!--&lt;!&ndash;hide-horizontal&ndash;&gt;-->
      <!--&lt;!&ndash;style="height:1.605rem;">&ndash;&gt;-->
      <!--&lt;!&ndash;<div>&ndash;&gt;-->
      <!--&lt;!&ndash;<p&ndash;&gt;-->
      <!--&lt;!&ndash;v-for="item in schoolInfo"&ndash;&gt;-->
      <!--&lt;!&ndash;:key="item.id"&ndash;&gt;-->
      <!--&lt;!&ndash;class="common school">&ndash;&gt;-->
      <!--&lt;!&ndash;<b>{{ item.schoolName }}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;<b :title="item.name | nameHide">{{ maskPeopleName(item.name) }}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;<b :title="item.position">{{ item.position }}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;<b :title="maskPhoneNo(item.phone)">{{ maskPhoneNo(item.phone) }}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;<b>{{ item.informCondition }}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;<b>{{ item.informWay }}</b>&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
      <!--&lt;!&ndash;<div&ndash;&gt;-->
      <!--&lt;!&ndash;v-if="schoolInfo.length === 0"&ndash;&gt;-->
      <!--&lt;!&ndash;style="text-align: center;margin-top:.2rem">{{ warinInfo }}</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</happy-scroll>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</box3>-->
      <!--</div>-->
      <!--</li>-->
    </ul>
    <div
      slot="footer"
      class="floor">
      <span><b>设备编码：</b><b>{{ floorInfo.code }}</b></span>
      <span><b>品牌型号：</b><b>{{ floorInfo.prducetBrand }}</b></span>
      <span class="ball">在线</span>
      <span class="ball">启动</span>
      <span>运行时间：<b>{{ floorInfo.days }}天{{ floorInfo.hours }}小时</b></span>
    </div>
    <div
      slot="equipment"
      class="equipment"
      style="top: 0.1rem;"
      v-if="isbutton">
      <i class="top-line"/>
      <span :class="{'active':isA, hov: isHover}">{{ infoprompt }}
        <ul class="reason">
          <happy-scroll
            resize
            size="3"
            hide-horizontal
            style="height:1.28rem">
            <li
              v-for="item in alarmReason"
              :key="item.index"
              @click="submit(item)">
              <span :value="item.type">{{ item.name }}</span>
            </li>
          </happy-scroll>
        </ul>
      </span>
      <i class="bottom-line"/>
      <b/>
    </div>
  </pop>
</template>

<script>
import pop from '../../home/public/popupContainer'
import boxtitle from '../../home/public/boxTitle'
import flow from './smokeFlow'
import {getNowFormatDate, getFlash} from '../../../Utils/Common'
import user from '../../../Utils/user'
import {apiNames} from '../../../config/config'
import {Post, PostCopy} from '../../../Utils/Http'

export default {
  // props: ['param', 'isLoading1', 'isLoading2', 'isLoading3', 'isLoading4'],
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
      scrollTop: 0,
      groupTypeNum: 2,
      show: 1,
      infoAlarm: 0,
      floorWidth: 'width:100%',
      alarmflow: '',
      // boxwidth: 'width:28.28rem;',
      boxwidth: 'width:20.68rem;', // 无锡
      caption: '',
      warinInfo: '',
      basic: {},
      residents: [],
      neighbors: [],
      peopleLists: [],
      trafficRecordsLong: [],
      trafficRecordsShort: [],
      buildings: {houseTotal: 0, peopleTotal: 0, agedTotal: 0, focusTotal: 0, careTotal: 0, childTotal: 0},
      imgInfo: [
      ],
      imgInfo1: [
      ],
      imgInfo2: [
      ],
      microFire: '微型消防人员',
      alarmInfoPeople: [
        {name: '王建在', phoneNum: '13367659087', message: '已同步告知', houseNo: 201, informWay: '电话', position: '楼组长'},
        {name: '徐可旸', phoneNum: '13993721148', message: '已同步告知', houseNo: 202, informWay: '短信', position: '志愿者'},
        {name: '邓德海', phoneNum: '13634246899', message: '已同步告知', houseNo: 301, informWay: '电话', position: '志愿者'},
        {name: '王霆', phoneNum: '13181768789', message: '已同步告知', houseNo: 302, informWay: '短信', position: '志愿者'},
        {name: '许双', phoneNum: '15976930248', message: '已同步告知', houseNo: 401, informWay: '电话', position: '志愿者'},
        {name: '韩仪超', phoneNum: '15900186864', message: '已同步告知', houseNo: 402, informWay: '电话', position: '志愿者'},
        {name: '何飞龙', phoneNum: '15753562129', message: '已同步告知', houseNo: 501, informWay: '短信', position: '志愿者'}
      ],
      schoolInfo: [
        {schoolName: '幼儿园', name: '金远成', position: '校长', phone: '13378665988', informCondition: '已通知', informWay: '短信'},
        {schoolName: '幼儿园', name: '叶浩勇', position: '教务处主任', phone: '15964327868', informCondition: '已通知', informWay: '电话'}
      ],
      small: 'small',
      medium: 'medium',
      choose: '',
      pic_choose: 1,
      video_TV: [],
      floorInfo: '',
      total_num: 45,
      byValue: {},
      isA: false,
      isHover: false,
      isbutton: false,
      infoprompt: '点击处置',
      alarmReason: [],
      alarmList: [],
      villageName: '',
      isLoading1_1: '',
      isLoading1_2: '',
      isLoading1_3: '',
      isLoading2_2: '',
      isLoading3_1: '',
      wipe: false,
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: ''
    }
  },
  computed: {
    getIsLoading: function () {
      return this.isLoading2 || this.isLoading3 || this.isLoading4 || this.isLoading5 || this.isLoading6 || this.isLoading7
    }
  },
  filters: {
    capitalize (value) {
      if (value) {
        return value
      } else {
        return '-'
      }
    },
    nameHide (value) {
      if (value) {
        return '**' + value.substr(value.length - 1, 1)
      } else {
        return '**飞'
      }
    },
    phoneHide (value) {
      if (value) return value.substring(0, 3) + '****' + value.substring(8, 11)
    },
    numFiltrate (value) {
      let num1 = Math.ceil(Math.random() * 5)
      let num2 = Math.ceil(Math.random() * 4)
      let numInfo = num1 + '0' + num2
      if (!value) {
        value = numInfo
      }
      return value
    }
  },
  components: {
    pop,
    boxtitle,
    flow
  },
  // mounted: function () {
  //   if (!this.type) {
  //     this.show1 = true
  //   } else if (this.type === '1') {
  //     this.show1 = true
  //   } else if (this.type === '2') {
  //     this.show2 = true
  //   }
  // },
  created () {
    this.alarmflow = this.param.e
    this.$bus.on('/event/alarmFlowNum', (e) => {
      this.show = e + 1
    })
    this.$bus.on('/event/fromSmokeFlow1', (e) => {
      console.log(e, '/event/fromSmokeFlow1')
      this.imgInfo = []
      this.imgInfo = e.split(',')
    })
    this.$bus.on('/event/fromSmokeFlow2', (e) => {
      this.imgInfo1 = []
      this.imgInfo1 = e
      console.log(this.imgInfo1)
    })
    this.$bus.on('/event/fromSmokeFlow3', (e) => {
      this.imgInfo2 = []
      this.imgInfo2 = e
      console.log(this.imgInfo2)
    })
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    if (navigator.userAgent.indexOf('Firefox') > -1) this.wipe = true
    this.caption = this.param.e.alarmTypeName
    this.byValue = this.param.e
    let vilId = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
    if (localStorage.getItem('fire_selfSave' + vilId)) {
      this.imgInfo = localStorage.getItem('fire_selfSave' + vilId).split(',')
    } else {
      this.imgInfo = []
    }
    if (localStorage.getItem('fire_otherSave' + vilId)) {
      this.imgInfo1 = localStorage.getItem('fire_otherSave' + vilId)
    } else {
      this.imgInfo1 = []
    }
    if (localStorage.getItem('fire_publicSave' + vilId)) {
      this.imgInfo2 = localStorage.getItem('fire_publicSave' + vilId)
    } else {
      this.imgInfo2 = []
    }
    this.villageName = JSON.parse(window.localStorage.getItem('currentVillageID')).villageName
    this.addInfo()
    this.$bus.on('/event/afterDealAlarm', (e) => {
      // 状态管理
      this.addInfo()
      this.infoprompt = '已处置'
      this.floorWidth = 'width:88.3%'
      this.isA = true
      this.phase = 1
      for (let i = 0; i < this.alarmList.length; i++) {
        if (this.alarmList[i].alarmID === e) {
          this.param.e.isDeal = this.alarmList[i].isDeal = 1
          this.alarmList[i].alarmState = '确认'
        }
      }
    })
    this.$bus.on('/event/upDataAlarmFlowNum', (e) => {
      this.show = e + 1
    })
    let _that = this
    getFlash(_that)
  },
  methods: {
    addInfo () {
      this.basicInfo()
      // 返回周边住户
      this.getCricumInfo()
      this.getVideoUrl()
      this.getDeviceInfo()
      this.getAlarmList()
      this.getalarmReason()
      this.getPeopleLongInfo()
      this.getHouseInfo()
      this.getPeopleShoreInfo()
    },

    /**
     * 第一阶段——自防自救
     */
    basicInfo () {
      /**
       * 基本信息——左上角版面信息
       */
      if (this.param.e) {
        this.basic.houseNum = this.param.e.buildingNo + '号' + this.param.e.houseNo
        this.basic.alarmTime = this.param.e.alarmTime
        if (this.basic.alarmTime) {
          let alarmtime = this.basic.alarmTime
          this.basic.processingTime = this.showtime(alarmtime)
        }
        this.basic.eventType = this.param.e.alarmTypeName
        this.basic.address = this.param.e.address
      }
    },
    getCricumInfo () {
      /**
       * 周边住户信息——第一阶段右上角版面信息
       */
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.buildingID = this.param.e.buildingID
      let floorNum = this.param.e.floor
      reqParam.floorNos = [floorNum]
      that.isLoading1_1 = true
      console.log(JSON.stringify(reqParam) + '周边住户信息')
      Post({
        async: true,
        url: apiNames['获取楼栋住户信息'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading1_1 = false
          let peopleList = data.peopleList
          if (peopleList) {
            for (let i = 0; i < peopleList.length; i++) {
              if (peopleList[i].age) {
                peopleList[i].age = peopleList[i].age + '岁'
              }
            }
            let viewHousePeople = []
            let b = Array.from(new Set(that.param.e.houseNo.split('"'))).toString()
            let houseNos = Array.from(new Set(peopleList.map(x => x.houseNo)))
            for (let i = 0; i < houseNos.length; i++) {
              if (houseNos[i] === b) {
                houseNos.splice(i, 1)
                break
              }
            }
            houseNos.unshift(b)
            for (let i = 0; i < houseNos.length; i++) {
              let houseNo = houseNos[i]
              let housePeopleList = peopleList.filter(x => x.houseNo === houseNo)
              viewHousePeople.push({
                houseName: houseNo + '室',
                peopleLists: housePeopleList,
                current: 0,
                show: false
              })
            }
            if (viewHousePeople[0].peopleLists) {
              if (viewHousePeople[0].peopleLists.length > 0 && viewHousePeople.length <= 1) viewHousePeople[0].show = true
              viewHousePeople[0].current = 1
            }
            that.neighbors = viewHousePeople
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取楼栋住户信息')
        }
      })
    },
    getVideoUrl () {
      /**
       * 获取视频链接——五个视频链接
       */
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.param.e.alarmID
      reqParam.deviceID = this.param.e.deviceID
      Post({
        async: true,
        url: apiNames['获取关联设备'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading6 = false
          for (let i = 0; i < data.relateDevices.length; i++) {
            data.relateDevices[i].picUrl = that.getstrema(data.relateDevices[i].deviceID)
          }
          that.video_TV = data.relateDevices.map(x => x.picUrl)
          console.log(that.video_TV + ' ，，五个视频')
          // that.video_TV[1] = 'rtmp://31.0.167.62:11985/live/camera_35'
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取关联设备')
        }
      })
    },
    getstrema (e) {
      let reqParam = user.getRequestHeader()
      reqParam.ID = e
      let url
      PostCopy({
        async: false,
        url: this.videoUrl,
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          if (data.Code === 0) {
            url = this.playUrl + data.Data.RTMP
            console.log(url)
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-accessDevice 视频url')
        }
      })
      return url
    },
    getDeviceInfo () {
      /**
       * 获取设备信息——底部设备信息
       */
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      Post({
        async: true,
        url: apiNames['获取设备信息'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading7 = false
          if (data.deviceInfo) {
            let time1 = data.deviceInfo.installTime
            // 得到毫秒数
            let time2 = (new Date(time1)).getTime()
            // 获取当前毫秒数
            let dateTime = (new Date()).getTime()
            let time3 = dateTime - time2
            let days = Math.floor(time3 / (1000 * 60 * 60 * 24))
            let hours = Math.floor((time3 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            that.floorInfo = data.deviceInfo
            that.floorInfo.isDisable = data.deviceInfo.isDisable
            that.floorInfo.days = days
            that.floorInfo.hours = hours
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取设备信息')
        }
      })
    },
    getAlarmList () {
      /**
       * 获取报警列表——底部判断
       * */
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.deviceID = this.param.e.deviceID
      let ConfigVillageIDs = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
      reqParam.villageIDs = ConfigVillageIDs
      Post({
        async: true,
        url: apiNames['获取报警列表'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading8 = false
          if (data.alarms) {
            for (let i = 0; i < data.alarms.length; i++) {
              if (data.alarms[i].alarmID === that.param.e.alarmID) {
                if (data.alarms[i].isDeal === 1) {
                  that.infoprompt = '已处置'
                  that.floorWidth = 'width:88.3%'
                  that.isA = true
                  that.isHover = false
                } else {
                  that.infoprompt = '点击处置'
                  that.floorWidth = 'width:87.2%'
                  that.isA = false
                  that.isHover = true
                }
              }
            }
            that.isbutton = true
            that.alarmList = data.alarms
            // console.log(that.alarmList, 'popopopo')
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取报警列表')
        }
      })
    },
    getalarmReason () {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmType = this.param.e.alarmType
      Post({
        async: true,
        url: apiNames['获取报警原因'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          if (data.alarmReasons) {
            that.alarmReason = data.alarmReasons
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取报警原因')
        }
      })
    },
    getPeopleLongInfo (msgLong) {
      /**
       * 第一阶段-24小时通行记录——右中间版面信息列表
       */
      console.log(msgLong, '24小时')
      let that = this
      this.isLoading4 = true
      let num = 0
      if (!msgLong) {
        num = 0
      } else {
        num = msgLong[1]
      }
      let peopletype = ['resident', 'visitor']
      let reqParam = user.getRequestHeader()
      reqParam.buildingID = this.param.e.buildingID
      reqParam.startTime = getNowFormatDate(24)
      reqParam.endTime = getNowFormatDate(0)
      reqParam.pageNum = 1
      reqParam.pageSize = 10000
      reqParam.peopleType = peopletype[num]
      that.isLoading1_2 = true
      // 获取门禁通行记录
      Post({
        async: true,
        url: apiNames['获取门禁通行记录'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading1_2 = false
          if (data.accessLogs.length > 0) {
            for (let i = 0; i < data.accessLogs.length; i++) {
              let s = data.accessLogs[i].time
              data.accessLogs[i].currentTime = s.substring(s.indexOf(' ') + 1, s.length)
              data.accessLogs[i].name = that.lastNameHide(data.accessLogs[i].name)
            }
            that.trafficRecordsLong = data.accessLogs
          } else {
            that.trafficRecordsLong = []
            that.warinInfo = '暂无通行记录'
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取门禁通行记录')
        }
      })
    },
    /**
     * 第二阶段——互帮互救
     */
    getHouseInfo () {
      /**
       * 楼栋信息——第二、三阶段右上角版面信息
       */
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.buildingID = this.param.e.buildingID
      that.isLoading3_1 = true
      Post({
        async: true,
        url: apiNames['获取楼栋住户统计'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading3_1 = false
          if (data.peopleInfo) {
            that.buildings = data.peopleInfo
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取楼栋住户统计')
        }
      })
    },
    getPeopleShoreInfo (msgShore) {
      console.log(msgShore, '12小时')
      /**
       * 第二阶段-12小时通行记录——右中角版面信息列表
       */
      let that = this
      this.isLoading4 = true
      let num = 0
      if (!msgShore) {
        num = 0
      } else {
        num = msgShore[1]
      }
      let peopletype = ['resident', 'visitor']
      let reqParam = user.getRequestHeader()
      reqParam.buildingID = this.param.e.buildingID
      reqParam.startTime = getNowFormatDate(12)
      reqParam.endTime = getNowFormatDate(0)
      reqParam.pageNum = 1
      reqParam.pageSize = 10000
      reqParam.peopleType = peopletype[num]
      that.isLoading2_2 = true
      // 获取门禁通行记录
      Post({
        async: true,
        url: apiNames['获取门禁通行记录'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          that.isLoading2_2 = false
          if (data.accessLogs) {
            for (let i = 0; i < data.accessLogs.length; i++) {
              let s = data.accessLogs[i].time
              data.accessLogs[i].currentTime = s.substring(s.indexOf(' ') + 1, s.length)
            }
            that.trafficRecordsShort = data.accessLogs
          } else {
            that.trafficRecordsShort = []
            that.warinInfo = '暂无通行记录'
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-smoke 获取门禁通行记录')
        }
      })
    },
    /**
     * 第三阶段——公助公救
     */

    /**
     * 方法
     */
    submit (item) {
      let that = this
      let reqParam = user.getRequestHeader()
      reqParam.alarmID = this.param.e.alarmID
      reqParam.reasonType = item.type
      reqParam.remark = ''
      reqParam.status = 1
      Post({
        async: true,
        url: apiNames['报警处理'],
        data: reqParam,
        dataType: 'json',
        success: function (data) {
          console.log('事件已处理' + JSON.stringify(reqParam) + JSON.stringify(data))
          that.$bus.emit('/event/afterDealAlarm', reqParam.alarmID)
          that.$bus.emit('/event/somkeAlarmFlow', reqParam.alarmID)
          that.isHover = false
          that.message = item.name
          that.isdeal = 1
        },
        error: function (err) {
          console.log(JSON.stringify(err) + 'popup-alarm 报警处理')
        }
      })
    },
    showtime (alarmtime) {
      let endtime = new Date()
      let nowtime = new Date(alarmtime) // 设置结束时间
      let lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000)
      let d = Math.floor(lefttime / (60 * 60 * 24))
      let h = Math.floor(lefttime / (60 * 60) % 24)
      let m = Math.floor(lefttime / 60 % 60)
      // var s = Math.floor(lefttime % 60)
      // setTimeout(showtime, 1000)
      return d + '天' + h + '小时' + m + '分' // + s + '秒'
    },
    switchRoomnum (index, item) {
      this.neighbors.forEach(i => {
        if (i.show !== this.neighbors[index].show) {
          i.show = false
        }
      })
      item.show = !item.show
    },
    infoAlarmChoose (msgChoose) {
      let num = msgChoose[1]
      this.infoAlarm = num
    },
    showVideo (index) {
      if (this.video_TV[index]) {
        return true
      } else {
        return false
      }
    },
    // 该姓名脱敏
    lastNameHide (value) {
      if (value) {
        return '**' + value.substr(value.length - 1, 1)
      } else {
        let string = '飞,菲,宁,凝,珊,峰,超,建' // 原始数据
        let array = string.split(',') // 转化为数组
        let name = array[Math.round(Math.random() * (array.length - 1))] // 随机抽取一个值
        // console.log(name)
        return '**' + name
      }
    },
    /* popup */
    popupBuilding (byValue) {
      window.pop.show({
        level: 3,
        component: () => import('./houseInfo'),
        param: {
          level: 3,
          e: byValue
        }
      })
    },
    popupEquipment () {
      window.pop.show({
        level: 2,
        component: () => import('./equipmentImg'),
        param: {
          level: 2
        }
      })
    },
    getDataSrc (src1, src2) {
      let src = ''
      if (src1 === '' && src2 === '') {
        console.log('小视频为空')
      } else {
        if (src1 === '') {
          src = src2
        } else {
          src = src1
        }
        window.pop.show({
          level: 3,
          component: () => import('./videoPlay'),
          param: {
            arr: [src1, src2],
            level: 3,
            e: src
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  b {font-weight: normal; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; }
  i {font-style: normal }
  #pop_info {display: grid; grid-template-columns: 6.1rem 1fr 7.3rem; padding: .2rem .2rem .1rem; box-sizing: border-box; }
  #pop_info > li:nth-of-type(1) {height: 100%; float: left; grid-column: 1; box-sizing: border-box; }
  #pop_info > li:nth-of-type(2) {color: #fff; grid-column: 2; padding: 0 .2rem; box-sizing: border-box; position: relative; }
  #pop_info > li:nth-of-type(3) {color: #fff; grid-column: 3; }
  .common {color: #a4edfc; padding: .13rem .14rem; box-sizing: border-box; white-space: nowrap; font-size: 0.32rem;}
  .common > b {margin-right: 0.1rem; }
  .resident {color: #fff; padding: .02rem 0.14rem .02rem .44rem;}
  .resident b {margin-right: 0.21rem; font-weight: bold; }
  .resident b:first-child {width: 1.1rem; display: inline-block; }
  .resident b:nth-of-type(2) {width: 0.8rem; display: inline-block; text-align: center; }
  .resident b:nth-of-type(3) {width: 1rem; display: inline-block; text-align: right; }
  .resident b:nth-of-type(4) {display: inline-block; text-align: right; margin-left: .5rem;}
  .resident b:last-child {font-weight: normal; }
  .resident b:last-child span{display: inline-block; padding-left: .1rem; }
  .imgList{display: block; }
  .imgList>li{display: inline-block; width: 33.33%; text-align: center; margin-bottom:0; }
  .imgList>li>img{width: 2rem; height: 2.3rem; vertical-align: middle;}
  .imgDescribe{display: inline-block; background: #a4edfc; width: 1.6rem; color: #000000; font-weight: bold;position: relative;top:-.11rem;font-size: .28rem;}
  .last-time {display: block;font-size: .24rem;}
  .fireMapPic{height: 100%}
  .fireMapPic>img{width: 100%;height: 100%}
  .margin_left {margin-left: 0.16rem; }
  .item_title {color: #000; margin: 0.1rem 0.14rem; padding: 0.08rem 0.18rem; background-color: #a4edfc; display: inline-block; font-weight: bold;font-size: 0.32rem;}
  .flex {display: flex; justify-content: space-between; }
  .flex > div {margin: 0 0.06rem; }
  .right_info b {margin-right: 0.4rem; }
  .peopletitle{background: #f5b945; color: #000; font-weight: bold; padding: .1rem 0 .1rem .26rem; margin: .1rem .16rem;font-size: 0.32rem;}
  p.passage {color: #fff; }
  p.passage:nth-child(2n + 1) {background: #a4edfc45; }
  .passage {display: flex; justify-content: space-between; padding-left: 0.04rem; padding-right: 0.2rem; width:auto; margin-left: 0.16rem; }
  .passage > b {flex: 2; text-align: center; }
  .passage > b:nth-of-type(1) {flex: 4; }
  .passage > b:nth-of-type(2) {flex: 5.1; }
  .passage > b:nth-of-type(3) {flex: 4; }
  .passage > b:nth-of-type(4) {flex: 2; }
  .passage > b:nth-of-type(5) {flex: 2; }
  .duty{display: flex;display: -webkit-flex;justify-content: space-between;margin: 0 .3rem;}
  .duty>b{display: inline-block; width: 1.2rem; }
  /*右侧第一阶段*/
  .historyAlarm > li{background:#a4edfc3d; margin:0 .15rem .1rem .1rem; padding-left:.22rem }
  .historyAlarm > li > p{padding-top:.01rem; }
  .historyAlarm > li > p:last-child{padding-bottom: .06rem; }
  .historyAlarm > li > p{padding-bottom: .06rem; }
  .historyAlarm > li > p > b:first-child{display: inline-block;min-width: 1.2rem;}
  .historyAlarm > li > p > b:last-child{display: inline-block;min-width: 1.2rem;}
  /*右侧第一阶段*/
  .peopleInfo{margin:0 .1rem;}
  .peopleInfo h3{font-size:.32rem;line-height: .58rem;background: #a4edfc33;padding:0 1rem 0 .5rem;margin-bottom: .1rem;display: flex;display:-webkit-flex;justify-content: space-between;position: relative;cursor: pointer}
  .peopleInfo h3>b{flex: 1}
  .peopleInfo h3>b:nth-of-type(2){text-align: center}
  .peopleInfo h3>b:nth-of-type(3){text-align: right}
  .peopleInfo h3:after {border: solid transparent; content: ''; left: 4.2%; top: .18rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-left-color: #31f1fe; }
  .peopleInfo .active h3:after{border: solid transparent; content: ''; left: 4.2%; top: .2rem; position: absolute; width: 0; height: 0; border-width: .09rem; border-top-color: #31f1fe; }
  .alarmInfoPeople>li{padding: .02rem 0 0 .5rem;font-size: 0.32rem}
  .alarmInfoPeople>li>b{line-height: .49rem}
  .alarmInfoPeople>li>b:nth-of-type(1){width: 1rem;display: inline;}
  .alarmInfoPeople>li>b:nth-of-type(3){color: #05ffa8;}
  /*右边第二层样式*/
  .building {padding: 0 0 0.2rem 0.5rem; box-sizing: border-box;color: #a4edfc;font-size: 0.32rem;height: 100%}
  .building > li {width: 45%; float: left; display: flex; justify-content: space-between; padding: .16rem .5rem 0 0; box-sizing: border-box; margin: .2rem 0;font-size: .32rem;color: #fff;}
  .building > li:nth-of-type(odd){margin-right: 6%}
  .building > li > b {position: relative; }
  .building > li > b:first-child::before {content: ""; position: absolute; left: -0.14rem; top: 20%; background: #ffff00; width: 3px; height: .3rem; z-index: 1}
  .building > li > b:first-child {width: 0.9rem; display: inline-block; text-align: justify; text-align-last: justify; white-space: nowrap; overflow: visible; }
  .building > li > b:last-child {text-align: right; }
  .totla_people {color: #ff0000; font-weight: bold; background: #a4edfc; float: left; width: 88%; margin: .24rem .36rem 0; padding: 0.04rem 0 0.12rem; text-align: center; border-radius: 0.02rem;font-size: 0.48rem;}
  .totla_people span {padding-right: 0.4rem; color: #000;font-size: 0.32rem;}
  .totla_people > b {color: #000; font-weight: bold; padding: 0 0.1rem;font-size: 0.32rem;}
  .video_text {vertical-align: middle; text-align: center; display: table-cell; }
  /*右边第三层样式*/
  .voice-answer{display: flex; display: -webkit-flex; padding: 0 .5rem .2rem; box-sizing: border-box; }
  .voice-answer>b{flex: 1; margin-right: .1rem; }
  .voice-answer>b:nth-of-type(3){margin-left: .4rem; }
  .voice-case{padding: 0 .3rem; }
  .voice-case>li{display: inline-block; width: 40.8%; padding: .1rem .15rem; margin: .02rem .15rem; box-sizing: border-box;font-size: .26rem;}
  .voice-case>li:nth-child(4n+1){background: #a4edfc47; }
  .voice-case>li:nth-child(4n+2){background: #a4edfc47; }
  .voice-case>li>b:last-child{margin-left: .7rem; }
  .voice-case>li:nth-child(2n){margin-left: 6%; }
  p.school {color: #fff; }
  p.school:nth-child(2n + 1) {background: #a4edfc45; }
  .school {display: flex; justify-content: space-between; padding-left: 0.04rem; padding-right: 0.2rem; width:auto; margin-left: 0.16rem; }
  .school > b {flex: 2; text-align: center;margin: 0; }
  .school > b:nth-of-type(1) {flex: 2.2; }
  .school > b:nth-of-type(2) {flex: 2; }
  .school > b:nth-of-type(3) {flex: 2.2; }
  .school > b:nth-of-type(4) {flex: 2.5; }
  .school > b:nth-of-type(5) {flex: 2.5; }
  .school > b:nth-of-type(6) {flex: 2.5; }
  p.residents {color: #fff; }
  p.residents:nth-child(2n + 1) {background: #a4edfc45; }
  .residents {display: flex; justify-content: space-between; padding-left: 0.04rem; padding-right: 0.2rem; width:auto; margin-left: 0.16rem; }
  .residents > b {flex: 2; text-align: center;margin: 0; }
  .residents > b:nth-of-type(1) {flex: 2.5; }
  .residents > b:nth-of-type(2) {flex: 2.5; }
  .residents > b:nth-of-type(3) {flex: 3; }
  .residents > b:nth-of-type(4) {flex: 3; }
  .residents > b:nth-of-type(5) {flex: 3; }
  /*底部*/
  .foot {position: absolute; right: 0; top: 0; }
  .floor span {display: flex; float: left; }
  .floor > span:nth-of-type(1) > b:last-child {min-width: 2.1rem; display: inline-block; }
  .floor > span:nth-of-type(2) > b:last-child {min-width: .8rem; display: inline-block; }
  .top-line {position: absolute; top: -.04rem; left: 12%; background: #c9d2e1; width: 56%; height: 1px; z-index: 1; }
  .top-line:before {content: ''; width: .054rem; height: .02rem; position: absolute; top: 0; left: -7%; background: #b5e1ea; }
  .top-line:after {content: ''; width: .054rem; height: .02rem; position: absolute; top: 0; right: -7%; background: #b5e1ea; }
  .bottom-line {position: absolute; bottom: -.04rem; left: 12%; background: #c9d2e1; width: 56%; height: 1px; z-index: 1; }
  .bottom-line:before {content: ''; width: .054rem; height: .02rem; position: absolute; top: 0; left: -7%; background: #b5e1ea; }
  .bottom-line:after {content: ''; width: .054rem; height: .02rem; position: absolute; top: 0; right: -7%; background: #b5e1ea; }
  .equipment>span {border: 1px solid #2c88ffc7; box-sizing: border-box; color: #a4edfc; padding: .08rem 1.556rem .08rem .5rem; position: relative; right: 0;font-size: .3rem;}
  .equipment>span::after {content: ''; background: #2c88ff; position: absolute; top: .24rem; right: 1.11rem; width: .1rem; height: .1rem; }
  .equipment>span::before {content: ''; background: #c9d2e154; position: absolute; top: .14rem; right: 1rem; width: .322rem; height: .294rem; }
  /*底部hover*/
  .reason{display: none;text-align: center; position: absolute; width: 3.25rem; top: .58rem; right: 0; z-index: 1; background: #101215c7; }
  .hov:hover .reason{display: block}
  ul.reason li{font-size: .32rem;width:2.3rem;color: #befefe; background: #102044; margin-top: .06rem;text-align: center; line-height: .55rem; border-left: 1px solid #3cc3ff; border-right: 1px solid #3cc3ff; box-sizing: border-box; }
  ul.reason li span{position: relative;margin: 0;}
  ul.reason li:hover{background: #254a9f; }
</style>
