<template>
  <div id="cesiumContainer">
    <div class="tooltip" :style="{...tooltipStyle}">{{ content }}</div>
  </div>
</template> 
  <script setup> 
import * as Cesium from 'cesium';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { addAir, addSimplestyles, addWyoming, addEntities } from "./entities";
import { addBaiduMap } from "./baidumap";
const emit = defineEmits(['onload'])
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        info: false,
        geocoder: true, //右上角 搜索
        homeButton: true, //右上角 Home
        sceneModePicker: false, //右上角 2D/3D切换
        baseLayerPicker: true, //右上角 地形
        navigationHelpButton: true, //右上角 Help
        animation: false, // 左下角 圆盘动画控件
        timeline: false, //时间轴
        fullscreenButton: true, //右下角 全屏控件
        vrButton: false, // 如果设置为true，将创建VRButton小部件。
        scene3DOnly: true, // 每个几何实例仅以3D渲染以节省GPU内存
        infoBox: true, //隐藏点击要素后的提示信息, 禁用沙箱，解决控制台报错
        terrain: Cesium.Terrain.fromWorldTerrain({
          requestWaterMask: true,
          requestVertexNormals: true
        }),//地形
        shouldAnimate: true,
        // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        //   url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        // })
      }
    }
  }
})
const viewer = ref(null)
const show = ref(false)
const content = ref(null)
const tooltipStyle = ref({
  top: 0,
  left: 0
})
const initMap = () => {
  // 设置默认视角在中国
  // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxMTc4MzliMy04YzgyLTQ5ZDUtOWY3My03MzM4MTQ0N2ZkZDkiLCJpZCI6MTcxNjQ1LCJpYXQiOjE2OTcxODQ2MzV9.ouFFg35_Whx8mkO5C2uyOMyyf8rwPyJJc_w99Kh0ZPE';
  viewer.value = new Cesium.Viewer("cesiumContainer", { ...props.options });
  //隐藏版本信息
  viewer.value._cesiumWidget._creditContainer.style.display = "none";
  // 开启深度检测
  viewer.value.scene.globe.depthTestAgainstTerrain = true;
  // NOTE:修改鼠标操作习惯
  // 将原来鼠标中键倾斜视图修改为鼠标左键拖动
  viewer.value.scene.screenSpaceCameraController.tiltEventTypes = [
    Cesium.CameraEventType.RIGHT_DRAG,
  ];
  // 将原来鼠标右键拖动缩放修改为鼠标滚轮滚动
  viewer.value.scene.screenSpaceCameraController.zoomEventTypes = [
    Cesium.CameraEventType.WHEEL,
  ];
  // 默认二维地图，不能旋转视角
  viewer.value.scene.screenSpaceCameraController.enableTilt = false
}
const setTerrain = async () => {
  try {
    const geoidService = await Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
      'https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/EGM2008/ImageServer'
    )
    const i3sProvider = await Cesium.I3SDataProvider.fromUrl(
      'https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/SanFrancisco_3DObjects_1_7/SceneServer/layers/0',
      {
        geoidTiledTerrainProvider: geoidService,
      })
    viewer.value.scene.primitives.add(i3sProvider)
    const center = Cesium.Rectangle.center(i3sProvider.extent)
    center.height = 1000.0
    // viewer.value.camera.setView({
    //   destination: Cesium.Ellipsoid.WGS84.cartographicToCartesian(center),
    // })
    viewer.value.camera.setView({
      destination: Cesium.Ellipsoid.WGS84.cartographicToCartesian(center),
      orientation: {
        heading: Cesium.Math.toRadians(90.0), // 控制左右摆头east, default value is 0.0 (north)
        pitch: Cesium.Math.toRadians(-90), // 上下摆头default value (looking down)
        roll: 0.0 // default value
      }
    })
  } catch (error) { }

  const selectedEntity = new Cesium.Entity()
  viewer.value.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {

    const pickedFeature = viewer.value.scene.pick(movement.position)
    console.log('pickedFeature::::', pickedFeature)
    if (!Cesium.defined(pickedFeature)) {
      return
    }
    const pickedPosition = viewer.value.scene.pickPosition(movement.position)
    console.log('movement.position::::', movement.position)
    tooltipStyle.value = { top: movement.position.y + 'px', left: movement.position.x + 'px' }
    console.log('tooltipStyle::::', tooltipStyle.value)
    if (Cesium.defined(pickedFeature.content) && Cesium.defined(pickedFeature.content.tile.i3sNode)) {
      const i3sNode = pickedFeature.content.tile.i3sNode
      console.log('pickedPosition::::', pickedPosition)
      if (pickedPosition) {
        i3sNode.loadFields().then(function() {
          let description = 'No attributes'
          let name
          const fields = i3sNode.getFieldsForPickedPosition(pickedPosition)
          console.log('fields:::', fields)
          if (Object.keys(fields).length > 0) {
            description = '<table class="cesium-infoBox-defaultTable"><tbody>'
            for (const fieldName in fields) {
              if (i3sNode.fields.hasOwnProperty(fieldName)) {
                description += `<tr><th>${fieldName}</th><td>`
                description += `${fields[fieldName]}</td></tr>`
                content.value += `fieldName:::${fieldName}${fields[fieldName]}`
                if (!Cesium.defined(name) && isNameProperty(fieldName)) {
                  name = fields[fieldName]
                }
              }
            }
            description += `</tbody></table>`
          }
          if (!Cesium.defined(name)) {
            name = 'unknown'
          }
          selectedEntity.name = name
          selectedEntity.description = description
          viewer.value.selectedEntity = selectedEntity
        })
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  function isNameProperty(propertyName) {
    const name = propertyName.toLowerCase()
    if (name.localeCompare('name') === 0 || name.localeCompare('objname') === 0) {
      return true
    }
    return false
  }
}
onMounted(() => {
  initMap()
  setTerrain()
  // addBaiduMap(viewer.value)
  // addAir(viewer, "../assets/models/CesiumAir/Cesium_Air.glb", 130.0)
  // addSimplestyles(viewer.value, "../public/Cesium/simplestyles.geojson")
  // addWyoming(viewer.value, 5000.0)
  // addEntities(viewer.value, '../public/Cesium/ne_10m_us_states.topojson')
  // addEntities(viewer.value, '../public/Cesium/shenzhen.json')
  emit('onload', viewer.value)
});
onBeforeUnmount(() => {
  viewer.value = null
})
</script> 
<style lang="less" scoped>
#cesiumContainer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tooltip {
  position: absolute;
  color: red;
  background-color: black;
  z-index: 10;
}
</style>