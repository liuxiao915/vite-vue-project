<!-- 滑动验证功能页面 -->
<template>
  <div class="slider-container" onselectstart="return false;">
    <div class="bgColor"></div>
    <div class="txt">向右滑动验证</div>
    <div :class="['slider', isValidSuccess ? 'success' : '']"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isValidSuccess: false, //是否解锁成功的标志，默认不成功
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    //一、定义了一个获取元素的方法
    getEle(selector) {
      return document.querySelector(selector);
    },
    init() {
      let _this = this;
      //二、获取到需要用到的DOM元素
      let box = this.getEle(".slider-container"), //容器
        bgColor = this.getEle(".bgColor"), //背景色
        txt = this.getEle(".txt"), //文本
        slider = this.getEle(".slider"), //滑块
        successMoveDistance = box.offsetWidth - slider.offsetWidth, //解锁需要滑动的距离
        downX, //用于存放鼠标按下时的位置
        isSuccess = false; //是否解锁成功的标志，默认不成功

      //三、给滑块添加鼠标按下事件
      slider.onmousedown = () => {
        bgColor.style.transition = "";
        slider.style.transition = "";
        var e = e || window.event || e.which;
        downX = e.clientX;
        //在鼠标按下时，分别给鼠标添加移动和松开事件
        document.onmousemove = mousemoveHandler;
        document.onmouseup = mouseupHandler;
      }
      //3.1鼠标移动事件的方法实现
      function mousemoveHandler(e) {
        var e = e || window.event || e.which;
        var moveX = e.clientX;
        var offsetX = getOffsetX(moveX - downX, 0, successMoveDistance);
        bgColor.style.width = offsetX + "px";
        slider.style.left = offsetX + "px";
        if (offsetX == successMoveDistance) {
          success();
        }
        //如果不设置滑块滑动时会出现问题（目前还不知道为什么）
        e.preventDefault();
      }

      //3.2鼠标松开事件的方法实现
      function mouseupHandler(e) {
        if (!isSuccess) {
          bgColor.style.width = 0 + "px";
          slider.style.left = 0 + "px";
          bgColor.style.transition = "width 0.8s linear";
          slider.style.transition = "left 0.8s linear";
          _this.$emit("verificationSuccess", false);
        }
        document.onmousemove = null;
        document.onmouseup = null;
      }
      //四、定义一个获取鼠标当前需要移动多少距离的方法
      function getOffsetX(offset, min, max) {
        if (offset < min) {
          offset = min;
        } else if (offset > max) {
          offset = max;
        }
        return offset;
      }
      //五、定义一个滑块解锁成功的方法
      function success() {
        isSuccess = true;
        _this.$emit("verificationSuccess", true);
        txt.innerHTML = "已完成验证";
        txt.style.color = "#FFFFFF";
        txt.style.backgroundColor = "#17c97d";
        bgColor.style.backgroundColor = "#17c97d";
        _this.isValidSuccess = true;
        //滑动成功时，移除鼠标按下事件和鼠标移动事件
        slider.onmousedown = null;
        document.onmousemove = null;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.slider-container {
  position: relative;
  height: 50px;
  width: 100%;
  background: #ffffff;
  border: 1px solid rgba(221, 221, 221, 1);
  border-radius: 8px;
  .bgColor {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    border-radius: 8px;
    background: #17c97d;
  }
  .txt {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #181818;
    letter-spacing: 0;
    font-weight: 400;
  }
  .slider {
    position: absolute;
    top: -1px;
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    background-size: 24px 24px;
    background-position: center center;
    background-image: url('@/assets/images/login/right-arrow.png');
    background-repeat: no-repeat;
    border: 1px solid rgba(221, 221, 221, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    cursor: move;
  }
  .success {
    background-image: url('@/assets/images/login/success.png');
  }
}
</style>
