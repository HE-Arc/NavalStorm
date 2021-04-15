<!-- TEMPLATE -->
<template>
<v-app-bar color="primary">
    <v-app-bar-nav-icon @click="onClickDrawer()">
        <svg-icon type="mdi" :path="iconMenuPath" />
    </v-app-bar-nav-icon>
    <v-toolbar-title>
      Naval Storm
    </v-toolbar-title>
</v-app-bar>
</template>

<!-- SCRIPT -->
<script>
import Vue from "vue";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenu } from '@mdi/js';

export default Vue.extend({
    name: "Header",
    components: {
      SvgIcon,
    },
    data ()  { 
      return  {
        drawer: false,
        iconMenuPath: mdiMenu,
      }
    },
    methods: {
      onClickDrawer() {
        this.$store.dispatch('flipDrawer');
      }
    },
});
</script>