<!-- Module: Account.vue
Creation Date: 15/12/2020
Last Edit Date:24/01/2021
Authors: Miles Prosser
Overview:
The purpose of this component is for users to be able to view their account details and scores, additionally there is also
a feature where users can change their password, this method will check the current password is correct first before allowing
user to change password.
I have also created a method to get all user scores, this is then looped through and displayed to the user.
-->
<template>
  <div id="app">
    <NavigationBar/>
    <div class="container">
      <br>
      <br>
      <div class="row">
        <div class="col-7">
          <h2>Welcome {{username}}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-6 col-lg-6 ">
          <div class="account-info">
            <h2>Account:</h2>
            <p>Username: {{username}}</p>

            <form id="change-pass" v-on:submit.prevent="checkAuth" >
              <h2>Change Password:</h2>

              <label>Current Password</label>
              <div class="form-group">
                <input required id="current-password" type="password" class="form-control"
                       placeholder="Current Password">
              </div>
              <label>New Password</label>
              <div class="form-group">
                <input required id="password" type="password" class="form-control" placeholder="New Password"
                       pattern=".{6,12}" title="Must be 6 to 12 characters">
              </div>
              <label>Confirm Password</label>
              <div class="form-group">
                <input required id="confirmed-pass" type="password" class="form-control" placeholder="Confirm Password">
              </div>
              <span id='message'></span><br>
              <button type="submit" name="submit" class="btn btn-dark">Change Password</button>
            </form>
          </div>
        </div>
        <div class="col-6 col-lg-6">
            <ul class="scores-container">
              <h3>Your High Scores:</h3>
              <br>
<!--              loop through Scores array-->
              <li
                v-for="score in Scores"
                :key="score.id"
                class="score"
                >
                <div class="row">
                  <div class="column">
                    <p id="game">{{ score.stream + ' ' + score.game}}:</p>
                  </div>
                  <div class="column">
                    <p id="user-score">{{score.score}}</p>
                  </div>
                </div>

              </li>
            </ul>

          </div>
        </div>
      </div>
  </div>

</template>

<script>
import axios from 'axios'
import NavigationBar from './NavigationBar'
export default {
  components: {NavigationBar},
  data () {
    return {
      Scores: [],
      username: sessionStorage.getItem('username')
    }
  },
  async mounted () {
    this.checkUser()
    // axios request to get user scores from database using /api/scores
    const {data} = await axios.get('http://localhost:3000/api/scores', {
      params: {
        username: this.username
      }
    })
    this.Scores = data
  },
  methods: {
    // method to check if user is a guest or not and disable change password form if so
    checkUser: function () {
      // check if guest is set to true
      if (sessionStorage.getItem('guest') === 'true') {
        // loops through form fields and disables
        const fields = document.getElementById('change-pass').getElementsByTagName('*')
        for (let i = 0; i < fields.length; i++) {
          fields[i].disabled = true
        }
      }
    },
    // Resets user password
    resetPassword (response) {
      if (response.data.username === this.username) {
        // axios request to /api/resetpass with username and confirmed password
        axios.post('http://localhost:3000/api/resetpass', {
          username: this.username,
          password: String(document.getElementById('confirmed-pass').value)
        })
          .then((response) => {
            if (response.data.username === this.username) {
              alert('Successfully updated password')
              // reset form
              document.getElementById('change-pass').reset()
            }
          })
      } else {
        alert('Incorrect Password')
      }
    },
    // Checks that current password entered is correct
    async checkAuth () {
      // checks both passwords matches
      if (document.getElementById('password').value !== document.getElementById('confirmed-pass').value) {
        document.getElementById('message').style.color = 'red'
        document.getElementById('message').innerHTML = 'Passwords are not matching'
        return
      }
      // axios login request
      axios.post('http://localhost:3000/api/auth', {
        username: this.username,
        password: String(document.getElementById('current-password').value)
      })
        .then((response) => { this.resetPassword(response) })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.account-info {
  height: 5em ;
  width: 80%;
  /*border-style: solid;*/
  /*border-width: 2px;*/
  margin-top: 1%;
  list-style-type: none;
}
body {
  margin: 0;
  padding: 0;
  background-color: #EAEAEA !important;
}

.scores-container {
  height: 20em;
  width: 85%;
  border-style: solid;
  border-width: 0.33em;
  margin-top: 20%;
  list-style-type: none;
  float: right;
}
.scores-container h3 {
  padding-top: 0.5em;
  font-weight: bolder;
}
.scores-container p{
  margin: 0.1em;
}
.account-info h2 {
  padding-top: 1em;
}
.account-info p {
  text-align: left;
}
#user-score {
  font-weight: bold;
  font-size: 1em;
  padding-right: 10%;

}
#game {
  font-weight: bolder;
  font-size: 1em;
}

.column {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.scores-container .row:after {
  content: "";
  display: table;
  clear: both;
}
.form-control{
  margin: 0.1em;
  height: 1.75em;
}
</style>
