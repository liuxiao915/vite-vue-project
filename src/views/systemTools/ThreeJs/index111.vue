<!--
 @Description: 
 @Author: liuxiao
 @Date: 2024-11-19 17:28:18
 @LastEditTime: 2024-11-19 17:28:18
-->
<template>
  <div class="index-wrapper">
    <div class="header">
      <!-- <img class="logo" src="/image/park-logo.png" alt="" /> -->
    </div>
    <div class="page-container" ref="container">
      <div class="model-container">
        <div id="loading" class="loading">
          <p id="processing" class="text">园区资源加载中<span id="processing-number"></span>…</p>
          <div id="loading-bar" class="loading-bar"></div>
        </div>
        <div id="canvas" class="canvas"></div>
        <div id="all-charts" class="all-charts">
          <div class="section-one">
            <!-- <img class="img-header" src="/image/city-gaikuang.png" alt="" /> -->
            <div class="icons-container">
              <div class="item">
                <div class="icons-item building-icon">
                  <span id="building-number" class="number">
                    28
                  </span>
                </div>
                <span class="title">电量峰值</span>
                <span class="unity">（度）</span>
              </div>
              <div class="item">
                <div class="icons-item enterprise-icon">
                  <span id="enterprise-number" class="number">
                    6
                  </span>
                </div>
                <span class="title"> 实时温度</span>
                <span class="unity">（度）</span>
              </div>
              <div class="item">
                <div class="icons-item car-icon">
                  <span id="car-number" class="number">
                    1530
                  </span>
                </div>
                <span class="title">出租车运力</span>
                <span class="unity">（个）</span>
              </div>
              <div class="item">
                <div class="icons-item rod-icon">
                  <span id="rod-number" class="number">
                    48
                  </span>
                </div>
                <span class="title">拥堵程度</span>
                <span class="unity">（个）</span>
              </div>
            </div>
          </div>
          <div class="section-two">
            <!-- <img class="img-header" src="/image/city-shouru.png" alt="" /> -->
            <div id="bar-chart" class="bar-chart"></div>
          </div>
          <div class="section-three">
            <!-- <img class="img-header" src="/image/city-chanye.png" alt="" /> -->
            <div id="pie-chart" class="pie-chart"></div>
          </div>
        </div>

        <div id="right-btns" class="right-btns" style="pointer-events: all;">
          <div>
            <!-- <img id="mode-topView" class="mode-topView" src="/image/city-niaokan.png" style="pointer-events: all;" alt=""> -->
          </div>
          <div>
            <!-- <img id="mode-roaming" class="mode-roaming" src="/image/city-manyou.png" style="pointer-events: all;" alt=""> -->
          </div>
        </div>

      </div>
    </div>
    <div id="tag-1" class="building-name" style="display: none;">东方明珠</div>
    <div id="tag-2" class="building-info" style="display: none;">
      <div>总平米数： 2000</div>
      <div>容纳人数： 10000</div>
      <div>可出租位： 50</div>
      <div>空余车位： 10</div>
    </div>

    <div id="tag-3" class="building-fire" style="display: none;">
      <div>着火大楼： 东方明珠</div>
      <div>着火楼层： 18层</div>
      <div>疏散人数： 1800人</div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
const state = reactive({})
</script>
<style lang="less" scoped>
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  height: 100%;
}
.index-wrapper {
  position: relative;
  height: 100%;
  background-color: black;

  .header {
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    width: 100%;
    margin-bottom: 30px;
    z-index: 10;

    .logo {
      width: 460px;
    }

    .btn-list {
      img {
        width: 96px;
        margin-right: 24px;
        cursor: pointer;
      }
    }
  }

  .page-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    scroll-behavior: smooth;
  }
}

.model-container {
  position: relative;
  height: 100%;
  background-color: black;
  width: 100%;
  flex-shrink: 0;
}

.loading {
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  text-align: center;
  // TODO: 进度条先隐藏
  // display: none;

  .text {
    font-size: 14px;
    color: #909399;
    margin-bottom: 16px;
  }

  .loading-process {
    width: 280px;
    height: 4px;
    background: rgba(255, 255, 255, 0.16);
    border-radius: 20px;
    overflow: hidden;
  }

  .loading-bar {
    transform: scaleX(0.3);
    transform-origin: top left;
    width: 280px;
    height: 4px;
    background: linear-gradient(90deg, #48ffff 0%, #3656ff 100%);
    border-radius: 20px;
    overflow: hidden;
  }
}

.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 480px;
  padding: 88px 20px 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to left,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(1, 4, 11, 1) 70%,
    #04070d 100%
  );
  // TODO：二维图表先隐藏
  // display: none;

  img {
    width: 100%;
  }
}

.right-btns {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 88px 20px 0;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    to right,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.6) 80%
  );

  div {
    margin-bottom: 48px;
    margin-right: 24px;
  }

  img {
    width: 96px;
    cursor: pointer;
  }
}

.section-one {
  flex-basis: 25%;

  .icons-container {
    display: flex;
    justify-content: space-between;

    .item {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 10px 0;

      .icons-item {
        position: relative;
        height: 80px;

        .number {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
          color: #ffffff;
        }
      }

      .building-icon {
        background: url('./assets/building-icon.png') no-repeat 50% 0 / contain;
      }

      .enterprise-icon {
        background: url('./assets/enterprise-icon.png') no-repeat 50% 0 /
          contain;
      }

      .rod-icon {
        background: url('./assets/rod-icon.png') no-repeat 50% 0 / contain;
      }

      .car-icon {
        background: url('./assets/car-icon.png') no-repeat 50% 0 / contain;
      }

      .title,
      .unity {
        font-size: 14px;
        color: #cdd7e1;
      }

      .title {
        margin-top: 8px;
      }
    }
  }
}

.section-two {
  flex-basis: 35%;
  display: flex;
  flex-direction: column;

  .bar-chart {
    width: 100%;
    // height: 100%;
    flex: 1;
  }
}

.section-three {
  flex-basis: 40%;
  display: flex;
  flex-direction: column;

  .pie-chart {
    position: relative;
    margin: 0 auto;
    padding-bottom: 20px;
    width: 80%;
    // height: 100%;
    flex: 1;
  }
}

.bar-chart-titile {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  font-size: 14px;
  color: #c6d1db;

  .bar-icon {
    display: inline-block;
    width: 12px;
    vertical-align: middle;
  }

  .blue-bar-icon {
    background: linear-gradient(to right, #74c0f8, rgba(116, 192, 248, 0));
  }

  .red-bar-icon {
    background: linear-gradient(to right, #ff7152, rgba(255, 113, 82, 0));
  }
}

.building-name {
  text-align: center;
  color: #fff;
  font-size: 10px;
  background-size: 100% 100%;
  background-image: url('./icon/text_select.png');
  background-repeat: no-repeat;
  padding: 16px;
}

.building-info {
  display: flex;
  width: 300px;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  text-align: center;
  color: #ccc;
  font-size: 10px;
  padding: 12px;
  background-size: 100% 100%;
  // text.png
  background-image: url('./icon/modal-bg.png');
  background-repeat: no-repeat;
  margin-top: 60px;
}

.building-info div {
  width: 40%;
  position: relative;
  margin: 10px 0;
}

// 左边
.building-info div:nth-child(odd) {
  text-align: right;
  padding-right: 12px;
}

.building-info div:nth-child(odd)::after {
  position: absolute;
  content: '';
  width: 10px;
  background-color: lightblue;
  border-radius: 10px;
  top: 33%;
  right: 0;
}

// 右边
.building-info div:nth-child(even) {
  text-align: left;
  // padding-left: 12px;
}

.building-info div:nth-child(even)::before {
  position: absolute;
  content: '';
  width: 10px;
  background-color: #00ffff;
  border-radius: 10px;
  top: 33%;
  left: 0;
}

.building-fire {
  color: #ccc;
  font-size: 10px;
  padding: 12px 28px;
  background-size: 100% 100%;
  background-image: url('./icon/modal-bg.png');
  background-repeat: no-repeat;
}

.building-fire div {
  position: relative;
}

.building-fire div::before {
  position: absolute;
  content: '';
  width: 10px;
  background-color: red;
  border-radius: 10px;
  top: 33%;
  left: -20px;
}
</style>