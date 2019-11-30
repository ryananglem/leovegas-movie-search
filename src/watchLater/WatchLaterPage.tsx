import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { State } from '../store'
import { Loading } from '../page/Loading'
import { ListContainer } from '../movieList/List'
import { getWatchLaterList } from './watchLater.redux'

interface StateProps {
    isLoading: boolean
    movieList?: any[]
}
interface DispatchProps {
    getWatchLaterList: () => void
}

interface Props extends DispatchProps, StateProps {}

export const WatchLaterPage = ({isLoading, movieList, getWatchLaterList}: Props) => {
    
    useEffect(()=> {
        getWatchLaterList()
    }, [getWatchLaterList])

    if ( isLoading ) return  <Loading />
    return movieList ? (
        <>
        <h2>Movies I want to watch later</h2>     
          {/* 
        // @ts-ignore */}   
        <ListContainer movieList={movieList} />
        </>
) : null
}
const mapStateToProps = (state: State) => ({
    isLoading: state.watchLater.isLoading,
    movieList: state.watchLater.data
  })
  const mapDispatchToProps = (dispatch: any) => ({
    getWatchLaterList: () => dispatch(getWatchLaterList())
  })
  
export const WatchLaterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(WatchLaterPage)
  