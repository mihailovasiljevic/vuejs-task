<template>
  <h1 v-if="isLoggedIn"> {{navigateToInvoices()}} </h1>
  <h1 v-else> {{navigateToLogin()}} </h1>
</template>

<script>

export default {
  data: () => ({
    drawer: null,
    loggedIn: false
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    isLoggedIn () {
      console.log('Provera da li je ulogovan: ')
      return this.user.id !== -1
    }
  },
  methods: {
    navigateToLogin () {
      this.$router.push({path: '/login'})
    },
    navigateToInvoices () {
      this.$router.push({path: '/' + this.user.id + '/invoices'})
    }
  }
}
</script>