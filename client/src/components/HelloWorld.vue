<template>
  <div>
    <h3>Login page</h3>
    <button v-on:click="counter += 1">Click here for nothing</button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
        <ul class="navbar-nav">
          <li class="nav-item"><router-link to="/" class="nav-link">Login</router-link></li>
          <li class="nav-item"><router-link to="/register" class="nav-link">Register here</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
