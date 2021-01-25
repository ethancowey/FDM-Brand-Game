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
      games: [ {id: 'Match', name: 'Match Game'}, {id: 'blocks', name: 'Blocks Game'} ],
      streams: [{id: 'Software Testing', name: 'Software Testing'}, {id: 'Business Intelligence', name: 'Business Intelligence'}, {id: 'Technical Operations', name: 'Technical operations'}],
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
    displayData: function (admin, game, stream) {
      if (admin != null) {
        this.Admin = true
        this.changeToGlobal()
      } else {
        this.changeData(stream, game)
      }
    },
    changeData: function (stream, game, name) {
      axios.get('http://localhost:3000/api/scores', {
        params: {
          game,
          stream
        }
      }).then((response) => {
        this.Data = response.data
      })
      this.changeLeaderboardType(stream + ' ' + name)
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
  width: 700px;
  border-radius: 25px;
  background: #F5F5F5;
  border: 3px solid dimgray;
  padding:10px;
}
.table{
  padding-bottom: 20px;
}
.title{
  font-size: 25px;
}
.dropdown #dropdownButton{
  color: dimgray;
  background-color: transparent;
  border-color: transparent;
  font-size: 20px;
}
.dropdown-menu {
  background-color: #F5F5F5;
}
.dropdown-item{
  font-size: 20px;
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
  margin-top: -6px;
  margin-left: -1px;
  -webkit-border-radius: 0 6px 6px 6px;
  -moz-border-radius: 0 6px 6px;
  border-radius: 0 6px 6px 6px;
  font-size:20px;
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
  border-width: 5px 0 5px 5px;
  border-left-color: #ccc;
  margin-top: 5px;
  margin-right: -10px;
}

.dropdown-submenu:hover>a:after {
  border-left-color: #fff;
}
.dropdown-submenu.pull-left {
  float: none;
}

.dropdown-submenu.pull-left>.dropdown-menu {
  left: -100%;
  margin-left: 10px;
  -webkit-border-radius: 6px 0 6px 6px;
  -moz-border-radius: 6px 0 6px 6px;
  border-radius: 6px 0 6px 6px;
}

</style>
