import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Game1 from '../views/Game1.vue'
import Game2 from '../views/Game2.vue'
import Profile from '../views/Profile.vue'
import store from '@/store';

import Api from "@/api/ApiRequester";
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
      requiresAuth: false//todo to set TRUE
    }
  },
  {
    path: '/game2',
    name: 'Game2',
    component: Game2
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '*',
    redirect: '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function loadSessionFromStorage() {
  if (window.sessionStorage.getItem("token") != null) {
    Api.updateStore(JSON.parse(window.sessionStorage.getItem("user")), window.sessionStorage.getItem("token"), window.sessionStorage.getItem("refresh_token"));
    return true;
  } else {
    return false;
  }
}


function isLogged() {
  // Not connected by login action
  if (!store.state.isUserLogged) {
    if (loadSessionFromStorage()) {
      return true;
    }
    return false;
  }
  return true;
}


router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.onlyLogged)) {
    if (!isLogged()) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (to.matched.some((route) => route.meta.onlyUnlogged)) {
    if (isLogged()) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    loadSessionFromStorage();
    next();
  }
});


export default router
