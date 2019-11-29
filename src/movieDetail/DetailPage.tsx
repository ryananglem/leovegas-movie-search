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

interface StateProps {
    isLoading: boolean
    movie: any
    match: any
}
interface DispatchProps {
    getMovie: (id: string) => void
    setFavourite: (id: string) => void
    setWatchLater: (id: string) => void
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

export const DetailPage = ({isLoading, movie, getMovie, setFavourite, match, setWatchLater}: Props) => {
    
    useEffect(()=> {
        getMovie(match.params.id)
    }, [match.params.id, getMovie])

    if ( isLoading ) return  <Loading />
    return movie ? (
        <DetailPageContainer>
            { movie.poster_path && <PosterImage alt="poster" src={movie.fullPosterFilePath} /> }
            <h1>{movie.title}</h1>
            <h4>Released {movie.release_date}</h4>
            <p>{movie.overview}</p> 
            <Favourite id={movie.id} setFavourite={setFavourite} isFavourite={movie.isFavourite} />
            <WatchLaterButton onClick={() => setWatchLater(movie.id)}>
                <img src={flagIcon} alt="watch later" />
            </WatchLaterButton>
        </DetailPageContainer>
) : null
}
const mapStateToProps = (state: State) => ({
    isLoading: state.currentMovie.isLoading,
    movie: state.currentMovie.data
  })
  const mapDispatchToProps = (dispatch: any) => ({
    getMovie: (id: string) => dispatch(getMovie(id)),
    setWatchLater: (id: string) => dispatch(setWatchLater(id))
  })
  
export const DetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailPage)
  