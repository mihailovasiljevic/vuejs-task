import Users from '../../data/users'
import Vue from 'vue'

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
    Vue.set(state.user, 'invoices', [])
    state.error.message = ''
  },
  'SET_ERROR_MESSAGE' (state, error) {
    state.error = state.error !== null ? {...error} : null
  },
  'PUSH_INVOICE' (state, invoice) {
    state.user.invoices.push(invoice)
    state.error.message = ''
  },
  'REMOVE_INVOICE' (state, index) {
    state.user.invoices.splice(index, 1)
    state.error.message = ''
  },
  'DUPLICATE_INVOICE' (state, invoice) {
    const invoiceList = state.user.invoices.slice(0)
    console.log(invoice)
    invoiceList.splice(invoice.idx, 0, invoice.inv)
    state.user.invoices = invoiceList.slice(0)
    state.error.message = ''
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
    const invoiceIdx = state.user.invoices.indexOf(state.user.invoices.find(element => element.id === invoiceData.id))
    if (invoiceIdx !== -1) {
      commit('SET_ERROR_MESSAGE', {message: 'Invoice with that id already exists.'})
    } else {
      commit('PUSH_INVOICE', invoiceData)
    }
  },
  removeInvoice ({commit}, invoiceData) {
    const invoiceIdx = state.user.invoices.indexOf(state.user.invoices.find(element => element.id === invoiceData.id))
    if (invoiceIdx === -1) {
      commit('SET_ERROR_MESSAGE', {message: 'Invoice with that id doesn\'t exists.'})
    } else {
      commit('REMOVE_INVOICE', invoiceIdx)
    }
  },
  duplicateInvoice ({commit}, invoiceData) {
    const invoiceIdx = state.user.invoices.indexOf(state.user.invoices.find(element => element.id === invoiceData.id))
    const newInvoice = {}
    Object.assign(newInvoice, invoiceData)
    newInvoice.id = createNewId(state.user.invoices.length - 1, state.user.invoices)
    if (invoiceIdx === -1) {
      commit('SET_ERROR_MESSAGE', {message: 'Invoice with that id doesn\'t exists.'})
    } else {
      if (invoiceIdx === state.user.invoices.length - 1) {
        commit('PUSH_INVOICE', newInvoice)
      } else {
        commit('DUPLICATE_INVOICE', {idx: invoiceIdx, inv: newInvoice})
      }
    }
  }
}
var createNewId = function (id, invoices) {
  if (invoices.some(invoice => invoice.id === id)) {
    return createNewId(id + 1, invoices)
  } else {
    return id
  }
}
const getters = {
  user (state, getters) {
    if (state.user !== null) {
      const {password, ...retUser} = state.user
      return retUser
    } else {
      return null
    }
  },
  error (state, getters) {
    return state.error
  },
  invoices (state, getters) {
    return state.user.invoices
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
