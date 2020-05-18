import SignupDownloadXmlsForm from './SignupDownloadXmlsForm'
// You can use RouterLinkStub component to find a router-link component in the render tree.
// import { RouterLinkStub } from '@vue/test-utils'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/SignupDownloadXmlForm', () => {
  it('exports a valid component', () => {
    expect(SignupDownloadXmlsForm).toBeAComponent()
  })
})

describe('@components/SignupDownloadXmlForm Desktop', () => {
  let queries
  const $router = {
    push: jest.fn(),
  }
  const mqConfig = {
    breakpoints: {
      mo: 768,
      de: Infinity,
    },
    defaultBreakpoint: 'de',
  }
  beforeEach(() => {
    queries = render(SignupDownloadXmlsForm, {
      stubs: ['router-link'],
      mocks: {
        $router,
      },
      mqConfig,
    })
  })
  it('Shows an error if the user tries type an invalid taxId', async () => {
    const value = 'invalidTaxId'
    const errorMessage = 'Ups, RFC inválido'
    const { getByText, getByLabelText, fireEvent, wait } = queries
    const taxIdInput = getByLabelText('RFC*')
    fireEvent.input(taxIdInput, {
      target: {
        value,
      },
    })
    await wait(() => getByText(errorMessage))
  })
  it('Go to manual process when checkbox input is checked', async () => {
    const { getAllByLabelText, fireEvent, wait } = queries
    const taxIdInput = getAllByLabelText('Ingresar mi información manualmente.')
    fireEvent.input(taxIdInput[0], {
      target: {
        checked: true,
      },
    })
    await wait(() => expect($router.push).toHaveBeenCalledTimes(1))
  })
})
