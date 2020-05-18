import SignupAccountConfirmation from './SignupAccountConfirmation'
describe('@components/SignupAccountConfirmation', () => {
  xit('Phone number format', async () => {
    const { getByText } = render(SignupAccountConfirmation, {
      stubs: ['GxTextLink'],
      data() {
        return {
          myAccount: {
            email: 'perezjonathan130@gmail.com',
            mobilePhone: '5530202464',
          }, //,npm
        }
      },
    })
    getByText('55 3020 2464')
  })
  xit('Sends confirmation code', async () => {
    const sendCode = jest.fn((email) => Promise.resolve(email))
    const { getByText, fireEvent } = render(SignupAccountConfirmation, {
      stubs: ['GxTextLink'],
      data() {
        return {
          myAccount: {
            email: 'perezjonathan130@gmail.com',
            mobilePhone: '5530202464',
          },
        }
      },
      methods: {
        sendCode,
      },
    })
    fireEvent.click(getByText('Reenviar código'))
    expect(sendCode).toHaveBeenCalledWith('perezjonathan130@gmail.com')
  })
  xit('Send confirmation error modal', async () => {
    const sendCode = jest.fn(() => {
      throw TypeError('Test Error Message')
    })
    const { getByText, fireEvent } = render(SignupAccountConfirmation, {
      stubs: ['GxTextLink', 'GxModal'],
      data() {
        return {
          myAccount: {
            email: 'perezjonathan130@gmail.com',
            mobilePhone: '5530202464',
          },
        }
      },
      methods: {
        sendCode,
      },
    })
    fireEvent.click(getByText('Reenviar código'))
    getByText('Test Error Message')
  })
  xit('Confirms code', async () => {
    const validateCode = jest.fn(() => Promise.resolve())
    const { getByPlaceholderText, fireEvent } = render(
      SignupAccountConfirmation,
      {
        stubs: ['GxTextLink', 'GxModal'],
        data() {
          return {
            myAccount: {
              email: 'perezjonathan130@gmail.com',
              mobilePhone: '5530202464',
            },
          }
        },
        methods: {
          validateCode,
        },
      }
    )
    fireEvent.input(getByPlaceholderText('codeInput0'), {
      target: { value: '1' },
    })
    fireEvent.input(getByPlaceholderText('codeInput1'), {
      target: { value: '2' },
    })
    fireEvent.input(getByPlaceholderText('codeInput2'), {
      target: { value: '3' },
    })
    fireEvent.input(getByPlaceholderText('codeInput3'), {
      target: { value: '4' },
    })
    expect(validateCode).toHaveBeenCalledWith(
      '1234',
      'perezjonathan130@gmail.com'
    )
  })
})
