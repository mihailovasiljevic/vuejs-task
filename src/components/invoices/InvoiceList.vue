<template>
  <div>
    <div>
      {{checkIfCreated()}}
      <v-layout align-center justify-center v-if="user.invoices.length > 0">
          <v-flex xs12 sm12 md12>
            <v-card class="elevation-1">
              <v-card-text>
                <form>
                  <v-text-field
                    label="Invoice number"
                    required
                    v-model="invoiceId"
                    name="search"
                    ref="invoiceSearch"
                  ></v-text-field>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
      </v-layout>

      </div>
    <div style="overflow-y: scroll; height:400px;">
    <v-list two-line subheader>
            <v-list-tile avatar v-for="invoice in invoices" :key="invoice.id" @click="">
              <v-list-tile-content>
                <v-list-tile-title>Invoice number: {{ invoice.id }}</v-list-tile-title>
                <v-list-tile-sub-title>Description: {{ invoice.description }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Amount: {{ invoice.amount }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Date: {{ invoice.date }}</v-list-tile-sub-title>
                
              </v-list-tile-content>
              <v-menu offset-y>
                  <v-btn color="primary" dark slot="activator">Dropdown</v-btn>
                  <v-list>
                    <v-list-tile v-for="setting in settings" :key="setting.title" @click="doSetting(setting.title, invoice)">
                      <v-icon color="grey lighten-1">{{setting.icon}}</v-icon>
                      <v-list-tile-title>{{ setting.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>

            </v-list-tile>
            </v-list>
    </div>
  </div>

</template>


<script>
import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
  data: () => ({
    drawer: null,
    invoiceId: '',
    invoices: [],
    settings: [
      {
        title: 'Delete',
        icon: 'delete',
        method (val) {
          this.deleteInvoice(val)
        }
      },
      {
        title: 'Duplicate',
        icon: 'view_agenda',
        method: (val) => { console.log(val) }
      }
    ]
  }),
  methods: {
    ...mapActions([
      'removeInvoice',
      'addInvoice'
    ]),
    deleteInvoice (invoiceData) {
      console.log(invoiceData)
      this.$store.dispatch('removeInvoice', invoiceData).then(this.invoices = this.user.invoices.slice(0))
    },
    duplicateInvoice (invoiceData) {
      console.log('DUPLIKAT IZ LISTE')
      console.log(invoiceData)
      this.$store.dispatch('duplicateInvoice', invoiceData).then(this.invoices = this.user.invoices.slice(0))
    },
    checkIfCreated () {
      if (this.user.invoices === undefined) {
        console.log(this.user)
      }
    },
    filterInvoices () {
      return this.user.invoices.filter(invoice => {
        return invoice.id.toString().startsWith(this.invoiceId) || this.invoiceId === ''
      })
    },
    doSetting (title, invoice) {
      switch (title) {
        case 'Delete':
          this.deleteInvoice(invoice)
          break
        case 'Duplicate':
          this.duplicateInvoice(invoice)
          break
      }
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
  watch: {
    invoiceId: _.debounce(
      function (val) {
        console.log(val)
        console.log('POKUSAVA')
        this.invoices = this.filterInvoices(val)
      }, 500)
  },
  created () {
    this.invoiceId = ''
    this.invoices = this.filterInvoices()
  }
}
</script>
