import GxAddressGoogleMaps from './GxAddressGoogleMaps'
jest.mock('../../../utils/google-maps.js')

describe('@components/Forms/GxAddressGoogleMaps', () => {
  it('exports a valid component', () => {
    expect(GxAddressGoogleMaps).toBeAComponent()
  })
})
