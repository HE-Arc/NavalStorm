import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     board: [],
  },
   getters: {
    getBoard: (state) => {
      return state.board;
    }
  },
  mutations: {
    PUSH_BOARD_VALUE:(state, value) => {
      state.board.push(value);
    },
  },
  actions: {
      pushBoardValue : (store, value) => {
        store.commit('PUSH_BOARD_VALUE', value);
    },
  },
  modules: {
  }
})
