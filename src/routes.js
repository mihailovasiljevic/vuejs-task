import Home from './components/Home.vue'
import Login from './components/users/Login.vue'
import Invoices from './components/invoices/Invoice.vue'

export const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/:id/invoices', component: Invoices}
]
