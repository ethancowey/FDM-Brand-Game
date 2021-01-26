<!-- Module: Admin.vue
Creation Date: 27/12/2020
Last Edit Date:26/01/2021
Authors: Maria Andrzejewska
Overview:
The purpose of this component is to display all available information on the registered users in a table format. It
uses a method that returns information stored in the User Accounts collection and the total points scored by the users
obtained from the scores collection. If the user has not scored any points, his total score will be "0".
-->
<template>
  <div id = "UserInformation">
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
      </ul>>
    </nav>
    <div class="container">
      <h3 class="p-3 text-center">Registered User Information</h3>
      <table class="table">
        <thead>
        <tr>
          <th>Username</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>E-mail</th>
          <th>Total Score</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(user) in Information" :key="user.username" >
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
      Information: []
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/getUserInformation')
      .then((response) => {
        this.Information = response.data
      })
  }
}
</script>
<style scoped>
.container{
  max-width:100%;
  max-height:100%;
  overflow: auto;
  position: fixed;
}
</style>
