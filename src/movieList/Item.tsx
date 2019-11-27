import React from 'react'

interface Props {
    movie: any
}

export const Item = ({movie}:Props) => (
    <>
    <h4>{movie.original_title}</h4>
        <p>
            {movie.overview}
        </p>
    </>
)