<template>
  
</template>


<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    drawer: null
  }),
  methods: {
    ...mapActions([
      'removeInvoice',
      'addInvoice'
    ])
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  }
}
</script>
