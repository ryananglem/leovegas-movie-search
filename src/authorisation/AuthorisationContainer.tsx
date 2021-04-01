import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'query-string'
import { State } from '../store';
import { getSessionId } from './authorisation.redux';
import { Loading } from '../page/Loading';
import { getFavouritesList } from '../favourite/favourites.redux';

interface StateProps {
    session?: string
    location?: any
}
interface DispatchProps {
    getSessionId: (token: string) => void
    getFavouritesList: () => void
}

interface Props extends DispatchProps, StateProps {}

export const AuthorisationPage = ({ location, getSessionId, getFavouritesList, session }: Props) => {

    useEffect(() => {
        const authorise = async (token: string) => {
            await getSessionId(token)
            await getFavouritesList()
        }
        // @ts-ignore
        const query = qs.parse(location.search, { ignoreQueryPrefix: true })
        // @ts-ignore
        authorise(query.request_token)    
        
    },[getSessionId, location.search, getFavouritesList]
    )
    if (session) {
        return <Redirect to='/' />
    }
    return (<Loading />)
}

const mapStateToProps = (state: State): StateProps => ({
    session: state.authorisation.id
  })
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    getSessionId: (id: string) => dispatch(getSessionId(id)),
    getFavouritesList: () => dispatch(getFavouritesList())
})  
export const AuthorisationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthorisationPage)
  