<!-- Module: TextBlocks.vue
Creation Date: 18/12/2020
Last Edit Date:22/01/2021
Authors: Ethan Cowey
Overview: The purpose of this component is to be a game in which users must drag blocks of text in order to match the
correct definition. There will be a 2 minute time limit and the faster its completed the higher the score achieved.
In the <template> There is the nav bar to navigate to other sections of the site. There is a container for the game
itself above it will be the game title, restart button and timer.
In the <script> There is the data() function which returns all the variables needed in the html and javascript code.
The mounted() function runs when the page loads it uses axios to retrieve a question from the backend then put it in the
format to be used in the game by splitting it up.
In the methods there is checker() which runs each time an element is dragged it will check if all the elements are in
order if so the game end)s.
-->
<template>
  <div id="app">
    <navigation-bar/>
    <div class="container">
      <br>
      <br>
      <div class="row">
        <div class="col-7">
          <h2>Drag the Text Blocks into order</h2>
        </div>
        <div class="col-5">
          <a href="/blocks">
            <font-awesome-icon id="reset" class="fa-2x" :icon="['fas', 'redo-alt']" />
          </a>
          <div class="timer">
            <timer ref="timerInstance" @timeLeft = "gameOver = $refs.timerInstance.getTime()"></timer>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="gameOver === 0" class="backdrop">
          <div class="congratulations">
            <font-awesome-icon v-on:click="gameOver = false" class="cross fa-lg" :icon="['fas', 'times']" />
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
              <p>You Scored {{this.scoreDisplayed}}</p>
              <a href="/leaderboard" class="btn btn-out btn-square continue">Leaderboard</a>
              <a id="tweet" class="btn btn-out btn-square continue"
                 :href="'https://twitter.com/intent/tweet?text=I scored ' + scoreDisplayed + ' in blocks %23FDMCareers'">
                Tweet #FDMCareers</a>
            </div>
          </div>
        </div>
      </transition>
      <div id="game">
        <div>
          <h2>What is the meaning of {{hint}}</h2>
          <draggable v-model="blockOrder" @start="drag=true" @end="drag=false">
            <div v-for="(block, index) in blockOrder" :key="block" @dragend="checker">
              <button v-if="blockOrder[index] === correct[index]" class="correct">
                <font-awesome-icon class="fa-2x" icon="puzzle-piece"/> {{block}}</button>
              <button v-else class="incorrect"><font-awesome-icon class="fa-2x" icon="puzzle-piece"/> {{block}}</button>
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
import timer from './GameTimer'
import NavigationBar from '../NavigationBar'

export default {
  name: 'textBlocks.vue',
  components: {
    NavigationBar,
    draggable,
    timer
  },
  data () {
    return {
      blockOrder: [],
      correct: [],
      hint: [],
      dragsUsed: 0,
      scoreDisplayed: null,
      gameOver: false,
      gameFinished: false
    }
  },
  mounted () { // Axios get method to get questions from the database of the stream being played
    sessionStorage.setItem('game', 'blocks')
    this.$refs.timerInstance.startTimer()
    axios.get('http://localhost:3000/api/questions', {
      params: {
        streams: String(sessionStorage.getItem('stream'))
      }
    })
      .then((response) => {
        const length = response.data.length
        const randomNum = Math.floor(Math.random() * length) // Select a random question using a random number
        this.hint = response.data[randomNum].term
        const text = response.data[randomNum].meaning
        const num = text.split(' ').length / 5
        const blockOne = text.split(' ').slice(0, num).join(' ') // Split the text into 5 blocks
        const blockTwo = text.split(' ').slice(num, num * 2).join(' ')
        const blockThree = text.split(' ').slice((num * 2), num * 3).join(' ')
        const blockFour = text.split(' ').slice((num * 3), num * 4).join(' ')
        const blockFive = text.split(' ').slice((num * 4), num * 5).join(' ')
        this.correct = [blockOne, blockTwo, blockThree, blockFour, blockFive] // The correct order of textblocks
        this.blockOrder = [blockThree, blockFive, blockTwo, blockOne, blockFour]// The order of blocks given to the user
        // Blocks aren't randomized as they can give the order away as when you put them in place they go green
      })
  },
  methods: {
    checker () { // This is called each time an object is dragged
      this.dragsUsed++ // Increase number of drags used
      if (this.blockOrder.toString() === this.correct.toString()) {
        this.$refs.timerInstance.stopTimer()
        const timeRemaining = this.$refs.timerInstance.getTime()
        const score = Math.floor(timeRemaining / this.dragsUsed) // Score is time remaining divided by drags used
        this.scoreDisplayed = score
        this.gameFinished = true
        // axios post the new score to database to update if its a new high score for the user
        axios.post('http://localhost:3000/api/scores', {
          username: sessionStorage.getItem('username'),
          game: 'blocks',
          stream: sessionStorage.getItem('stream'),
          score: score
        })
          .then((response) => {
            console.log(response)
          })
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
  color: #1F1F1F;
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

.correct{
  color: #1e7e34;
  font-size: 1vw;
  border-radius: 25px;
  padding: 1%;
  margin: 1%;
}
.incorrect{
  font-size: 1vw;
  border-radius: 25px;
  padding: 1%;
  margin: 1%;
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
