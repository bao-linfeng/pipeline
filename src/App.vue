<template>
  <div class="app-box">
    <router-view></router-view>
    <!-- <div class="lizi-box">
      <ParticlesModule />
    </div> -->
    <!-- <iframe class="waveparticle" src="https://waveparticle.qingtime.cn" frameborder="0"></iframe> -->
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch, watchEffect, computed, provide,readonly, inject, toRefs } from 'vue'
import { useState, changePropertyValue } from './store';
import { createMsg } from './util/ADS';
import ParticlesModule from './components/ParticlesModule.vue';
export default {
  components: {
    ParticlesModule, 
  },
  setup(props, context) {
    const { userName } = toRefs(useState());

    const initSocketIO = () => {
      const socket = inject('socket');
      socket.on("connect", (res) => {});

      socket.on("disconnect", (reason) => {
        console.log(reason);
        if (reason === "io server disconnect") {
          socket.connect();
        }
      });
      
      socket.on("connect_error", (error) => {
        console.log(error);
      });
    }
  
    onMounted(() => {
      // initSocketIO();
      // 统一登录消息接收
      window.addEventListener("message", (e) => {
        if (
          e.origin === "https://account.qingtime.cn" &&
          e.data.eventName === "redirect"
        ) {
          window.location.href = e.data.data;
        }
      }, false);
    });

    return {
      state: useState()
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Montserrat-Bold';
  src: url('./fonts/Montserrat-Bold.otf') format('truetype');
}
.Montserrat_Bold{
  font-family: 'Montserrat-Bold';
}
@font-face {
  font-family: 'Montserrat-Regular';
  src: url('./fonts/Montserrat-Regular.otf') format('truetype');
}
.Montserrat_Regular{
  font-family: 'Montserrat-Regular';
}
*{
	padding:0;
	margin:0;
}
html{
  position: relative;
  width: 100%;
	height: 100%;
  font-family: 'PingFang SC','Source Han Sans CN','Microsoft Yahei';
	font-size: 62.5%;
  color: #333;
}
body {
  width: 100%;
	height: 100%;
	font-size: 1.4rem;
  -webkit-tap-highlight-color: transparent;
}
a{
	text-decoration: none;
  color: #358acd;
}
ul{
	list-style: none;
}
i{
  font-style: normal;
}
input,textarea{
  /* ios input、textarea上边框有阴影 */
  box-shadow:0px 0px 0px rgba(0,0,0,0); 
  -webkit-appearance:none;
  -webkit-tap-highlight-color:transparent;
  font-size: 1.6rem;
}
button{
  outline: none;
  border: none;
  cursor: pointer;
}
#app {
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
.app-box{
  position: relative;
  width: 100%;
  min-height: 100%;
}
.msg_wrap{
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  background: #67c23a;
  padding: 5px 15px;
  border-radius: 3px;
  text-align: center;
  color: #333;
  min-width: 80px;
  z-index: 10000;
}
.msg_wrap_ok{
  background: #f0f9eb;
  color: #67c23a;
}
.msg_wrap_warn{
  background:#fdf6ec;
  color: #e6a23c;
}
/* 设置input 文本框的 placeholder 的颜色 */
input::-webkit-input-placeholder{
  color:rgba(144,147,153,1);
}
/* 去除ios 手机端input输入框的内阴影 */
input{
  -webkit-appearance: none; 
}
/* 滑条 */
.style1::-webkit-scrollbar-track{
	border-radius: 2px;
	background-color: transparent;
}
.style1::-webkit-scrollbar{
	width: 4px;
	background-color: transparent;
}
.style1::-webkit-scrollbar-thumb{
	border-radius: 2px;
	background: #888;
}
.style1::-webkit-scrollbar-corner{
	background-color: transparent;
}

.style2::-webkit-scrollbar-track{
	border-radius: 2px;
	background-color: transparent;
}
.style2::-webkit-scrollbar{
	height: 4px;
	background-color: transparent;
}
.style2::-webkit-scrollbar-thumb{
	border-radius: 2px;
	background: #888;
}
.style2::-webkit-scrollbar-corner{
	background-color: transparent;
}
/* 粒子动画 */
.lizi-box{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
}
.waveparticle{
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  background: transparent;
}
</style>