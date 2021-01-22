<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 1vmax;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  background: #EBEBEB;
  height: 100vh;
}
h1 {
  font-size: 2.25em;
}
h2 {
  font-size: 2em;
}
h3 {
  font-size: 1.75em;
}
h4{
  font-size: 1.5em;
}
</style>
