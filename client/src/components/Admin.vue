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
        <div id = wrapper2>
          <div class = "chartContainer">
            <Chart></Chart>
            <div id = "information">
              <div class="streamsContainer" id="streams">
                <a class = "button" href="/streams" >Browse Streams</a>
              </div>
              <div class="userInformation">
                <a class = "button" href = "/userinformation"> User Information
                  <font-awesome-icon class="fa-users" :icon="['fas', 'users']" /></a><br>
                <p class = "informationBody"> Registered users: {{Users.length}} </p>
                <p class = "informationBody"> Best user: {{TopUser[0]._id}} </p>
                <p class = "informationBody"> Total points: {{TopUser[0].score}} </p>
              </div>
            </div>
          </div>
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
  margin-right: 40px;
  width: 600px;
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
  display: inline-flex;
  justify-content: space-evenly;
}
#information {
  flex-direction: row;
  margin-right: auto;
  margin-top: 30px;
  float: right;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: flex-start;
}
.streamsContainer{
  background-color: #F5F5F5;
  margin-right: 30px;
  justify-content: center;
  border: 3px solid dimgray;
  border-radius: 12px;
  color:black;
  padding: 30px;
}
.button{
  font-size: 22px;
  color: #2c3e50;
}
.informationBody{
  color:dimgray;
  font-size: 20px;
}
.userInformation{
  background-color: #F5F5F5;
  border: 3px solid dimgray;
  border-radius: 12px;
  color:black;
  padding: 30px;
  width: 350px;

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
