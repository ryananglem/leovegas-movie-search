import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Item } from './Item'
import {
  favouritesDataSelector,
  setFavourite,
} from '../favourites/favourites.redux'
import { MovieListItem } from './MovieListItem'

const ItemListContainer = styled.div`
  padding-bottom: 5px;
`
const NoMoviesText = styled.div`
  padding-top: 30px;
`
interface Props {
  movieList: MovieListItem[]
}

export const List = ({ movieList }: Props) => {
  const dispatch = useDispatch()
  const favourites = useSelector(favouritesDataSelector)

  const isFavourite = (id: string) =>
    favourites &&
    favourites.filter((f: MovieListItem) => f.id === id).length > 0

  const dispatchFavourite = (id: string, favourite: boolean) =>
    dispatch(setFavourite(id, favourite))

  const resultList = movieList.map((movie: MovieListItem) => {
    const isFav = isFavourite(movie.id)
    return (
      <ItemListContainer key={movie.id}>
        <Item
          movie={movie}
          isFavourite={isFav}
          setFavourite={() => dispatchFavourite(movie.id, isFav)}
        />
      </ItemListContainer>
    )
  })

  if (resultList.length === 0) {
    return (
      <NoMoviesText data-testid="no-film-message">
        There are no movies in the list
      </NoMoviesText>
    )
  }
  return <div>{resultList}</div>
}
