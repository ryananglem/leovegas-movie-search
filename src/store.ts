import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { searchReducer, SearchState } from './search/search.redux'

export const store = createStore(
  combineReducers({
    search: searchReducer
  }),
  {},
  composeWithDevTools(applyMiddleware(thunk))
)

export interface State {
  search: SearchState
}