import esriLoader from 'esri-loader'
import { MapClass, MapOverLayer, MapType, MapExtent, MapLineType, CoorSystem } from './mapClass'
import remoteLoad from './remoteLoad.js'
import '../assets/css/mapIcon.css'
import '../assets/css/mapTip.css'

// 全局地图类
let mapClass = new MapClass()
// 全局地图参数
let mapParams

// var tooltip
let popTip
/**
 * 创建地图
 * @param {} extent 初始化地图范围
 * @param {string} container 地图容器
 * @param {function} callbackEvent(map) 回调函数
 */
let initMap = function (extent, container, mParams, callbackEvent) {
  mapParams = mParams
  let mExtent = new MapExtent(extent.xmin, extent.ymin, extent.xmax, extent.ymax)
  mapClass = new MapClass(container, mapParams.url, mExtent, mapParams.minzoom, mapParams.maxZoom)
  switch (mapParams.mapType) {
    case MapType.Esri:
      const options = {
        url: mapParams.apiUrl
      }
      esriLoader.loadScript(options).then(function () {
        esriLoader.loadCss(mapParams.apiCss)

        esriLoader.loadModules(['esri/map', 'esri/geometry/Extent', 'esri/layers/ArcGISTiledMapServiceLayer',
          'esri/geometry/Point', 'esri/SpatialReference'])
          .then(([Map, Extent, ArcGISTiledMapServiceLayer, Point, SpatialReference]) => {
            mapClass.map = new Map(container, {
              logo: false,
              slider: false,
              fitExtent: true
              // extent: new Extent({
              //   xmin: mapClass.mapExtent.xmin,
              //   ymin: mapClass.mapExtent.ymin,
              //   xmax: mapClass.mapExtent.xmax,
              //   ymax: mapClass.mapExtent.ymax
              // })
            })

            let spatialRef = new SpatialReference({ wkid: 4326 })
            let spatialRefName
            if (mapParams.spatialReference) {
              spatialRefName = mapParams.spatialReference.name
            }
            switch (spatialRefName) {
              case CoorSystem.sh_54: spatialRef = new SpatialReference(mapParams.spatialReference.content)
                break
            }
            let baseMapLayer = new ArcGISTiledMapServiceLayer(mapParams.url)
            mapClass.map.addLayer(baseMapLayer)

            mapClass.map.centerAndZoom(new Point((mapClass.mapExtent.xmin + mapClass.mapExtent.xmax) / 2,
              (mapClass.mapExtent.ymin + mapClass.mapExtent.ymax) / 2, spatialRef), mapParams.zoom)

            // if (mapParams.isShowTextAtMaxZoom) {
            //   mapClass.map.on('zoom', function (e) {
            //     // console.log(mapClass.map.getZoom())
            //     if (mapClass.map.getZoom() === mapParams.zooms[1]) {
            //       showLayer('label')
            //     } else {
            //       hideLayer('label')
            //     }
            //   })
            // }

            // mapClass.map.on('click', function (ev) { alert(ev.mapPoint.x + ',' + ev.mapPoint.y) })

            return Promise.resolve(mapClass.map)
          })
          .then(function (map) {
            callbackEvent(map)
          })
          .catch(err => {
            console.error(err)
            callbackEvent(null)
          })
      })
      break
    case MapType.Gaode:
      remoteLoad(mapClass.baseMapURL).then(function () {
        setTimeout(() => {
          // mExtent 转高德
          let pt = wgs84ToGaode([
            [mapClass.mapExtent.xmin, mapClass.mapExtent.ymin],
            [mapClass.mapExtent.xmax, mapClass.mapExtent.ymax]
          ])

          mapClass.map = new window.AMap.Map(container, {
            resizeEnable: true,
            mapStyle: mapParams.mapstyle,
            center: [(pt[0][0] + pt[1][0]) / 2, (pt[0][1] + pt[1][1]) / 2],
            zooms: mapParams.zooms,
            zoom: mapParams.viewMode === '2D' ? Math.round(mapParams.zoom - 0.5) : mapParams.zoom,
            viewMode: mapParams.viewMode,
            pitch: mapParams.pitch,
            expandZoomRange: mapParams.expandZoomRange
          })

          if (mapParams.isShowTextAtMaxZoom) {
            mapClass.map.on('zoomchange', function () {
              // console.log(mapClass.map.getZoom())
              showLayerAtMaxZoom()
            })
          }
          callbackEvent(mapClass.map)
        }, 300)
      })
      break
    case MapType.GA:
      let pts = wgs84ToGaode([
        [mapClass.mapExtent.xmin, mapClass.mapExtent.ymin],
        [mapClass.mapExtent.xmax, mapClass.mapExtent.ymax]
      ])

      let centerX = (pts[0][0] + pts[1][0]) / 2
      let centerY = (pts[0][1] + pts[1][1]) / 2
      setTimeout(() => {
        mapClass.map = new window.IMAP.Map(container, {
          minZoom: mapParams.zooms[0],
          maxZoom: mapParams.zooms[1],
          zoom: mapParams.zoom,
          center: new window.IMAP.LngLat(centerX, centerY)
        })
        if (mapParams.isShowTextAtMaxZoom) {
          mapClass.map.addEventListener(window.IMAP.Constants.ZOOM_END, function () {
            showLayerAtMaxZoom()
          })
        }
        callbackEvent(mapClass.map)
      }, 300)
      break
    case MapType.Tianditu:
      setTimeout(() => {
        mapClass.map = window.L.map(container, {
          crs: window.L.CRS.CustomEPSG4326,
          center: [(mapClass.mapExtent.xmin + mapClass.mapExtent.xmax) / 2,
            (mapClass.mapExtent.ymin + mapClass.mapExtent.ymax) / 2],
          zoom: mapParams.zoom,
          minZoom: mapParams.zooms[0],
          maxZoom: mapParams.zooms[1],
          zoomControl: false
          // trackResize: true
        })
        // 添加底图
        let layer = new window.L.GXYZ(mapParams.url)
        mapClass.map.addLayer(layer)

        // // 添加注记图层
        // var labelLayer = new window.L.GWVTAnno('GWVTAnno')
        // var dataSource = new window.Custom.URLDataSource()
        // /* eslint-disable-next-line */
        // dataSource.url = 'http://118.178.118.175/mapserver/label/zjvmap/getDatas?x=${x}&y=${y}&l=${z}&styleId=tdt_biaozhunyangshi_2017'
        // labelLayer.addDataSource(dataSource)
        // mapClass.map.addLayer(labelLayer)

        if (mapParams.isShowTextAtMaxZoom) {
          mapClass.map.on('zoomend', function () {
            // console.log(mapClass.map.getZoom())
            showLayerAtMaxZoom()
          })
        }
        callbackEvent(mapClass.map)
      }, 300)

      break
  }
}

/**
 * 添加点图层
 * @param {string} layername 图层名
 * @param {[{}]} geoObj 构成图层的几何集合 {name: '', deviceID: '', longitude:'',latitude:''}
 * @param {MapPointStyle} style 点样式
 * @param {Boolean} isLabel 是否标注
 */
let addPointsLayer = function (layername, type, geoObj, style, isLabel, extension, isClickable) {
  if (mapClass.map === undefined || geoObj == null) return
  if (geoObj.length > 0) {
    let markerList = []
    switch (mapParams.mapType) {
      case MapType.Esri:
        esriLoader.loadModules(['esri/layers/GraphicsLayer', 'esri/geometry/Point', 'esri/graphic',
          'esri/symbols/PictureMarkerSymbol', 'esri/symbols/TextSymbol', 'esri/SpatialReference'])
          .then(([GraphicsLayer, Point, Graphic, PictureMarkerSymbol, TextSymbol, SpatialReference]) => {
            let glayer = new GraphicsLayer()

            for (let i = 0, len = geoObj.length; i < len; i++) {
              if (geoObj[i].longitude == null || geoObj[i].latitude == null) continue
              if (geoObj[i].longitude === 0 || geoObj[i].latitude === 0) continue
              let xCoor = geoObj[i].longitude
              let yCoor = geoObj[i].latitude
              let spatialRef = new SpatialReference({ wkid: 4326 })
              let spatialRefName
              if (mapParams.spatialReference) {
                spatialRefName = mapParams.spatialReference.name
              }
              switch (spatialRefName) {
                case CoorSystem.sh_54: spatialRef = new SpatialReference(mapParams.spatialReference.content)
                  break
              }
              let pt = new Point(xCoor, yCoor, spatialRef)
              let marker = new Graphic(pt)
              geoObj[i].type = type
              marker.setAttributes(geoObj[i])

              let picSymbol

              if (geoObj[i].state !== undefined) {
                let status = ''
                switch (geoObj[i].state) {
                  case 0: status = 'offline'; break
                  case 1: status = 'online'; break
                  case 2: status = 'broken'; break
                }
                picSymbol = new PictureMarkerSymbol(require('../assets/images/maps/' + style.baseUrl + '/' + status + '/' + type + extension), style.width, style.height)
              } else {
                picSymbol = new PictureMarkerSymbol(require('../assets/images/maps/' + style.baseUrl + '/' + type + extension), style.width, style.height)
              }
              marker.setSymbol(picSymbol)
              glayer.add(marker)
            }
            mapClass.map.addLayer(glayer)
            if (isClickable) {
              glayer.on('click', function (e) {
                if (window.mapPointClicked !== undefined && window.mapPointClicked !== null) { window.mapPointClicked(e.graphic.attributes) }
              })
            }
            mapClass.layers.push(new MapOverLayer(layername, glayer, true))
          })
          .catch(err => {
            console.error(err)
          })
        break
      case MapType.Gaode:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          if (geoObj[i].longitude == null || geoObj[i].latitude == null) continue
          if (geoObj[i].longitude === 0 || geoObj[i].latitude === 0) continue

          let pt = wgs84ToGaode([[geoObj[i].longitude, geoObj[i].latitude]])
          let content
          if (geoObj[i].state !== undefined) {
            content = '<div class="' + ' marker-' + type + '-' + geoObj[i].state + '-' + style.baseUrl + '"></div>'
          } else {
            content = '<div class="marker-' + type + '-' + style.baseUrl + '"></div>'
          }
          geoObj[i].type = type
          let marker = new window.AMap.Marker({
            map: mapClass.map,
            position: [pt[0][0], pt[0][1]],
            extData: geoObj[i],
            content: content,
            offset: new window.AMap.Pixel(style.xOffset, style.yOffset)
          })

          // marker.setMap(mapClass.map)
          markerList.push(marker)
          if (isClickable) {
            marker.on('click', function (e) {
              if (window.mapPointClicked !== undefined && window.mapPointClicked !== null) { window.mapPointClicked(e.target.getExtData()) }
            })
          }
          if (mapParams.isShowTextAtMaxZoom && isLabel) {
            let tLayer = getLyrByName(layername + '_label')
            if (tLayer === undefined) {
              tLayer = []
              mapClass.layers.push(new MapOverLayer(layername + '_label', tLayer, true))
            }
            let text = new window.AMap.Text({
              // draggable: true,
              text: geoObj[i].name,
              textAlign: 'center',
              verticalAlign: 'middle',
              style: {
                'backgroundColor': '#091e38',
                'padding': '5px 10px',
                'color': 'white'
              },
              offset: new window.AMap.Pixel(20, 30),
              position: [pt[0][0], pt[0][1]]
            })
            text.setMap(null)
            tLayer.push(text)
          }
        }
        mapClass.layers.push(new MapOverLayer(layername, markerList, true))
        break
      case MapType.GA:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          if (geoObj[i].longitude == null || geoObj[i].latitude == null) continue
          if (geoObj[i].longitude === 0 || geoObj[i].latitude === 0) continue

          let pt = wgs84ToGaode([[geoObj[i].longitude, geoObj[i].latitude]])
          let opts = new window.IMAP.MarkerOptions()
          opts.anchor = window.IMAP.Constants.BOTTOM_CENTER

          if (geoObj[i].state !== undefined) {
            let status = ''
            switch (geoObj[i].state) {
              case 0: status = 'offline'; break
              case 1: status = 'online'; break
              case 2: status = 'broken'; break
            }
            opts.icon = new window.IMAP.Icon(require('../assets/images/maps/' + style.baseUrl + '/' + status + '/' + type + extension), { 'size': new window.IMAP.Size(style.width, style.height) })
          } else {
            opts.icon = new window.IMAP.Icon(require('../assets/images/maps/' + style.baseUrl + '/' + type + extension), { 'size': new window.IMAP.Size(style.width, style.height) })
          }
          // if (layername.trim() === 'parking') {
          //   opts.icon = new window.IMAP.Icon(require(style.baseUrl + layername.trim() + '.png'), style.width, style.height)
          // }
          opts.editabled = false
          opts.visible = true
          let marker = new window.IMAP.Marker(new window.IMAP.LngLat(pt[0][0], pt[0][1]), opts)
          geoObj[i].type = type
          marker.D = geoObj[i]
          mapClass.map.getOverlayLayer().addOverlay(marker, true)
          markerList.push(marker)
          if (isClickable) {
            marker.addEventListener(window.IMAP.Constants.CLICK, function (evt) {
              if (window.mapPointClicked !== undefined && window.mapPointClicked !== null) { window.mapPointClicked(evt.target.D) }
            })
          }

          if (mapParams.isShowTextAtMaxZoom && isLabel) {
            let tLayer = getLyrByName(layername + '_label')
            if (tLayer === undefined) {
              tLayer = []
              mapClass.layers.push(new MapOverLayer(layername + '_label', tLayer, true))
            }
            let text = new window.IMAP.Label('', {
              type: window.IMAP.Constants.OVERLAY_LABEL_HTML,
              position: new window.IMAP.LngLat(pt[0][0], pt[0][1]),
              offset: new window.IMAP.Pixel(10, 20),
              anchor: window.IMAP.Constants.BOTTOM_CENTER
            })
            let content = '<div class="textContainer">' + geoObj[i].name + '</div>'
            text.setContent(content)
            tLayer.push(text)
          }
        }
        mapClass.layers.push(new MapOverLayer(layername, markerList, true))
        break
      case MapType.Tianditu:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          if (geoObj[i].longitude == null || geoObj[i].latitude == null) continue
          if (geoObj[i].longitude === 0 || geoObj[i].latitude === 0) continue

          let customIconDiv
          if (geoObj[i].state !== undefined) {
            customIconDiv = window.L.divIcon({
              className: 'marker-' + type + '-' + geoObj[i].state + '-' + style.baseUrl,
              iconSize: [style.width, style.height]
            })
          } else {
            customIconDiv = window.L.divIcon({
              className: 'marker-' + type + '-' + style.baseUrl,
              iconSize: [style.width, style.height]
            })
          }
          geoObj[i].type = type
          let marker = window.L.marker(
            [geoObj[i].latitude, geoObj[i].longitude],
            {
              icon: customIconDiv,
              alt: geoObj[i]
            })

          markerList.push(marker)

          if (isClickable) {
            marker.on('click', function (e) {
              if (window.mapPointClicked !== undefined && window.mapPointClicked !== null) { window.mapPointClicked(e.target.options.alt) }
            })
          }
          if (mapParams.isShowTextAtMaxZoom && isLabel) {
            let tLayer = getLyrByName(layername + '_label')
            if (tLayer === undefined) {
              tLayer = window.L.layerGroup()
              mapClass.layers.push(new MapOverLayer(layername + '_label', tLayer, true))
            }

            let textDiv = window.L.divIcon({
              html: geoObj[i].name,
              className: 'textContainer',
              iconAnchor: [35, -23]
            })
            let text = window.L.marker(
              [geoObj[i].latitude, geoObj[i].longitude],
              {
                icon: textDiv
              })

            tLayer.addLayer(text)
          }
        }
        let groupLayer = window.L.layerGroup(markerList).addTo(mapClass.map)
        mapClass.layers.push(new MapOverLayer(layername, groupLayer, true))
        break
    }
  }
}
/**
 * 添加线图层
 * @param {string} layername 图层名
 * @param {[]} geoObj 构成图层的几何集合 {name: '', deviceID: '', path: [[],[]]}
 * @param {MapLineStyle} style 线样式
 * @param {Boolean} isLabel 是否标注
 */
let addLinesLayer = function (layername, geoObj, style, isLabel) {
  if (mapClass.map === undefined || geoObj == null) return
  if (geoObj.length > 0) {
    let markerlist = []
    switch (mapParams.mapType) {
      case MapType.Esri:
        esriLoader.loadModules(['esri/layers/GraphicsLayer', 'esri/geometry/Polyline', 'esri/graphic',
          'esri/symbols/SimpleLineSymbol', 'esri/Color'])
          .then(([GraphicsLayer, Polyline, Graphic, SimpleLineSymbol, Color]) => {
            let glayer = new GraphicsLayer()
            for (let i = 0, len = geoObj.length; i < len; i++) {
              let paths = geoObj[i].path
              let polyline = new Polyline(paths)
              let marker = new Graphic(polyline)

              let lineStyle = style.lineType === MapLineType.Dashed ? SimpleLineSymbol.STYLE_DASH : SimpleLineSymbol.STYLE_SOLID

              let fcolor = new Color(style.color)
              if (style.opacity !== 1) {
                fcolor.a = style.opacity
              }

              let lSymbol = new SimpleLineSymbol(lineStyle, fcolor, style.width)
              // var lSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([245, 113, 6, 0.85]), 8)
              marker.setSymbol(lSymbol)
              glayer.add(marker)
            }
            mapClass.map.addLayer(glayer)
            mapClass.layers.push(new MapOverLayer(layername, glayer, true))
          })
        break
      case MapType.Gaode:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          let pts = wgs84ToGaode(geoObj[i].path)
          let centerX = (pts[0][0] + pts[pts.length - 1][0]) / 2
          let centerY = (pts[0][1] + pts[pts.length - 1][1]) / 2

          let polyline = new window.AMap.Polyline({
            path: pts
          })

          polyline.setOptions({
            strokeWeight: style.width,
            strokeOpacity: style.opacity,
            strokeColor: style.color,
            // lineCap: 'round',
            strokeStyle: style.lineType.toLowerCase()
          })
          polyline.setMap(mapClass.map)
          markerlist.push(polyline)

          if (mapParams.isShowTextAtMaxZoom && isLabel) {
            let tLayer = getLyrByName(layername + '_label')
            if (tLayer === undefined) {
              tLayer = []
              mapClass.layers.push(new MapOverLayer(layername + '_label', tLayer, true))
            }

            let text = new window.AMap.Text({
              text: geoObj[i].name,
              textAlign: 'center',
              verticalAlign: 'middle',
              style: {
                'backgroundColor': '#091e38',
                'padding': '5px 10px',
                'color': 'white'
              },
              offset: new window.AMap.Pixel(20, 30),
              position: [centerX, centerY]
            })

            text.setMap(null)
            tLayer.push(text)
          }
        }
        mapClass.layers.push(new MapOverLayer(layername, markerlist, true))
        break
      case MapType.GA:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          let pts = wgs84ToGaode(geoObj[i].path)
          let path = []
          for (let i = 0; i < pts.length; i++) {
            path.push(new window.IMAP.LngLat(pts[i][0], pts[i][1]))
          }
          let centerX = (pts[0][0] + pts[pts.length - 1][0]) / 2
          let centerY = (pts[0][1] + pts[pts.length - 1][1]) / 2

          let polyline = new window.IMAP.Polyline(path, {
            strokeWeight: style.width,
            strokeOpacity: style.opacity,
            strokeColor: style.color,
            // lineCap: 'round',
            strokeStyle: style.lineType.toLowerCase() === 'dashed' ? window.IMAP.Constants.OVERLAY_LINE_DASHED : window.IMAP.Constants.OVERLAY_LINE_SOLID
          })

          mapClass.map.getOverlayLayer().addOverlay(polyline, true)
          markerlist.push(polyline)

          if (mapParams.isShowTextAtMaxZoom && isLabel) {
            let tLayer = getLyrByName(layername + '_label')
            if (tLayer === undefined) {
              tLayer = []
              mapClass.layers.push(new MapOverLayer(layername + '_label', tLayer, true))
            }

            let text = new window.IMAP.Label('', {
              type: window.IMAP.Constants.OVERLAY_LABEL_HTML,
              position: new window.IMAP.LngLat(centerX, centerY),
              offset: new window.IMAP.Pixel(10, 20),
              anchor: window.IMAP.Constants.BOTTOM_CENTER
            })
            let content = '<div class="textContainer">' + geoObj[i].name + '</div>'
            text.setContent(content)
            tLayer.push(text)
          }
        }
        mapClass.layers.push(new MapOverLayer(layername, markerlist, true))
        break
      case MapType.Tianditu:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          let latlngs = geoObj[i].path.map(function (val) {
            return [val[1], val[0]]
          })
          let polyline = window.L.polyline(latlngs,
            {
              color: style.color,
              dashArray: style.lineType.toLowerCase() === 'dashed' ? [20, 20] : null,
              weight: style.width,
              opacity: style.opacity
            })

          markerlist.push(polyline)

          if (mapParams.isShowTextAtMaxZoom && isLabel) {
            let tLayer = getLyrByName(layername + '_label')
            if (tLayer === undefined) {
              tLayer = window.L.layerGroup()
              mapClass.layers.push(new MapOverLayer(layername + '_label', tLayer, true))
            }
            let pathLen = geoObj[i].path.length

            let centerY = (geoObj[i].path[0][0] + geoObj[i].path[pathLen - 1][0]) / 2
            let centerX = (geoObj[i].path[0][1] + geoObj[i].path[pathLen - 1][1]) / 2

            let textDiv = window.L.divIcon({
              html: geoObj[i].name,
              className: 'textContainer',
              iconAnchor: [35, -10]
            })
            let text = window.L.marker(
              [centerY, centerX],
              {
                icon: textDiv
              })

            tLayer.addLayer(text)
          }
        }
        let groupLayer = window.L.layerGroup(markerlist).addTo(mapClass.map)
        mapClass.layers.push(new MapOverLayer(layername, groupLayer, true))
        break
    }
  }
}
/**
 * 添加面图层
 * @param {string} layername 图层名
 * @param {[]} geoObj 构成图层的几何集合
 * @param {MapPolygonStyle} style 面样式
 */
let addPolygonLayer = function (layername, geoObj, style) {
  if (mapClass.map === undefined || geoObj == null) return
  if (geoObj.length > 0) {
    let markerlist = []
    switch (mapParams.mapType) {
      case MapType.Esri:
        esriLoader.loadModules(['esri/layers/GraphicsLayer', 'esri/geometry/Polygon', 'esri/graphic',
          'esri/symbols/SimpleFillSymbol', 'esri/symbols/SimpleLineSymbol', 'esri/Color'])
          .then(([GraphicsLayer, Polygon, Graphic, SimpleFillSymbol, SimpleLineSymbol, Color]) => {
            let glayer = new GraphicsLayer()
            for (let i = 0, len = geoObj.length; i < len; i++) {
              let polygon = new Polygon(geoObj[i])
              let marker = new Graphic(polygon)

              let fillStyle = SimpleFillSymbol.STYLE_NULL
              let lineStyle = SimpleLineSymbol.STYLE_NULL
              let fcolor = new Color([255, 255, 255, 0])
              let outlinecolor = new Color([255, 255, 255, 0])
              let strokeWeight = 0

              if (style.strokeType === MapLineType.Solid) {
                lineStyle = SimpleLineSymbol.STYLE_SOLID
              } else if (style.strokeType === MapLineType.Dashed) {
                lineStyle = SimpleLineSymbol.STYLE_DASH
              }

              if (style.fillColor != null) {
                fcolor = new Color(style.fillColor)
                fillStyle = SimpleFillSymbol.STYLE_SOLID
              }
              if (style.fillOpacity !== 1) {
                fcolor.a = style.fillOpacity
              }
              if (style.strokeColor != null) {
                outlinecolor = new Color(style.strokeColor)
              }
              if (style.strokeOpacity !== 1) {
                outlinecolor.a = style.strokeOpacity
              }
              if (style.strokeWeight !== 0) {
                strokeWeight = style.strokeWeight
              }

              let fSymbol = new SimpleFillSymbol(fillStyle,
                new SimpleLineSymbol(lineStyle, outlinecolor, strokeWeight), fcolor)

              marker.setSymbol(fSymbol)
              glayer.add(marker)
            }

            mapClass.map.addLayer(glayer)
            mapClass.layers.push(new MapOverLayer(layername, glayer, true))
          })
        break
      case MapType.Gaode:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          for (let j = 0, lens = geoObj[i].length; j < lens; j++) {
            let pts = wgs84ToGaode(geoObj[i][j])
            let polygon = new window.AMap.Polygon({
              path: pts
            })

            if (style.fillColor != null) {
              polygon.setOptions({
                fillColor: style.fillColor
              })
            }
            if (style.fillOpacity !== 1) {
              polygon.setOptions({
                fillOpacity: style.fillOpacity
              })
            }
            if (style.strokeColor != null) {
              polygon.setOptions({
                strokeColor: style.strokeColor
              })
            }
            if (style.strokeOpacity !== 1) {
              polygon.setOptions({
                strokeOpacity: style.strokeOpacity
              })
            }
            if (style.strokeWeight !== 0) {
              polygon.setOptions({
                strokeWeight: style.strokeWeight
              })
            }
            if (style.strokeType === MapLineType.Dashed) {
              polygon.setOptions({
                strokeStyle: 'dashed',
                strokeDasharray: [10, 5]
              })
            }
            polygon.setMap(mapClass.map)
            markerlist.push(polygon)
          }
        }
        mapClass.layers.push(new MapOverLayer(layername, markerlist, true))
        break
      case MapType.GA:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          for (let j = 0, lens = geoObj[i].length; j < lens; j++) {
            let pts = wgs84ToGaode(geoObj[i][j])
            let path = []
            for (let i = 0; i < pts.length; i++) {
              let x = pts[i][0]
              let y = pts[i][1]
              path.push(new window.IMAP.LngLat(x, y))
            }
            let polygon = new window.IMAP.Polygon(path, {
              fillColor: style.fillColor,
              fillOpacity: style.fillOpacity,
              strokeColor: style.strokeColor,
              strokeOpacity: style.strokeOpacity,
              strokeWeight: style.strokeWeight,
              strokeStyle: style.strokeType === MapLineType.Dashed ? window.IMAP.Constants.OVERLAY_LINE_DASHED : window.IMAP.Constants.OVERLAY_LINE_SOLID
            })

            mapClass.map.getOverlayLayer().addOverlay(polygon, true)
            markerlist.push(polygon)
          }
        }
        mapClass.layers.push(new MapOverLayer(layername, markerlist, true))
        break
      case MapType.Tianditu:
        for (let i = 0, len = geoObj.length; i < len; i++) {
          for (let j = 0, lens = geoObj[i].length; j < lens; j++) {
            let latlngs = geoObj[i][j].map(function (val) {
              return [val[1], val[0]]
            })
            let polygon = window.L.polygon(latlngs, {
              color: style.strokeColor,
              fillColor: style.fillColor,
              fillOpacity: style.fillOpacity,
              weight: style.strokeWeight
            })

            markerlist.push(polygon)
          }
        }
        let groupLayer = window.L.layerGroup(markerlist).addTo(mapClass.map)
        mapClass.layers.push(new MapOverLayer(layername, groupLayer, true))
        break
    }
  }
}
/**
 * 清除点/线/面图层
 * @param {string} layername 图层名layername=undefined则清空所有数据
 */
let clearDataLayer = function (layername) {
  let len = mapClass.layers.length
  if (len === 0) return
  if (layername === undefined) {
    switch (mapParams.mapType) {
      case MapType.Esri:
        for (let i = 0; i < len; i++) {
          mapClass.layers[i].layer.clear()
        }
        break
      case MapType.Gaode:
        mapClass.map.clearMap()
        break
      case MapType.GA:
        mapClass.map.clearOverlays()
        break
      case MapType.Tianditu:
        for (let i = 0; i < len; i++) {
          mapClass.map.removeLayer(mapClass.layers[i].layer)
        }
        break
    }
    mapClass.layers.splice(0, len)
  } else {
    let index = getLyrIndexByName(layername)
    if (index !== -1) {
      switch (mapParams.mapType) {
        case MapType.Esri:
          mapClass.layers[index].layer.clear()
          break
        case MapType.Gaode:
          mapClass.map.remove(mapClass.layers[index].layer)
          break
        case MapType.GA:
        case MapType.Tianditu:
          mapClass.map.removeLayer(mapClass.layers[index].layer)
          break
      }
      mapClass.layers.splice(index, 1)
    }
  }
}
/**
 * 通过图层名获取图层index
 * @param {string} lyrname 返回-1则找不到
 */
let getLyrIndexByName = function (lyrname) {
  for (let i = 0, len = mapClass.layers.length; i < len; i++) {
    if (mapClass.layers[i].name === lyrname) {
      return i
    }
  }
  return -1
}
// var getElementByIndex = function (index, layerName) {
//   let layer = getLyrByName(layerName)

// }
/**
 * 根据图层名获取渲染数据图层
 * @param {string} lyrname 图层名
 */
let getLyrByName = function (lyrname) {
  for (let i = 0, len = mapClass.layers.length; i < len; i++) {
    if (mapClass.layers[i].name === lyrname) {
      return mapClass.layers[i].layer
    }
  }
}
/**
 * 根据图层名关键字获取图层名
 * @param {string} key 关键字
 */
let getLyrFullName = function (key) {
  let fullNames = []
  for (let i = 0, len = mapClass.layers.length; i < len; i++) {
    if (mapClass.layers[i].name.indexOf(key) !== -1) {
      fullNames.push(mapClass.layers[i].name)
    }
  }
  return fullNames
}
/**
 * 获得可见图层名称
 * @param {Boolean} visible 可见性
 */
let getLayerNamebyVisibility = function (visible) {
  let layers = []
  for (let i = 0, len = mapClass.layers.length; i < len; i++) {
    if (mapClass.layers[i].visible === visible) {
      layers.push(mapClass.layers[i].name)
    }
  }
  return layers
}
/**
 * 设置图层可见性
 * @param {Boolean} visible  可见性
 * @param {string} layername 图层名
 */
let setLayerVisibility = function (visible, layername) {
  for (let i = 0, len = mapClass.layers.length; i < len; i++) {
    if (mapClass.layers[i].name === layername) {
      mapClass.layers[i].visible = visible
      break
    }
  }
}
let insertDataIntoLayer = function (layer, type, geoObj, style, extension) {
  switch (mapParams.mapType) {
    case MapType.Esri:
      esriLoader.loadModules(['esri/geometry/Point', 'esri/graphic',
        'esri/symbols/PictureMarkerSymbol', 'esri/SpatialReference'])
        .then(([Point, Graphic, PictureMarkerSymbol, SpatialReference]) => {
          for (let i = 0, len = geoObj.length; i < len; i++) {
            if (geoObj[i].longitude == null || geoObj[i].latitude == null) continue
            if (geoObj[i].longitude === 0 || geoObj[i].latitude === 0) continue
            let xCoor = geoObj[i].longitude
            let yCoor = geoObj[i].latitude
            let spatialRef = new SpatialReference({ wkid: 4326 })
            let spatialRefName
            if (mapParams.spatialReference) {
              spatialRefName = mapParams.spatialReference.name
            }
            switch (spatialRefName) {
              case CoorSystem.sh_54: spatialRef = new SpatialReference(mapParams.spatialReference.content)
                break
            }
            let pt = new Point(xCoor, yCoor, spatialRef)
            let marker = new Graphic(pt)
            geoObj[i].type = type
            marker.setAttributes(geoObj[i])

            let picSymbol

            if (geoObj[i].state !== undefined) {
              let status = ''
              switch (geoObj[i].state) {
                case 0: status = 'offline'; break
                case 1: status = 'online'; break
                case 2: status = 'broken'; break
              }
              picSymbol = new PictureMarkerSymbol(require('../assets/images/maps/' + style.baseUrl + '/' + status + '/' + type + extension), style.width, style.height)
            } else {
              picSymbol = new PictureMarkerSymbol(require('../assets/images/maps/' + style.baseUrl + '/' + type + extension), style.width, style.height)
            }
            marker.setSymbol(picSymbol)
            layer.add(marker)
          }
        })
        .catch(err => {
          console.error(err)
        })
      break
    case MapType.GA:
      for (let i = 0, len = geoObj.length; i < len; i++) {
        let pt = wgs84ToGaode([[geoObj[i].longitude, geoObj[i].latitude]])

        let opts = new window.IMAP.MarkerOptions()
        opts.anchor = window.IMAP.Constants.BOTTOM_CENTER

        if (geoObj[i].state !== undefined) {
          let status = ''
          switch (geoObj[i].state) {
            case 0: status = 'offline'; break
            case 1: status = 'online'; break
            case 2: status = 'broken'; break
          }
          opts.icon = new window.IMAP.Icon(require('../assets/images/maps/' + style.baseUrl + '/' + status + '/' + type + extension), { 'size': new window.IMAP.Size(style.width, style.height) })
        } else {
          opts.icon = new window.IMAP.Icon(require('../assets/images/maps/' + style.baseUrl + '/' + type + extension), { 'size': new window.IMAP.Size(style.width, style.height) })
        }
        opts.editabled = false
        opts.visible = true
        let marker = new window.IMAP.Marker(new window.IMAP.LngLat(pt[0][0], pt[0][1]), opts)
        geoObj[i].type = type
        marker.D = geoObj[i]
        mapClass.map.getOverlayLayer().addOverlay(marker, true)
        layer.push(marker)
      }
      break
    case MapType.Gaode:
      for (let i = 0, len = geoObj.length; i < len; i++) {
        let pt = wgs84ToGaode([[geoObj[i].longitude, geoObj[i].latitude]])
        let content
        if (geoObj[i].state !== undefined) {
          content = '<div class="' + ' marker-' + type + '-' + geoObj[i].state + '-' + style.baseUrl + '"></div>'
        } else {
          content = '<div class="marker-' + type + '-' + style.baseUrl + '"></div>'
        }
        geoObj[i].type = type
        let marker = new window.AMap.Marker({
          map: mapClass.map,
          position: [pt[0][0], pt[0][1]],
          extData: geoObj[i],
          content: content,
          offset: new window.AMap.Pixel(style.xOffset, style.yOffset)
        })
        layer.push(marker)
      }
      break
    case MapType.Tianditu:
      for (let i = 0, len = geoObj.length; i < len; i++) {
        let customIconDiv
        if (geoObj[i].state !== undefined) {
          customIconDiv = window.L.divIcon({
            className: 'marker-' + type + '-' + geoObj[i].state + '-' + style.baseUrl,
            iconSize: [style.width, style.height]
          })
        } else {
          customIconDiv = window.L.divIcon({
            className: 'marker-' + type + '-' + style.baseUrl,
            iconSize: [style.width, style.height]
          })
        }
        geoObj[i].type = type
        let marker = window.L.marker(
          [geoObj[i].latitude, geoObj[i].longitude],
          {
            icon: customIconDiv,
            alt: geoObj[i]
          })
        layer.addLayer(marker)
      }
      break
  }
}
/**
 * 显示陌生人气泡
 * @param {Number} x x坐标
 * @param {Number} y y坐标
 * @param {string} inLoc 进入位置
 * @param {string} firstLoc 首次出现位置
 * @param {string} inTime 进入时间
 * @param {string} firstTime 首次出现时间
 * @param {Number} similarity 相似性
 * @param {string} inPic 进入抓拍图片
 * @param {string} firstPic 首次进入抓拍图片
 */
let showStranger = function (x, y, inLoc, firstLoc, inTime, firstTime, similarity, inPic, firstPic) {
  let content
  switch (mapParams.mapType) {
    case MapType.Esri:
    case MapType.GA:
      content = '<div class="map-bubbleStranger-esri"><h2>陌生人比对</h2><div class="map-capturePic"><div class="left"><h3>实时抓拍</h3><div>' +
        '<div class="map-tv-1"><div><img class="map-BubbleImg" src="' + inPic + '" alt=""/></div></div></div><p>' + inTime + '</p><p>' + inLoc + '</p></div><div class="middle"><span>相似度' + similarity + '%</span></div>' +
        '<div class="right"><h3>首次出现</h3><div><div class="map-tv-2"><div><img class="map-BubbleImg" src="' + firstPic + '" alt=""/></div></div></div><p>' + firstTime + '</p><p>' + firstLoc + '</p></div></div></div>'
      break
    case MapType.Gaode:
      content = '<div class="map-bubbleStranger-gd"><h2>陌生人比对</h2><div class="map-capturePic"><div class="left"><h3>实时抓拍</h3><div>' +
        '<div class="map-tv-1"><div><img class="map-BubbleImg" src="' + inPic + '" alt=""/></div></div></div><p>' + inTime + '</p><p>' + inLoc + '</p></div><div class="middle"><span>相似度' + similarity + '%</span></div>' +
        '<div class="right"><h3>首次出现</h3><div><div class="map-tv-2"><div><img class="map-BubbleImg" src="' + firstPic + '" alt=""/></div></div></div><p>' + firstTime + '</p><p>' + firstLoc + '</p></div></div><div class="map-bubbleSharp"></div></div>'
      break
    case MapType.Tianditu:
      content = '<div class="map-bubbleStranger-gd map-pop-mouse"><h2>陌生人比对</h2><div class="map-capturePic"><div class="left"><h3>实时抓拍</h3><div>' +
        '<div class="map-tv-1"><div><img class="map-BubbleImg" src="' + inPic + '" alt=""/></div></div></div><p>' + inTime + '</p><p>' + inLoc + '</p></div><div class="middle"><span>相似度' + similarity + '%</span></div>' +
        '<div class="right"><h3>首次出现</h3><div><div class="map-tv-2"><div><img class="map-BubbleImg" src="' + firstPic + '" alt=""/></div></div></div><p>' + firstTime + '</p><p>' + firstLoc + '</p></div></div><div class="map-bubbleSharp"></div></div>'
      break
  }

  showPopup(x, y, content, 1)
}
/**
 * 显示视频气泡
 * @param {Number} x x坐标
 * @param {Number} y y坐标
 * @param {string} title 标题
 * @param {string} streamSource 视频链接
 */
let showVideo = function (x, y, title, streamSource) {
  let content
  switch (mapParams.mapType) {
    case MapType.Esri:
    case MapType.GA:
      content = '<div class="map-bubbleVideo-esri"><h2>' + title + '</h2><div class="map-video"></div></div>'
      break
    case MapType.Gaode:
      content = '<div class="map-bubbleVideo-gd"><h2>' + title + '</h2><div class="map-video"></div><div class="map-bubbleSharpVideo"></div></div>'
      break
  }
  showPopup(x, y, content, 2)
}
/**
 * 显示过车气泡
 * @param {Number} x x坐标
 * @param {Number} y y坐标
 * @param {string} dateTime 过车日期、时间
 * @param {string} loc 过车位置名称
 * @param {string} plate 车牌
 * @param {string} status 驶进/驶出
 * @param {string} pic 过车抓拍图片
 */
let showCar = function (x, y, dateTime, loc, plate, status, pic) {
  let content
  switch (mapParams.mapType) {
    case MapType.Esri:
    case MapType.GA:
      content = '<div class="map-bubbleCar-esri"><div class="map-bubbleCar_m"><div class="map-tv"><div><img class="map-BubbleImg" src="' + pic + '" alt=""></div>' +
        '</div><div class="map-cotent"><p>' + dateTime + '</p><p>' + loc + '</p><p>' + plate + '</p><span>' + status + '</span></div>' +
        '</div></div>'
      break
    case MapType.Gaode:
      content = '<div class="map-bubbleCar-gd"><div class="map-bubbleCar_m map-bubbleCar_m-gd"><div class="map-tv"><div><img class="map-BubbleImg" src="' + pic + '" alt=""></div>' +
        '</div><div class="map-cotent"><p>' + dateTime + '</p><p>' + loc + '</p><p>' + plate + '</p><span>' + status + '</span></div>' +
        '</div><div class="map-arrow"></div></div>'
      break
    case MapType.Tianditu:
      content = '<div class="map-bubbleCar-gd map-pop-mouse"><div class="map-bubbleCar_m map-bubbleCar_m-gd"><div class="map-tv"><div><img class="map-BubbleImg" src="' + pic + '" alt=""></div>' +
        '</div><div class="map-cotent"><p>' + dateTime + '</p><p>' + loc + '</p><p>' + plate + '</p><span>' + status + '</span></div>' +
        '</div><div class="map-arrow"></div></div>'
      break
  }

  showPopup(x, y, content, 0)
}
/**
 * 关闭气泡
 */
let closePopup = function () {
  let tLayer = getLyrByName('popup')
  if (tLayer === undefined) return
  switch (mapParams.mapType) {
    case MapType.Esri:
      if (tLayer !== undefined) {
        for (let i = 0, len = tLayer.length; i < len; i++) {
          tLayer[i].destroy()
        }
      }
      break
    case MapType.Gaode:
      if (tLayer !== undefined) {
        mapClass.map.remove(tLayer)
      }
      break
    case MapType.GA:
      if (tLayer !== undefined) {
        mapClass.map.getOverlayLayer().clear(tLayer)
      }
      break
    case MapType.Tianditu:
      if (tLayer !== undefined) {
        for (let i = 0, len = tLayer.length; i < len; i++) {
          mapClass.map.removeLayer(tLayer[i])
        }
      }
      break
  }

  let index = getLyrIndexByName('popup')
  if (index !== -1) { mapClass.layers.splice(index, 1) }
}
/**
 * 显示气泡
 * @param {Number} x x坐标
 * @param {Number} y y坐标
 * @param {string} content 内容
 * @param {number} n 0-车辆气泡，1-陌生人气泡，2-视频气泡
 */
let showPopup = function (x, y, content, n) {
  let glayer = getLyrByName('popup')
  if (glayer === undefined) {
    glayer = []
    mapClass.layers.push(new MapOverLayer('popup', glayer, true))
  }
  switch (mapParams.mapType) {
    case MapType.Gaode:
      let xy = wgs84ToGaode([
        [x, y]
      ])

      let marker = new window.AMap.Marker({
        position: [xy[0][0], xy[0][1]],
        content: content,
        draggable: false
      })
      switch (n) {
        case 0: marker.setOffset(new window.AMap.Pixel(15, -100)); break
        case 1: marker.setOffset(new window.AMap.Pixel(10, -130)); break
        case 2: marker.setOffset(new window.AMap.Pixel(5, -205)); break
      }
      marker.setMap(mapClass.map)
      glayer.push(marker)
      break
    case MapType.Esri:
      esriLoader.loadModules(['esri/dijit/Popup', 'dojo/dom-construct', 'dojo/dom-class', 'esri/geometry/Point', 'esri/SpatialReference'])
        .then(([EsriPopup, domConstruct, domClass, Point, SpatialReference]) => {
          popTip = new EsriPopup({ anchor: 'auto' }, domConstruct.create('div'))
          popTip.startup()
          popTip.setContent(content)
          popTip.setMap(mapClass.map)
          let spatialRef = new SpatialReference({ wkid: 4326 })
          let xCoor = x
          let yCoor = y
          let spatialRefName
          if (mapParams.spatialReference) {
            spatialRefName = mapParams.spatialReference.name
          }
          switch (spatialRefName) {
            case CoorSystem.sh_54: spatialRef = new SpatialReference(mapParams.spatialReference.content)
              break
          }
          popTip.show(new Point(xCoor, yCoor, spatialRef))
          glayer.push(popTip)
        })
      break
    case MapType.GA:
      let pt = wgs84ToGaode([
        [x, y]
      ])
      let infowindow = new window.IMAP.InfoWindow('', {
        offset: new window.IMAP.Pixel(0, 0),
        position: new window.IMAP.LngLat(pt[0][0], pt[0][1]),
        visible: true
      })
      infowindow.setContent(content)
      mapClass.map.getOverlayLayer().addOverlay(infowindow)

      glayer.push(infowindow)
      break
    case MapType.Tianditu:
      let offset = [0, 85]
      switch (n) {
        case 0: offset = [0, 85]; break
        case 1: offset = [-8, 118]; break
      }
      let markerTip = window.L.marker(
        [y, x],
        {
          icon: window.L.divIcon({
            className: 'leaflet-pulse-icon',
            html: content,
            iconAnchor: offset
          })
        }
      ).addTo(mapClass.map)
      glayer.push(markerTip)
      break
  }
}
/**
 * 打开popup信息窗方法
 */
let showName = function (evt) {
  switch (mapParams.mapType) {
    // case MapType.Gaode:
    //   var ginfoWindow = new window.AMap.InfoWindow({
    //     content: evt.target.getExtData().name
    //   })
    //   ginfoWindow.open(mapClass.map, [evt.lnglat.lng, evt.lnglat.lat])
    //   break
    case MapType.Esri:
      esriLoader.loadModules(['esri/layers/GraphicsLayer', 'esri/graphic', 'esri/symbols/TextSymbol'])
        .then(([GraphicsLayer, Graphic, TextSymbol]) => {
          let tLayer = getLyrByName('label')
          if (tLayer === undefined) {
            tLayer = new GraphicsLayer()
            mapClass.map.addLayer(tLayer)
            mapClass.layers.push(new MapOverLayer('label', tLayer, true))
          }
          let tSym = new TextSymbol(
            {
              'type': 'esriTS',
              'color': [255, 255, 255, 255],
              'backgroundColor': [255, 0, 0, 255],
              'verticalAlignment': 'top',
              'horizontalAlignment': 'left',
              'angle': 0,
              'xoffset': 5,
              'yoffset': 0,
              'font': {
                'family': 'Arial',
                'size': 14,
                'style': 'normal',
                'decoration': 'none'
              }
            }
          )

          let markerTxt = new Graphic(evt.mapPoint, tSym)
          tSym.setText(evt.graphic.attributes === undefined ? '' : evt.graphic.attributes.name)
          tLayer.add(markerTxt)
        })

      // if (tooltip !== undefined) tooltip.destroy()
      // esriLoader.loadModules(['esri/dijit/Popup', 'dojo/dom-construct', 'dojo/dom-class'])
      //   .then(([EsriPopup, domConstruct, domClass]) => {
      //     tooltip = new EsriPopup({anchor: 'auto'}, domConstruct.create('div'))
      //     tooltip.startup()
      //     // add a class to the tooltip
      //     domClass.add(tooltip.domNode, 'light')
      //     let att = evt.graphic.attributes
      //     if (att === undefined) {
      //       att = ''
      //     } else {
      //       att = att.name
      //     }
      //     tooltip.setContent(att)
      //     tooltip.setMap(mapClass.map)
      //     tooltip.resize(120, 200)
      //     tooltip.show(evt.mapPoint)
      //   })
      break
  }
}
/**
 * 关闭popup信息窗方法
 */
let hideName = function (evt) {
  switch (mapParams.mapType) {
    // case MapType.Gaode:
    //   mapClass.map.clearInfoWindow()
    //   break
    case MapType.Esri:
      // if (tooltip !== undefined) tooltip.hide()
      let tLayer = getLyrByName('label')
      mapClass.map.removeLayer(tLayer)
      let index = getLyrIndexByName('label')
      mapClass.layers.splice(index, 1)
      break
  }
}
/**
 * 设置回地图显示范围
 * @param {} extObj ext = {center: [0, 0], zoom: 0, rotation: 0, pitch: 0, xmin: 0, ymin: 0, xmax: 0, ymax: 0}
 */
let setbackExtent = function (extObj) {
  switch (mapParams.mapType) {
    case MapType.Esri:
      esriLoader.loadModules(['esri/geometry/Extent'])
        .then(([Extent]) => {
          mapClass.map.setExtent(new Extent({
            xmin: extObj.xmin,
            ymin: extObj.ymin,
            xmax: extObj.xmax,
            ymax: extObj.ymax
          }, true))
        })
      break
    case MapType.Gaode:
      mapClass.map.setCenter(extObj.center)
      mapClass.map.setZoom(extObj.zoom)
      mapClass.map.setRotation(extObj.rotation)
      mapClass.map.setPitch(extObj.pitch)
      break
    case MapType.GA:
      mapClass.map.setCenter(extObj.center, extObj.zoom)
      break
    case MapType.Tianditu:
      let latlng = window.L.latLng(extObj.center[1], extObj.center[0])
      mapClass.map.setView(latlng)
      mapClass.map.invalidateSize()
      break
  }
}
/**
 * 居中缩放地图
 * @param {Number} x 中心点x坐标
 * @param {Number} y 中心点y坐标
 * @param {Number} zoomlevel 缩放级别
 */
let setCenterAndZoom = function (x, y, zoomlevel) {
  if (mapClass.map == null) return
  switch (mapParams.mapType) {
    case MapType.Esri:
      esriLoader.loadModules(['esri/geometry/Point', 'esri/SpatialReference'])
        .then(([Point, SpatialReference]) => {
          let xCoor = x
          let yCoor = y
          let spatialRef = new SpatialReference({ wkid: 4326 })
          let spatialRefName
          if (mapParams.spatialReference) {
            spatialRefName = mapParams.spatialReference.name
          }
          switch (spatialRefName) {
            case CoorSystem.sh_54: spatialRef = new SpatialReference(mapParams.spatialReference.content)
              break
          }
          mapClass.map.centerAndZoom(new Point(xCoor, yCoor, spatialRef), zoomlevel)
        })
      break
    case MapType.Gaode:
      let xy = wgs84ToGaode([[x, y]])
      let center = new window.AMap.LngLat(xy[0][0], xy[0][1])
      mapClass.map.setZoomAndCenter(zoomlevel, center)

      if (mapParams.viewMode === '3D') {
        mapClass.map.setRotation(0)
        mapClass.map.setPitch(mapParams.pitch)
      }
      break
    case MapType.GA:
      let pt = wgs84ToGaode([[x, y]])
      let centerPt = new window.IMAP.LngLat(pt[0][0], pt[0][1])
      mapClass.map.setCenter(centerPt, zoomlevel)
      break
    case MapType.Tianditu:
      let latlng = window.L.latLng(y, x)
      mapClass.map.setView(latlng, zoomlevel)
      mapClass.map.invalidateSize()
      break
  }
}
/**
 * 地图移至范围
 * @param {number} xmin
 * @param {number} ymin
 * @param {number} xmax
 * @param {number} ymax
 */
let setExtent = function (xmin, ymin, xmax, ymax) {
  switch (mapParams.mapType) {
    case MapType.Esri:
      esriLoader.loadModules(['esri/geometry/Extent'])
        .then(([Extent]) => {
          let sExtent = new Extent({
            xmin: xmin,
            ymin: ymin,
            xmax: xmax,
            ymax: ymax
          })
          mapClass.map.setExtent(sExtent, true)
        })
      break
    case MapType.Gaode:
      let minMax = wgs84ToGaode([
        [xmin, ymin],
        [xmax, ymax]
      ])
      let center = new window.AMap.LngLat((minMax[0][0] + minMax[1][0]) / 2, (minMax[0][1] + minMax[1][1]) / 2)
      mapClass.map.setZoomAndCenter(mapParams.zoom, center)
      break
    case MapType.GA:
      let pt = wgs84ToGaode([
        [xmin, ymin],
        [xmax, ymax]
      ])
      mapClass.map.setCenter(new window.IMAP.LngLat((pt[0][0] + pt[1][0]) / 2, (pt[0][1] + pt[1][1]) / 2))
      break
    case MapType.Tianditu:
      let latlng = window.L.latLng((ymin + ymax) / 2, (xmin + xmax) / 2)
      mapClass.map.setView(latlng, mapParams.zoom)
      mapClass.map.invalidateSize()
      break
  }
}
/**
 * 隐藏指定图层
 * @param {string} layername 图层名
 */
let hideLayer = function (layername) {
  let renderlayer = getLyrByName(layername)
  if (renderlayer === undefined) return
  switch (mapParams.mapType) {
    case MapType.Gaode:
      for (let i = 0, len = renderlayer.length; i < len; i++) {
        renderlayer[i].setMap(null)
      }
      break
    case MapType.Esri:
      renderlayer.hide()
      break
    case MapType.GA:
      for (let i = 0, len = renderlayer.length; i < len; i++) {
        renderlayer[i].visible(false)
      }
      break
    case MapType.Tianditu:
      mapClass.map.removeLayer(renderlayer)
      break
  }
}
/**
 * 显示指定图层
 * @param {string} layername 图层名
 */
let showLayer = function (layername) {
  let renderlayer = getLyrByName(layername)
  if (renderlayer === undefined) {
    return false
  } else {
    switch (mapParams.mapType) {
      case MapType.Gaode:
        for (let i = 0, len = renderlayer.length; i < len; i++) {
          renderlayer[i].setMap(mapClass.map)
        }
        break
      case MapType.Esri:
        renderlayer.show()
        break
      case MapType.GA:
        for (let i = 0, len = renderlayer.length; i < len; i++) {
          renderlayer[i].visible(true)
        }
        break
      case MapType.Tianditu:
        mapClass.map.addLayer(renderlayer)
    }
    return true
  }
}
let showLayerAtMaxZoom = function () {
  let visibleLayers = getLayerNamebyVisibility(true)
  if (mapClass.map.getZoom() === mapParams.zooms[1]) {
    for (let i = 0, len = visibleLayers.length; i < len; i++) {
      showLayer(visibleLayers[i])
    }
  } else {
    for (let i = 0, len = visibleLayers.length; i < len; i++) {
      if (visibleLayers[i].indexOf('_label') > -1) {
        hideLayer(visibleLayers[i])
      }
    }
  }
}
/**
 * 开始闪烁动画
 * @param {*} x
 * @param {*} y
 * @param {*} xoffset
 * @param {*} yoffset
 */
let startBlinkingObj = function (x, y, xoffset, yoffset) {
  if (mapParams.mapType === MapType.Esri) {
    esriLoader.loadModules(['esri/layers/GraphicsLayer', 'esri/graphic', 'esri/geometry/Point',
      'esri/symbols/PictureMarkerSymbol', 'esri/SpatialReference'])
      .then(([GraphicsLayer, Graphic, Point, PictureMarkerSymbol, SpatialReference]) => {
        // create alarm layer if it doesn't exist
        let glayer = getLyrByName('alarm')
        if (glayer === undefined) {
          glayer = new GraphicsLayer()
          mapClass.map.addLayer(glayer, 0)
          mapClass.layers.push(new MapOverLayer('alarm', glayer, true))
        }
        setLayerVisibility(true, 'alarm')
        let symbol = new PictureMarkerSymbol(require('../assets/images/maps/wave.gif'), 64, 64)
        let spatialRef = new SpatialReference({ wkid: 4326 })
        let xCoor = x
        let yCoor = y
        let spatialRefName
        if (mapParams.spatialReference) {
          spatialRefName = mapParams.spatialReference.name
        }
        switch (spatialRefName) {
          case CoorSystem.sh_54: spatialRef = new SpatialReference(mapParams.spatialReference.content)
            break
        }
        let pt = new Point(xCoor, yCoor, spatialRef)
        let graphicFlash = new Graphic(pt, symbol)
        glayer.add(graphicFlash)
        return graphicFlash
      })
  } else if (mapParams.mapType === MapType.Gaode) {
    let xy = wgs84ToGaode([
      [x, y]
    ])
    let gdXY = new window.AMap.LngLat(xy[0][0], xy[0][1])

    let glayer = getLyrByName('alarm')
    if (glayer === undefined) {
      glayer = []
      mapClass.layers.push(new MapOverLayer('alarm', glayer, true))
    }
    setLayerVisibility(true, 'alarm')
    let markerBlinking = new window.AMap.Marker({
      position: gdXY,
      content: '<em class="wave"></em>',
      zIndex: 99,
      offset: new window.AMap.Pixel(xoffset, yoffset)
    })
    markerBlinking.setMap(mapClass.map)
    glayer.push(markerBlinking)

    return markerBlinking
  } else if (mapParams.mapType === MapType.GA) {
    let xy = wgs84ToGaode([
      [x, y]
    ])

    let glayer = getLyrByName('alarm')
    if (glayer === undefined) {
      glayer = []
      mapClass.layers.push(new MapOverLayer('alarm', glayer, true))
    }
    setLayerVisibility(true, 'alarm')
    let opts = new window.IMAP.MarkerOptions()
    opts.anchor = window.IMAP.Constants.BOTTOM_CENTER
    opts.icon = new window.IMAP.Icon(require('../assets/images/maps/wave.gif'), { 'size': new window.IMAP.Size(18, 18) })

    opts.editabled = false
    opts.visible = true
    let marker = new window.IMAP.Marker(new window.IMAP.LngLat(xy[0][0], xy[0][1]), opts)
    mapClass.map.getOverlayLayer().addOverlay(marker, true)
    glayer.push(marker)
    return marker
  } else if (mapParams.mapType === MapType.Tianditu) {
    let glayer = getLyrByName('alarm')
    if (glayer === undefined) {
      glayer = window.L.layerGroup()
      mapClass.layers.push(new MapOverLayer('alarm', glayer, true))
    }
    setLayerVisibility(true, 'alarm')
    let pulseDiv = window.L.divIcon({
      className: 'leaflet-pulse-icon',
      html: '<div class="pulse"></div>',
      // html:'<em class="wave"></em>',
      iconAnchor: [15, 15]
    })

    let markerBlinking = window.L.marker(
      [y, x],
      {
        icon: pulseDiv,
        zIndexOffset: -1
      }
    )
    glayer.addLayer(markerBlinking)

    return markerBlinking
  }
}
/**
 * 关闭闪烁动画
 * @param {*} blinking
 */
let stopBlinkingObj = function (blinking) {
  let lyr = getLyrByName('alarm')
  if (lyr === undefined) return
  if (blinking === undefined) {
    switch (mapParams.mapType) {
      case MapType.Esri:
      case MapType.GA:
        mapClass.map.removeLayer(lyr)
        break
      case MapType.Gaode:
        mapClass.map.remove(lyr)
        break
      case MapType.Tianditu:
        mapClass.map.removeLayer(lyr)
        break
    }
    let index = getLyrIndexByName('alarm')
    mapClass.layers.splice(index, 1)
  } else {
    switch (mapParams.mapType) {
      case MapType.Esri:
        lyr.remove(blinking)
        break
      case MapType.Gaode:
        mapClass.map.remove(blinking)
        break
      case MapType.GA:
        mapClass.map.getOverlayLayer().removeOverlay(blinking)
        break
      case MapType.Tianditu:
        mapClass.map.removeLayer(blinking)
        break
    }
  }
  setLayerVisibility(false, 'alarm')
}
let clearElement = function (layerName, index, element) {
  if (element !== undefined) {
    switch (mapParams.mapType) {
      case MapType.Esri:
        let lyr = getLyrByName(layerName)
        lyr.remove(element)
        break
      case MapType.Gaode:
        mapClass.map.remove(element)
        break
      case MapType.GA:
        mapClass.map.getOverlayLayer().removeOverlay(element)
        break
      case MapType.Tianditu:
        mapClass.map.removeLayer(element)
        break
    }
  }
}
/**
 * 指定图层里查找距离中心点一定距离要素
 * @param {*} layername
 * @param {*} distance
 * @param {*} centerX
 * @param {*} centerY
 */
let searchNearbyObj = function (layername, distance, centerX, centerY) {
  let lyr = getLyrByName(layername)
  let results = []
  if (lyr !== undefined) {
    if (mapParams.mapType === MapType.Esri) {
      let centerPt = lonLatToMercator([centerX, centerY])
      for (let i = 0, len = lyr.graphics.length; i < len; i++) {
        let g = lyr.graphics[i]
        let pt = lonLatToMercator(g.geometry)
        let dis = getDistance(centerPt, pt)
        if (dis < distance) { results.push(g) }
      }
    } else if (mapParams.mapType === MapType.Gaode) {
      let lnglat1 = new window.AMap.LngLat(centerX, centerY)
      for (let i = 0, len = lyr.length; i < len; i++) {
        let pos = lyr[i].getPosition()
        let dis = lnglat1.distance(pos)

        if (dis < distance) { results.push(lyr[i]) }
      }
    } else if (mapParams.mapType === MapType.GA) {
      let lnglat1 = new window.IMap.LngLat(centerX, centerY)
      for (let i = 0, len = lyr.length; i < len; i++) {
        let pos = lyr[i].getPosition()
        let dis = lnglat1.distance(pos)

        if (dis < distance) { results.push(lyr[i]) }
      }
    } else if (mapParams.mapType === MapType.Tianditu) {
      let lnglat1 = window.L.latLng(centerX, centerY)
      let markers = lyr.getLayers()
      for (let i = 0, len = markers.length; i < len; i++) {
        let dis = lnglat1.distanceTo(markers[i].getLatLng())

        if (dis < distance) { results.push(markers[i]) }
      }
    }
  }
  return results
}
/**
 * 两点之间距离
 * @param {*} pt1
 * @param {*} pt2
 */
let getDistance = function (pt1, pt2) {
  let dis = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2))
  return dis
}
/**
 * 地图图层点击事件
 */
let onLayerClick = function (callbackEvent, layername) {
  if (layername === undefined) {
    for (let i = 0, len = mapClass.layers.length; i < len; i++) {
      if (mapParams.mapType === MapType.Esri) {
        mapClass.layers[i].layer.on('click', function (e) {
          callbackEvent(e)
        })
      } else if (mapParams.mapType === MapType.Gaode) {
        for (let j = 0, len = mapClass.layers[i].layer.length; j < len; j++) {
          mapClass.layers[i].layer[j].on('click', function (e) {
            callbackEvent(e)
          })
        }
      }
    }
  } else {
    let lyr = getLyrByName(layername)
    if (mapParams.mapType === MapType.Esri) {
      lyr.on('click', function (e) {
        callbackEvent(e)
      })
    } else if (mapParams.mapType === MapType.Gaode) {
      for (let j = 0, len = lyr.length; j < len; j++) {
        lyr[j].on('click', function (e) {
          callbackEvent(e)
        })
      }
    }
  }
}
let onClick = function (callbackEvent) {
  mapClass.map.on('click', function (e) {
    callbackEvent(e)
  })
}
let onExtentChange = function (callbackEvent) {
  if (mapClass.map == null) return
  switch (mapParams.mapType) {
    // case MapType.Gaode:
    //   mapClass.map.on('dragend', function (e) {
    //     callbackEvent(e)
    //   })
    //   mapClass.map.on('resize', function (e) {
    //     callbackEvent(e)
    //   })
    //   mapClass.map.on('zoomchange', function (e) {
    //     callbackEvent(e)
    //   })
    //   break

    // case 'BD':
    //   mapClass.map.addEventListener('zoomend', callbackEvent)
    //   mapClass.map.addEventListener('dragend', callbackEvent)
    //   mapClass.map.addEventListener('resize', callbackEvent)
    //   break

    case MapType.Esri:
      if (mapClass.map == null) return
      mapClass.map.on('extent-change', function (e) {
        callbackEvent(e)
      })
      break
  }
}
let onLayerMouseOver = function (callbackEvent, layername) {
  let event = 'mouseover'
  if (mapParams.mapType === MapType.Esri) {
    event = 'mouse-over'
  }
  if (layername === undefined) {
    for (let i = 0, len = mapClass.layers.length; i < len; i++) {
      mapClass.layers[i].layer.on(event, function (e) {
        callbackEvent(e)
      })
    }
  } else {
    let lyr = getLyrByName(layername)
    lyr.on(event, function (e) {
      callbackEvent(e)
    })
  }
}
let onLayerMouseOut = function (callbackEvent, layername) {
  let event = 'mouseout'
  if (mapParams.mapType === MapType.Esri) {
    event = 'mouse-out'
  }
  if (layername === undefined) {
    for (let i = 0, len = mapClass.layers.length; i < len; i++) {
      mapClass.layers[i].layer.on(event, function (e) {
        callbackEvent(e)
      })
    }
  } else {
    let lyr = getLyrByName(layername)
    lyr.on(event, function (e) {
      callbackEvent(e)
    })
  }
}
/**
 * 获取地图范围（3维地图获取中心点、角度等）
 */
let getMapExtent = function () {
  let ext = { center: [0, 0], zoom: 0, rotation: 0, pitch: 0, xmin: 0, ymin: 0, xmax: 0, ymax: 0 }
  switch (mapParams.mapType) {
    case MapType.Esri:
      ext.xmin = mapClass.map.extent.xmin
      ext.ymin = mapClass.map.extent.ymin
      ext.xmax = mapClass.map.extent.xmax
      ext.ymax = mapClass.map.extent.ymax
      break
    case MapType.Gaode:
      ext.center = [mapClass.map.getCenter().lng, mapClass.map.getCenter().lat]
      ext.zoom = mapClass.map.getZoom()
      ext.rotation = mapClass.map.getRotation()
      ext.pitch = mapClass.map.getPitch()
      break
    case MapType.GA:
    case MapType.Tianditu:
      ext.center = [mapClass.map.getCenter().lng, mapClass.map.getCenter().lat]
      ext.zoom = mapClass.map.getZoom()
      break
  }

  return ext
}

/**
 * 获得地图缩放级别
 */
let getMapZoom = function () {
  return mapClass.map.getZoom()
}
let getDataExtent = function () {
  return mapClass.mapExtent
}
/** *****坐标转换*****/
let coordinateConfig = {
  xPI: 3.14159265358979324 * 3000.0 / 180.0,
  PI: 3.1415926535897932384626,
  a: 6378245.0,
  ee: 0.00669342162296594323
}

let baiduToGaode = function (ptlist) {
  let gList = []
  for (let i = 0, len = ptlist.length; i < len; i++) {
    let blon = ptlist[i][0]
    let blat = ptlist[i][1]
    blon = +blon
    blat = +blat
    let x = blon - 0.0065
    let y = blat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * coordinateConfig.xPI)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * coordinateConfig.xPI)
    let glng = z * Math.cos(theta)
    let glat = z * Math.sin(theta)
    gList.push([glng, glat])
  }
  return gList
}
let baiduToWGS84 = function (ptlist) {
  let gdList = baiduToGaode(ptlist)
  return gaodeToWGS84(gdList)
}
let gaodeToWGS84 = function (ptlist) {
  let gList = []
  for (let i = 0, len = ptlist.length; i < len; i++) {
    let glon = ptlist[i][0]
    let glat = ptlist[i][1]

    glat = +glat
    glon = +glon
    if (outofChina(glon, glat)) {
      gList.push([glon, glat])
    } else {
      let dlat = transformLat(glon - 105.0, glat - 35.0)
      let dlng = transformlng(glon - 105.0, glat - 35.0)
      let radlat = glat / 180.0 * coordinateConfig.PI
      let magic = Math.sin(radlat)
      magic = 1 - coordinateConfig.ee * magic * magic
      let sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / ((coordinateConfig.a * (1 - coordinateConfig.ee)) / (magic * sqrtmagic) * coordinateConfig.PI)
      dlng = (dlng * 180.0) / (coordinateConfig.a / sqrtmagic * Math.cos(radlat) * coordinateConfig.PI)
      let mglat = glat + dlat
      let mglng = glon + dlng
      gList.push([glon * 2 - mglng, glat * 2 - mglat])
    }
  }
  return gList
}
let gaodeToBaidu = function (ptlist) {
  let gList = []
  for (let i = 0, len = ptlist.length; i < len; i++) {
    let glon = ptlist[i][0]
    let glat = ptlist[i][1]

    glat = +glat
    glon = +glon
    let z = Math.sqrt(glon * glon + glat * glat) + 0.00002 * Math.sin(glat * coordinateConfig.xPI)
    let theta = Math.atan2(glat, glon) + 0.000003 * Math.cos(glon * coordinateConfig.xPI)
    let blng = z * Math.cos(theta) + 0.0065
    let blat = z * Math.sin(theta) + 0.006
    gList.push([blng, blat])
  }
  return gList
}
let wgs84ToGaode = function (ptlist) {
  let gList = []
  for (let i = 0, len = ptlist.length; i < len; i++) {
    let wgslon = ptlist[i][0]
    let wgslat = ptlist[i][1]

    wgslat = +wgslat
    wgslon = +wgslon
    if (outofChina(wgslon, wgslat)) {
      gList.push([wgslon, wgslon])
    } else {
      let dlat = transformLat(wgslon - 105.0, wgslat - 35.0)
      let dlng = transformlng(wgslon - 105.0, wgslat - 35.0)
      let radlat = wgslat / 180.0 * coordinateConfig.PI
      let magic = Math.sin(radlat)
      magic = 1 - coordinateConfig.ee * magic * magic
      let sqrtmagic = Math.sqrt(magic)
      dlat = (dlat * 180.0) / ((coordinateConfig.a * (1 - coordinateConfig.ee)) / (magic * sqrtmagic) * coordinateConfig.PI)
      dlng = (dlng * 180.0) / (coordinateConfig.a / sqrtmagic * Math.cos(radlat) * coordinateConfig.PI)
      let mglat = wgslat + dlat
      let mglng = wgslon + dlng
      gList.push([mglng, mglat])
    }
  }
  return gList
}
let wgs84ToBaidu = function (ptlist) {
  let gList = wgs84ToGaode(ptlist)
  return gaodeToBaidu(gList)
}

let lonLatToMercator = function (pt) {
  let x = pt[0] * 20037508.34 / 180
  let y = Math.log(Math.tan((90 + pt[1]) * Math.PI / 360)) / (Math.PI / 180)
  y = y * 20037508.34 / 180

  return [x, y]
}
let outofChina = function (lng, lat) {
  lat = +lat
  lng = +lng
  // 纬度[3.86,53.55],经度[73.66,135.05]
  return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55)
}
let transformLat = function (lng, lat) {
  lat = +lat
  lng = +lng
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * coordinateConfig.PI) + 20.0 * Math.sin(2.0 * lng * coordinateConfig.PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lat * coordinateConfig.PI) + 40.0 * Math.sin(lat / 3.0 * coordinateConfig.PI)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(lat / 12.0 * coordinateConfig.PI) + 320 * Math.sin(lat * coordinateConfig.PI / 30.0)) * 2.0 / 3.0
  return ret
}

let transformlng = function (lng, lat) {
  lat = +lat
  lng = +lng
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng))
  ret += (20.0 * Math.sin(6.0 * lng * coordinateConfig.PI) + 20.0 * Math.sin(2.0 * lng * coordinateConfig.PI)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(lng * coordinateConfig.PI) + 40.0 * Math.sin(lng / 3.0 * coordinateConfig.PI)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(lng / 12.0 * coordinateConfig.PI) + 300.0 * Math.sin(lng / 30.0 * coordinateConfig.PI)) * 2.0 / 3.0
  return ret
}
let wgs84ToshCus = function (lon, lat) {
  return [-11583561.4655538 + lon * 95356.0541247944 + lat * 29.8337748880993,
    -3471402.36568149 + lon * 74.8848737309186 + lat * 110845.418549433
  ]
}

export {
  initMap, addPointsLayer, addLinesLayer, addPolygonLayer, clearDataLayer, onLayerClick, onClick, onLayerMouseOver, onExtentChange, showName, hideName, setbackExtent,
  getMapExtent, getDataExtent, baiduToGaode, baiduToWGS84, gaodeToWGS84, gaodeToBaidu, wgs84ToGaode, wgs84ToBaidu, showStranger, showVideo, showCar, closePopup,
  lonLatToMercator, onLayerMouseOut, searchNearbyObj, setCenterAndZoom, setExtent, hideLayer, showLayer, stopBlinkingObj, startBlinkingObj, setLayerVisibility, getMapZoom,
  getLyrByName, insertDataIntoLayer, clearElement, getLayerNamebyVisibility, wgs84ToshCus, getLyrFullName
}
