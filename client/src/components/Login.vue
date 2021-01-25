<!-- Module: Login.vue
Creation Date: 13/12/2020
Last Edit Date: 24/01/2021
Authors: Ethan Cowey, Maria Andrzejewska, Miles Prosser
Overview: The purpose of this component is to generate a page for logging in to the system as an admin or a user
as well as links to the registration page and continue as guest
In the <template> tags is the html code for this page
it has a container with the form to insert login details into as well as links to the other parts of the system
mentioned earlier.
In the <script> tags are the methods for communicating to the back-end. When you submit the login form the method
loginPost() is invoked. It makes a post request with the inputted username and password to the back-end. It receives a
response and sends this to the next method validUser() which will if the login response from the back-end is invalid
it will send an alert to the user. Otherwise if it was a successful user or admin login it routes the user to the next
page depending on what access level they are (admin or user) and stores
the details needed in session storage to be used later. The response will not have the hashed password for security.
The password is excluded from the document retrieved from the database before the response is sent back.
It was later added to stop code duplication to also check for admin users and if they were an admin the destination
would be different to that of a user.
Admin Login credentials are added to the database manually so regular users can't make admin accounts.
Details of an admin account to use:
Username: Admin
Password: Admin1
-->
<template>
  <div id="login">
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="login" @submit.prevent="loginPost">
              <h3 class="text-center text-dark">User and Admin Login</h3>
              <div class="form-group">
                <label class="text-dark">Username:</label><br>
                <input required type="username" id="username" class="form-control"
                       pattern=".{1,10}" title="Must be less than 10 characters">
              </div>
              <div class="form-group">
                <label class="text-dark">Password:</label><br>
                <input required type="password" v-model="password" id="password"  class="form-control"
                       pattern=".{6,12}" title="Must be 6 to 12 characters">
              </div>
              <div class="form-group">
                <input type="submit" name="submit" class="btn btn-dark btn-md" onsubmit="loginPost()" value="submit">
              </div>
              <div id="register-link" class="text-right">
                <a href="/register" class="text-dark">Register here</a>
              </div>
              <div class="text-right" onclick="alert('To login as an admin use the credentials in the README.md' +
               '\nTo Login as a user register a new account first or continue as guest.')"> Help?
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div id="guest-link">
      <br>
      <a href="/streams" onclick="sessionStorage.setItem('guest', 'true')
      sessionStorage.setItem('username','guest' + Math.floor(Math.random() * 999))"
         class="text-dark">Continue as Guest</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index.js'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async loginPost () {
      axios.post('http://localhost:3000/api/auth', {
        username: String(document.getElementById('username').value), // Get from form to send to back-end
        password: String(document.getElementById('password').value)
      })
        .then((response) => {
          this.validUser(response) // Use the back-ends response in the next function to see if the user is valid
        })
    },
    validUser (response) {
      if (response.data.admin === 'true') { // Check the returned document is an admin
        sessionStorage.setItem('username', response.data.username)
        sessionStorage.setItem('admin', 'true')
        router.push('/adminpage')
      } else if (response.data.username === String(document.getElementById('username').value) &&
        response.data.admin !== 'true') { // Checks user is the one returned by back-end and not an admin
        sessionStorage.setItem('username', response.data.username)
        sessionStorage.setItem('firstname', response.data.firstname)
        sessionStorage.setItem('lastname', response.data.lastname)
        sessionStorage.setItem('email', response.data.email)
        router.push('/streams')
      } else {
        alert('Invalid Username and Password')
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
#login .container #login-row #login-column #login-box {
  margin-top: 11.5em;
  max-width: 40em;
  height: 22em;
  background-color: gainsboro;
  border-radius: 1.667em;
  }
#login .container #login-row #login-column #login-box #login-form {
  padding: 1.334em;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -3.33em;
}
.btn {
  margin-top: 0.5em;
  font-size: 1.25em;
}
.form-control{
  padding: 0.5em;
  height: 2.5em;
  font-size: 1em;
}
</style>
