<template>
  <div id="homepage">
    <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 sticky-top">
    <a id="icon" class="navbar-brand" href="/streams">
      <img src="../assets/logo.png" alt="Logo" style="width:70px;">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
            aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
      <ul id="text-group" class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/match">Word Match</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Fill In The Blanks</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/blocks">Text Blocks</a>
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
    <div id="home">
      <div id="text">
        <br>
        <h1 style="font-weight: bold">{{stream}}</h1><br>
      </div>
      <div id="games">
        <div class="game" id="game1">
          <a href="/match">
            <img src="../assets/match.png" alt="Icon" style="width: 225px">
            <p>Word Match Game</p>
          </a>
        </div>
        <div class="game" id="game2">
          <a href="/game2">
            <img src="../assets/blanks.png" alt="Icon" style="width: 225px">
            <p>Fill In The Blanks Game</p>
          </a>
        </div>
        <div class="game" id="game3">
          <a href="/blocks">
            <img src="../assets/blocks.png" alt="Icon" style="width: 225px">
            <p>Text Blocks Game</p>
          </a>
          <br><br>
        </div>
      </div>
      <div class="links">
        <div class="navig" id="aff">
          <a href="/test">Affinity Test</a>
        </div>
        <div class="navig" id="achvm">
          <a href="/achievements">Achievements</a>
        </div>
        <div class="navig" id="leader">
          <a href="/leaderboard">Leaderboard</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Homepage',
  data () {
    return {
      stream: sessionStorage.getItem('stream')
    }
  }
}
</script>

<style scoped>
.game {
  float: left;
  width: 33.33%;
  padding: 15px;
  font-size: 22px;
  font-weight: bold;
}

a:link, a:visited {
  color: #3D3D3D;
}

.links {
  margin: auto;
  width: 75%;
  padding: 10px;
}

.navig {
  float: left;
  width: 30%;
  padding: 15px;
  border:4px solid dimgray;
  max-width: 350px;
  margin: 10px;
  border-radius: 12px;
  font-size: 22px;
  background-color: #E0E0E0;
}

.topic{
  border: 4px solid dimgray;
  max-width: 350px;
  margin: auto;
  font-size: 25px;
  border-radius: 12px;
  display: block;
  background-color: #F5F5F5;
  text-decoration: none;
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

#homepage {
  background-color: #EBEBEB;
  height: 100vh;
}

</style>
