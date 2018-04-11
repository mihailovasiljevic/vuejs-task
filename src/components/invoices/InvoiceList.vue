<template>
  <div>
    <v-list two-line subheader>
            <v-list-tile avatar v-for="invoice in user.invoices" :key="invoice.id" @click="">
              <v-list-tile-content>
                <v-list-tile-title>Invoice number: {{ invoice.id }}</v-list-tile-title>
                <v-list-tile-sub-title>Description: {{ invoice.description }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Amount: {{ invoice.amount }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Date: {{ invoice.date }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple @click="deleteInvoice(invoice)">
                  <v-icon color="grey lighten-1">delete</v-icon>
                </v-btn>
                <v-btn icon ripple @click="duplicateInvoice">
                  <v-icon color="grey lighten-1">view_agenda</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            </v-list>
  </div>
</template>


<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    drawer: null,
    invoiceId: -1
  }),
  methods: {
    ...mapActions([
      'removeInvoice',
      'addInvoice'
    ]),
    deleteInvoice (invoiceData) {
      this.$store.dispatch('removeInvoice', invoiceData)
    },
    duplicateInvoice (invoiceData) {
    }
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
