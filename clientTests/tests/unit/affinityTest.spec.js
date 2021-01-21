/**
 * Module: affinityTest.spec.js
 * Creation Date: 18/01/2021
 * Last Edit Date: 18/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test the affinity tests logic for when correct or bonus anwsers are selected the
 * correct score is shown. As well as if a certain fresh hold is met the
 */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import AffinityTest from '../../../client/src/components/AffinityTest'

describe('First question get correct answer then the bonus for a total of 3 points', () => {
  it('Tests the correct score additions and game ends after last question', async () => {
    const wrapper = mount(AffinityTest, {
      data () {
        return {
          questions: [{
            question: 'Dummy Question',
            options: ['1st Option', '2nd Option', '3rd Option', '4th Option'],
            correct: '0',
            bonus: '3'
          },
          {
            question: 'Dummy Question 2',
            options: ['1st Option', '2nd Option', '3rd Option', '4th Option'],
            correct: '1',
            bonus: '2'
          },
          {
            question: 'Dummy Question 3',
            options: ['1st Option', '2nd Option', '3rd Option', '4th Option'],
            correct: '1',
            bonus: '2'
          }],
          currentQuestion: 0,
          affinity: 0,
          quizComplete: false
        }
      }
    })
    const optionCorrect = '0'
    wrapper.vm.optionSelected(optionCorrect)
    expect(wrapper.vm.affinity).toBe(2) // Correct option picked so affinity is increased by 2
    expect(wrapper.vm.quizComplete).toBe(false)
    const optionBonus = '2'
    wrapper.vm.optionSelected(optionBonus)
    expect(wrapper.vm.affinity).toBe(3) // Bonus option picked so affinity increases by 1
    expect(wrapper.vm.quizComplete).toBe(false)
    const optionWrong = '3'
    wrapper.vm.optionSelected(optionWrong)
    expect(wrapper.vm.affinity).toBe(3) // Wrong option picked so affinity remains the same
    expect(wrapper.vm.quizComplete).toBe(true) // Last question so the game has ended
  })
})
