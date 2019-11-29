import React, { useEffect } from 'react'
import styled from 'styled-components'

import {connect} from 'react-redux'
import { State } from '../store'
import { Loading } from '../page/Loading'
import { List } from '../movieList/List'
import { getWatchLaterList } from './watchLater.redux'

interface StateProps {
    isLoading: boolean
    movieList?: any[]
}
interface DispatchProps {
    getWatchLaterList: (id: string) => void
    
}

interface Props extends DispatchProps, StateProps {}


export const WatchLaterPage = ({isLoading, movieList}: Props) => {
    
    useEffect(()=> {
        getWatchLaterList()
    }, [getWatchLaterList])

    if ( isLoading ) return  <Loading />
    return movieList ? (
        <>
        <h2>Movies I want to watch later</h2>
        <List movieList={movieList} />
        </>
) : null
}
const mapStateToProps = (state: State) => ({
    isLoading: state.currentMovie.isLoading,
    movie: state.currentMovie.data
  })
  const mapDispatchToProps = (dispatch: any) => ({
    getWatchLaterList: () => dispatch(getWatchLaterList())
  })
  
export const WatchLaterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(WatchLaterPage)
  