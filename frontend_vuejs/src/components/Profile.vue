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
  
            <v-list-item-title class="headline mb-1" :user="user"></v-list-item-title>

          </v-list-item-content>
      
          <v-list-item-avatar
          tile size="auto" color="grey"><img src="../assets/logo-login.png" alt="">
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn  color="primary"  @click="onClickBtnStat()" :disabled="isChartDisplay">
            <svg-icon type="mdi" :path="iconChartPath" />
            Statistics
          </v-btn>
          <v-btn  color="primary" @click="onClickBtnModification()" :disabled="isModiDisplay">
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
          
                :rules="emailRule"></v-text-field>
            <v-text-field
                outline
                label="Username"
                type="text"
                v-model="username"
          
                :rules="usernameRule"></v-text-field>
            <v-text-field
                outline
                label="New Password"
                type="password"
                v-model="new_password"
          
                :rules="[passwordRule.passwordValidation]"></v-text-field>
            <v-text-field
                outline
                label="Confirm New Password"
                type="password"
                v-model="confirm_new_password"
              
                :rules="[passwordRule.passwordValidation]"></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions >
          <v-spacer></v-spacer>
          <v-btn color="success"  @click="onClickSave()">Save</v-btn >
        </v-card-actions>
      </v-card>
    </v-flex>

      <!-- Donut Chart -->
    <v-flex sm12 md6 offset-md3>
      <v-card class="mx-auto" max-width="450" outlined elevation="10" v-if="isChartDisplay">
          <div v-if="this.$store.state.user.playedGameNumber > 0 " >
            <DoughnutChart />
          </div>
          <p class="display-1" v-else>You must play at least one game to get Statistics</p>
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
      isModiDisplay: true,
      email: this.$store.state.user.email,
      emailRule: [ 
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email not valid'
      ],
      username: this.$store.state.user.username,
      usernameRule: [ 
        v => /^[a-zA-Z0-9]+$/.test(v) || 'Username not valid'
      ],
      new_password: null,
      confirm_new_password: null,
      passwordRule : {
        passwordValidation: new_password => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
        return (pattern.test(new_password) || "Min. 8 characters with at least one capital letter and a number.")
        },
      }
    } 
  }, 
  methods: {
    onClickBtnStat () {
      this.isChartDisplay = !this.isChartDisplay;
      this.isModiDisplay = false
    },
    onClickBtnModification(){
      this.isModiDisplay = !this.isModiDisplay;
      this.isChartDisplay = false;
    },
    async onClickSave () {
      this.loading = true;
      try {
        if (this.new_password) {
          if(this.new_password==this.confirm_new_password){
            console.log("password change")
            await Api.put(`users/${this.$store.state.user.id}/`, {
              email: this.email,
              username: this.username,
              password: this.new_password,
            });
            Api.updateUserInformations();
            this.$router.push({path: `/users/${this.$store.state.user.id}/` });
            this.$fire({
              title: "Settings Updated",
              text: "Password has been updated.",
              type: "success",
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500
            }).then();

          } else {
            
            this.$fire({
            title: "Hum...Something is not good : ",
            text: "Password & Confirmation are not the same",
            type: "error",
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          }).then();
            
          }
        } else {
          console.log("no password change")
          await Api.put(`users/${this.$store.state.user.id}/`, {
            email: this.email,
            username: this.username,
          });
          Api.updateUserInformations();
          this.$router.push({ path: `/users/${this.$store.state.user.id}/` });
          this.$fire({
            title: "Settings Updated",
            text: "Email or Username updated! ",
            type: "success",
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          }).then();
        }
         this.$router.push({ name: "Profile" });
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
