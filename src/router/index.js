import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/components/index/index'
import myResource from '@/components/my_resource/index'
import Personal from '@/components/personal/index'
import Version from '@/components/personal/children/version'
import resourceInfo from '@/components/resource_info/index'
import richScan from '@/components/rich_scan/index'
import repairPlan from '@/components/repair_plan/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
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
    {
      path: '/richScan',
      name: 'richScan',
      component: richScan,
      meta: {
        pageTitle: '扫一扫',
        requireAuth: true
      }
    },
    {
      path: '/repairplan',
      name: 'repairplan',
      component: repairPlan,
      meta: {
        pageTitle: '报修进度',
        requireAuth: true
      }
    }
  ]
})
