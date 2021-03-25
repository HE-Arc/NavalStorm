<template>
<div id="app">
  <v-app>
    <v-container>
      <v-layout wrap>
        <v-flex sm12 md6 offset-md3>
          <v-card elevation="4" light tag="section">
            <v-card-title class="justify-center">
                <h3>{{ platformName }}</h3>
                <v-flex>
                  <v-img :alt="platformName" class="ml-0" contain height="200px" position="center" src="https://cdn.dribbble.com/users/25990/screenshots/3364653/screen_shot_2017-03-15_at_10.43.24_am.png"></v-img>
                </v-flex>
           
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <p>Sign in with your username and password:</p>
              <v-form>
                <v-text-field
                              outline
                              label="Username"
                              type="text"
                              v-model="username"></v-text-field>
                <v-text-field
                              outline
                              hide-details
                              label="Password"
                              type="password"
                              v-model="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">
              <v-btn color="info" flat>
                Forgot password?
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info" :large="$vuetify.breakpoint.smAndUp">
                Login
              </v-btn>
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
import axios from "axios";

export default Vue.extend({
    name: "Login",
    data ()  { 
        return  { 
          darkTheme: true,
          platformName: 'Naval Storm',
          password: null,
         username: null
    } 
  } , 
    mounted () {
    },
    methods: {
    },
    validate () {
      if(this.$refs.form.validate()) {
        let payload = { }
        let res = axios
                      .post('http://localhost:8000/biereapi/biere/', payload)
                      .then(response => console.log(response.data))
                      .catch(error => console.log(error))
        let data = res.data;
        console.log(data);
      }
    },
});
</script>