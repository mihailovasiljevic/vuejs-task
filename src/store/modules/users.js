import Users from '../../data/users'

const state = {
  user: null,
  error: {
    message: ''
  }
}
const mutations = {
  'SET_USER' (state, authData) {
    console.log('SET_USER')
    console.log(state.user)
    console.log(authData)
    state.user = authData !== null ? {...authData} : null
    console.log(state.user)
  },
  'SET_ERROR_MESSAGE' (state, error) {
    state.error = state.error !== null ? {...error} : null
  }
}
const actions = {
  login ({ commit }, authData) {
    console.log('LOGIN ACTION')
    console.log('USERS: ')
    console.log(Users)
    const user = Users.find(element => element.username === authData.username && element.password === authData.password)
    console.log('USER: ')
    console.log(user)
    if (user) {
      commit('SET_USER', user)
    } else {
      const error = {
        message: 'Nije pronadjen korisnik sa prosledjenim korisnickim imenom i lozinkom.'
      }
      commit('SET_ERROR_MESSAGE', error)
    }
  },
  logout ({ commit }) {
    commit('SET_USER', null)
  }
}

const getters = {
  user (state, getters) {
    if (state.user !== null) {
      let {password, ...retUser} = state.user
      return retUser
    } else {
      return null
    }
  },
  error (state, getters) {
    return state.error
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
