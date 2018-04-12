// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import lodash from 'lodash'
import Vuelidate from 'vuelidate'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VCard,
  VBottomNav,
  VTooltip,
  VForm,
  VTextField,
  VDatePicker,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTooltip,
    VBottomNav,
    VCard,
    VForm,
    VTextField,
    VDatePicker,
    transitions
  }
})

Vue.config.productionTip = false
Object.defineProperty(Vue.prototype, '$lodash', { value: lodash })
Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  lodash,
  components: { App },
  template: '<App/>'
})
