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
                <input required type="username" id="login-username" class="form-control">
              </div>
              <div class="form-group">
                <label class="text-dark">Password:</label><br>
                <input required type="password" v-model="password" id="login-password"  class="form-control">
              </div>
              <div class="form-group">
                <input type="submit" name="submit" class="btn btn-dark btn-md" onsubmit="adminPost()" value="submit">
              </div>
              <div id="register-link" class="text-right">
                <a href="/register" class="text-dark">Register here</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div id="user-link">
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
      axios.post('http://localhost:3000/api/auth', {
        username: String(document.getElementById('login-username').value),
        password: String(document.getElementById('login-password').value)
      })
        .then((response) => {
          if (response.data.admin === 'true') {
            console.log(response.data.admin)
          } else {
            alert('Incorrect admin login attempt if you are a not an admin please use login as user options')
          }
        })
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
  background-color: #EAEAEA;
  border-radius: 25px;

}
#login .container #login-row #login-column #login-box #login-form {
  padding: 20px;
}
#login .container #login-row #login-column #login-box #login-form #register-link {
  margin-top: -50px;
}
</style>
