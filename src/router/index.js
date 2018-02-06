import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index/index'
import myResource from '@/components/my_resource/index'
import Personal from '@/components/personal/index'
import Version from '@/components/personal/children/version'
import resourceInfo from '@/components/resource_info/index'
// import richScan from '@/components/rich_scan/index'
import repairPlan from '@/components/repair_plan/index'
import checkLogin from '@/components/check_login/index'

import {BASE_URL} from 'tool/tool'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: Index,
      meta: {
        pageTitle: '首页',
        requireAuth: true
      }
    },
    {
      path: '/index',
      component: Index,
      meta: {
        pageTitle: '首页',
        requireAuth: true
      }
    },
    {
      path: '/myResource',
      component: myResource,
      meta: {
        pageTitle: '我的资产',
        requireAuth: true
      }
    },
    {
      path: '/personal',
      component: Personal,
      meta: {
        pageTitle: '个人中心',
        requireAuth: true
      }
    },
    {
      path: '/version',
      component: Version,
      meta: {
        pageTitle: '版本说明',
        requireAuth: true
      }
    },
    {
      path: '/resourceInfo',
      name: 'resourceInfo',
      component: resourceInfo,
      meta: {
        pageTitle: '资产信息',
        requireAuth: true
      }
    },
    // {
    //   path: '/richScan',
    //   name: 'richScan',
    //   component: richScan,
    //   meta: {
    //     pageTitle: '扫一扫',
    //     requireAuth: true
    //   }
    // },
    {
      path: '/repairplan',
      name: 'repairplan',
      component: repairPlan,
      meta: {
        pageTitle: '报修进度',
        requireAuth: true
      }
    },
    {
      path: '/checklogin',
      name: 'checklogin',
      component: checkLogin,
      meta: {
        pageTitle: '登录提示页',
        requireAuth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  typeof to.meta.pageTitle !== 'undefined' && setDocumentTitle(to.meta.pageTitle)// 设置公共title
  if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
    let host = window.location.hostname
    let port = window.location.port
    let protocol = window.location.protocol
    let url
    if(port){
      url = `${protocol}//${host}:${port}/#${to.fullPath}`
    } else {
      url = `${protocol}//${host}/#${to.fullPath}`
    }
    console.log('url',url)
    let sso_token = window.location.search.slice(1).split('=')[1]
    let login = 0
    if(sso_token){
      try{
        Vue.http.get(`${BASE_URL}/checklogin/${sso_token}`).then((res) => {
          login = res.data.resultCode
          window.sessionStorage.setItem('emplNo',res.data.returnValue.userNo)
          // login = 0
          if (login === 0) { // 判断是否登录
            // window.location.href = `http://192.168.150.30/cmp/dist/static/index.html#${to.fullPath}`
            // window.location.href = `http://localhost:8089/#/index`
            window.location.href = url
            // next()
          } else { // 没登录则跳转到登录界面
            let path = to.fullPath
            // window.location.href=`http://sso.ejw.cn:8579/v1/wx/code?goPage=http://192.168.150.30/cmp/dist/static/index.html#${path}`
            window.location.href=`http://sso.ejw.cn:8579/v1/wx/code?goPage=${url}`
          }
        })
      }catch(res){
        console.log(res)
      }
    }else{
      next()
      // console.log(userId)
      let userId = window.sessionStorage.getItem('emplNo')
      Vue.http.post('/lg/v1/page-visit-log/log',{
        userId,
        sysType:3,
        url:window.location.href
      })
    } 
  } else {
    next()
  }
})
/* 兼容安卓和ios */
let setDocumentTitle = function (title) {
  document.title = title
  let ua = navigator.userAgent
  if (/\bMicroMessenger\/([\d\.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    let i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export default router
