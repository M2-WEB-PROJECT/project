import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    barColor: '#2E383D, rgba(0, 0, 0, .8)',
    drawer: null,
    user: null,
    userData: null,
    demands: 0,
  },
  mutations: {
    SET_ACCESS_DEMANDS (state, payload) {
      state.demands = payload
    },
    SET_ACCESS_PROJECTS (state, payload) {
      state.userData.accessProjects = payload
    },
    SET_PROJECTS (state, payload) {
      state.userData.projects = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_USER_DATA (state, payload) {
      state.userData = payload
    },
    SET_DRAWER (state, payload) {
      state.drawer = payload
    },
  },
  actions: {

  },
})
