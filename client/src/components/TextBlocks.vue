<!-- Module: TextBlocks.vue
Creation Date: 18/12/2020
Last Edit Date:05/01/2021
Authors: Ethan Cowey
Overview: The purpose of this component is to be a game in which users must drag blocks of text in order to match the
correct definition. There will be a 2 minute time limit and the faster its completed the higher the score achieved.
In the <template> There is the nav bar to navigate to other sections of the site.
In the <script>
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
          </div>
        </div>

      </div>
      <div id="game">
        <div>
          <h2 v-text="hint"> {{minutesRemaining}}:{{secondsRemaining}}</h2>
          <draggable v-model="questions" @start="drag=true" @end="drag=false">
            <div v-for="block in questions" :key="block.id" @dragend="checker"><button><h4>{{block}}</h4></button></div>
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
import router from '../router/index.js'

export default {
  name: 'textBlocks.vue',
  components: {
    draggable
  },
  data () {
    return {
      questions: [],
      correct: [],
      hint: [],
      dragsUsed: 0,
      timeRemaining: 120,
      minutesRemaining: 2,
      secondsRemaining: 0
    }
  },
  watch: {
    timeRemaining: {
      handler () {
        setTimeout(this.timeMonitor, 1000) // Every second it will run timeMonitor which will decrease time by 1
      },
      immediate: true
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/questions', {
      params: {
        streams: String('Software Testing')
      }
    })
      .then((response) => {
        const length = response.data.length
        const randomNum = Math.floor(Math.random() * length)
        const hint = response.data[randomNum].term
        const text = response.data[randomNum].meaning
        this.hint = hint
        const num = text.split(' ').length / 3
        const arrOne = text.split(' ').slice(0, num).join(' ')
        const arrTwo = text.split(' ').slice(num, num * 2).join(' ')
        const arrThree = text.split(' ').slice((num * 2), num * 3).join(' ')
        this.correct = [arrOne, arrTwo, arrThree]
        this.questions = [arrThree, arrTwo, arrOne]
        console.log(text)
      })
  },
  methods: {
    checker () { // This is called each time an object is dragged
      this.dragsUsed++ // Increase number of drags used
      if (this.questions.toString() === this.correct.toString()) {
        alert('Winner')
        const score = this.timeRemaining / this.dragsUsed // Score is time remaining divided by drags used
        console.log(score + 'points')
        // axios here
        router.push('/leaderboard')
      }
    },
    timeMonitor () {
      this.timeRemaining-- // Decreases the time by 1
      console.log(this.timeRemaining)
      this.minutesRemaining = Math.floor(this.timeRemaining / 60)
      this.secondsRemaining = this.timeRemaining - Math.floor(this.timeRemaining / 60) * 60
      console.log(this.minutesRemaining + ' ' + this.secondsRemaining)
      if (this.timeRemaining === 0) { // If 0 no time is left so the game is over
        alert('GAME OVER')
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
#text-group {
  margin-left: 2.5%;
}
</style>
