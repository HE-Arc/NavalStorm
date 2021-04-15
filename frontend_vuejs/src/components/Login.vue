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
              <p>Sign in with your email and password:</p>
              <v-form ref='form'>
                <v-text-field
                              outline
                              label="Email"
                              type="email"
                              v-model="email"></v-text-field>
                <v-text-field
                              outline
                              label="Password"
                              type="password"
                              v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn color="error"  v-on:click="fnRegister">Register</v-btn >
              <v-spacer></v-spacer>
              <v-btn color="info"  v-on:click="fnLogin">Login</v-btn >
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
export default Vue.extend({
    name: "Login",
    data ()  { 
        return  { 
          password: null,
          email: null,
        }    
    }, 
    methods: {
      fnLogin () {
        if(this.$refs.form.validate()) {
          this.$store.dispatch('loginUser', {
            email: this.email,
            password: this.password,
          }).then(() => {
            this.$router.push({ name: 'Register' })
          })
        }
      }
      ,
      fnRegister () {
         this.$router.push({ name: "Register" });
      },
    },
});
</script>