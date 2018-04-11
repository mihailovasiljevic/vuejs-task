import Users from '../../data/users'

const state = {
  user: null,
  error: {
    message: ''
  }
}

const actions = {
  login ({ commit }, authData) {
    const user = Users.find(element => element.username === authData.username && element.password === authData.password)
    if (user) {
      state.user = user
    } else {
      state.error.message = 'Nije pronadjen korisnik sa prosledjenim korisnickim imenom i lozinkom.'
    }
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
