/*
 * @Author: liuxiang
 * @Date: 2020-09-17 09:44:13
 * @LastEditors: liuxiang
 * @LastEditTime: 2021-03-03 16:42:38
 * @Description: file content
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from '../store';
import "nprogress/nprogress.css";
import nprogress from 'nprogress'
import Index from '../views/Index.vue'
//import Main from '../views/Main.vue'
import person from './module/person'

Vue.use(VueRouter)

// 不显示圈圈
nprogress.configure({
  showSpinner: false
});

const routes = [{
  path: "puzzleDom",
  component: () => import("@/views/Index.vue"),
  meta: {
    title: '拼图',
    free: true
  },
  children: [{
    path: "",
    component: () => import("@/views/puzzleDom/index.vue"),
    meta: {
      title: '拼图',
      free: true
    }
  },{
    path: "set",
  component: () => import("@/views/puzzleDom/set.vue"),
  meta: {
    title: '拼图设置',
    free: true
  }
  }]
}, {
  path: "person",
  component: Index,
  children: person
}]

const router = new VueRouter({
  //base: process.env.VUE_APP_PUBLIC_PATH,
  //mode: 'history',
  routes: [{
      path: '/',
      component: Index,
      children: routes
    },
    {
      path: '*',
      component: () => import("@/views/404.vue"),
    }
  ]
})

router.beforeEach((to, from, next) => {
  nprogress.start();
  //const meta = to.meta;
  //let token = store.state.token;
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  // if (token || to.path == `/${store.state.tenantId}/wxLogin` || to.path == '/') {
  //   next()
  //   return
  // } else if ((!meta || !meta.free) && !token) {
  //   next(`/${store.state.tenantId}/wxLogin?redirect=${to.fullPath}`)
  //   return
  // }
  next()
})
router.afterEach(() => {
  nprogress.done();
});

export default router