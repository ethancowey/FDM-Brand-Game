<!-- Module: NavigationBar.vue
Creation Date: 22/01/2021
Last Edit Date: 22/01/2021
Authors: Miles Prosser, Ethan Cowey
Overview:
This defines the navigation bar used by most pages used by regular users. It defines links to all the other pages.
This will not be used on the Streams.vue page to prevent picking a game before picking a stream.
The navbar also has an icon to logout which will clear the users session and take them back to the login page.
Theres also an icon link to the accounts page.
It can be referenced and used in html code using <NavigationBar>
-->
<template>
  <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 sticky-top">
    <a id="icon" class="navbar-brand" href="#">
      <img src="../assets/logo.png" alt="Logo" style="width:70px;">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
            aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
      <ul id="text-group" class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/streams">Streams
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/home">Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/match">Match Game</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/blocks">Text Block</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Fill the Blanks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/test">Affinity Test</a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto nav-flex-icons">
        <li class="nav-item avatar">
          <a class="nav-link p-0" href="/" onclick="sessionStorage.clear()">
            <font-awesome-icon class="nav-icon fa-3x" :icon="['fas', 'sign-out-alt']" />
          </a>
        </li>
        <li> </li>
        <li class="nav-item avatar">
          <a class="nav-link p-0" href="/account">
            <font-awesome-icon class="user-circle fa-3x" :icon="['fas', 'user-circle']" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
.user-circle {
  color: white;
  size: 60px;
}
#icon {
  padding-bottom: 10px;
}
.nav-item {
  font-weight: bold;
}
.user-circle {
  color: white;
  size: 60px;
}
.nav-icon {
  color: white;
  size: 60px;
}
#text-group {
  margin-left: 2.5%;
}#placeholder {
   margin-top: 30%;
   text-align: center;

 }
</style>
