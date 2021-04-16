<template>
<div id="app">
  <v-app>
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title class="justify-center">
                <h3>Naval Storm</h3>
                <v-flex>
                  <v-img class="ml-0" contain height="200px" position="center" src="../assets/logo-login.png"></v-img>
                </v-flex>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form ref='form'>
                <v-text-field
                  outline
                  label="Username"
                  :disabled="loading"
                  v-model="username"></v-text-field>
                <v-text-field
                  outline
                  label="Password"
                  type="password"
                  v-model="password"
                  :disabled="loading"></v-text-field>
                  
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn color="error"  v-on:click="fnRegister">Register</v-btn >
              <v-spacer></v-spacer>
              <v-btn color="info"  v-on:click="fnLogin" :disabled="loading">Login</v-btn >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</div>
</template>



<!-- SCRIPT -->
<script>
import Vue from "vue";
import Api from "@/api/ApiRequester";
export default Vue.extend({
    name: "Login",
    data ()  { 
        return  {
          loading: false, 
          password: null,
          username: null,
        }    
    }, 
    methods: {
      fnLogin : async function () {
      this.loading = true;
      try {
        await Api.login({
          username: this.username,
          password: this.password,
        });
        this.errorPost = "";

        this.$router.push({ name: "Profile" });
        this.loading = false;
      } catch (e) {
        this.errorPost = e.message;
      } finally {
        this.loading = false;
      }
    },
      fnRegister () {
         this.$router.push({ name: "Register" });
      },
    },
});
</script>