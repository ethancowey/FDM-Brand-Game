/**
 * Module: textBlocks.spec.js
 * Creation Date: 12/01/2021
 * Last Edit Date: 12/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test TextBlocks.vue in the client package in the component folder in the src folder.
 * It tests that the correct procedure is applied when the Text Blocks are in the correct order when the checker() is
 * called. In the data function the questions represents what the user has ordered the blocks into.
 * The correct variable represents the correct order and the hint variable is what would be displayed to the user to
 * help them complete the game.
 */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import TextBlocks from '../../../client/src/components/TextBlocks'

describe('Text Blocks in the correct order', () => {
  it('Tests the check recognises its a win so alert is shown', async () => {
    const wrapper = mount(TextBlocks, {
      data () {
        return {
          hint: 'testing Question',
          blockOrder: ['1', '2', '3', '4', '5'],
          correct: ['1', '2', '3', '4', '5']
        }
      }
    })
    const alertCalled = jest.spyOn(window, 'alert').mockReturnValue()
    wrapper.vm.checker()
    expect(alertCalled).toBeCalled()
  })
})

describe('Text Blocks in the incorrect order', () => {
  it('Tests that the check recognises its not a win so no alert shown', async () => {
    const wrapper = mount(TextBlocks, {
      data () {
        return {
          hint: 'testing Question',
          blockOrder: ['2', '1', '4', '5', '3'],
          correct: ['1', '2', '3', '4', '5']
        }
      }
    })
    const alertCalled = jest.spyOn(window, 'alert').mockReturnValue()
    wrapper.vm.checker()
    expect(alertCalled).toBeCalledTimes(0)
  })
})

describe('Text Blocks in the partial correct order', () => {
  it('Tests that the check recognises its not a win so no alert shown', async () => {
    const wrapper = mount(TextBlocks, {
      data () {
        return {
          hint: 'testing Question some parts correct',
          blockOrder: ['1', '2', '4', '5', '3'],
          correct: ['1', '2', '3', '4', '5']
        }
      }
    })
    const alertCalled = jest.spyOn(window, 'alert').mockReturnValue()
    wrapper.vm.checker()
    expect(alertCalled).toBeCalledTimes(0)
  })
})

describe('Test erroneous input of no text blocks(question variable)', () => {
  it('Tests that the check recognises its not a win so no alert shown', async () => {
    const wrapper = mount(TextBlocks, {
      data () {
        return {
          hint: 'testing incorrect input',
          blockOrder: [],
          correct: ['1', '2', '3', '4', '5']
        }
      }
    })
    const alertCalled = jest.spyOn(window, 'alert').mockReturnValue()
    wrapper.vm.checker()
    expect(alertCalled).toBeCalledTimes(0)
  })
})
