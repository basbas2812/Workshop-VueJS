export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || ''
  },
  getters: {
    isLoggedIn: state => !!state.token
  },
  mutations: {
    SET_AUTH(state, { token, username }) {
      state.token = token
      state.username = username
    },
    CLEAR_AUTH(state) {
      state.token = null
      state.username = ''
    }
  },
  actions: {
    login({ commit }, { token, username }) {
      localStorage.setItem('token', token)
      localStorage.setItem('username', username)
      commit('SET_AUTH', { token, username })
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      commit('CLEAR_AUTH')
    }
  }
}
