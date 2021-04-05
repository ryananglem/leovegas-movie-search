import { State } from '../store'
import { fetchMovieData } from '../api'

export type ThunkAction<Props> = (
  props: Props
) => (
  dispatch: (action: any) => void,
  getState: () => State
) => Promise<void> | void

interface Error {
  name: string
  message: string
  stack?: string
}

export interface SearchState {
  searchTerm: string
  isSearching: boolean
  data?: any
  hasError: boolean
}

export const initialState: SearchState = {
  searchTerm: '',
  isSearching: false,
  hasError: false,
}

export enum ActionType {
  MOVIES_SEARCH_REQUEST = 'MOVIES_SEARCH_REQUEST',
  MOVIES_SEARCH_RECEIVE = 'MOVIES_SEARCH_RECEIVE',
  MOVIES_SEARCH_ERROR = 'MOVIES_SEARCH_ERROR',
}

interface ActionCreator {
  type: ActionType
  error?: Error
  searchTerm?: string
  data?: any
}

export const requestMovieSearch = (searchTerm: string): ActionCreator => ({
  type: ActionType.MOVIES_SEARCH_REQUEST,
  searchTerm,
})

export const receiveMovieSearch = (data: any): ActionCreator => ({
  type: ActionType.MOVIES_SEARCH_RECEIVE,
  data,
})

export const movieSearchError = (): ActionCreator => ({
  type: ActionType.MOVIES_SEARCH_ERROR,
})

export const searchForMovies: any = (searchTerm: string) => async (
  dispatch: any
): Promise<void> => {
  try {
    dispatch(requestMovieSearch(searchTerm))

    const response = await fetchMovieData(searchTerm)
    const movieData = await response.json()

    dispatch(receiveMovieSearch(movieData))
  } catch (err) {
    dispatch(movieSearchError())
  }
}

export const searchReducer = (
  state = initialState,
  action: any
): SearchState => {
  switch (action.type) {
    case ActionType.MOVIES_SEARCH_REQUEST:
      return {
        ...state,
        searchTerm: action.searchTerm,
        isSearching: true,
        hasError: false,
      }
    case ActionType.MOVIES_SEARCH_RECEIVE:
      return {
        ...state,
        data: action.data,
        isSearching: false,
      }
    case ActionType.MOVIES_SEARCH_ERROR:
      return {
        ...state,
        isSearching: false,
        hasError: true,
      }
    default:
      return state
  }
}
export const searchLoadingSelector = (state: State) => state.search.isSearching
export const searchTermSelector = (state: State) => state.search.searchTerm
export const searchResultsSelector = (state: State) =>
  state.search.data && state.search.data.results
