import CreateNewClientForm from './CreateNewClientForm'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/CreateNewClientForm', () => {
  it('exports a valid component', () => {
    expect(CreateNewClientForm).toBeAComponent()
  })
  it('Asks for commercial name if empty at submit event', async () => {
    const $route = {
      params: {
        clientId: null,
      },
    }
    const { getByText, fireEvent, wait } = render(CreateNewClientForm, {
      mocks: {
        $route,
      },
      stubs: ['Portal'],
    })
    fireEvent.click(getByText('Guardar'))
    await wait(() => {
      expect(getByText('Este campo es necesario')).toBeTruthy()
    })
  })
  it('Calls create client mutation when submit', async () => {
    const $route = {
      params: {
        clientId: null,
        newSale: false,
      },
    }
    const redirectModal = jest.fn()
    const company = {
      number: '190217',
    }
    const mutate = jest.fn(() =>
      Promise.resolve({
        data: {
          clientCreate: {
            clientId: '7CAEF3E1-3477-4EB2-A8B2-F2E9BF082A57',
          },
        },
      })
    )
    const { getByText, fireEvent, wait, getByLabelText } = render(
      CreateNewClientForm,
      {
        mocks: {
          $route,
          company: company,
          commercialName: 'Nombre Comercial',
          $apollo: {
            mutate,
          },
        },
        stubs: ['Portal'],
        methods: {
          redirectModal,
        },
      }
    )
    getByLabelText('Nombre Comercial').value = 'Nombre Comercial'
    fireEvent.input(getByLabelText('Nombre Comercial'))
    fireEvent.click(getByText('Guardar'))
    await wait(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
      expect(getByText('Cliente creado')).toBeTruthy()
    })
    // expect(redirectModal).toHaveBeenCalledTimes(1)
  })
})
