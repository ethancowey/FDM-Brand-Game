import Vue from 'vue'
import router from './router'
import App from './App'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
