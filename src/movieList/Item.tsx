import React from 'react'
import { Favourite } from '../page/Favourite'
 

interface Props {
    movie: any
    isFavourite: boolean
    setFavourite: (id: string) => void
    setPlayLater: (id: string) => void
}

export const Item = ({movie, isFavourite, setFavourite}:Props) => (
    <>
    <h4>{movie.original_title}</h4>
        <p>
            {movie.overview}
        </p>
        <div onClick={() => setFavourite(movie.id)}>
            <Favourite isFavourite={isFavourite} setFavourite={setFavourite} id={movie.id} />
        </div>
    </>
)