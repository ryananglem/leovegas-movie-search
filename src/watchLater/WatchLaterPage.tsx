import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { State } from '../store'
import { Loading } from '../page/Loading'
import { ListContainer } from '../movieList/List'
import { getWatchLaterList } from './watchLater.redux'
import { device } from '../styles/device'

const WatchLaterPageContainer = styled.div`
  width: 100%;

  @media ${device.tablet} {
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
  }
`
export const WatchLaterPage = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: State) => state.watchLater.isLoading)
  const movieList = useSelector((state: State) => state.watchLater.data)

  useEffect(() => {
    const getWatchLater = () => dispatch(getWatchLaterList())
    getWatchLater()
  }, [dispatch])

  if (isLoading) return <Loading />
  return movieList ? (
    <WatchLaterPageContainer>
      <h2>Movies I want to watch later</h2>

      <ListContainer movieList={movieList} />
    </WatchLaterPageContainer>
  ) : null
}
