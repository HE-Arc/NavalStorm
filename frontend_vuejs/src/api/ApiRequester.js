import store from '@/store';
// import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse }import Axios,  from "axios";
import Message from "@/components/Message.vue"
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

    async connectRandom(){
        try {
            const response = await this.instanceAxios.post("connexion/",{
                "player_id": this.store.state.user.id
            } )
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async connect(data){
        try {
            const response = await this.instanceAxios.post("connexion/",{
                "player_id": this.store.state.user.id,
                "name": data.name,
                "password":data.password
            })
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
     * Delete token
     */
    async logout() {
        store.dispatch('logout');
        window.sessionStorage.removeItem("user");
        window.sessionStorage.removeItem("token");
        window.sessionStorage.removeItem("refresh_token");
        this.token = null;
        this.refresh_token = null;
        router.push({ name: "Home" });
    }

    async register(account) {
        try {
            const response = await this.instanceAxios.post("users/", {
                "username": account.username,
                "password": account.password,
                "email": account.email
            });
            this.login({ "username": account.username, "password": account.password });
            return response;
        } catch (error) {
            this.eventBus.$emit(this.alert_name, Message.Level.Error, "Could not register user");
            throw error;
        }
    }

    getEventBus() {
        return this.eventBus;
    }

    /**
     * GET Method
     */
    async get(url) {
        return this.request("GET", url);
    }

    /**
     * Request to the API
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
            if (response.data != null) {
                if (response.data.success != null) {
                    this.eventBus.$emit(this.alert_name, Message.Level.Success, response.data.success);
                }
                if (response.data.info != null) {
                    this.eventBus.$emit(this.alert_name, Message.Level.Info, response.data.info);
                }
                if (response.data.warning != null) {
                    this.eventBus.$emit(this.alert_name, Message.Level.Warning, response.data.warning);
                }
                if (response.data.error != null) {
                    this.eventBus.$emit(this.alert_name, Message.Level.Error, response.data.error);
                }
            }
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