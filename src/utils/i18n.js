import { reactive } from 'vue'
import enLocale from "@/lang/en-US";
import zhLocale from "@/lang/zh-CN";
import enLocale_render from "@/lang/en-US_render";
import zhLocale_render from "@/lang/zh-CN_render";
import enLocale_extension from "@/lang/en-US_extension";
import zhLocale_extension from "@/lang/zh-CN_extension";
// 值存在
export function isDef(value) {
  return value !== undefined && value !== null
}

// 对象映射 'a.b' {a: {b: 'val'}}
export function get(object, path) {
  const keys = path.split('.')
  let result = object

  keys.forEach(key => {
    result = isDef(result) && isDef(result[key]) ? result[key] : null
  })

  return result
}

// 是否是对象
export function isObj(x) {
  const type = typeof x
  return x !== null && (type === 'object' || type === 'function')
}

// 深拷贝
const { hasOwnProperty } = Object.prototype

function assignKey(to, from, key) {
  const val = from[key]

  if (!isDef(val)) {
    return
  }

  if (!hasOwnProperty.call(to, key) || !isObj(val)) {
    to[key] = val
  } else {
    to[key] = deepAssign(Object(to[key]), from[key])
  }
}

export function deepAssign(to, from) {
  Object.keys(from).forEach(key => {
    assignKey(to, from, key)
  })

  return to
}

let locale = reactive({
  lang: localStorage.getItem('v_form_locale') || 'zh-CN',
})

export function createI18n(options) {
  return {
    messages: options.messages,

    $st(path, ...args) {
      const message = get(this.messages[locale.lang], path)
      return typeof message === 'function'
        ? message(...args)
        : (message !== null ? message : path)
    },

    $st2(path, path2) {
      let messages = this.messages[locale.lang]
      const message = get(messages, path)
      return (message !== null) ? message : get(messages, path2)
    },

    setLang(lang) {
      locale.lang = lang
    }
  }
}
const langResources = {
  'en-US': {
    something: {
      //...
    },
    ...enLocale,
    ...enLocale_render,
    ...enLocale_extension
  },

  'zh-CN': {
    something: {
      //...
    },
    ...zhLocale,
    ...zhLocale_render,
    ...zhLocale_extension
  }
}

const i18n = createI18n({
  locale: localStorage.getItem('v_form_locale') || 'zh-CN',
  messages: langResources
})

export const changeLocale = function(langName) {
  i18n.setLang(langName)
  localStorage.setItem('v_form_locale', langName)
}

export const translate = function(key) {
  return i18n.$st(key)
}
export default {
  methods: {
    i18nt(key) {
      return i18n.$st(key)
    },
    /* 如果key1不存在，则查找key2 */
    i18n2t(key1, key2) {
      return i18n.$st2(key1, key2)
    },

  }
}

