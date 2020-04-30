export const router = {
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    component: () =>
      import('../components/Login')
  }, {
    path: '/street',
    component: () =>
      import('../components/street')
  }, {
    path: '/home',
    component: () =>
      import('../components/Home'),
    redirect: '/home/trend/allState',
    children: [{
      path: '/home/maintenance',
      redirect: '/home/maintenance/all'
    }, {
      path: '/home/sensor',
      redirect: '/home/sensor/warning'
    }, {
      path: '/home/trend',
      redirect: '/home/trend/allState'
    }, {
      path: '/home/sensor',
      component: () =>
        import('../components/home/sensor/index'),
      children: [{
        path: '/home/sensor/warning',
        component: () =>
          import('../components/home/sensor/items/warning')
      }, {
        path: '/home/sensor/fire',
        component: () =>
          import('../components/home/sensor/items/fire')
      }, {
        path: '/home/sensor/face',
        component: () =>
          import('../components/home/sensor/items/face')
      }, {
        path: '/home/sensor/pass',
        component: () =>
          import('../components/home/sensor/items/pass')
      }, {
        path: '/home/sensor/car',
        component: () =>
          import('../components/home/sensor/items/car')
      }, {
        path: '/home/sensor/operation',
        component: () =>
          import('../components/home/sensor/items/operation')
      }]
    }, {
      path: '/home/video',
      // redirect: '/home/video/items/videoPlay',
      component: () =>
        import('../components/home/video/items/videoControl')
    }, {
      path: '/home/search',
      redirect: '/home/search/pass'
    }, {
      path: '/home/search',
      component: () =>
        import('../components/home/search/index'),
      children: [{
        path: '/home/search/car',
        component: () =>
          import('../components/home/search/items/car')
      }, {
        path: '/home/search/pass',
        component: () =>
          import('../components/home/search/items/pass')
      }, {
        path: '/home/search/face',
        component: () =>
          import('../components/home/search/items/face')
      }, {
        path: '/home/search/alarm',
        component: () =>
          import('../components/home/search/items/alarm')
      }, {
        path: '/home/search/device',
        component: () =>
          import('../components/home/search/items/device')
      }, {
        path: '/home/search/microCardFace',
        component: () =>
          import('../components/home/search/items/microCardFace')
      }, {
        path: '/home/search/microCardCar',
        component: () =>
          import('../components/home/search/items/microCardCar')
      }, {
        path: '/home/search/serchByPic',
        component: () =>
          import('../components/home/search/items/serchByPic')
      }, {
        path: '/home/search/serchByFace',
        component: () =>
          import('../components/home/search/items/serchByFace')
      }]
    }, {
      path: '/home/maintenance/:type',
      component: () =>
        import('../components/home/maintenance/index')
    }, {
      path: '/home/trend/:type',
      component: () =>
        import('../components/home/trend/items/allState')
    }]
  }],
  linkActiveClass: 'active'
}

export const menus = [{
  name: '态势分析',
  path: '/home/trend',
  menus: [
  ]
}, {
  name: '神经感知',
  path: '/home/sensor',
  menus: [{
    name: '预警感知',
    path: '/home/sensor/warning'
  }, {
    name: '消防感知',
    path: '/home/sensor/fire'
  }, {
    name: '人脸感知',
    path: '/home/sensor/face'
  }, {
    name: '通行感知',
    path: '/home/sensor/pass'
  }, {
    name: '车辆感知',
    path: '/home/sensor/car'
  }, {
    name: '运维感知',
    path: '/home/sensor/operation'
  }]
}, {
  name: '视频调阅',
  path: '/home/video'
}, {
  name: '动态检索',
  path: '/home/search',
  menus: [{
  //   name: '人口查询',
  //   path: '/home/search/face'
  // }, {
  //   name: '车辆查询',
  //   path: '/home/search/car'
  // }, {
    name: '通行查询',
    path: '/home/search/pass'
  }, {
    name: '报警查询',
    path: '/home/search/alarm'
  }, {
    name: '设备查询',
    path: '/home/search/device'
  }, {
    name: '微卡人员',
    path: '/home/search/microCardFace'
  }, {
    name: '微卡车辆',
    path: '/home/search/microCardCar'
  // }, {
  //   name: '以图搜图',
  //   path: '/home/search/serchByPic'
  // }, {
  //   name: '人脸检索',  //  金华需要的
  //   path: '/home/search/serchByFace'
  }]
}]

export const HtmlConfig = {
  mapIconParams: {
    styles: 'color',
    width: 32,
    height: 32,
    maxWidth: 38,
    maxHeight: 38,
    extension: '.png'
  },
  // 每个模式下默认显示图层
  // 外网、田林、虹仙
  modelDevice: {
    'street': [
      'camera_face',
      'parking',
      'smokeDetector',
      'access'
    ],
    'fire': [
      'combustibleGas',
      'smokeDetector',
      'fireCock',
      'garbage'
    ],
    'face': [
      'camera_face',
      'garbage'
    ],
    'pass': [
      'access',
      'garbage'
    ],
    'car': [
      'parking',
      'garbage'
    ],
    'warning': [
      'access',
      'camera',
      'camera_face',
      'fireCock',
      'garbage',
      'parking'
    ],
    'all': [
      'all'
    ],
    'other': [
      'electricArc',
      'manholeCover',
      'fireCock',
      'elecMeter',
      'charger',
      'combustibleGas'
    ],
    'operation': [
      'all'
    ]
  }
  // 长宁默认图层
  // modelDevice: {
  //   'street': [
  //     'camera_face',
  //     'smokeDetector'
  //   ],
  //   'fire': [
  //     'smokeDetector',
  //     'fireCock'
  //   ],
  //   'face': [
  //     'camera_face'
  //   ],
  //   'pass': [
  //     'camera_face',
  //     'access'
  //   ],
  //   'car': [
  //     'parking'
  //   ],
  //   'warning': [
  //     'all'
  //   ],
  //   'all': [
  //     'all'
  //   ],
  //   'other': [
  //     'manholeCover',
  //     'fireCock'
  //   ],
  //   'operation': [
  //     'all'
  //   ]
  // },
  /** 长宁地图 **/
  // mapUrl: 'esri_changning'
  /** *绍兴地图！****/
  // mapUrl: 'leaflet_shaoxing'
}
// 阿里云外网
// export const imgUrl = 'http://47.75.190.168:9000/' // 实时抓拍车牌
export const imgUrl = 'http://220.248.34.75:9000/' // 实时抓拍车牌
export const serverUrlApi = function () {
  let hostname = window.location.hostname
  let origin = 'http://' + hostname + ':5000/api/'
  // let url = hostname === 'localhost' ? 'http://10.1.247.6:5000/api/' : origin
  let url = hostname === 'localhost' ? 'http://10.10.20.10:5000/api/' : origin
  // let url = hostname === 'localhost' ? 'http://31.0.223.17:5000/api/' : origin // 长春
  return url
}
export const serverUrl = serverUrlApi()
console.log(serverUrl)
export const apiNames = {
  '催办': serverUrl + 'datain/sms/sendSms',
  // '催办': 'http://192.168.255.106:5000/api/datain/sms/sendSms',
  'getBikeshedList': serverUrl + 'area/getBikeshedList',
  'inOutList': serverUrl + 'area/getInOutList',
  'home': serverUrl + 'home/getWebGlobalConfig',
  'login': serverUrl + 'user/login',
  'keepAlive': serverUrl + 'user/keepAlive',
  '获取楼栋住户信息': serverUrl + 'area/getBuildingPeopleInfo',
  '获取楼栋住户统计': serverUrl + 'area/getBuildingPeopleCount',
  '获取人员通行情况': serverUrl + 'area/getPeoplePass',
  '获取楼栋列表': serverUrl + 'area/getBuildingList',
  '获取设备信息': serverUrl + 'device/getDeviceInfo',
  '获取设备列表': serverUrl + 'device/getDeviceList',
  '获取门禁信息': serverUrl + 'device/getAccessInfo',
  '获取门禁通行统计': serverUrl + 'device/getAccessStatic',
  '获取门禁通行记录': serverUrl + 'device/getAccessLogs',
  '获取报警列表': serverUrl + 'event/getAlarmList',
  '获取报警单条数据': serverUrl + 'event/getAlarm',
  '获取出入口相关设备': serverUrl + 'area/getInOutDeviceList',
  '获取停车场通行日志': serverUrl + 'device/getCarLogs',
  '获取停车场通行统计': serverUrl + 'device/getCarStatic',
  '获取人脸卡口通行日志': serverUrl + 'device/getFaceLogs',
  '获取人脸卡口通行统计': serverUrl + 'device/getFaceStatic',
  '获取人脸摄像机': serverUrl + 'device/getFaceCameras',
  '获取最新人脸抓拍图片': serverUrl + 'device/getFaceCapturePictures',
  '获取报警推送流程': serverUrl + 'event/getAlarmFlows',
  '获取设备数量': serverUrl + 'device/getDeviceCount',
  '获取设备运维列表': serverUrl + 'device/getDeviceOpsList',
  '获取设备维护情况': serverUrl + 'device/getOpsList',
  '获取设备运维情况列表': serverUrl + 'device/getOpsList',
  'parkings': serverUrl + 'area/getParkingList',
  '获取关联设备': serverUrl + 'event/getRelateDevices',
  '获取统计图表': serverUrl + 'statistic/getByPaths',
  '获取报警类型': serverUrl + 'event/getAlarmTypes',
  '报警处理': serverUrl + 'event/alarmProcessReport',
  '获取报警原因': serverUrl + 'event/getAlarmReasons',
  '获取发卡房屋列表': serverUrl + 'area/getHouseList',
  '获取房屋人员列表': serverUrl + 'area/getHousePeopleList',
  '路径获取字典': serverUrl + 'dictionary/getByPaths',
  '获取预警查询': serverUrl + 'search/functionCode',
  '登出': serverUrl + 'user/loginout',
  '获取报警模型': serverUrl + 'event/getAlarmModels',
  '实时情况静态数据': serverUrl + 'statistic/getRealTimeAlarmStatistics',
  '车辆通行记录': serverUrl + 'statistic/getRealTimeCars',
  '居住人员': serverUrl + 'statistic/getRealTimePeoples',
  '居住房屋': serverUrl + 'statistic/getRealTimeHouses',
  '报警设备感知': serverUrl + 'statistic/getRealTimeAlarmSense',
  '获取住户信息': serverUrl + 'people/getPeopleInfo',
  '获取预警数据': serverUrl + 'statistic/getAlarmSense',
  '获取车辆出行感知': serverUrl + 'statistic/getSenseCars',
  '感知车辆进出': serverUrl + 'statistic/getSenseCarInOut',
  '获取当前推送流程': serverUrl + 'event/getCurrentFlowNo',
  '更新报警当前推送流程': serverUrl + 'event/updateAlarmCurrentFlow',
  '获取跑马灯': serverUrl + 'home/getMarquee',
  '获取当值人员': serverUrl + 'home/getDutyWorkers',
  '获取微卡位置': serverUrl + 'area/getInOutList',
  '获取小区停车场常驻信息': serverUrl + 'device/getPeopleCar',
  '获取工作人员': serverUrl + 'user/getAllUserInfos',
  '获取所有角色信息': serverUrl + 'role/getAllRoles',
  '新增用户信息': serverUrl + 'user/add',
  '删除用户信息': serverUrl + 'user/delete',
  '修改用户信息': serverUrl + 'user/update',
  '获取用户数量': serverUrl + 'user/getUserCount',
  '获取摄像机列表': serverUrl + 'device/getCameraList',
  '获取预案列表': serverUrl + 'plan/getPlanList',
  '添加预案': serverUrl + 'plan/addPlan',
  '删除预案': serverUrl + 'plan/delPlan',
  '获取权限功能': serverUrl + 'function/getViewCodeFunctionList',
  '获取消防图片': serverUrl + 'resource/getLikeBusinessType',
  '人脸检索': serverUrl + 'datain/zs/getfaceLogsBySnpUUID',
  '全部人脸图片': serverUrl + 'datain/zs/getfaceLogsByAll'
}

// 控制地图点位点击后弹出具体的组件
export const getMapPointComponent = function (path) {
  console.log(path)
  switch (path.replace(/\s+/g, '')) {
    // 感知——门禁
    case '/home/sensor/warning/access':
    case '/home/sensor/fire/access':
    case '/home/sensor/face/access':
    case '/home/sensor/pass/access':
    case '/home/sensor/car/access':
    case '/home/sensor/operation/access':
    {
      return () =>
          import('../components/CommonUI/dialog/accessDevice')
    }
    // 感知——车辆
    case '/home/sensor/warning/parking':
    case '/home/sensor/fire/parking':
    case '/home/sensor/face/parking':
    case '/home/sensor/pass/parking':
    case '/home/sensor/car/parking':
    case '/home/sensor/operation/parking':
    {
      return () =>
          import('../components/CommonUI/dialog/carCard')
    }
    // 感知——微卡口
    case '/home/sensor/warning/camera':
    case '/home/sensor/fire/camera':
    case '/home/sensor/face/camera':
    case '/home/sensor/pass/camera':
    case '/home/sensor/car/camera':
    case '/home/sensor/operation/camera':
    {
      return () =>
          import('../components/CommonUI/dialog/videoViewer')
    }
    // 感知——人脸
    case '/home/sensor/warning/camera_face':
    case '/home/sensor/fire/camera_face':
    case '/home/sensor/face/camera_face':
    case '/home/sensor/pass/camera_face':
    case '/home/sensor/car/camera_face':
    case '/home/sensor/operation/camera_face':
    {
      return () =>
          import('../components/CommonUI/dialog/face')
    }
    // 运维——摄像机
    case '/home/maintenance/camera/camera':
    case '/home/maintenance/all/camera':
    {
      return () =>
          import('../components/CommonUI/dialog/camera')
    }
    case '/home/sensor/warning/bike':
    case '/home/sensor/fire/bike':
    case '/home/sensor/face/bike':
    case '/home/sensor/pass/bike':
    case '/home/sensor/car/bike':
    case '/home/sensor/operation/bike':
    {
      return () =>
        import('../components/CommonUI/dialog/bikeShed')
    }
    case '/home/sensor/warning/garbage':
    case '/home/sensor/fire/garbage':
    case '/home/sensor/face/garbage':
    case '/home/sensor/pass/garbage':
    case '/home/sensor/car/garbage':
    case '/home/sensor/operation/garbage':
    {
      return () =>
        import('../components/CommonUI/dialog/viewTV')
    }
    default:
    {
      return () =>
          import('../components/CommonUI/dialog/sensor')
    }
  }
}

// 控制右侧面板点击后弹出具体的组件
export const getRealTimePointComponent = function (path) {
  console.log(path + '页面右侧过滤')
  switch (path) {
    case 'smokeDetector':
    {
      return () =>
          import('../components/CommonUI/dialog/smoke')
    }
    case 'access':
    {
      return () =>
          import('../components/CommonUI/dialog/alarm')
      // import('../components/CommonUI/dialog/access')
    }
    case 'highPop':
    {
      return () =>
        import('../components/CommonUI/dialog/highPop')
      // import('../components/CommonUI/dialog/access')
    }
    case 'face':
    {
      return () =>
          import('../components/CommonUI/dialog/passage')
    }
    case '/home/sensor/pass':
    case 'pass':
    {
      return () =>
          import('../components/CommonUI/dialog/passage')
    }
    case '/home/sensor/car':
    {
      return () =>
          import('../components/CommonUI/dialog/carCard')
    }
    default:
    {
      return () =>
          import('../components/CommonUI/dialog/alarm')
      // return () => import('../temp/bubbleStranger')
    }
  }
}

// 图表颜色
export const colorList = ['#04b5f2', '#40E0D0', '#9370DB', '#19b359', '#19b3a6', '#a619b3', '#D9AFD9', '#4158D0', '#1973b3']
// 折线图颜色
export const lineColor = [{
  'from': '#21D4FD',
  'to': '#B721FF'
}, {
  'from': '#08AEEA',
  'to': '#F76B1C'
}, {
  'from': '#8EC5FC',
  'to': '#40E0D0'
}, {
  'from': '#74EBD5',
  'to': '#4158D0'
}, {
  'from': '#74EBD5',
  'to': '#85FF8A'
}]
// 柱状图
export const barColor = [{
  'from': '#85FF8A',
  'to': '#36c684'
}, {
  'from': '#8EC5FC',
  'to': '#4158D0'
}, {
  'from': '#8EC5FC',
  'to': '#08AEEA'
}, {
  'from': '#E0C3FC',
  'to': '#784BA0'
}]
