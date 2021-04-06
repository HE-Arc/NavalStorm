import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    board: [],
    ships : [
      {
        id : 1,
        isPlaced : false,
        isVertical : false,
        type : "carrier",
        length : 5,
        coord : [],
        imgFront : "ships/carrier/Carrier.png",
        color : "Coral",
      },
      {
        id : 2,
        isPlaced : false,
        isVertical : false,
        type : "battleship ",
        length : 4,
        coord : [],
        imgFront : "ships/battleship/Battleship.png",
        color : "Sienna",
      },
      {
        id : 3,
        isPlaced : false,
        isVertical : false,
        type : "destroyer ",
        length : 3,
        coord : [],
        imgFront : "ships/destroyer/Destroyer.png",
        color : "Peru",
      },
      {
        id : 4,
        isPlaced : false,
        isVertical : false,
        type : "submarine",
        length : 3,
        coord : [],
        imgFront : "ships/submarine/Submarine.png",
        color : "MediumAquaMarine",
      },
      {
        id : 5,
        isPlaced : false,
        isVertical : false,
        type : "patrolboat",
        length : 2,
        coord : [],
        imgFront : "ships/patrolBoat/PatrolBoat.png",
        color : "DarkOrchid",
      },
    ],
    currentShip : null,
  },
  getters: {
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
