<template>
  <div id="cesiumContainer"></div>
</template> 
  <script setup> 
import * as Cesium from 'cesium';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const emit = defineEmits(['cesium'])
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        infoBox: false, // 禁用沙箱，解决控制台报错
        info: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        baseLayerPicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        vrButton: false,
        // imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        //   url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
        // })
      }
    }
  }
})
const viewer = ref(null)
onMounted(() => {
  // 设置默认视角在中国
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(90, -20, 110, 90);
  viewer.value = new Cesium.Viewer("cesiumContainer", { ...props.options });
  // NOTE:修改鼠标操作习惯
  // 将原来鼠标中键倾斜视图修改为鼠标左键拖动
  viewer.value.scene.screenSpaceCameraController.tiltEventTypes = [
    Cesium.CameraEventType.RIGHT_DRAG,
  ];
  // 将原来鼠标右键拖动缩放修改为鼠标滚轮滚动
  viewer.value.scene.screenSpaceCameraController.zoomEventTypes = [
    Cesium.CameraEventType.WHEEL,
  ];
  // 开启深度检测
  viewer.value.scene.globe.depthTestAgainstTerrain = true;
  emit('cesium', viewer.value)
  // // Cesium处理iframe的allow-scripts权限问题(infoBox: false的另外一种方法)
  // const iframe = document.getElementsByClassName("cesium-infoBox-iframe")[0]; // 获取iframe dom元素
  // iframe.setAttribute(
  //   "sandbox",
  //   "allow-same-origin allow-scripts allow-popups allow-forms"
  // );
  // iframe.setAttribute("src", "");
});
onBeforeUnmount(() => {
  viewer.value = null
})
</script> 
<style lang="less" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>