import React, {useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import qs from 'query-string'
import { State } from '../store';
import { getSessionId } from './authorisation.redux';
import { Loading } from '../page/Loading';

interface StateProps {
    session?: string
    location: any
}
interface DispatchProps {
    getSessionId: (token: string) => void
}

interface Props extends DispatchProps, StateProps {}

export const AuthorisationPage = ({ location, getSessionId, session }: Props) => {

    useEffect(() => {
        const authorise = async (token: string) => {
            await getSessionId(token)
        }
        // @ts-ignore
        const query = qs.parse(location.search, { ignoreQueryPrefix: true })
        authorise(query.request_token)    
        
    },[getSessionId, location.search]
    )
    if (session) {
        return <Redirect to='/' />
    }
    return (<Loading />)
}

const mapStateToProps = (state: State) => ({
    session: state.authorisation.id
  })
const mapDispatchToProps = (dispatch: any) => ({
    getSessionId: (id: string) => dispatch(getSessionId(id))
})  
export const AuthorisationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthorisationPage)
  