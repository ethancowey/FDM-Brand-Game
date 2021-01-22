/**
 * Module: adminLogin.spec.js
 * Creation Date: 17/01/2021
 * Last Edit Date: 17/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test AdminLogin.vue in the client package in the component folder in src.
 * It tests if admin form details are correctly sent to the back-end as well as the 2 possible responses from
 * the back-end them being a valid Admin login or an invalid one and the correct behaviour is displayed after.
 */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import AdminLogin from '../../../client/src/components/admin/AdminLogin'

describe('Test axios method calls form values when adminPost is made', () => {
  it('Testing axios gets the username a password to post to the back-end for checking', async () => {
    const wrapper = mount(AdminLogin)
    document.body.innerHTML = wrapper.html()
    const spy = jest.spyOn(document, 'getElementById') // Axios calls this for the admin username and password
    await AdminLogin.methods.adminPost()
    expect(spy).toBeCalledTimes(2) // Should be called 2 times 1 for username and 1 for password in form
  })
})

describe('Test validAdmin function called after AdminPost when back-end authenticates the Admin login', () => {
  it('Testing of validAdmin with a valid admin login response from back-end', async () => {
    const response = { // set the response to have the variable admin to be true
      data: {
        admin: 'true'
      }
    }
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // alert is called if invalid user
    await AdminLogin.methods.validAdmin(response)
    expect(spy).toBeCalledTimes(0) // valid Admin login so not called
  })
})

describe('Test validAdmin function called after AdminPost when back-end authenticates the Admin login', () => {
  it('Testing of validAdmin with a invalid admin login response from back-end', async () => {
    const response = {
      data: {
      }
    }
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {}) // alert is called if invalid user
    await AdminLogin.methods.validAdmin(response)
    expect(spy).toBeCalledTimes(1) // invalid Admin login so alert called
  })
})
