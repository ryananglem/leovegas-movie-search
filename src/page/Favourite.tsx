import React from 'react'
import styled from 'styled-components'

import favourite from './icons/favorite-24px.svg'
import favouriteBorder from './icons/favorite_border-24px.svg'

interface Props {
    setFavourite: (id: string) => void
    isFavourite: boolean
    id: string
}

const Button = styled.button`
    border: 0;
    background-color: transparent;
`

export const Favourite = ({id, isFavourite, setFavourite} : Props) => (
    <Button
        onClick={() => setFavourite(id)}
  >
    {isFavourite ? 
        <img alt="favourite" src={favourite} /> :
        <img alt="favourite" src={favouriteBorder } /> }
  </Button>
)