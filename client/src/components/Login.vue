<template>
  <div id="login">
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-6">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="login" @submit.prevent="login">
              <h3 class="text-center text-dark">Login</h3>
              <div class="form-group">
                <label class="text-dark">Username:</label><br>
                <input required v-model="email" type="email" class="form-control">
              </div>
              <div class="form-group">
                <label class="text-dark">Password:</label><br>
                <input required type="password" v-model="password"  class="form-control">
              </div>
              <div class="form-group">
                <input type="submit" name="submit" class="btn btn-dark btn-md" value="submit">
              </div>
              <div id="register-link" class="text-right">
                <a href="/register" class="text-dark">Register here</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
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
