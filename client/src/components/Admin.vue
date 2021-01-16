<template>
    <div>
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
        <div class="container" id="leader">
          <Leaderboard @click.native="redirect('/leaderboard')"></leaderboard>
        </div>
        <div class="streamsContainer" id="streams">
          <a href="/streams" >Streams</a>
        </div>
        <div class="userInformation">
          <h3> User Information <font-awesome-icon class="fa-users" :icon="['fas', 'users']" /></h3><br>
          <h4> Registered users: {{Users.length}}</h4>
          <h4> Top user: {{TopUser[0]._id}}  </h4>
          <h4> Top user total points: {{TopUser[0].total}}</h4>
        </div>
      </div>
      </div>
</template>
<script>
import Leaderboard from './Leaderboard'
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
.streamsContainer:hover{
  background-color: #999999;
  color: #EAEAEA;
  border: 4px solid #999999;
}
#wrapper {
  width: 960px;
  margin-left: -700px;
  margin-right: auto;
  margin-top: 30px;
  display: inline-block;
}
.streamsContainer{
  border: 4px solid dimgray;
  border-radius: 12px;
  color:black;
  padding: 43px;
  width: 400px;
  font-size: 30px;
  background-color: #F5F5F5;
  text-decoration: none;
  position:absolute;
  display: inline-block;
}
.userInformation{
  border: 4px solid dimgray;
  border-radius: 12px;
  color:black;
  padding: 43px;
  width: 400px;
  background-color: #F5F5F5;
  text-decoration: none;
  display: inline-block;
  margin-top:200px;
  position: absolute;
}
.container {
  display: inline-block;
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
