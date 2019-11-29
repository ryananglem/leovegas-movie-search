
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './watchLater.redux'
import fetchMock from 'fetch-mock'
import { apiUrl } from '../api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('search actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates actions for successful movie search', () => {
    const id = '1'
    const watchLater = true
    const expectedActions = [
      { type: actions.ActionType.SET_WATCH_LATER_REQUEST, id: '1', watchLater: true },
      { type: actions.ActionType.SET_WATCH_LATER_RECEIVE }
    ]
    const store = mockStore({ data: [] })

    return store.dispatch(actions.setWatchLater(id, watchLater)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it.skip('creates actions for unsuccessful movie search', () => {
    const id = '1'
    const watchLater = true
      
    const expectedActions = [
      { type: actions.ActionType.SET_WATCH_LATER_REQUEST, searchTerm: 'movie' },
      { type: actions.ActionType.SET_WATCH_LATER_ERROR}
    ]
    const store = mockStore({ data: [] })

    return store.dispatch(actions.setWatchLater(id, watchLater)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})



