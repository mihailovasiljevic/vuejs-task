<template>
  <v-app id="invoices">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md12>
            <v-card class="elevation-12">
              <v-card-text>
                <form>
                  <v-text-field
                    label="Invoice number"
                    v-model="invoice.id"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Description"
                    required
                    v-model="invoice.description"
                    multi-line
                  ></v-text-field>
                  <v-text-field
                    label="Amount"
                    v-model="invoice.amount"
                    required
                  ></v-text-field>
                  <v-date-picker 
                    :landscape="landscape" 
                    :reactive="reactive" 
                    full-width 
                    class="mt-3" 
                    v-model="invoice.date"
                    :first-day-of-week="1"
                    locale="sr-rs"
                    >
                    </v-date-picker>
                  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn @click="addUserInvoice">submit</v-btn>
                      <v-btn @click="clear">clear</v-btn>
                  </v-card-actions>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <invoice-list></invoice-list>
  </v-app>
</template>

<script>
import {mapActions} from 'vuex'
import InvoiceList from './InvoiceList.vue'

export default {
  data: () => ({
    drawer: null,
    picker: null,
    landscape: false,
    reactive: true,
    invoice: {
      id: 0,
      description: '',
      date: new Date().toISOString().slice(0, 10),
      amount: 0.0
    },
    showInvoice: {}
  }),
  methods: {
    ...mapActions([
      'addInvoice'
    ]),
    addUserInvoice () {
      this.$store.dispatch('addInvoice', this.invoice)
    },
    clear () {
      this.invoice.id = 0
      this.invoice.description = ''
      this.invoice.date = ''
      this.invoice.amount = 0.0
    }
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
    'invoice-list': InvoiceList
  }
}
</script>