import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as favs from './favourites.redux'
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

describe('favourites', () => {
  describe('set favourite actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates actions for successful set favourite', () => {
      const reduxStore = mockStore(mockState)
      const id = '1'
      const favourite = true
      // @ts-ignore
      const session = {
        id: '123',
        account: {
          id: 1,
        },
      }
      fetchMock.post(
        apiUrl(
          `account/${session.account.id}/favorite`,
          `session_id=${session.id}`
        ),
        {
          body: { status_code: 1 },
          headers: { 'content-type': 'application/json' },
        }
      )

      const expectedActions = [
        {
          type: favs.ActionType.SET_FAVOURITE_REQUEST,
          id: '1',
          favourite: true,
        },
        { type: favs.ActionType.SET_FAVOURITE_RECEIVE },
      ]

      return reduxStore.dispatch(favs.setFavourite(id, favourite)).then(() => {
        expect(reduxStore.getActions()).toEqual(expectedActions)
      })
    })

    it('creates actions for unsuccessful set watch later', () => {
      const store = mockStore(mockState)
      const id = '1'
      const favourite = true
      const session = {
        id: '123',
        account: {
          id: 1,
        },
      }
      fetchMock.post(
        apiUrl(
          `account/${session.account.id}/favorite`,
          `session_id=${session.id}`
        ),
        {
          throws: new Error('bad request'),
        }
      )
      const expectedActions = [
        {
          type: favs.ActionType.SET_FAVOURITE_REQUEST,
          id: '1',
          favourite: true,
        },
        { type: favs.ActionType.SET_FAVOURITE_ERROR },
      ]

      return store.dispatch(favs.setFavourite(id, favourite)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
  describe('selectors', () => {
    it('should return the favourites list', () => {
      const state = {
        favourites: {
          data: [
            {
              id: '1',
              favourite: true,
            },
          ],
        },
      }
      //@ts-ignore
      const result = favs.favouritesDataSelector(state)
      expect(result).toEqual([
        {
          id: '1',
          favourite: true,
        },
      ])
    })
    it('should return the loading state', () => {
      const state = {
        favourites: {
          isLoading: true,
        },
      }
      //@ts-ignore
      const result = favs.favouritesLoadingSelector(state)
      expect(result).toEqual(true)
    })
  })
})
