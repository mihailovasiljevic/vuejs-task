<template>
<div>
  {{isLoggedIn()}}
  {{isTheRightUser()}}
  <v-app id="invoices" >
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
                    @input="$v.invoice.id.$touch()"
                  ></v-text-field>
                  <span 
                    style="color: red"
                    class="form-group__message" 
                    v-if="error">{{error.message}}
                  </span>
                  <span 
                    style="color: red"
                    class="form-group__message" 
                    v-else-if="!$v.invoice.id.required">Field is required
                  </span>
                  <span 
                    style="color: red"
                    class="form-group__message" 
                    v-if="!$v.invoice.id.numeric">
                    Id must be numeric.
                  </span>
                  <v-text-field
                    label="Description"
                    required
                    v-model="invoice.description"
                    @input="$v.invoice.description.$touch()"
                    multi-line
                  ></v-text-field>
                                    <span 
                    style="color: red"
                    class="form-group__message" 
                    v-if="!$v.invoice.description.required">Field is required
                  </span>
                  <v-text-field
                    label="Amount"
                    v-model="invoice.amount"
                    required
                    @input="$v.invoice.amount.$touch()"
                  ></v-text-field>
                                    <span 
                    style="color: red"
                    class="form-group__message" 
                    v-if="!$v.invoice.amount.required">Field is required
                  </span>
                  <span 
                    style="color: red"
                    class="form-group__message" 
                    v-if="!$v.invoice.amount.numeric">
                    Id must be numeric.
                  </span>
                  <v-date-picker 
                    :landscape="landscape" 
                    :reactive="reactive" 
                    full-width 
                    class="mt-3" 
                    v-model="invoice.date"
                    :first-day-of-week="1"
                    locale="sr-rs"
                    @input="$v.invoice.date.$touch()"
                    >
                    </v-date-picker>
                  <span 
                    style="color: red"
                    class="form-group__message" 
                    v-if="!$v.invoice.date.required">Field is required
                  </span>
                  
                  <v-card-actions>
                    <v-spacer></v-spacer>
                      <v-btn @click.prevent="addUserInvoice" :disabled="$v.$invalid">submit</v-btn>
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
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import InvoiceList from './InvoiceList.vue'
import { required, numeric } from 'vuelidate/lib/validators'

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
    showInvoice: {},
    idError: ''
  }),
  validations: {
    invoice: {
      id: {
        required,
        numeric
      },
      description: {
        required
      },
      date: {
        required
      },
      amount: {
        required,
        numeric
      }
    }
  },
  methods: {
    ...mapActions([
      'addInvoice'
    ]),
    addUserInvoice () {
      const newInvoice = {}
      Object.assign(newInvoice, this.invoice)
      newInvoice.id = Number(newInvoice.id)
      newInvoice.amount = Number(newInvoice.amount)
      this.$store.dispatch('addInvoice', newInvoice)
    },
    clear () {
      let newInvoice = {
        id: 0,
        description: '',
        date: new Date().toISOString().slice(0, 10),
        amount: 0.0
      }
      Object.assign(this.invoice, newInvoice)
    },
    isLoggedIn () {
      if (this.user.id === -1) {
        this.$router.push({path: '/login'})
      }
    },
    isTheRightUser () {
      if (this.$route.params.id !== this.user.id && this.user.id !== -1) {
        this.$router.push({path: '/' + this.user.id + '/invoices'})
      } else if (this.user.id === -1) {
        this.$router.push({path: '/login'})
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
  components: {
    'invoice-list': InvoiceList
  }
}
</script>