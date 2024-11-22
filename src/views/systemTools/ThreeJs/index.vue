<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-11-21 17:41:08
 @LastEditTime: 2024-11-21 17:41:08
-->
<template>
  <div ref="threeRef"></div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
// 目标：three.js 点击事件，与 3D 空间中物体交互
// 类型1：原生 DOM 使用原生的事件绑定（设置 pointerEvents='all')
// 类型2：three.js 物体使用光射投影 Raycaster
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'
const threeRef = ref(null)
let scene, camera, renderer, labelRenderer
let controls
const init = () => {
  // 创建场景
  scene = new THREE.Scene()
  // 创建相机 参数：视野角度/长宽比/近截面/远截面（当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中。）
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5
  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  threeRef.value.append(renderer.domElement)
}
const controlsCreate = () => {
  controls = new OrbitControls(camera, renderer.domElement)
}
const renderLoop = () => {
  renderer.render(scene, camera)
  labelRenderer.render(scene, camera)
  requestAnimationFrame(renderLoop)
}
const createHelper = () => {
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)
}
const domTo3D = () => {
  const tag = document.createElement('span')
  tag.innerHTML = '立方体'
  tag.style.color = 'white'
  // 类型1：原生 DOM 使用原生的事件绑定（设置 pointerEvents='all')
  tag.style.pointerEvents = 'all'
  tag.addEventListener('click', e => {
    alert('dom 被点击了')
    e.stopPropagation()
  })

  const tag3d = new CSS3DObject(tag)
  tag3d.scale.set(1 / 32, 1 / 32, 1 / 32)
  tag3d.position.set(0, 1, 0)
  scene.add(tag3d)

  labelRenderer = new CSS3DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.pointerEvents = 'none'
  labelRenderer.domElement.style.position = 'fixed'
  labelRenderer.domElement.style.left = '0'
  labelRenderer.domElement.style.top = '0'
  threeRef.value.appendChild(labelRenderer.domElement)
}
const createCube = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
}
const bindClick = () => {
  window.addEventListener('click', e => {
    // 定义光线投射对象
    const raycaster = new THREE.Raycaster()
    // 定义二维向量对象（保存转换后的平面 x，y 坐标值）
    const pointer = new THREE.Vector2()

    // 把屏幕坐标 => WebGL设备坐标
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1
    pointer.y = - (e.clientY / window.innerHeight) * 2 + 1

    // 更新摄像机和鼠标之间的连线（位置）
    raycaster.setFromCamera(pointer, camera)
    // 获取这条线穿过了哪些物体，收集成一个数组
    const list = raycaster.intersectObjects(scene.children)
    console.log(list)
  })
}
onMounted(() => {
  // 初始化
  init()
  // 轨道控制器
  controlsCreate()
  // 坐标轴
  createHelper()
  // DOM 转 3D
  domTo3D()
  // 创建立方体
  createCube()
  // 点击交互
  bindClick()
  // 渲染循环
  renderLoop()
})
</script>
<style lang="less" scoped>
</style>