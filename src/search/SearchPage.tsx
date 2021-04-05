import React from 'react'
import styled from 'styled-components'

import { Search } from './searchBox/Search'
import { Loading } from '../page/Loading'
import {
  searchForMovies,
  searchLoadingSelector,
  searchResultsSelector,
  searchTermSelector,
} from './search.redux'
import { SearchResults } from './searchResults/SearchResults'
import { useDispatch, useSelector } from 'react-redux'
import { device } from '../styles/device'

const SearchBoxContainer = styled.div``
const SearchResultsContainer = styled.div`
  padding-top: 30px;
`

const SearchPageContainer = styled.div`
  width: 100%;

  @media ${device.tablet} {
    padding-left: 10%;
    padding-right: 10%;
    width: 80%;
  }
`

export const SearchPage = (): JSX.Element => {
  const dispatch = useDispatch()
  const isLoading = useSelector(searchLoadingSelector)
  const searchTerm = useSelector(searchTermSelector)
  const searchResults = useSelector(searchResultsSelector)

  const search = (term: string) => dispatch(searchForMovies(term))

  return (
    <SearchPageContainer data-testid="search-page">
      <SearchBoxContainer>
        <Search onSearch={search} />
      </SearchBoxContainer>
      {searchResults && (
        <SearchResultsContainer>
          {isLoading ? (
            <Loading />
          ) : (
            <SearchResults term={searchTerm} results={searchResults} />
          )}
        </SearchResultsContainer>
      )}
    </SearchPageContainer>
  )
}
