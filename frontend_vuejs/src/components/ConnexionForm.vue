<!-- TEMPLATE -->
<template>
    <div id="app">
        <v-app>
            <v-container>
                <v-layout wrap>
                    <v-flex sm12 md6 offset-md3>
                        <v-card elevation="4" light tag="section">
                            <v-card-title class="justify-center">
                                <h3>Naval Storm - Connexion to server</h3>
                                <v-flex>
                                <v-img class="ml-0" contain height="200px" position="center" src="../assets/logo-login.png"></v-img>
                                </v-flex>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <p>Create a server with a name (password optional)</p>
                                <v-form ref='form'>
                                    <v-text-field
                                    outline
                                    label="Name"
                                    v-model="name"></v-text-field>
                                    <v-text-field
                                    outline
                                    label="Password"
                                    type="password"
                                    v-model="password"></v-text-field>
                                    
                                </v-form>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions :class="{'pa-3': $vuetify.breakpoint.smAndUp }">
                                <v-btn color="error"  v-on:click="fnRegister">Random Connexion</v-btn >
                                <v-spacer></v-spacer>
                                <v-btn color="info"  v-on:click="fnLogin" :disabled="loading">Connexion</v-btn >
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
    name: "ConnexionForm", 
    data(){
        return {
            name: null,
            password: null
        }
    },
    methods: {
        randomConnexion : async function(){
            try {
                const response = await Api.connectRandom();
                this.$router.push({name:"Game/"+response.url}) //TODO REDIRECT TO THE GOOD GAME
            } catch (error) {
                console.log(error.message)
            }
        },
        normalConnexion : async function(){
            try{
                const response = await Api.connect({
                    name: this.name,
                    password: this.password?this.password:'',
                });
                this.$router.push({name:"Game/"+response.url}) //TODO REDIRECT TO THE GOOD GAME
            } catch(error){
                console.log(error.message)
            }
        },
    },
});
</script>