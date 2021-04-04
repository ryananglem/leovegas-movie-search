import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock-jest'

import { apiUrl } from '../api'
import {
  deniedAuthSelector,
  authIdSelector,
  getSessionId,
  requestSession,
  receiveSession,
  ActionType,
} from './authorisation.redux'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockState = {}

describe('authorisation', () => {
  describe('getSessionId', () => {
    it('should get a session id', () => {
      const reduxStore = mockStore(mockState)
      fetchMock.mock('*', { success: 'true', session_id: '111' })

      const expectedActions = [
        {
          requestToken: '111',
          type: ActionType.SESSION_ID_REQUEST,
        },
        {
          type: ActionType.SESSION_ID_RECEIVE,
          session: {
            account: {
              session_id: '111',
              success: 'true',
            },
            id: '111',
          },
        },
      ]
      return reduxStore.dispatch(getSessionId('111')).then(() => {
        expect(reduxStore.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('reducer', () => {})

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
