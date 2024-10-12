import { utils } from './index.js'
// 获取app存储的key
let getAppStoreKey = function(key) {
  // 应用的端口号
  const suffix = null
  if (suffix) {
    getAppStoreKey = function(key) {
      if (typeof key !== 'string') {
        throw new Error('key 必须是字符串！！')
      }
      return `${key}${suffix}`
    }
  } else {
    getAppStoreKey = function(key) {
      if (typeof key !== 'string') {
        throw new Error('key 必须是字符串！！')
      }
      return key
    }
  }
  return getAppStoreKey(key)
}
// 本地存储
export const localStorage = {
  /**
   * @method localStorage.set
   * @param key {string}
   * @param value {string|object}
   * @return boolean 表示是否设置成功
   */
  set: function(key, value) {
    if (!utils.isString(key) || key === '' || utils.isNullOrUndefined(value)) {
      utils.warn('utils.localStorage.set 参数key不能为空或者value不能为undefined/null')
      return false
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    window.localStorage.setItem(getAppStoreKey(key), value)
    return true
  },
  /**
   * @method localStorage.get
   * @param key {string}
   * @param default {any}
   * @return {string|null}
   */
  get: function(key, defaultValue) {
    defaultValue = arguments.length === 2 ? defaultValue : null
    if (!utils.isString(key) || key === '') {
      arguments.length < 2 && utils.warn('utils.localStorage.get 参数key必须为字符串，且不能为空')
      return defaultValue
    }
    const val = window.localStorage.getItem(getAppStoreKey(key))
    if (utils.isNull(val)) {
      return defaultValue
    } else {
      return val
    }
  },
  /**
   * @method localStorage.remove
   * @param key {string}
   * @return {boolean} 是否删除成功
   */
  remove: function(key) {
    if (!utils.isString(key) || key === '') {
      utils.warn('utils.localStorage.remove 参数key不能为空')
      return false
    }
    window.localStorage.removeItem(getAppStoreKey(key))
    return true
  },
  /**
   * @method localStorage.clear
   */
  clear: function() {
    window.localStorage.clear()
  }
}
// 本地存储
export const sessionStorage = {
  /**
   * @method sessionStorage.set
   * @param key {string}
   * @param value {string|object}
   * @return boolean 表示是否设置成功
   */
  set: function(key, value) {
    if (!utils.isString(key) || key === '' || utils.isNullOrUndefined(value)) {
      utils.warn('utils.sessionStorage.set 参数key不能为空或者value不能为undefined/null')
      return false
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }

    window.sessionStorage.setItem(getAppStoreKey(key), value)
    return true
  },
  /**
   * @method sessionStorage.get
   * @param key {string}
   * @param default {any}
   * @return {string|null}
   */
  get: function(key, defaultValue) {
    defaultValue = arguments.length === 2 ? defaultValue : null
    if (!utils.isString(key) || key === '') {
      arguments.length < 2 && utils.warn('utils.sessionStorage.get 参数key必须为字符串，且不能为空')
      return defaultValue
    }
    const val = window.sessionStorage.getItem(getAppStoreKey(key))
    if (utils.isNull(val)) {
      return defaultValue
    } else {
      return val
    }
  },
  /**
   * @method sessionStorage.remove
   * @param key {string}
   * @return {boolean} 是否删除成功
   */
  remove: function(key) {
    if (!utils.isString(key) || key === '') {
      utils.warn('utils.sessionStorage.remove 参数key不能为空')
      return false
    }
    window.sessionStorage.removeItem(getAppStoreKey(key))
    return true
  },
  /**
   * @method sessionStorage.clear
   */
  clear: function() {
    window.sessionStorage.clear()
  }
}
// cookie操作
export const cookie = {
  /**
   * @method cookie.set
   * @param key {string}
   * @param value {string|value}
   * @param expiredays {number} 过期时间
   * @param noStoreKey {boolean} 不设置存储key，默认设置存储key
   * @return boolean 表示是否设置成功
   */
  set: function(key, value, expiredays, noStoreKey) {
    var date = null
    if (!utils.isString(key) || key === '' || utils.isNullOrUndefined(value)) {
      utils.warn('utils.cookie.set 参数key不能为空或者value不能为undefined/null')
      return false
    }
    if (utils.isInt(expiredays)) {
      date = new Date()
      date.setDate(date.getDate() + expiredays)
    }
    document.cookie = (noStoreKey ? key : getAppStoreKey(key)) + '=' + escape(value) + (!date ? '' : ';expires=' + date.toGMTString()) + ';path=/'
    return true
  },
  /**
   * @method cookie.get
   * @param key {string}
   * @return {string|null}
   */
  get: function(key, defaultValue, noStoreKey) {
    defaultValue = arguments.length === 2 ? defaultValue : null
    if (!utils.isString(key) || key === '') {
      utils.warn('utils.cookie.get 参数key不能为空')
      return defaultValue
    }
    var arr = document.cookie.match(new RegExp('(^| )' + (noStoreKey ? key : getAppStoreKey(key)) + '=([^;]*)(;|$)'))
    if (utils.isArray(arr)) {
      return unescape(arr[2])
    }
    return defaultValue
  },
  /**
   * @method cookie.remove
   * @param key {string}
   * @return {boolean} 返回是移除成功
   */
  remove: function(key, noStoreKey) {
    return utils.cookie.set(key, '', -1000, noStoreKey)
  }
}

export const isStorageObject = (type, key) => {
  try {
    // const themeValue = localStorage.getItem('theme');
    // JSON.parse(themeValue);
    if (type === 'local') {
      JSON.parse(localStorage.get(key));
    } else if (type === 'session') {
      console.log('isStorageObject')
      JSON.parse(sessionStorage.get(key));
    }
    return true; // 是一个对象
  } catch (error) {
    console.log('isStorageObject', error)
    return false; // 不是一个对象
  }
}