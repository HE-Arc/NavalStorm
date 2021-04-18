import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import Game1 from '../views/Game1.vue'
import Game2 from '../views/Game2.vue'
import Profile from '../views/Profile.vue'
import store from '@/store';
import Connexion from '../views/Connexion.vue'

// import Api from "@/api/ApiRequester";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/connexion',
    meta:{
      requiresLoggedIn: true
    }
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: Connexion,
    meta:{
      requiresLoggedIn: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/game1',
    name: 'Game1',
    component: Game1,
    meta:{
      requiresLoggedIn: true
    }
  },
  {
    path: '/game2',
    name: 'Game2',
    component: Game2,
    meta:{
      requiresLoggedIn: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta:{
      requiresLoggedIn: true
    }
  },
  {
    path: '*',
    redirect: '/',
    meta:{
      requiresLoggedIn: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// function loadSessionFromStorage() {
//   if (window.sessionStorage.getItem("token") != null) {
//     Api.updateStore(JSON.parse(window.sessionStorage.getItem("user")), window.sessionStorage.getItem("token"), window.sessionStorage.getItem("refresh_token"));
//     return true;
//   } else {
//     return false;
//   }
// }


// function isLogged() {

//   // Not connected by login action
//   if (!store.state.isUserLogged) {
//     if (loadSessionFromStorage()) {
//       return true;
//     }
//     return false;
//   }
//   return true;
// }


router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresLoggedIn)) {
    if (!store.state.isUserLogged) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    //loadSessionFromStorage();
    next();
  }
});


export default router
