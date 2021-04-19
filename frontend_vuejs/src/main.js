import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/index'
import store from './store/index'
import titleMixIn from './titleMixIn'
import IdleVue from 'idle-vue'

import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);
Vue.mixin(titleMixIn);  //useful for the titles
const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 720000
}) // sets up the idle time,i.e. time left to logout the user on no activity
Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')