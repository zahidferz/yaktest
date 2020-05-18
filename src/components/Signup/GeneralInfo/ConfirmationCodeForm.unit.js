import ConfirmationCodeForm from '@components/Signup/GeneralInfo/ConfirmationCodeForm'

describe('ConfirmationCodeForm', () => {
  it('Error: Displays error message', () => {
    const { getByText } = render(ConfirmationCodeForm, {
      propsData: {
        value: '',
        error: true,
      },
    })
    getByText('Código de confirmación incorrecto')
  })
  it('Accept just numeric input', () => {
    const { getByPlaceholderText } = render(ConfirmationCodeForm, {
      propsData: {
        value: 'werjieij1t23t4o',
      },
    })
    expect(getByPlaceholderText('codeInput0').value).toBe('1')
    expect(getByPlaceholderText('codeInput1').value).toBe('2')
    expect(getByPlaceholderText('codeInput2').value).toBe('3')
    expect(getByPlaceholderText('codeInput3').value).toBe('4')
  })
})
