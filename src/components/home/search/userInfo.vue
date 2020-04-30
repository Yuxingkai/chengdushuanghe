<template>
  <div
    class="userInfo"
    style="padding-top: 5px;height: 100%;">
    <div v-if="type === '/home/search/face'">
      <Title
        title="用户基本信息"
        css="width:100%;"
        style="color:white;"/>
      <ul class="textCon ulstyle">
        <div class="listTitle">
          <span>姓名</span>
          <span>性别</span>
          <span>年龄</span>
          <span>民族</span>
          <span>手机号码</span>
          <span>证件号码</span>
          <span>标签</span>
          <span>登记日期</span>
          <span>最后通行时间</span>
          <span>用户详情</span>
        </div>
        <div
          style="height: 100%;"
          v-if="results.length > 0 ? true : false"
          id="faceContent">
          <div
            :class="{'meng': index%2 != 1,'baccolor': index%2 != 1,'clickbaccolor':nowindex == index}"
            class="listInner"
            v-for="(item,index) in results"
            :key="index"
            @click="focus1(index, item)">
            <span>{{ item.peoplename || '-' }}</span>
            <span>{{ item.gender || '-' }}</span>
            <span>{{ computAge(item.birthdate) || '-' }}</span>
            <span>{{ item.nation || '-' }}</span>
            <span>{{ item.phoneno || '-' }}</span>
            <span>{{ item.credentialno || '-' }}</span>
            <span
              :title="changeLabel(item.peoplelabel)"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ changeLabel(item.peoplelabel) || '-' }}</span>
            <span>{{ formatDates(item.peopleinserttime) || '-' }}</span>
            <span>{{ formatDates(item.lastopendoortime) || '-' }}</span>
            <span>
              <button
                class="hoverbac btnClass"
                @click="detailsInfo({headpic:item.headpic,peoplename:item.peoplename,gender:item.gender,nation:item.nation,political:item.political,maritialstatus:item.maritialstatus,education:item.education,domiclleaddress:item.domiclleaddress,credentialno:item.credentialno,birthdate:item.birthdate,phoneno:item.phoneno,peoplelabel:changeLabel(item.peoplelabel),alladdress:changeVillageName(item.villageid)+item.buildingno+'号'+item.houseno,villagename:changeVillageName(item.villageid)})">详情</button>
            </span>
          </div>
        </div>
        <div
          v-else
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </ul>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport"
          class="btnclass"><i
            style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
            class="iconCheckout"/>导出</button>
      </div>
    </div>
    <div v-if="type === '/home/search/car'">
      <Title
        title="车辆查询"
        css="width:100%;"
        style="color:white;"/>
      <!--<div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">-->
      <!--<button @click.stop="exportExcel('car')" class="btnclass"><i style="font-size: .44rem;vertical-align: middle;margin-right: .2rem" class="iconCheckout"></i>导出</button>-->
      <!--</div>-->
      <ul class="textCon ulstyle">
        <div class="listTitle2">
          <span>车牌号</span>
          <span>车辆类型</span>
          <span>车辆所有人</span>
          <span>手机号码</span>
          <span>车场名称</span>
          <span>小区名称</span>
          <!--<span>通行记录</span>-->
        </div>
        <div
          style="height: 100%;"
          v-if="results.length > 0 ? true : false"
          id="carContent">
          <div
            class="listInner2"
            :class="{'meng': index%2 != 1,'baccolor': index%2 != 1,'clickbaccolor':nowindex == index}"
            v-for="(item,index) in results"
            :key="index"
            @click="focus2(index, item)">
            <span>{{ item.plateno || '-' }}</span>
            <span>{{ changeName(item.cartype) || '-' }}</span>
            <span>{{ item.peoplename || '-' }}</span>
            <span>{{ item.phoneno || '-' }}</span>
            <span>{{ item.name || '-' }}</span>
            <span>{{ changeVillageName(item.villageid) || '-' }}</span>
            <!--<span><button class="btnClass" @click="lookRecord">查看详情</button></span>-->
          </div>
        </div>
        <div
          v-else
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </ul>
    </div>
    <div v-if="type === '/home/search/pass'">
      <div
        class="title">
        <div>门禁通行</div>
      </div>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport('pass')"
          class="btnclass"><i
            style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
            class="iconCheckout"/>导出</button>
      </div>
      <ul class="textCon ulstyle">
        <div class="listTitle31">
          <span>开门方式</span>
          <span>姓名</span>
          <span>性别</span>
          <span>手机号码</span>
          <span>标签</span>
          <span>所属小区</span>
          <span>通行楼栋</span>
          <span style="position: relative">
            通行时间
            <div
              @click="passOrder"
              style="position: absolute;right: .8rem;top: .15rem;cursor: pointer">
              <div
                :class="passOrderClass ? 'unselClass': ''"
                class="el-icon-caret-top"
                style="width: .16rem;height: .16rem;display: block"/>
              <div
                :class="passOrderClass ? '': 'unselClass'"
                class="el-icon-caret-bottom"
                style="width: .16rem;height: .16rem;display: block"/>
            </div>
          </span>
          <!--<span>通行视频</span>-->
        </div>
        <div
          style="height: 100%;"
          v-if="results.length > 0 ? true : false"
          id="passContent">
          <div
            class="listInner31"
            :class="{'meng': index%2 != 1,'baccolor': index%2 != 1,'clickbaccolor':nowindex == index}"
            v-for="(item,index) in results"
            :key="index"
            @dblclick = "focusdbl3(index, item)"
            @click="focus3(index, item)">
            <span
              style="cursor: pointer"
              :title="changeOpenType(item.opentype)"><img
                style="margin-top: .1rem;width: .6rem;height: .6rem;border-radius: .3rem"
                :src="item.opentype === '100802' ? item.faceUrl : item.openTypeImg"
                alt=""></span>
            <!--<span>{{ changeOpenType(item.opentype) || '-' }}</span>-->
            <span>{{ item.peoplename || '-' }}</span>
            <span>{{ item.gender || '-' }}</span>
            <span>{{ item.phoneno || '-' }}</span>
            <span
              :title="changeLabel(item.peoplelabel)"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ changeLabel(item.peoplelabel) || '-' }}</span>
            <span>{{ changeVillageName(item.villageid) || '-' }}</span>
            <span>{{ item.buildingno || '-' }}</span>
            <span>{{ formatDates(item.opentime) || '-' }}</span>
            <!--<div>-->
            <!--&lt;!&ndash;v-if="item.hasOwnProperty(smallvideourl)"&ndash;&gt;-->
            <!--<div-->
            <!--:class="item.instreamsource === '' && item.outstreamsource === '' ? 'canthover' : 'hoverbac'"-->
            <!--@click="getstremsm(item.opentime, item.inCameraDeviceID, item.outCameraDeviceID)"-->
            <!--style="border:1px solid #31f1fe;width: 20px;height: 20px;position:relative;margin:0.1rem auto;">-->
            <!--<div class="rightTri"/>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <div
          v-else
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </ul>
    </div>
    <div v-if="type === '/home/search/alarm'">
      <div
        class="title">
        <div>事件报警</div>
      </div>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport('alarm')"
          class="btnclass"><i
            style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
            class="iconCheckout"/>导出</button>
      </div>
      <ul class="textCon ulstyle">
        <div class="listTitle4">
          <span>所属小区</span>
          <span>报警类型</span>
          <span style="position: relative">
            报警时间
            <div
              @click="alarmOrder"
              style="position: absolute;right: 1.5rem;top: .15rem;cursor: pointer">
              <div
                :class="passOrderClass ? 'unselClass': ''"
                class="el-icon-caret-top"
                style="width: .16rem;height: .16rem;display: block"/>
              <div
                :class="passOrderClass ? '': 'unselClass'"
                class="el-icon-caret-bottom"
                style="width: .16rem;height: .16rem;display: block"/>
            </div>
          </span>
          <span>报警等级</span>
          <span>处理状态</span>
          <span>报警地址</span>
          <span>报警内容</span>
          <!--<span>报警次数</span>-->
        </div>
        <div
          style="height: 100%;position: relative;color: white;"
          v-if="results.length > 0 ? true : false"
          id="alarmContent">
          <div
            :class="{'meng': index%2 != 1,'baccolor': index%2 != 1,'clickbaccolor':nowindex == index}"
            class="listInner4"
            v-for="(item,index) in results"
            :key="index"
            @dblclick = "focusdbl4(index, item)"
            @click="focus4(index, item)">
            <span>{{ changeVillageName(item.villageid) || '-' }}</span>
            <span>{{ item.alarmtypename || '-' }}</span>
            <span>{{ formatDates(item.alarmtime) || '-' }}</span>
            <!--<span>{{ item.alarmcount || '-' }}</span>-->
            <span>{{ item.alarmlevelname || '-' }}</span>
            <span>
              <span style="background: transparent;position: relative">
                <img
                  v-if="item.alarmstate == '0'"
                  style="width: 18px;height: 18px;vertical-align: middle;"
                  src="../../../assets/jsicon/icon/weichuli.png">
                <img
                  v-if="item.alarmstate == '1'"
                  style="width: 18px;height: 18px;vertical-align: middle;"
                  src="../../../assets/jsicon/icon/wubao.png">
                <img
                  v-if="item.alarmstate == '2'"
                  style="width: 18px;height: 18px;vertical-align: middle;"
                  src="../../../assets/jsicon/icon/yichuli.png">
                <img
                  v-if="item.alarmstate == '3'"
                  style="width: 18px;height: 18px;vertical-align: middle;"
                  src="../../../assets/jsicon/icon/jiechu.png">
                <img
                  v-if="item.alarmstate == '4'"
                  style="width: 18px;height: 18px;vertical-align: middle;"
                  src="../../../assets/jsicon/icon/queren.png">
                <span style="background: transparent;margin-left: 5px;">{{ dealStates(item.alarmstate) }}</span>
              </span>
            </span>
            <span
              :title="item.installadd"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
              <span style="background: transparent;margin-left: 5px;">{{ item.installadd || item.address }}</span>
              <!--<img style="width: 18px;height: 18px;vertical-align: middle;" src="../../../assets/images/position.svg">-->
            </span>
            <span
              :title="item.alarmcontent"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.alarmcontent || '-' }}</span>
          </div>
        </div>
        <div
          v-else
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </ul>
    </div>
    <div v-if="type === '/home/search/device'">
      <div
        class="title">
        <div>设备信息</div>
      </div>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport('device')"
          class="btnclass"><i
            style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
            class="iconCheckout"/>导出</button>
      </div>
      <ul class="textCon ulstyle">
        <div class="listTitle33">
          <span>所属小区</span>
          <span>设备名称</span>
          <span>设备编号</span>
          <span>设备类型</span>
          <span>型号</span>
          <span>MAC</span>
          <span style="position: relative">
            报警时间
            <div
              @click="deviceOrder"
              style="position: absolute;right: .8rem;top: .15rem;cursor: pointer">
              <div
                :class="deviceOrderClass ? 'unselClass': ''"
                class="el-icon-caret-top"
                style="width: .16rem;height: .16rem;display: block"/>
              <div
                :class="deviceOrderClass ? '': 'unselClass'"
                class="el-icon-caret-bottom"
                style="width: .16rem;height: .16rem;display: block"/>
            </div>
          </span>
          <span>安装位置</span>
          <span>设备状态</span>
          <!--<span>查看</span>-->
        </div>
        <div
          style="height: 100%;"
          v-if="results.length > 0 ? true : false"
          id="deviceContent">
          <div
            class="listInner33"
            :class="{'meng': index%2 != 1,'baccolor': index%2 != 1,'clickbaccolor':nowindex == index}"
            v-for="(item,index) in results"
            :key="index"
            @dblclick = "focusdbl5(index, item)"
            @click="focus5(index, item)">
            <span>{{ changeVillageName(item.villageid) || '-' }}</span>
            <span
              :title="item.name"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.name || '-' }}</span>
            <span
              :title="item.code"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.code || '-' }}</span>
            <span>{{ changeTypes(item.devicetype.replace(/\s/ig,'')) || '-' }}</span>
            <span
              :title="item.productmodel"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.productmodel || '-' }}</span>
            <span>-</span>
            <span>{{ formatDates(item.installtime) }}</span>
            <span
              :title="item.installadd"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.installadd || '-' }}</span>
            <!--<span></span>-->
            <span>
              <!--<span style="background: transparent;position: relative">-->
              <!--<img-->
              <!--title="故障"-->
              <!--v-if="item.state != '0' && item.state != '1'"-->
              <!--style="width: 18px;height: 18px;vertical-align: middle;"-->
              <!--src="../../../assets/images/red_buttom.svg">-->
              <!--<img-->
              <!--title="在线"-->
              <!--v-if="item.state == '1'"-->
              <!--style="width: 18px;height: 18px;vertical-align: middle;"-->
              <!--src="../../../assets/images/green_buttom.svg">-->
              <!--<img-->
              <!--title="离线"-->
              <!--v-if="item.state == '0'"-->
              <!--style="width: 18px;height: 18px;vertical-align: middle;"-->
              <!--src="../../../assets/images/yellow_buttom.svg">-->
              <!--</span>-->
              {{ changeerrState(item.state) }}
            </span>
            <!-- <span>{{formatDates(item.installtime)}}</span> canthover-->
            <!--<div>-->
            <!--<div :class="item.deviceimage !== '' ? 'hoverbac' : 'canthover'"-->
            <!--@click="devicePicVideo(item.deviceimage)"-->
            <!--style="border:1px solid #31f1fe;width: 20px;height: 20px;position:relative;margin:10px auto;">-->
            <!--<div class="rightTri"></div>-->
            <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <div
          v-else
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </ul>
    </div>
    <div v-if="type === '/home/search/microCardFace'">
      <div
        class="title">
        <div>微卡人员</div>
      </div>
      <div class="microFaces">
        <div
          class="microFace"
          v-for="(i,index) in results"
          :key="index">
          <Box3 css="padding: .12rem .18rem">
            <div style="position: relative">
              <div
                class="microFaceImg"
                :style="{backgroundImage: 'url(' + filtration(i.faceurl) + ')', backgroundSize:'cover'}"/>
              <div class="microFaceImgDown">
                <div class="microFaceImgTit">
                  <div class="microFaceTitMen">
                    <span>{{ i.peoplename || '路人' }}</span>
                    <!--<img-->
                    <!--@click="alertPictopic"-->
                    <!--class="picTopic"-->
                    <!--src="../../../assets/newjs/pic/yitusoutu.png"-->
                    <!--alt="">-->
                  </div>
                  <div class="microFaceTitTime">{{ formatDates(i.facecapturetime) }}</div>
                </div>
                <div
                  class="microFaceImgTitR"
                  :class="i.inouttype === 0 ? 'microFaceImgTitRin' : 'microFaceImgTitRout'">{{ i.faceinouttype === 0 ? '进' : '出' }}</div>
              </div>
              <div class="microFaceImgBac"/>
            </div>
            <div
              @click="peopleDetail(i)"
              @mouseenter="overShow(index)"
              @mouseleave="outHide"
              class="peopleface">
              <div
                v-if="grawShowindex === index"
                class="peoplefaceWord">详情</div>
              <div
                v-if="grawShowindex === index"
                class="peoplefaceBac"/>
            </div>
          </Box3>
        </div>
        <div
          v-if="results.length === 0 ? true : false"
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </div>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport('microCardFace')"
          class="btnclass"><i
            style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
            class="iconCheckout"/>导出</button>
      </div>
    </div>
    <div v-if="type === '/home/search/serchByPic'">
      <div
        class="title">
        <div>抓拍人脸</div>
      </div>
      <div class="microFaces">
        <div
          class="microFace"
          v-for="(i,index) in results"
          :key="index">
          <Box3 css="padding: .12rem .18rem">
            <div style="position: relative;height: 100%">
              <div
                class="microFaceImg"
                :style="{backgroundImage: 'url(' + filtration(i.faceurl) + ')', backgroundSize:'cover'}"/>
              <div class="microFaceImgDown">
                <div class="microFaceImgTit">
                  <div class="microFaceTitMen">
                    <span>{{ i.peoplename || '路人' }}</span>
                    <!--<img-->
                    <!--@click="alertPictopic"-->
                    <!--class="picTopic"-->
                    <!--src="../../../assets/newjs/pic/yitusoutu.png"-->
                    <!--alt="">-->
                  </div>
                  <div
                    style="font-size: .2rem"
                    class="microFaceTitTime">{{ formatDates(i.facecapturetime) }}</div>
                </div>
                <div
                  class="microFaceImgTitR"
                  :class="i.inouttype === 0 ? 'microFaceImgTitRin' : 'microFaceImgTitRout'">{{ i.faceinouttype === 0 ? '进' : '出' }}</div>
              </div>
              <div class="microFaceImgBac"/>
              <div
                v-if="i.similarity !== undefined"
                class="simlarityPer">
                {{ toparseFloat(i.similarity) }}
              </div>
            </div>
            <div
              @click="peopleDetail(i)"
              @mouseenter="overShow(index)"
              @mouseleave="outHide"
              class="peopleface">
              <div
                v-if="grawShowindex === index"
                class="peoplefaceWord">详情</div>
              <div
                v-if="grawShowindex === index"
                class="peoplefaceBac"/>
            </div>
          </Box3>
        </div>
        <div
          v-if="results.length === 0 ? true : false"
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </div>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport('serchByPic')"
          class="btnclass"><i
            style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
            class="iconCheckout"/>导出</button>
      </div>
    </div>
    <div v-if="type === '/home/search/serchByFace'">
      <div
        class="title">
        <div>抓拍人脸</div>
      </div>
      <div class="microFaces">
        <div
          class="microFace"
          v-for="(i,index) in results"
          :key="index">
          <Box3 css="padding: .12rem .18rem">
            <div style="position: relative;height: 100%">
              <img @dragstart="dragPic(i,$event)" @click="sendFacePic(i.faceUrl,i)" draggable="true" class="microFaceImg" :src="i.faceUrl" alt="">
              <!--<div-->
                <!--@click="sendFacePic(i.faceUrl,i)"-->
                <!--class="microFaceImg"-->
                <!--:style="{backgroundImage: 'url(' + filtration(i.faceUrl) + ')', backgroundSize:'cover'}"/>-->
              <div class="microFaceImgDown">
                <div class="microFaceImgTit">
                  <!--<div class="microFaceTitMen">-->
                    <!--<span>{{ i.peoplename || '路人' }}</span>-->
                    <!--&lt;!&ndash;<img&ndash;&gt;-->
                    <!--&lt;!&ndash;@click="alertPictopic"&ndash;&gt;-->
                    <!--&lt;!&ndash;class="picTopic"&ndash;&gt;-->
                    <!--&lt;!&ndash;src="../../../assets/newjs/pic/yitusoutu.png"&ndash;&gt;-->
                    <!--&lt;!&ndash;alt="">&ndash;&gt;-->
                  <!--</div>-->
                  <div
                    style="font-size: .2rem"
                    class="microFaceTitTime">{{ formatDates(i.faceCaptureTime) }}</div>
                </div>
                <div
                  class="microFaceImgTitR"
                  :class="i.in_outType === 0 ? 'microFaceImgTitRin' : 'microFaceImgTitRout'">{{ i.in_outType === 0 ? '进' : '出' }}</div>
              </div>
              <div class="microFaceImgBac"/>
            </div>
            <!--<div-->
              <!--@mouseenter="overShow(index)"-->
              <!--@mouseleave="outHide"-->
              <!--class="peopleface">-->
              <!--<div-->
                <!--v-if="grawShowindex === index"-->
                <!--class="peoplefaceWord">详情</div>-->
              <!--<div-->
                <!--v-if="grawShowindex === index"-->
                <!--class="peoplefaceBac"/>-->
            <!--</div>-->
          </Box3>
        </div>
        <div
          v-if="results.length === 0 ? true : false"
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </div>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport('serchByPic')"
          class="btnclass"><i
          style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
          class="iconCheckout"/>导出</button>
      </div>
    </div>
    <div v-if="type === '/home/search/microCardCar'">
      <div
        class="title">
        <div>微卡车辆</div>
      </div>
      <div style="color: white;position: absolute;left: 1%;bottom: 10px;z-index: 16;">
        <button
          @click.stop="alertExport('microCardCar')"
          class="btnclass"><i
            style="font-size: .44rem;vertical-align: middle;margin-right: .2rem"
            class="iconCheckout"/>导出</button>
      </div>
      <div class="listTitlecar">
        <!--<span>-->
        <!--<div style="width: 3.18rem;height: .86rem;margin-top: .06rem;margin-left: .3rem"/>-->
        <!--</span>-->
        <span>车牌号</span>
        <span>所属小区</span>
        <span>车辆类型</span>
        <span>车主</span>
        <span>手机号码</span>
        <span style="position: relative">
          驶入时间
          <div
            @click="carInOrder"
            style="position: absolute;right: .8rem;top: .3rem;cursor: pointer">
            <div
              :class="carInOrderClass ? 'unselClass': ''"
              class="el-icon-caret-top"
              style="width: .16rem;height: .16rem;display: block"/>
            <div
              :class="carInOrderClass ? '': 'unselClass'"
              class="el-icon-caret-bottom"
              style="width: .16rem;height: .16rem;display: block"/>
          </div>
        </span>
        <span style="position: relative">
          驶出时间
          <div
            @click="carOutOrder"
            style="position: absolute;right: .8rem;top: .3rem;cursor: pointer">
            <div
              :class="carOutOrderClass ? 'unselClass': ''"
              class="el-icon-caret-top"
              style="width: .16rem;height: .16rem;display: block"/>
            <div
              :class="carOutOrderClass ? '': 'unselClass'"
              class="el-icon-caret-bottom"
              style="width: .16rem;height: .16rem;display: block"/>
          </div>
        </span>
        <span style="position: relative">
          停车时长
          <div
            @click="carStayOrder"
            style="position: absolute;right: .8rem;top: .3rem;cursor: pointer">
            <div
              :class="carStayOrderClass ? 'unselClass': ''"
              class="el-icon-caret-top"
              style="width: .16rem;height: .16rem;display: block"/>
            <div
              :class="carStayOrderClass ? '': 'unselClass'"
              class="el-icon-caret-bottom"
              style="width: .16rem;height: .16rem;display: block"/>
          </div>
        </span>
        <!--<span>图片</span>-->
      </div>
      <div style="height: 100%;height: 100%;">
        <div
          :class="{'meng': index%2 != 1,'baccolorcar': index%2 != 1,'clickbaccolorcar':nowindex == index}"
          class="listInnercar"
          v-for="(item, index) in results"
          :key="index"
          @dblclick = "focusdbl1(index, item)"
          @click="focus1(index, item)">
          <!--<span>-->
          <!--<div-->
          <!--style="width: 3.18rem;height: .86rem;margin-top: .06rem;margin-left: .3rem"-->
          <!--v-if="item.outminplatepic !== null || item.inminplatepic !== null">-->
          <!--<Box3 css="padding: .05rem .05rem">-->
          <!--<img-->
          <!--style="width: 100%;height: 98%"-->
          <!--:src="item.outminplatepic || item.inminplatepic"-->
          <!--alt="">-->
          <!--</Box3>-->
          <!--</div>-->
          <!--<div-->
          <!--style="width: 3.18rem;height: .86rem;margin-top: .06rem;margin-left: .3rem"-->
          <!--v-else>-->
          <!--无图片-->
          <!--</div>-->
          <!--</span>-->
          <span>{{ item.plateno }}</span>
          <span>{{ changeVillageName(item.villageid) || '-' }}</span>
          <span>{{ changeName(item.cartype) || '-' }}</span>
          <span>{{ item.peoplename || '-' }}</span>
          <span>{{ item.phoneno || '-' }}</span>
          <span
            :title="formatDates(item.intime)"
            style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ formatDates(item.intime) || '-' }}</span>
          <span
            :title="formatDates(item.outtime)"
            style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ formatDates(item.outtime) || '-' }}</span>
          <span
            :title="computdifTime(difTime(item.intime, item.outtime))"
            style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ computdifTime(difTime(item.intime, item.outtime)) || '-' }}</span>
            <!--<span>-->
            <!--<button-->
            <!--class="hoverbac btnClass"-->
            <!--@click="lookCarPic(item)">查看</button>-->
            <!--</span>-->
        </div>
        <div
          v-if="results.length === 0 ? true : false"
          class="userInfoNoData">
          {{ dtNameText }}
        </div>
      </div>
    </div>
    <div
      v-if="circleshow"
      style="background: rgba(164, 237, 252, 0.2); width: 100%; height: 100%;position: absolute;top: 0;left: 0;z-index: 100">
      <el-progress
        class="progressClass"
        type="circle"
        :percentage="percentage"/>
      <div
        @click="cancelExcel"
        class="progressClassCancel">
        取消
      </div>
    </div>
  </div>
</template>
<script>
import Title from '../public/boxTitle'
import pop from '../public/popupContainer'
import alarmAlert from './dialog/alarmAlert'
import user from '../../../Utils/user'
import { apiNames } from '../../../config/config'
import { Post } from '../../../Utils/Http'
export default {
  data () {
    return {
      carTypes: [],
      which: 'face',
      alarmData: [],
      nowindex: 0,
      labels: [],
      optionsItemType: [],
      openType: [],
      errState: [],
      percentage: 5,
      circleshow: false,
      circleexportshow: true,
      exportType: '',
      columns: [],
      exportpage: 1,
      exportData: [],
      serchCondition: {},
      grawShowindex: -1,
      counts: 0,
      tvSrcIn: '',
      tvSrcOut: '',
      passOrderClass: false,
      alarmOrderClass: false,
      deviceOrderClass: false,
      carInOrderClass: false,
      carOutOrderClass: false,
      carStayOrderClass: false,
      resultsInfo: null,
      smallVideoUrl: '',
      videoUrl: '',
      playUrl: ''
    }
  },
  props: {
    results: {
      type: [Array, String],
      default: ''
    },
    conditions: {
      type: [Array, String, Object],
      default: ''
    },
    type: {
      type: [String],
      default: ''
    },
    dtNameText: {
      type: [String],
      default: ''
    },
    total: {
      type: [Number],
      default: 0
    },
    pageSize: {
      type: [Number],
      default: 0
    }
  },
  components: {
    Title,
    pop,
    alarmAlert
  },
  filters: {
  },
  mounted () {
    this.smallVideoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).smallVideoUrl
    this.videoUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).videoUrl
    this.playUrl = JSON.parse(window.localStorage.getItem('currentVillageID')).playUrl
    this.getLabels()
    this.getItemTypes()
    this.getOpenType()
    this.geterrState()
  },
  watch: {
    $route () {
      this.circleshow = false
    }
  },
  methods: {
    dragPic (e, event) {
      console.log(e)
      window.dragFace = e
      event.dataTransfer.setData('Text', e)
    },
    sendFacePic (url,item) {
      // this.$bus.emit('faceUrlfromU', url)
      window.pop.show({
        level: 2,
        component: () => import('./dialog/microFace'),
        param: {
          level: 2,
          e: item
        }
      })
    },
    filtration (val) {
      if (val) {
        if (window.location.hostname.indexOf('31.0') !== -1 || window.location.hostname === 'localhost') {
          return val
        } else {
          return val.replace('31.0.167.62:19800', '10.1.247.10:9000')
        }
      }
    },
    toparseFloat (str) {
      return Math.floor(str * 100) / 100 + '%'
    },
    carInOrder () {
      this.carInOrderClass = !this.carInOrderClass
      if (this.carInOrderClass) {
        this.$bus.emit('orderScarIn', {
          orders: [['inserttime', 'desc']]
        })
      } else {
        this.$bus.emit('orderScarIn', {
          orders: [['inserttime', 'asc']]
        })
      }
    },
    carOutOrder () {
      this.carOutOrderClass = !this.carOutOrderClass
      if (this.carOutOrderClass) {
        this.$bus.emit('orderScarOut', {
          orders: [['outtime', 'desc']]
        })
      } else {
        this.$bus.emit('orderScarOut', {
          orders: [['outtime', 'asc']]
        })
      }
    },
    carStayOrder () {
      this.carStayOrderClass = !this.carStayOrderClass
      if (this.carStayOrderClass) {
        this.$bus.emit('orderScarStay', {
          orders: [['installtime', 'desc']]
        })
      } else {
        this.$bus.emit('orderScarStay', {
          orders: [['installtime', 'asc']]
        })
      }
    },
    deviceOrder () {
      this.deviceOrderClass = !this.deviceOrderClass
      if (this.deviceOrderClass) {
        this.$bus.emit('orderSdevice', {
          orders: [['installtime', 'desc']]
        })
      } else {
        this.$bus.emit('orderSdevice', {
          orders: [['installtime', 'asc']]
        })
      }
    },
    alarmOrder () {
      this.alarmOrderClass = !this.alarmOrderClass
      if (this.alarmOrderClass) {
        this.$bus.emit('orderSalarm', {
          orders: [['alarmtime', 'desc']]
        })
      } else {
        this.$bus.emit('orderSalarm', {
          orders: [['alarmtime', 'asc']]
        })
      }
    },
    passOrder () {
      this.passOrderClass = !this.passOrderClass
      if (this.passOrderClass) {
        this.$bus.emit('orderSs', {
          orders: [['opentime', 'desc']]
        })
      } else {
        this.$bus.emit('orderSs', {
          orders: [['opentime', 'asc']]
        })
      }
    },
    alertPictopic () {
      alert('开发中。。。')
    },
    dealStates (state) {
      if (state === 0) {
        return '未处理'
      } else if (state === 1) {
        return '误报'
      } else if (state === 2) {
        return '已处理'
      } else if (state === 3) {
        return '解除'
      } else if (state === 4) {
        return '已受理'
      }
    },
    difTime (intime, outtime) {
      if (outtime === null) {
        outtime = new Date() / 1000
      }
      if (intime === null) {
        return 0
      } else {
        if (outtime < intime) {
          return 0
        } else {
          return outtime - intime
        }
      }
    },
    overShow (index) {
      this.grawShowindex = index
    },
    outHide () {
      this.grawShowindex = -1
    },
    alertExport (type) {
      if (this.results.length === 0) {
        this.$message('暂无数据导出')
      } else {
        window.pop.show({
          level: 2,
          component: () => import('./dialog/exportExcel'),
          param: {
            level: 2,
            e: {
              type: type,
              total: this.total,
              pageSize: this.pageSize,
              serchCondition: this.serchCondition
            }
          }
        })
      }
    },
    changeVillageName (id) {
      let villageId = JSON.parse(window.localStorage.getItem('webGlobalConfig')).villageInfos
      let name = ''
      for (let i = 0; i < villageId.length; i++) {
        if (villageId[i].villageID === id) {
          name = villageId[i].villageName
        }
      }
      return name
    },
    getItemTypes () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_device/type']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.optionsItemType = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    geterrState () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_device/state']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.errState = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    changeerrState (id) {
      let name = ''
      for (let i = 0; i < this.errState.length; i++) {
        if (Number(this.errState[i].name) === id) {
          name = this.errState[i].typeName
        }
      }
      return name
    },
    getLabels () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/p_people_tag/label']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.labels = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    changeOpenType (id) {
      let name = ''
      for (let i = 0; i < this.openType.length; i++) {
        if (this.openType[i].name === id) {
          name = this.openType[i].typeName
        }
      }
      return name
    },
    getOpenType () {
      let reqParam = user.getRequestHeader()
      reqParam.paths = ['db/e_access_log/openType']
      Post({
        async: true,
        url: apiNames['路径获取字典'],
        data: reqParam,
        dataType: 'json',
        success: (data) => {
          this.openType = data.datas
        },
        error: (err) => {
          console.log(err)
        }
      })
    },
    changeLabel (str) {
      if (str) {
        let label = str.split(',')
        let newstr = []
        if (label.length > 0) {
          for (let i = 0; i < label.length; i++) {
            for (let j = 0; j < this.labels.length; j++) {
              if (this.labels[j].name === label[i].replace(/\s/g, '')) {
                newstr.push(this.labels[j].typeName)
              }
            }
          }
        }
        newstr = newstr.join(',')
        return newstr
      } else {
        return ''
      }
    },
    changeTypes (str) {
      if (str) {
        let newstr = ''
        for (let i = 0; i < this.optionsItemType.length; i++) {
          if (this.optionsItemType[i].name === str) {
            newstr = this.optionsItemType[i].typeName
          }
        }
        return newstr
      } else {
        return ''
      }
    },
    changeName (name) {
      let newname = ''
      for (let i = 0; i < this.carTypes.length; i++) {
        if (this.carTypes[i].name === name) {
          newname = this.carTypes[i].typeName
        }
      }
      return newname
    },
    detailsInfo (info) {
      window.pop.show({
        level: 2,
        // component: () => import('../../CommonUI/dialog/empty'),
        component: () => import('./dialog/faceDetail'),
        param: {
          level: 2,
          e: info
        }
      })
    },
    track () {
      window.pop.show({
        level: 2,
        component: () => import('../../CommonUI/dialog/empty'),
        // component: () => import('../../CommonUI/dialog/trajectory'),
        param: {
          level: 2,
          e: {}
        }
      })
    },
    lookRecord () {
      window.pop.show({
        level: 2,
        component: () => import('./dialog/carRecord'),
        param: {
          level: 2,
          e: {}
        }
      })
    },
    alarmSetting () {
      window.pop.show({
        level: 2,
        component: () => import('../../CommonUI/dialog/empty'),
        param: {
          level: 2,
          e: {}
        }
      })
    },
    // 获取小视频
    getstremsm (time, inid, outid) {
      let allTime = new Date(time)
      allTime = allTime.getTime()
      let reqParamIn = user.getRequestHeader()
      let reqParamOut = user.getRequestHeader()
      // reqParam.ID = '31010520011320001003'
      // reqParam.Start = '1548825600'
      // reqParam.End = '1548825900'
      reqParamIn.ID = inid
      reqParamIn.Start = allTime - 15
      reqParamIn.End = allTime + 15

      reqParamOut.ID = outid
      reqParamOut.Start = allTime - 15
      reqParamOut.End = allTime + 15
      Post({
        async: false,
        url: this.smallVideoUrl,
        data: reqParamIn,
        dataType: 'json',
        success: (data) => {
          if (data.Code === 0) {
            this.tvSrcIn = this.playUrl + data.Data.RTMP
          } else {
            // ..
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
      Post({
        async: false,
        url: this.smallVideoUrl,
        data: reqParamOut,
        dataType: 'json',
        success: (data) => {
          if (data.Code === 0) {
            this.tvSrcOut = this.playUrl + data.Data.RTMP
          } else {
            // ..
          }
        },
        error: (err) => {
          console.log(JSON.stringify(err) + 'popup-accessDevice 获取门禁信息')
        }
      })
      this.getDataSrc(this.tvSrcIn, this.tvSrcOut)
      this.tvSrcIn = ''
      this.tvSrcOut = ''
    },
    // 获取门禁列表小视频播放
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
          level: 2,
          component: () => import('../../CommonUI/dialog/videoPlay'),
          param: {
            arr: [src1, src2],
            level: 2,
            e: src
          }
        })
      }
      // window.pop.show({
      //   level: 2,
      //   component: () => import('../../CommonUI/dialog/videoPlay'),
      //   param: {
      //     level: 2,
      //     e: tvSrc
      //   }
      // })
    },
    lookCarPic (item) {
      window.pop.show({
        level: 2,
        component: () => import('./dialog/microCar'),
        param: {
          level: 2,
          e: item
        }
      })
    },
    peopleDetail (item) {
      window.pop.show({
        level: 2,
        component: () => import('./dialog/microFace'),
        param: {
          level: 2,
          e: item
        }
      })
    },
    devicePicVideo (url) {
      if (url) {
        window.pop.show({
          level: 2,
          // component: () => import('../../CommonUI/dialog/empty'),
          component: () => import('./dialog/devicePic'),
          param: {
            level: 2,
            e: url
          }
        })
      }
    },
    focusdbl1 (index, item) {
      window.pop.show({
        level: 2,
        component: () => import('./dialog/microCar'),
        param: {
          level: 2,
          e: item
        }
      })
    },
    focus1 (index, item) {
      this.nowindex = index
    },
    focus2 (index, item) {
      this.nowindex = index
    },
    focusdbl3 (index, item) {
      console.log(item)
      window.pop.show({
        level: 2,
        component: () => import('./dialog/passDetail'),
        param: {
          level: 2,
          e: item
        }
      })
    },
    focus3 (index, item) {
      this.nowindex = index
    },
    focusdbl4 (index, item) {
      window.pop.show({
        level: 2,
        // component: () => import('../../CommonUI/dialog/empty'),
        component: () => import('./dialog/alarmDetail'),
        param: {
          level: 2,
          e: item
        }
      })
    },
    focus4 (index, item) {
      this.nowindex = index
      let arr = {
        deviceType: item.devicetype
      }
      item = Object.assign(arr, item)
      this.$bus.emit('/map/locate/deviceID', {
        deviceID: item.deviceid,
        isShowLayer: false,
        param: item
      })
    },
    focusdbl5 (index, item) {
      window.pop.show({
        level: 2,
        component: () => import('./dialog/deviceDetail'),
        param: {
          level: 2,
          e: item
        }
      })
    },
    focus5 (index, item) {
      this.nowindex = index
      let arr = {
        deviceType: item.devicetype
      }
      item = Object.assign(arr, item)
      this.$bus.emit('/map/locate/deviceID', {
        deviceID: item.deviceid,
        isShowLayer: false,
        param: item
      })
    }
  },
  created () {
    this.carTypes = JSON.parse(localStorage.getItem('parkingCar'))
    this.$bus.on('serchCondition', (esg) => {
      this.serchCondition = esg
    })
  }
}
</script>
<style>
  .el-progress--circle .el-progress__text {
    color: white !important;
  }
</style>
<style scoped>
.simlarityPer {
  width: 1rem;
  height: 1rem;
  background-image: url("../../../assets/images/highsimilarity.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  left: 0;
  bottom: .8rem;
  color: white;
  font-size: .22rem;
  text-align: center;
  line-height: 1rem;
}
.userInfoNoData {
  width: 100%;
  text-align: center;
  margin-top: 5rem;
  color: white;
}
.userInfo span {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
.ulstyle {
  color: white;
}
@media screen and (min-width: 3001px) {
  .ulstyle {
    color: white !important;
  }
  .listTitle4,
  .listInner4 {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr !important;
    grid-template-rows: 0.9rem !important;
  }
  .listTitle4 span,
  .listInner4 span {
    line-height: 0.9rem !important;
  }
  .listTitle,
  .listInner,
  .listTitle2,
  .listInner2,
  .listTitle3,
  .listInner3 {
    grid-template-rows: 0.9rem !important;
  }
  .listTitle span,
  .listInner span,
  .listTitle2 span,
  .listInner2 span,
  .listTitle3 span,
  .listInner3 span {
    line-height: 0.9rem !important;
  }
  .baccolor span {
    height: 0.9rem !important;
  }
  .clickbaccolor span {
    height: 0.9rem !important;
  }
}
.meng {
  width: 100%;
}
.listTitle,
.listInner {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.8rem;
}
.listTitle span,
.listInner span {
  text-align: center;
  line-height: 0.8rem;
  display: inline-block;
}
.listTitle span {
  color: #a4edfc;
}
.listTitle2,
.listInner2 {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.8rem;
}
.listTitle2 span,
.listInner2 span {
  text-align: center;
  line-height: 0.8rem;
  display: inline-block;
}
.listTitle2 span {
  color: #a4edfc;
}
.listTitle3,
.listInner3 {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.8rem;
}
.listTitle3 span,
.listInner3 span {
  text-align: center;
  line-height: 0.8rem;
  display: inline-block;
}
.listTitle3 span {
  color: #a4edfc;
}
.listTitle33,
.listInner33 {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.8rem;
}
.listTitle33 span,
.listInner33 span {
  text-align: center;
  line-height: 0.8rem;
  display: inline-block;
}
.listTitle33 span {
  color: #a4edfc;
}
.listTitle31,
.listInner31 {
  width: 100%;
  display: grid;
  grid-template-columns: 3rem 3rem 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.8rem;
}
.listTitle31 span,
.listInner31 span {
  text-align: center;
  line-height: 0.8rem;
  display: inline-block;
}
.listTitle31 span {
  color: #a4edfc;
}
.listTitle4,
.listInner4 {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 5rem 2.5rem 1fr 1fr 1fr;
  grid-template-rows: 0.8rem;
}
.listTitle4 span,
.listInner4 span {
  text-align: center;
  line-height: 0.8rem;
  display: inline-block;
}
.listTitle4 span {
  color: #a4edfc;
}
.listTitlecar,
.listInnercar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1rem;
}
.listTitlecar span,
.listInnercar span {
  text-align: center;
  line-height: 1rem;
  display: inline-block;
  color: white;
}
.listTitlecar span {
  color: #a4edfc;
}
.baccolor span,
.baccolor > div {
  background: rgba(164, 237, 252, 0.2);
  height: 0.8rem;
  color: white;
}
.clickbaccolor span,
.clickbaccolor > div {
  background: #2293ad;
  color: white;
  height: 0.8rem;
}
.baccolorcar span,
.baccolorcar > div {
  background: rgba(164, 237, 252, 0.2);
  height: 1rem;
  color: white;
}
.clickbaccolorcar span,
.clickbaccolorcar > div {
  background: #2293ad;
  color: white;
  height: 1rem;
}
.btnClass {
  background: none;
  color: white;
  border: 0.5px solid #31f1fe;
  line-height: .42rem;
  display: inline-block;
  padding: .06rem .3rem;
  outline: none;
  border-radius: .06rem;
  font-size: .32rem;
}
.parentF1 {
  position: absolute;
  top: 0;
  left: 220px;
  overflow: hidden;
}

.fl > div {
  float: left;
}
.fl {
  clear: both;
  overflow: hidden;
  margin-bottom: 1px;
}
.item-2 {
  /*width:120px;*/
  height: 27px;
  max-width: 140px;
  line-height: 27px;
  margin-left: 3px;
}
.item-1 {
  width: 2px !important;
  margin-top: 4px;
  height: 18px;
  padding-left: 4px;
  background-clip: content-box;
  background-color: #ff0080;
}
.rightTri {
  display: block;
  width: 0;
  height: 0;
  border-width: 6px 0 8px 8px;
  border-style: solid;
  border-color: transparent transparent transparent #31f1fe;
  position: absolute;
  top: 2px;
  left: 6px;
}
.hoverbac:hover {
  background: #2299ad;
  cursor: pointer;
}
.canthover {
  background: rgba(164, 237, 252, 0.2);
  border: 1px solid rgba(164, 237, 252, 0.2) !important;
}
.canthover .rightTri {
  border-color: transparent transparent transparent rgba(164, 237, 252, 0.2) !important;
}
.btnclass {
  min-width: 1.48rem;
  height: .64rem;
  line-height: .6rem;
  box-sizing: border-box;
  border-radius: 2px;
  border: solid .5px #009fea;
  background: none;
  color: white;
  display: inline-block;
  cursor: pointer;
  font-size: .28rem;
}
.btnclass:hover {
  background: linear-gradient(to bottom, #009fe8, #6ed9f8);;
}
.progressClass {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.progressClassCancel {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
  width: 2rem;
  height: .6rem;
  text-align: center;
  line-height: .6rem;
  border: 1px solid #007aff;
  border-radius: .2rem;
  cursor: pointer;
}
.progressClassCancel:hover {
  background: linear-gradient(to top, #a4e8fc, #0edffa);
}
.microFaces {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
}
.microFace {
  padding: 0.08rem;
  width: 3.32rem;
  height: 3.64rem;
  margin-left: .3rem;
  margin-bottom: .3rem
}
.peopleface {
  height: 2.6rem;
  width:91%;
  margin-top: .12rem;
  position: absolute;
  top: 0;
  z-index: 1;
  cursor: pointer;
}
.iconCheckout {
  background: url("../../../assets/images/daochu.svg") center center no-repeat;
  width: .5rem;
  margin-top: -.1rem;
  height: .4rem;
  display: inline-block;
}
.microFaceImg {
  height: 3.25rem;
  width:100%;
  margin-top: .06rem;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
  /*-webkit-background-size:cover;*/
  /*-moz-background-size:cover;*/
  /*background-size:cover;*/
}
.microFaceImgDown {
  position: absolute;
  bottom: -.18rem;
  right: 0;
  overflow: hidden;
  width: 100%;
  color: white;
  z-index: 2;
}
.microFaceImgTit {
  float: left;
  height: .88rem;
  width: 2.18rem;
  margin-left: .22rem;
  margin-bottom: .12rem
}
.microFaceTitMen {
  font-size: .26rem;
  font-weight: bold;
  margin-top: .18rem;
}
.picTopic {
  width: .3rem;
  height: .28rem;
  margin-left: .1rem;
  cursor: pointer;
}
.microFaceTitTime {
  font-size: .24rem;
  font-weight: bold;
  margin-top: -.02rem
}
.microFaceImgTitR {
  float: right;
  font-weight: bold;
  height: .88rem;
  margin-bottom: .12rem;
  width: .5rem;
  line-height: .88rem;
  font-size: .42rem;
}
.microFaceImgTitRout {
  color: #0bff02;
}
.microFaceImgTitRin {
  color: #ffff00;
}
.microFaceImgBac {
  width: 100%;
  height: .7rem;
  background: #333333;
  opacity: .8;
  z-index: 1;
  position: absolute;
  bottom: 0rem;
  right: 0rem;
}
.peoplefaceWord {
  color: white;
  height: 3.2rem;
  width:100%;
  position: absolute;
  z-index: 2;
  font-size: .46rem;
  text-align: center;
  line-height: 3.2rem
}
.peoplefaceBac {
  height: 3.2rem;
  width:100%;
  position: absolute;
  top: 0;
  opacity: .6;
  background: #333333;
  z-index: 1;
}
.title {
  color: white;
  position: relative;
  font-size: .4rem;
  color: #00beff;
  text-indent: .2rem;
  height: .8rem
}
.title:after {
  content: '';
  background: url('../../../assets/newjs/pic/title.png');
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: 100%;
  background-repeat: no-repeat;
  bottom: -.6rem;
}
.unselClass {
  color: rgb(65, 112, 127) !important;
}
</style>
