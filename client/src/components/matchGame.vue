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
          <h2>Match the Words</h2>
        </div>
        <div class="col-5">Timer Placeholder</div>
      </div>
      <div id="game">
      <div
        v-for="test in Questions"
        :key="test.id">
        <p>{{test.term}} : {{test.meaning}}</p>

      </div>

      </div>
    </div>
    <input id="StreamType"  type="hidden" value="Business Intelligence">

  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: 'matchGame',
  data () {
    return {
      Questions: []
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/questions', {
      params: {
        streams: String(document.getElementById('StreamType').value)
      }
    })
      .then((response) => {
        this.Questions = response.data
      })
  }
}
</script>

<style scoped>
#placeholder {
  margin-top: 30%;
  text-align: center;

}
#game {
  width: 50%;
  height: 60%;
  border: solid black;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
}

#app {
  height: 100vh;
  background-color: lightgrey;
}
.user-circle {
  color: white;
  size: 60px;
}
#icon {
  padding-bottom: 10px;
}
.nav-item {
  font-weight: bold;
}
#text-group {
  margin-left: 2.5%;
}
</style>
