import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { searchReducer, SearchState } from './search/search.redux'
import { currentMovieReducer, CurrentMovieState} from './movieDetail/movieDetail.redux'
import { authorisationReducer, AuthorisationState } from './authorisation/authorisation.redux'

export const store = createStore(
  combineReducers({
    search: searchReducer,
    currentMovie: currentMovieReducer,
    authorisation: authorisationReducer
  }),
  {},
  composeWithDevTools(applyMiddleware(thunk))
)

export interface State {
  search: SearchState,
  currentMovie: CurrentMovieState,
  authorisation: AuthorisationState
}