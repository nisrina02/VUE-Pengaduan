import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import register from '../views/register.vue'
import petugas from '../views/petugas.vue'
import pengaduan from '../views/pengaduan.vue'
import pengaduan_masyarakat from '../views/pengaduan_masyarakat.vue'
import report from '../views/report.vue'
import masyarakat from '../views/masyarakat.vue'
import Login from '../views/Login.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    components: {default: Home, header: Navbar, footer: Footer},
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    components: {default: register},
    meta: 
    {
      requiresAuth: true
    }
  },
  {
    path: '/petugas',
    name: 'petugas',
    components: {default: petugas, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
  {
    path: '/pengaduan',
    name: 'pengaduan',
    components: {default: pengaduan, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
  {
    path: '/pengaduan_masyarakat',
    name: 'pengaduan_masyarakat',
    components: {default: pengaduan_masyarakat, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
  {
    path: '/masyarakat',
    name: 'masyarakat',
    components: {default: masyarakat, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
  {
    path: '/report',
    name: 'report',
    components: {default: report, header: Navbar, footer: Footer},
    meta:
    {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
