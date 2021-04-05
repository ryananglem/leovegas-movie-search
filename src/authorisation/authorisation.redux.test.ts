import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock-jest'

import {
  deniedAuthSelector,
  authIdSelector,
  getSessionId,
  ActionType,
  authorisationReducer,
  initialState,
  requestSession,
  receiveSession,
  sessionError,
  setAuthDenied,
} from './authorisation.redux'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockState = {}

describe('authorisation', () => {
  describe('getSessionId', () => {
    afterEach(() => {
      fetchMock.reset()
    })
    it('should get a session id sucessfully', () => {
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
    it('should handle network error when trying to get a session id ', () => {
      const reduxStore = mockStore(mockState)
      fetchMock.mock('*', 401)

      const expectedActions = [
        {
          requestToken: '111',
          type: ActionType.SESSION_ID_REQUEST,
        },
        {
          type: ActionType.SESSION_ID_ERROR,
        },
      ]
      return reduxStore.dispatch(getSessionId('111')).then(() => {
        expect(reduxStore.getActions()).toEqual(expectedActions)
      })
    })
    it('should handle error when trying to get a session id ', () => {
      const reduxStore = mockStore(mockState)
      fetchMock.mock('*', { session_id: '' })

      const expectedActions = [
        {
          requestToken: '111',
          type: ActionType.SESSION_ID_REQUEST,
        },
        {
          type: ActionType.SESSION_ID_ERROR,
        },
      ]
      return reduxStore.dispatch(getSessionId('111')).then(() => {
        expect(reduxStore.getActions()).toEqual(expectedActions)
      })
    })
    describe('reducer', () => {
      it('should make a session is request', () => {
        const result = authorisationReducer(initialState, requestSession('111'))
        expect(result).toEqual({
          deniedAuth: false,
          hasError: false,
          id: '',
          isLoading: true,
          requestToken: '111',
        })
      })
      it('should receove a session id', () => {
        const result = authorisationReducer(initialState, receiveSession('111'))
        expect(result).toEqual({
          '0': '1',
          '1': '1',
          '2': '1',
          deniedAuth: false,
          hasError: false,
          id: '',
          isLoading: false,
          requestToken: '',
        })
      })
      it('should handle error getting a session id', () => {
        const result = authorisationReducer(initialState, sessionError())
        expect(result).toEqual({
          deniedAuth: false,
          hasError: true,
          id: '',
          isLoading: false,
          requestToken: '',
        })
      })
      it('should set authDenied value', () => {
        const result = authorisationReducer(initialState, setAuthDenied(true))
        expect(result).toEqual({
          deniedAuth: {
            deniedAuth: true,
            type: 'AUTH_DENIED',
          },
          hasError: false,
          id: '',
          isLoading: false,
          requestToken: '',
        })
      })
    })
  })

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
