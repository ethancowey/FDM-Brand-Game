<template>
  <div id="registration">
    <div class ="container">
      <div id="registration-row" class="row justify-content-center align-items-center">
        <div id="registration-column" class="col-md-6">
          <div id="registration-box" class="col-md-12">
            <form id="registration-form">
              <h3 class="text-center text-dark">Register</h3>

              <label for="firstName" class="labels">First Name:</label><br>
              <input type="text" id="firstName" class="form-control">

              <label for="lastName" class="labels">Last Name:</label><br>
              <input type="text" id="lastName" class="form-control">

              <label for="e-mail"class="labels">E-mail address:</label><br>
              <input type="email" id="e-mail" class="form-control">

              <label for="username"class="labels">Username:</label><br>
              <input type="text" id="username" class="form-control">

              <label for="password"class="labels">Password:</label><br>
              <input type="text" id="password" class="form-control">
              <div>
                <input type="submit" name="submit" class="btn btn-dark btn-md" id="submit-button" value="Register!">
              </div>
              <div id="login-link" class="text-right">
                <a href="/" class="text-dark">Click here to log in</a>
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
  name: 'Register',
  data: {
    userData: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''

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

