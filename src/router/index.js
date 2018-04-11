import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/users/Login.vue'
import Invoices from '../components/invoices/Invoice.vue'

Vue.use(Router)
const routes = [
  {path: '/', component: Home},
  {path: '/login', component: Login},
  {path: '/:id/invoices', component: Invoices}
]

export default new Router({
  mode: 'history',
  routes
})
