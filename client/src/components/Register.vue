<template>
  <div id="registration">
    <div class ="container">
      <div id="registration-row" class="row justify-content-center align-items-center">
        <div id="registration-column" class="col-md-6">
          <div id="registration-box" class="col-md-12">
            <form id="registration-form" @submit.prevent="registerPost">
              <h3 class="text-center text-dark">Register</h3>

              <label for="firstName" class="labels">First Name:</label><br>
              <input type="text" id="firstName" class="form-control">

              <label for="lastName" class="labels">Last Name:</label><br>
              <input type="text" id="lastName" class="form-control">

              <label for="e-mail" class="labels">E-mail address:</label><br>
              <input type="email" id="e-mail" class="form-control">

              <label for="username" class="labels">Username:</label><br>
              <input type="text" id="username" class="form-control" required
                     pattern=".{1,10}" title="Must be less than 10 characters">

              <label for="password" class="labels">Password:</label><br>
              <input type="text" id="password" class="form-control" required
                     pattern=".{6,12}" title="Must be 6 to 12 characters">
              <div>
                <input type="submit" name="submit" class="btn btn-dark btn-md" onsubmit="registerPost()"
                       id="submit-button" value="Register!">
              </div>
              <div id="login-link" class="text-right">
                <a href="/" class="text-dark">Click here to log in</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div id="guest-link">
      <br>
      <a href="/streams" class="text-dark">Continue as Guest</a>
    </div>
    <div id="admin-link">
      <br>
      <a href="/admin" class="text-dark">Go to Admin Login</a>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import router from '../router/index'

export default {
  name: 'Register',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''

    }
  },
  methods: {
    registerPost () {
      console.log(String(document.getElementById('username').value))
      axios.post('http://localhost:3000/api/exists', {
        username: String(document.getElementById('username').value)
      }).then((response) => { this.validReg(response) }).catch(function (error) {
        console.log(error)
      })
    },
    validReg (response) {
      console.log(response)
      if (response.data.length === 0) {
        console.log('new user')
        axios.post('http://localhost:3000/api/register', {
          username: String(document.getElementById('username').value),
          password: String(document.getElementById('password').value),
          email: String(document.getElementById('e-mail').value),
          firstname: String(document.getElementById('firstName').value),
          lastname: String(document.getElementById('lastName').value)
        }).then((response) => { this.regRoute(response) }).catch(function (error) {
          console.log(error)
        })
      } else {
        alert('That username exists please try another username')
      }
    },
    regRoute (response) {
      console.log(response.data)
      sessionStorage.setItem('username', response.data.username)
      sessionStorage.setItem('firstname', response.data.firstname)
      sessionStorage.setItem('lastname', response.data.lastname)
      sessionStorage.setItem('email', response.data.email)
      router.push('/streams')
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
#registration .container #registration-row #registration-column #registration-box #registration-form {
  padding: 20px;
}
#registration .container #registration-row #registration-column #registration-box {
  margin-top: 110px;
  max-width: 600px;
  height: 560px;
  background-color: #EAEAEA;
  border-radius: 25px;

}
#login .container #login-row #login-column #registration-column #login-box #registration-form {
  padding: 20px;
}

#submit-button {
  margin-top: 30px;
}
.labels{
  margin-top:10px;
}
#login-link{
  margin-top: -10px;
}

</style>
