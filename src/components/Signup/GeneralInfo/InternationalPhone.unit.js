import InternationalPhone from '@components/Signup/GeneralInfo/InternationalPhone'
describe('InternationalPhone', () => {
  it('Two way binding exists', async () => {
    const value = {
      phone: '',
      countryCode: '',
    }
    const { wrapper, wait } = render(InternationalPhone, {
      propsData: {
        value,
      },
    })
    wrapper.setProps({
      value: {
        phone: '5530202464',
        countryCode: '+52',
      },
    })
    await wait(() => {
      expect(wrapper.emitted().input).toBeTruthy()
      expect(wrapper.emitted().input[0]).toEqual([
        {
          phone: '5530202464',
          countryCode: '+52',
        },
      ])
    }, 0)
  })
  xit('Validates phone number length must be greater than 10', () => {
    const value = {
      phone: '',
      countryCode: '',
    }
    const { fireEvent, getByLabelText, getByText } = render(
      InternationalPhone,
      {
        propsData: {
          value,
        },
      }
    )
    fireEvent.input(getByLabelText('Celular'), { target: { value: '500' } })
    getByText('Teléfono mínimo de 10 dígitos')
    fireEvent.input(getByLabelText('Celular'), {
      target: { value: '5555555' },
    })
  })
  xit('Phone number cannot has duplicate digits', () => {
    const value = {
      phone: '',
      countryCode: '',
    }
    const { fireEvent, getByLabelText, getByText } = render(
      InternationalPhone,
      {
        propsData: {
          value,
        },
      }
    )
    fireEvent.input(getByLabelText('Celular'), {
      target: { value: '5555555' },
    })
    getByText('Ingresa un número válido')
  })
  xit('CountryCodeDropdown', () => {
    const value = {
      phone: '',
      countryCode: '',
    }
    const { fireEvent, getByPlaceholderText, wrapper } = render(
      InternationalPhone,
      {
        propsData: {
          value,
        },
      }
    )
    fireEvent.change(getByPlaceholderText('CountryCodeDropdown'), {
      target: { value: '+1' },
    })
    expect(wrapper.vm.innerValue.countryCode).toBe('+1')
  })
  it('Emits input on phone or countrycode change', async () => {
    const value = {
      phone: '',
      countryCode: '',
    }
    const {
      fireEvent,
      getByPlaceholderText,
      getByLabelText,
      wrapper,
      wait,
    } = render(InternationalPhone, {
      propsData: {
        value,
      },
    })
    fireEvent.change(getByPlaceholderText('CountryCodeDropdown'), {
      target: { value: '+1' },
    })
    await wait(() => {
      expect(wrapper.emitted().input).toBeTruthy()
    })
    fireEvent.input(getByLabelText('Celular'), {
      target: { value: '5530202464' },
    })
    await wait(() => {
      expect(wrapper.emitted().input[1]).toEqual([
        { phone: '5530202464', countryCode: '+1' },
      ])
    })
  })
})
