<<<<<<< HEAD
<template>

  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
=======
 <template>
    <v-app>
      <Header />
      <v-main>
        <Drawer />
        <router-view></router-view>
      </v-main>
    </v-app>
>>>>>>> 68991ebb81afcedc8ea3696296476501e39c94d5
</template>

<script>
import Vue from "vue";
import Drawer from'@/components/Drawer.vue'
import Header from'@/components/Header.vue'
import "@/assets/styles/main.css";

export default Vue.extend({
    name: "App",
    components: { 
      Drawer,
      Header,
    }
});

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
</script>

