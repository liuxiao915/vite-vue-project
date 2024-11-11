import { createApp } from 'vue';
const app = createApp({});
// export const eventBus = app.provide('eventBus', app);
export const eventBus = app.config.globalProperties.eventBus = app.Vue;
// 在组件 A 中
// eventBus.$emit('someEvent', data);
// 在组件 B 中
// eventBus.$on('someEvent', (data) => {
//   // 处理事件
// });
// 确保在适当的时候销毁事件监听器，以避免内存泄漏
// eventBus.$off('someEvent');