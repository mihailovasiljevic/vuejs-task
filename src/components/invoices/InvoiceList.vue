<template>
  <div>
    <list-element v-for="invoice in user.invoices" v-bind:key="invoice.id"></list-element>
  </div>
</template>


<script>
import {mapActions} from 'vuex'
import listElement from './InvoiceListElement.vue'

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
  },
  components: {
    'list-element': listElement
  }
}
</script>
