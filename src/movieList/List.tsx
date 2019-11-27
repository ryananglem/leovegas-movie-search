import React from 'react'
import { Item } from './Item'

interface Props {
    movieList: Array<any>
}

export const List = ({movieList}: Props) => {

    const resultList = movieList.map(movie => <div>
        <Item movie={movie} />
        </div>)

    return (
        <div>
            {resultList}
        </div>
    )
}