import LoginPasswordRecovery from './LoginPasswordRecovery'
// import { axiosAuth } from '../../axiosConfig'
jest.mock('../../axiosConfig')
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/LoginPasswordRecovery', () => {
  it('exports a valid component', () => {
    expect(LoginPasswordRecovery).toBeAComponent()
  })
  // it shows error 'Escribe un correo válido' when the input is invalid
  it(`shows error message 'Escribe un correo válido' when input is invalid`, async () => {
    const { getByText, fireEvent, getByLabelText, wait } = render(
      LoginPasswordRecovery
    )
    const emailInput = getByLabelText('Correo Electrónico')
    emailInput.value = 'mail'
    fireEvent.input(emailInput)
    await wait(() => {
      expect(getByText('Escribe un correo válido')).toBeTruthy()
    })
  })
})
