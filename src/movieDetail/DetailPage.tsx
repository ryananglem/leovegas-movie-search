import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../page/Loading'
import {
  getMovie,
  movieLoadingSelector,
  movieSelector,
} from './movieDetail.redux'
import { Favourite as IFavourite } from '../favourites/Favourite'
import { setWatchLater } from '../watchLater/watchLater.redux'
import flagIcon from './icons/flag-24px.svg'
import { device } from '../styles/device'
import {
  favouritesDataSelector,
  setFavourite,
} from '../favourites/favourites.redux'
import { Favourite } from '../favourite/Favourite'

interface Props {
  match: any
}

const PosterImage = styled.img`
  height: 300px;
`
const WatchLaterButton = styled.button`
  border: 0;
  background-color: transparent;
`
const DetailPageContainer = styled.div`
  width: 100%;

  @media ${device.tablet} {
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
  }
`

export const DetailPage = ({ match }: Props) => {
  const dispatch = useDispatch()
  const favourites = useSelector(favouritesDataSelector)
  const isLoading = useSelector(movieLoadingSelector)
  const movie = useSelector(movieSelector)

  useEffect(() => {
    const getMovieDetails = (id: string) => getMovie(id)
    getMovieDetails(match.params.id)
  }, [match.params.id, dispatch])

  const isFavourite = (id: string) => {
    if (favourites) {
      return favourites.filter((f: IFavourite) => f.id === id).length > 0
    }
    return false
  }
  const toggleFavourite = (id: string, favourite: boolean): void =>
    dispatch(setFavourite(id, favourite))

  const toggleWatchLater = (id: string, watchLater: boolean): void =>
    dispatch(setWatchLater(id, watchLater))

  if (isLoading) return <Loading />
  return movie ? (
    <DetailPageContainer data-testid="detail-page">
      {movie.poster_path && (
        <PosterImage alt="poster" src={movie.fullPosterFilePath} />
      )}
      <h1>{movie.title}</h1>
      <h4>Released {movie.release_date}</h4>
      <p>{movie.overview}</p>
      <Favourite
        id={movie.id}
        setFavourite={toggleFavourite}
        isFavourite={isFavourite(movie.id)}
      />
      <WatchLaterButton onClick={() => toggleWatchLater(movie.id, true)}>
        <img src={flagIcon} alt="watch later" />
      </WatchLaterButton>
    </DetailPageContainer>
  ) : null
}
