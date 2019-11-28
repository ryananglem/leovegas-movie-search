import React from 'react'
import { Item } from './Item'

interface Props {
    movieList: Array<any>
}

export const List = ({movieList}: Props) => {

    const setFavourite = () => {}
    const setPlayLater = () => {}

    const resultList = movieList.map(movie => <div key={movie.id}>
        <Item movie={movie} isFavourite={false} setFavourite={setFavourite} setPlayLater={setPlayLater} />
        </div>)

    return (
        <div>
            {resultList}
        </div>
    )
}