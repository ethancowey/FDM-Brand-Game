/**
 * Module: main.js
 * Creation Date: 08/12/2020
 * Last Edit Date: 24/01/2021
 * Authors: Ethan Cowey, Miles Prosser
 * Overview: This file initialises the web app it loads a new Vue instance which is our web application. This is where
 * we import the router as well as set some navigation guards to stop invalid users getting to areas they don't have
 * the access level for.
 */
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

router.beforeEach((to, from, next) => {
  if (to.path === '/' || to.path === '/register' || to.path === '/admin') {
    next(true) // If user is going to one of these pages allow with no validation
  } else if (to.path === '/adminpage' && sessionStorage.getItem('admin') === null) {
    next('/') // If user tries to go to admin page and is not an admin page send them to the login page
  } else if (sessionStorage.getItem('username') !== null) {
    next(true) // If user has a username they are valid to go to these pages unless they matched the other ifs
  } else {
    next('/') // else user is going to a page and is not valid send them to the login page
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
