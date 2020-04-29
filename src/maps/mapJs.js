import { clearDataLayer, addPointsLayer, initMap, getMapExtent, setbackExtent, addPolygonLayer, addLinesLayer, showLayer,
  setLayerVisibility, hideLayer, closePopup, getLyrByName, insertDataIntoLayer } from './mapApi.js'
import { apiNames, HtmlConfig } from '../config/config.js'
import { Post, Get } from '../Utils/Http'
import { MapPolygonStyle, MapLineType, MapLineStyle, MapPointStyle, MapType } from './mapClass.js'

let dataCollection = []
window.deviceTypeNames = []
let mapParams

let createMap = function (moduleName, head, extent, villageFences, container, mParams, callbackEvent) {
  dataCollection = []
  window.deviceTypeNames = []
  mapParams = mParams
  window.deviceTypeNames.push({ type: 'all', typeName: '全部' })
  if (mapParams.tokenUrl) {
    if (mapParams.mapType === MapType.Esri) {
      Get({
        async: true,
        url: mapParams.tokenUrl,
        success: function (data) {
          let GLOBAL_TOKEN = data.substr(0, data.length - 2)
          mapParams.url += GLOBAL_TOKEN

          initMap(extent, container, mapParams, function (map) {
            getData(head, moduleName, villageFences, extent, function () {
              callbackEvent()
            })
          })
        },
        error: function (error) {
          console.log(error)
        }
      })
    }
  } else {
    // 初始化地图
    initMap(extent, container, mapParams, function (map) {
      getData(head, moduleName, villageFences, extent, function () {
        callbackEvent()
      })
    })
  }
}
let getData = function (head, moduleName, villageFences, extent, callbackEvent) {
  // Promise.all([getInOutListfromDB(head), getBikeshedListfromDB(head), getDevicesfromDB(head, '获取设备列表')]).then(function () {
  //   if (moduleName !== '/home/trend/allState') {
  //     addDevices(moduleName, null, villageFences, extent)
  //   }
  //   callbackEvent()
  // })
  getInOutListfromDB(head)
  getBikeshedListfromDB(head)
  getDevicesfromDB(head, '获取设备列表').then(function (dCollection) {
    if (moduleName !== '/home/trend/allState') {
      addDevices(moduleName, null, villageFences, extent)
    }
    callbackEvent()
  })
}
let getUniqueVillageID = function (list) {
  let obj = {}
  let villages = list.reduce(function (item, next) {
    if (!obj[next.villageID.trim()]) { obj[next.villageID.trim()] = true && item.push(next) }
    return item
  }, [])
  return villages
}
// 添加设备
let addDevices = function (toModuleName, fromModuleName, villageFences, initExtent) {
  if (mapParams === undefined) return
  // 记录上一个模式下地图范围
  if (mapParams.isRecordExtent) {
    if (fromModuleName != null) {
      let extent = getMapExtent()
      if (extent != null) {
        let extentStr = [{
          userName: window.localStorage.getItem('userName'),
          module: fromModuleName,
          extent: extent
        }]
        updateLocalStorage('mapExtent', extentStr)
      }
    }
    // 根据localstorage存储值设置范围
    let localExt = getExtentFromLocal('mapExtent', toModuleName)

    if (localExt !== null) {
      setbackExtent(localExt)
    } else {
      // setExtent(initExtent.xmin, initExtent.ymin, initExtent.xmax, initExtent.ymax)
    }
  }

  closePopup()
  // 清除地图上的点
  clearDataLayer()
  let isClickable = false

  let dataList = []
  let bikeshedBoundary = []
  let strokeColor = '#FFFF00'
  if (HtmlConfig.mapUrl === 'leaflet_shaoxing' || HtmlConfig.mapUrl === 'esri_changning') {
    strokeColor = '#3B00FF'
  }
  addBoundaryLayer(villageFences, new MapPolygonStyle('#FFFFFF', strokeColor, 8, 0.9, 0, MapLineType.Solid), 'villageFence')
  if (toModuleName !== '/street') {
    isClickable = true
    bikeshedBoundary = dataCollection.filter(function (device) {
      return device.type.trim() === 'bike'
    })

    if (bikeshedBoundary !== undefined && bikeshedBoundary.length > 0) {
      let areas = []
      for (let i = 0; i < bikeshedBoundary.length; i++) {
        for (let j = 0, len = bikeshedBoundary[i].data.length; j < len; j++) {
          areas.push(bikeshedBoundary[i].data[j].gisArea)
        }
        addBoundaryLayer(areas, new MapPolygonStyle('#FFFF00', '#FFFF00', 2, 0.9, 0.3, MapLineType.Solid), bikeshedBoundary[i].villageID + '_bikeshed')
      }
    }

    let currentVillage = JSON.parse(window.localStorage.getItem('currentVillageID')).villageID
    if (currentVillage === '1488ae77ec0e428eb3e70bdae73274b8') {
      let objs = []
      objs.push([[[121.42374799979626, 31.173868724891662],
        [121.42430576527673, 31.17408726753166],
        [121.42451810729723, 31.173635750727986],
        [121.42395732949218, 31.17344018774133],
        [121.42374799979626, 31.173868724891662]]])
      addPolygonLayer('1488ae77ec0e428eb3e70bdae73274b8_schoolArea', objs, new MapPolygonStyle('#FFFF00', '#FFFF00', 2, 0.9, 0.3, MapLineType.Solid))

      let data = [{ latitude: 31.17375798, longitude: 121.4241323, name: '幼儿园' }]
      addPointsLayer('1488ae77ec0e428eb3e70bdae73274b8_schoolPoint', 'school', data,
        new MapPointStyle(HtmlConfig.mapIconParams.maxWidth, HtmlConfig.mapIconParams.maxHeight, HtmlConfig.mapIconParams.styles, -10, -34, 0), true,
        HtmlConfig.mapIconParams.extension, false)
    }
  }
  let currentMName = toModuleName.search('/home/search/')
  if (currentMName !== 0) {
    let start = toModuleName.lastIndexOf('/')
    let deviceType = toModuleName.slice(start + 1, toModuleName.length).trim()

    let mDevices = HtmlConfig.modelDevice[deviceType]

    // 过滤设备type（根据当前模块获取）
    if (!mDevices) {
      if (toModuleName === '/home/maintenance/fence') {
        getFence()
      } else if (toModuleName === '/home/maintenance/camera') {
        dataList = dataCollection.filter(function (device) {
          return device.type.search(deviceType) !== -1
        })
      } else {
        dataList = dataCollection.filter(function (device) {
          return device.type === deviceType
        })
      }
    } else {
      for (let i = 0, len = mDevices.length; i < len; i++) {
        if (mDevices[i] === 'all') {
          dataList = dataCollection.slice(0)
          getFence()
          break
        }
        if (mDevices[i] === 'fence') {
          getFence()
          continue
        }
        let dList = dataCollection.filter(function (device) {
          return device.type === mDevices[i]
        })
        if (dList !== undefined && dList.length > 0) {
          for (let i = 0; i < dList.length; i++) {
            dataList.push(dList[i])
          }
        }
      }
    }
  }
  if (bikeshedBoundary !== undefined && bikeshedBoundary.length > 0) {
    for (let i = 0; i < bikeshedBoundary.length; i++) {
      dataList.push(bikeshedBoundary[i])
    }
  }
  if (dataList.length > 0) {
    addDataLayer(dataList, true, isClickable)
  }
}
// 添加点数据层
let addDataLayer = function (dataList, isLabel, isClickable) {
  let iconWidth = HtmlConfig.mapIconParams.width
  let iconHeight = HtmlConfig.mapIconParams.height

  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].type === 'camera_car' || dataList[i].type === 'camera_face' ||
      dataList[i].type === 'smokeDetector') {
      iconWidth = HtmlConfig.mapIconParams.maxWidth
      iconHeight = HtmlConfig.mapIconParams.maxHeight
    }
    addPointsLayer(dataList[i].villageID + '_' + dataList[i].layername.trim(), dataList[i].type.trim(), dataList[i].data,
      new MapPointStyle(iconWidth, iconHeight, HtmlConfig.mapIconParams.styles, -10, -34, 0), isLabel,
      HtmlConfig.mapIconParams.extension, isClickable)
  }
}
// 获取出入口信息
let getInOutListfromDB = function (params) {
  return new Promise(function (resolve, reject) {
    Post({
      async: true,
      url: apiNames['inOutList'],
      data: params,
      datatype: 'json',
      success: function (data) {
        if (data.responseStatus.resultCode === 0) {
          try {
          // 0=车卡出入口 1=人卡出入口 2=门禁出入口
            if (data.inOuts !== undefined) {
              let inOutTypes = data.inOuts.filter(function (val) {
                return val.type === 0
              })
              if (inOutTypes !== undefined && inOutTypes.length > 0) {
                window.deviceTypeNames.push({ type: 'parking', typeName: '车辆卡口' })
              }
              // resolve(inOutTypes)
              if (inOutTypes !== undefined && inOutTypes.length > 0) {
                let villages = getUniqueVillageID(inOutTypes)
                for (let i = 0, len = villages.length; i < len; i++) {
                  let devices = inOutTypes.filter(function (device) {
                    return device.villageID.trim() === villages[i].villageID
                  })
                  dataCollection.push({villageID: villages[i].villageID, layername: 'parking', type: 'parking', data: devices})
                }
              }
              resolve()
            }
          } catch (err) {
            reject(err)
          }
        } else {
          console.log('获取出入口列表: ' + data.responseStatus.resultMessage)
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  })
}
// 获取自行车棚信息
let getBikeshedListfromDB = function (params) {
  return new Promise(function (resolve, reject) {
    Post({
      async: true,
      url: apiNames['getBikeshedList'],
      data: params,
      datatype: 'json',
      success: function (data) {
        if (data.responseStatus.resultCode === 0) {
          try {
          // if (data.bikesheds.length > 0) {
          //   window.deviceTypeNames.push({ type: 'bike', typeName: '自行车棚' })
          // }
          // resolve(data.bikesheds)
            if (data.bikesheds !== undefined && data.bikesheds.length > 0) {
              let villages = getUniqueVillageID(data.bikesheds)
              for (let i = 0, len = villages.length; i < len; i++) {
                let devices = data.bikesheds.filter(function (device) {
                  return device.villageID.trim() === villages[i].villageID
                })
                dataCollection.push({villageID: villages[i].villageID, layername: 'bike', type: 'bike', data: devices})
              }
            }
            resolve()
          } catch (err) {
            reject(err)
          }
        } else {
          console.log('获取车棚列表: ' + data.responseStatus.resultMessage)
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  })
}
// 从数据库获取楼栋列表
// var getBuildingsfromDB = function (params) {
//   return new Promise(function (resolve, reject) {
//     Post({
//       async: true,
//       url: apiNames['获取楼栋列表'],
//       data: params,
//       datatype: 'json',
//       success: function (data) {
//         if (data.responseStatus.resultCode === 0) {
//           try {
//             window.deviceTypeNames.push({ type: 'building', typeName: '楼栋' })
//             resolve(data.buildingList)
//           } catch (err) {
//             reject(err)
//           }
//         } else {
//           console.log('获取楼栋列表: ' + data.responseStatus.resultMessage)
//         }
//       },
//       error: function (error) {
//         console.log(error)
//       }
//     })
//   })
// }

// 从db获取设备数据列表
let getDevicesfromDB = function (params, type) {
  return new Promise(function (resolve, reject) {
    Post({
      async: true,
      url: apiNames[type],
      data: params,
      datatype: 'json',
      success: function (data) {
        if (data.responseStatus.resultCode === 0) {
          try {
            let villages = getUniqueVillageID(data.deviceList)
            for (let j = 0, len = villages.length; j < len; j++) {
              let allDevices = data.deviceList.filter(function (device) {
                return device.villageID.trim() === villages[j].villageID.trim()
              })
              if (allDevices !== undefined && allDevices.length > 0) {
                let typeNames = allDevices.map(function (val) {
                  return { type: val.type.trim(), typeName: val.typeName.trim() }
                })

                let obj = {}
                let types = typeNames.reduce(function (item, next) {
                  if (!obj[next.type.trim()]) { obj[next.type.trim()] = true && item.push(next) }
                  return item
                }, [])

                for (let i = 0; i < types.length; i++) {
                // 车卡、人脸摄像机不显示
                  if (types[i].type.trim() === 'camera_car' || types[i].type.trim() === 'camera_accessFace') {
                    continue
                  } else {
                    window.deviceTypeNames.push(types[i])
                    let devices = allDevices.filter(function (device) {
                      return device.type.trim() === types[i].type.trim()
                    })
                    dataCollection.push({ villageID: villages[j].villageID, layername: types[i].type.trim(), type: types[i].type.trim(), data: devices })
                  }
                }
              }
            }
            // resolve(dataCollection)
            resolve()
          } catch (err) {
            reject(err)
          }
        } else {
          console.log('获取设备列表：' + data.responseStatus.resultMessage)
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  })
}

// 记录当前地图范围至localstorage
let updateLocalStorage = function (key, extentStr) {
  let localExtent = JSON.parse(window.localStorage.getItem(key))
  if (localExtent != null) {
    let updated = false
    for (let i = 0; i < localExtent.length; i++) {
      if (localExtent[i].module === extentStr[0].module) {
        localExtent[i].extent = extentStr[0].extent
        updated = true
        break
      }
    }
    if (!updated) {
      localExtent.push(extentStr[0])
    }
    window.localStorage.setItem(key, JSON.stringify(localExtent))
  } else {
    window.localStorage.setItem(key, JSON.stringify(extentStr))
  }
}
// 从localstorage取地图范围
let getExtentFromLocal = function (key, moduleName) {
  let mExtent = null
  let localExtent = JSON.parse(window.localStorage.getItem(key))
  if (localExtent != null) {
    let user = localExtent.filter(function (item) {
      return item.userName === window.localStorage.getItem('userName')
    })
    let ext = user.filter(function (extent) {
      return extent.module === moduleName
    })
    if (ext.length !== 0) {
      mExtent = ext[0].extent
    }
  }
  return mExtent
}
// 获取围栏路径并绘制在地图上
let getFence = function () {
  let fenceList = dataCollection.filter(function (device) {
    return device.type.trim() === 'fence'
  })
  if (fenceList !== undefined && fenceList.length > 0) {
    for (let p = 0; p < fenceList.length; p++) {
      let headPoints = []
      let linePaths = []
      for (let i = 0; i < fenceList[p].data.length; i++) {
        if (fenceList[p].data[i].deviceParams === '') {
          continue
        }
        let path = JSON.parse(fenceList[p].data[i].deviceParams)
        let linePath = { name: fenceList[p].data[i].name, deviceID: fenceList[p].data[i].deviceID, path: path }

        for (let j = 0; j < path.length; j++) {
          let pointsItem = {
            name: fenceList[p].data[i].name,
            longitude: 0,
            latitude: 0,
            deviceID: fenceList[p].data[i].deviceID,
            type: fenceList[p].data[i].type,
            houseID: fenceList[p].data[i].houseID,
            buildingID: fenceList[p].data[i].buildingID,
            buildingNo: fenceList[p].data[i].buildingNo,
            state: fenceList[p].data[i].state,
            typeName: fenceList[p].data[i].typeName
          }

          pointsItem.longitude = path[j][0]
          pointsItem.latitude = path[j][1]
          headPoints.push(pointsItem)
        }
        linePaths.push(linePath)
      }

      addLinesLayer(fenceList[p].villageID + '_' + 'fence_line', linePaths, new MapLineStyle('#E472FF', 10, 1, MapLineType.Dashed), true)
      addPointsLayer(fenceList[p].villageID + '_' + 'fence_point', 'fence_point', headPoints,
        new MapPointStyle(HtmlConfig.mapIconParams.width, HtmlConfig.mapIconParams.height, HtmlConfig.mapIconParams.styles, -10, -15, 0), false,
        HtmlConfig.mapIconParams.extension, true)
    }
  }
}
// 根据点图层名添加点图层
let addLayer = function (layername, type, isClickable) {
  let dList = dataCollection.filter(function (device) {
    return device.type === type && layername.search(device.villageID) === 0
  })
  if (dList !== undefined && dList.length > 0) {
    addDataLayer(dList, true, isClickable)
  }
}
// 添加边界
let addBoundaryLayer = function (boundarys, style, layername) {
  let bounds = []
  for (let i = 0; i < boundarys.length; i++) {
    if (boundarys[i] === '') {
      continue
    } else {
      let geoObj = JSON.parse(boundarys[i])
      let objs = []
      objs.push(geoObj)
      bounds.push(objs)
    }
  }
  addPolygonLayer(layername, bounds, style)
}
// 显示图层及其文字标注
let showLayerAndLabel = function (layername, type, isClickable, isOnTop) {
  if (!isOnTop) {
    if (!showLayer(layername)) {
      addLayer(layername, type, isClickable)
    }
  } else {
    clearDataLayer(layername)
    clearDataLayer(layername + '_label')
    addLayer(layername, type, isClickable)
  }
  setLayerVisibility(true, layername + '_label')
  setLayerVisibility(true, layername)
}
// 隐藏图层及其文字标注
let hideLayerAndLabel = function (layername) {
  hideLayer(layername)
  setLayerVisibility(false, layername + '_label')
  setLayerVisibility(false, layername)
}
// id
let showLocation = function (param, type, layername, isClickable) {
  let data = []
  data.push(param)
  let tLayer = getLyrByName(layername)
  if (tLayer === undefined) {
    addPointsLayer(layername, type, data,
      new MapPointStyle(HtmlConfig.mapIconParams.width, HtmlConfig.mapIconParams.height, HtmlConfig.mapIconParams.styles, -10, -34, 0), false,
      HtmlConfig.mapIconParams.extension, isClickable)
  } else {
    insertDataIntoLayer(tLayer, type, data, new MapPointStyle(HtmlConfig.mapIconParams.width, HtmlConfig.mapIconParams.height, HtmlConfig.mapIconParams.styles, -10, -34, 0),
      HtmlConfig.mapIconParams.extension)
  }
}
let clearLocation = function (id) {

}
export {
  addDevices, createMap, updateLocalStorage, getExtentFromLocal, showLayerAndLabel, hideLayerAndLabel,
  getFence, addDataLayer, addBoundaryLayer, showLocation, clearLocation
}
