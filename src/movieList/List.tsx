import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { Item } from './Item'
import { State } from '../store'
import { setFavourite } from '../favourite/favourites.redux'


interface StateProps {
    isSaving: boolean
    movieList: any[]
    favourites: any[]
}
interface DispatchProps {
    setFavourite: (id: string, favourite: boolean) => void
}

interface Props extends DispatchProps, StateProps {}

const ItemListContainer = styled.div`
    padding-bottom: 5px;
`
const NoMoviesText = styled.div`
    padding-top: 30px;
`

export const List = ({movieList, isSaving, setFavourite, favourites}: Props) => {

    const isFavourite = (id:string) => (favourites && favourites.filter(f => f.id === id).length > 0)

    console.log('favourites', favourites)
    const resultList = movieList.map(movie => <ItemListContainer key={movie.id}>
        <Item movie={movie} isFavourite={isFavourite(movie.id)} setFavourite={setFavourite} />
        </ItemListContainer>)

    if (resultList.length === 0) {
        return <NoMoviesText>There are no movies in the list</NoMoviesText>
    }
    return (
        <div>
            {resultList}
        </div>
    )
}
const mapStateToProps = (state: State) => ({
    isLoading: state.favourites.isLoading,
    favourites: state.favourites.data
  })
  const mapDispatchToProps = (dispatch: any) => ({
    setFavourite: (id: string, favourite: boolean) => dispatch(setFavourite(id, favourite))
  })
  
export const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(List)