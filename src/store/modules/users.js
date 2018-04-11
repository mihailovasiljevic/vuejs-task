import Users from '../../data/users'
const user = {
  id: -1,
  username: '',
  password: '',
  invoices: []
}
const state = {
  user: {
    id: -1,
    username: '',
    password: '',
    invoices: []
  },
  error: {
    message: ''
  }
}
const mutations = {
  'SET_USER' (state, authData) {
    state.user = JSON.parse(JSON.stringify(authData))
  },
  'SET_ERROR_MESSAGE' (state, error) {
    state.error = state.error !== null ? {...error} : null
  },
  'PUSH_INVOICE' (state, invoice) {
    if (state.user.invoices === undefined) {
      state.user.invoices = []
    }
    console.log(invoice)
    state.user.invoices.push(invoice)
  },
  'REMOVE_INVOICE' (state, index) {
    state.user.invoices.splice(index, 1)
  }
}
const actions = {
  login ({ commit }, authData) {
    const user = Users.find(element => element.username === authData.username && element.password === authData.password)
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
    commit('SET_USER', user)
  },
  addInvoice ({commit}, invoiceData) {
    commit('PUSH_INVOICE', invoiceData)
  },
  removeInvoice ({commit}, invoiceData) {
    const invoiceIdx = state.user.invoices.indexOf(state.user.invoices.find(element => element.invoiceNumber === invoiceData.invoiceNumber))
    commit('REMOVE_INVOICE', invoiceIdx)
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
  },
  invoices (state, getters) {
    return user.invoices
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
