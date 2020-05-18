import LoginDefineNewPassword from './LoginDefineNewPassword'
// import { axiosAuth } from '../../axiosConfig'
jest.mock('../../axiosConfig')
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/LoginDefineNewPassword', () => {
  it('exports a valid component', () => {
    expect(LoginDefineNewPassword).toBeAComponent()
  })
})
