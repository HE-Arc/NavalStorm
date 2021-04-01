import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Game1 from '../views/Game1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
   {
    path: '/login',
    name: 'Login',
    component: Login
  },
   {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/game1',
    name: 'Game1',
    component: Game1
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
