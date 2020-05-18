import SignupSolvingMainProblem from './SignupSolvingMainProblem'

describe('@components/SignupSolvingMainProblem', () => {
  it('exports a valid component', () => {
    expect(SignupSolvingMainProblem).toBeAComponent()
  })
  it('shows a textArea wich accepts an input', () => {
    const { getByLabelText } = render(SignupSolvingMainProblem, {
      stubs: ['Portal'],
    })
    expect(getByLabelText('mainProblem')).toBeTruthy()
  })
})
