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

export interface WatchLaterState {
  isLoading: boolean
  isSaving: boolean
  data?: any
  hasError: boolean
}

const initialState: WatchLaterState = {
    isLoading: false,
    isSaving: false,
    hasError: false
}

export enum ActionType {
  SET_WATCH_LATER_REQUEST = 'SET_WATCH_LATER_REQUEST',
  SET_WATCH_LATER_RECEIVE = 'SET_WATCH_LATER_RECEIVE',
  SET_WATCH_LATER_ERROR = 'SET_WATCH_LATER_ERROR',
  GET_WATCH_LATER_REQUEST = 'GET_WATCH_LATER_REQUEST',
  GET_WATCH_LATER_RECEIVE = 'GET_WATCH_LATER_RECEIVE',
  GET_WATCH_LATER_ERROR = 'GET_WATCH_LATER_ERROR',
}

interface ActionCreator {
  type: ActionType
  error?: Error
  id?: string
  watchLater?: boolean
  data?: any
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

export const requestGetWatchLaterList = (): ActionCreator => ({
    type: ActionType.GET_WATCH_LATER_REQUEST,
  })
  
export const receiveGetWatchLaterList = (data: any): ActionCreator => ({
type: ActionType.GET_WATCH_LATER_RECEIVE,
data
})

export const getWatchLaterListError = (): ActionCreator => ({
type: ActionType.GET_WATCH_LATER_ERROR
})

export const setWatchLater: any = (id: string, watchLater: boolean) => async (dispatch: any, getState: any): Promise<void> => {
    try {
        dispatch(requestSetWatchLater(id, watchLater))
        
        const session = getState().authorisation.id
        const account = await getAccount(session)

        const requestData = {
            "media_type": "movie",
            "media_id": Number(id),
            "watchlist": watchLater
          }
        // @ts-ignore
        const watchLaterResponse = await fetch(apiUrl(`account/${account.id}/watchlist`, `session_id=${session}`), {
            method: 'POST',
            mode: 'cors', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrer: 'no-referrer', 
            body: JSON.stringify(requestData) 
        })
        const setWatchLater = await watchLaterResponse.json()
        if (setWatchLater.status_code === 1) {
            dispatch(receiveSetWatchLater())
        } else {
            dispatch(setWatchLaterError())
        }
    } catch (err) {
        dispatch(setWatchLaterError())
    }    
}

const getAccount = async (session: string) => {
    const accountResponse = await fetch(apiUrl('account', `session_id=${session}`))
    const account = await accountResponse.json()
    return account
}

export const getWatchLaterList = () => async (dispatch: any, getState: any): Promise<void> => {
    try {
        dispatch(requestGetWatchLaterList())
        const session = getState().authorisation.id
        const account = await getAccount(session)
        // @ts-ignore
        const watchLaterResponse = await fetch(apiUrl(`account/${account.id}/watchlist/movies`, `session_id=${session}`))
        const watchLaterList = await watchLaterResponse.json()
        
        dispatch(receiveGetWatchLaterList(watchLaterList.results))
        
    } catch (err) {
        dispatch(getWatchLaterListError())
    }    
}


export const watchLaterReducer = (
  state = initialState,
  action: any,
): WatchLaterState => {
  switch (action.type) {
    case ActionType.SET_WATCH_LATER_REQUEST:
      return {
        ...state,
        isSaving: true,
        hasError: false
      }
    case ActionType.SET_WATCH_LATER_RECEIVE:
      return {
        ...state,
        isSaving: false,
      }
    case ActionType.SET_WATCH_LATER_ERROR:
      return {
        ...state,
        isSaving: false,
        hasError: true
      }
      case ActionType.GET_WATCH_LATER_REQUEST:
        return {
          ...state,
          isLoading: true,
          hasError: false
        }
      case ActionType.GET_WATCH_LATER_RECEIVE:
        return {
          ...state,
          data: action.data,
          isLoading: false,
        }
      case ActionType.GET_WATCH_LATER_ERROR:
        return {
          ...state,
          isLoading: false,
          hasError: true
        }
    default:
      return state
  }
}

