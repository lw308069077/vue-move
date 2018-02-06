// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import './common/style/index.less'
import axios from 'axios'
import fastclick from 'fastclick'
import { LoadingPlugin } from 'vux'
import './assets/font/iconfont.css'

Vue.use(LoadingPlugin)
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.http = axios
Vue.prototype.$http = axios

let loading = {
  status: false
}

let mixin = {
  data () {
    return {
      _loading: loading
    }
  }
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  loading.status = true
  return config
}, function (error) {
  // Do something with request error
  loading.status = true
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  loading.status = false

  return response
}, function (error) {
  // Do something with response error
  let host = window.location.hostname
  let port = window.location.port
  let protocol = window.location.protocol
  let url
  if(port){
    url = `${protocol}//${host}:${port}/`
  } else {
    url = `${protocol}//${host}/`
  }
  if (error && error.response.status === 401) {
    // window.location.href = 'http://sso.ejw.cn:8579/v1/wx/code?goPage=http://192.168.150.30/cmp/dist/static/index.html'
    window.location.href=`http://sso.ejw.cn:8579/v1/wx/code?goPage=${url}`
  }
  loading.status = false
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  mixins: [mixin],
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
