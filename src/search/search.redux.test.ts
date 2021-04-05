import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as search from './search.redux'
import fetchMock from 'fetch-mock'
import { apiUrl } from '../api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('search actions', () => {
  describe('actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates actions for successful movie search', () => {
      const searchTerm = 'movie'
      fetchMock.getOnce(apiUrl('search/movie', `query=${searchTerm}`), {
        body: { data: ['some data'] },
        headers: { 'content-type': 'application/json' },
      })

      const expectedActions = [
        { type: search.ActionType.MOVIES_SEARCH_REQUEST, searchTerm: 'movie' },
        {
          type: search.ActionType.MOVIES_SEARCH_RECEIVE,
          data: { data: ['some data'] },
        },
      ]
      const store = mockStore({ data: [] })

      return store.dispatch(search.searchForMovies(searchTerm)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates actions for unsuccessful movie search', () => {
      const searchTerm = 'movie'
      fetchMock.mock(apiUrl('search/movie', `query=${searchTerm}`), {
        throws: new Error('bad request'),
      })

      const expectedActions = [
        { type: search.ActionType.MOVIES_SEARCH_REQUEST, searchTerm: 'movie' },
        { type: search.ActionType.MOVIES_SEARCH_ERROR },
      ]
      const store = mockStore({ data: [] })

      return store.dispatch(search.searchForMovies(searchTerm)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
  describe('reducer', () => {
    it('should request a search', () => {
      const result = search.searchReducer(
        search.initialState,
        search.requestMovieSearch('movie')
      )
      expect(result).toEqual({
        hasError: false,
        isSearching: true,
        searchTerm: 'movie',
      })
    })
    it('should recieve search data', () => {
      const result = search.searchReducer(
        search.initialState,
        search.receiveMovieSearch([{ movie: 'data' }])
      )
      expect(result).toEqual({
        data: [
          {
            movie: 'data',
          },
        ],
        hasError: false,
        isSearching: false,
        searchTerm: '',
      })
    })

    it('should handle a search error', () => {
      const result = search.searchReducer(
        search.initialState,
        search.movieSearchError()
      )
      expect(result).toEqual({
        hasError: true,
        isSearching: false,
        searchTerm: '',
      })
    })
  })
  describe('selectors', () => {
    it('should return search loading', () => {
      const state = {
        search: { isSearching: true },
      }
      //@ts-ignore
      const result = search.searchLoadingSelector(state)
      expect(result).toEqual(true)
    })

    it('should return search term', () => {
      const state = {
        search: { searchTerm: 'movie' },
      }
      //@ts-ignore
      const result = search.searchTermSelector(state)
      expect(result).toEqual('movie')
    })
    it('should return search results', () => {
      const state = {
        search: { data: { results: [{ some: 'movies' }] } },
      }
      //@ts-ignore
      const result = search.searchResultsSelector(state)
      expect(result).toEqual([{ some: 'movies' }])
    })
  })
})
