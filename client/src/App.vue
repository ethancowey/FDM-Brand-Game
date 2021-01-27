<!-- Module: App.vue
Creation Date: 08/12/2020
Last Edit Date: 24/12/2021
Authors: Ethan Cowey, Miles Prosser
Overview: The purpose of this component is the template for our whole system. The component that the route corresponds
to will appear where the <router-view/> tag is. This also sets in the style tags the global styles for all the pages.
-->
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
@media screen and (min-width: 2000px){
  html{
    font-size:125%;
  }
}
@media screen and (max-width: 2000px){
  html{
    font-size: 2vmin;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
.backdrop {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  /*display: none;*/
}
.congratulations {
  left: 35%;
  margin-top: 17%;
  position: relative;
  display: flex;
  width: 30em;
  flex-direction: column;
  min-width: 0;
  z-index: 999;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0.067em solid #d2d2dc;
  border-radius: 0.26em;
  -webkit-box-shadow: 0px 0px 5px 0px rgb(249, 249, 250);
  -moz-box-shadow: 0px 0px 5px 0px rgba(212, 182, 212, 1);
  box-shadow: 0px 0px 5px 0px rgb(161, 163, 164)

}
.congratulations .card-body {
  padding: 1rem 1rem
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem
}

.cross {
  color: #d6312d;
  cursor: pointer;
  margin-left: 95%;
  margin-top: 0.333em;
}

.continue:focus {
  outline: none
}

.continue {
  border-radius: 0.333em;
  text-transform: capitalize;
  font-size: 0.867em;
  padding: 0.533em 1.267em;
  cursor: pointer;
  color: #fff;
  background-color: #D50000
}

.continue:hover {
  background-color: #D32F2F !important
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.timer {
  margin-left: 35%;
  display: inline-block;
  top: 40%;
  padding: 0.467em;
  border: black solid;
  border-radius: 30%;
  font-weight: bold;
}

#reset {
  top: 50%;
  float: left;
  cursor:pointer;
}
.nav-item {
  font-weight: bold;
}
.user-circle {
  color: white;
  size: 4em;
}
.nav-icon {
  color: white;
  size: 4em;
}
</style>
