import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Loading } from '../page/Loading'
import { ListContainer } from '../movieList/List'
import {
  favouritesDataSelector,
  favouritesLoadingSelector,
  getFavouritesList,
} from './favourites.redux'
import { device } from '../styles/device'

const FavouritesContainer = styled.div`
  width: 100%;

  @media ${device.tablet} {
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
  }
`

export const FavouritesPage = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(favouritesLoadingSelector)
  const movieList = useSelector(favouritesDataSelector)

  useEffect(() => {
    const getFavourites = () => dispatch(getFavouritesList())
    getFavourites()
  }, [dispatch])

  if (isLoading) return <Loading />
  return movieList ? (
    <FavouritesContainer>
      <h2>My favourite movies</h2>

      <ListContainer movieList={movieList} />
    </FavouritesContainer>
  ) : null
}
