import SignupSendAccountantInvitation from './SignupSendAccountantInvitation'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/SignupSendAccountantInvitation', () => {
  it('exports a valid component', () => {
    expect(SignupSendAccountantInvitation).toBeAComponent()
  })
  it(`doesn't call $router.push if email is invalid`, async () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByLabelText, wait } = render(
      SignupSendAccountantInvitation,
      {
        mocks: {
          $router,
        },
        stubs: ['Portal'],
      }
    )
    const emailInput = getByLabelText('Correo Electrónico')
    emailInput.value = 'mail@ma'
    fireEvent.input(emailInput)
    const onSubmitBtn = getByLabelText('sendInvitation')
    fireEvent.click(onSubmitBtn)
    await wait(() => {
      expect($router.push).toHaveBeenCalledTimes(0)
    })
  })
})
