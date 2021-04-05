import { State } from '../store'
import { apiUrl } from '../api'
import { Favourite } from '../favourites/Favourite'

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

interface SetFavourite {
  id: string
  favourite: boolean
}

export interface FavouritesState {
  isLoading: boolean
  isSaving: boolean
  data?: any
  hasError: boolean
  setFavourite?: SetFavourite
}

export const initialState: FavouritesState = {
  isLoading: false,
  isSaving: false,
  hasError: false,
}

export enum ActionType {
  SET_FAVOURITE_REQUEST = 'SET_FAVOURITE_REQUEST',
  SET_FAVOURITE_RECEIVE = 'SET_FAVOURITE_RECEIVE',
  SET_FAVOURITE_ERROR = 'SET_FAVOURITE_ERROR',
  GET_FAVOURITE_REQUEST = 'GET_FAVOURITE_REQUEST',
  GET_FAVOURITE_RECEIVE = 'GET_FAVOURITE_RECEIVE',
  GET_FAVOURITE_ERROR = 'GET_FAVOURITE_ERROR',
}

interface ActionCreator {
  type: ActionType
  error?: Error
  id?: string
  favourite?: boolean
  data?: any
}

export const requestSetFavourite = (
  id: string,
  favourite: boolean
): ActionCreator => ({
  type: ActionType.SET_FAVOURITE_REQUEST,
  id,
  favourite,
})

export const receiveSetFavourite = (): ActionCreator => ({
  type: ActionType.SET_FAVOURITE_RECEIVE,
})

export const setFavouriteError = (): ActionCreator => ({
  type: ActionType.SET_FAVOURITE_ERROR,
})

export const requestGetFavouritesList = (): ActionCreator => ({
  type: ActionType.GET_FAVOURITE_REQUEST,
})

export const receiveGetFavouritesList = (data: any): ActionCreator => ({
  type: ActionType.GET_FAVOURITE_RECEIVE,
  data,
})

export const getFavouritesListError = (): ActionCreator => ({
  type: ActionType.GET_FAVOURITE_ERROR,
})

export const setFavourite: any = (id: string, favourite: boolean) => async (
  dispatch: any,
  getState: any
): Promise<void> => {
  try {
    dispatch(requestSetFavourite(id, favourite))

    const session = getState().authorisation
    const requestData = {
      media_type: 'movie',
      media_id: Number(id),
      favorite: favourite,
    }
    // @ts-ignore
    const setFavouriteResponse = await fetch(
      apiUrl(
        `account/${session.account.id}/favorite`,
        `session_id=${session.id}`
      ),
      {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(requestData),
      }
    )
    const setFavourite = await setFavouriteResponse.json()
    if (setFavourite.status_code === 1 || setFavourite.status_code === 13) {
      dispatch(receiveSetFavourite())
    } else {
      dispatch(setFavouriteError())
    }
  } catch (err) {
    dispatch(setFavouriteError())
  }
}

export const getFavouritesList = () => async (
  dispatch: any,
  getState: any
): Promise<void> => {
  try {
    dispatch(requestGetFavouritesList())
    const session = getState().authorisation

    // @ts-ignore
    const favouritesResponse = await fetch(
      apiUrl(
        `account/${session.account.id}/favorite/movies`,
        `session_id=${session.id}`
      )
    )
    const favouritesList = await favouritesResponse.json()

    dispatch(receiveGetFavouritesList(favouritesList.results))
  } catch (err) {
    console.log(err)
    dispatch(getFavouritesListError())
  }
}

export const favouritesReducer = (
  state = initialState,
  action: any
): FavouritesState => {
  switch (action.type) {
    case ActionType.SET_FAVOURITE_REQUEST:
      return {
        ...state,
        setFavourite: { id: action.id, favourite: action.favourite },
        isSaving: true,
        hasError: false,
      }
    case ActionType.SET_FAVOURITE_RECEIVE:
      const data =
        state.setFavourite && state.setFavourite.favourite
          ? [...state.data, { id: state.setFavourite.id }]
          : state.data.filter(
              (fav: Favourite) => fav.id !== state.setFavourite!.id
            )
      return {
        ...state,
        isSaving: false,
        data,
      }
    case ActionType.SET_FAVOURITE_ERROR:
      return {
        ...state,
        isSaving: false,
        hasError: true,
      }
    case ActionType.GET_FAVOURITE_REQUEST:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      }
    case ActionType.GET_FAVOURITE_RECEIVE:
      return {
        ...state,
        data: action.data,
        isLoading: false,
      }
    case ActionType.GET_FAVOURITE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      }
    default:
      return state
  }
}

export const favouritesLoadingSelector = (state: State) =>
  state.favourites.isLoading
export const favouritesDataSelector = (state: State) => state.favourites.data
