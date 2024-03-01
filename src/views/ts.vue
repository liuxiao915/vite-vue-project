<template>
  <div ref="test">
    <el-button test="button">{{ user.name }}</el-button>
    <el-button>{{ money }}</el-button>
    <el-button>{{ car }}</el-button>
    <el-button>{{ book.year }}</el-button>
    <el-button @click="handleChange">{{ myVariable }}</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, withDefaults } from 'vue'
defineOptions({
  name: 'Ts'
})
const defaultProp = withDefaults(defineProps<{
  money: number; // 必传
  car?: string; // 非必传
}>(), {
  money: 10000,
  car: "红旗"
})
defaultProp.money
const myVariable = ref<string>('Hello'); 
// 模板 ref 需要通过一个显式指定的泛型参数，建议默认值 null
const test = ref<HTMLDivElement| null>(null)

const emit = defineEmits<{
  (e: 'changeMoney', money: number): void
  (e: 'changeCar', car: string): void
}>()


interface User {
  id: string,
  name: string
}
const user = ref<User>({
  id: '11',
  name: '张三'
})

type Book = {
  title: string
  year?: number
}

// 官方不推荐使用 reactive() 的泛型参数，因为底层和 ref() 实现不一样。
const book: Book = reactive({ title: 'Vue3 在线医疗' })
book.year = 2022

// const count = ref(100);
// const doubleMoney = computed<string>(() => (count.value * 2).toFixed(2));
// 若返回值不是 string 类型则会报错


// `event` 隐式地标注为 `any` 类型，如何指定：event 类型?
// 1. @change="handleChange($event)"" 查看$event类型
// 2. 鼠标摸一下事件 @change 查看类型
const handleChange = (event: Event) => {
  // `event.target` 是 `EventTarget | null` 类型，如何指定具体类型？
  // document.querySelector('input') 查看返回值类型
  // console.log(event.target as HTMLButtonElement) === console.log(event.target)
  console.log((event.target as HTMLButtonElement).classList)
}





</script>
<style lang="less" csoped>
button[test=button] {
  color: @red;
}
</style>