<!-- Module: Admin.vue
Creation Date: 17/12/2020
Last Edit Date:26/01/2021
Authors: Maria Andrzejewska
Overview:
The purpose of this component is for admins to be able to view any leaderboards, as well as graphs depicting stream
performance and the ratio of registered users to guests using the web app. In addition, there is also a button that
redirects the admin to the streams page, so that they can browse their content. The methods are used to display
information on the amount of registered users, the top scoring player and their score.
-->
<template>
    <div class = "admin">
      <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 sticky-top">
        <a id="icon" class="navbar-brand" href="#">
          <img src="../../assets/logo.png" alt="Logo" style="width:70px;">
        </a>
        <button class="navbar-toggler" type="button" data-toggle ="collapse" ></button>
        <ul class="navbar-nav ml-auto nav-flex-icons">
          <li class="nav-item avatar">
            <a class="nav-link p-0" href="/" onclick="sessionStorage.clear()">
              <font-awesome-icon class="nav-icon fa-3x" :icon="['fas', 'sign-out-alt']" />
            </a>
          </li>
        </ul>
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
          <div class = "chart-container">
            <Chart></Chart>
            <div id = "information">
              <div class="streams-container" id="streams">
                <a class = "button" href="/streams" >Browse Streams</a>
              </div>
              <div class="user-information">
                <a class = "button" href = "/userInformation"> User Information
                  <font-awesome-icon class="fa-users" :icon="['fas', 'users']" /></a><br>
                <p class = "information-body"> Registered users: {{Users.length}} </p>
                <p class = "information-body"> Top user: {{TopUser[0]._id}} </p>
                <p class = "information-body"> Top user total: {{TopUser[0].score}} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Leaderboard from '../Leaderboard'
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
  mounted () {
    // these methods get the data needed fr the user information section
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
.chart-container{
  margin-right: 2.6667em;
  width: 40em;
  height: 10em;
}
.container{
  margin-left: auto;
  height:auto;
  overflow-y: scroll;
}
.streams-container :hover{
  background-color: #999999;
  color: #EAEAEA;
  border: 0.2666em solid #999999;
}
#wrapper {
  float: inside;
  margin-top: 2em;
  display: inline-flex;
  justify-content: space-evenly;
}
#information {
  flex-direction: row;
  margin-right: auto;
  margin-top: 2em;
  float: right;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: flex-start;
}
.streams-container{
  background-color: #F5F5F5;
  margin-right: 2em;
  justify-content: center;
  border: 0.2em solid dimgray;
  border-radius: 0.8em;
  color:black;
  padding: 2em;
}
.button{
  font-size: 1.466em;
  color: #2c3e50;
}
.information-body{
  color:dimgray;
  font-size: 1.333em;
}
.user-information{
  background-color: #F5F5F5;
  border: 0.2em solid dimgray;
  border-radius: 0.8em;
  color:black;
  padding: 0.1em;
  width: 23.33em;
  height: 12em;

}
#icon {
  padding-bottom: 0.666em;
}
a:hover, a:active{
  background-color: #999999;
  color: #EAEAEA;
  border: 0.266em solid #999999;
}
</style>
