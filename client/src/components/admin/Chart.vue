<!-- Module: Admin.vue
Creation Date: 18/01/2020
Last Edit Date:26/01/2021
Authors: Maria Andrzejewska
Overview:
The purpose of this component is to generate graphs displaying information on the user types and stream performance.
A dropdown menu is implemented in this component, to allow for intuitive changing between the two available graphs. By
default, the graph displaying the ratio of registered users to guest users will be shown. By clicking any option on the
dropdown menu, a method is called to change the data being displayed, correspondingly to the chosen option.
-->
<template>
  <div class="container">
    <div class="dropdown">
      <button id="dropdown-button" class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
        {{ this.graphType }}
        <span class="caret"></span></button>
      <ul class="dropdown-menu">
        <li>
          <a class="dropdown-item" @click="getUsersGraph()">User Types Chart</a>
          <a class ="dropdown-item" @click ="getStreamsGraph()">Streams Performance Chart</a>
        </li>
      </ul>
    </div>
    <p class="title">{{this.graphTitle}}</p>
  <div id="chart-container" class="chart-container">
    <canvas id="chart"></canvas>
  </div>
    </div>
</template>
<script>
import Chart from 'chart.js'
import axios from 'axios'
export default {
  data () {
    return {
      type: '',
      graphLabels: [],
      graphData: [],
      colors: [],
      graphType: '',
      graphTitle: '',
      myChart: {},
      dataSets: ''
    }
  },
  methods: {
    createChart: function (chartId) {
      const ctx = document.getElementById(chartId).getContext('2d')
      let chart
      chart = new Chart(ctx, {
        type: this.type,
        data: {
          labels: this.graphLabels,
          datasets: [
            {
              backgroundColor: this.colors,
              label: this.graphType,
              data: this.graphData,
              borderWidth: 0.5,
              borderColor: '#2C7DA0'
            }]
        }
      })
      this.myChart = chart
    },
    getUsersGraph: function () {
      this.clearCanvas()
      axios.get('http://localhost:3000/api/getUsersGraph')
        .then((response) => {
          const data = response.data
          let roles = []
          let amounts = []
          for (let i = 0; i < data.length; i += 1) {
            roles.push(data[i].role)
            amounts.push(data[i].amount)
          }
          this.colors = ['#61A5C2', '#89C2D9']
          this.graphLabels = roles
          this.graphData = amounts
          this.type = 'doughnut'
          this.graphType = 'User Types'
          this.graphTitle = 'User role chart'
          this.createChart('chart')
        })
    },
    getStreamsGraph: function () {
      this.clearCanvas()
      axios.get('http://localhost:3000/api/getStreamsGraph').then((response) => {
        const data = response.data
        let streams = []
        let averages = []
        for (let i = 0; i < data.length; i += 1) {
          if (data[i]._id != null) {
            streams.push(data[i]._id)
            averages.push(data[i].average)
          }
        }
        this.colors = ['#61A5C2', '#61A5C2', '#61A5C2']
        this.graphLabels = streams
        this.graphData = averages
        this.type = 'bar'
        this.graphType = 'Average Score'
        this.graphTitle = 'Average score per stream'
        this.createChart('chart')
      })
    },
    clearCanvas: function () {
      document.getElementById('chart-container').innerHTML = ''
      document.getElementById('chart-container').innerHTML = '<canvas id="chart"></canvas>'
    }
  },
  mounted () {
    // this is the graph that will show by default
    this.getUsersGraph()
  }
}
</script>
<style scoped>
.title{
  font-size:1.66em;
}
.dropdown-menu{
  font-size: 1.33em;
  background-color: #F5F5F5;
}
.container{
  border: 0.2em solid dimgray;
  border-radius: 0.8em;
  padding: 0.666em;
  background-color: #F5F5F5;
  height: 20em;
  position: center;
}
#dropdown-button{
  font-size: 1.33em;
  padding-top: 0.33em;
  padding-bottom: 0.266em;
  background-color: transparent;
  border-color: transparent;
  color: dimgray;
}
.chart-container{
  width: 28em;
  height: 5em;
  right: 20em;
  padding-left: 8em;
}
</style>
