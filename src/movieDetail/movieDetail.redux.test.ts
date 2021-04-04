import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as movieDetail from './movieDetail.redux'
import fetchMock from 'fetch-mock'
import { apiUrl } from '../api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('getMovie', () => {
  describe('actions', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('creates actions for retrieving movie successfully', () => {
      const id = '1'
      fetchMock.get(apiUrl(`movie/${id}`, ''), {
        body: { data: ['some data'] },
        headers: { 'content-type': 'application/json' },
      })
      fetchMock.get(apiUrl('configuration', ''), {
        body: { images: { secure_base_url: 'url' } },
      })
      const expectedActions = [
        { type: movieDetail.ActionType.MOVIE_DETAILS_REQUEST, id: '1' },
        {
          type: movieDetail.ActionType.MOVIES_DETAILS_RECEIVE,
          data: {
            data: ['some data'],
            fullPosterFilePath: 'url/original/undefined',
          },
        },
      ]
      const store = mockStore({ data: [] })

      return store.dispatch(movieDetail.getMovie(id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('creates actions for retrieving movie unsuccessfully', () => {
      const id = '1'
      fetchMock.mock(apiUrl(`movie/${id}`, ''), {
        throws: new Error('bad request'),
      })

      const expectedActions = [
        { type: movieDetail.ActionType.MOVIE_DETAILS_REQUEST, id: '1' },
        { type: movieDetail.ActionType.MOVIES_DETAILS_ERROR },
      ]
      const store = mockStore({ data: [] })

      return store.dispatch(movieDetail.getMovie(id)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
  describe('selectors', () => {
    it('should return the current movie', () => {
      const state = {
        currentMovie: {
          data: {
            id: '1',
            title: 'test movie',
          },
        },
      }
      //@ts-ignore
      const result = movieDetail.movieSelector(state)
      expect(result).toEqual({
        id: '1',
        title: 'test movie',
      })
    })
    it('should return the loading state', () => {
      const state = {
        currentMovie: {
          isLoading: true,
        },
      }
      //@ts-ignore
      const result = movieDetail.movieLoadingSelector(state)
      expect(result).toEqual(true)
    })
  })
})
