<!-- Module: TextBlocks.vue
Creation Date: 13/01/2021
Last Edit Date:13/01/2021
Authors: Ethan Cowey
Overview: This displays a timer that can be used in Games. In the template tags is the outputted minutes and seconds
remaining.
The script has 3 methods the first startTimer() when called by a game page will every second call the timeMonitor()
function. timeMonitor() when called decreases time remaining by 1 ass well as updates the minutes and seconds remaining.
stopTimer() will stop the timer counting down when called. (usually when a game is completed)
To call these functions you must attach it to the same reference as the instance in your html template.
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
      timer: null
    }
  },
  methods: {
    startTimer () {
      this.timeRemaining = 120
      this.minutesRemaining = 2
      this.secondsRemaining = '00'
      this.timer = setInterval(this.timeMonitor, 1000)
    },
    timeMonitor () { // This will on each call decrease time by 1 if it is above 0
      if (this.timeRemaining !== 0) {
        this.timeRemaining-- // Decreases the time by 1
        this.minutesRemaining = Math.floor(this.timeRemaining / 60)
        if ((this.timeRemaining - Math.floor(this.timeRemaining / 60) * 60) < 10) {
          this.secondsRemaining = '0' + (this.timeRemaining - Math.floor(this.timeRemaining / 60) * 60).toString()
        } else {
          this.secondsRemaining = this.timeRemaining - Math.floor(this.timeRemaining / 60) * 60
        }
        this.$emit('timeLeft', this.timeRemaining)
      }
    },
    stopTimer () {
      clearInterval(this.timer)
    },
    getTime () {
      return this.timeRemaining
    }
  }
}
</script>

<style scoped>

</style>
