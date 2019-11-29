import React from 'react'
import styled from 'styled-components'
import { Favourite } from '../favourite/Favourite'
 
interface Props {
    movie: any
    isFavourite: boolean
    setFavourite: (id: string) => void
    setPlayLater: (id: string) => void
}

const ItemContainer = styled.div`
    width: 100%;
    padding-bottom: 10px;
`

export const Item = ({movie, isFavourite, setFavourite}:Props) => (
    <ItemContainer>
        <h4>{movie.original_title}</h4>
        <p>
            {movie.overview}
        </p>
        <div onClick={() => setFavourite(movie.id)}>
            <Favourite isFavourite={isFavourite} setFavourite={setFavourite} id={movie.id} />
        </div>
    </ItemContainer>
)