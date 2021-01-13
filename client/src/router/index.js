/**
 * Module index.js
 * Creation Date: 08/12/2020
 * Last Edit Date: 01/01/2021
 * Authors: Ethan Cowey, Miles Prosser
 * Overview: This is the page router for the front-end. It is invoked by the main.js method for the front-end.
 * When the page URL path is set or changed it will route the page to display the corresponding components page.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import MatchGame from '../components/matchGame'
import Streams from '../components/Streams'
import TextBlocks from '../components/TextBlocks'
import AdminLogin from '../components/AdminLogin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/match', component: MatchGame },
    { path: '/blocks', component: TextBlocks },
    { path: '/streams', component: Streams },
    { path: '/admin', component: AdminLogin }
  ]})
