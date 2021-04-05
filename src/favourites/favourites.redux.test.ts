import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as favs from './favourites.redux'
import fetchMock from 'fetch-mock'
import { apiUrl } from '../api'
import { initialState } from '../authorisation/authorisation.redux'

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
  describe('get favourites list action creator', () => {
    afterEach(() => {
      fetchMock.restore()
    })
    it('should get list of favourites', () => {
      const reduxStore = mockStore(mockState)
      fetchMock.mock('*', [{ id: '1' }])
      const expectedActions = [
        {
          type: favs.ActionType.GET_FAVOURITE_REQUEST,
        },
        { type: favs.ActionType.GET_FAVOURITE_RECEIVE },
      ]
      // @ts-ignore
      return reduxStore.dispatch(favs.getFavouritesList()).then(() => {
        expect(reduxStore.getActions()).toEqual(expectedActions)
      })
    })
    it('should handle error getting list of favourites', () => {
      const reduxStore = mockStore(mockState)
      fetchMock.mock('*', 500)
      const expectedActions = [
        {
          type: favs.ActionType.GET_FAVOURITE_REQUEST,
        },
        { type: favs.ActionType.GET_FAVOURITE_ERROR },
      ]
      // @ts-ignore
      return reduxStore.dispatch(favs.getFavouritesList()).then(() => {
        expect(reduxStore.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('set favourite action creator', () => {
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
  describe('reducer', () => {
    it('should request set favourite', () => {
      const result = favs.favouritesReducer(
        favs.initialState,
        favs.requestSetFavourite('1', true)
      )
      expect(result).toEqual({
        hasError: false,
        isLoading: false,
        isSaving: true,
        setFavourite: {
          favourite: true,
          id: '1',
        },
      })
    })
    it('should receive set favourite for favourite item', () => {
      const state = {
        setFavourite: {
          id: '1',
          favourite: true,
        },
        data: [{ id: '1' }],
      }
      const result = favs.favouritesReducer(
        // @ts-ignore
        state,
        favs.receiveSetFavourite()
      )
      expect(result).toEqual({
        data: [
          {
            id: '1',
          },
          {
            id: '1',
          },
        ],
        isSaving: false,
        setFavourite: {
          favourite: true,
          id: '1',
        },
      })
    })
    it('should receive set favourite for unfavourited item', () => {
      const state = {
        setFavourite: {
          id: '1',
          favourite: false,
        },
        data: [{ id: '1' }],
      }
      const result = favs.favouritesReducer(
        // @ts-ignore
        state,
        favs.receiveSetFavourite()
      )
      expect(result).toEqual({
        data: [],
        isSaving: false,
        setFavourite: {
          favourite: false,
          id: '1',
        },
      })
    })
    it('should handle set favourite error', () => {
      const result = favs.favouritesReducer(
        // @ts-ignore
        initialState,
        favs.setFavouriteError()
      )
      expect(result).toEqual({
        deniedAuth: false,
        hasError: true,
        id: '',
        isLoading: false,
        isSaving: false,
        requestToken: '',
      })
    })
    it('should request get favourites list', () => {
      const result = favs.favouritesReducer(
        // @ts-ignore
        initialState,
        favs.requestGetFavouritesList()
      )
      expect(result).toEqual({
        deniedAuth: false,
        hasError: false,
        id: '',
        isLoading: true,
        requestToken: '',
      })
    })
    it('should receive get favourites list', () => {
      const list = [{ list: 'item' }]
      const result = favs.favouritesReducer(
        // @ts-ignore
        initialState,
        favs.receiveGetFavouritesList(list)
      )
      expect(result).toEqual({
        data: [{ list: 'item' }],
        deniedAuth: false,
        hasError: false,
        id: '',
        isLoading: false,
        requestToken: '',
      })
    })
    it('should handle get favourites error', () => {
      const result = favs.favouritesReducer(
        // @ts-ignore
        initialState,
        favs.getFavouritesListError()
      )
      expect(result).toEqual({
        deniedAuth: false,
        hasError: true,
        id: '',
        isLoading: false,
        requestToken: '',
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
