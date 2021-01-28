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
to retrieve all the questions.
There are also methods which are called on card click and then a method to handle matches and wins.
-->
<template>
  <div id="app">
<!--    Import NavigationBar component-->
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
<!--              Import GameTimer component -->
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
              <button v-on:click="resetGame" class="btn btn-out btn-square continue text-white">Play Again?</button>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
<!--        Shows if gameFinished boolean is true-->
        <div v-if="gameFinished" class="backdrop">
          <div class="congratulations">
<!--          Closes popup-->
            <font-awesome-icon v-on:click="gameFinished=false" class="cross fa-lg" :icon="['fas', 'times']" />
            <div class="card-body"> <img src="https://img.icons8.com/bubbles/200/000000/trophy.png">
              <h4>CONGRATULATIONS!</h4>
              <p>You scored {{score}} points and completed the game in {{120 - timeRemaining}} seconds</p>
              <a href="/leaderboard" class="btn btn-out btn-square continue text-white">Leaderboard</a>
<!--              Allows user to tweet score-->
              <a id="tweet" class="btn btn-out btn-square continue text-white"
                 :href="'https://twitter.com/intent/tweet?text=I scored ' + score + ' in the Match game %23FDMCareers'">
                Tweet #FDMCareers</a>
            </div>
          </div>
        </div>
      </transition>
      <div id="game">
        <ul class="deck" id="card-deck">
<!-- Uses Vue to loop through questions array and adds option to change the class depending on
          selected and matched boolean's are true
          Onclick calls cardClicked method-->
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
  name: 'MatchGame',
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
    sessionStorage.setItem('game', 'match')
    this.generateQuestions()
  },
  methods: {
    // Method Called once a card is clicked
    cardClicked: function (question) {
      // Checks the timer has started before clicking cards
      if (this.timeExpired === null) {
        return
      }
      // stops users opening more than 2 cards
      if (this.openedCards.length === 2) {
        return
      }
      // edits question.selected to true which sets css to the active card colour
      question.selected = true
      this.openedCards.push(question)
      if (this.openedCards.length === 2) {
        // once second card is opened handle the match
        this.handleMatch()
      }
    },
    // Once 2 cards are open checks if the cards match
    handleMatch: function () {
      // increment match attempts for  score
      this.matchAttempts++
      // if statement checks the cards have matching id's which means the card matches
      // second part of the if statement ensures that the same card can't be matched to itself
      if (this.openedCards[0]._id === this.openedCards[1]._id &&
        this.openedCards[0].showValue !== this.openedCards[1].showValue) {
        for (let i = 0; i <= 1; i++) {
          // sets cards to matched and removes selected attribute
          this.openedCards[i].matched = true
          this.openedCards[i].selected = false
        }
        // resets opened cards and increment pairsMatched
        this.openedCards = []
        this.pairsMatched++
        // checks if all cards have been matched and calls handleWin if so
        if (this.pairsMatched === 8) {
          this.handleWin()
        }
      } else {
        // if cards do not match calls closeCards with a delay of 400ms
        setTimeout(() => {
          this.closeCards()
        }, 400)
      }
    },
    // method to handle win, this function will stop timer and calculate and and call submit score method
    handleWin: function () {
      // allows game finished popup to show
      this.gameFinished = true
      // stops timer
      this.$refs.timerInstance.stopTimer()
      this.timeRemaining = this.$refs.timerInstance.getTime()
      // calculates score using time remaining and match attempts
      this.score = Math.round((this.timeRemaining / this.matchAttempts) * 10)
      this.submitScore()
    },
    // uses axios request to post score to /api/scores to add to database
    submitScore: function () {
      axios.post('http://localhost:3000/api/scores', {
        username: sessionStorage.getItem('username'),
        game: 'match',
        stream: sessionStorage.getItem('stream'),
        score: this.score
      })
        .then(() => {
        })
    },
    // method to close cards , removes selected attribute and resets openedCards array
    closeCards: function () {
      for (let i = 0; i <= 1; i++) {
        this.openedCards[i].selected = false
      }
      this.openedCards = []
    },
    // method to reset the game
    resetGame: function () {
      // stops timer
      this.$refs.timerInstance.stopTimer()
      // generates new question set
      this.generateQuestions()
      // resets all global variables
      this.pairsMatched = 0
      this.openedCards = []
      this.timeExpired = 1
      this.matchAttempts = 0
    },
    // shuffles array
    shuffle: function (array) {
      let currentIndex = array.length
      let tempVal
      let randomIndex
      // randomly shuffles until  currentIndex is the first index
      while (currentIndex !== 0) {
        // creates random index with Math.random
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        // makes 3 way swap
        tempVal = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = tempVal
      }
      return array
    },
    // This method generates the questions and sets up object array for questions
    generateQuestions: async function () {
      // axios request to api/questions with parameter stream to get objects
      const {data} = await axios.get('http://localhost:3000/api/questions', {
        params: {
          streams: sessionStorage.getItem('stream')
        }
      })
      // assigns object array to this.questions
      // Shuffles full object list to ensure all questions from the database get utilised
      // adds attributes selected and matched set to false
      // then gets the first 8 objects from this array
      this.questions = this.shuffle(data.map((q) => ({
        ...q,
        selected: false,
        matched: false
      }))).slice(0, 8)

      // Duplicates this.Questions, making sure it is cloned byRef not byVal
      for (let i = 0; i < 8; i++) {
        this.questions.push(Object.assign({}, this.questions[i]))
      }
      // adds showValue attribute to each object in this.questions array
      for (let i = 0; i < 16; i++) {
        // First 8 will have terms assigned to showValue
        if (i < 8) {
          this.questions[i].showValue = this.questions[i].term
        } else {
          // second 8 (the cloned objects) assigned meanings to showValue
          this.questions[i].showValue = this.questions[i].meaning
        }
      }
      // shuffles the 16 objects so that terms and meanings and mixed up
      this.shuffle(this.questions)
      // starts timer
      this.$refs.timerInstance.startTimer()
    }
  }
}

</script>
<style>
.card {
height: 8.5em;
width: 8.5em;
margin: 0.2em 0.2em;
/*background: #141214;;*/
border-radius: 0.33em;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
box-shadow: 0.33em 0.133em 1.33em 0 rgba(46, 61, 73, 0.5);
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
font-size: 0.867em;
}
.deck {
width: 100%;
background: #716F71;
padding: 1em;
border-radius: 0.267em;
box-shadow: 0.533em 0.62em 1.733em 0 rgba(46, 61, 73, 0.5);
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
font-size: 0.933em
}

h4 {
margin-top: 1.2em
}

</style>
