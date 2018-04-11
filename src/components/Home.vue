<template>
  <h1 v-if="user"> {{navigateToInvoices()}} </h1>
  <h1 v-else> {{navigateToLogin()}} </h1>
</template>

<script>

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
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