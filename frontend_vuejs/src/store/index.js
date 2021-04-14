import Vue from 'vue'
import Vuex from 'vuex'
import { axiosBase } from '../api/axios-base'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('access_token') || null, // makes sure the user is logged in even after
    // refreshing the page
     refreshToken: localStorage.getItem('refresh_token') || null,
     APIData: '' // received data from the backend API is stored here.
     ,

    board: [],
    ships : [
      {
        id : 1,
        isPlaced : false,
        isVertical : false,
        type : "carrier",
        length : 5,
        coord : [],
        img : "ships/carrier/Carrier.png",
        color : "Coral",
      },
      {
        id : 2,
        isPlaced : false,
        isVertical : false,
        type : "battleship ",
        length : 4,
        coord : [],
        img : "ships/battleship/Battleship.png",
        color : "Sienna",
      },
      {
        id : 3,
        isPlaced : false,
        isVertical : false,
        type : "destroyer ",
        length : 3,
        coord : [],
        img : "ships/destroyer/Destroyer.png",
        color : "Peru",
      },
      {
        id : 4,
        isPlaced : false,
        isVertical : false,
        type : "submarine",
        length : 3,
        coord : [],
        img : "ships/submarine/Submarine.png",
        color : "MediumAquaMarine",
      },
      {
        id : 5,
        isPlaced : false,
        isVertical : false,
        type : "patrolboat",
        length : 2,
        coord : [],
        img : "ships/patrolBoat/PatrolBoat.png",
        color : "DarkOrchid",
      },
    ],
    currentShip : null,
  },
  getters: {
    loggedIn (state) {
      return state.accessToken != null
    },
    getCurrentShip: (state) => {
      return state.currentShip;
    },
    getShips: (state) => {
      return state.ships;
    },
    getShipByType: (state) => (shipType) => {
      return state.ships.find(s => s.type === shipType);
    },
    getShipById: (state) => (shipID) => {
      return state.ships.find(ship => ship.id === shipID);
    },
    getBoard: (state) => {
      return state.board;
    },
    getBoardAreaById: (state) => (areaID) => {
      return state.board.find(ar => ar.id === areaID);
    },
  },
  mutations: {
    updateLocalStorage (state, { access, refresh }) {
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      state.accessToken = access
      state.refreshToken = refresh
    },
    updateAccess (state, access) {
      state.accessToken = access
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
    },

    UPDATE_CURRENT_SHIP:(state, currentShip) => {
      state.currentShip = currentShip;
    },
    PUSH_BOARD_AREA:(state, area) => {
      state.board.push(area);
    },
    UPDATE_BOARD_AREA:(state, newArea) => {
      const oldArea = state.board.find((oldArea) => oldArea.id === newArea.id);
      const oldAreaIndex = state.board.indexOf(oldArea);
      state.board.splice(oldAreaIndex, 1);
      state.board.push(newArea);
    },
    PUSH_SHIPS_SHIP:(state, ship) => {
      state.ships.push(ship);
    },
    UPDATE_SHIPS_SHIP:(state, newShip) => {
      const oldShip = state.ships.find((oldShip) => oldShip.id === newShip.id);
      const oldShipIndex = state.ships.indexOf(oldShip);
      state.ships.splice(oldShipIndex, 1);
      state.ships.push(newShip);
    },
  },
  actions: {
     // run the below action to get a new access token on expiration
     refreshToken (context) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/api/token/refresh', {
          refresh: context.state.refreshToken
        }) // send the stored refresh token to the backend API
          .then(response => { // if API sends back new access and refresh token update the store
            console.log('New access successfully generated')
            context.commit('updateAccess', response.data.access)
            resolve(response.data.access)
          })
          .catch(err => {
            console.log('error in refreshToken Task')
            reject(err) // error generating new access and refresh token because refresh token has expired
          })
      })
    },
    registerUser (context, data) {
      return new Promise((resolve, reject) => {
        axiosBase.post('/register', {
          name: data.name,
          email: data.email,
          username: data.username,
          password: data.password
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logoutUser (context) {
      if (context.getters.loggedIn) {
        return new Promise((resolve) => {
          axiosBase.post('/auth/token')
            .then(() => {
              localStorage.removeItem('access_token')
              localStorage.removeItem('refresh_token')
              context.commit('destroyToken')
            })
            .catch(err => {
              localStorage.removeItem('access_token')
              localStorage.removeItem('refresh_token')
              context.commit('destroyToken')
              resolve(err)
            })
        })
      }
    },
     
    loginUser (context, credentials) {
      return new Promise((resolve, reject) => {
        // send the username and password to the backend API:
        axiosBase.post('/auth/login/', 
        {
          email: credentials.email,
          password: credentials.password
        },{ 
        headers: {
          "x-csrf-token" : credentials.csrf
        }
      })
        // if successful update local storage:
          .then(response => {
            context.commit('updateLocalStorage', { access: response.data.access, refresh: response.data.refresh }) // store the access and refresh token in localstorage
            resolve()
          })
          .catch(err => {
            reject(err)
          })
      })
    },


    updateCurrentShip : (store, currentShip) => {
      store.commit('UPDATE_CURRENT_SHIP', currentShip);
    },
    pushAreaInBoard : (store, area) => {
      store.commit('PUSH_BOARD_AREA', area);
    },
    updateAreaInBoard : (store, area) => {
      store.commit('UPDATE_BOARD_AREA', area);
    },
    pushShipInShips : (store, ship) => {
      store.commit('PUSH_SHIPS_SHIP', ship)
    },
    updateShipInShips : (store, ship) => {
      store.commit('UPDATE_SHIPS_SHIP', ship);
    },
  },
})
