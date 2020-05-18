/* global global */
import MyClients from './MyClients'
import ReactiveProvide from 'vue-reactive-provide'
import Vue from 'vue'

Vue.use(ReactiveProvide)

global.IntersectionObserver = class IntersectionObserver {
  /* eslint-disable */
  constructor() {}
  /* eslint-enable */

  observe() {
    return null
  }

  unobserve() {
    return null
  }
}

describe('@components/MyClients', () => {
  it('exports a valid component', () => {
    expect(MyClients).toBeAComponent()
  })
})
