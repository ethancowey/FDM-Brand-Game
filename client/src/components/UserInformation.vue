<template>
  <div id = "UserInformation">
    <div class="container">
      <h3 class="p-3 text-center">User Information</h3>
      <table class="table">
        <thead>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>E-mail</th>
          <th>Total Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user, index) in Information" :key="user.username" >
          <td>{{index+1}}</td>
          <td>{{user.username}}</td>
          <td>{{user.firstname}}</td>
          <td>{{user.lastname}}</td>
          <td>{{user.email}}</td>
          <td>{{user.total}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserInformation',
  data () {
    return {
      UserTotalScores: [],
      Users: [],
      Information: []
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/getTopUser'
    ).then((response) => {
      this.UserTotalScores = response.data
    })
    axios.get('http://localhost:3000/api/getUsers')
      .then((response) => {
        this.Users = response.data
      })
    axios.get('http://localhost:3000/api/getUserInformation')
      .then((response) => {
        this.Information = response.data
      })
  },
  methods: {
    merge: function (x, y, z) {
      for (const i in x) {
        for (const j in y) {
          if (i.username === j._id) {
            z.push({ total: j._id, ...i })
          } else {
            z.push({total: 0, ...i})
          }
        }
      } return z
    }
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
