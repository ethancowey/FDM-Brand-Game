<template>
  <div id="app">
    <nav class="mb-1 navbar navbar-expand-lg navbar-dark bg-dark lighten-1 sticky-top">
      <a id="icon" class="navbar-brand" href="#">
        <img src="../assets/logo.png" alt="Logo" style="width:70px;">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-555"
              aria-controls="navbarSupportedContent-555" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent-555">
        <ul id="text-group" class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Home
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="#">Match Game</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Game 2</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto nav-flex-icons">
          <li class="nav-item avatar">
            <a class="nav-link p-0" href="/account">
              <font-awesome-icon class="user-circle fa-3x" :icon="['fas', 'user-circle']" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <br>
      <br>
      <div class="row">
        <div class="col-7">
          <h2>Welcome {{username}}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-6 col-lg-6 ">
          <div class="account-info">
            <h2>Account:</h2>
git             <p>Username: {{username}}</p>

          </div>
        </div>
        <div class="col-6 col-lg-6">
            <ul class="scores-container">
              <h3>Your High Scores:</h3>
              <br>
              <li
                v-for="score in Scores"
                :key="score.id"
                class="score"
                >
                <div class="row">
                  <div class="column">
                    <p id="game">{{score.game}}:</p>
                  </div>
                  <div class="column">
                    <p id="user-score">{{score.score}}</p>
                  </div>
                </div>

              </li>
            </ul>

          </div>
        </div>
      </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      Scores: [],
      username: sessionStorage.getItem('username')
    }
  },
  async mounted () {
    const {data} = await axios.get('http://localhost:3000/api/scores', {
      params: {
        username: this.username
      }
    })
    console.log(data)
    console.log('testing2')
    this.Scores = data
  },
  methods: {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
  margin: 0;
  padding: 0;
  height: 100vh;
  background-color: #EAEAEA !important;

  }
  .account-info {
    height: 15em ;
    width: 80%;
    border-style: solid;
    border-width: 2px;
    margin-top: 20%;
    list-style-type: none;
  }

  .scores-container {
    height: 20em ;
    width: 80%;
    border-style: solid;
    border-width: 2px;
    margin-top: 20%;
    list-style-type: none;
  }
  .scores-container h3 {
    padding-top: 15px;
    font-weight: bolder;
  }
  .account-info h2 {
    padding-top: 15px;
  }
  #user-score {
    font-weight: bold;
    font-size: 22px;
    padding-right: 10%;

  }
  #game {
    font-weight: bolder;
    font-size: 22px;
  }

  .column {
    float: left;
    width: 50%;
  }

  /* Clear floats after the columns */
  .scores-container .row:after {
    content: "";
    display: table;
    clear: both;
  }
</style>
