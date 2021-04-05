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

export interface CurrentMovieState {
  id: string
  isLoading: boolean
  data?: any
  hasError: boolean
}

export const initialState: CurrentMovieState = {
  id: '',
  isLoading: false,
  hasError: false,
}

export enum ActionType {
  MOVIE_DETAILS_REQUEST = 'MOVIE_DETAILS_REQUEST',
  MOVIES_DETAILS_RECEIVE = 'MOVIES_DETAILS_RECEIVE',
  MOVIES_DETAILS_ERROR = 'MOVIES_DETAILS_ERROR',
}

interface ActionCreator {
  type: ActionType
  error?: Error
  id?: string
  data?: any
}

export const requestMovie = (id: string): ActionCreator => ({
  type: ActionType.MOVIE_DETAILS_REQUEST,
  id,
})

export const receiveMovie = (data: any): ActionCreator => ({
  type: ActionType.MOVIES_DETAILS_RECEIVE,
  data,
})

export const requestmovieError = (): ActionCreator => ({
  type: ActionType.MOVIES_DETAILS_ERROR,
})

export const getMovie: any = (id: string) => async (
  dispatch: any
): Promise<void> => {
  try {
    dispatch(requestMovie(id))

    const response = await fetch(apiUrl(`movie/${id}`, ''))
    const movieData = await response.json()

    const configurationResponse = await fetch(apiUrl('configuration', ''))
    const config = await configurationResponse.json()
    const posterFilePath = `${config.images.secure_base_url}/original/${movieData.poster_path}`

    movieData.fullPosterFilePath = posterFilePath

    dispatch(receiveMovie(movieData))
  } catch (err) {
    dispatch(requestmovieError())
  }
}

export const currentMovieReducer = (
  state = initialState,
  action: any
): CurrentMovieState => {
  switch (action.type) {
    case ActionType.MOVIE_DETAILS_REQUEST:
      return {
        ...state,
        id: action.id,
        isLoading: true,
        hasError: false,
      }
    case ActionType.MOVIES_DETAILS_RECEIVE:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      }
    case ActionType.MOVIES_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}

export const movieLoadingSelector = (state: State) =>
  state.currentMovie.isLoading

export const movieSelector = (state: State) => state.currentMovie.data
