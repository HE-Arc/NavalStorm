import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
  state: {
    isUserLogged: false,
    tokenUser: null,
    refreshTokenUser: null,
    drawer : false,
    user : {
      username : String,
      password : String,
      email : String,
      winNumber : String,
      playedGameNumber : String,
      avatar : String,
    },
    boardSize : 10,
    boardHeader : '',
    board: [],
    boardEnnemy : [],
    //todo put in backend the ships
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
    getDrawer: (state) => {
      return state.drawer;
    },
    getUser: (state) => {
      return state.user;
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
    getBoardSize: (state) => {
      return state.boardSize;
    },
    getBoardHeader: (state) => {
      return state.boardHeader;
    },
    getBoard: (state) => {
      return state.board;
    },
    getBoardAreaById: (state) => (areaID) => {
      return state.board.find(ar => ar.id === areaID);
    },
    getBoardEnnemy:(state)=>{
      return state.boardEnnemy;
    }
  },

  mutations: {
    SET_ENNEMY_BOARD:(state,board) => {
      state.boardEnnemy=board;
    },
    SET_DRAWER:(state, drawer) => {
      state.drawer = drawer;
    },
    FLIP_DRAWER:(state) => {
      state.drawer = !state.drawer;
    },
    UPDATE_USER:(state, user) => {
      state.user = user;
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
    INIT_BOARD:(state) => {
      //init board
      if(state.board.length != 0)
        return

      for (let i = 65; i < 65+state.boardSize; i++) {
        state.boardHeader += String.fromCharCode(i); 

        for (let j = 1; j <=state.boardSize; j++) {
          let area = { 
            id : String.fromCharCode(i) + j.toString(),
            isTouch : false,
            isBusy : false,
            whoIsThere : null,
          }
          state.board.push(area)
        }
      }
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
    LOG_USER(state, token, refreshToken) {
      state.isUserLogged = true;
      state.tokenUser = token;
      state.refreshTokenUser = refreshToken;
      return state;
    },
    LOGOUT(state) {
      state.isUserLogged = false;
      state.user = {};
      state.tokenUser = null;
      state.refreshTokenUser = null;
      return state;
    },
  },
  actions: {
    setEnnemyBoard:(store,board)=>{
      store.commit('SET_ENNEMY_BOARD',board);
    },
    flipDrawer: (store) => {
      store.commit('FLIP_DRAWER');
    },
    updateDrawer: (store, drawer) => {
      store.commit('SET_DRAWER', drawer);
    },
    updateCurrentShip : (store, currentShip) => {
      store.commit('UPDATE_CURRENT_SHIP', currentShip);
    },
    initBoard : (store) => {
      store.commit('INIT_BOARD');
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

    logUser(state, token, refreshToken) {
      state.commit('LOG_USER', token, refreshToken);
    },
    logout(state) {
      state.commit('LOGOUT');
    },
    updateUser(state, user) {
      state.commit("UPDATE_USER", user);
    },
  },
})
