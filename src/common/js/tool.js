/* 本地储存 session */
export function sessionStorage(task) {
  let KEY = task
  let Store = {
    save: function (items) {
      return window.sessionStorage.setItem(KEY, JSON.stringify(items))
    },
    fetch: function () {
      let a = JSON.parse(window.sessionStorage.getItem(KEY) || '[]')
      return a
    },
    remove: function () {
      return window.sessionStorage.removeItem(KEY)
    }
  }
  return Store
}
/* 本地储存 localStorage */
export function localStorage(task) {
  let KEY = task
  let Store = {
    save: function (items) {
      return window.localStorage.setItem(KEY, JSON.stringify(items))
    },
    fetch: function () {
      return JSON.parse(window.localStorage.getItem(KEY))
    }
  }
  return Store
}
/* 时间格式化 */
export function formatDate(date, fmt) {
  date = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
export function formatDateTime(date, fmt) {
  date += ''
  let dateResult = parseInt(date.substr(6, 13))
  return formatDate(dateResult, fmt)
}

/* 接口代理部分 */
export const BASE_URL = '/cmp/m/v1'