import * as sum from '../app/sum'
jest.dontMock('../app/sum')

describe('sum', function() {
  it('adds numbers', function() {
    expect(sum(1,2)).toBe(3)
  })
})
