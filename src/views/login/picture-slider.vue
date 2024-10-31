<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-10-31 10:55:28
 @LastEditTime: 2024-10-31 10:55:28
-->
<template>
  <el-dialog title="请完成安全验证" v-model="model" :width="420" @open="open">
    <div class="lockBox">
      <div class="topCanvas">
        <img ref="imgRef" src="@/assets/images/login/picture.jpg" alt="随机拼图" @load="imageLoad">
        <canvas ref="canvasRef" id="myCanvas"></canvas>
        <canvas ref="blockRef" id="block"></canvas>
        <div ref="promptRef" class="prompt">验证失败</div>
      </div>
      <!-- 滑块 -->
      <div class="verify">
        <div ref="leftbarRef" class="leftbar">
          <div ref="slideRef" class="slide"></div>
        </div>
      </div>
    </div>
  </el-dialog>

</template>
<script setup>
import { ref, reactive } from 'vue'
const model = defineModel()
const imgRef = ref(null)
const canvasRef = ref(null)
const blockRef = ref(null)
const promptRef = ref(null)
const leftbarRef = ref(null)
const slideRef = ref(null)

const init = () => {
  const w = 380 // canvas宽度
  const h = 160 // canvas高度
  const l = 35 // 滑块边长
  const r = 5 // 滑块半径
  const PI = Math.PI
  const L = l + r * 2 + 3 // 滑块实际边长
  // 拼图滑块
  var ctx = canvasRef.value.getContext('2d')
  // 拼图背景图
  var ctx2 = blockRef.value.getContext('2d')
  // 绘制拼图背景
  imgRef.value.onload = function() {
    // 初始化拼图
    ctx.drawImage(imgRef.value, 0, 0, 380, 160)
    ctx2.drawImage(imgRef.value, 0, 0, 380, 160)
  }

  // 拼图滑块挖掘
  function drawPath(ctx, x, y, operation) {
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI)
    ctx.lineTo(x + l, y)
    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI)
    ctx.lineTo(x + l, y + l)
    ctx.lineTo(x, y + l)
    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true)
    ctx.lineTo(x, y)
    ctx.lineWidth = 1
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
    ctx.stroke()
    ctx.globalCompositeOperation = 'destination-over' //重要
    operation === 'fill' ? ctx.fill() : ctx.clip()
  }

  // 随机位置但是要同高度
  function randomNum(start, end) {
    return Math.floor(Math.random() * (end - start) + start)
  }

  // 随机位置创建拼图
  let x = randomNum(L + 10, w - L - 20)
  let y = randomNum(10 + 2 * r, h - L - 20)

  // 不动的挖空
  drawPath(ctx2, x, y, 'fill')
  // 滑块切割，
  drawPath(ctx, x, y, 'clip')
  // 控制同等高度，定位在左边
  canvasRef.value.style.left = -x + 'px'
  // 网页端滑动解锁 事件
  // 监听滑块事件
  document.querySelector('.slide').onmousedown = function(e) {
    //获取相对的时间
    let startMoveTime = new Date()
    document.onmousemove = function(e2) {
      // 最大滑动距离为下方盒子长-滑块长
      //范围内拖动
      if (e2.clientX > e.clientX && e2.clientX - e.clientX <= w - L + 10) {
        // 使得滑块和拼图一起动
        document.querySelector('.slide').style.left =
          e2.clientX - e.clientX + 'px'
        canvasRef.value.style.left =
          -x + e2.clientX - e.clientX + 'px'
        document.querySelector('.slide').style.backgroundColor = 'rgb(51,122,183)'
        document.querySelector('.leftbar').style.width =
          e2.clientX - e.clientX + 'px'
        document.querySelector('.leftbar').style.borderColor = 'rgb(51,122,183)'
      }
      document.onmouseup = function() {
        // 判断拼图位置是否正确,拖拉距离是否是随机生成的拼图x
        let result = false
        // 正确提示正确，误差为10以内为正确
        if (
          e2.clientX - e.clientX - 10 <= x &&
          x <= e2.clientX - e.clientX + 10
        ) {
          result = true
          // 验证成功
          let endMovetime = new Date()
          let timer = ((endMovetime - startMoveTime) / 1000).toFixed(2)
          document.querySelector('.slide').style.backgroundColor =
            'rgb(92,184,92)'
          document.querySelector('.slide').style.backgroundImage =
            'url("@/assets/images/login/success.png")'
          document.querySelector('.leftbar').style.width =
            e2.clientX - e.clientX + 'px'
          document.querySelector('.leftbar').style.borderColor = 'rgb(92,184,92)'
          document.querySelector('.prompt').innerHTML = timer + 's验证成功'
          document.querySelector('.prompt').style.display = 'block'
          document.querySelector('.prompt').style.backgroundColor =
            'rgb(92,184,92,.5)'
          clearInterval(timer)
          model.value = false
        } else {
          // 验证失败
          document.querySelector('.slide').style.backgroundColor = 'rgb(217,83,79)'
          document.querySelector('.slide').style.backgroundImage = 'url("./img/bg/error.png")'
          document.querySelector('.leftbar').style.width = e2.clientX - e.clientX + 'px'
          document.querySelector('.leftbar').style.borderColor = 'rgb(217,83,79)'
          document.querySelector('.prompt').innerHTML = '验证失败'
          document.querySelector('.prompt').style.display = 'block'
          document.querySelector('.prompt').style.backgroundColor = 'rgba(217,83,79,.5)'
          document.querySelector('.leftbar').style.width = 0 + "px";
          document.querySelector('.slide').style.left = 0 + "px";
          document.querySelector('.leftbar').style.transition = "width 0.8s linear";
          document.querySelector('.slide').style.transition = "left 0.8s linear";
          canvasRef.value.style.left = -x + 'px'
          canvasRef.value.style.transition = "left 0.8s linear";
          document.onmousemove = null;
          document.onmouseup = null;
        }
        // 解除以下事件
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
  // 移动端
  document.querySelector('.slide').ontouchstart = function(e) {
    let touch = e.targetTouches[0]
    let startMoveTime = new Date()
    document.ontouchmove = function(e2) {
      let touch2 = e2.targetTouches[0]
      // 最大滑动距离为下方盒子长-滑块长
      //范围内拖动
      if (
        touch2.pageX > touch.pageX &&
        touch2.pageX - touch.pageX <= w - L + 10
      ) {
        // 使得滑块和拼图一起动
        document.querySelector('.slide').style.left =
          touch2.pageX - touch.pageX + 'px'
        canvasRef.value.style.left =
          -x + touch2.pageX - touch.pageX + 'px'
        document.querySelector('.slide').style.backgroundColor = 'rgb(51,122,183)'
        document.querySelector('.leftbar').style.width =
          touch2.pageX - touch.pageX + 'px'
        document.querySelector('.leftbar').style.borderColor = 'rgb(51,122,183)'
      }
      document.ontouchend = function() {
        // 判断拼图位置是否正确,拖拉距离是否是随机生成的拼图x
        let result = false
        let endMovetime = new Date()
        let timer = ((endMovetime - startMoveTime) / 1000).toFixed(2)
        // 正确提示正确，误差为10以内为正确
        if (
          touch2.pageX - touch.pageX - 10 <= x &&
          x <= touch2.pageX - touch.pageX + 10
        ) {
          result = true
          // 滑块消失
          document.querySelector('.slide').style.backgroundColor =
            'rgb(92,184,92)'
          document.querySelector('.slide').style.backgroundImage =
            'url("@/assets/images/login/success.png")'
          document.querySelector('.leftbar').style.width =
            touch2.pageX - touch.pageX + 'px'
          document.querySelector('.leftbar').style.borderColor = 'rgb(92,184,92)'
          document.querySelector('.prompt').innerHTML = timer + 's验证成功'
          document.querySelector('.prompt').style.display = 'block'
          document.querySelector('.prompt').style.backgroundColor =
            'rgb(92,184,92,.5)'
        } else {
          // 验证失败
          document.querySelector('.slide').style.backgroundColor =
            'rgb(217,83,79)'
          document.querySelector('.slide').style.backgroundImage =
            'url("./img/bg/error.png")'
          document.querySelector('.leftbar').style.width =
            touch2.pageX - touch.pageX + 'px'
          document.querySelector('.leftbar').style.borderColor = 'rgb(217,83,79)'
          document.querySelector('.prompt').innerHTML = '验证失败'
          document.querySelector('.prompt').style.display = 'block'
          document.querySelector('.prompt').style.backgroundColor =
            'rgba(217,83,79,.5)'
          location.reload()
        }

        // 解除以下事件
        document.ontouchmove = null
        document.ontouchend = null
      }
    }
  }
}
const imageLoad = () => { }
const open = () => {
  init()
}
</script>
<style lang="less" scoped>
.lockBox {
  width: 100%;
  position: relative;
  // position:fixed; // 解决左移滑动问题
  .topCanvas {
    position: relative;
    img,
    canvas {
      width: 100%;
      height: 155px;
    }
    img {
      display: none;
    }
    #myCanvas {
      position: absolute;
      float: left;
    }
    .prompt {
      width: 380px;
      height: 40px;
      position: absolute;
      bottom: 4px;
      left: 0px;
      color: #fff;
      font-size: 15px;
      line-height: 40px;
      display: none;
    }
  }
  .verify {
    position: relative;
    width: 380px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ddd;
    color: #333;
    .leftbar {
      position: absolute;
      left: -1px;
      top: -1px;
      width: 40px;
      height: 39px;
      background: #f0fff0;
      border: 1px solid #ddd;
      .slide {
        position: absolute;
        width: 40px;
        height: 40px;
        border-right: 1px solid #ddd;
        border-left: 1px solid #fff;
        background: url('./img/bg/icon.png') no-repeat center;
        background-size: 20px 20px;
        background-color: #fff;
      }
    }
  }
}
</style>