<template>
<div id="login">
  <!-- Home page has logic about redirections, just go to home page that will bring you back if needed-->
  <router-link to="/"></router-link> 
  <v-app id="login">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="username"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent = "loginUser">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
  {{username}}
  {{password}}
  {{user}}
</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    drawer: null,
    username: '',
    password: ''
  }),

  props: {
    source: String
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    loginUser () {
      this.$store.dispatch('login', {username: this.username, password: this.password}).then(this.$router.push({path: '/' + this.user.id + '/invoices'}))
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

