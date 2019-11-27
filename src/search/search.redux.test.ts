
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './search.redux'
import fetchMock from 'fetch-mock'
import { apiUrl } from '../api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('search actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates actions for successful movie search', () => {
    const searchTerm = 'movie'
    fetchMock.getOnce(apiUrl('search/movie', `query=${searchTerm}`), {
      body: { data: ['some data'] },
      headers: { 'content-type': 'application/json' }
    })

    const expectedActions = [
      { type: actions.ActionType.MOVIES_SEARCH_REQUEST, searchTerm: 'movie' },
      { type: actions.ActionType.MOVIES_SEARCH_RECEIVE, data: { data: ['some data'] } }
    ]
    const store = mockStore({ data: [] })

    return store.dispatch(actions.searchForMovies(searchTerm)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  
  it('creates actions for unsuccessful movie search', () => {
    const searchTerm = 'movie'
    fetchMock.mock(apiUrl('search/movie', `query=${searchTerm}`), {
        throws: new Error('bad request') 
    })
    
    const expectedActions = [
      { type: actions.ActionType.MOVIES_SEARCH_REQUEST, searchTerm: 'movie' },
      { type: actions.ActionType.MOVIES_SEARCH_ERROR}
    ]
    const store = mockStore({ data: [] })

    return store.dispatch(actions.searchForMovies(searchTerm)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

})



