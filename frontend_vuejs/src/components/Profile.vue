<template>
<div id="app">
  <v-app>
      <!-- Profile card -->
<v-flex sm12 md6 offset-md3>
  <v-card class="mx-auto" max-width="450" outlined elevation="10">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
        Profile
        </div>

        <v-list-item-title class="headline mb-1">
        Capitain Haddock
        </v-list-item-title>

        <v-list-item-subtitle>
        #userID
        </v-list-item-subtitle>
      </v-list-item-content>
  
      <v-list-item-avatar
       tile size="auto" color="grey"><img src="https://people.he-arc.ch/photos/GrunenwaldDavid.jpg" alt="">
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn  color="primary"  @click="onClickBtnStat()" :disabled="isModiDisplay">
        <svg-icon type="mdi" :path="iconChartPath" />
        Statistics
      </v-btn>
      <v-btn  color="primary" @click="onClickBtnModi()" :disabled="isChartDisplay">
        <svg-icon type="mdi" :path="iconPenPath" />
        Modify
        </v-btn>
    </v-card-actions>
  </v-card>
</v-flex>

 <!-- Modify -->
<v-flex sm12 md6 offset-md3>
  <v-card class="mx-auto" max-width="450" outlined elevation="10" v-if="isModiDisplay">
    <v-card-text>
      <v-form>
        <v-text-field
            outline
            label="Email"
            type="text"
            v-model="email"
            :disabled="loading"
            :rules="emailRule"></v-text-field>
        <v-text-field
            outline
            label="Username"
            type="text"
            v-model="username"
            :disabled="loading"
            :rules="usernameRule"></v-text-field>
        <v-text-field
            outline
            label="Password"
            type="password"
            v-model="password"
            :disabled="loading"
            :rules="[passwordRule.passwordValidation]"></v-text-field>
        <v-text-field
            outline
            label="Confirme Password"
            type="password"
            v-model="new_password"
            :disabled="loading"
            :rules="[passwordRule.passwordValidation]"></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions >
      <v-btn color="error" @click="onClickBtnModi()">Hide</v-btn >
      <v-spacer></v-spacer>
      <v-btn color="success"  @click="onClickSave()">Save</v-btn >
    </v-card-actions>
  </v-card>
</v-flex>

  <!-- Donut Chart -->
<v-flex sm12 md6 offset-md3>
  <v-card class="mx-auto" max-width="450" outlined elevation="10" v-if="isChartDisplay">
    <DoughnutChart />
    <v-divider></v-divider>
    <v-card-actions >
      <v-btn color="error" @click="onClickBtnStat()">Hide</v-btn >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
</v-flex>
  </v-app>
</div>
</template>
<!-- SCRIPT -->
<script>
import Vue from "vue";
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiPencilOutline } from '@mdi/js'; 
import { mdiChartLine } from '@mdi/js';
import DoughnutChart from "./DoughnutChart.vue";
import Api from "@/api/ApiRequester";

export default Vue.extend({
  name: "Profile",
  components: {
    SvgIcon,
    DoughnutChart,
  },
  data ()  { 
    return  {
      iconPenPath: mdiPencilOutline,
      iconChartPath: mdiChartLine,
      isChartDisplay: false,
      isModiDisplay: false,
      email: null,
      emailRule: [ 
                  v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email not valid'
      ],
      username: null,
      usernameRule: [ 
                  v => /^[a-zA-Z0-9]+$/.test(v) || 'Username not valid'
      ],
      password: null,
      new_password: null,
      passwordRule : {
        required: password => !!password || "Required.",
        passwordValidation: password => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
        return (pattern.test(password) || "Min. 8 characters with at least one capital letter and a number.")
        },
      }
    } 
  }, 
  methods: {
    onClickBtnStat () {
      this.isChartDisplay = !this.isChartDisplay;
    },
    async onClickBtnModi () {
      this.isModiDisplay = !this.isModiDisplay;
      this.loading = true;
      this.errors["username"] = "";
      this.errors["password"] = "";
      try {
        if (this.new_password) {
          await Api.put(`users/${this.userId}/`, {
            email: this.email,
            username: this.username,
            password: this.password,
            new_password: this.new_password,
          });
          Api.updateUserInformations();
          this.$router.push({ path: `/users/${this.userId}/` });
        } else if (this.password) {
          await Api.put(`users/${this.userId}/`, {
            email: this.email,
            username: this.username,
            password: this.password,
          });
          Api.updateUserInformations();
          this.$router.push({ path: `/users/${this.userId}/` });
        }
      } catch (e) {
        if (e.response.data.error) {
          if (e.response.data.error.includes("Username")) {
            this.errors["username"] = e.response.data.error;
          }
          if (e.response.data.error.includes("password")) {
            this.errors["password"] = e.response.data.error;
          }
        }
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>