import store from '@/store';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import MessageCenter from "@/components/MessageCenter.vue"
import router from '../router';
import config from '../../.env.json';
import Vue from 'vue';

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
     *
     * @param {ILogin} credentials credentials to log
     * @return {*}  {Promise<IToudoumResponse>} API Response
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

            // Store user in Vuex store and sessionStorage
            store.dispatch('logUser', this.token, this.refresh_token);
            window.sessionStorage.setItem("token", this.token);
            window.sessionStorage.setItem("refresh_token", this.refresh_token);
            return response.data;

        } catch (error) {
            throw error.response.data;
        }
    }

    /**
     * Update user in session and store vuex
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
     * Delete token from properties, sessions and store vuex
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

    /**
     * Register an Account
     *
     * @param {IRegister} account account to register
     * @return {*}  {Promise<AxiosResponse>} API Response
     */
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
            this.eventBus.$emit(this.alert_name, MessageCenter.Level.Error, "Could not register user");
            throw error;
        }
    }

    /**
     * Check if API server is UP
     *
     * @return {*}  {Promise<AxiosResponse>} API Response
     */
    getStateServer() {
        return this.instanceAxios.get("state");
    }

    /**
     * Get the event bus associated with the APIrequester
     * @returns the event bus
     */
    getEventBus() {
        return this.eventBus;
    }

    displayError(message){
        this.eventBus.$emit(this.alert_name, MessageCenter.Level.Error, message);
    }

    /**
     * Request a GET Method
     *
     * @template T type to cast the data got from API
     * @param {string} url url to request 
     * @return {*}  {Promise<T>} Promise of type T
     */
    async get(url) {
        return this.request("GET", url);
    }

    /**
     * Request the API
     *
     * @private
     * @param {("GET" | "POST" | "PUT" | "DELETE" | "PATCH")} method string method to use
     * @param {string} url url to request
     * @param {*} [body] body to add in request
     * @return {*}  {Promise<IToudoumResponse>} Api Response
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
            //GLOBAL ERROR MANAGEMENT
            if (response.data != null) {
                if (response.data.success != null) {
                    this.eventBus.$emit(this.alert_name, MessageCenter.Level.Success, response.data.success);
                }
                if (response.data.info != null) {
                    this.eventBus.$emit(this.alert_name, MessageCenter.Level.Info, response.data.info);
                }
                if (response.data.warning != null) {
                    this.eventBus.$emit(this.alert_name, MessageCenter.Level.Warning, response.data.warning);
                }
                if (response.data.error != null) {
                    this.eventBus.$emit(this.alert_name, MessageCenter.Level.Error, response.data.error);
                }
            }
            return response.data;
        } catch (error) {
            //Authentication error: try to use the refresh token
            if (error.response.status == 401) {
                try {
                    //try once
                    await this.refresh();
                    requestConfig.headers = { Authorization: `Bearer ${this.token}`, }
                    const response = await this.instanceAxios(requestConfig);
                    return response.data;
                } catch (error) {
                    //if the refresh token is not good, need to login again
                    this.logout();
                    router.push({ name: "Login" });
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

        // Store user in Vuex store and sessionStorage
        store.dispatch('logUser', this.token, this.refresh_token);
        window.sessionStorage.setItem("token", this.token);
        window.sessionStorage.setItem("refresh_token", this.refresh_token);
    }

    /**
     * POST data to API
     *
     * @param {string} url url to request
     * @param {*} body body to post
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    async post(url, body) {
        return this.request("POST", url, body);
    }

    /**
     * PUT data to API
     *
     * @param {string} url url to request
     * @param {*} body body to put
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    async put(url, body) {
        return this.request("PUT", url, body);
    }

    /**
     * DELETE method to API
     *
     * @param {string} url url to request
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    delete(url) {
        return this.request("DELETE", url);
    }

    /**
     * PATCH method to API
     *
     * @param {string} url url to request
     * @param {*} body body to PATCH
     * @return {*}  {Promise<IToudoumResponse>} API Response
     */
    async patch(url, body) {
        return this.request("PATCH", url, body);
    }
}

export default ApiRequester.instance;