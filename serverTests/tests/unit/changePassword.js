/**
 * Module: loginAuthentication.test.js
 * Creation Date: 02/01/2021
 * Last Edit Date: 02/01/2021
 * Authors: Miles Prosser
 */
/* eslint-disable no-undef */
const resetPassword = require('../../../server/src/resetPassword.js')

test('Testing a valid username and hash', async () => {
    const updatePasswordSuccess = await resetPassword.updatePass(
        'ad4525433ea08505c3f57920ea5496a09cbae22f52854862b73d57ba0a41950e', 'miles')
    expect(updatePasswordSuccess.username).toBe('miles')
})

test('Testing a invalid username and valid hash for another account', async () => {
    const incorrectUsername = await loginAuthentication.validLogin(
        'f6179ed4db729720155d82b03b033f27bbb4b64e3e9651a1b1dce6a7675fb78b', 'InvalidLoginTest')
    expect(incorrectUsername).toBe(null)
})

