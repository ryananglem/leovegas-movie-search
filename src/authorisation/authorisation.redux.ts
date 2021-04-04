import { State } from '../store'
import { apiUrl } from '../api'

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

export interface AuthorisationState {
  requestToken: string
  id?: string
  hasError: boolean
  isLoading?: boolean
  deniedAuth?: boolean
}

export const initialState: AuthorisationState = {
  requestToken: '',
  id: '',
  hasError: false,
  isLoading: false,
  deniedAuth: false,
}

export enum ActionType {
  SESSION_ID_REQUEST = 'SESSION_ID_REQUEST',
  SESSION_ID_RECEIVE = 'SESSION_ID_RECEIVE',
  SESSION_ID_ERROR = 'SESSION_ID_ERROR',
  AUTH_DENIED = 'AUTH_DENIED',
}

interface ActionCreator {
  type: ActionType
  error?: Error
  requestToken?: string
  isLoading?: boolean
  session?: any
}

export const requestSession = (requestToken: string): ActionCreator => ({
  type: ActionType.SESSION_ID_REQUEST,
  requestToken,
})

export const receiveSession = (session: any): ActionCreator => ({
  type: ActionType.SESSION_ID_RECEIVE,
  session,
})

export const sessionError = (): ActionCreator => ({
  type: ActionType.SESSION_ID_ERROR,
})

export const setAuthDenied = (deniedAuth: boolean) => ({
  type: ActionType.AUTH_DENIED,
  deniedAuth,
})

const getAccount = async (session: string) => {
  const accountResponse = await fetch(
    apiUrl('account', `session_id=${session}`)
  )
  const account = await accountResponse.json()
  return account
}

export const getSessionId: any = (token: string) => async (
  dispatch: any
): Promise<void> => {
  try {
    dispatch(requestSession(token))

    const requestData = {
      request_token: token,
    }
    const response = await fetch(apiUrl('authentication/session/new', ''), {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify(requestData),
    })
    const result = await response.json()
    if (result.success) {
      localStorage.removeItem('refreshToken')
      const id = result.session_id
      const account = await getAccount(id)

      const session = { id, account }
      dispatch(receiveSession(session))
    } else {
      dispatch(sessionError())
    }
  } catch (err) {
    dispatch(sessionError())
  }
}

export const authorisationReducer = (
  state = initialState,
  action: any
): AuthorisationState => {
  switch (action.type) {
    case ActionType.SESSION_ID_REQUEST:
      return {
        ...state,
        requestToken: action.requestToken,
        isLoading: true,
        hasError: false,
      }
    case ActionType.SESSION_ID_RECEIVE:
      return {
        ...state,
        ...action.session,
        isLoading: false,
      }
    case ActionType.SESSION_ID_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
      }
    case ActionType.AUTH_DENIED:
      return {
        ...state,
        deniedAuth: action,
      }
    default:
      return state
  }
}

export const deniedAuthSelector = (state: State) =>
  state.authorisation.deniedAuth
export const authIdSelector = (state: State) => state.authorisation.id
