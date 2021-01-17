/**
 * Module: login.spec.js
 * Creation Date: 14/01/2021
 * Last Edit Date: 14/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test Login.vue in the client package in the component folder in src. It tests if
 * form details are sent to the back-end with axios. As well as the 2 possible returns from the back-end being a
 * response that has null data for invalid logins or for valid ones it returns the JSON document of that user.
 */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import Login from '../../../client/src/components/Login'

describe('Test axios method is called', () => {
  it('Testing axios gets the username a password to post to the back-end for checking', async () => {
    const wrapper = mount(Login)
    document.body.innerHTML = wrapper.html()
    const spy = jest.spyOn(document, 'getElementById') // Axios calls this 2 times
    await Login.methods.loginPost()
    expect(spy).toBeCalledTimes(2)
  })
})

describe('Test validUser function called after loginPost when back-end authenticates the login', () => {
  it('Testing of validUser with a valid user login response from back-end', async () => {
    const wrapper = mount(Login)
    document.body.innerHTML = wrapper.html()
    const response = {
      data: {
        username: 'testing',
        firstname: 'first',
        lastname: 'last',
        email: 'mail@test'
      }
    }
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // alert is called if invalid user
    await Login.methods.validUser(response)
    expect(spy).toBeCalledTimes(0) // valid login so not called
  })
})

describe('Test validUser function called after loginPost when back-end denys the login', () => {
  it('Testing of validUser with a invalid user login', async () => {
    const wrapper = mount(Login)
    document.body.innerHTML = wrapper.html()
    const response = {
      data: {
      }
    }
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // alert is called if invalid user
    await Login.methods.validUser(response)
    expect(spy).toBeCalledTimes(1) // invalid login so it is called
  })
})
