import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     bieres: [],
  },
  mutations: {
    ADD_BIERE:(state, nom, alcool) => {
      state.bieres.push({
        nom : nom,
        alcool : alcool,
        brasserie : 1,
      })
    },
  },
  actions: {
    addBiere : (store, nom, alcool) => {
      store.commit('ADD_BIERE', nom, alcool)
    }
  },
  modules: {
  }
})
