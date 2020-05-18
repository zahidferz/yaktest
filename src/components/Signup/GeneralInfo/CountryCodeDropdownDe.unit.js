import CountryCodeDropdownDe from '@components/Signup/GeneralInfo/CountryCodeDropdownDe'
describe('CountryCodeDropdownDe', () => {
  it('Displays default value', () => {
    const { getByText } = render(CountryCodeDropdownDe, {
      propsData: {
        value: '+52',
      },
    })
    getByText('México')
  })
  xit('Open menu options on click', () => {
    const { getByText, fireEvent } = render(CountryCodeDropdownDe, {
      propsData: {
        value: '+52',
      },
    })
    fireEvent.click(getByText('México'))
    getByText('United States')
  })
  xit('Open menu options on enter', () => {
    const { getByText, fireEvent } = render(CountryCodeDropdownDe, {
      propsData: {
        value: '+52',
      },
    })
    fireEvent.focus(getByText('México'))
    fireEvent.keyDown(getByText('México'), { key: 'Enter', code: 13 })
    getByText('United States')
  })
  xit('Emits input event when a selection is clicked', () => {
    const { getByText, fireEvent, wrapper } = render(CountryCodeDropdownDe, {
      propsData: {
        value: '+52',
      },
    })
    fireEvent.click(getByText('México'))
    fireEvent.click(getByText('United States'))
    expect(wrapper.emitted().input[0]).toEqual(['+1'])
  })
  xit('Emits input event on keyUp Enter selection', async () => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
    const { getByText, getAllByText, fireEvent, wrapper } = render(
      CountryCodeDropdownDe,
      {
        propsData: {
          value: '+52',
        },
        methods: {
          blur() {
            fireEvent.blur(wrapper.vm.$el)
          },
        },
      }
    )
    fireEvent.click(getByText('México'))
    fireEvent.keyDown(getAllByText('México')[0], { key: 'ArrowDown', code: 40 })
    fireEvent.keyDown(getAllByText('México')[0], { key: 'Enter', code: 13 })
    expect(wrapper.emitted().input[0]).toEqual(['+1'])
  })
})
