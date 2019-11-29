import React from 'react'
import styled from 'styled-components'
import { Item } from './Item'

interface Props {
    movieList: Array<any>
}

const ItemContainer = styled.div`
    padding-bottom: 5px;
`

export const List = ({movieList}: Props) => {

    const setFavourite = () => {}
    const setPlayLater = () => {}

    const resultList = movieList.map(movie => <ItemContainer key={movie.id}>
        <Item movie={movie} isFavourite={false} setFavourite={setFavourite} setPlayLater={setPlayLater} />
        </ItemContainer>)

    return (
        <div>
            {resultList}
        </div>
    )
}