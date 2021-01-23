<!-- Module: MatchGame.vue
Creation Date: 18/12/2020
Last Edit Date:24/01/2021
Authors: Miles Prosser
Overview:
The purpose of this component is to be a game in which users must match key words to their associated definitions. There
will be a 2 minute time limit and the faster and more accurate its completed the higher the score achieved.
The game will highlight when a match is correct and reset when a match is not correct.
There is a navbar component that is imported into the file.
There is a data() function which returns all the variables needed in the html and javascript code.
There are several method all for different purposes, for example generateQuestions() method will send an axios request
to retrieve all the questions. There are also methods which are called on card click and then a method to handle matches and wins.
-->
<template>
  <div id="app">
    <NavigationBar/>
    <div class="container">
      <br>
      <br>
      <div class="row">
        <div class="col-7">
          <h2>Match the Words</h2>
        </div>
        <div class="col-5">
            <font-awesome-icon v-on:click="resetGame" id="reset" class="fa-2x" :icon="['fas', 'redo-alt']" />
            <div class="timer">
              <GameTimer ref="timerInstance" @timeLeft = "timeExpired = $refs.timerInstance.getTime()"></GameTimer>
            </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="timeExpired === 0" class="backdrop">
          <div class="congratulations">
            <font-awesome-icon v-on:click="timeExpired = null" class="cross fa-lg" :icon="['fas', 'times']" />
            <div class="card-body"> <img src="https://img.icons8.com/bubbles/200/000000/trophy.png">
              <h4>Unlucky You ran out of Time!</h4>
              <br>
              <button v-on:click="resetGame" class="btn btn-out btn-square continue">Play Again?</button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="gameFinished" class="backdrop">
          <div class="congratulations">
            <font-awesome-icon v-on:click="gameFinished=false" class="cross fa-lg" :icon="['fas', 'times']" />
            <div class="card-body"> <img src="https://img.icons8.com/bubbles/200/000000/trophy.png">
              <h4>CONGRATULATIONS!</h4>
              <p>You scored {{score}} points and completed the game in {{120 - timeRemaining}} seconds</p>
              <a href="/leaderboard" class="btn btn-out btn-square continue">Leaderboard</a>
            </div>
          </div>
        </div>
      </transition>
      <div id="game">
        <ul class="deck" id="card-deck">
          <li
            v-for="question in questions"
            :key="question.id"
            class="card"
            :class="{ selected: question.selected, matched: question.matched }"
            v-on:click="cardClicked(question)">
            <h6>{{ question.showValue }}</h6>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GameTimer from './GameTimer'
import NavigationBar from '../NavigationBar'

export default {
  name: 'matchGame',
  components: {
    NavigationBar,
    GameTimer
  },
  data () {
    return {
      questions: [],
      openedCards: [],
      pairsMatched: 0,
      gameFinished: false,
      timeExpired: 1,
      score: 0,
      matchAttempts: 0,
      timeRemaining: null
    }
  },
  mounted () {
    this.generateQuestions()
  },
  methods: {
    cardClicked: function (question) {
      if (this.timeExpired === null) {
        return
      }
      if (this.openedCards.length === 2) {
        return
      }
      question.selected = true
      this.openedCards.push(question)
      if (this.openedCards.length === 2) {
        this.handleMatch()
      }
    },
    handleMatch: function () {
      this.matchAttempts++
      console.log(this.matchAttempts)
      if (this.openedCards[0]._id === this.openedCards[1]._id && this.openedCards[0].showValue !== this.openedCards[1].showValue) {
        for (let i = 0; i <= 1; i++) {
          this.openedCards[i].matched = true
          this.openedCards[i].selected = false
        }
        this.openedCards = []
        this.pairsMatched++
        if (this.pairsMatched === 8) {
          this.handleWin()
        }
      } else {
        setTimeout(() => {
          this.closeCards()
        }, 400)
      }
    },
    handleWin: function () {
      this.gameFinished = true
      this.$refs.timerInstance.stopTimer()
      this.timeRemaining = this.$refs.timerInstance.getTime()
      this.score = Math.round((this.timeRemaining / this.matchAttempts) * 10)

      console.log(this.timeRemaining)
      console.log(this.matchAttempts)
      this.submitScore()
    },
    submitScore: function () {
      axios.post('http://localhost:3000/api/scores', {
        username: sessionStorage.getItem('username'),
        game: 'match',
        stream: sessionStorage.getItem('stream'),
        score: this.score
      })
        .then((response) => {
          console.log(response)
        })
    },
    closeCards: function () {
      for (let i = 0; i <= 1; i++) {
        this.openedCards[i].selected = false
      }
      this.openedCards = []
    },
    resetGame: function () {
      this.$refs.timerInstance.stopTimer()
      this.generateQuestions()
      this.pairsMatched = 0
      this.openedCards = []
      this.timeExpired = 1
      this.matchAttempts = 0
    },
    shuffle: function (array) {
      let currentIndex = array.length
      let tempVal
      let randomIndex
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        tempVal = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = tempVal
      }
      return array
    },
    generateQuestions: async function () {
      const {data} = await axios.get('http://localhost:3000/api/questions', {
        params: {
          streams: sessionStorage.getItem('stream')
        }
      })
      this.questions = this.shuffle(data.map((q) => ({
        ...q,
        selected: false,
        matched: false
      }))).slice(0, 8)

      for (let i = 0; i < 8; i++) {
        this.questions.push(Object.assign({}, this.questions[i]))
      }
      for (let i = 0; i < 16; i++) {
        if (i < 8) {
          this.questions[i].showValue = this.questions[i].term
        } else {
          this.questions[i].showValue = this.questions[i].meaning
        }
      }
      this.shuffle(this.questions)
      this.$refs.timerInstance.startTimer()
    }
  }
}

</script>

<style scoped>
.card {
  height: 8.1rem;
  width: 8.1rem;
  margin: 0.2rem 0.2rem;
  /*background: #141214;;*/
  font-size: 0;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
}
.selected {
  color: white;
  background-color: #4A57BA;
}

.matched {
  color: white;
  background-color: #00A56A;
}
.card p {
  color: black;
}
.card h6 {
  font-size: 13px;
}
.deck {
  width: 100%;
  background: #716F71;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 8px 9px 26px 0 rgba(46, 61, 73, 0.5);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 3em;
}
#game {
  width: 45%;
  height: 70%;
  /*border: solid black;*/
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
}

p {
  font-size: 14px
}

h4 {
  margin-top: 18px
}

</style>
