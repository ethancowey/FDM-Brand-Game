/**
 * Module: register.spec.js
 * Creation Date: 15/01/2021
 * Last Edit Date: 15/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test Register.vue in the client package in the component folder in src. It tests if
 * form details are sent to the back-end with axios. As well as the response of if the username is unique or not.
 */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import Register from '../../../client/src/components/Register'

describe('Test axios method is called to check if unique username', () => {
  it('Testing axios gets the username from the form to check if unique with the back-end', async () => {
    const wrapper = mount(Register)
    document.body.innerHTML = wrapper.html() // Set the pages html to this as it is called by the function
    const spy = jest.spyOn(document, 'getElementById') // Axios calls this to get the username from the form
    await Register.methods.usernameUniquePost()
    expect(spy).toBeCalledTimes(1)
  })
})

describe('Test axios method is not called and alert is in validReg() if username is not unique', () => {
  it('what validReg() does when the back-end returns username is already in the database', async () => {
    const response = { // If username is not unique back-end returns exists
      data: 'exists'
    }
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    await Register.methods.validReg(response) // Alert called 1 time as username is not unique
    expect(spy).toBeCalledTimes(1)
  })
})

describe('Test axios method is called and alert is not in validReg() if username is unique', () => {
  it('what validReg() does when the back-end returns username is unique', async () => {
    const wrapper = mount(Register)
    document.body.innerHTML = wrapper.html()
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
