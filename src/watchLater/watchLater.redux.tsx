import { State } from "../store"
import { apiUrl } from "../api"

 export type ThunkAction<Props> = (
    props: Props,
  ) => (dispatch: (action:any) => void, getState: () => State) => Promise<void> | void
  
  interface Error {
    name: string;
    message: string;
    stack?: string;
}

export interface SearchState {
  searchTerm: string
  isSearching: boolean
  data?: any
  hasError: boolean
}

const initialState: SearchState = {
    searchTerm: '',
    isSearching: false,
    hasError: false
}

export enum ActionType {
  SET_WATCH_LATER_REQUEST = 'SET_WATCH_LATER_REQUEST',
  SET_WATCH_LATER_RECEIVE = 'SET_WATCH_LATER_RECEIVE',
  SET_WATCH_LATER_ERROR = 'SET_WATCH_LATER_ERROR',
}

interface ActionCreator {
  type: ActionType
  error?: Error
  id?: string
  watchLater?: boolean
}

export const requestSetWatchLater = (id:string, watchLater: boolean): ActionCreator => ({
  type: ActionType.SET_WATCH_LATER_REQUEST,
  id,
  watchLater
})

export const receiveSetWatchLater = (): ActionCreator => ({
  type: ActionType.SET_WATCH_LATER_RECEIVE
})

export const setWatchLaterError = (): ActionCreator => ({
  type: ActionType.SET_WATCH_LATER_ERROR
})


export const setWatchLater: any = (id: string, watchLater: boolean) => async (dispatch: any): Promise<void> => {
  try {
    dispatch(requestSetWatchLater(id, watchLater))
    
    

    /*
        // account/{account_id}/watchlist

    */
    dispatch(receiveSetWatchLater())
    
  } catch (err) {
    dispatch(setWatchLaterError())
  }
}

export const getWatchLaterList = () => {

    // account/{account_id}/watchlist/movies
}


export const searchReducer = (
  state = initialState,
  action: any,
): SearchState => {
  switch (action.type) {
    case ActionType.SET_WATCH_LATER_REQUEST:
      return {
        ...state,
        searchTerm: action.searchTerm,
        isSearching: true,
        hasError: false
      }
    case ActionType.SET_WATCH_LATER_RECEIVE:
      return {
        ...state,
        data: action.data,
        isSearching: false,
      }
    case ActionType.SET_WATCH_LATER_ERROR:
      return {
        ...state,
        isSearching: false,
        hasError: true
      }
    default:
      return state
  }
}

