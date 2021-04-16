<!-- TEMPLATE -->
<template>
<v-app-bar color="primary">
  
    <v-app-bar-nav-icon @click="onClickDrawer()">
        <svg-icon type="mdi" :path="iconMenuPath" />
    </v-app-bar-nav-icon>
      <v-toolbar-title>
        Naval Storm
      </v-toolbar-title>
      <v-switch
                class="pull-right"
                :label="`Dark mode : ${switchDarkmode.toString()}`"
                v-model="switchDarkmode"
                style="float:right;"
              ></v-switch>
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
        switchDarkmode: this.$vuetify.theme.dark,
      }
    },
    methods: {
      onClickDrawer() {
        this.$store.dispatch('flipDrawer');
      }
    },
    watch: {
      switchDarkmode(switched) {
        this.$vuetify.theme.dark = switched;
      }
    },
});
</script>