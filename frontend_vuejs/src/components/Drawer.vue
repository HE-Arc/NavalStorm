 <!-- TEMPLATE -->
<template>
<v-navigation-drawer app temporary absolute v-model="isDisplay">
    <v-list nav dense>
        <v-list-item-group  mandatory>
            <v-list-item v-for="element in group" :key="element.text" :to="element.link">
                <v-list-item-icon>
                    <svg-icon type="mdi" :path="element.icon" />
                </v-list-item-icon>
                <v-list-item-title>
                    {{element.text}}
                </v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
</v-navigation-drawer>
</template>
 
<!-- SCRIPT -->
<script>
import Vue from "vue";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiHome, mdiLogout, mdiAccount, mdiGamepadVariant, mdiInformation } from '@mdi/js';

export default Vue.extend({
    name: "Drawer",
     components: {
        SvgIcon,
     },
    data ()  { 
      return  {
        group: [
          {
            icon: mdiHome,
            text: 'Home',
            link: '/',
          },
          {
            icon: mdiAccount,
            text: 'Profile',
            link: '/profile',
          },
          {
            icon: mdiGamepadVariant,
            text: 'Game',
            link: '/game1',
          },
          {
            icon: mdiInformation,
            text: 'About',
            link: '/About',
          },
          {
            icon: mdiLogout,
            text: 'Logout',
            link: '/logout',
          },
        ],
      }
    },
    methods: {
      //webpack don't interpret images correctly without going through this solution
      getImgUrl(img) {
        return require(`../assets/${img}`) 
      },
    },
    computed: {
      isDisplay: {
        get () {
          return this.$store.state.drawer
        },
        set (value) {
          this.$store.dispatch('updateDrawer', value)
        },
      }
    },
});
</script>