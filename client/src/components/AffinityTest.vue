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
  <NavigationBar/>
    <br>
    <br>
    <h2>Affinity Test</h2>
    <br>
    <br>
    <div class="container">
    <div class="quiz" v-bind="object = questions[currentQuestion]">
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
    </div>
      <div class="congratulations" v-if="quizComplete && affinity > 4">
        <div>
          <div>
            <br>
            <div v-if="currentStream === 'Software Testing'">
              <h3>You would make a great Software Tester</h3>
              <font-awesome-icon class="end-medal fa-6x" :icon="['fas', 'medal']" />
              <h4>Learn more about the role below</h4>
              <a href="https://www.softwaretestingnews.co.uk/">More materials</a>
            </div>
            <div v-if="currentStream === 'Technical Operations'">
              <h3>You would be good in the Technical Operations field</h3>
              <font-awesome-icon class="end-medal fa-6x" :icon="['fas', 'medal']" />
              <h4>Learn more about the role below</h4>
              <a href="https://www.datapine.com/blog/bi-skills-for-business-intelligence-career/">More materials</a>
            </div>
            <div v-if="currentStream === 'Business Intelligence'">
              <h3>You would be good fit for Business Intelligence</h3>
              <font-awesome-icon class="end-medal fa-6x" :icon="['fas', 'medal']" />
              <h4>Learn more about the role below</h4>
              <a href="https://www.spiceworks.com/it-articles/troubleshooting-steps/">More materials</a>
            </div>
            <a href="/test">
            <font-awesome-icon class="end-icon fa-3x" :icon="['fas', 'redo-alt']" />
            </a>
          </div>
        </div>
      </div>
      <div class="congratulations" v-if="quizComplete && affinity <= 4">
        <div>
          <h3>Your not quite their yet</h3>
          <font-awesome-icon class="end-book fa-6x" :icon="['fas', 'book']" />
          <div>
            <br>
            <h4>Learn more about the role below</h4>
            <div v-if="currentStream === 'Software Testing'">
              <a href="https://www.softwaretestingnews.co.uk/">More materials</a>
            </div>
            <div v-if="currentStream === 'Technical Operations'">
              <a href="https://www.datapine.com/blog/bi-skills-for-business-intelligence-career/">More materials</a>
            </div>
            <div v-if="currentStream === 'Business Intelligence'">
              <a href="https://www.spiceworks.com/it-articles/troubleshooting-steps/">More materials</a>
            </div>
            <a href="/test">
              <font-awesome-icon class="end-icon fa-3x" :icon="['fas', 'redo-alt']" />
            </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavigationBar from './NavigationBar'
export default {
  name: 'AffinityTest',
  components: {NavigationBar},
  data () {
    return {
      questions: [{
        question: 'Loading questions',
        options: ['Loading', '', '', '']
      }],
      currentQuestion: 0,
      affinity: 0,
      quizComplete: false,
      currentStream: null
    }
  },
  mounted () {
    this.currentStream = sessionStorage.getItem('stream')
    console.log(this.currentStream)
    axios.get('http://localhost:3000/api/affinitytests', {
      params: {
        streams: String(this.currentStream)
      }
    })
      .then((response) => {
        this.questions = response.data // Set the response from the back-end to be the questions to use
        console.log(this.questions)
      })
  },
  methods: {
    optionSelected (option) {
      if (option.toString() === (this.questions[this.currentQuestion].correct).toString()) {
        this.affinity = this.affinity + 2 // Correct option so raise affinity by 2
      }
      if (option.toString() === (this.questions[this.currentQuestion].bonus).toString()) {
        this.affinity++ // Not quite correct so earns 1 point rise in affinity
      }
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++
      } else {
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
.congratulations {
  left: 35%;
  margin-top: unset;
  position: relative;
  display: flex;
  width: 30em;
  flex-direction: column;
  min-width: 0;
  z-index: 999;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0.067em solid #d2d2dc;
  border-radius: 0.267em;
  -webkit-box-shadow: 0px 0px 5px 0px rgb(249, 249, 250);
  -moz-box-shadow: 0px 0px 5px 0px rgba(212, 182, 212, 1);
  box-shadow: 0px 0px 5px 0px rgb(161, 163, 164)

}
.end-icon {
  color: black;
  size: 4em;
}
.end-medal {
  color: gold;
}
.end-book {
  color: blue;
}
</style>
