<!-- Module: Homepage.vue
Creation Date: 15/12/2020
Last Edit Date: 20/01/2020
Authors: Magda Piesak
Overview:
The purpose of this component is for users to chose one of the available games to play and practice in the previously
chosen stream. There are also links below the games which redirect the user to other components: Affinity Test,
Accounts and Leaderboard.
-->

<template>
  <div id="homepage">
    <NavigationBar/>
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
          <a href="/fill">
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
          <a href="/account">Account</a>
        </div>
        <div class="navig" id="leader">
          <a href="/leaderboard" onclick="sessionStorage.setItem('game','blocks')">Leaderboard</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar'
export default {
  name: 'Homepage',
  components: {NavigationBar},
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
  padding: 0.1em;
  font-size: 1.5em;
  font-weight: bold;
}

a:link, a:visited {
  color: #3D3D3D;
}

.links {
  vertical-align: middle;
  margin: auto;
  width: 75%;
  padding: 10em;
}

.navig {
  float: left;
  width: 30%;
  padding: 1em;
  border:0.25em solid dimgray;
  margin: 0.5em;
  border-radius: 0.8em;
  font-size: 1.25em;
  background-color: #E0E0E0;
}

.topic{
  border: 0.25em solid dimgray;
  max-width: 23.33em;
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
