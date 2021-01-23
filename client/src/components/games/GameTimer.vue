<!-- Module: TextBlocks.vue
Creation Date: 13/01/2021
Last Edit Date:13/01/2021
Authors: Ethan Cowey
Overview: This displays a timer that can be used in Games. In the template tags is the outputted minutes and seconds
remaining.
The script has 3 methods the first startTimer() when called by a game page will every second call the timeMonitor()
function. timeMonitor() when called decreases time remaining by 1 ass well as updates the minutes and seconds remaining.
timeMonitor() also emits the time back to the parent component the game meaning the game will know when time hits 0.
stopTimer() will stop the timer counting down when called. (usually when a game is completed)
To call these functions you must attach it to the same reference as the instance in your html template.
It can be used in html templates using <GameTimer>
-->
<template>
<div>
  {{this.minutesRemaining}} :  {{this.secondsRemaining}}
</div>
</template>

<script>
export default {
  name: 'GameTimer',
  data () {
    return {
      timeRemaining: 120,
      minutesRemaining: 2,
      secondsRemaining: '00',
      gameTimer: null
    }
  },
  methods: {
    startTimer () {
      this.timeRemaining = 120 // Resets the timer if its being recalled to play a game again
      this.minutesRemaining = 2
      this.secondsRemaining = '00'
      this.gameTimer = setInterval(this.timeMonitor, 1000) // Begins the timer
    },
    timeMonitor () { // This will on each call decrease time by 1 if it is above 0
      if (this.timeRemaining >= 1) {
        this.timeRemaining-- // Decreases the time by 1
        this.minutesRemaining = Math.floor(this.timeRemaining / 60)
        if ((this.timeRemaining - Math.floor(this.timeRemaining / 60) * 60) < 10) {
          this.secondsRemaining = '0' + (this.timeRemaining - Math.floor(this.timeRemaining / 60) * 60).toString()
        } else {
          this.secondsRemaining = this.timeRemaining - Math.floor(this.timeRemaining / 60) * 60
        }
        this.$emit('timeLeft', this.timeRemaining) // Emits to the component using the timer that time has updated
        // Meaning that if it emits timeRemaining = 0 the game page knows that time is up to end the game
      }
    },
    stopTimer () {
      clearInterval(this.gameTimer) // Stops the interval so timeRemaining will stop decreasing
    },
    getTime () {
      return this.timeRemaining // Returns the time remaining so that it can be called to use when calculating scores
    }
  }
}
</script>

<style scoped>

</style>
