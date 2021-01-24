<template>
    <div class = "admin">
      <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 sticky-top">
        <a id="icon" class="navbar-brand" href="#">
          <img src="../assets/logo.png" alt="Logo" style="width:70px;">
        </a>
        <button class="navbar-toggler" type="button" data-toggle ="collapse" ></button>
      </nav>
      <div class = "header">
        <br>
        <h1 class="text-center text-dark">Admin page</h1><br>
      </div>
      <div id ="wrapper">
        <div class="container">
          <Leaderboard></leaderboard>
        </div>
        <div class = "chartContainer">
        <Chart></Chart>
        </div>
      </div>
      <div id = "information">
        <div class="streamsContainer" id="streams">
          <a href="/streams" >Browse Streams</a>
        </div>
        <div class="userInformation">
          <h4> User Information <font-awesome-icon class="fa-users" :icon="['fas', 'users']" /></h4><br>
          <h4> Registered users: {{Users.length}} </h4>
          <h4> Best user: {{TopUser[0]._id}} </h4>
          <h4> Total points: {{TopUser[0].score}} </h4>
        </div>
    </div>
      </div>
</template>
<script>
import Leaderboard from './Leaderboard'
import Chart from './Chart'
import axios from 'axios'
export default {
  name: 'Admin',
  data () {
    return {
      Users: [],
      TopUser: []
    }
  },
  components: {
    Chart,
    Leaderboard
  },
  methods: {
    redirect: function (string) {
      this.$router.push(string)
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/getUsers')
      .then((response) => {
        this.Users = response.data
      })
    axios.get('http://localhost:3000/api/getTopUser')
      .then((response) => {
        this.TopUser = response.data
      })
  }
}
</script>
<style>
.chartContainer{
  width: 1000px;
  margin-right: 100px;
}
.container{
  margin-left: auto;
}
.streamsContainer:hover{
  background-color: #999999;
  color: #EAEAEA;
  border: 4px solid #999999;
}
#wrapper {
  float: inside;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
#information{
  margin-top:20px;
  float: right;
  margin-right: 100px;
  display: inline-flex;
  align-items: flex-start;
}
.streamsContainer{
  background-color: #F5F5F5;
  margin-right: 100px;
  justify-content: center;
  border: 3px solid dimgray;
  border-radius: 12px;
  color:black;
  padding: 43px;
  width: 400px;
  font-size: 30px;
}
.userInformation{
  background-color: #F5F5F5;
  border: 3px solid dimgray;
  border-radius: 12px;
  color:black;
  padding: 40px;
  width: 500px;
}
.container:hover{
  color: darkcyan;
}
#icon {
  padding-bottom: 10px;
}
a:hover, a:active{
  background-color: #999999;
  color: #EAEAEA;
  border: 4px solid #999999;
}

</style>
