<template>
  <div id = "Leaderboard">
    <div class="container">
        <h3 class="p-3 text-center">Leaderboard</h3>
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
          <td>{{score.username}}</td>
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
      game: 'Match',
      // locateUser: sessionStorage.getItem('username'),
      locateUser: 'EthanTest1',
      Data: []
    }
  },
  mounted () {
    sessionStorage.setItem('stream', 'Software Testing')
    sessionStorage.setItem('game', 'Match')
    const game = sessionStorage.getItem('game')
    const stream = sessionStorage.getItem('stream')
    axios.get('http://localhost:3000/api/scores', {
      params: {
        stream,
        game
      }
    }).then((response) => {
      this.Data = response.data
    })
  }
}
</script>
<style scoped>
#Leaderboard .container{
  max-width: 600px;
  height: 560px;
  border-radius: 25px;
  background: #F5F5F5;
  border: 4px solid dimgray;
}
</style>
