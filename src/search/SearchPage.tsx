import React from 'react'
import styled from 'styled-components'

import { State } from '../store'
import { Search } from './searchBox/Search'
import { Loading } from '../page/Loading'
import { searchForMovies } from './search.redux'
import { SearchResults } from './searchResults/SearchResults'
import { connect } from 'react-redux'
import { device } from '../styles/device'

interface StateProps {
  isLoading: boolean
  searchResults: any
  searchTerm: string
}

interface DispatchProps {
  search: (term: string) => void
}

interface Props extends DispatchProps, StateProps {}

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

export const SearchPage = ({
  isLoading,
  search,
  searchResults,
  searchTerm,
}: Props): JSX.Element => (
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

const mapStateToProps = (state: State): StateProps => ({
  isLoading: state.search.isSearching,
  searchTerm: state.search.searchTerm,
  searchResults: state.search.data && state.search.data.results,
})
const mapDispatchToProps = (dispatch: any): DispatchProps => ({
  search: (term: string) => dispatch(searchForMovies(term)),
})

export const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
