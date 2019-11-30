import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Favourite } from '../favourite/Favourite'
 
interface Props {
    movie: any
    isFavourite: boolean
    setFavourite: (id: string, favourite: boolean) => void
}

const ItemContainer = styled.div`
    width: 100%;
    padding-bottom: 10px;
    background-color: #f2f2f2
    padding: 3px 5px;
    cursor: pointer;
`
const OverviewText = styled.p`
    font-size: 14px;
    white-space: nowrap;
    width: 85%;
    overflow: hidden;              
    -o-text-overflow: ellipsis;    
    text-overflow:    ellipsis;    
}
`
const TopLine = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const H4 = styled.h4`
    margin-top: 2px;
    margin-bottom: 5px;
`
export const Item = ({movie, isFavourite, setFavourite}:Props) => (    
        <ItemContainer>
            <TopLine>
                <Link to={{pathname: '/detail/' + movie.id}} style={{ textDecoration: 'none', color: 'black' }}>
                    <H4 data-testid="item-title">{movie.original_title} ({movie.release_date.substring(0,4)})</H4>
                </Link>
                <div>
                    <Favourite isFavourite={isFavourite} setFavourite={setFavourite} id={movie.id} />
                </div>
            </TopLine>
            <Link to={{pathname: '/detail/' + movie.id}} style={{ textDecoration: 'none', color: 'black' }}>
                <OverviewText>
                    {movie.overview}
                </OverviewText>      
            </Link>  
        </ItemContainer>
)