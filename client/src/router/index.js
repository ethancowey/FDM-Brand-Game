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
import login from '../components/Login'
import register from '../components/Register'
import matchGame from '../components/matchGame'
import streams from '../components/Streams'
import textBlocks from '../components/TextBlocks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: login },
    { path: '/register', component: register },
    { path: '/match', component: matchGame },
    { path: '/blocks', component: textBlocks },
    { path: '/streams', component: streams }
  ]})
