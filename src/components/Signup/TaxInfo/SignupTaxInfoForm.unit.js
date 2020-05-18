import SignupTaxInfoForm from './SignupTaxInfoForm'

describe('@components/SignupTaxInfoForm', () => {
  it('exports a valid component', () => {
    expect(SignupTaxInfoForm).toBeAComponent()
  })

  it('Does not goes to the next page if input values are incorrect "', async () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByLabelText, getByText, wait } = render(
      SignupTaxInfoForm,
      {
        mocks: {
          $router,
        },
      }
    )
    const inputTaxId = getByLabelText('RFC')
    inputTaxId.value = 'CARD01664'
    fireEvent.input(inputTaxId)
    const inputCompany = getByLabelText('Nombre o Razón Social')
    inputCompany.value = 'P'
    fireEvent.input(inputCompany)
    fireEvent.click(getByText('continuar'))
    await wait(() => expect($router.push).toHaveBeenCalledTimes(0))
  })
})
