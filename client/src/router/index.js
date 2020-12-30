import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import matchGame from '../components/matchGame'
import Streams from '../components/Streams'
import textBlocks from '../components/TextBlocks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Login },
    { path: '/register', component: Register },
    { path: '/match', component: matchGame },
    { path: '/blocks', component: textBlocks },
    { path: '/streams', component: Streams }
  ]})
