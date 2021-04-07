 <template>
    <v-app>
      <Header />
      <v-main>
        <Drawer />
        <router-view></router-view>
      </v-main>
    </v-app>
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
</script>

