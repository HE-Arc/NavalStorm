import store from '@/store';
// import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse }import Axios,  from "axios";
import router from '../router';
import config from '../.env.json';
import Vue from 'vue';
import Axios  from "axios"

/**
 * API Service to link Front-End and Back-End
 * Allow developer to contact an APi with a Singleton pattern
 * 
 * @class ApiRequester
 */
class ApiRequester {
    // Properties
    static singleton;
    instanceAxios;
    user;
    token;
    refresh_token;
    eventBus;
    URL = config.apiUrl;
    client_id = config.client_id;
    client_secret = config.client_secret;
    grant_type = "password";
    alert_name = "alert-event";

    /**
     * Creates an instance of ApiRequester.
     */
    constructor() {
        this.user = {};
        this.token = null;
        this.eventBus = new Vue();
        this.instanceAxios = Axios.create({
            baseURL: `${this.URL}api/`,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
    }

    /**
     * Get Url
     *
     * @return {*} 
     */
    getUrl() {
        return this.URL;
    }

    /**
     * Get ApiRequester Instance (or create it if inexistant)
     *
     * @readonly
     * @static
     * @type {ApiRequester}
     */
    static get instance() {
        if (!ApiRequester.singleton) {
            this.singleton = new ApiRequester();
        }
        return ApiRequester.singleton;
    }

    /**
     * Set properties token in instance of APIrequester and vuex store
     * @param {*} token 
     */
    updateStore(user, token, refreshToken) {
        this.user = user;
        this.token = token;
        this.refresh_token = refreshToken;
        store.dispatch('logUser', this.token, this.refresh_token);
        store.dispatch('updateUser', this.user);
    }

    /**
     * Post the boards to the backend after phase1
     * @param {*} data 
     * @returns 
     */
    async gamePhase1(data){
        try {
        var bodyFormData = new FormData();
            bodyFormData.append("data",JSON.stringify(data.board));
            bodyFormData.append("idUser",(data.userid));
            const response = await this.instanceAxios.post("games/", bodyFormData);      
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }
    /**
     * Log User in Application and store his token
     */
    async login(credentials) {
        try {

            var bodyFormData = new FormData();
            bodyFormData.append("grant_type", this.grant_type);
            bodyFormData.append(
                "client_id",
                this.client_id
            );
            bodyFormData.append(
                "client_secret",
                this.client_secret
            );
            bodyFormData.append("username", credentials.username);
            bodyFormData.append("password", credentials.password);

            const response = await this.instanceAxios.post("login/token/", bodyFormData);

            this.token = response.data.access_token;
            this.refresh_token = response.data.refresh_token;
            await this.updateUserInformations();

            // Store user
            store.dispatch('logUser', this.token, this.refresh_token);
            window.sessionStorage.setItem("token", this.token);
            window.sessionStorage.setItem("refresh_token", this.refresh_token);
            return response.data;

        } catch (error) {
            throw error.response.data;
        }
    }

    /**
     * Connect to server
     * @param {*} data 
     * @returns 
     */
    async connect(data){
        try {
            const response = await this.instanceAxios.post("servers/",{
                "first_player":data.id,
                "name": data.name,
                "password": data.password
            })
            //store.dispatch('updateServer', response.data.server);
            window.sessionStorage.setItem("server",JSON.stringify(response.data.server))
            return response
        } catch (error) {
            console.log(error)
        }
    }
    
    /**
     * Update user
     */
    async updateUserInformations() {
        try{
            this.user = await this.get("users/me/");
            store.dispatch('updateUser', this.user);
            window.sessionStorage.setItem("user", JSON.stringify(this.user));
        } catch(error){
            console.log("Error while updating user info " + error);
        }
    }

    /**
     * Upate user's informations when lose/win
     * @param {} bool 
     */
    async updateUserInformationsWinLoose(bool){
            console.log(this.$store.state.user)
            try{
                if(bool){
                    var win=parseInt(this.user.winNumber)
                    this.$store.state.user.winNumber = win++;
                }
                var nb=parseInt(this.user.playedGameNumber)
                this.$store.state.user.playedGameNumber = nb++;
                store.dispatch('updateUser', this.user);
                window.sessionStorage.setItem("user", JSON.stringify(this.user));
                await this.put(`users/${this.$store.state.user.id}/`, {
                    id:this.userid,
                    playedGameNumber:this.$store.state.user.playedGameNumber,
                    winNumber:this.$store.state.user.winNumber,
                });
            } catch(error){
                console.log("Error while updating user info " + error);
            
            }
    }

    /**
     * return the opponent board
     */
    async getBoardEnemy(){
        try{
            console.log("ENEMY : "+ store.state.enemyUser)
            this.boardEnemy = await this.get("/games/getBoard/",store.state.enemyUser);
            store.dispatch('updateBoardEnnemy',this.boardEnemy.data);
            store.dispatch('updateKeyBoardEnnemy',this.boardEnemy.id);
            window.sessionStorage.setItem("boardEnemy", JSON.stringify(this.boardEnemy.data));
        }catch(error){
            console.log(error)
        }
    }

    /**
     * return own board
     */
    async getBoard(){
        try{
            console.log(store.state.user.id)
            this.board = await this.get("/games/getBoard/",store.state.user.id);
            store.dispatch('getBoard',this.board.data);
            window.sessionStorage.setItem("board", JSON.stringify(this.board.data));
        }catch(error){
            console.log(error)
        }
    }

    /**
     * return opponent user
     * @returns 
     */
    async getEnemyUser(){
        try {
            const response = await this.instanceAxios.post("servers/",{
                "first_player":store.state.user.id,
                "name": JSON.parse(window.sessionStorage.getItem("server")).name,
                "password": JSON.parse(window.sessionStorage.getItem("server")).password
            })
            window.sessionStorage.setItem("server",JSON.stringify(response.data.server))
        } catch (error) {
            console.log(error)
        }
        if(JSON.parse(window.sessionStorage.getItem("server")).second_player != undefined){
            store.dispatch('updateEnemyUser',JSON.parse(window.sessionStorage.getItem("server")).second_player)
            return true
        } 
        return false
    }
    
    /**
     * Update Board
     */
    async updateEnnemyBoard(data) {
        try{

            var bodyFormData = new FormData();
            bodyFormData.append("data",JSON.stringify(data.board));
            var idBoard = data.boardId;
    
            bodyFormData.append("board",idBoard);

            const response = await this.instanceAxios.patch("games/"+idBoard+"/", bodyFormData);  
            store.dispatch('updateBoardEnnemy', data.board);
            return response.data;
        } catch(error){
            console.log("Error while updating user info " + error);
        }
    }

    /**
     * Delete token
     */
    async logout() {
        store.dispatch('logout');
        window.sessionStorage.removeItem("user");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("refresh_token");
        this.token = null;
        this.refresh_token = null;
        router.push({ name: "login" });
    }

    /**
     * register an account
     * @param {account to register} account 
     * @returns 
     */
    async register(account) {
            const response = await this.instanceAxios.post("users/", {
                "username": account.username,
                "password": account.password,
                "email": account.email
            });
            this.login({ "username": account.username, "password": account.password });
            return response;
    }
    /**
     * GET Method
     */
    async get(url) {
        return this.request("GET", url);
    }

    /**
     * Generic Request to  API
     */
    async request(method, url, body = null) {
        const requestConfig = {
            method: method,
            url: url,
            headers: { Authorization: `Bearer ${this.token}`, }
        };
        if (body != null) {
            requestConfig.data = body;
        }
        try {
            const response = await this.instanceAxios(requestConfig);
            return response.data;
        } catch (error) {
            if (error.response.status == 401) {
                try {
                    await this.refresh();
                    requestConfig.headers = { Authorization: `Bearer ${this.token}`, }
                    const response = await this.instanceAxios(requestConfig);
                    return response.data;
                } catch (error) {
                    this.logout();
                    router.push({ name: "login" });
                }
            } else {
                throw (error);
            }
        }
    }



    /**
     * Refresh token
     */
    async refresh() {
        var bodyFormData = new FormData();
        bodyFormData.append("grant_type", "refresh_token");
        bodyFormData.append(
            "client_id",
            this.client_id
        );
        bodyFormData.append(
            "client_secret",
            this.client_secret
        );
        bodyFormData.append("refresh_token", this.refresh_token);

        const response = await this.instanceAxios.post("login/token/", bodyFormData);

        this.token = response.data.access_token;
        this.refresh_token = response.data.refresh_token;

        store.dispatch('logUser', this.token, this.refresh_token);
        window.sessionStorage.setItem("token", this.token);
        window.sessionStorage.setItem("refresh_token", this.refresh_token);
    }

    /**
     * POST Method
     */
    async post(url, body) {
        return this.request("POST", url, body);
    }

    /**
     * PUT Method
     */
    async put(url, body) {
        return this.request("PUT", url, body);
    }

    /**
     * DELETE method
     */
    delete(url) {
        return this.request("DELETE", url);
    }

    /**
     * PATCH method
     */
    async patch(url, body) {
        return this.request("PATCH", url, body);
    }
}

export default ApiRequester.instance;
