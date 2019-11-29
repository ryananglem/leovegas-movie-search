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

export interface AuthorisationState {
  requestToken: string
  id?: string
  hasError: boolean
  isLoading?: boolean
}

const initialState: AuthorisationState = {
    requestToken: '',
    id: '',
    hasError: false,
    isLoading: false
}

export enum ActionType {
  SESSION_ID_REQUEST = 'SESSION_ID_REQUEST',
  SESSION_ID_RECEIVE = 'SESSION_ID_RECEIVE',
  SESSION_ID_ERROR = 'SESSION_ID_ERROR',
}

interface ActionCreator {
  type: ActionType
  error?: Error
  requestToken?: string
  isLoading?: boolean
  id?: any
}

export const requestSession = (requestToken:string): ActionCreator => ({
  type: ActionType.SESSION_ID_REQUEST,
  requestToken
})

export const receiveSession = (id:string): ActionCreator => ({
  type: ActionType.SESSION_ID_RECEIVE,
  id
})

export const sessionError = (): ActionCreator => ({
  type: ActionType.SESSION_ID_ERROR
})


export const getSessionId: any = (token: string) => async (dispatch: any): Promise<void> => {
  try {
    dispatch(requestSession(token))
    
    const requestData = {
        request_token: token
    }
    const response = await fetch(apiUrl('authentication/session/new', ''), {
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
    const result = await response.json()    
    if (result.success) {
        await localStorage.removeItem('refreshToken')
        dispatch(receiveSession(result.session_id))
    } else {
        dispatch(sessionError())

    }    
  } catch (err) {
    dispatch(sessionError())
  }
}

export const authorisationReducer = (
  state = initialState,
  action: any,
): AuthorisationState => {
  switch (action.type) {
    case ActionType.SESSION_ID_REQUEST:
      return {
        ...state,
        requestToken: action.requestToken,
        isLoading: true,
        hasError: false
      }
    case ActionType.SESSION_ID_RECEIVE:
      return {
        ...state,
        id: action.id,
        isLoading: false
      }
    case ActionType.SESSION_ID_ERROR:
      return {
        ...state,        
        hasError: true,
        isLoading: false
      }
    default:
      return state
  }
}

