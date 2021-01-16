/**
 * Module: register.spec.js
 * Creation Date: 15/01/2021
 * Last Edit Date: 15/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test Register.vue in the client package in the component folder in src. It tests if
 * form details are sent to the back-end with axios. As well as the response of if the username is unique or not.
 */
/* eslint-disable no-undef */
import Register from '../../../client/src/components/Register'

describe('Test axios method is called to check if unique username', () => {
  it('Testing axios gets the username from the form to check if unique with the back-end', async () => {
    document.body.innerHTML = `
    <input id="username" />
  `
    const usernameInput = document.getElementById('username')
    usernameInput.value = 'Testing' // Set the username in the registration form
    const spy = jest.spyOn(document, 'getElementById') // Axios calls this 1 time to get the username
    await Register.methods.usernameUniquePost()
    expect(spy).toBeCalledTimes(1)
  })
})

describe('Test axios method is not called and alert is in validReg() if username is not unique', () => {
  it('what validReg() does when the back-end returns username is already in the database', async () => {
    const response = { // If username is not unique back-end returns exists
      data: 'exists'
    }
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // Alert called this 1 time if username is not unique
    await Register.methods.validReg(response)
    expect(spy).toBeCalledTimes(1)
  })
})

describe('Test axios method is called and alert is not in validReg() if username is unique', () => {
  it('what validReg() does when the back-end returns username is unique', async () => {
    document.body.innerHTML = `
    <input id="username" />
    <input id="firstname" />
    <input id="lastname" />
    <input id="e-mail" />
    <input id="password" />
  `
    const response = { // If username is unique back-end returns null data
      data: ''
    }
    const spyAlert = jest.spyOn(window, 'alert') // Alert will not be called in this scenario
    const spyForm = jest.spyOn(document, 'getElementById') // Axios calls this 5 times for each form element
    await Register.methods.validReg(response)
    expect(spyAlert).toBeCalledTimes(0)
    expect(spyForm).toBeCalledTimes(5)
  })
})
