import InvoicePreview from './InvoicePreview'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/InvoicePreview', () => {
  it('exports a valid component', () => {
    expect(InvoicePreview).toBeAComponent()
  })
})
