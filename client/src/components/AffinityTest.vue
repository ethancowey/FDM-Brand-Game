<!-- Module: TextBlocks.vue
Creation Date: 16/01/2021
Last Edit Date: 16/01/2021
Authors: Ethan Cowey
Overview:
In the <template> Is the navigation bar below that the quiz container and the pop ups for if you pass the affinity test.
In the <script> Is the mounted function which depending on what stream the user chose earlier requests from the back-end
the test questions for that topic. Each time a user selects an option to the question the optionSelected() method checks
if its correct and awards the user 2 points or if its the bonus and earns the user 1 point. Once all questions are
answered the variable quizComplete is set to true so that the message for giving users results in the html can be shown.
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
    <br>
    <br>
    <h2>Affinity Test</h2>
    <br>
    <br>
    <div class="container">
    <div class="quiz" v-if="quizComplete === false" v-bind="object = questions[currentQuestion]">
      <h4>{{object.question}}</h4>
      <div class="option" @click="optionSelected(0)">
        {{object.options[0]}}
      </div>
      <div class="option" @click="optionSelected(1)">
        {{object.options[1]}}
      </div>
      <div class="option" @click="optionSelected(2)">
        {{object.options[2]}}
      </div>
      <div class="option" @click="optionSelected(3)">
        {{object.options[3]}}
      </div>
    </div>
      <div class="quiz" v-if="quizComplete && affinity > 1">
        <div>
          <h3>You would make a good Software Tester</h3>
          <div>
            <br>
            <button v-on:click="quizComplete=false; currentQuestion= 0"> Play Again</button>
            <h4>Learn more about the role below</h4>
            <a href="https://www.istqb.org/downloads/category/2-foundation-level-documents.html">More materials</a>
          </div>
        </div>
      </div>
      <div class="quiz" v-if="quizComplete && affinity <= 1">
        <div>
          <h3>Your not quite their yet</h3>
          <div>
            <br>
            <button v-on:click="quizComplete=false; currentQuestion= 0"> Play Again</button>
            <h4>Learn more about the role below to improve your affinity</h4>
            <a href="https://www.istqb.org/downloads/category/2-foundation-level-documents.html">More materials</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AffinityTest',
  data () {
    return {
      questions: [{
        question: 'Loading questions',
        options: ['Loading', '', '', '']
      }],
      currentQuestion: 0,
      affinity: 0,
      quizComplete: false
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/affinitytests', {
      params: {
        streams: String('Business Intelligence')
      }
    })
      .then((response) => {
        this.questions = response.data
        console.log(this.questions)
      })
  },
  methods: {
    optionSelected (option) {
      if (option.toString() === (this.questions[this.currentQuestion].correct).toString()) {
        console.log('correct')
        this.affinity = this.affinity + 2
      }
      if (option.toString() === (this.questions[this.currentQuestion].bonus).toString()) {
        this.affinity++
      }
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      } else {
        console.log(this.affinity)
        this.quizComplete = true
      }
    }
  }
}
</script>

<style scoped>
.quiz {
  width: 60%;
  height: 65%;
  border: solid black;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
}
.option {
  font-size: 1vw;
  border-radius: 25px;
  padding: 1%;
  margin: 1%;
  background: honeydew;
}
</style>
