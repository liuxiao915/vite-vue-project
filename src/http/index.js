import axios from '@/hooks/axios.js'
const BASEURL = import.meta.env.VITE_APP_BASE_URL
/*
 *get 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(BASEURL + url, {
        params: params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: BASEURL + url,
      data: params,
      method: 'POST'
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


// 视频监控
export const getVideo = (params) => {
  const url = `http://202.105.100.28:9121/api-proxy/video/video/yingji/getVideo?cameraIndexCode=${params}&type=ws`
  return new Promise((resolve, reject) => {
    axios(url, {
      method: 'POST',
      headers: {
        Authorization: 'c2faee904a09e1675c4c215dbf2a8c6d'
      }
    })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
