import React, { useEffect } from 'react'
import styled from 'styled-components'

import {connect} from 'react-redux'
import { State } from '../store'
import { Loading } from '../page/Loading'
import { getMovie } from './movieDetail.redux'

interface StateProps {
    isLoading: boolean
    movie: any
    match: any
}
interface DispatchProps {
    getMovie: (id: string) => void
    setFavourite: (id: string) => void
}

interface Props extends DispatchProps, StateProps {}

const PosterImage = styled.img`
    height: 300px;
`

export const DetailPage = ({isLoading, movie, getMovie, setFavourite, match}: Props) => {
    
    useEffect(()=> {
        getMovie(match.params.id)
    }, [match.params.id, getMovie])

    if ( isLoading ) return  <Loading />
    return movie ? (
        <>
        { movie.poster_path && <PosterImage alt="poster" src={movie.fullPosterFilePath} /> }
        <h1>{movie.title}</h1>
        <h4>released {movie.release_date}</h4>
        <p>{movie.description}</p> 
        </>
) : null
}
const mapStateToProps = (state: State) => ({
    isLoading: state.currentMovie.isLoading,
    movie: state.currentMovie.data
  })
  const mapDispatchToProps = (dispatch: any) => ({
    getMovie: (id: string) => dispatch(getMovie(id))
  })
  
export const DetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(DetailPage)
  