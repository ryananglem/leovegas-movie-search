import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './watchLater.redux'
import fetchMock from 'fetch-mock'
import { apiUrl } from '../api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockState = {
  authorisation: {
    id: '123',
    account: {
      id: 1,
    },
  },
}

describe('watch later', () => {
  describe('actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates actions for successful set watch later', () => {
      const reduxStore = mockStore(mockState)
      const id = '1'
      const watchLater = true
      // @ts-ignore
      const session = {
        id: '123',
        account: {
          id: 1,
        },
      }
      fetchMock.post(
        apiUrl(
          `account/${session.account.id}/watchlist`,
          `session_id=${session.id}`
        ),
        {
          body: { status_code: 1 },
          headers: { 'content-type': 'application/json' },
        }
      )

      const expectedActions = [
        {
          type: actions.ActionType.SET_WATCH_LATER_REQUEST,
          id: '1',
          watchLater: true,
        },
        { type: actions.ActionType.SET_WATCH_LATER_RECEIVE },
      ]

      return reduxStore
        .dispatch(actions.setWatchLater(id, watchLater))
        .then(() => {
          expect(reduxStore.getActions()).toEqual(expectedActions)
        })
    })

    it('creates actions for unsuccessful set watch later', () => {
      const store = mockStore(mockState)

      const id = '1'
      const watchLater = true
      const session = {
        id: '123',
        account: {
          id: 1,
        },
      }
      fetchMock.post(
        apiUrl(
          `account/${session.account.id}/watchlist`,
          `session_id=${session.id}`
        ),
        {
          throws: new Error('bad request'),
        }
      )
      const expectedActions = [
        {
          type: actions.ActionType.SET_WATCH_LATER_REQUEST,
          id: '1',
          watchLater: true,
        },
        { type: actions.ActionType.SET_WATCH_LATER_ERROR },
      ]

      return store.dispatch(actions.setWatchLater(id, watchLater)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
  describe('selectors', () => {
    it('should return the watch later list', () => {
      const state = {
        watchLater: {
          data: [
            {
              id: '1',
              watchLater: true,
            },
          ],
        },
      }
      //@ts-ignore
      const result = actions.watchLaterListSelector(state)
      expect(result).toEqual([
        {
          id: '1',
          watchLater: true,
        },
      ])
    })
    it('should return the loading state', () => {
      const state = {
        watchLater: {
          isLoading: true,
        },
      }
      //@ts-ignore
      const result = actions.watchLaterLoadingSelector(state)
      expect(result).toEqual(true)
    })
  })
})
