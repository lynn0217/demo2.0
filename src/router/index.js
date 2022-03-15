import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: () => import('../components/home.vue'),
    children: [
      {
        path: '/welcome',
        component: () => import('../components/welcome.vue')
      },
      {
        path: '/users',
        component: () => import('../components/user/users.vue')
      },
      {
        path: '/rights',
        component: () => import('../components/power/rights.vue')
      },
      {
        path: '/roles',
        component: () => import('../components/power/roles.vue')
      },
      {
        path: '/categories',
        component: () => import('../components/goods/cate.vue')
      },
      {
        path: '/params',
        component: () => import('../components/goods/params.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  // to代表将要访问得路径
  // from代表从哪个路径跳出来
  // next 是一个函数，代表放行
  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
