<template>
  <div id="streams">
    <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 sticky-top">
      <a id="icon" class="navbar-brand" href="/streams">
        <img src="../assets/logo.png" alt="Logo" style="width:70px;">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
              aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
<!--        <ul id="text-group" class="navbar-nav mr-auto">-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">Home</a>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">Match Game</a>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <a class="nav-link" href="#">Game 2</a>-->
<!--          </li>-->
<!--        </ul>-->
        <ul class="navbar-nav ml-auto nav-flex-icons">
          <li class="nav-item avatar">
            <a class="nav-link p-0" href="/" onclick="sessionStorage.clear()">
              <font-awesome-icon class="nav-icon fa-3x" :icon="['fas', 'sign-out-alt']" />
            </a>
          </li>
          <li> </li>
          <li class="nav-item avatar">
            <a class="nav-link p-0" href="/account">
              <font-awesome-icon class="nav-icon fa-3x" :icon="['fas', 'user-circle']" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div id="text">
      <br>
      <h1>Choose a Stream</h1><br><br>
    </div>
    <div id="options">
     <div class="topic" id="softtest">
       <a href="/home" onclick="sessionStorage.setItem('stream', 'Software Testing')">
         Software Testing</a>
     </div>
      <br><br>
     <div class="topic" id="busint">
        <a href="/home" onclick="sessionStorage.setItem('stream', 'Business Intelligence')">
          Business Intelligence</a>
     </div>
      <br><br>
     <div class="topic" id="techop">
       <a href="/home" onclick="sessionStorage.setItem('stream', 'Technical Operations')">
         Technical Operations</a>
     </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Streams'
}
</script>

<style scoped>
.topic{
  padding: 25px;
  border: 4px solid dimgray;
  max-width: 350px;
  margin: auto;
  font-size: 25px;
  border-radius: 12px;
  display: block;
  background-color: #F5F5F5;
  color: black;
  text-decoration: none;
}

a:link, a:visited{
  color: #3D3D3D;
}

.topic:hover, .topic:active, a:hover, a:active{
  background-color: #999999;
  color: #EAEAEA;
  border: 4px solid #999999;
}

#text{
  color: #1F1F1F;
}

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
#text-group {
  margin-left: 2.5%;
}

</style>
