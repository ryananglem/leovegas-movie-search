import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import qs from 'query-string'
import {
  authIdSelector,
  deniedAuthSelector,
  getSessionId,
  setAuthDenied,
} from './authorisation.redux'
import { Loading } from '../page/Loading'
import { getFavouritesList } from '../favourites/favourites.redux'

interface StateProps {
  session?: string
  location?: any
}
interface DispatchProps {
  getSessionId: (token: string) => void
  getFavouritesList: () => void
}

interface Props extends DispatchProps, StateProps {}

export const AuthorisationPage = ({
  location,
  getSessionId,
  getFavouritesList,
}: Props) => {
  const dispatch = useDispatch()
  const authDenied = useSelector(deniedAuthSelector)
  const session = useSelector(authIdSelector)

  useEffect(() => {
    const authorise = async (token: string) => {
      await getSessionId(token)
      await getFavouritesList()
    }
    // @ts-ignore
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    // @ts-ignore
    if (query.denied && query.denied === 'true') {
      dispatch(setAuthDenied(true))
    }
    // @ts-ignore
    authorise(query.request_token)
  }, [getSessionId, location.search, getFavouritesList, dispatch])
  if (authDenied) return <Redirect to="/auth-failed" />
  if (session) {
    return <Redirect to="/" />
  }
  return <Loading />
}

const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  getSessionId: (id: string) => dispatch(getSessionId(id)),
  getFavouritesList: () => dispatch(getFavouritesList()),
})
export const AuthorisationContainer = connect(
  null,
  mapDispatchToProps
)(AuthorisationPage)
