/**
 * Module: affinityTest.spec.js
 * Creation Date: 19/01/2021
 * Last Edit Date: 19/01/2021
 * Authors: Ethan Cowey
 * Overview: This module is used to test the timers logic under different scenarios and it counts down correctly.
 * */
/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import GameTimer from '../../../client/src/components/games/GameTimer'

describe('For a valid start time all time variables decrease correctly', () => {
  it('All variables decrease correctly', async () => {
    const wrapper = mount(GameTimer, {
      data () {
        return {
          timeRemaining: 120,
          minutesRemaining: 2,
          secondsRemaining: '00'
        }
      }
    })
    await wrapper.vm.timeMonitor()
    expect(wrapper.vm.timeRemaining).toBe(119)
    expect(wrapper.vm.minutesRemaining).toBe(1)
    expect(wrapper.vm.secondsRemaining).toBe(59)
  })
})

describe('Seconds under 10 display with leading 0', () => {
  it('Leading 0', async () => {
    const wrapper = mount(GameTimer, {
      data () {
        return {
          timeRemaining: 70
        }
      }
    })
    await wrapper.vm.timeMonitor()
    expect(wrapper.vm.secondsRemaining).toBe('09')
  })
})

describe('Time should not decrease when time is 0', () => {
  it('0', async () => {
    const wrapper = mount(GameTimer, {
      data () {
        return {
          timeRemaining: 0
        }
      }
    })
    await wrapper.vm.timeMonitor()
    expect(wrapper.vm.timeRemaining).toBe(0)
  })
})

describe('Time should not decrease when time is below 0', () => {
  it('erroneous star time', async () => {
    const wrapper = mount(GameTimer, {
      data () {
        return {
          timeRemaining: -1
        }
      }
    })
    await wrapper.vm.timeMonitor()
    expect(wrapper.vm.timeRemaining).toBe(-1)
  })
})
