<!-- Module: TextBlocks.vue
Creation Date: 18/12/2020
Last Edit Date:09/01/2021
Authors: Ethan Cowey
Overview: The purpose of this component is to be a game in which users must drag blocks of text in order to match the
correct definition. There will be a 2 minute time limit and the faster its completed the higher the score achieved.
In the <template> There is the nav bar to navigate to other sections of the site. There is a container for the game
itself above it will be the game title, restart button and timer.
In the <script> There is the data function which returns all the variables needed in the html and javascript code. There
is then the watch component which will watch the value of timeRemaining and every second call the method timeMonitor()
to update all the time variables.
The mounted function runs when the page loads it uses axios to retrieve a question from the backend then put it in the
format to be used in the game by splitting it up.
In the methods there is checker() which runs each time an element is dragged it will check if all the elements are in
order if so the game ends.
-->
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
            <a class="nav-link" href="#">Text Blocks Game</a>
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
          <h2>Drag the Text Blocks into order</h2>
        </div>
        <div class="col-5">
          <font-awesome-icon id="reset" class="fa-2x" :icon="['fas', 'redo-alt']" />
          <div class="timer">
            <GameTimer ref="timerInstance" @timeLeft="timerUpdate"></GameTimer>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="gameOver" class="backdrop">
          <div class="congratulations">
            <font-awesome-icon v-on:click="gameOver=false" class="cross fa-lg" :icon="['fas', 'times']" />
            <div class="card-body"> <img src="https://img.icons8.com/bubbles/200/000000/trophy.png">
              <h4>Unlucky You ran out of Time!</h4>
              <a href="/blocks" class="btn btn-out btn-square continue">Pay Again?</a>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="gameFinished" class="backdrop">
          <div class="congratulations">
            <font-awesome-icon v-on:click="gameFinished=false" class="cross fa-lg" :icon="['fas', 'times']" />
            <div class="card-body"> <img src="https://img.icons8.com/bubbles/200/000000/trophy.png">
              <h4>Congratulations</h4>
              <p>You Scored {{this.timeRemaining / this.dragsUsed}}</p>
              <a href="/leaderboard" class="btn btn-out btn-square continue">Leaderboard</a>
            </div>
          </div>
        </div>
      </transition>
      <div id="game">
        <div>
          <h2>What is the meaning of {{hint}}</h2>
          <draggable v-model="blockOrder" @start="drag=true" @end="drag=false">
            <div v-for="(block, index) in blockOrder" :key="block" @dragend="checker">
              <button v-if="blockOrder[index] === correct[index]" class="correct"><font-awesome-icon class="fa-2x" icon="puzzle-piece"/> {{block}}</button>
              <button v-else><font-awesome-icon class="fa-2x" icon="puzzle-piece"/> {{block}}</button>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <input id="StreamType"  type="hidden" value="Business Intelligence">

  </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'
import GameTimer from './GameTimer'

export default {
  name: 'textBlocks.vue',
  components: {
    draggable,
    GameTimer
  },
  data () {
    return {
      blockOrder: [],
      correct: [],
      hint: [],
      dragsUsed: 0,
      timeRemaining: null,
      gameOver: false,
      gameFinished: false
    }
  },
  mounted () { // Axios get method to get questions from the database of the stream being played
    this.$refs.timerInstance.startTimer()
    axios.get('http://localhost:3000/api/questions', {
      params: {
        streams: String('Software Testing')
      }
    })
      .then((response) => {
        const length = response.data.length
        const randomNum = Math.floor(Math.random() * length) // Select a random question using a random number
        const hint = response.data[randomNum].term
        const text = response.data[randomNum].meaning
        this.hint = hint
        const num = text.split(' ').length / 5
        const arrOne = text.split(' ').slice(0, num).join(' ')
        const arrTwo = text.split(' ').slice(num, num * 2).join(' ')
        const arrThree = text.split(' ').slice((num * 2), num * 3).join(' ')
        const arrFour = text.split(' ').slice((num * 3), num * 4).join(' ')
        const arrFive = text.split(' ').slice((num * 4), num * 5).join(' ')
        this.correct = [arrOne, arrTwo, arrThree, arrFour, arrFive] // The correct order of textblocks
        this.blockOrder = [arrThree, arrFive, arrTwo, arrOne, arrFour] // The order of blocks given to the user
      })
  },
  methods: {
    checker () { // This is called each time an object is dragged
      this.dragsUsed++ // Increase number of drags used
      if (this.blockOrder.toString() === this.correct.toString()) {
        const score = this.timeRemaining / this.dragsUsed // Score is time remaining divided by drags used
        console.log(score + 'points')
        this.$refs.timerInstance.stopTimer()
        // axios post the new score to database to update if its a new high score for the user
        axios.post('http://localhost:3000/api/scores', {
          username: sessionStorage.getItem('username'),
          game: 'blocks',
          stream: sessionStorage.getItem('stream'),
          score: score
        })
          .then((response) => {
            console.log(response)
            this.gameFinished = true
          })
      }
    },
    timerUpdate (value) {
      this.timeRemaining = value
      if (value <= 0) {
        this.gameOver = true
        this.$refs.timerInstance.stopTimer()
      }
    }
  }
}
</script>

<style scoped>
#placeholder {
  margin-top: 30%;
  text-align: center;

}
.timer {
  margin-left: 35%;
  display: inline-block;
  top: 40%;
}
.timer p {
  margin-top: 4%;
  width: 5%;
}
#reset {
  top: 50%;
  float: left;
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
}#placeholder {
   margin-top: 30%;
   text-align: center;

 }
.timer {
  margin-left: 35%;
  display: inline-block;
  top: 40%;
}
.timer p {
  margin-top: 4%;
  width: 5%;
}
#reset {
  top: 50%;
  float: left;
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
.correct{
  color: #1e7e34;
}
#text-group {
  margin-left: 2.5%;
}
.backdrop {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  /*display: none;*/
}
.congratulations {
  left: 35%;
  margin-top: 17%;
  position: relative;
  display: flex;
  width: 450px;
  flex-direction: column;
  min-width: 0;
  z-index: 999;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #d2d2dc;
  border-radius: 4px;
  -webkit-box-shadow: 0px 0px 5px 0px rgb(249, 249, 250);
  -moz-box-shadow: 0px 0px 5px 0px rgba(212, 182, 212, 1);
  box-shadow: 0px 0px 5px 0px rgb(161, 163, 164)

}
</style>
