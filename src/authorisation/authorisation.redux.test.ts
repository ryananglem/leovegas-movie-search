import { deniedAuthSelector, authIdSelector } from './authorisation.redux'

describe('authorisation', () => {
  describe('selectors', () => {
    it('should return authDenied state', () => {
      const state = {
        authorisation: {
          deniedAuth: true,
        },
      }
      //@ts-ignore
      expect(deniedAuthSelector(state)).toEqual(true)
    })
    it('should return auth id', () => {
      const state = {
        authorisation: {
          id: '111',
        },
      }
      //@ts-ignore
      expect(authIdSelector(state)).toEqual('111')
    })
  })
})
