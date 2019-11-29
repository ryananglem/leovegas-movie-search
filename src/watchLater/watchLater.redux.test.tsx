
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from './watchLater.redux'
import fetchMock from 'fetch-mock'
import { apiUrl } from '../api'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe.skip('watch later actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('creates actions for successful set watch later', () => {
    const id = '1'
    const watchLater = true
    const session = '123'
    const account = {
        id: 1
    }

    fetchMock.get(apiUrl('account', `session_id=${session}`), {
        body: { images: { secure_base_url: 'url' }}
    })

    fetchMock.get(apiUrl(`account/${account.id}/watchlist`, `session_id=${session}`), {
        body: { data: ['some data'] },
        headers: { 'content-type': 'application/json' }
      })
   
    const expectedActions = [
      { type: actions.ActionType.SET_WATCH_LATER_REQUEST, id: '1', watchLater: true },
      { type: actions.ActionType.SET_WATCH_LATER_RECEIVE }
    ]
    const store = mockStore({ data: [] })

    return store.dispatch(actions.setWatchLater(id, watchLater)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates actions for unsuccessful set watch later', () => {
    const id = '1'
    const watchLater = true
      
    const expectedActions = [
      { type: actions.ActionType.SET_WATCH_LATER_REQUEST, id: '1', watchLater: true  },
      { type: actions.ActionType.SET_WATCH_LATER_ERROR}
    ]
    const store = mockStore({ data: [] })

    return store.dispatch(actions.setWatchLater(id, watchLater)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})



