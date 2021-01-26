<!-- Module: Admin.vue
Creation Date: 16/12/2020
Last Edit Date:26/01/2021
Authors: Maria Andrzejewska
Overview:
The purpose of this component is to provide a leaderboard to be displayed after a game is played, and in the admin page.
This component checks if the user viewing the leaderboard is an admin and if they are, global leaderboard is shown by
default. It's possible for an admin to change between leaderboard types using a dropdown menu. If the leaderboard is
viewed by a public user, the dropdown is disabled and they are only shown the leaderboard for the game that was just
played by them. Additionally, their username is highlighted to allow for easier identification of their own position
on the leaderboard. The methods used in this component serve to display specific leaderboard data, and in the admin
case, change the data being displayed.
-->
<template>
  <div id = "Leaderboard">
    <div class="container">
          <div class="dropdown" v-if="Admin">
              <button id="dropdownButton" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{{ this.leaderBoardType }}
                <span class="caret"></span></button>
              <ul class="dropdown-menu multi-level">
                <li>
                  <a class="dropdown-item" @click="changeToGlobal()">Global</a></li>
                <li class="dropdown-submenu" v-for="stream in streams" :key="stream.id">
                  <a class ="dropdown-item">{{stream.name}}</a><span class="caret"></span>
                <ul class="dropdown-menu">
                <li class="dropdown-item" v-for="game in games" :key="game.id">
                  <a tabindex="-1" @click="changeData(stream.id, game.id, game.name)">{{game.name}}</a></li>
                </ul>
                </li>
              </ul>
            </div>
      <p class="title">Leaderboard</p>
      <table class="table">
        <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(score, index) in Data" :key="score.username" :style="{background: score.username === locateUser? '#add8e6' : ''}">
          <td v-if="index === 0"> <font-awesome-icon class="fa-trophy" :icon="['fas', 'trophy']"/> {{index+1}}</td>
          <td v-else>{{index+1}}</td>
          <td v-if="Admin && Global">{{score._id}}</td>
          <td v-else>{{score.username}}</td>
          <td>{{score.score}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Leaderboard',
  data () {
    return {
      Data: [],
      Admin: false,
      games: [ {id: 'Match', name: 'Match Game'}, {id: 'blocks', name: 'Blocks Game'},
        {id: 'blanks', name: 'Fill The Blanks Game'} ],
      streams: [{id: 'Software Testing', name: 'Software Testing'}, {id: 'Business Intelligence',
        name: 'Business Intelligence'}, {id: 'Technical Operations', name: 'Technical operations'}],
      locateUser: sessionStorage.getItem('username'),
      leaderBoardType: 'Global',
      Global: true
    }
  },
  mounted () {
    const game = sessionStorage.getItem('game')
    const admin = sessionStorage.getItem('admin')
    const stream = sessionStorage.getItem('stream')
    this.displayData(admin, game, stream)
  },
  methods: {
    // checks if the person accessing the leaderboard is an admin or public user, then displays the correct leaderboard
    displayData: function (admin, game, stream) {
      if (admin != null) {
        this.Admin = true
        this.changeToGlobal() // if the user is an admin, a global leaderboard will be displayed by default
      } else {
        this.changeData(stream, game) // if it's a public user, a stream and game-specific leaderboard will be displayed
      }
    },
    changeData: function (stream, game, name) {
      axios.get('http://localhost:3000/api/getLeaderboard', {
        params: {
          game,
          stream
        }
      }).then((response) => {
        this.Data = response.data
      })
      this.changeLeaderboardType(stream + ' - ' + name)
      this.Global = false
    },
    changeToGlobal: function () {
      axios.get('http://localhost:3000/api/getTopUser')
        .then((response) => {
          this.Data = response.data
        })
      this.changeLeaderboardType('Global')
      this.Global = true
    },
    changeLeaderboardType: function (type) {
      this.leaderBoardType = type
    }
  }
}
</script>
<style scoped>
#Leaderboard .container{
  max-height: 35em;
  overflow-y: scroll;
  width: 46em;
  border-radius: 1.66em;
  background: #F5F5F5;
  border: 0.2em solid dimgray;
  padding:0.66em;
}
.table{
  padding-bottom: 1.66em;
}
.title{
  font-size: 1.66em;
}
.dropdown #dropdownButton{
  color: dimgray;
  background-color: transparent;
  border-color: transparent;
  font-size: 1.33em;
}
.dropdown-menu {
  background-color: #F5F5F5;
}
.dropdown-item{
  font-size: 1.33em;
}
.dropdown-submenu {
  position: relative;
  background-color: transparent;
  border-color: transparent;
}
.dropdown-submenu>.dropdown-menu {
  background-color: #F5F5F5;
  top: 0;
  left: 100%;
  margin-top: -0.4em;
  margin-left: -0.066em;
  -webkit-border-radius: 0 0.4em 0.4em 0.4em;
  -moz-border-radius: 0 0.4em 6px;
  border-radius: 0 0.4em 0.4em 0.4em;
  font-size:1.33em;
}
.dropdown-submenu:hover>.dropdown-menu {
  display: block;
}

.dropdown-submenu>a:after {
  display: block;
  content: " ";
  float: right;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 0.33em 0 0.33em 0.33em;
  border-left-color: #ccc;
  margin-top: 0.33em;
  margin-right: -0.66em;
}

.dropdown-submenu:hover>a:after {
  border-left-color: #fff;
}
.dropdown-submenu.pull-left {
  float: none;
}

.dropdown-submenu.pull-left>.dropdown-menu {
  left: -100%;
  margin-left: 0.66em;
  -webkit-border-radius: 0.4em 0 0.4em 0.4em;
  -moz-border-radius: 0.4em 0 0.4em 0.4em;
  border-radius: 0.4em 0 0.4em 0.4em;
}

</style>
