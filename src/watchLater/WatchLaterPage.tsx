import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { State } from '../store'
import { Loading } from '../page/Loading'
import { ListContainer } from '../movieList/List'
import { getWatchLaterList } from './watchLater.redux'
import { device } from '../styles/device'

interface StateProps {
    isLoading: boolean
    movieList?: any[]
}
interface DispatchProps {
    getWatchLaterList: () => void
}

const WatchLaterPageContainer = styled.div`
  width: 100%;

  @media ${device.tablet} {
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
  }
`
interface Props extends DispatchProps, StateProps {}

export const WatchLaterPage = ({isLoading, movieList, getWatchLaterList}: Props) => {
    
    useEffect(()=> {
        getWatchLaterList()
    }, [getWatchLaterList])

    if ( isLoading ) return  <Loading />
    return movieList ? (
        <WatchLaterPageContainer>
        <h2>Movies I want to watch later</h2>     
          {/* 
        // @ts-ignore */}   
        <ListContainer movieList={movieList} />
        </WatchLaterPageContainer>
) : null
}
const mapStateToProps = (state: State): StateProps => ({
    isLoading: state.watchLater.isLoading,
    movieList: state.watchLater.data
  })
  const mapDispatchToProps = (dispatch: any): DispatchProps => ({
    getWatchLaterList: () => dispatch(getWatchLaterList())
  })
  
export const WatchLaterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(WatchLaterPage)
  