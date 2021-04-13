import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Game1 from '../views/Game1.vue'
import Logout from '../views/Logout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    meta: {
      requiresLogged: true
    }
  },
   {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresLogged: true
    }
  },
   {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresLogged: true
    }
  },
  {
    path: '/game1',
    name: 'Game1',
    component: Game1,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: {
      requiresAuth: true
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
