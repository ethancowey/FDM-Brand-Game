<!-- Module: Login.vue
Creation Date: 30/12/2020
Last Edit Date: 06/12/2020
Authors: Ethan Cowey, Maria Andrzejewska, Miles Prosser
Overview: The purpose of this component is to generate a page for logging in as an admin using the login form
there is also links back to the user login pages
In the <script> tags are the methods for communicating to the back-end. When you submit the login form the method
adminPost() is invoked. It makes a post request with the inputted username and password to the back-end. It receives a
response and sends it to be dealt wit by validAdmin()
If the returned response sent to validAdmin() has the correct admin parameter the admin will be sent to the next page.
Otherwise the log in failed as it was not valid or the account is not of the admin level and an alert is shown.
-->
<template>
  <div id="login">
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="login" @submit.prevent="adminPost">
              <h3 class="text-center text-dark">Admin Login</h3>
              <div class="form-group">
                <label class="text-dark">Username:</label><br>
                <input required type="username" id="username" class="form-control">
              </div>
              <div class="form-group">
                <label class="text-dark">Password:</label><br>
                <input required type="password" v-model="password" id="password"  class="form-control">
              </div>
              <div class="form-group">
                <input type="submit" name="submit" class="btn btn-dark btn-md" onsubmit="adminPost()" value="submit">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div id="userLink">
      <br>
      <a href="/" class="text-dark">Go to User Login</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import router from '../router/index.js'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async adminPost () {
      axios.post('http://localhost:3000/api/auth', { // post to the backend to authenticate login form
        username: String(document.getElementById('username').value),
        password: String(document.getElementById('password').value)
      })
        .then((response) => {
          this.validAdmin(response) // Send back-ends response to validAdmin function
        })
    },
    validAdmin (response) {
      if (response.data.admin === 'true') { // Check the returned document is an admin
        console.log(response.data.admin)
      } else {
        alert('Incorrect admin login attempt if you are a not an admin please use login as user options')
      }
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 175px;
  max-width: 600px;
  height: 320px;
  background-color: gainsboro;
  border-radius: 25px;

}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -50px;
}
</style>
