<template>
<div id="app">
  <v-app>
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title class="justify-center">
                <h3>Naval Storm - Register</h3>
                <v-flex>
                  <v-img class="ml-0" contain height="200px" position="center" src="../assets/logo-register.png"></v-img>
                </v-flex>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Create a new account with your email, username and password:</p>
              <v-form ref='form'>
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
                              label="Password (Min. 8 characters with at least one capital letter and a number)"
                              type="password"
                              v-model="password"
                              :disabled="loading"
                              :rules="[passwordRule.passwordValidation]"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
            <v-btn color="error"  v-on:click="fnLogin">I have already</v-btn >
            <v-spacer></v-spacer>
            <v-btn color="info"  v-on:click="fnRegister"   :loading="loading">Create Account</v-btn >
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
    name: "Register",
    data ()  { 
        return  { 
          email: null,
          password: null,
          username: null,
          emailRule: [ 
                        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email not valid'
          ],
          usernameRule: [ 
                        v => /^[a-zA-Z0-9]+$/.test(v) || 'Username not valid'
          ],
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
    fnRegister: async function () {
      this.loading = true;
      try {
      
          await Api.register({
            username: this.username,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation,
          });
          this.$router.push({ name: "Home" });
      } catch (e) {
        console.log(e);
        if ("username" in e) {
          this.errors["username"] = e.username[0];
        }
      } finally {
        this.loading = false;
      }
    },
    fnLogin () {
         this.$router.push({ name: "Login" });
      },
  },
});
</script>

