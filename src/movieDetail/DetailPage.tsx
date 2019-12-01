import React, { useEffect } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { State } from '../store'
import { Loading } from '../page/Loading'
import { getMovie } from './movieDetail.redux'
import { Favourite } from '../favourite/Favourite'
import { setWatchLater } from '../watchLater/watchLater.redux'
import flagIcon from './icons/flag-24px.svg'
import { device } from '../styles/device'
import { setFavourite } from '../favourite/favourites.redux'

interface StateProps {
    isLoading: boolean
    movie: any
    match: any
    favourites?: any[]
}
interface DispatchProps {
    getMovie: (id: string) => void
    setFavourite: (id: string, favourite: boolean) => void
    setWatchLater: (id: string, watchLater: boolean) => void
}

interface Props extends DispatchProps, StateProps {}

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

export const DetailPage = ({isLoading, favourites, movie, getMovie, setFavourite, match, setWatchLater}: Props) => {
    
    useEffect(()=> {
        getMovie(match.params.id)
    }, [match.params.id, getMovie])

    const isFavourite = (id:string)  => {
        if (favourites) {
            return favourites.filter(f => f.id === id).length > 0
        }
        return false
    }

    if ( isLoading ) return  <Loading />
    return movie ? (
        <DetailPageContainer data-testid="detail-page">
            { movie.poster_path && <PosterImage alt="poster" src={movie.fullPosterFilePath} /> }
            <h1>{movie.title}</h1>
            <h4>Released {movie.release_date}</h4>
            <p>{movie.overview}</p> 
            <Favourite id={movie.id} setFavourite={setFavourite} isFavourite={isFavourite(movie.id)} />
            <WatchLaterButton onClick={() => setWatchLater(movie.id, true)}>
                <img src={flagIcon} alt="watch later" />
            </WatchLaterButton>
        </DetailPageContainer>
) : null
}
const mapStateToProps = (state: State) => ({
    isLoading: state.currentMovie.isLoading,
    movie: state.currentMovie.data,
    favourites: state.favourites.data
  })
  const mapDispatchToProps = (dispatch: any) => ({
    getMovie: (id: string) => dispatch(getMovie(id)),
    setWatchLater: (id: string, watchLater: boolean) => dispatch(setWatchLater(id, watchLater)),
    setFavourite: (id: string, favourite: boolean) => dispatch(setFavourite(id, favourite))
  })
  
export const DetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailPage)
  