<!-- Module: FillGame.vue
Creation Date: 26/12/2020
Last Edit Date: 28/01/2021
Authors: Tom Sevcov
Overview: The game is about filling the blanks in a chunk of text with the words given to the user. The time taken
is recorded to calculate a score. The more time is left - the higher is the socre. In the <template> There is the nav
bar to navigate to other sections of the site. There is a container for the game itself above it will be the game title,
restart button and timer. In the <script> There is the data() function which returns all the variables needed in the
html and javascript code. Than there is a mounted() function which is getting data from database. Also there is a check
function which runs automatically (interval). The game is won if all fields are correct.

-->

<template>
  <div id="app">
    <NavigationBar/>
    <div class="container">
      <br>
      <br>
      <div class="row">
        <div class="col-7">
          <h2>Fill in the blanks with the words</h2>
        </div>
        <div class="col-5">
          <a href="/fill">
            <font-awesome-icon id="reset" class="fa-2x" :icon="['fas', 'redo-alt']" />
          </a>
          <div class="timer">
            <GameTimer ref="timerInstance" @timeLeft = "gameOver = $refs.timerInstance.getTime()"></GameTimer>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="gameOver === 0" class="backdrop">
          <div class="congratulations">
            <font-awesome-icon v-on:click="gameOver = false" class="cross fa-lg" :icon="['fas', 'times']" />
            <div class="card-body"> <img src="https://img.icons8.com/bubbles/200/000000/trophy.png">
              <h4>You ran out of Time!</h4>
              <a href="/fill" class="btn btn-out btn-square continue text-white">Play Again?</a>
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
              <a href="/leaderboard" class="btn btn-out btn-square continue text-white">Leaderboard</a>
              <a id="tweet" class="btn btn-out btn-square continue text-white"
                 :href="'https://twitter.com/intent/tweet?text=I scored ' + scoreDisplayed + ' in Fill in the blanks ' +
                  '%23FDMCareers'">
                Tweet #FDMCareers</a>
            </div>
          </div>
        </div>
      </transition>
      <div id="game">
        <div>
          <p><br>{{questTerm1}}: {{questBlank1}}<br></p>
          <p>{{questTerm2}}: {{questBlank2}}<br></p>
          <p>{{questTerm3}}: {{questBlank3}}<br></p>
          <p>{{questTerm4}}: {{questBlank4}}<br></p>
          <p>{{questTerm5}}: {{questBlank5}}<br></p>
          <p>{{questTerm6}}: {{questBlank6}}<br></p>
          <p>{{questTerm7}}: {{questBlank7}}<br></p>
          <p>{{questTerm8}}: {{questBlank8}}<br></p>
          <p class="text-words"><b>WORDS TO USE:</b></p>
          <h4 class="text-center">{{shuffledArray[0]}}, {{shuffledArray[1]}}, {{shuffledArray[2]}},
            {{shuffledArray[3]}}, {{shuffledArray[4]}}, {{shuffledArray[5]}}, {{shuffledArray[6]}},
            {{shuffledArray[7]}}, {{shuffledArray[8]}}, {{shuffledArray[9]}}, {{shuffledArray[10]}},
            {{shuffledArray[11]}}</h4>
          <form id="blankInput" class="blank">
            <div class="form-group" v-on:submit.prevent="checkBlank">
              <label class="text-dark">1: <input id="blank1"></label>
              <label class="text-dark">5: <input id="blank5"></label><br>
              <label class="text-dark">2: <input id="blank2"></label>
              <label class="text-dark">6: <input id="blank6"></label><br>
              <label class="text-dark">3: <input id="blank3"></label>
              <label class="text-dark">7: <input id="blank7"></label><br>
              <label class="text-dark">4: <input id="blank4"></label>
              <label class="text-dark">8: <input id="blank8"></label><br><br>
              <label class="text-dark">There are more words than needed. You don't have to use all of them.<br>
              Fields are checked automatically. The game is won if all are correct.</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GameTimer from './GameTimer'
import NavigationBar from '../NavigationBar'

export default {
  name: 'FillGame.vue',
  components: {
    NavigationBar,
    GameTimer
  },
  // Function which returns all the variables needed in the html and javascript code.
  data () {
    return {
      inputAr: [],
      shuffledArray: [],
      scoreDisplayed: null,
      gameOver: false,
      gameFinished: false,
      mistakeX: false
    }
  },
  mounted () {
    // Starting timer and getting questions from database and setting game parameter
    sessionStorage.setItem('game', 'fill')
    this.$refs.timerInstance.startTimer()
    axios.get('http://localhost:3000/api/questions', {
      params: {
        streams: sessionStorage.getItem('stream')
      }
    })
      .then((response) => {
        // If the stream is Software Testing the game takes term, text with a blank and correct word for it
        if (sessionStorage.getItem('stream') === 'Software Testing') {
          this.questTerm1 = response.data[0].term
          this.questTerm2 = response.data[1].term
          this.questTerm3 = response.data[2].term2
          this.questTerm4 = response.data[4].term
          this.questTerm5 = response.data[5].term
          this.questTerm6 = response.data[6].term
          this.questTerm7 = response.data[7].term
          this.questTerm8 = response.data[8].term
          this.questBlank1 = response.data[0].textblank
          this.questBlank2 = response.data[1].textblank
          this.questBlank3 = response.data[2].textblank
          this.questBlank4 = response.data[4].textblank
          this.questBlank5 = response.data[5].textblank
          this.questBlank6 = response.data[6].textblank
          this.questBlank7 = response.data[7].textblank
          this.questBlank8 = response.data[8].textblank
          this.questCorrect1 = response.data[0].correct
          this.questCorrect2 = response.data[1].correct
          this.questCorrect3 = response.data[2].correct
          this.questCorrect4 = response.data[4].correct
          this.questCorrect5 = response.data[5].correct
          this.questCorrect6 = response.data[6].correct
          this.questCorrect7 = response.data[7].correct
          this.questCorrect8 = response.data[8].correct

          // Creating an array with correct words in order + 4 additional words
          this.shuffledArray = [this.questCorrect1, this.questCorrect2, this.questCorrect3, this.questCorrect4,
            this.questCorrect5, this.questCorrect6, this.questCorrect7, this.questCorrect8, 'activity', 'expected',
            'build', 'connected']
          // If the stream is Technical Operations the game takes term, text with a blank and correct word for it
        } else if (sessionStorage.getItem('stream') === 'Technical Operations') {
          this.questTerm1 = response.data[0].term
          this.questTerm2 = response.data[1].term
          this.questTerm3 = response.data[2].term
          this.questTerm4 = response.data[3].term
          this.questTerm5 = response.data[4].term
          this.questTerm6 = response.data[5].term
          this.questTerm7 = response.data[6].term
          this.questTerm8 = response.data[7].term
          this.questBlank1 = response.data[0].textblank
          this.questBlank2 = response.data[1].textblank
          this.questBlank3 = response.data[2].textblank
          this.questBlank4 = response.data[3].textblank
          this.questBlank5 = response.data[4].textblank
          this.questBlank6 = response.data[5].textblank
          this.questBlank7 = response.data[6].textblank
          this.questBlank8 = response.data[7].textblank
          this.questCorrect1 = response.data[0].correct
          this.questCorrect2 = response.data[1].correct
          this.questCorrect3 = response.data[2].correct
          this.questCorrect4 = response.data[3].correct
          this.questCorrect5 = response.data[4].correct
          this.questCorrect6 = response.data[5].correct
          this.questCorrect7 = response.data[6].correct
          this.questCorrect8 = response.data[7].correct

          // Creating an array with correct words in order + 4 additional words
          this.shuffledArray = [this.questCorrect1, this.questCorrect2, this.questCorrect3, this.questCorrect4,
            this.questCorrect5, this.questCorrect6, this.questCorrect7, this.questCorrect8, 'verifying', 'input',
            'measuring', 'critical']
          // If the stream is Business Intelligence the game takes term, text with a blank and correct word for it
        } else if (sessionStorage.getItem('stream') === 'Business Intelligence') {
          this.questTerm1 = response.data[1].term
          this.questTerm2 = response.data[2].term
          this.questTerm3 = response.data[3].term
          this.questTerm4 = response.data[5].term
          this.questTerm5 = response.data[6].term
          this.questTerm6 = response.data[7].term
          this.questTerm7 = response.data[8].term
          this.questTerm8 = response.data[9].term
          this.questBlank1 = response.data[1].textblank
          this.questBlank2 = response.data[2].textblank
          this.questBlank3 = response.data[3].textblank
          this.questBlank4 = response.data[5].textblank
          this.questBlank5 = response.data[6].textblank
          this.questBlank6 = response.data[7].textblank
          this.questBlank7 = response.data[8].textblank
          this.questBlank8 = response.data[9].textblank
          this.questCorrect1 = response.data[1].correct
          this.questCorrect2 = response.data[2].correct
          this.questCorrect3 = response.data[3].correct
          this.questCorrect4 = response.data[5].correct
          this.questCorrect5 = response.data[6].correct
          this.questCorrect6 = response.data[7].correct
          this.questCorrect7 = response.data[8].correct
          this.questCorrect8 = response.data[9].correct

          // Creating an array with correct words in order + 4 additional words
          this.shuffledArray = [this.questCorrect1, this.questCorrect2, this.questCorrect3, this.questCorrect4,
            this.questCorrect5, this.questCorrect6, this.questCorrect7, this.questCorrect8, 'graph', 'templates',
            'methods', 'way']
        }
        // Array with correct words and 4 additional words is shuffled before showing to the user
        // eslint-disable-next-line one-var
        var currentIndex = this.shuffledArray.length, temp, randomIndex
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
          temp = this.shuffledArray[currentIndex]
          this.shuffledArray[currentIndex] = this.shuffledArray[randomIndex]
          this.shuffledArray[randomIndex] = temp
        }
      })
    // Setting an interval for automatic checking
    setInterval(this.checkBlank, 1000)
  },
  methods: {
    // A method for checking the input fields
    checkBlank () {
      this.mistakeX = true
      // Comparing the input value with correct value
      if (document.getElementById('blank1').value === this.questCorrect1 &&
        document.getElementById('blank2').value === this.questCorrect2 &&
        document.getElementById('blank3').value === this.questCorrect3 &&
        document.getElementById('blank4').value === this.questCorrect4 &&
        document.getElementById('blank5').value === this.questCorrect5 &&
        document.getElementById('blank6').value === this.questCorrect6 &&
        document.getElementById('blank7').value === this.questCorrect7 &&
        document.getElementById('blank8').value === this.questCorrect8) {
        // Stopping interval for automatic checking
        clearInterval(this.checkBlank)
        // If all match, there is no mistake
        this.mistakeX = false
      }
      if (this.mistakeX === false) {
        // If there is no mistake, timer stops and score is calculated
        this.$refs.timerInstance.stopTimer()
        const timeRemaining = this.$refs.timerInstance.getTime()
        const score = Math.floor(timeRemaining) // Score is time remaining divided by drags used
        this.scoreDisplayed = score
        this.gameFinished = true
        // Posting score to the database
        axios.post('http://localhost:3000/api/scores', {
          username: sessionStorage.getItem('username'),
          game: 'fill',
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
#game {
  width: 70%;
  height: 70%;
  border: solid darkblue;
  border-radius: 0.66em;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
}
a {
  color: #2c3e50;
}
p {
  line-height: 1em;
  margin-bottom: 0.1em;
}
.form-control{
  padding: 0.5em;
  height: 2.5em;
  font-size: 1em;
}
.form-group{
  padding: 0.5em;
  height: 1em;
  font-size: 1em;
}
.text-dark{
  padding: 0.1em;
  height: 1em;
  font-size: 1em;
}
.text-words {
  margin-top: 0.7em;
}
</style>
