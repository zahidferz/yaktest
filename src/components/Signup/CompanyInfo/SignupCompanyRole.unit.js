import SignupCompanyRole from './SignupCompanyRole'
// import GxCardCore from '@src/components/_Core/Cards/GxCardCore'
import { axiosAccountProvisioning } from '@src/axiosConfig'

const postMock = jest.fn(() => Promise.resolve(true))
jest.mock('@src/axiosConfig')
jest.spyOn(axiosAccountProvisioning, 'post').mockImplementation(postMock)

describe('@components/SignupCompanyRole', () => {
  it('exports a valid component', () => {
    expect(SignupCompanyRole).toBeAComponent()
  })
})
